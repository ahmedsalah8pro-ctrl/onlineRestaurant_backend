import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime, firstValueFrom, takeUntil } from 'rxjs';
import { ProductDetail, ProductListItem } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-menu-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage implements OnInit, OnDestroy {
  protected readonly storefront = inject(StorefrontService);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  private readonly message = inject(MessageService);
  private readonly filtersChanged$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  protected readonly products = signal<ProductListItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly total = signal(0);
  protected readonly page = signal(1);
  protected readonly lastPage = signal(1);
  protected readonly previewVisible = signal(false);
  protected readonly previewLoading = signal(false);
  protected readonly previewProduct = signal<ProductDetail | null>(null);
  protected readonly quickAddLoadingId = signal<number | null>(null);

  protected filters = {
    search: '',
    branch_id: null as number | null,
    category_id: null as number | null,
    sort: 'default',
  };

  protected sortOptions = this.buildSortOptions();

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    this.filtersChanged$
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe(() => void this.loadProducts(1));

    this.sortOptions = this.buildSortOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected setBranch(branchId: number): void {
    if (this.filters.branch_id === branchId) {
      return;
    }

    this.filters.branch_id = branchId;
    this.filters.category_id = null;
    this.page.set(1);
    void this.loadProducts(1);
  }

  protected onFiltersChanged(): void {
    if (!this.filters.branch_id) {
      return;
    }

    this.filtersChanged$.next();
  }

  protected async loadProducts(page = this.page()): Promise<void> {
    if (!this.filters.branch_id) {
      this.products.set([]);
      this.total.set(0);
      this.lastPage.set(1);
      return;
    }

    this.loading.set(true);
    this.page.set(page);

    try {
      const response = await firstValueFrom(
        this.publicApi.getProducts({
          page,
          search: this.filters.search,
          search_alt: this.smartAlternateSearch(this.filters.search),
          branch_id: this.filters.branch_id,
          category_id: this.filters.category_id,
          sort: this.filters.sort === 'default' ? null : this.filters.sort,
        }),
      );

      this.products.set(response?.items ?? []);
      this.total.set(Number(response?.meta?.total ?? 0));
      this.lastPage.set(Number(response?.meta?.last_page ?? 1));
    } finally {
      this.loading.set(false);
    }
  }

  protected async openPreview(productId: number): Promise<void> {
    this.previewVisible.set(true);
    this.previewLoading.set(true);

    try {
      this.previewProduct.set(await firstValueFrom(this.publicApi.getProduct(productId)));
    } finally {
      this.previewLoading.set(false);
    }
  }

  protected closePreview(): void {
    this.previewVisible.set(false);
    this.previewProduct.set(null);
  }

  protected async quickAdd(product: ProductListItem, event?: Event): Promise<void> {
    event?.stopPropagation();

    if (!this.filters.branch_id) {
      return;
    }

    if ((product.addon_groups_count ?? 0) > 0) {
      await this.openPreview(product.id);
      return;
    }

    this.quickAddLoadingId.set(product.id);

    try {
      await firstValueFrom(
        this.publicApi.addCartItem({
          product_id: product.id,
          branch_id: this.filters.branch_id,
          quantity: 1,
        }),
      );

      await this.storefront.refreshCart();
      this.message.add({
        severity: 'success',
        summary: this.ui.t('cart.title'),
        detail: `${product.name} - ${this.ui.t('product.addToCart')}`,
      });
    } finally {
      this.quickAddLoadingId.set(null);
    }
  }

  private buildSortOptions(): Array<{ label: string; value: string }> {
    return [
      { label: this.ui.sortLabel('default'), value: 'default' },
      { label: this.ui.sortLabel('price_asc'), value: 'price_asc' },
      { label: this.ui.sortLabel('price_desc'), value: 'price_desc' },
      { label: this.ui.sortLabel('rating_desc'), value: 'rating_desc' },
      { label: this.ui.sortLabel('best_seller'), value: 'best_seller' },
    ];
  }

  private smartAlternateSearch(value: string): string | null {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const arToEn: Record<string, string> = {
      ض: 'q', ص: 'w', ث: 'e', ق: 'r', ف: 't', غ: 'y', ع: 'u', ه: 'i', خ: 'o', ح: 'p',
      ج: '[', د: ']', ش: 'a', س: 's', ي: 'd', ب: 'f', ل: 'g', ا: 'h', ت: 'j', ن: 'k',
      م: 'l', ك: ';', ط: '\'', ئ: 'z', ء: 'x', ؤ: 'c', ر: 'v', لا: 'b', ى: 'n', ة: 'm',
      و: ',', ز: '.', ظ: '/', ' ': ' ',
    };
    const enToAr: Record<string, string> = Object.fromEntries(Object.entries(arToEn).map(([ar, en]) => [en, ar]));

    const convert = (map: Record<string, string>) => [...trimmed].map((char) => map[char] ?? char).join('');
    const convertedArabic = convert(arToEn);
    const convertedEnglish = convert(enToAr);

    if (convertedArabic !== trimmed) {
      return convertedArabic;
    }

    if (convertedEnglish !== trimmed) {
      return convertedEnglish;
    }

    return null;
  }
}
