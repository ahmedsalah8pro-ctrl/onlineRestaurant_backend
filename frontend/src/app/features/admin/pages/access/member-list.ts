import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="member-list-container animate-slide-up">
      <div class="flex-header mb-8">
        <div class="header-text">
          <span class="eyebrow">{{ ui.t('admin.section.customers') }}</span>
          <h2 class="section-title">{{ ui.t('admin.access.members') }}</h2>
        </div>
        <a pButton [routerLink]="['create']" [label]="ui.t('admin.access.addMember')" icon="pi pi-user-plus" class="p-button-raised create-btn-premium"></a>
      </div>

      <div class="glass-panel-table shadow-2xl">
        <p-table #dt [value]="members()" [paginator]="true" [rows]="10" dataKey="id"
                 [globalFilterFields]="['name', 'email', 'username', 'primary_phone']"
                 responsiveLayout="scroll" styleClass="p-datatable-gridlines-none custom-table">
          
          <ng-template pTemplate="caption">
             <div class="flex justify-between items-center mb-4 gap-4">
                <div class="search-box relative flex-1">
                   <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                   <input pInputText type="text" (input)="onFilter($event)" 
                          [placeholder]="ui.t('admin.catalog.search')" 
                          class="w-full pl-12 bg-slate-800/50 border-slate-700/30 rounded-xl focus:ring-primary/20" />
                </div>
                <div class="flex items-center gap-2">
                   <p-button icon="pi pi-refresh" severity="secondary" rounded="true" text="true" (click)="loadMembers()"></p-button>
                </div>
             </div>
          </ng-template>

          <ng-template pTemplate="header">
            <tr>
              <th style="width: 5%">#</th>
              <th pSortableColumn="name" style="width: 30%">{{ ui.t('account.name') }} <p-sortIcon field="name"></p-sortIcon></th>
              <th pSortableColumn="email" style="width: 20%">{{ ui.t('account.email') }} <p-sortIcon field="email"></p-sortIcon></th>
              <th pSortableColumn="wallet.balance" style="width: 10%">{{ ui.t('nav.wallet') }} <p-sortIcon field="wallet.balance"></p-sortIcon></th>
              <th style="width: 15%">{{ ui.t('menu.roles') }}</th>
              <th style="width: 15%">{{ ui.t('admin.catalog.status') }}</th>
              <th style="width: 10%" class="text-center">{{ ui.t('admin.catalog.actions') }}</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-member>
            <tr class="member-row">
              <td><span class="id-badge">{{ member.id }}</span></td>
              <td>
                <div class="member-info-cell">
                   <div class="avatar-circle">{{ getInitials(member.name) }}</div>
                   <div class="name-stack">
                      <span class="member-name">{{ member.name }}</span>
                      <span *ngIf="member.primary_phone" class="member-phone">{{ member.primary_phone }}</span>
                   </div>
                </div>
              </td>
              <td class="email-cell">{{ member.email }}</td>
              <td class="balance-cell text-center">
                 <span class="font-bold balance-badge">{{ storefront.formatMoney(member.wallet?.balance || 0) }}</span>
              </td>
              <td>
                 <div class="roles-stack">
                    @for (role of member.roles; track role.id) {
                       <span class="role-chip">{{ role.name }}</span>
                    } @empty {
                       <span class="text-slate-500 text-xs italic">User</span>
                    }
                 </div>
              </td>
              <td>
                 <div class="status-chip" [class.active]="member.is_active" [class.inactive]="member.is_active === false">
                    <i class="pi" [class.pi-check-circle]="member.is_active" [class.pi-times-circle]="member.is_active === false"></i>
                    <span>{{ member.is_active === false ? ui.t('admin.catalog.inactive') : ui.t('admin.catalog.active') }}</span>
                 </div>
              </td>
              <td class="actions-cell">
                 <div class="flex justify-center gap-2">
                    <a pButton [routerLink]="[member.id, 'edit']" icon="pi pi-pencil" severity="secondary" 
                       class="p-button-text p-button-rounded action-btn edit" [pTooltip]="ui.t('admin.catalog.edit')"></a>
                    <button pButton icon="pi pi-trash" severity="danger" 
                       class="p-button-text p-button-rounded action-btn delete" [pTooltip]="ui.t('admin.catalog.delete')" 
                       (click)="confirmDelete(member)"></button>
                 </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: [`
    .member-list-container { padding-bottom: 5rem; }
    .glass-panel-table {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
    }
    
    .balance-badge {
       background: rgba(34, 197, 94, 0.08);
       color: #4ade80;
       padding: 0.25rem 0.6rem;
       border-radius: 8px;
       font-size: 0.85rem;
       border: 1px solid rgba(34, 197, 94, 0.1);
    }

    ::ng-deep .custom-table {
        background: transparent !important;
        .p-datatable-header { background: transparent; border: none; padding: 0; }
        .p-datatable-thead > tr > th {
            background: rgba(148, 163, 184, 0.03) !important;
            color: #94a3b8;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 1.25rem 1rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.08);
            &:hover { background: rgba(148, 163, 184, 0.06) !important; }
            .p-sortable-column-icon { margin-left: 0.5rem; color: #475569; }
        }
        .p-datatable-tbody > tr {
            background: transparent !important;
            color: #f1f5f9;
            transition: all 0.3s;
            &:hover { background: rgba(255, 255, 255, 0.02) !important; }
            > td { padding: 1.25rem 1rem; border-bottom: 1px solid rgba(148, 163, 184, 0.05); }
        }
    }

    .member-info-cell { display: flex; align-items: center; gap: 1rem; }
    .avatar-circle {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), #22c55e);
      color: white; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.95rem; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
    }
    .member-name { font-weight: 700; color: #f1f5f9; font-size: 1rem; }
    .member-phone { font-size: 0.75rem; color: #64748b; font-family: monospace; }
    .email-cell { color: #94a3b8; font-size: 0.85rem; }

    .id-badge {
        font-family: monospace;
        background: rgba(148, 163, 184, 0.06);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-size: 0.75rem;
        color: #64748b;
    }

    .role-chip {
       background: rgba(59, 130, 246, 0.1); color: #60a5fa; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(59, 130, 246, 0.2);
    }

    .status-chip {
        display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; border-radius: 12px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase;
        &.active { background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
        &.inactive { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }
    }
  `]
})
export class MemberListPage implements OnInit {
  protected readonly storefront = inject(StorefrontService);
  protected readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  @ViewChild('dt') table?: Table;

  protected readonly members = signal<any[]>([]);

  ngOnInit() {
    this.loadMembers();
  }

  async loadMembers() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('users'));
      this.members.set((data as any).items || data);
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to load members' });
    }
  }

  onFilter(event: any) {
    this.table?.filterGlobal(event.target.value, 'contains');
  }

  protected getInitials(name: string): string {
    return (name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  }

  confirmDelete(member: any) {
    this.confirm.confirm({
      message: this.ui.t('account.deleteAddressMessage').replace('address', 'member').replace('العنوان', 'العضو'),
      header: this.ui.t('account.deleteAddressTitle').replace('Address', 'Member').replace('العنوان', 'العضو'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.ui.t('admin.catalog.delete'),
      rejectLabel: this.ui.t('admin.catalog.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteMember(member.id)
    });
  }

  async deleteMember(id: number) {
    try {
      await firstValueFrom(this.adminApi.deleteResource('users', id));
      this.message.add({ severity: 'success', summary: 'Success', detail: 'Member deleted' });
      await this.loadMembers();
    } catch (err: any) {
        let detail = 'Delete failed';
        if (err.error?.message) detail = err.error.message;
        this.message.add({ severity: 'error', summary: 'Error', detail });
    }
  }
}
