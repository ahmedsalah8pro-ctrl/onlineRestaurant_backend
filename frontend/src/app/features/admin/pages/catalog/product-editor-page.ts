import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-editor',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  template: `
    <div class="editor-header animate-fade-in">
      <div class="header-left">
        <a pButton icon="pi pi-arrow-left" severity="secondary" [routerLink]="['/admin/catalog/products']" class="p-button-text"></a>
        <div>
          <span class="eyebrow">{{ ui.t('admin.catalog.title') }}</span>
          <h2>{{ isEdit() ? ui.t('admin.catalog.edit') : ui.t('admin.catalog.create') }}</h2>
        </div>
      </div>
      <div class="header-actions">
        <button pButton [label]="ui.t('admin.settings.save')" icon="pi pi-check" (click)="save()" [loading]="saving()"></button>
      </div>
    </div>

    <div class="glass-panel editor-card animate-slide-up">
      <p-tabs [value]="0">
        <p-tablist class="bg-transparent">
            <p-tab [value]="0"><i class="pi pi-info-circle mr-2"></i> {{ ui.t('admin.settings.general') }}</p-tab>
            <p-tab [value]="1"><i class="pi pi-th-large mr-2"></i> {{ ui.t('product.sizes') }}</p-tab>
            <p-tab [value]="2"><i class="pi pi-plus-circle mr-2"></i> {{ ui.t('admin.catalog.addons') }}</p-tab>
            <p-tab [value]="3"><i class="pi pi-images mr-2"></i> {{ ui.t('admin.section.media') }}</p-tab>
            <p-tab [value]="4"><i class="pi pi-cog mr-2"></i> {{ ui.t('admin.settings.advanced') }}</p-tab>
        </p-tablist>
        
        <p-tabpanels class="bg-transparent">
            <!-- Tab 0: Basic Info -->
            <p-tabpanel [value]="0">
              <div class="form-container">
                <div class="form-grid-top">
                  <div class="form-section flex-1">
                    <h3>{{ ui.t('admin.settings.general') }}</h3>
                    <div class="form-grid">
                       <label class="field-stack">
                         <span title="The base price if no size is chosen">{{ ui.t('admin.catalog.price') }}</span>
                         <p-inputnumber [(ngModel)]="form.base_price" mode="decimal" [min]="0" styleClass="w-full" [placeholder]="ui.t('admin.catalog.price')"></p-inputnumber>
                       </label>
                       
                       <div class="flex-column" style="gap: 1.25rem; margin-top: 1rem;">
                          <div class="flex-center" style="gap: 0.75rem; min-height: 2.5rem;">
                             <p-toggleswitch [(ngModel)]="form.is_active" inputId="activeFlag"></p-toggleswitch>
                             <label for="activeFlag" class="toggle-label">{{ ui.t('admin.catalog.active') }}</label>
                          </div>
                          
                          <div class="flex-center" style="gap: 0.75rem; min-height: 2.5rem;">
                             <p-toggleswitch [(ngModel)]="form.is_best_seller_pinned" inputId="bestSellerFlag"></p-toggleswitch>
                             <label for="bestSellerFlag" class="toggle-label">{{ ui.t('home.metrics.bestSellers') }}</label>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div class="form-section flex-1">
                     <h3>{{ ui.t('admin.catalog.branches') }}</h3>
                     <div class="toggle-row" style="margin-bottom: 1.5rem;">
                        <span title="Enable to show this product across all restaurant locations">{{ ui.t('admin.catalog.availableInAllBranches') }}</span>
                        <p-toggleswitch [(ngModel)]="form.is_available_in_all_branches"></p-toggleswitch>
                     </div>
                     
                     @if (!form.is_available_in_all_branches) {
                        <label class="field-stack animate-fade-in">
                           <span title="Select specific branches where this item is available">{{ ui.t('admin.catalog.selectBranches') }}</span>
                           <p-multiselect [options]="branches()" [(ngModel)]="selectedBranches" 
                                          optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.branches')" appendTo="body" styleClass="w-full"></p-multiselect>
                        </label>
                     }
                  </div>
                </div>

                <div class="form-section">
                  <h3>{{ ui.t('admin.catalog.categories') }} & {{ ui.t('admin.catalog.tags') }}</h3>
                  <div class="form-grid two-columns">
                     <label class="field-stack">
                       <span title="Filter the menu for users by these categories">{{ ui.t('admin.catalog.categories') }}</span>
                       <p-multiselect [options]="categories()" [(ngModel)]="selectedCategories" 
                                     optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.category')" appendTo="body"></p-multiselect>
                     </label>
                     <label class="field-stack">
                       <span title="Apply visual labels or simple keywords">{{ ui.t('admin.catalog.tags') }}</span>
                       <p-multiselect [options]="tags()" [(ngModel)]="selectedTags" 
                                     optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.tag')" appendTo="body"></p-multiselect>
                     </label>
                  </div>
                </div>

                <div class="form-section">
                  <h3>{{ ui.t('admin.settings.localization') }}</h3>
                  <div class="lang-tabs-wrapper">
                     <p-tabs [value]="0">
                        <p-tablist class="bg-transparent inner-tabs">
                            <p-tab [value]="0">{{ ui.t('admin.catalog.arName') }}</p-tab>
                            <p-tab [value]="1">{{ ui.t('admin.catalog.enName') }}</p-tab>
                        </p-tablist>
                        <p-tabpanels style="padding: 1.5rem 0; background: transparent !important; border: none !important;">
                            <!-- Arabic -->
                            <p-tabpanel [value]="0">
                               <div class="trans-grid">
                                  <label class="field-stack">
                                    <span>{{ ui.t('admin.catalog.name') }}</span>
                                    <input pInputText [(ngModel)]="form.translations.ar.name" placeholder="مثلاً: بيف برجر عائلي" />
                                  </label>
                                  <label class="field-stack">
                                    <span>{{ ui.t('admin.catalog.details') }} (SEO)</span>
                                    <input pInputText [(ngModel)]="form.translations.ar.title" placeholder="عنوان يظهر في محركات البحث" />
                                  </label>
                                  <label class="field-stack">
                                    <span>{{ ui.t('admin.settings.tagline') }}</span>
                                    <input pInputText [(ngModel)]="form.translations.ar.short_description" placeholder="وصف مقتصر يظهر في القائمة الرئيسية" />
                                  </label>
                                  <label class="field-stack full-width">
                                    <span>{{ ui.t('admin.catalog.arDescription') }}</span>
                                    <textarea pTextarea rows="4" [(ngModel)]="form.translations.ar.description" placeholder="اكتب تفاصيل المنتج ومكوناته هنا..."></textarea>
                                  </label>
                               </div>
                            </p-tabpanel>
                            <!-- English -->
                            <p-tabpanel [value]="1">
                               <div class="trans-grid">
                                  <label class="field-stack">
                                    <span>{{ ui.t('admin.catalog.name') }}</span>
                                    <input pInputText [(ngModel)]="form.translations.en.name" placeholder="e.g. Family Beef Burger" (blur)="onNameBlur()" />
                                  </label>
                                  <label class="field-stack">
                                    <span>SEO Title</span>
                                    <input pInputText [(ngModel)]="form.translations.en.title" placeholder="Meta title for Google" />
                                  </label>
                                  <label class="field-stack">
                                    <span>Short Description</span>
                                    <input pInputText [(ngModel)]="form.translations.en.short_description" placeholder="Brief hint in list view" />
                                  </label>
                                  <label class="field-stack full-width">
                                    <span>Full Product Details</span>
                                    <textarea pTextarea rows="4" [(ngModel)]="form.translations.en.description" placeholder="Ingredients, calories, and full marketing text..."></textarea>
                                  </label>
                               </div>
                            </p-tabpanel>
                        </p-tabpanels>
                     </p-tabs>
                  </div>
                </div>
              </div>
            </p-tabpanel>

            <!-- Tab 1: Sizes -->
            <p-tabpanel [value]="1">
               <div class="form-section">
                  <div class="section-header">
                     <div class="header-text">
                        <h3>{{ ui.t('product.sizes') }}</h3>
                        <p>{{ ui.t('home.capability.variants') }}</p>
                     </div>
                     <button pButton icon="pi pi-plus" [label]="ui.t('admin.catalog.create')" class="p-button-outlined" (click)="addSize()"></button>
                  </div>

                  <div class="sizes-list">
                     <div *ngFor="let size of form.sizes; let i = index" class="size-item-card animate-fade-in shadow-lg">
                        <div class="size-card-header">
                           <span class="size-index">#{{ i + 1 }}</span>
                           <div class="size-main-toggle">
                               <p-radiobutton [value]="true" [(ngModel)]="size.is_default" (click)="setMainSize(i)" [id]="'main_size_' + i"></p-radiobutton>
                               <label [for]="'main_size_' + i" class="cursor-pointer ml-2">{{ ui.t('account.setDefault') }}</label>
                           </div>
                           <button pButton icon="pi pi-trash" severity="danger" class="p-button-text p-button-sm ml-auto" (click)="removeSize(i)"></button>
                        </div>
                        
                        <div class="size-card-body">
                           <div class="form-grid three-columns">
                               <label class="field-stack">
                                  <span title="Technical code for mapping, e.g. 'lg'">{{ ui.t('admin.catalog.code') }}</span>
                                  <input pInputText [(ngModel)]="size.code" placeholder="large" />
                               </label>
                               <label class="field-stack">
                                  <span title="AR Name">{{ ui.t('admin.catalog.arName') }}</span>
                                  <input pInputText [(ngModel)]="size.translations.ar" placeholder="كبير - حائلي" />
                               </label>
                               <label class="field-stack">
                                  <span title="EN Name">Name (EN)</span>
                                  <input pInputText [(ngModel)]="size.translations.en" placeholder="Large / Family" />
                               </label>
                           </div>
                           <div class="price-input-wrapper mt-4">
                               <label class="field-stack w-full">
                                  <span title="Price specifically for this size">{{ ui.t('admin.catalog.price') }}</span>
                                  <p-inputnumber [(ngModel)]="size.price" mode="decimal" [min]="0" styleClass="w-full" [placeholder]="ui.t('admin.catalog.price')"></p-inputnumber>
                               </label>
                           </div>
                        </div>
                     </div>

                     @if (!form.sizes.length) {
                        <div class="empty-hint">
                           <i class="pi pi-box mb-3 text-4xl opacity-50"></i>
                           <p>لا توجد أحجام لهذا المنتج. سيتم استخدام السعر الأساسي.</p>
                        </div>
                     }
                  </div>
               </div>
            </p-tabpanel>

            <!-- Tab 2: Addons -->
            <p-tabpanel [value]="2">
               <div class="form-section">
                  <div class="section-header mb-6">
                     <div class="header-text">
                        <h3>{{ ui.t('admin.catalog.addons') }}</h3>
                        <p>Customize add-on pricing per product size</p>
                     </div>
                     <p-multiselect [options]="addonGroupsList()" [(ngModel)]="selectedAddonGroups" 
                                    (onChange)="syncAddonGroupsSelection()"
                                    optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.addons')" 
                                    appendTo="body" styleClass="w-full max-w-sm"></p-multiselect>
                  </div>
                  
                  <div class="addon-editing-list">
                     <div *ngFor="let group of form.addon_groups; let gIdx = index" class="addon-group-edit-card mb-4 animate-fade-in">
                        <div class="group-header" (click)="group.expanded = !group.expanded">
                           <i class="pi" [class.pi-chevron-down]="group.expanded" [class.pi-chevron-right]="!group.expanded"></i>
                           <span class="group-name">{{ group.name }}</span>
                           <span class="group-badge ml-3">{{ group.options.length }} Options</span>
                        </div>
                        
                        <div class="group-body" *ngIf="group.expanded">
                           <div *ngFor="let opt of group.options; let oIdx = index" class="option-row">
                              <div class="option-main-info">
                                 <span class="option-name">{{ opt.name }}</span>
                                 <div class="option-price-stack">
                                    <span class="text-xs text-slate-500 uppercase font-bold">Base Price</span>
                                    <p-inputnumber [(ngModel)]="opt.base_price" mode="decimal" [min]="0" styleClass="p-inputtext-sm" placeholder="Base"></p-inputnumber>
                                 </div>
                              </div>
                              
                              <div class="option-overrides" *ngIf="form.sizes.length > 0">
                                 <div class="override-header">
                                    <i class="pi pi-sliders-h"></i>
                                    <span>{{ ui.t('admin.catalog.price_override') }}</span>
                                 </div>
                                 <div class="override-grid">
                                    <div *ngFor="let size of form.sizes" class="size-price-input">
                                       <span class="text-xs text-slate-400">{{ size.translations.en || size.code }}</span>
                                       <p-inputnumber [(ngModel)]="opt.size_price_overrides[size.id || size.code]" 
                                                      mode="decimal" [min]="0" 
                                                      class="p-inputnumber-sm" [placeholder]="opt.base_price || '0'"></p-inputnumber>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  @if (!selectedAddonGroups.length) {
                     <div class="empty-hint">
                        <i class="pi pi-plus-circle mb-3 text-4xl opacity-50"></i>
                        <p>No addon groups selected for this product.</p>
                     </div>
                  }
               </div>
            </p-tabpanel>

            <!-- Tab 3: Media -->
            <p-tabpanel [value]="3">
               <div class="form-section">
                  <h3>{{ ui.t('admin.catalog.image') }}</h3>
                  <div class="main-image-upload">
                     <div class="preview-wrapper">
                         <img [src]="resolveImage(form.main_image_path)" class="main-preview" />
                        <div class="image-overlay" *ngIf="!form.main_image_path">
                           <span>Select Primary Image</span>
                        </div>
                     </div>
                     <div class="upload-controls">
                        <label class="field-stack">
                           <span>{{ ui.t('admin.settings.fontPath') }} (URL)</span>
                           <input pInputText [(ngModel)]="form.main_image_path" [placeholder]="ui.t('admin.catalog.image')" style="width:100%"/>
                        </label>
                        <p-fileupload mode="basic" [auto]="true" [customUpload]="true" (uploadHandler)="uploadMainImage($event)" [chooseLabel]="ui.t('admin.settings.uploadAsset')" styleClass="w-full"></p-fileupload>
                     </div>
                  </div>

                  <div class="section-divider my-12"></div>

                  <h3>{{ ui.t('admin.section.media') }} (Gallery)</h3>
                  <div class="media-gallary">
                     <div *ngFor="let m of form.media; let i = index" class="media-entry-card shadow-lg animate-fade-in">
                        <div class="media-toolbar">
                           <p-radiobutton [value]="true" [id]="'primary_media_'+i" [(ngModel)]="m.is_primary"></p-radiobutton>
                           <label [for]="'primary_media_'+i" class="text-xs font-bold text-slate-400 ml-2">Primary</label>
                           <button pButton icon="pi pi-trash" severity="danger" (click)="removeMedia(i)" class="p-button-text ml-auto"></button>
                        </div>
                        <div class="media-card-body">
                           <div class="media-preview-container mb-3" style="aspect-ratio: 1; border-ratio: 12px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
                               @if (m.media_type === 'image') {
                                   <img [src]="resolveImage(m.url)" style="width:100%; height:100%; object-fit: cover;" />
                               } @else {
                                   <i class="pi pi-video text-4xl opacity-50"></i>
                               }
                           </div>
                          <p-select [options]="mediaTypes" [(ngModel)]="m.media_type" optionLabel="label" optionValue="value" appendTo="body" styleClass="w-full mb-3"></p-select>
                           <input pInputText [(ngModel)]="m.url" placeholder="URL / Storage Path" class="w-full" />
                        </div>
                     </div>
                     
                     <div class="gallery-actions-grid mt-6">
                        <button pButton icon="pi pi-link" [label]="'Link External Video'" severity="secondary" (click)="addMedia()" class="p-button-outlined"></button>
                        <p-fileupload mode="basic" [auto]="true" [customUpload]="true" (uploadHandler)="uploadSubMedia($event)" chooseLabel="Upload File" severity="secondary" styleClass="p-button-outlined"></p-fileupload>
                     </div>
                  </div>
               </div>
            </p-tabpanel>

            <!-- Tab 4: Advanced -->
            <p-tabpanel [value]="4">
               <div class="form-section">
                  <h3>إدارة تقنية / Technical Management</h3>
                  <div class="form-grid two-columns">
                      <label class="field-stack">
                        <span>Database ID / معرف المنتج</span>
                        <input pInputText [value]="id() || 'New'" disabled />
                      </label>
                      <label class="field-stack">
                        <span>Technical Slug / الرابط</span>
                        <input pInputText [(ngModel)]="form.slug" [placeholder]="suggestedSlug()" />
                      </label>
                  </div>

                  <div class="advanced-danger-zone mt-12 pt-8 border-t border-slate-800">
                    <details class="raw-json-details">
                      <summary class="cursor-pointer text-slate-500 hover:text-primary transition-colors">
                        <i class="pi pi-code mr-2"></i> View Raw Data Structure (Developer Only)
                      </summary>
                      <pre class="json-debug mt-4">{{ form | json }}</pre>
                    </details>
                  </div>
               </div>
            </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </div>
  `,
  styles: [`
    .form-grid-top {
        display: flex;
        gap: 2.5rem;
    }
    .flex-1 { flex: 1; }
    .toggle-label {
        font-weight: 700;
        color: #cbd5e1;
        cursor: pointer;
        font-size: 0.95rem;
    }
    .lang-tabs-wrapper {
        background: rgba(15, 23, 42, 0.4);
        border-radius: 20px;
        border: 1px solid rgba(148, 163, 184, 0.08);
        padding: 0.5rem;
    }
    .inner-tabs {
        button {
            padding: 0.75rem 1.5rem !important;
            font-size: 0.85rem !important;
        }
    }
    .trans-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        .full-width { grid-column: span 2; }
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
      .header-text p {
          margin: 0;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
      }
    }
    .size-item-card {
      background: rgba(15, 23, 42, 0.5);
      border-radius: 24px;
      border: 1px solid rgba(148, 163, 184, 0.08);
      margin-bottom: 2rem;
      overflow: hidden;
      transition: all 300ms ease;
      &:hover {
          border-color: var(--primary-color);
          transform: scale(1.005);
      }
    }
    .size-card-header {
      display: flex;
      align-items: center;
      padding: 1.25rem 2rem;
      background: rgba(148, 163, 184, 0.04);
      border-bottom: 1px solid rgba(148, 163, 184, 0.06);
    }
    .size-index {
        font-family: monospace;
        font-weight: 900;
        color: var(--primary-color);
        background: rgba(34, 197, 94, 0.1);
        padding: 0.25rem 0.6rem;
        border-radius: 8px;
    }
    .size-main-toggle {
        margin-inline-start: 2rem;
        display: flex;
        align-items: center;
        background: rgba(255,255,255,0.03);
        padding: 0.5rem 1rem;
        border-radius: 12px;
        label { font-size: 0.85rem; color: #94a3b8; font-weight: 700; }
    }
    .size-card-body {
        padding: 2rem;
    }
    .form-grid.three-columns {
        grid-template-columns: 1fr 1fr 1fr;
    }
    .addon-editing-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .addon-group-edit-card {
        background: rgba(15, 23, 42, 0.3);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 20px;
        overflow: hidden;
    }
    .group-header {
        padding: 1.25rem 1.75rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        background: rgba(148, 163, 184, 0.03);
        font-weight: 800;
        color: #f1f5f9;
        transition: background 200ms;
        &:hover { background: rgba(148, 163, 184, 0.08); }
        .group-badge {
            font-size: 0.75rem;
            background: rgba(34, 197, 94, 0.2);
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            color: #86efac;
        }
    }
    .group-body {
        padding: 1rem 1.75rem 2rem;
        background: rgba(0,0,0,0.2);
    }
    .option-row {
        padding: 1.5rem 0;
        border-bottom: 1px solid rgba(148, 163, 184, 0.05);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        &:last-child { border: none; }
    }
    .option-main-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .option-name { font-weight: 700; color: #cbd5e1; }
    }
    .option-price-stack {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        align-items: flex-end;
    }
    .option-overrides {
        background: rgba(15, 23, 42, 0.4);
        padding: 1.25rem;
        border-radius: 16px;
        border: 1px solid rgba(34, 197, 94, 0.1);
    }
    .override-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        font-size: 0.75rem;
        font-weight: 900;
        text-transform: uppercase;
        color: var(--primary-color);
    }
    .override-grid {
        display: flex;
        overflow-x: auto;
        gap: 1.5rem;
        padding-bottom: 1rem;
        &::-webkit-scrollbar { height: 4px; }
        &::-webkit-scrollbar-track { background: rgba(148, 163, 184, 0.05); }
        &::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.4); border-radius: 10px; }
    }
    .size-price-input {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }
    .preview-wrapper {
        position: relative;
        width: 240px;
        height: 240px;
        flex-shrink: 0;
        border-radius: 30px;
        overflow: hidden;
        background: #000;
        img { width: 100%; height: 100%; object-fit: cover; }
    }
    .image-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 0.8rem;
        border-radius: 30px;
    }
    .media-gallary {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }
    .media-entry-card {
        background: rgba(15, 23, 42, 0.6);
        border-radius: 20px;
        border: 1px solid rgba(148, 163, 184, 0.1);
        padding: 1.5rem;
    }
    .media-toolbar {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(148, 163, 184, 0.05);
    }
    .advanced-danger-zone {
        background: rgba(239, 68, 68, 0.02);
        margin: 2rem -2.5rem -2.5rem;
        padding: 2.5rem;
        border-radius: 0 0 24px 24px;
    }
    /* PrimeNG Overrides for Dark Mode Selectors */
    ::ng-deep {
        .p-tablist-tab-list {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            &::-webkit-scrollbar { height: 4px; }
            &::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
            &::-webkit-scrollbar-thumb { background: var(--primary-color); border-radius: 10px; }
        }

        .p-multiselect-panel, .p-select-panel, .p-listbox-panel {
            background: #111827 !important;
            border: 1px solid rgba(148, 163, 184, 0.2) !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important;
            .p-multiselect-header, .p-select-header {
                background: rgba(255,255,255,0.03) !important;
                border-bottom: 1px solid rgba(148, 163, 184, 0.1) !important;
                input { background: #0f172a !important; }
            }
            .p-multiselect-items, .p-select-items {
                padding: 0.5rem !important;
                .p-multiselect-item, .p-select-item {
                    border-radius: 8px !important;
                    margin-bottom: 2px !important;
                    color: #94a3b8 !important;
                    &:hover { background: rgba(34, 197, 94, 0.1) !important; color: white !important; }
                    &.p-multiselect-item-selected, &.p-select-item-selected {
                        background: var(--primary-color) !important;
                        color: white !important;
                    }
                }
            }
        }
    }
  `]
})
export class ProductEditorPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  protected readonly runtime = inject(RuntimeConfigService);
  private readonly message = inject(MessageService);

  protected readonly id = signal<number | null>(null);
  protected readonly isEdit = computed(() => !!this.id());
  protected readonly saving = signal(false);

  // Form State
  protected form = {
    slug: '',
    base_price: 0,
    is_active: true,
    is_available_in_all_branches: true,
    is_best_seller_pinned: false,
    best_seller_rank: null as number | null,
    is_limited_stock: false,
    stock_quantity: null as number | null,
    sort_order: 0,
    main_image_path: '',
    translations: {
      ar: { name: '', title: '', short_description: '', description: '' },
      en: { name: '', title: '', short_description: '', description: '' },
    },
    sizes: [] as any[],
    addon_groups: [] as any[],
    media: [] as any[]
  };

  protected selectedCategories: any[] = [];
  protected selectedTags: any[] = [];
  protected selectedBranches: any[] = [];
  protected selectedAddonGroups: any[] = [];

  // Data Lists
  protected categories = signal<any[]>([]);
  protected tags = signal<any[]>([]);
  protected branches = signal<any[]>([]);
  protected addonGroupsList = signal<any[]>([]);

  protected readonly mediaTypes = [
    { label: 'Image', value: 'image' },
    { label: 'Video', value: 'video' },
    { label: 'YouTube', value: 'external_video' }
  ];

  protected resolveImage(path?: string | null): string {
    return this.runtime.resolveAsset(path, 'https://placehold.co/640x420/111827/ffffff?text=Image');
  }

  protected readonly mainSizeLabel = computed(() => {
    const main = this.form.sizes.find((s: any) => s.is_default);
    return main ? this.theme.resolveText(main.translations) : 'Select Size';
  });

  async ngOnInit() {
    await this.loadDependencies();
    
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id.set(Number(params['id']));
        await this.loadProduct();
      }
    });
  }

  async loadDependencies() {
    try {
      const [cats, tags, addons, branches] = await Promise.all([
        firstValueFrom(this.adminApi.listResource<any>('categories')),
        firstValueFrom(this.adminApi.listResource<any>('tags')),
        firstValueFrom(this.adminApi.listResource<any>('addon-groups')),
        firstValueFrom(this.adminApi.listResource<any>('branches'))
      ]);
      
      const resolve = (obj: any) => {
          if (!obj) return 'Unnamed';
          const t = this.theme.resolveText(obj.translations || obj.name);
          return (t && t !== 'null' && t !== '') ? t : (obj.slug || 'ID: ' + obj.id);
      };

      this.categories.set(cats.map(c => ({ id: c.id, name: resolve(c) })));
      this.tags.set(tags.map(t => ({ id: t.id, name: resolve(t) })));
      this.addonGroupsList.set(addons.map(a => ({ 
        id: a.id, 
        name: resolve(a), 
        options: (a.options || []).map((o: any) => ({
           id: o.id,
           name: this.theme.resolveText(o.translations || o.name),
           base_price: o.base_price
        }))
      })));
      this.branches.set(branches.map(b => ({ id: b.id, name: resolve(b) })));
    } catch (err) {
      console.error('Failed to load dependencies', err);
    }
  }

  async loadProduct() {
     try {
       const p = await firstValueFrom(this.adminApi.showResource<any>('products', this.id()!));
       // Hydrate form
       this.form.slug = p.slug;
       this.form.base_price = p.base_price;
       this.form.is_active = p.is_active;
       this.form.is_best_seller_pinned = p.is_best_seller_pinned ?? false;
       this.form.best_seller_rank = p.best_seller_rank;
       this.form.is_limited_stock = p.is_limited_stock ?? false;
       this.form.stock_quantity = p.stock_quantity;
       this.form.sort_order = p.sort_order ?? 0;
       this.form.is_available_in_all_branches = p.is_available_in_all_branches ?? true;
       this.form.main_image_path = p.main_image_path;
       
       // Translations - Ensure we extract strings even if p.name etc are objects
       const getLang = (val: any, lang: string) => {
         if (typeof val === 'string') return val;
         if (val && typeof val === 'object') return val[lang] || '';
         return '';
       };

       this.form.translations.ar = {
         name: getLang(p.translations?.ar || p.name, 'ar'),
         title: getLang(p.title_translations?.ar || p.title, 'ar'),
         short_description: getLang(p.short_description_translations?.ar || p.short_description, 'ar'),
         description: getLang(p.description_translations?.ar || p.description, 'ar'),
       };
       this.form.translations.en = {
         name: getLang(p.translations?.en || p.name, 'en'),
         title: getLang(p.title_translations?.en || p.title, 'en'),
         short_description: getLang(p.short_description_translations?.en || p.short_description, 'en'),
         description: getLang(p.description_translations?.en || p.description, 'en'),
       };

       this.form.sizes = (p.sizes ?? []).map((s: any) => ({
         id: s.id,
         code: s.code,
         price: s.price,
         is_default: s.is_default,
         translations: {
           ar: getLang(s.translations?.ar || s.name, 'ar'),
           en: getLang(s.translations?.en || s.name, 'en')
         }
       }));

       this.form.addon_groups = (p.addon_groups ?? []).map((g: any) => ({
          id: g.id,
          name: this.theme.resolveText(g.translations || g.name),
          selection_type: g.selection_type,
          min_select: g.min_select,
          max_select: g.max_select,
          is_required: g.is_required,
          expanded: false,
          options: (g.options || []).map((o: any) => ({
             id: o.id,
             name: this.theme.resolveText(o.translations || o.name),
             base_price: o.base_price,
             size_price_overrides: o.size_price_overrides || {}
          }))
       }));

       this.form.media = (p.media ?? []).map((m: any) => ({
          url: m.path || m.external_url || '',
          media_type: m.media_type,
          is_primary: !!m.is_primary
       }));

       this.selectedCategories = (p.categories ?? []).map((c: any) => c.id);
       this.selectedTags = (p.tags ?? []).map((t: any) => t.id);
       this.selectedBranches = (p.branches ?? []).map((b: any) => b.id);
       this.selectedAddonGroups = (p.addon_groups ?? []).map((g: any) => g.id);
     } catch(err) {
       this.message.add({ severity: 'error', summary: 'Error', detail: 'Could not load product' });
     }
  }

  onNameBlur() {
    if (!this.form.slug) {
      this.generateSlug();
    }
  }

  generateSlug() {
    const name = this.form.translations.en.name || this.form.translations.ar.name;
    if (name) {
      this.form.slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  }

  suggestedSlug() {
    const name = this.form.translations.en.name || this.form.translations.ar.name;
    return name ? name.toLowerCase().replace(/\s+/g, '-') : 'burger-classic';
  }

  addSize() {
    this.form.sizes.push({
      code: '',
      price: 0,
      is_default: this.form.sizes.length === 0,
      translations: { ar: '', en: '' }
    });
  }

  removeSize(index: number) {
    this.form.sizes.splice(index, 1);
  }

  setMainSize(index: number) {
    this.form.sizes.forEach((s: any, i: number) => {
      s.is_default = (i === index);
    });
  }

  addMedia() {
    this.form.media.push({ url: '', media_type: 'image', is_primary: false });
  }

  removeMedia(index: number) {
    this.form.media.splice(index, 1);
  }

  syncAddonGroupsSelection() {
     // Add missing groups
     this.selectedAddonGroups.forEach(id => {
        if (!this.form.addon_groups.find(g => g.id === id)) {
           const template = this.addonGroupsList().find(t => t.id === id);
           if (template) {
              this.form.addon_groups.push({
                 id: template.id,
                 name: template.name,
                 selection_type: 'multiple',
                 min_select: 0,
                 max_select: null,
                 is_required: false,
                 expanded: true,
                 options: (template.options || []).map((o: any) => ({
                    id: o.id,
                    name: o.name,
                    base_price: o.base_price,
                    size_price_overrides: {}
                 }))
              });
           }
        }
     });

     // Remove unselected groups
     this.form.addon_groups = this.form.addon_groups.filter(g => this.selectedAddonGroups.includes(g.id));
  }

  async uploadMainImage(event: any) {
    const file = event.files[0];
    try {
      const res = await firstValueFrom(this.adminApi.upload(file, 'catalog'));
      this.form.main_image_path = res.url || res.path;
    } catch {}
  }

  async uploadSubMedia(event: any) {
    const file = event.files[0];
    try {
      const res = await firstValueFrom(this.adminApi.upload(file, 'gallery'));
      this.form.media.push({ url: res.url || res.path, media_type: file.type.startsWith('video') ? 'video' : 'image' });
    } catch {}
  }

  async save() {
     this.saving.set(true);
     try {
       const payload = {
         slug: this.form.slug,
         base_price: this.form.base_price,
         is_active: this.form.is_active,
         is_available_in_all_branches: this.form.is_available_in_all_branches,
         main_image_path: this.form.main_image_path,
         
         // Flat values out of nested translations to match backend expectations
         name: this.form.translations.en.name,
         translations: { ar: this.form.translations.ar.name, en: this.form.translations.en.name },
         
         title: this.form.translations.en.title,
         title_translations: { ar: this.form.translations.ar.title, en: this.form.translations.en.title },
         
         short_description: this.form.translations.en.short_description,
         short_description_translations: { ar: this.form.translations.ar.short_description, en: this.form.translations.en.short_description },
         
         description: this.form.translations.en.description,
         description_translations: { ar: this.form.translations.ar.description, en: this.form.translations.en.description },
         
         category_ids: this.selectedCategories,
         tag_ids: this.selectedTags,
         branch_ids: this.form.is_available_in_all_branches ? [] : this.selectedBranches,
         
         addon_groups: this.form.addon_groups.map(g => ({
            name: { ar: g.name, en: g.name }, // Simple mapping for now
            selection_type: g.selection_type,
            min_select: g.min_select,
            max_select: g.max_select,
            is_required: g.is_required,
            options: g.options.map((o: any) => ({
               name: { ar: o.name, en: o.name },
               base_price: o.base_price,
               size_price_overrides: o.size_price_overrides
            }))
         })),
         
         sizes: this.form.sizes.map(s => ({
            id: s.id,
            code: s.code,
            price: s.price,
            is_default: s.is_default,
            name: s.translations.en,
            translations: { ar: s.translations.ar, en: s.translations.en }
         })),
         
         media: this.form.media.map(m => ({
            media_type: m.media_type,
            path: m.url.startsWith('http') ? null : m.url,
            external_url: m.url.startsWith('http') ? m.url : null,
            is_primary: m.is_primary ?? false
         }))
       };

       if (this.id()) {
         await firstValueFrom(this.adminApi.updateResource('products', this.id()!, payload));
       } else {
         await firstValueFrom(this.adminApi.createResource('products', payload));
       }

       this.message.add({ severity: 'success', summary: 'Success', detail: 'Product saved successfully' });
       this.router.navigate(['/admin/catalog/products']);
     } catch(err) {
       this.message.add({ severity: 'error', summary: 'Error', detail: 'Save failed' });
     } finally {
       this.saving.set(false);
     }
  }
}
