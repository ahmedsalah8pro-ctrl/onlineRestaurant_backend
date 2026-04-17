import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AddonGroup, AddonOption, ProductDetail, ProductListItem, Review } from '../../../../core/models/api.models';
import { AuthService } from '../../../../core/services/auth';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SeoService } from '../../../../core/services/seo';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-detail-page',
  imports: [SharedUiModule],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
})
export class ProductDetailPage implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly auth = inject(AuthService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly message = inject(MessageService);

  protected readonly product = signal<ProductDetail | null>(null);
  protected readonly reviews = signal<Review[]>([]);
  protected readonly aiSuggestions = signal<ProductListItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly selectedSizeId = signal<number | null>(null);
  protected readonly quantity = signal(1);
  protected readonly reviewLoading = signal(false);
  protected readonly addToCartLoading = signal(false);
  protected readonly reviewModel = {
    rating: 5,
    comment: '',
    is_anonymous: false,
  };

  protected readonly selectedAddonMap = signal<Record<number, number[]>>({});
  protected readonly reviewPage = signal(1);
  protected readonly reviewRatingFilter = signal<number | null>(null);

  protected readonly filteredReviews = computed(() => {
    let list = this.reviews();
    const filter = this.reviewRatingFilter();
    if (filter) {
      list = list.filter(r => r.rating === filter);
    }
    return list;
  });

  protected readonly pagedReviews = computed(() => {
    return this.filteredReviews().slice(0, this.reviewPage() * 5);
  });

  protected readonly totalPrice = computed(() => {
    const current = this.product();

    if (!current) {
      return 0;
    }

    const sizePrice = (current.sizes || []).find((size) => size.id === this.selectedSizeId())?.price ?? current.base_price ?? 0;
    const addons = Object.values(this.selectedAddonMap())
      .flat()
      .map((optionId) => this.findOption(optionId))
      .filter((option): option is AddonOption => !!option)
      .reduce((sum, option) => sum + option.base_price, 0);

    return (sizePrice + addons) * this.quantity();
  });

  protected readonly averageRating = computed(() => {
    const items = this.reviews();
    if (items.length === 0) return 0;
    return items.reduce((sum, review) => sum + review.rating, 0) / items.length;
  });

  constructor() {
    effect(() => {
      const current = this.product();
      const settings = this.storefront.settings();
      this.theme.locale();

      if (!current || !settings) {
        return;
      }

      const title = `${this.theme.resolveText(current.translations || current.name)} | ${settings.general?.site_name || 'Online Restaurant'}`;
      const description =
        this.theme.resolveText(current.short_description_translations || current.short_description) ||
        this.theme.resolveText(current.description_translations || current.description) ||
        this.ui.t('product.copy');
      const image =
        current.main_image_path
          ? this.runtime.resolveAsset(current.main_image_path)
          : current.media?.[0]?.url
            ? this.runtime.resolveAsset(current.media[0].url)
            : settings.seo?.default_og_image_path
              ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
              : undefined;
      const productUrl = `${this.runtime.frontendBaseUrl}/products/${current.id}/${current.slug}`;

      const structuredData: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: this.theme.resolveText(current.translations || current.name),
        description,
        url: productUrl,
        image: [image].filter(Boolean),
        sku: `product-${current.id}`,
        brand: {
          '@type': 'Brand',
          name: settings.seo?.merchant_feed_brand_name || settings.general?.site_name || 'Online Restaurant',
        },
        category: current.categories.map((category) => category.name).join(' / '),
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: settings.currency?.code || 'EGP',
          price: current.base_price ?? current.sizes?.[0]?.price ?? 0,
          availability: current.is_active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      };

      if (current.rating_summary.count > 0) {
        structuredData['aggregateRating'] = {
          '@type': 'AggregateRating',
          ratingValue: current.rating_summary.average,
          reviewCount: current.rating_summary.count,
        };
      }

      this.seo.applyPage({
        title,
        description,
        image,
        url: productUrl,
        type: 'product',
        productMeta: {
          brand: settings.seo?.merchant_feed_brand_name || settings.general?.site_name || 'Online Restaurant',
          availability: current.is_active ? 'in stock' : 'out of stock',
          condition: settings.seo?.merchant_feed_condition || 'new',
          priceAmount: current.base_price ?? current.sizes?.[0]?.price ?? 0,
          priceCurrency: settings.currency?.code || 'EGP',
          retailerItemId: current.slug || `product-${current.id}`,
          itemGroupId: current.slug || `product-${current.id}`,
        },
        structuredData,
      });
    });
  }

  protected selectSize(sizeId: number): void {
    this.selectedSizeId.set(sizeId);
  }

  async ngOnInit(): Promise<void> {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadProduct(productId);
  }

  protected async loadProduct(productId: number): Promise<void> {
    this.loading.set(true);

    try {
      const [product, reviews] = await Promise.all([
        firstValueFrom(this.publicApi.getProduct(productId)),
        firstValueFrom(this.publicApi.getProductReviews(productId)),
      ]);

      this.product.set(product);
      this.reviews.set(reviews.items);
      this.selectedSizeId.set(product.sizes.find((size) => size.is_default)?.id ?? product.sizes[0]?.id ?? null);
      this.selectedAddonMap.set({});

      // --- SMART AI SUGGESTIONS ENGINE ---
      const allBestSellers = this.storefront.bestSellers();
      const currentCategories = product.categories.map(c => c.id);
      
      const suggestions = allBestSellers
        .filter(p => p.id !== product.id)
        .map(p => {
          // Calculate relevance score
          let score = 0;
          
          // Factor A: Category Match (Highly Relevant)
          // Since ProductListItem doesn't have categories in this mock/API, 
          // we simulate by checking if the name contains similar keywords or 
          // just use a deterministic category score if we had the data.
          // For now, we'll use a pseudo-random but stable score based on IDs.
          const categoryBoost = (product.id % 3 === p.id % 3) ? 50 : 0;
          score += categoryBoost;

          // Factor B: Rating Weight
          score += (p.rating_summary.average || 0) * 10;

          // Factor C: Popularity (Best Seller Rank)
          score += (p.is_best_seller_pinned ? 20 : 0);

          return { product: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .map(item => item.product)
        .slice(0, 3);

      this.aiSuggestions.set(suggestions);
      // ------------------------------------

    } finally {
      this.loading.set(false);
    }
  }

  protected toggleOption(group: AddonGroup, optionId: number | string): void {
    const current = { ...this.selectedAddonMap() };
    const selected = current[group.id] ?? [];
    const targetId = Number(optionId);

    if (group.selection_type === 'single') {
      if (selected.some(id => id == targetId)) {
        if (!group.is_required) {
          current[group.id] = [];
          this.selectedAddonMap.set(current);
        }
        return;
      }

      current[group.id] = [targetId];
      this.selectedAddonMap.set(current);
      return;
    }

    if (selected.some(id => id == targetId)) {
      current[group.id] = selected.filter((value) => value != targetId);
    } else {
      current[group.id] = [...selected, targetId];
    }
    
    this.selectedAddonMap.set(current);
  }

  protected clearSingleSelection(group: AddonGroup): void {
    if (group.is_required) {
      return;
    }

    const current = { ...this.selectedAddonMap() };
    current[group.id] = [];
    this.selectedAddonMap.set(current);
  }

  protected isSelected(groupId: number, optionId: number): boolean {
    return (this.selectedAddonMap()[groupId] ?? []).includes(optionId);
  }

  protected selectedAddonIds(): number[] {
    return Object.values(this.selectedAddonMap()).flat();
  }

  protected async addToCart(event?: Event): Promise<void> {
    const current = this.product();

    if (!current) {
      return;
    }

    this.addToCartLoading.set(true);

    try {
      if (event) this.storefront.triggerFlight(event);
      
      await firstValueFrom(
        this.publicApi.addCartItem({
          product_id: current.id,
          product_size_id: this.selectedSizeId(),
          addon_option_ids: this.selectedAddonIds(),
          quantity: this.quantity(),
          branch_id: this.storefront.cart()?.branch_id ?? this.storefront.branches()[0]?.id ?? null,
        }),
      );

      await this.storefront.refreshCart();
      this.message.add({
        severity: 'success',
        summary: this.ui.t('cart.title'),
        detail: `${current.name} - ${this.ui.t('product.addToCart')}`,
      });
    } finally {
      this.addToCartLoading.set(false);
    }
  }

  protected async submitReview(): Promise<void> {
    const current = this.product();

    if (!current) {
      return;
    }

    this.reviewLoading.set(true);

    try {
      const review = await firstValueFrom(
        this.publicApi.createReview({
          product_id: current.id,
          rating: this.reviewModel.rating,
          comment: this.reviewModel.comment,
          is_anonymous: this.reviewModel.is_anonymous,
        }),
      );

      this.reviews.set([review, ...this.reviews()]);
      this.reviewModel.comment = '';
      this.message.add({ severity: 'success', summary: this.ui.t('product.reviewTitle'), detail: 'تم الإرسال بنجاح / Submitted Successfully' });
    } catch (err: any) {
      const msg = err?.error?.message || 'Error occurred';
      this.message.add({ severity: 'error', summary: 'Error', detail: msg });
    } finally {
      this.reviewLoading.set(false);
    }
  }

  protected setRating(rating: number): void {
    this.reviewModel.rating = rating;
  }

  private findOption(optionId: number): AddonOption | undefined {
    return (this.product()?.addon_groups || [])
      .flatMap((group) => group.options)
      .find((option) => option.id === optionId);
  }

  protected productLink(product: ProductListItem): string[] {
    return ['/products', String(product.id), product.slug];
  }
}
