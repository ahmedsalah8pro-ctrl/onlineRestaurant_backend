import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="glass-panel resource-card animate-fade-in shadow-2xl">
      <div class="panel-head">
        <div class="head-info">
          <span class="eyebrow">{{ ui.t('admin.catalog.title') }}</span>
          <h2>{{ ui.t('admin.catalog.products') }}</h2>
        </div>
        <div class="head-actions">
           <a pButton [routerLink]="['create']" [label]="ui.t('admin.catalog.create')" icon="pi pi-plus" class="p-button-raised"></a>
        </div>
      </div>

      <p-table [value]="products()" [paginator]="true" [rows]="10" responsiveLayout="scroll" styleClass="p-datatable-gridlines-none custom-table">
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 5%">#</th>
            <th style="width: 10%">{{ ui.t('admin.catalog.image') }}</th>
            <th style="width: 40%">{{ ui.t('admin.catalog.name') }}</th>
            <th style="width: 15%">{{ ui.t('admin.catalog.price') }}</th>
            <th style="width: 15%">{{ ui.t('admin.catalog.status') }}</th>
            <th style="width: 15%" class="text-center">{{ ui.t('admin.catalog.actions') }}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr class="product-row">
            <td><span class="id-badge">{{ product.id }}</span></td>
            <td>
               <div class="thumb-container">
                  <img [src]="runtime.resolveAsset(product.main_image_path) || 'assets/placeholder-product.jpg'" 
                       [alt]="product.name" 
                       class="product-thumb" />
                  <div class="thumb-overlay"><i class="pi pi-search"></i></div>
               </div>
            </td>
            <td>
              <div class="name-cell">
                <span class="product-title">{{ theme.resolveText(product.translations || product.name) }}</span>
                <span class="product-slug">{{ product.slug }}</span>
              </div>
            </td>
            <td>
               <span class="price-tag">{{ storefront.formatMoney(product.base_price) }}</span>
            </td>
            <td>
              <div class="status-chip" [class.active]="product.is_active" [class.inactive]="!product.is_active">
                 <i class="pi" [class.pi-check-circle]="product.is_active" [class.pi-times-circle]="!product.is_active"></i>
                 <span>{{ product.is_active ? ui.t('admin.catalog.active') : ui.t('admin.catalog.inactive') }}</span>
              </div>
            </td>
            <td class="actions-cell">
               <div class="flex justify-center gap-2">
                  <a pButton [routerLink]="[product.id, 'edit']" icon="pi pi-pencil" severity="secondary" 
                     class="p-button-text p-button-rounded action-btn edit" [pTooltip]="ui.t('admin.catalog.edit')"></a>
                  <button pButton icon="pi pi-trash" severity="danger" 
                     class="p-button-text p-button-rounded action-btn delete" [pTooltip]="ui.t('admin.catalog.delete')" 
                     (click)="confirmDelete(product)"></button>
               </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`
    .glass-panel {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
    }
    .panel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }
    .eyebrow {
      display: block;
      color: var(--primary-color);
      font-size: 0.7rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 0.5rem;
    }
    h2 { margin: 0; font-size: 1.8rem; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
    
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
    .thumb-container {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(148, 163, 184, 0.2);
    }
    .product-thumb { width:100%; height:100%; object-fit: cover; }
    .thumb-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.4);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 200ms;
        i { color: white; font-size: 1rem; }
    }
    .thumb-container:hover .thumb-overlay { opacity: 1; }

    .name-cell { display: flex; flex-direction: column; gap: 0.25rem; }
    .product-title { font-weight: 700; font-size: 1.05rem; }
    .product-slug { font-size: 0.75rem; color: #64748b; font-family: monospace; }
    
    .price-tag { font-weight: 800; color: #f1f5f9; }
    
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
    .action-btn {
        transition: all 200ms ease;
        &:hover { transform: scale(1.1); }
        &.edit:hover { background: rgba(148, 163, 184, 0.1) !important; color: white !important; }
        &.delete:hover { background: rgba(239, 68, 68, 0.1) !important; color: #ef4444 !important; }
    }
  `]
})
export class ProductListPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly storefront = inject(StorefrontService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly products = signal<any[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('products'));
      this.products.set(data);
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
    }
  }

  confirmDelete(product: any) {
    this.confirmation.confirm({
      message: `Are you sure you want to delete "${this.theme.resolveText(product.translations || product.name)}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteProduct(product.id)
    });
  }

  async deleteProduct(id: number) {
    try {
      await firstValueFrom(this.adminApi.deleteResource('products', id));
      this.message.add({ severity: 'success', summary: 'Success', detail: 'Product deleted' });
      this.loadProducts();
    } catch (err) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product' });
    }
  }
}
