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
  templateUrl: './generic-editor-page.html',
  styleUrl: './generic-editor-page.scss',
})
export class GenericEditorPage implements OnInit {
  private readonly adminApi = inject(AdminApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);

  protected readonly id = signal<number | null>(null);
  protected readonly resourceType = signal('');
  protected readonly saving = signal(false);
  protected readonly isEdit = computed(() => this.id() !== null);

  protected readonly showSlugField = computed(() => this.resourceType() !== 'delivery-zones');
  protected readonly showCodeField = computed(() =>
    ['categories', 'tags', 'coupons', 'gift-cards'].includes(this.resourceType()),
  );
  protected readonly showBranchDetails = computed(() => this.resourceType() === 'branches');
  protected readonly showAddonGroupRules = computed(() => this.resourceType() === 'addon-groups');
  protected readonly showDeliveryZoneRules = computed(() => this.resourceType() === 'delivery-zones');
  protected readonly showCategoryHierarchy = computed(() => this.resourceType() === 'categories');

  protected readonly selectionTypes = computed(() => [
    { label: this.copy('اختيار واحد فقط', 'Single choice'), value: 'single' },
    { label: this.copy('اختيارات متعددة', 'Multiple choice'), value: 'multiple' },
  ]);

  protected readonly activeLabel = computed(() => {
    const map: Record<string, string> = {
      categories: this.ui.t('admin.catalog.categories'),
      tags: this.ui.t('admin.catalog.tags'),
      'addon-groups': this.ui.t('admin.catalog.addons'),
      branches: this.ui.t('admin.catalog.branches'),
      'delivery-zones': this.ui.t('admin.catalog.delivery'),
      coupons: this.ui.t('admin.catalog.coupons'),
      'gift-cards': this.ui.t('admin.catalog.giftcards'),
    };

    return map[this.resourceType()] || this.resourceType();
  });

  protected readonly pageTitle = computed(() =>
    this.isEdit()
      ? this.copy(`تعديل ${this.activeLabel()}`, `Edit ${this.activeLabel()}`)
      : this.copy(`إنشاء ${this.activeLabel()}`, `Create ${this.activeLabel()}`),
  );

  protected readonly pageSubtitle = computed(() => {
    const type = this.resourceType();

    if (type === 'categories') {
      return this.copy(
        'أنشئ قسماً واضحاً ومنظماً مع دعم الترجمة وإمكانية ربطه بقسم أب.',
        'Create a clean translated category and optionally attach it to a parent category.',
      );
    }

    if (type === 'tags') {
      return this.copy(
        'استخدم الوسوم لتسهيل البحث والتجميع وإبراز الخصائص المشتركة بين المنتجات.',
        'Use tags to improve search, grouping, and product discovery.',
      );
    }

    if (type === 'branches') {
      return this.copy(
        'أدخل بيانات الفرع التشغيلية بدقة حتى تنعكس على المنيو والتوصيل والطلبات.',
        'Configure accurate branch information for ordering, logistics, and storefront visibility.',
      );
    }

    if (type === 'delivery-zones') {
      return this.copy(
        'حدد الفرع المرتبط ورسوم التوصيل الخاصة بالمنطقة بشكل واضح ومباشر.',
        'Map the delivery zone to its branch and shipping fee clearly.',
      );
    }

    if (type === 'addon-groups') {
      return this.copy(
        'ابنِ مجموعة إضافات مرنة مع قواعد اختيار واضحة وخيارات قابلة للتسعير.',
        'Build a flexible addon group with clear selection rules and priced options.',
      );
    }

    return this.copy(
      'أدخل البيانات الأساسية ثم راجع حالة الظهور واحفظ التغييرات.',
      'Fill the core details, review visibility, then save your changes.',
    );
  });

  protected readonly statusText = computed(() =>
    this.form.is_active ? this.copy('مرئي ومفعل', 'Visible and active') : this.copy('مخفي أو غير مفعل', 'Hidden or inactive'),
  );

  protected readonly branches = signal<Array<{ id: number; name: string }>>([]);
  protected readonly categories = signal<Array<{ id: number; label: string }>>([]);
  protected readonly products = signal<Array<{ id: number; label: string }>>([]);

  protected form: {
    is_active: boolean;
    translations: { ar: string; en: string };
    address_translations: { ar: string; en: string };
    slug: string;
    code: string;
    options: Array<{ translations: { ar: string; en: string }; base_price: number }>;
    selection_type: 'single' | 'multiple';
    is_required: boolean;
    min_select: number | null;
    max_select: number | null;
    phone: string;
    email: string;
    branch_id: number | null;
    product_id: number | null;
    parent_id: number | null;
    delivery_fee: number;
    amount: number;
  } = {
    is_active: true,
    translations: { ar: '', en: '' },
    address_translations: { ar: '', en: '' },
    slug: '',
    code: '',
    options: [],
    selection_type: 'single',
    is_required: false,
    min_select: 0,
    max_select: 1,
    phone: '',
    email: '',
    branch_id: null,
    product_id: null,
    parent_id: null,
    delivery_fee: 0,
    amount: 0,
  };

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.resourceType.set(params['resourceType']);
      this.id.set(params['id'] ? Number(params['id']) : null);

      await Promise.all([this.loadBranches(), this.loadCategories(), this.loadProducts()]);
      this.resetForm();

      if (this.id()) {
        await this.loadRecord();
      }
    });
  }

  protected copy(ar: string, en: string): string {
    return this.ui.currentLocale() === 'ar' ? ar : en;
  }

  protected async loadBranches(): Promise<void> {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('branches'));
      this.branches.set(
        data.map((branch: any) => ({
          id: branch.id,
          name: this.theme.resolveText(branch.translations || branch.name),
        })),
      );
    } catch {
      // ignore in editor shell
    }
  }

  protected async loadCategories(): Promise<void> {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('categories'));
      this.categories.set(
        data
          .filter((category: any) => !this.id() || category.id !== this.id())
          .map((category: any) => ({
            id: category.id,
            label: this.theme.resolveText(category.translations || category.name),
          })),
      );
    } catch {
      // ignore in editor shell
    }
  }

  protected async loadProducts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.adminApi.listResource<any>('products'));
      this.products.set(
        data.map((product: any) => ({
          id: product.id,
          label: this.theme.resolveText(product.translations || product.name),
        })),
      );
    } catch {
      // ignore in editor shell
    }
  }

  protected addOption(): void {
    this.form.options.push({
      translations: { ar: '', en: '' },
      base_price: 0,
    });
  }

  protected removeOption(index: number): void {
    this.form.options.splice(index, 1);
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  private resetForm(): void {
    this.form = {
      is_active: true,
      translations: { ar: '', en: '' },
      address_translations: { ar: '', en: '' },
      slug: '',
      code: '',
      options: [],
      selection_type: 'single',
      is_required: false,
      min_select: 0,
      max_select: 1,
      phone: '',
      email: '',
      branch_id: null,
      product_id: null,
      parent_id: null,
      delivery_fee: 0,
      amount: 0,
    };
  }

  private valueForLocale(value: unknown, locale: 'ar' | 'en'): string {
    if (typeof value === 'string') {
      return value;
    }

    if (value && typeof value === 'object') {
      return String((value as Record<string, unknown>)[locale] ?? '');
    }

    return '';
  }

  protected async loadRecord(): Promise<void> {
    try {
      const record = await firstValueFrom(this.adminApi.showResource<any>(this.resourceType(), this.id()!));

      this.form = {
        ...this.form,
        ...record,
        translations: {
          ar: this.valueForLocale(record.translations?.ar || record.name, 'ar'),
          en: this.valueForLocale(record.translations?.en || record.name, 'en'),
        },
        address_translations: {
          ar: this.valueForLocale(record.address_translations?.ar || record.address, 'ar'),
          en: this.valueForLocale(record.address_translations?.en || record.address, 'en'),
        },
        options:
          this.resourceType() === 'addon-groups' && Array.isArray(record.options)
            ? record.options.map((option: any) => ({
                ...option,
                translations: {
                  ar: this.valueForLocale(option.translations?.ar || option.name, 'ar'),
                  en: this.valueForLocale(option.translations?.en || option.name, 'en'),
                },
                base_price: Number(option.base_price ?? 0),
              }))
            : [],
      };
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.copy('تعذر التحميل', 'Load failed'),
        detail: this.copy('تعذر تحميل بيانات العنصر.', 'The editor could not load this record.'),
      });
    }
  }

  protected async save(): Promise<void> {
    this.saving.set(true);

    try {
      const payload: Record<string, unknown> = {
        ...this.form,
        name: this.form.translations,
      };

      if (this.showBranchDetails()) {
        payload['address'] = this.form.address_translations;
      }

      if (this.showAddonGroupRules()) {
        payload['options'] = this.form.options.map((option) => ({
          ...option,
          name: option.translations,
        }));
      }

      if (this.isEdit()) {
        await firstValueFrom(this.adminApi.updateResource(this.resourceType(), this.id()!, payload));
      } else {
        await firstValueFrom(this.adminApi.createResource(this.resourceType(), payload));
      }

      this.message.add({
        severity: 'success',
        summary: this.copy('تم الحفظ', 'Saved'),
        detail: this.copy('تم حفظ البيانات بنجاح.', 'Changes saved successfully.'),
      });

      this.router.navigate(['/admin/catalog', this.resourceType()]);
    } catch (error: any) {
      this.message.add({
        severity: 'error',
        summary: this.copy('تعذر الحفظ', 'Save failed'),
        detail: error?.error?.message || this.copy('تعذر حفظ البيانات الحالية.', 'Unable to save the current data.'),
      });
    } finally {
      this.saving.set(false);
    }
  }
}
