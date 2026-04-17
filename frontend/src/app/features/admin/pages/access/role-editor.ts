import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-role-editor',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="role-editor-container animate-slide-up">
      <div class="editor-header flex-header mb-8">
        <div class="header-left flex items-center gap-6">
          <a pButton icon="pi pi-arrow-left" [routerLink]="['/admin/access/roles']" class="p-button-text p-button-rounded"></a>
          <div class="header-text">
            <span class="eyebrow">{{ ui.t('admin.access.roles') }}</span>
            <h2 class="section-title">{{ isEdit() ? ui.t('admin.catalog.edit') : ui.t('admin.catalog.create') }}</h2>
          </div>
        </div>
        <button pButton [label]="ui.t('admin.settings.save')" icon="pi pi-check" (click)="save()" [loading]="saving()" class="create-btn-premium"></button>
      </div>

      <div class="glass-panel-editor max-w-4xl mx-auto shadow-2xl">
        <div class="field-stack mb-10">
          <label>{{ ui.t('account.name') }}</label>
          <input pInputText [(ngModel)]="form.name" [placeholder]="ui.t('account.name')" class="w-full text-xl py-4" />
        </div>

        <div class="permissions-section">
          <h3 class="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            <i class="pi pi-lock text-primary"></i>
            {{ ui.t('menu.permissions') }}
          </h3>
          
          <div class="permissions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (perm of allPermissions(); track perm.id) {
               <div class="perm-item" [class.selected]="isSelected(perm.name)" (click)="togglePermission(perm.name)">
                  <div class="flex items-center gap-3">
                     <p-checkbox [binary]="true" [ngModel]="isSelected(perm.name)" (onChange)="togglePermission(perm.name)"></p-checkbox>
                     <div class="perm-info">
                        <span class="perm-name block font-bold text-sm">{{ getName(perm.name) }}</span>
                        <span class="perm-raw text-[10px] text-slate-500 font-mono">{{ perm.name }}</span>
                     </div>
                  </div>
               </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .role-editor-container { padding-bottom: 5rem; }
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

    .perm-item {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 12px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover { border-color: rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.05); }
      &.selected { border-color: var(--primary-color); background: rgba(34, 197, 94, 0.1); }
    }

    .perm-name { color: #f1f5f9; }

    ::ng-deep {
      .p-inputtext {
        background: rgba(15, 23, 42, 0.6) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        color: #f1f5f9 !important;
        border-radius: 12px !important;
        &:focus { border-color: var(--primary-color) !important; box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2) !important; }
      }
      .p-checkbox-box {
        background: rgba(15, 23, 42, 0.8) !important;
        border-color: rgba(148, 163, 184, 0.3) !important;
        &.p-highlight { background: var(--primary-color) !important; border-color: var(--primary-color) !important; }
      }
    }
  `]
})
export class RoleEditorPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  protected readonly id = signal<number | null>(null);
  protected readonly isEdit = computed(() => !!this.id());
  protected readonly saving = signal(false);

  protected form = { name: '' };
  protected readonly selectedPermissions = signal<string[]>([]);
  protected readonly allPermissions = signal<any[]>([]);

  async ngOnInit() {
    await this.loadAllPermissions();
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id.set(Number(params['id']));
        await this.loadRole();
      }
    });
  }

  async loadAllPermissions() {
    try {
      const idx = await firstValueFrom(this.adminApi.getRolesIndex());
      this.allPermissions.set(idx.permissions);
    } catch {}
  }

  async loadRole() {
    try {
      const role = await firstValueFrom(this.adminApi.showResource<any>('roles', this.id()!));
      this.form.name = role.name;
      this.selectedPermissions.set(role.permissions.map((p: any) => p.name));
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to load role' });
    }
  }

  isSelected(name: string): boolean {
    return this.selectedPermissions().includes(name);
  }

  togglePermission(name: string) {
    const current = this.selectedPermissions();
    if (current.includes(name)) {
      this.selectedPermissions.set(current.filter(p => p !== name));
    } else {
      this.selectedPermissions.set([...current, name]);
    }
  }

  getName(name: string): string {
    const key = `perm.${name}`;
    const t = this.ui.t(key);
    return t !== key ? t : this.formatPermName(name);
  }

  formatPermName(name: string): string {
    return name.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' › ');
  }

  async save() {
    this.saving.set(true);
    try {
      const payload = {
        name: this.form.name,
        permissions: this.selectedPermissions()
      };

      if (this.isEdit()) {
        await firstValueFrom(this.adminApi.updateRole(this.id()!, payload));
      } else {
        await firstValueFrom(this.adminApi.createRole(payload));
      }

      this.message.add({ severity: 'success', summary: 'Success', detail: 'Role saved successfully' });
      this.router.navigate(['/admin/access/roles']);
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
