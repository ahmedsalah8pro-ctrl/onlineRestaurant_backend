import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AddonGroup, AddonOption, ProductDetail, Review } from '../../../../core/models/api.models';
import { AuthService } from '../../../../core/services/auth';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
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

  protected readonly product = signal<ProductDetail | null>(null);
  protected readonly reviews = signal<Review[]>([]);
  protected readonly loading = signal(false);
  protected readonly selectedSizeId = signal<number | null>(null);
  protected readonly selectedBranchId = signal<number | null>(null);
  protected readonly quantity = signal(1);
  protected readonly reviewLoading = signal(false);
  protected readonly addToCartLoading = signal(false);
  protected readonly reviewModel = {
    rating: 5,
    comment: '',
    is_anonymous: false,
  };

  protected readonly selectedAddonMap = signal<Record<number, number[]>>({});

  protected readonly totalPrice = computed(() => {
    const current = this.product();

    if (!current) {
      return 0;
    }

    const sizePrice = current.sizes.find((size) => size.id === this.selectedSizeId())?.price ?? current.base_price ?? 0;
    const addons = Object.values(this.selectedAddonMap())
      .flat()
      .map((optionId) => this.findOption(optionId))
      .filter((option): option is AddonOption => !!option)
      .reduce((sum, option) => sum + option.base_price, 0);

    return (sizePrice + addons) * this.quantity();
  });

  protected readonly averageRating = computed(() => {
    const items = this.reviews();

    if (items.length === 0) {
      return 0;
    }

    return items.reduce((sum, review) => sum + review.rating, 0) / items.length;
  });

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
      this.selectedBranchId.set(this.storefront.branches()[0]?.id ?? null);
      this.selectedAddonMap.set({});
    } finally {
      this.loading.set(false);
    }
  }

  protected toggleOption(group: AddonGroup, optionId: number): void {
    const current = { ...this.selectedAddonMap() };
    const selected = current[group.id] ?? [];

    if (group.selection_type === 'single') {
      current[group.id] = [optionId];
      this.selectedAddonMap.set(current);
      return;
    }

    current[group.id] = selected.includes(optionId)
      ? selected.filter((value) => value !== optionId)
      : [...selected, optionId];

    this.selectedAddonMap.set(current);
  }

  protected isSelected(groupId: number, optionId: number): boolean {
    return (this.selectedAddonMap()[groupId] ?? []).includes(optionId);
  }

  protected selectedAddonIds(): number[] {
    return Object.values(this.selectedAddonMap()).flat();
  }

  protected async addToCart(): Promise<void> {
    const current = this.product();

    if (!current) {
      return;
    }

    this.addToCartLoading.set(true);

    try {
      await firstValueFrom(
        this.publicApi.addCartItem({
          product_id: current.id,
          product_size_id: this.selectedSizeId(),
          addon_option_ids: this.selectedAddonIds(),
          quantity: this.quantity(),
          branch_id: this.selectedBranchId(),
        }),
      );

      await this.storefront.refreshCart();
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
    } finally {
      this.reviewLoading.set(false);
    }
  }

  private findOption(optionId: number): AddonOption | undefined {
    return this.product()?.addon_groups
      .flatMap((group) => group.options)
      .find((option) => option.id === optionId);
  }
}
