import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="resource-container animate-fade-in">
      <div class="panel-glass-header mb-8">
        <div class="header-content">
          <div class="header-info">
            <span class="eyebrow-premium">{{ activeLabel() }}</span>
            <h2 class="page-title-catalog">{{ ui.t('admin.catalog.title') }}</h2>
          </div>
          <div class="header-actions">
             <a pButton [routerLink]="['create']" [label]="ui.t('admin.catalog.create')" icon="pi pi-plus" class="p-button-raised create-btn"></a>
          </div>
        </div>
      </div>

      <!-- Branch Filter for Delivery Zones -->
      @if (resourceType() === 'delivery-zones') {
        <div class="branch-filter-bar animate-slide-up">
          <div class="filter-label">
             <i class="pi pi-filter"></i>
             <span>{{ ui.t('menu.branch') }}:</span>
          </div>
          <div class="filter-chips">
             <button pButton type="button" [label]="ui.t('account.readAll')" [severity]="filterBranchId() === null ? undefined : 'secondary'" 
                     (click)="filterBranchId.set(null)" class="p-button-sm p-button-outlined"></button>
             <button pButton type="button" *ngFor="let b of branches()" [label]="b.name" [severity]="filterBranchId() === b.id ? undefined : 'secondary'" 
                     (click)="filterBranchId.set(b.id)" class="p-button-sm p-button-outlined"></button>
          </div>
        </div>
      }

      <div class="glass-panel-table shadow-2xl">
        <p-table [value]="filteredRecords()" [paginator]="true" [rows]="10" responsiveLayout="scroll" styleClass="p-datatable-gridlines-none custom-table">
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 5%">#</th>
            <th style="width: 35%">{{ ui.t('admin.catalog.name') }}</th>
            <th *ngIf="resourceType() === 'delivery-zones'" style="width: 15%">{{ ui.t('menu.branch') }}</th>
            <th style="width: 20%">{{ ui.t('admin.catalog.details') }}</th>
            <th style="width: 15%">{{ ui.t('admin.catalog.status') }}</th>
            <th style="width: 10%" class="text-center">{{ ui.t('admin.catalog.actions') }}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-record>
          <tr class="resource-row">
            <td><span class="id-badge">{{ record.id }}</span></td>
            <td>
              <div class="name-cell">
                <span class="record-title">{{ theme.resolveText(record.translations || record.name) }}</span>
                <span *ngIf="record.slug" class="record-slug">{{ record.slug }}</span>
              </div>
            </td>
            <td *ngIf="resourceType() === 'delivery-zones'">
               <span class="branch-chip">{{ theme.resolveText(record.branch?.name) || 'Branch ' + record.branch_id }}</span>
            </td>
            <td>
              <div class="meta-info-stack">
                 <span *ngIf="record.code && resourceType() !== 'delivery-zones'" class="meta-item"><i class="pi pi-tag mr-1"></i> {{ record.code }}</span>
                 <span *ngIf="record.amount" class="meta-item price">{{ storefront.formatMoney(record.amount) }}</span>
                 <span *ngIf="record.value" class="meta-item discount">{{ record.value }}{{ record.type === 'percentage' ? '%' : '' }} OFF</span>
                 <span *ngIf="record.delivery_fee" class="meta-item fee"><i class="pi pi-truck mr-1"></i> {{ storefront.formatMoney(record.delivery_fee) }}</span>
              </div>
            </td>
            <td>
               <div class="status-chip" [class.active]="record.is_active" [class.inactive]="record.is_active === false">
                  <i class="pi" [class.pi-check-circle]="record.is_active" [class.pi-times-circle]="record.is_active === false"></i>
                  <span>{{ record.is_active === false ? ui.t('admin.catalog.inactive') : ui.t('admin.catalog.active') }}</span>
               </div>
            </td>
            <td class="actions-cell">
               <div class="flex justify-center gap-2">
                  <a pButton [routerLink]="[record.id, 'edit']" icon="pi pi-pencil" severity="secondary" 
                     class="p-button-text p-button-rounded action-btn edit" [pTooltip]="ui.t('admin.catalog.edit')"></a>
                  <button pButton icon="pi pi-trash" severity="danger" 
                     class="p-button-text p-button-rounded action-btn delete" [pTooltip]="ui.t('admin.catalog.delete')" 
                     (click)="confirmDelete(record)"></button>
               </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  </div>
  `,
  styles: [`
    .resource-container { padding-bottom: 5rem; }
    
    .panel-glass-header {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 1.5rem 2.5rem;
    }
    .header-content { display: flex; justify-content: space-between; align-items: center; }
    .eyebrow-premium {
      display: block;
      color: var(--primary-color);
      font-size: 0.65rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      margin-bottom: 0.25rem;
    }
    .page-title-catalog { margin: 0; font-size: 1.4rem; font-weight: 800; color: #f1f5f9; }
    .create-btn { padding: 0.75rem 1.5rem !important; border-radius: 12px !important; }

    .glass-panel-table {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
      overflow-x: auto;
      
      &::-webkit-scrollbar { height: 6px; }
      &::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
      &::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.4); border-radius: 10px; }
    }
    
    ::ng-deep .custom-table {
        background: transparent !important;
        .p-datatable-header { background: transparent; border: none; }
        .p-datatable-thead > tr > th {
            background: rgba(148, 163, 184, 0.03) !important;
            color: #64748b;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
        .p-datatable-tbody > tr {
            background: transparent !important;
            color: #f1f5f9;
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
            &:hover {
                background: rgba(255, 255, 255, 0.02) !important;
                transform: translateX(4px);
            }
            > td {
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid rgba(148, 163, 184, 0.04);
            }
        }
        .p-paginator {
            background: transparent !important;
            border: none;
            padding: 2rem 0 0;
            .p-paginator-page, .p-paginator-next, .p-paginator-last, .p-paginator-first, .p-paginator-prev {
                background: rgba(255,255,255,0.03);
                color: #94a3b8;
                border-radius: 10px;
                margin: 0 4px;
                &:hover { background: rgba(34, 197, 94, 0.1); color: var(--primary-color); }
                &.p-highlight { background: var(--primary-color); color: white; }
            }
        }
    }

    .id-badge {
        font-family: monospace;
        background: rgba(148, 163, 184, 0.08);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-size: 0.8rem;
        color: #94a3b8;
    }
    .name-cell { display: flex; flex-direction: column; gap: 0.25rem; }
    .record-title { font-weight: 700; font-size: 1.05rem; }
    .record-slug { font-size: 0.75rem; color: #64748b; font-family: monospace; }
    
    .meta-info-stack { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .meta-item {
        font-size: 0.8rem;
        font-weight: 700;
        color: #94a3b8;
        background: rgba(148, 163, 184, 0.05);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        &.price { color: #f1f5f9; background: rgba(255,255,255,0.05); }
        &.discount { color: #f87171; background: rgba(239, 68, 68, 0.05); }
    }

    .branch-chip {
        background: rgba(34, 197, 94, 0.1);
        color: #4ade80;
        padding: 0.25rem 0.6rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 800;
        border: 1px solid rgba(34, 197, 94, 0.2);
    }
    
    .status-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        &.active { background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
        &.inactive { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }
    }

    .branch-filter-bar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: rgba(15, 23, 42, 0.3);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.05);
      .filter-label { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; color: #64748b; font-size: 0.8rem; text-transform: uppercase; }
      .filter-chips { 
        display: flex; 
        flex-wrap: nowrap; 
        gap: 0.75rem; 
        overflow-x: auto; 
        padding-bottom: 0.75rem;
        user-select: none;
        
        &::-webkit-scrollbar { height: 4px; }
        &::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        &::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.4); border-radius: 10px; transition: all 0.3s; }
        &::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.8); }
      }
    }
    .action-btn {
        transition: all 200ms ease;
        &:hover { transform: scale(1.1); }
        &.edit:hover { background: rgba(148, 163, 184, 0.1) !important; color: white !important; }
        &.delete:hover { background: rgba(239, 68, 68, 0.1) !important; color: #ef4444 !important; }
    }
  `]
})
export class ResourceListPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  private readonly route = inject(ActivatedRoute);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  protected readonly storefront = { formatMoney: (v: any) => v + ' EGP' }; // Mock or real service
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly resourceType = signal('');
  protected readonly records = signal<any[]>([]);
  protected readonly branches = signal<any[]>([]);
  protected readonly filterBranchId = signal<number | null>(null);

  protected readonly filteredRecords = computed(() => {
    let list = this.records();
    if (this.resourceType() === 'delivery-zones' && this.filterBranchId() !== null) {
      list = list.filter(r => r.branch_id === this.filterBranchId());
    }
    return list;
  });

  protected readonly activeLabel = computed(() => {
    const type = this.resourceType();
    const map: any = {
      categories: this.ui.t('admin.catalog.categories'),
      tags: this.ui.t('admin.catalog.tags'),
      'addon-groups': this.ui.t('admin.catalog.addons'),
      branches: this.ui.t('admin.catalog.branches'),
      'delivery-zones': this.ui.t('admin.catalog.delivery'),
      coupons: this.ui.t('admin.catalog.coupons'),
      'gift-cards': this.ui.t('admin.catalog.giftcards'),
    };
    return map[type] || type;
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceType.set(params['resourceType']);
      this.loadRecords();
    });
    this.loadBranches();
  }

  async loadRecords() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>(this.resourceType()));
      this.records.set(data);
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to load records' });
    }
  }

  async loadBranches() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('branches'));
      this.branches.set(data.map((b: any) => ({ id: b.id, name: this.theme.resolveText(b.translations || b.name) })));
    } catch {}
  }

  confirmDelete(record: any) {
    this.confirmation.confirm({
      message: `Are you sure you want to delete "${this.theme.resolveText(record.translations || record.name)}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteRecord(record.id)
    });
  }

  async deleteRecord(id: number) {
    try {
      await firstValueFrom(this.adminApi.deleteResource(this.resourceType(), id));
      this.message.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
      this.loadRecords();
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record' });
    }
  }
}
