import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminRoleIndex } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

type Tab = 'members' | 'roles' | 'permissions';

@Component({
  selector: 'app-access-page',
  imports: [SharedUiModule],
  templateUrl: './access-page.html',
  styleUrl: './access-page.scss',
})
export class AccessPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly activeTab = signal<Tab>('members');
  protected readonly index = signal<AdminRoleIndex | null>(null);
  protected readonly members = signal<Array<Record<string, unknown>>>([]);

  protected readonly editingMemberId = signal<number | null>(null);
  protected readonly memberDialogVisible = signal(false);
  protected readonly memberForm = {
    name: '',
    email: '',
    password: '',
    roleId: null as number | null,
    is_active: true,
    balance: 0,
    isStaff: false,
  };

  /** Role CRUD form */
  protected readonly form = {
    id: null as number | null,
    name: '',
  };

  protected readonly selectedPermissions = signal<string[]>([]);

  protected readonly roleOptions = computed(() => {
    const idx = this.index();
    if (!idx) return [];
    return idx.roles.map((r) => ({ label: r.name, value: r.id }));
  });

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  protected async reload(): Promise<void> {
    const [roleIndex, membersData] = await Promise.all([
      firstValueFrom(this.adminApi.getRolesIndex()),
      firstValueFrom(this.adminApi.listUsers()).catch(() => ({ items: [], meta: {}, message: '' })),
    ]);
    this.index.set(roleIndex);
    this.members.set(membersData.items);
  }

  // ───── MEMBER CRUD ─────

  protected openMemberForm(member?: Record<string, unknown>): void {
    if (member) {
      this.editingMemberId.set(Number(member['id']));
      this.memberForm.name = String(member['name'] ?? '');
      this.memberForm.email = String(member['email'] ?? '');
      this.memberForm.password = '';
      const roles = member['roles'] as Array<{ id: number }> | undefined;
      this.memberForm.roleId = roles?.[0]?.id ?? null;
      this.memberForm.isStaff = !!this.memberForm.roleId;
      this.memberForm.is_active = member['is_active'] !== false;
      this.memberForm.balance = Number(member['balance'] ?? 0);
    } else {
      this.editingMemberId.set(null);
      this.memberForm.name = '';
      this.memberForm.email = '';
      this.memberForm.password = '';
      this.memberForm.roleId = null;
      this.memberForm.isStaff = false;
      this.memberForm.is_active = true;
      this.memberForm.balance = 0;
    }
    this.memberDialogVisible.set(true);
  }

  protected async saveMember(): Promise<void> {
    const payload: Record<string, unknown> = {
      name: this.memberForm.name,
      is_active: this.memberForm.is_active,
      balance: this.memberForm.balance,
    };
    
    if (this.memberForm.email) {
      payload['email'] = this.memberForm.email;
    }

    if (this.memberForm.password) {
      payload['password'] = this.memberForm.password;
    }

    if (this.memberForm.isStaff && this.memberForm.roleId !== null) {
      payload['role_id'] = this.memberForm.roleId;
    } else {
      payload['role_id'] = null;
    }

    const id = this.editingMemberId();
    try {
      if (id) {
        await firstValueFrom(this.adminApi.updateResource('users', id, payload));
        this.message.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      } else {
        await firstValueFrom(this.adminApi.createResource('users', payload));
        this.message.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
      }
      this.memberDialogVisible.set(false);
      await this.reload();
    } catch (err: any) {
      const msg = err?.error?.message || 'Failed to sync user';
      this.message.add({ severity: 'error', summary: 'Error', detail: msg });
    }
  }

  protected confirmDeleteMember(member: Record<string, unknown>): void {
    const isArabic = this.ui.currentLocale() === 'ar';
    const label = String(member['name'] ?? member['email'] ?? `#${member['id']}`);

    this.confirm.confirm({
      header: isArabic ? 'تأكيد الحذف' : 'Delete Confirmation',
      message: isArabic
        ? `هل تريد حذف العضو "${label}" نهائيًا؟`
        : `Are you sure you want to delete the member "${label}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.ui.t('admin.catalog.delete'),
      rejectLabel: this.ui.t('admin.catalog.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: async () => {
        await this.deleteMember(member['id']);
      },
    });
  }

  private async deleteMember(id: unknown): Promise<void> {
    try {
      await firstValueFrom(this.adminApi.deleteResource('users', Number(id)));
      this.message.add({
        severity: 'success',
        summary: this.ui.t('admin.catalog.delete'),
        detail: this.ui.currentLocale() === 'ar' ? 'تم حذف العضو بنجاح.' : 'Member deleted successfully.',
      });
      await this.reload();
    } catch (err: any) {
      this.message.add({
        severity: 'error',
        summary: this.ui.t('admin.catalog.delete'),
        detail: err?.error?.message || (this.ui.currentLocale() === 'ar' ? 'تعذر حذف العضو.' : 'Delete failed.'),
      });
    }
  }

  protected getInitials(name: unknown): string {
    return String(name ?? '?')
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join('');
  }

  // ───── ROLES CRUD ─────

  protected newRole(): void {
    this.form.id = null;
    this.form.name = '';
    this.selectedPermissions.set([]);
  }

  protected editRole(role: { id: number; name: string; permissions: Array<{ name: string }> }): void {
    this.form.id = role.id;
    this.form.name = role.name;
    this.selectedPermissions.set(role.permissions.map((p) => p.name));
  }

  protected togglePermission(name: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedPermissions();
    if (checked) {
      this.selectedPermissions.set([...current, name]);
    } else {
      this.selectedPermissions.set(current.filter((p) => p !== name));
    }
  }

  protected async saveRole(): Promise<void> {
    const permissions = this.selectedPermissions();
    if (this.form.id) {
      await firstValueFrom(this.adminApi.updateRole(this.form.id, { name: this.form.name, permissions }));
    } else {
      await firstValueFrom(this.adminApi.createRole({ name: this.form.name, permissions }));
    }
    this.newRole();
    await this.reload();
  }

  protected confirmRemoveRole(role: { id: number; name: string }): void {
    const isArabic = this.ui.currentLocale() === 'ar';

    this.confirm.confirm({
      header: isArabic ? 'تأكيد الحذف' : 'Delete Confirmation',
      message: isArabic
        ? `هل تريد حذف الدور "${role.name}" نهائيًا؟`
        : `Are you sure you want to delete the role "${role.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.ui.t('admin.catalog.delete'),
      rejectLabel: this.ui.t('admin.catalog.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: async () => {
        await this.removeRole(role.id);
      },
    });
  }

  private async removeRole(roleId: number): Promise<void> {
    try {
      await firstValueFrom(this.adminApi.deleteRole(roleId));
      this.message.add({
        severity: 'success',
        summary: this.ui.t('admin.catalog.delete'),
        detail: this.ui.currentLocale() === 'ar' ? 'تم حذف الدور بنجاح.' : 'Role deleted successfully.',
      });
      await this.reload();
    } catch (err: any) {
      this.message.add({
        severity: 'error',
        summary: this.ui.t('admin.catalog.delete'),
        detail: err?.error?.message || (this.ui.currentLocale() === 'ar' ? 'تعذر حذف الدور.' : 'Delete failed.'),
      });
    }
  }
}
