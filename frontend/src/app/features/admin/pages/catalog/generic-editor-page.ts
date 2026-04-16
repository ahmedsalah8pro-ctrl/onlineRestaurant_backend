import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-generic-editor',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="editor-shell animate-fade-in">
      <!-- Sticky Header -->
      <div class="header-glass sticky-header">
        <div class="header-main">
          <div class="header-left">
            <a pButton icon="pi pi-arrow-left" severity="secondary" [routerLink]="['/admin/catalog', resourceType()]" class="p-button-text p-button-rounded"></a>
            <div class="title-group">
              <span class="eyebrow-premium">{{ activeLabel() }}</span>
              <h2 class="page-title">{{ isEdit() ? ui.t('admin.catalog.edit') : ui.t('admin.catalog.create') }}</h2>
            </div>
          </div>
          <div class="header-right">
            <button pButton [label]="ui.t('admin.settings.save')" icon="pi pi-check" (click)="save()" [loading]="saving()" class="p-button-raised save-btn"></button>
          </div>
        </div>
      </div>

      <div class="content-container">
        <!-- Main Form Grid -->
        <div class="layout-grid">
          <!-- Left Column: Core Data -->
          <div class="main-column">
            <!-- General Info Section -->
            <div class="glass-card section-card">
              <div class="card-header">
                <i class="pi pi-info-circle"></i>
                <h3>{{ ui.t('admin.settings.localization') }}</h3>
              </div>
              <div class="card-content">
                <div class="form-grid two-cols">
                  <div class="field-stack">
                    <label>{{ ui.t('admin.catalog.arName') }}</label>
                    <div class="input-wrapper">
                      <i class="pi pi-language"></i>
                      <input pInputText [(ngModel)]="form.translations.ar" [placeholder]="ui.t('admin.catalog.arName')" />
                    </div>
                  </div>
                  <div class="field-stack">
                    <label>{{ ui.t('admin.catalog.enName') }}</label>
                    <div class="input-wrapper">
                      <i class="pi pi-globe"></i>
                      <input pInputText [(ngModel)]="form.translations.en" [placeholder]="ui.t('admin.catalog.enName')" />
                    </div>
                  </div>
                </div>

                <!-- Slug and Code -->
                <div class="form-grid two-cols mt-8" *ngIf="resourceType() !== 'delivery-zones'">
                  <div class="field-stack">
                    <label>Slug (URL Identifier)</label>
                    <div class="input-wrapper">
                      <i class="pi pi-link"></i>
                      <input pInputText [(ngModel)]="form.slug" placeholder="e.g. family-meals" />
                    </div>
                  </div>
                  <div class="field-stack" *ngIf="resourceType() === 'categories' || resourceType() === 'tags'">
                    <label>Internal Code</label>
                    <div class="input-wrapper">
                      <i class="pi pi-tag"></i>
                      <input pInputText [(ngModel)]="form.code" placeholder="e.g. CAT_01" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Branch Specific: Address -->
            <div class="glass-card section-card animate-slide-up" *ngIf="resourceType() === 'branches'">
               <div class="card-header">
                  <i class="pi pi-map-marker"></i>
                  <h3>Location Details</h3>
               </div>
               <div class="card-content">
                  <div class="form-grid two-cols">
                     <div class="field-stack">
                        <label>Phone Number</label>
                        <div class="input-wrapper">
                           <i class="pi pi-phone"></i>
                           <input pInputText [(ngModel)]="form.phone" placeholder="+20..." />
                        </div>
                     </div>
                     <div class="field-stack">
                        <label>Email Address</label>
                        <div class="input-wrapper">
                           <i class="pi pi-envelope"></i>
                           <input pInputText [(ngModel)]="form.email" placeholder="branch@example.com" />
                        </div>
                     </div>
                  </div>
                  
                  <div class="form-grid mt-8">
                     <div class="field-stack">
                        <label>Full Physical Address (Arabic)</label>
                        <div class="input-wrapper">
                           <i class="pi pi-map"></i>
                           <input pInputText [(ngModel)]="form.address_translations.ar" placeholder="العنوان بالتفصيل باللغة العربية" />
                        </div>
                     </div>
                     <div class="field-stack mt-4">
                        <label>Full Physical Address (English)</label>
                        <div class="input-wrapper">
                           <i class="pi pi-map"></i>
                           <input pInputText [(ngModel)]="form.address_translations.en" placeholder="Detailed address in English" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Addon Groups Specific -->
            <div class="glass-card section-card animate-slide-up" *ngIf="resourceType() === 'addon-groups'">
               <div class="card-header">
                  <i class="pi pi-list"></i>
                  <h3>Addon Options & Rules</h3>
               </div>
               <div class="card-content">
                  <div class="form-grid two-cols mb-8">
                     <div class="field-stack">
                        <label>Associated Product</label>
                        <p-select [options]="products()" [(ngModel)]="form.product_id" optionLabel="label" optionValue="id" [filter]="true" placeholder="Choose a product..." styleClass="w-full premium-select"></p-select>
                     </div>
                     <div class="field-stack">
                        <label>Selection Mode</label>
                        <p-select [options]="selectionTypes" [(ngModel)]="form.selection_type" optionLabel="label" optionValue="value" styleClass="w-full premium-select"></p-select>
                     </div>
                  </div>

                  <div class="settings-row mb-10">
                    <div class="info">
                      <span class="main">Required Choice</span>
                      <span class="sub">Forces customer to pick at least one option</span>
                    </div>
                    <p-toggleswitch [(ngModel)]="form.is_required"></p-toggleswitch>
                  </div>

                  <div class="form-grid two-cols animate-fade-in" *ngIf="form.selection_type === 'multiple'">
                    <div class="field-stack">
                      <label>Minimum Selection</label>
                      <p-inputnumber [(ngModel)]="form.min_select" [min]="0" showButtons="true" buttonLayout="horizontal" styleClass="w-full"></p-inputnumber>
                    </div>
                    <div class="field-stack">
                      <label>Maximum Selection</label>
                      <p-inputnumber [(ngModel)]="form.max_select" [min]="1" showButtons="true" buttonLayout="horizontal" styleClass="w-full"></p-inputnumber>
                    </div>
                  </div>

                  <div class="options-container mt-12">
                    <div class="flex-between mb-6">
                      <h4 class="text-white font-bold opacity-80 uppercase tracking-wider text-sm">Group Options</h4>
                      <button pButton icon="pi pi-plus" label="Add Option" (click)="addOption()" class="p-button-outlined p-button-sm"></button>
                    </div>

                    <div class="options-list">
                      <div *ngFor="let opt of form.options; let i = index" class="option-item-card animate-slide-up">
                        <div class="option-item-header">
                            <span>#{{ i + 1 }}</span>
                            <button pButton icon="pi pi-times" class="p-button-text p-button-danger p-button-sm" (click)="removeOption(i)"></button>
                        </div>
                        <div class="option-item-body">
                          <div class="form-grid two-cols">
                            <div class="field-stack">
                              <label>AR Name</label>
                              <input pInputText [(ngModel)]="opt.translations.ar" class="p-inputtext-sm" />
                            </div>
                            <div class="field-stack">
                              <label>EN Name</label>
                              <input pInputText [(ngModel)]="opt.translations.en" class="p-inputtext-sm" />
                            </div>
                          </div>
                          <div class="field-stack mt-4">
                            <label>Base Price</label>
                            <p-inputnumber [(ngModel)]="opt.base_price" [min]="0" mode="currency" [currency]="'EGP'" styleClass="w-full p-inputtext-sm"></p-inputnumber>
                          </div>
                        </div>
                      </div>
                      
                      <div *ngIf="!form.options.length" class="empty-state-mini">
                        <i class="pi pi-plus"></i>
                        <p>No options defined yet</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <!-- Delivery Zones -->
            <div class="glass-card section-card animate-slide-up" *ngIf="resourceType() === 'delivery-zones'">
               <div class="card-header">
                  <i class="pi pi-truck"></i>
                  <h3>Zone Logistics</h3>
               </div>
               <div class="card-content">
                  <div class="form-grid two-cols">
                     <div class="field-stack">
                        <label>Target Branch</label>
                        <p-select [options]="branches()" [(ngModel)]="form.branch_id" optionLabel="name" optionValue="id" placeholder="Select branch..." styleClass="w-full premium-select"></p-select>
                     </div>
                     <div class="field-stack">
                        <label>Delivery Fee (EGP)</label>
                        <p-inputnumber [(ngModel)]="form.delivery_fee" mode="decimal" [min]="0" styleClass="w-full"></p-inputnumber>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <!-- Right Column: Settings & Meta -->
          <div class="side-column">
            <!-- Visibility Card -->
            <div class="glass-card status-card">
              <div class="card-header mini">
                <i class="pi pi-eye"></i>
                <h3>Visibility</h3>
              </div>
              <div class="card-content">
                <div class="settings-row">
                  <div class="info">
                    <span class="main">Status</span>
                    <span class="sub">Allow items to be visible</span>
                  </div>
                  <p-toggleswitch [(ngModel)]="form.is_active"></p-toggleswitch>
                </div>
              </div>
            </div>

            <!-- Category Specific: Parent -->
            <div class="glass-card animate-slide-up" *ngIf="resourceType() === 'categories'">
               <div class="card-header mini">
                  <i class="pi pi-sitemap"></i>
                  <h3>Hierarchy</h3>
               </div>
               <div class="card-content">
                  <div class="field-stack">
                     <label>Parent Category</label>
                     <p-select [options]="categories()" [(ngModel)]="form.parent_id" optionLabel="label" optionValue="id" [showClear]="true" placeholder="Main Category" styleClass="w-full premium-select"></p-select>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.25rem 2rem;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
    }
    .header-left { display: flex; align-items: center; gap: 1.5rem; }
    .eyebrow {
      display: block;
      color: var(--primary-color);
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    h2 { margin: 0; font-size: 1.4rem; font-weight: 800; color: #f1f5f9; }
    
    .glass-panel {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 24px;
      padding: 3.5rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      min-height: 60vh;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .form-section {
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.015);
      border-radius: 28px;
      border: 1px solid rgba(148, 163, 184, 0.08);
      &:hover { border-color: rgba(148, 163, 184, 0.2); }
    }
    .form-section h3 {
      margin-top: 0;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      font-weight: 900;
      color: #f8fafc;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 1rem;
      &::before {
          content: ''; width: 4px; height: 1.25rem; background: var(--primary-color); border-radius: 4px;
      }
    }
    .form-grid { display: grid; gap: 1.5rem; }
    .form-grid.two-columns { grid-template-columns: 1fr 1fr; }
    .field-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      span { font-size: 0.85rem; font-weight: 700; color: #64748b; padding-inline-start: 0.25rem; }
    }
    .toggle-row-premium {
       display: flex;
       justify-content: space-between;
       align-items: center;
       background: rgba(15, 23, 42, 0.5);
       padding: 1.5rem 2rem;
       border-radius: 20px;
       border: 1px solid rgba(255,255,255,0.02);
       .label-main { font-weight: 800; color: #f1f5f9; display: block; }
       .label-sub { font-size: 0.75rem; color: #64748b; font-weight: 600; }
    }
    .addon-option-card {
       background: rgba(15, 23, 42, 0.4);
       border: 1px solid rgba(148, 163, 184, 0.1);
       border-radius: 20px;
       margin-bottom: 1.5rem;
       overflow: hidden;
    }
    .option-header {
       background: rgba(148, 163, 184, 0.05);
       padding: 0.75rem 1.5rem;
       display: flex;
       align-items: center;
       .option-tag { font-family: monospace; font-weight: 900; color: var(--primary-color); font-size: 0.75rem; }
    }
    .empty-hint {
       text-align: center;
       background: rgba(0,0,0,0.1);
       border-radius: 24px;
       border: 2px dashed rgba(148, 163, 184, 0.1);
       p { color: #475569; font-weight: 700; }
    }
    .flex-between { display: flex; justify-content: space-between; align-items: center; }
  `]
})
export class GenericEditorPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  private readonly message = inject(MessageService);

  protected readonly id = signal<number | null>(null);
  protected readonly resourceType = signal('');
  protected readonly isEdit = computed(() => !!this.id());
  protected readonly saving = signal(false);

  protected form: any = {
    is_active: true,
    translations: { ar: '', en: '' },
    address_translations: { ar: '', en: '' },
    slug: '',
    code: '',
    options: [],
    selection_type: 'single',
    is_required: false,
    phone: '',
    email: '',
    branch_id: null,
    product_id: null,
    parent_id: null,
    delivery_fee: 0,
    amount: 0
  };

  protected readonly selectionTypes = [
    { label: 'Single Choice', value: 'single' },
    { label: 'Multiple Choice', value: 'multiple' }
  ];
  
  protected readonly branches = signal<any[]>([]);
  protected readonly categories = signal<any[]>([]);
  protected readonly products = signal<any[]>([]);
  protected readonly storefront = { formatMoney: (v: any) => v + ' EGP', currency: () => ({ code: 'EGP' }) };

  protected readonly activeLabel = computed(() => {
    const map: any = {
      categories: this.ui.t('admin.catalog.categories'),
      tags: this.ui.t('admin.catalog.tags'),
      'addon-groups': this.ui.t('admin.catalog.addons'),
      branches: this.ui.t('admin.catalog.branches'),
      'delivery-zones': this.ui.t('admin.catalog.delivery'),
      coupons: this.ui.t('admin.catalog.coupons'),
    };
    return map[this.resourceType()] || this.resourceType();
  });

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.resourceType.set(params['resourceType']);
      if (params['id']) {
        this.id.set(Number(params['id']));
        await this.loadRecord();
      }
    });
    
    this.loadBranches();
    this.loadCategories();
    this.loadProducts();
  }

  async loadBranches() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('branches'));
      this.branches.set(data.map((b: any) => ({ id: b.id, name: this.theme.resolveText(b.translations || b.name) })));
    } catch {}
  }

  async loadCategories() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('categories'));
      this.categories.set(
        data
          .filter((c: any) => !this.id() || c.id !== this.id())
          .map((c: any) => ({ id: c.id, label: this.theme.resolveText(c.translations || c.name) }))
      );
    } catch {}
  }

  async loadProducts() {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('products'));
      this.products.set(data.map((p: any) => ({ id: p.id, label: this.theme.resolveText(p.translations || p.name) })));
    } catch {}
  }

  async loadRecord() {
    try {
      const r = await firstValueFrom(this.adminApi.showResource<any>(this.resourceType(), this.id()!));
      
      const getLang = (val: any, lang: string) => {
        if (typeof val === 'string') return val;
        if (val && typeof val === 'object') return val[lang] || '';
        return '';
      };

      this.form = {
        ...this.form,
        ...r,
        translations: {
          ar: getLang(r.translations?.ar || r.name, 'ar'),
          en: getLang(r.translations?.en || r.name, 'en')
        },
        address_translations: {
          ar: getLang(r.address_translations?.ar || r.address, 'ar'),
          en: getLang(r.address_translations?.en || r.address, 'en')
        }
      };

      if (this.resourceType() === 'addon-groups' && r.options) {
        this.form.options = r.options.map((o: any) => ({
          ...o,
          translations: {
            ar: getLang(o.translations?.ar || o.name, 'ar'),
            en: getLang(o.translations?.en || o.name, 'en')
          }
        }));
      }
    } catch {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Could not load record' });
    }
  }

  addOption() {
    this.form.options.push({ translations: { ar: '', en: '' }, base_price: 0 });
  }

  removeOption(index: number) {
    this.form.options.splice(index, 1);
  }

  async save() {
    this.saving.set(true);
    try {
      const payload: any = {
        ...this.form,
        name: this.form.translations,
      };

      if (this.resourceType() === 'branches') {
        payload.address = this.form.address_translations;
      }

      if (this.resourceType() === 'addon-groups') {
        payload.options = this.form.options.map((o: any) => ({
          ...o,
          name: o.translations
        }));
      }

      if (this.isEdit()) {
        await firstValueFrom(this.adminApi.updateResource(this.resourceType(), this.id()!, payload));
      } else {
        await firstValueFrom(this.adminApi.createResource(this.resourceType(), payload));
      }

      this.message.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
      this.router.navigate(['/admin/catalog', this.resourceType()]);
    } catch (err: any) {
      const detail = err.error?.message || 'Save failed';
      this.message.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.saving.set(false);
    }
  }
}
