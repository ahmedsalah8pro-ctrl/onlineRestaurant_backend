import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [SharedUiModule],
  template: `
    <div class="permission-list-container animate-slide-up">
      <div class="flex-header mb-8">
        <div class="header-text">
          <span class="eyebrow">{{ ui.t('admin.section.customers') }}</span>
          <h2 class="section-title">{{ ui.t('admin.access.permissions') }}</h2>
        </div>
        <div class="header-info-badge">
           <i class="pi pi-lock mr-2"></i>
           <span>System Protected</span>
        </div>
      </div>

      <div class="glass-panel p-8 shadow-2xl">
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (perm of permissions(); track perm.id) {
               <div class="perm-card" [pTooltip]="getDesc(perm.name)" tooltipPosition="top">
                  <div class="flex items-center gap-3 mb-2">
                     <i class="pi pi-shield text-primary"></i>
                     <span class="perm-title block font-bold text-slate-100">{{ getName(perm.name) }}</span>
                  </div>
                  <span class="perm-code text-[10px] text-slate-500 font-mono">{{ perm.name }}</span>
                  <p class="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">{{ getDesc(perm.name) }}</p>
               </div>
            }
         </div>
      </div>
    </div>
  `,
  styles: [`
    .permission-list-container { padding-bottom: 5rem; }
    .glass-panel {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
    }
    .perm-card {
      background: rgba(148, 163, 184, 0.03);
      padding: 1rem;
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.05);
      transition: all 0.2s;
      &:hover { border-color: var(--primary-color); background: rgba(34, 197, 94, 0.05); }
    }
  `]
})
export class PermissionListPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  protected readonly permissions = signal<any[]>([]);

  ngOnInit() {
    this.loadPermissions();
  }

  async loadPermissions() {
    try {
      const idx = await firstValueFrom(this.adminApi.getRolesIndex());
      this.permissions.set(idx.permissions);
    } catch {}
  }

  getName(name: string): string {
    const key = `perm.${name}`;
    const t = this.ui.t(key);
    return t !== key ? t : this.formatPermName(name);
  }

  getDesc(name: string): string {
    const key = `perm.${name}.desc`;
    const t = this.ui.t(key);
    return t !== key ? t : 'System controlled permission for ' + name;
  }

  formatPermName(name: string): string {
    return name.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' › ');
  }
}
