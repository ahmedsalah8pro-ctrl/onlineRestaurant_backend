import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="role-list-container animate-slide-up">
      <div class="flex-header mb-8">
        <div class="header-text">
          <span class="eyebrow">{{ ui.t('admin.section.customers') }}</span>
          <h2 class="section-title">{{ ui.t('menu.roles') }}</h2>
        </div>
        <a pButton [routerLink]="['create']" [label]="ui.t('admin.access.createRole')" icon="pi pi-shield" class="p-button-raised create-btn-premium"></a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (role of roles(); track role.id) {
          <div class="role-card glass-panel shadow-xl">
             <div class="card-header flex justify-between items-start mb-4">
                <div>
                   <h4 class="role-name text-lg font-bold text-slate-100">{{ role.name }}</h4>
                   <span class="permission-count text-xs text-slate-500 uppercase font-black">{{ role.permissions?.length || 0 }} {{ ui.t('menu.permissions') }}</span>
                </div>
                <div class="actions flex gap-1">
                   <a pButton [routerLink]="[role.id, 'edit']" icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-sm"></a>
                   <button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger p-button-sm" (click)="confirmDelete(role)"></button>
                </div>
             </div>
             
             <div class="permissions-preview flex flex-wrap gap-2 max-h-24 overflow-hidden relative">
                @for (p of role.permissions?.slice(0, 10); track p.id) {
                   <span class="preview-chip">{{ p.name }}</span>
                }
                @if (role.permissions?.length > 10) {
                   <span class="preview-chip more">+{{ role.permissions.length - 10 }}</span>
                }
                <div class="fade-overlay"></div>
             </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .role-list-container { padding-bottom: 5rem; }
    .create-btn { padding: 0.75rem 1.5rem !important; border-radius: 12px !important; }

    .role-card {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      &:hover { transform: translateY(-5px); border-color: var(--primary-color); }
    }

    .preview-chip {
      background: rgba(148, 163, 184, 0.05);
      color: #94a3b8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.65rem;
      font-weight: 600;
      border: 1px solid rgba(148, 163, 184, 0.1);
      &.more { color: var(--primary-color); background: rgba(34, 197, 94, 0.1); }
    }

    .fade-overlay {
      position: absolute; bottom: 0; left: 0; right: 0; height: 20px;
      background: linear-gradient(to top, rgba(15, 23, 42, 0.4), transparent);
    }
  `]
})
export class RoleListPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly roles = signal<any[]>([]);

  ngOnInit() {
    this.loadRoles();
  }

  async loadRoles() {
    try {
      const idx = await firstValueFrom(this.adminApi.getRolesIndex());
      this.roles.set(idx.roles);
    } catch {}
  }

  confirmDelete(role: any) {
    this.confirm.confirm({
      message: this.ui.t('account.deleteAddressMessage').replace('address', 'role').replace('العنوان', 'الدور'),
      header: this.ui.t('account.deleteAddressTitle').replace('Address', 'Role').replace('العنوان', 'الدور'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.ui.t('admin.catalog.delete'),
      rejectLabel: this.ui.t('admin.catalog.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteRole(role.id)
    });
  }

  async deleteRole(id: number) {
    try {
      await firstValueFrom(this.adminApi.deleteRole(id));
      this.message.add({ severity: 'success', summary: 'Success', detail: 'Role deleted successfully' });
      this.loadRoles();
    } catch (err: any) {
        this.message.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Delete failed' });
    }
  }
}
