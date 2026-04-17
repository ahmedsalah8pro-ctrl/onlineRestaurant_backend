import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminRoleIndex } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-member-editor',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="member-editor-container animate-slide-up">
      <div class="editor-header flex-header mb-8">
        <div class="header-left flex items-center gap-6">
          <a pButton icon="pi pi-arrow-left" [routerLink]="['/admin/access/members']" class="p-button-text p-button-rounded"></a>
          <div class="header-text">
            <span class="eyebrow">{{ ui.t('admin.access.members') }}</span>
            <h2 class="section-title">{{ isEdit() ? ui.t('admin.catalog.edit') : ui.t('admin.catalog.create') }}</h2>
          </div>
        </div>
        <button pButton [label]="ui.t('admin.settings.save')" icon="pi pi-check" (click)="save()" [loading]="saving()" class="create-btn-premium"></button>
      </div>

      <div class="glass-panel-editor max-w-3xl mx-auto shadow-2xl">
        <div class="form-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="field-stack md:col-span-2">
            <label>{{ ui.t('account.name') }}</label>
            <input pInputText [(ngModel)]="form.name" [placeholder]="ui.t('account.name')" class="w-full" />
          </div>

          <div class="field-stack">
            <label>{{ ui.t('account.email') }}</label>
            <input pInputText [(ngModel)]="form.email" type="email" [placeholder]="ui.t('account.email')" class="w-full" />
          </div>

          <div class="field-stack">
            <label>{{ ui.t('account.username') }}</label>
            <input pInputText [(ngModel)]="form.username" [placeholder]="ui.t('account.username')" class="w-full" />
          </div>

          <div class="field-stack">
            <label>{{ ui.t('account.phone') }}</label>
            <input pInputText [(ngModel)]="form.primary_phone" [placeholder]="ui.t('account.phone')" class="w-full" />
          </div>

          <div class="field-stack">
            <label>{{ ui.t('account.password') }}</label>
            <p-password [(ngModel)]="form.password" [feedback]="false" [toggleMask]="true" [placeholder]="isEdit() ? '•••••••• (Leave blank to keep)' : '••••••••'" styleClass="w-full" inputStyleClass="w-full"></p-password>
          </div>

          <div class="field-stack">
            <label>{{ ui.t('menu.roles') }}</label>
            <p-select [options]="roleOptions()" [(ngModel)]="form.role_id" [placeholder]="ui.t('menu.roles')" class="w-full"></p-select>
          </div>

          <div class="field-stack">
            <label>{{ ui.t('nav.wallet') }} ({{ ui.t('currency.symbol') }})</label>
            <p-inputnumber [(ngModel)]="form.balance" mode="decimal" [min]="0" class="w-full"></p-inputnumber>
          </div>

          <div class="field-stack md:col-span-2 py-4 border-t border-slate-700/30 flex items-center justify-between">
            <div class="status-info">
               <span class="block text-slate-200 font-bold mb-1">{{ ui.t('admin.catalog.status') }}</span>
               <span class="text-sm text-slate-400">{{ ui.locale() === 'ar' ? 'يحدد ما إذا كان هذا العضو يمكنه تسجيل الدخول وطلب المنتجات.' : 'Determines if this member can log in and place orders.' }}</span>
            </div>
            <p-toggleswitch [(ngModel)]="form.is_active"></p-toggleswitch>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .member-editor-container { padding-bottom: 5rem; }
    .eyebrow { display: block; color: var(--primary-color); font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.2rem; }
    
    .glass-panel-editor {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
      padding: 3rem;
    }

    .field-stack {
      display: flex; flex-direction: column; gap: 0.5rem;
      label { font-size: 0.85rem; font-weight: 700; color: #94a3b8; }
    }

    ::ng-deep {
      .p-inputtext, .p-password-input, .p-inputnumber-input {
        background: rgba(15, 23, 42, 0.6) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        color: #f1f5f9 !important;
        border-radius: 12px !important;
        padding: 0.75rem 1rem !important;
        &:focus { border-color: var(--primary-color) !important; box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2) !important; }
      }
      .p-select {
        background: rgba(15, 23, 42, 0.6) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        border-radius: 12px !important;
        .p-select-label { color: #f1f5f9 !important; padding: 0.75rem 1rem !important; }
      }
    }
  `]
})
export class MemberEditorPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  protected readonly id = signal<number | null>(null);
  protected readonly isEdit = computed(() => !!this.id());
  protected readonly saving = signal(false);

  protected form = {
    name: '',
    username: '',
    email: '',
    primary_phone: '',
    password: '',
    role_id: null as number | null,
    is_active: true,
    balance: 0,
  };

  protected readonly roleOptions = signal<any[]>([]);

  async ngOnInit() {
    await this.loadRoles();
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id.set(Number(params['id']));
        await this.loadMember();
      }
    });
  }

  async loadRoles() {
    try {
      const idx = await firstValueFrom(this.adminApi.getRolesIndex());
      this.roleOptions.set(idx.roles.map(r => ({ label: r.name, value: r.id })));
    } catch {}
  }

  async loadMember() {
    try {
      const user = await firstValueFrom(this.adminApi.showResource<any>('users', this.id()!));
      this.form.name = user.name;
      this.form.username = user.username || '';
      this.form.email = user.email || '';
      this.form.primary_phone = user.primary_phone || '';
      this.form.is_active = user.is_active;
      this.form.balance = Number(user.wallet?.balance || 0);
      this.form.role_id = user.roles?.[0]?.id || null;
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to load member' });
    }
  }

  async save() {
    this.saving.set(true);
    try {
      const payload: any = { ...this.form };
      if (this.isEdit() && !payload.password) delete payload.password;

      if (this.isEdit()) {
        await firstValueFrom(this.adminApi.updateResource('users', this.id()!, payload));
      } else {
        await firstValueFrom(this.adminApi.createResource('users', payload));
      }

      this.message.add({ severity: 'success', summary: 'Success', detail: 'Member saved successfully' });
      this.router.navigate(['/admin/access/members']);
    } catch (err: any) {
      let detail = 'Save failed';
      if (err.error?.errors) {
        detail = Object.values(err.error.errors).flat().join(' | ');
      } else if (err.error?.message) {
        detail = err.error.message;
      }
      this.message.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.saving.set(false);
    }
  }
}
