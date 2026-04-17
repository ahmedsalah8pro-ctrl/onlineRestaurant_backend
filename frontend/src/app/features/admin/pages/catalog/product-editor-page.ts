import { Component, OnInit, computed, inject, signal, ViewChild } from '@angular/core';
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
    <div class="editor-header animate-fade-in mb-8">
      <div class="header-left">
        <a pButton icon="pi pi-arrow-left" severity="secondary" [routerLink]="['/admin/catalog/products']" class="p-button-text"></a>
        <div>
          <span class="eyebrow">{{ ui.t('admin.catalog.title') }}</span>
          <h2>{{ isEdit() ? ui.t('admin.catalog.edit') : ui.t('admin.catalog.create') }}</h2>
        </div>
      </div>
      <div class="header-actions">
        <button pButton [label]="isEdit() ? ui.t('admin.settings.save') : ui.t('admin.catalog.create')" icon="pi pi-check" (click)="save()" [loading]="saving()"></button>
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
                       <div class="flex-column mb-4" style="gap: 1.25rem;">
                          <div class="flex-center" style="gap: 0.75rem;">
                            <p-toggleswitch [(ngModel)]="form.has_base_price" inputId="basePriceToggle"></p-toggleswitch>
                            <label for="basePriceToggle" class="toggle-label" pTooltip="Fixed price for all sizes" tooltipPosition="top">
                                {{ ui.t('admin.catalog.price') }} (Fixed / Base)
                            </label>
                          </div>
                       </div>

                       <label class="field-stack animate-fade-in" *ngIf="form.has_base_price">
                         <span>{{ ui.t('admin.catalog.price') }}</span>
                         <p-inputnumber [(ngModel)]="form.base_price" mode="decimal" [min]="0" styleClass="w-full" [placeholder]="ui.t('admin.catalog.price')" [required]="true" name="basePrice"></p-inputnumber>
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
                  <h3 [title]="ui.t('admin.catalog.hint.catTags')">{{ ui.t('admin.catalog.categories') }} & {{ ui.t('admin.catalog.tags') }}</h3>
                  <div class="form-grid two-columns">
                     <label class="field-stack">
                       <span [title]="ui.t('admin.catalog.hint.catTags')">{{ ui.t('admin.catalog.categories') }}</span>
                       <p-multiselect [options]="categories()" [(ngModel)]="selectedCategories" 
                                     optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.category')" appendTo="body" [required]="true" name="catSelect"></p-multiselect>
                     </label>
                     <label class="field-stack">
                       <span [title]="ui.t('admin.catalog.hint.catTags')">{{ ui.t('admin.catalog.tags') }}</span>
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
                                    <input pInputText [(ngModel)]="form.translations.ar.name" placeholder="مثلاً: بيف برجر عائلي" required name="nameAr" />
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
                                    <input pInputText [(ngModel)]="form.translations.en.name" placeholder="e.g. Family Beef Burger" (blur)="onNameBlur()" required name="nameEn" />
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
                                  <span title="Generated automatically from the size name">{{ ui.t('admin.catalog.code') }}</span>
                                  <input pInputText [ngModel]="generatedSizeCode(size, i)" disabled />
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

                     <div class="flex-center p-8 bg-black/10 rounded-3xl border border-dashed border-slate-700 opacity-60 flex-column text-center" *ngIf="form.has_base_price">
                        <i class="pi pi-lock text-3xl mb-3"></i>
                        <p class="m-0 font-bold">Base Price is active.</p>
                        <p class="m-0 text-sm">Disable "Base Price" in the General tab to manage specific prices per size.</p>
                     </div>

                     @if (!form.sizes.length && !form.has_base_price) {
                        <div class="empty-hint">
                           <i class="pi pi-box mb-3 text-4xl opacity-50"></i>
                           <p>لا توجد أحجام لهذا المنتج. سيتم استخدام السعر الأساسي.</p>
                        </div>
                     }
                  </div>
               </div>
            </p-tabpanel>

            <p-tabpanel [value]="2">
               <div class="form-section">
                  <div class="section-header mb-8 flex justify-between items-center bg-black/5 p-6 rounded-2xl border border-white/5">
                     <div class="header-text">
                        <h3 class="m-0 text-xl font-black tracking-tight"><i class="pi pi-plus-circle mr-2 text-primary"></i> {{ ui.t('admin.catalog.addons') }}</h3>
                        <p class="m-0 text-slate-500 font-medium text-sm mt-1">Configure selection rules and price adjustments per product size.</p>
                     </div>
                     <div class="flex items-center gap-3">
                        <p-multiselect [options]="addonGroupsList()" [(ngModel)]="selectedAddonGroups" 
                                       (onChange)="syncAddonGroupsSelection()"
                                       optionLabel="name" optionValue="id" [placeholder]="ui.t('admin.catalog.addons')" 
                                       appendTo="body" styleClass="w-full max-w-sm"></p-multiselect>
                        <button pButton icon="pi pi-plus-circle" pTooltip="Create Fresh Template" (click)="showGroupCreator.set(!showGroupCreator())" [severity]="showGroupCreator() ? 'warn' : 'secondary'" class="p-button-outlined"></button>
                     </div>
                  </div>

                  <!-- Inline Group Creator -->
                  <div *ngIf="showGroupCreator()" class="glass-panel group-creator-card animate-slide-up mb-8 border-primary/20 bg-primary/5 shadow-2xl relative overflow-hidden">
                      <div class="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
                      <div class="flex items-center justify-between mb-6">
                          <h4 class="m-0 text-primary uppercase tracking-widest font-black text-xs">
                              <i class="pi pi-plus-circle mr-2"></i> {{ ui.t('admin.catalog.create') }} {{ ui.t('admin.catalog.addons') }}
                          </h4>
                          <button pButton icon="pi pi-times" class="p-button-text p-button-sm p-button-rounded" (click)="showGroupCreator.set(false)"></button>
                      </div>
                      <div class="form-grid gap-6">
                          <div class="grid grid-cols-2 gap-6">
                              <label class="field-stack">
                                  <span>Group Name (Arabic)</span>
                                  <input pInputText [(ngModel)]="newGroupForm.name_ar" placeholder="مثلاً: صوصات إضافية" />
                              </label>
                              <label class="field-stack">
                                  <span>Group Name (English)</span>
                                  <input pInputText [(ngModel)]="newGroupForm.name_en" placeholder="e.g. Extra Sauces" />
                              </label>
                          </div>
                          <div class="flex items-center gap-4 py-2">
                              <p-toggleswitch [(ngModel)]="newGroupForm.is_required" inputId="groupReq"></p-toggleswitch>
                              <label for="groupReq" class="font-bold cursor-pointer opacity-80 decoration-primary/30">Required Selection?</label>
                              
                              <button pButton label="Confirm & Create" icon="pi pi-plus" [loading]="creatingGroup()" (click)="createAddonGroup()" class="ml-auto shadow-lg px-6"></button>
                          </div>
                      </div>
                  </div>
                  
                  <div class="addon-workspace">
                      <div *ngFor="let group of form.addon_groups; let gIdx = index" class="addon-group-modern animate-fade-in shadow-xl mb-6">
                        <div class="group-hero-header" (click)="group.expanded = !group.expanded">
                           <div class="flex items-center gap-4">
                               <div class="group-state-icon" [class.is-expanded]="group.expanded">
                                   <i class="pi pi-chevron-right"></i>
                               </div>
                               <div>
                                   <span class="group-title">{{ group.name }}</span>
                                   <div class="flex items-center gap-2 mt-1">
                                       <span class="badge-pill badge-pill--primary">{{ group.is_required ? 'Required' : 'Optional' }}</span>
                                       <span class="badge-pill badge-pill--slate">{{ group.options.filter(isOptionEnabled).length }} Active Options</span>
                                   </div>
                               </div>
                           </div>
                           <button pButton icon="pi pi-cog" class="p-button-text p-button-sm text-slate-500"></button>
                        </div>
                        
                        <div class="group-content-body" *ngIf="group.expanded">
                           <div *ngFor="let opt of group.options; let oIdx = index" class="opt-premium-row" [class.opt-disabled]="!opt.is_enabled">
                              <div class="opt-main-line">
                                 <div class="flex items-center gap-4">
                                     <p-checkbox [(ngModel)]="opt.is_enabled" [binary]="true" [id]="'opt_'+gIdx+'_'+oIdx"></p-checkbox>
                                     <label [for]="'opt_'+gIdx+'_'+oIdx" class="opt-label">{{ opt.name }}</label>
                                 </div>
                                 <div class="opt-base-pricing" *ngIf="opt.is_enabled">
                                    <span class="text-[10px] text-slate-500 font-black uppercase mb-1">Standard Surcharge</span>
                                    <p-inputnumber [(ngModel)]="opt.base_price" mode="decimal" [min]="0" styleClass="p-inputtext-sm" placeholder="0.00"></p-inputnumber>
                                 </div>
                              </div>
                              
                              <div class="opt-extra-matrix" *ngIf="opt.is_enabled && form.sizes.length > 0">
                                 <div class="matrix-hint">
                                    <i class="pi pi-table text-primary"></i>
                                    <span>Pricing Matrix (Specific Sizes)</span>
                                 </div>
                                 <div class="matrix-grid">
                                    <div *ngFor="let size of form.sizes; let sizeIndex = index" class="matrix-cell">
                                       <span class="cell-label">{{ size.translations.en || size.translations.ar || generatedSizeCode(size, sizeIndex) }}</span>
                                       <p-inputnumber [(ngModel)]="opt.size_price_overrides[size.id || generatedSizeCode(size, sizeIndex)]" 
                                                       mode="decimal" [min]="0" 
                                                       styleClass="w-full"
                                                       class="p-inputnumber-sm" 
                                                       [placeholder]="'-'"></p-inputnumber>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>

                      @if (!selectedAddonGroups.length && !showGroupCreator()) {
                         <div class="empty-hint p-12 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-700 mt-8">
                            <i class="pi pi-plus-circle mb-6 text-6xl text-primary opacity-20"></i>
                            <p class="text-2xl font-black text-slate-300">Expand Your Menu Logic</p>
                            <p class="text-slate-500 mb-8 max-w-sm mx-auto">Selected existing groups from the library above or create a unique set for this product.</p>
                            <button pButton icon="pi pi-plus" label="Define New Group" class="p-button-lg px-8 shadow-2xl" (click)="showGroupCreator.set(true)"></button>
                         </div>
                      }
                  </div>
               </div>
            </p-tabpanel>

            <p-tabpanel [value]="3">
               <div class="form-section media-tab-shell">
                  <section class="media-workbench">
                     <article class="media-intro-card animate-fade-in">
                        <div>
                           <span class="media-intro-card__eyebrow">Media Studio</span>
                           <h3>Prepare the product visuals customers will actually see</h3>
                           <p>Manage the featured asset, gallery images, videos, and YouTube embeds from one clean workspace.</p>
                        </div>

                        <div class="media-intro-card__stats">
                           <div class="media-stat-box">
                              <strong>{{ form.main_image_path ? '1' : '0' }}</strong>
                              <span>Featured asset</span>
                           </div>
                           <div class="media-stat-box">
                              <strong>{{ form.media.length }}</strong>
                              <span>Gallery items</span>
                           </div>
                        </div>
                     </article>

                     <div class="media-shell media-shell--hero">
                        <div class="media-shell__preview">
                           <article class="media-preview-card">
                              <div class="media-preview-stage">
                                 @if (isYouTube(form.main_image_path)) {
                                    <iframe [src]="getYouTubeEmbedUrl(form.main_image_path)" class="main-preview" frameborder="0" allowfullscreen></iframe>
                                 } @else {
                                    <img [src]="resolveImage(form.main_image_path)" class="main-preview media-preview-stage__image" />
                                 }

                                 <div class="media-preview-stage__empty" *ngIf="!form.main_image_path">
                                    <i class="pi pi-image"></i>
                                    <strong>Featured media preview</strong>
                                    <span>Upload a primary image or paste a direct media URL.</span>
                                 </div>

                                 <div class="media-preview-stage__badge">Featured</div>
                              </div>

                              <div class="media-preview-meta">
                                 <div>
                                    <span class="media-preview-meta__eyebrow">Storefront Priority</span>
                                    <h4>Primary visual for cards and social previews</h4>
                                    <p>This asset is used first in menu cards, product previews, and most shared links.</p>
                                 </div>

                                 <div class="media-preview-meta__chips">
                                    <span class="media-chip" [class.media-chip--muted]="!form.main_image_path">
                                      {{ form.main_image_path ? 'Ready to publish' : 'Needs a source' }}
                                    </span>
                                    <span class="media-chip media-chip--outline">{{ form.media.length }} gallery items</span>
                                 </div>
                              </div>
                           </article>
                        </div>

                        <div class="media-shell__controls">
                           <article class="media-panel">
                              <div class="media-panel__header">
                                 <div>
                                    <h3>Featured Asset</h3>
                                    <p>Set the hero image or video that represents the product everywhere.</p>
                                 </div>
                              </div>

                              <label class="field-stack field-stack--compact">
                                 <span>Primary media source</span>
                                 <input pInputText [(ngModel)]="form.main_image_path" placeholder="e.g. /media/catalog/pizza.jpg or https://..." class="w-full" />
                              </label>

                              <div class="media-panel__actions media-panel__actions--stack">
                                 <p-fileupload
                                   mode="basic"
                                   [auto]="true"
                                   [customUpload]="true"
                                   (uploadHandler)="uploadMainImage($event)"
                                   [chooseLabel]="'Upload featured image'"
                                   styleClass="w-full media-upload-btn"
                                 ></p-fileupload>

                                 <button pButton type="button" icon="pi pi-plus" label="Add gallery item" severity="secondary" [outlined]="true" (click)="addMedia()"></button>
                                 <button pButton type="button" icon="pi pi-times" label="Clear featured" severity="contrast" [text]="true" (click)="form.main_image_path = ''" *ngIf="form.main_image_path"></button>
                              </div>
                           </article>

                           <article class="media-panel media-panel--tips">
                              <div class="media-panel__header media-panel__header--compact">
                                 <div>
                                    <h3>Recommended Setup</h3>
                                    <p>Small improvements here make the storefront feel much more polished.</p>
                                 </div>
                              </div>

                              <div class="media-tip-list">
                                 <div class="media-tip">
                                    <i class="pi pi-images"></i>
                                    <span>Keep the featured visual clean and crop-friendly for menu cards.</span>
                                 </div>
                                 <div class="media-tip">
                                    <i class="pi pi-link"></i>
                                    <span>Use direct image links or proper YouTube URLs to avoid broken embeds.</span>
                                 </div>
                                 <div class="media-tip">
                                    <i class="pi pi-star-fill"></i>
                                    <span>Mark one gallery item as primary if you want it to lead product galleries.</span>
                                 </div>
                              </div>
                           </article>
                        </div>
                     </div>

                     <div class="media-shell media-shell--library">
                        <div class="media-library-header">
                           <div>
                              <span class="media-library-header__eyebrow">Gallery</span>
                              <h3>Supporting Media Assets</h3>
                              <p>Add extra photos, videos, or YouTube embeds for the product details page.</p>
                           </div>

                           <div class="media-library-header__actions">
                              <p-fileupload
                                mode="basic"
                                [auto]="true"
                                [customUpload]="true"
                                (uploadHandler)="uploadSubMedia($event)"
                                chooseLabel="Upload to gallery"
                                styleClass="media-upload-btn media-upload-btn--secondary"
                              ></p-fileupload>

                              <button pButton type="button" icon="pi pi-plus" label="Manual entry" severity="secondary" [outlined]="true" (click)="addMedia()"></button>
                           </div>
                        </div>

                        <div class="asset-library-grid" *ngIf="form.media.length; else emptyMediaState">
                           <article *ngFor="let m of form.media; let i = index" class="asset-card animate-fade-in">
                              <div class="asset-card__preview">
                                 @if (m.media_type === 'image') {
                                    <img [src]="resolveImage(m.url)" class="asset-card__media" />
                                 } @else if (m.media_type === 'external_video' || isYouTube(m.url)) {
                                    <iframe [src]="getYouTubeEmbedUrl(m.url)" class="asset-card__media asset-card__media--frame" frameborder="0" allowfullscreen></iframe>
                                 } @else {
                                    <div class="asset-card__video-fallback">
                                       <i class="pi pi-video"></i>
                                       <span>Video file</span>
                                    </div>
                                 }

                                 <span class="asset-card__type">{{ m.media_type }}</span>
                                 <span class="asset-card__index">#{{ i + 1 }}</span>

                                 <button
                                   pButton
                                   type="button"
                                   icon="pi pi-trash"
                                   severity="danger"
                                   class="asset-card__delete"
                                   (click)="removeMedia(i)"
                                 ></button>
                              </div>

                              <div class="asset-card__body">
                                 <div class="asset-card__body-top">
                                    <label class="field-stack field-stack--compact">
                                       <span>Media type</span>
                                       <p-select [options]="mediaTypes" [(ngModel)]="m.media_type" optionLabel="label" optionValue="value" appendTo="body" styleClass="w-full"></p-select>
                                    </label>
                                 </div>

                                 <label class="field-stack field-stack--compact">
                                    <span>Source URL / Path</span>
                                    <input pInputText [(ngModel)]="m.url" placeholder="e.g. /media/gallery/item.jpg or https://..." class="w-full" />
                                 </label>

                                 <div class="asset-card__actions">
                                    <button
                                      pButton
                                      type="button"
                                      [icon]="m.is_primary ? 'pi pi-star-fill' : 'pi pi-star'"
                                      [label]="m.is_primary ? 'Primary media' : 'Make primary'"
                                      [severity]="m.is_primary ? 'success' : 'secondary'"
                                      [outlined]="!m.is_primary"
                                      (click)="setPrimaryMedia(i)"
                                    ></button>
                                 </div>
                              </div>
                           </article>
                        </div>

                        <ng-template #emptyMediaState>
                           <div class="media-empty-state">
                              <div class="media-empty-state__icon">
                                 <i class="pi pi-images"></i>
                              </div>
                              <h4>No gallery assets yet</h4>
                              <p>Start with a few supporting photos so the product page feels richer and more trustworthy.</p>
                              <div class="media-empty-state__actions">
                                 <button pButton type="button" icon="pi pi-plus" label="Add first gallery item" (click)="addMedia()"></button>
                              </div>
                           </div>
                        </ng-template>
                     </div>
                  </section>
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
                        <span>URL Slug / اسم الرابط الثابت</span>
                        <input pInputText [(ngModel)]="form.slug" [placeholder]="suggestedSlug() || 'e.g. italian-pizza'" />
                        <small class="text-slate-500 mt-1">Leave empty to auto-generate from English name.</small>
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
      
      <div class="form-footer-spacing" style="margin-bottom: 5rem;"></div>

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
    .form-section.p-8 { padding: 2rem; }
    .addon-workspace {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .addon-group-modern {
        background: rgba(15, 23, 42, 0.45);
        border: 1px solid rgba(148, 163, 184, 0.08);
        border-radius: 40px;
        overflow: hidden;
        transition: all 400ms var(--ease-out);
        box-shadow: 0 12px 40px -10px rgba(0,0,0,0.3);
        &:hover { border-color: rgba(var(--brand-primary-rgb), 0.3); transform: translateY(-2px); }
    }
    .group-hero-header {
        padding: 2.25rem 2.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        background: rgba(255,255,255,0.02);
        .group-title { font-size: 1.25rem; font-weight: 900; color: #f8fafc; tracking: -0.02em; }
    }
    .badge-pill {
        font-size: 0.68rem;
        padding: 0.4rem 1rem;
        border-radius: 30px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        &.badge-pill--primary { background: rgba(var(--brand-primary-rgb), 0.15); color: var(--primary-color); border: 1px solid rgba(var(--brand-primary-rgb), 0.1); }
        &.badge-pill--slate { background: #1e293b; color: #94a3b8; border: 1px solid rgba(255,255,255,0.03); }
    }
    .group-content-body { padding: 0.5rem 2.75rem 2.75rem; }
    .opt-premium-row {
        padding: 2rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        transition: opacity 300ms;
        &:last-child { border: none; }
        &.opt-disabled { opacity: 0.35; filter: grayscale(0.8) blur(0.5px); }
    }
    .opt-label { font-size: 1.05rem; font-weight: 700; color: #f1f5f9; transition: color 200ms; &:hover { color: var(--primary-color); } }
    .opt-base-pricing { min-width: 140px; }
    .opt-extra-matrix {
        margin-top: 2rem;
        background: rgba(2, 6, 23, 0.6);
        border-radius: 30px;
        padding: 2rem;
        border: 1px dashed rgba(var(--brand-primary-rgb), 0.25);
    }
    .matrix-grid { gap: 1.5rem; }
    .matrix-cell { min-width: 154px; }

    .media-tab-shell {
        padding: 1rem 0 0;
    }
    .media-workbench {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .media-intro-card,
    .media-shell {
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.86), rgba(15, 23, 42, 0.72));
        border: 1px solid rgba(148, 163, 184, 0.12);
        border-radius: 28px;
        box-shadow: 0 25px 60px -28px rgba(0, 0, 0, 0.55);
    }
    .media-intro-card {
        padding: 1.5rem 1.75rem;
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        align-items: center;
        h3 {
            margin: 0.45rem 0 0.5rem;
            font-size: 1.45rem;
            font-weight: 900;
            color: #f8fafc;
        }
        p {
            margin: 0;
            color: #94a3b8;
            max-width: 52rem;
            line-height: 1.7;
        }
    }
    .media-intro-card__eyebrow,
    .media-library-header__eyebrow,
    .media-preview-meta__eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
        background: rgba(var(--brand-primary-rgb), 0.12);
        color: var(--primary-color);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .media-intro-card__stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(130px, 1fr));
        gap: 0.9rem;
        min-width: 280px;
    }
    .media-stat-box {
        padding: 1rem 1.1rem;
        border-radius: 22px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.06);
        text-align: center;
        strong {
            display: block;
            font-size: 1.6rem;
            font-weight: 900;
            color: #f8fafc;
        }
        span {
            display: block;
            margin-top: 0.25rem;
            color: #94a3b8;
            font-size: 0.82rem;
            font-weight: 700;
        }
    }
    .media-shell {
        padding: 1.5rem;
    }
    .media-shell--hero {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
        gap: 1.5rem;
        align-items: start;
    }
    .media-shell__preview {
        min-width: 0;
    }
    .media-preview-card {
        background: rgba(2, 6, 23, 0.52);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 24px;
        overflow: hidden;
    }
    .media-preview-stage {
        position: relative;
        aspect-ratio: 16 / 10;
        min-height: 320px;
        background: radial-gradient(circle at top, rgba(var(--brand-primary-rgb), 0.12), transparent 40%), #020617;
        overflow: hidden;
    }
    .media-preview-stage__image,
    .main-preview {
        width: 100%;
        height: 100%;
        border: none;
        object-fit: cover;
        display: block;
    }
    .media-preview-stage__empty {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        color: #cbd5e1;
        text-align: center;
        padding: 2rem;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.85));
        i {
            font-size: 2rem;
            color: var(--primary-color);
        }
        strong {
            font-size: 1.05rem;
            color: #f8fafc;
        }
        span {
            max-width: 24rem;
            line-height: 1.7;
        }
    }
    .media-preview-stage__badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.8);
        color: #fff;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        backdrop-filter: blur(12px);
    }
    .media-preview-meta {
        padding: 1.25rem 1.35rem 1.35rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: flex-end;
        h4 {
            margin: 0.5rem 0 0.45rem;
            font-size: 1.1rem;
            font-weight: 900;
            color: #f8fafc;
        }
        p {
            margin: 0;
            color: #94a3b8;
            line-height: 1.65;
        }
    }
    .media-preview-meta__chips {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
    }
    .media-chip {
        display: inline-flex;
        align-items: center;
        padding: 0.55rem 0.8rem;
        border-radius: 999px;
        background: rgba(34, 197, 94, 0.15);
        color: #bbf7d0;
        font-size: 0.78rem;
        font-weight: 800;
        white-space: nowrap;
    }
    .media-chip--muted {
        background: rgba(148, 163, 184, 0.14);
        color: #cbd5e1;
    }
    .media-chip--outline {
        background: transparent;
        color: #cbd5e1;
        border: 1px solid rgba(148, 163, 184, 0.18);
    }
    .media-shell__controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .media-panel {
        background: rgba(2, 6, 23, 0.48);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 24px;
        padding: 1.25rem;
    }
    .media-panel__header {
        margin-bottom: 1rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.75rem;
        h3 {
            margin: 0;
            font-size: 1.05rem;
            font-weight: 900;
            color: #f8fafc;
        }
        p {
            margin: 0.4rem 0 0;
            color: #94a3b8;
            line-height: 1.6;
            font-size: 0.92rem;
        }
    }
    .media-panel__header--compact {
        margin-bottom: 0.6rem;
    }
    .media-panel__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1rem;
    }
    .media-panel__actions--stack {
        display: grid;
        grid-template-columns: 1fr;
    }
    .field-stack--compact {
        gap: 0.45rem;
        span {
            font-size: 0.82rem;
        }
    }
    .media-tip-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .media-tip {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        padding: 0.85rem 0.95rem;
        border-radius: 18px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.04);
        i {
            margin-top: 0.1rem;
            color: var(--primary-color);
        }
        span {
            color: #cbd5e1;
            line-height: 1.65;
            font-size: 0.92rem;
        }
    }
    .media-library-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 1rem;
        margin-bottom: 1.25rem;
        h3 {
            margin: 0.5rem 0 0.45rem;
            font-size: 1.2rem;
            font-weight: 900;
            color: #f8fafc;
        }
        p {
            margin: 0;
            color: #94a3b8;
            line-height: 1.65;
        }
    }
    .media-library-header__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: flex-end;
    }
    .asset-library-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
    }
    .asset-card {
        background: rgba(2, 6, 23, 0.5);
        border-radius: 24px;
        border: 1px solid rgba(148, 163, 184, 0.1);
        overflow: hidden;
        display: grid;
        grid-template-rows: auto 1fr;
        transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        &:hover {
            transform: translateY(-2px);
            border-color: rgba(var(--brand-primary-rgb), 0.28);
            box-shadow: 0 18px 40px -28px rgba(0,0,0,0.8);
        }
    }
    .asset-card__preview {
        position: relative;
        aspect-ratio: 16 / 10;
        background: #020617;
        overflow: hidden;
    }
    .asset-card__media {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border: none;
    }
    .asset-card__media--frame {
        background: #000;
    }
    .asset-card__video-fallback {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        color: #cbd5e1;
        background: radial-gradient(circle at top, rgba(var(--brand-primary-rgb), 0.1), transparent 45%), #020617;
        i {
            font-size: 2rem;
            color: var(--primary-color);
        }
    }
    .asset-card__type,
    .asset-card__index {
        position: absolute;
        top: 0.9rem;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 800;
        backdrop-filter: blur(10px);
    }
    .asset-card__type {
        left: 0.9rem;
        background: rgba(15, 23, 42, 0.82);
        color: #f8fafc;
        text-transform: capitalize;
    }
    .asset-card__index {
        right: 3.85rem;
        background: rgba(var(--brand-primary-rgb), 0.2);
        color: var(--primary-color);
    }
    .asset-card__delete {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        width: 2.4rem;
        height: 2.4rem;
    }
    .asset-card__body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }
    .asset-card__body-top {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    .asset-card__actions {
        display: flex;
        justify-content: flex-start;
        margin-top: auto;
        padding-top: 0.2rem;
    }
    .media-empty-state {
        padding: 3rem 2rem;
        border-radius: 24px;
        border: 1px dashed rgba(148, 163, 184, 0.18);
        background: rgba(2, 6, 23, 0.42);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.8rem;
        h4 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 900;
            color: #f8fafc;
        }
        p {
            margin: 0;
            max-width: 32rem;
            color: #94a3b8;
            line-height: 1.7;
        }
    }
    .media-empty-state__icon {
        width: 4.25rem;
        height: 4.25rem;
        border-radius: 1.25rem;
        display: grid;
        place-items: center;
        background: rgba(var(--brand-primary-rgb), 0.12);
        color: var(--primary-color);
        font-size: 1.6rem;
    }
    .media-empty-state__actions {
        margin-top: 0.6rem;
    }
    .glass-input-card {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    @media (max-width: 1180px) {
        .media-shell--hero {
            grid-template-columns: 1fr;
        }
        .media-preview-meta {
            flex-direction: column;
            align-items: flex-start;
        }
        .media-preview-meta__chips {
            justify-content: flex-start;
        }
    }
    @media (max-width: 860px) {
        .media-intro-card {
            flex-direction: column;
            align-items: flex-start;
        }
        .media-intro-card__stats {
            min-width: 0;
            width: 100%;
        }
        .media-library-header {
            flex-direction: column;
            align-items: stretch;
        }
        .media-library-header__actions {
            justify-content: stretch;
        }
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
               /* PrimeNG Select (Dropdown) Global Fixes for Theme Harmony */
                .p-select {
                    .p-select-label {
                    color: inherit !important; /* Allow the label to inherit the current text color (supports dark/light) */
                    }
                    .p-select-placeholder {
                    color: rgba(148, 163, 184, 0.6) !important;
                    }
                }
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
    .main-preview { width: 100%; height: 100%; border: none; }
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
  protected readonly creatingGroup = signal(false);
  protected readonly submitted = signal(false);
  protected readonly showGroupCreator = signal(false);

  protected newGroupForm = {
    name_ar: '',
    name_en: '',
    is_required: false
  };


  // Form State
  protected form = {
    slug: '',
    base_price: 0,
    has_base_price: true,
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

  protected isYouTube(url?: string | null): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  protected getYouTubeEmbedUrl(url?: string | null): any {
    if (!url) return this.theme.sanitize('');
    let id = '';
    if (url.includes('v=')) id = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('embed/')) id = url.split('embed/')[1].split('?')[0];
    
    return this.theme.safeUrl(`https://www.youtube.com/embed/${id}`);
  }

  protected readonly mainSizeLabel = computed(() => {
    const main = this.form.sizes.find((s: any) => s.is_default);
    return main ? this.theme.resolveText(main.translations) : 'Select Size';
  });

  protected isOptionEnabled(opt: any) { return opt.is_enabled; }

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
       this.form.base_price = p.base_price || 0;
       this.form.has_base_price = (this.form.base_price > 0 || (p.sizes ?? []).length === 0);
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
             is_enabled: true,
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

  private normalizeIdentifier(value: string, separator: '-' | '_' = '-'): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s_-]/g, '')
      .replace(/[\s-]+/g, separator)
      .replace(/_+/g, separator === '_' ? '_' : '-')
      .replace(new RegExp(`\\${separator}{2,}`, 'g'), separator)
      .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), '');
  }

  generateSlug() {
    const name = this.form.translations.en.name || this.form.translations.ar.name;
    if (name) {
      this.form.slug = this.normalizeIdentifier(name, '-') || 'product';
    }
  }

  suggestedSlug() {
    const name = this.form.translations.en.name || this.form.translations.ar.name;
    return name ? this.normalizeIdentifier(name, '-') || (this.id() ? `product-${this.id()}` : 'product') : (this.id() ? `product-${this.id()}` : 'product');
  }

  identifierPreview() {
    return this.form.slug || this.suggestedSlug();
  }

  generatedSizeCode(size: any, index: number) {
    const existing = typeof size?.code === 'string' ? this.normalizeIdentifier(size.code, '_') : '';
    const sourceName = size?.translations?.en || size?.translations?.ar || '';
    const generated = this.normalizeIdentifier(sourceName, '_');

    return existing || generated || `size_${index + 1}`;
  }

  setPrimaryMedia(index: number) {
     this.form.media.forEach((m, i) => {
         m.is_primary = (i === index);
     });
  }

  addSize() {
    this.form.has_base_price = false;
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
                    is_enabled: true,
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
      // Remove trailing slash if present (extremely robust trim)
      this.form.main_image_path = (res.url || res.path).split('?')[0].replace(/\/$/, "");
    } catch {}
  }

  async uploadSubMedia(event: any) {
    const file = event.files[0];
     try {
      const res = await firstValueFrom(this.adminApi.upload(file, 'gallery'));
      const url = (res.url || res.path).split('?')[0].replace(/\/$/, "");
      this.form.media.push({ url, media_type: file.type.startsWith('video') ? 'video' : 'image' });
    } catch {}
  }

   async createAddonGroup() {
      if (!this.newGroupForm.name_ar && !this.newGroupForm.name_en) return;
      
      this.creatingGroup.set(true);
      try {
         const payload = {
            product_id: this.id() || null,
            name: { ar: this.newGroupForm.name_ar || this.newGroupForm.name_en, en: this.newGroupForm.name_en || this.newGroupForm.name_ar },
            selection_type: 'multiple',
            min_select: 0,
            max_select: null,
            is_required: this.newGroupForm.is_required
         };

         const res = await firstValueFrom(this.adminApi.createResource<any>('addon-groups', payload));
         this.message.add({ severity: 'success', summary: 'Added', detail: 'Group created' });
         
         // Add to list and select it
         const newEntry = { 
            id: res.id, 
            name: payload.name.ar, 
            options: [] 
         };
         this.addonGroupsList.update(list => [...list, newEntry]);
         this.selectedAddonGroups = [...this.selectedAddonGroups, res.id];
         this.syncAddonGroupsSelection();
         
         // Clear form
         this.newGroupForm = { name_ar: '', name_en: '', is_required: false };
         this.showGroupCreator.set(false);
      } catch (err) {
         this.message.add({ severity: 'error', summary: 'Error', detail: 'Creation failed' });
      } finally {
         this.creatingGroup.set(false);
      }
   }

   async save() {
    this.submitted.set(true);
    
    // Core localized validation
    if (!this.form.translations.ar.name && !this.form.translations.en.name) {
       this.message.add({ 
          severity: 'warn', 
          summary: 'Missing Name', 
          detail: 'Product must have a name in at least one language.', 
          sticky: true 
       });
       return;
    }

    this.saving.set(true);
     try {
       const payload = {
         slug: this.form.slug || this.suggestedSlug(),
         base_price: this.form.has_base_price ? this.form.base_price : 0,
         is_active: this.form.is_active,
         is_available_in_all_branches: this.form.is_available_in_all_branches,
         main_image_path: this.form.main_image_path,
         
         // Backend expects name, description etc to be the translation objects themselves
         name: { 
            ar: this.form.translations.ar.name || this.form.translations.en.name, 
            en: this.form.translations.en.name || this.form.translations.ar.name 
         },
         description: { 
            ar: this.form.translations.ar.description, 
            en: this.form.translations.en.description 
         },
         short_description: { 
            ar: this.form.translations.ar.short_description, 
            en: this.form.translations.en.short_description 
         },
         
         category_ids: this.selectedCategories,
         tag_ids: this.selectedTags,
         branch_ids: this.form.is_available_in_all_branches ? [] : this.selectedBranches,
         
         addon_groups: this.form.addon_groups.map(g => ({
            id: g.id,
            name: { ar: g.name, en: g.name },
            selection_type: g.selection_type,
            min_select: g.min_select,
            max_select: g.max_select,
            is_required: g.is_required,
            options: g.options.filter((o: any) => o.is_enabled).map((o: any) => ({
               id: o.id,
               name: { ar: o.name, en: o.name },
               base_price: o.base_price,
               size_price_overrides: o.size_price_overrides
            }))
         })),
         
         sizes: this.form.sizes.map((s, index) => ({
            id: s.id,
            code: this.generatedSizeCode(s, index),
            price: s.price,
            is_default: s.is_default,
            name: { ar: s.translations.ar, en: s.translations.en }
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
      } catch(err: any) {
        console.error('Save error', err);
        let detail = 'Save failed';
        if (err.error?.errors) {
          const firstErr = Object.entries(err.error.errors)[0];
          detail = `${String(firstErr[0]).toUpperCase()}: ${Array.isArray(firstErr[1]) ? firstErr[1][0] : firstErr[1]}`;
        } else if (err.error?.message) {
          detail = err.error.message;
        }
        this.message.add({ severity: 'error', summary: 'Persistence Error', detail, sticky: true });
      } finally {
        this.saving.set(false);
      }
  }
}
