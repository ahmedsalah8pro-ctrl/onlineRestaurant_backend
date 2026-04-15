import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AddonGroup, ProductDetail } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-cart-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  protected readonly storefront = inject(StorefrontService);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly ui = inject(UiTextService);
  private readonly message = inject(MessageService);

  protected readonly loading = signal(false);
  protected readonly couponCode = signal('');
  protected readonly couponPreview = signal<Record<string, unknown> | null>(null);
  protected readonly editorVisible = signal(false);
  protected readonly editorLoading = signal(false);
  protected readonly editorProduct = signal<ProductDetail | null>(null);
  protected readonly editingItemId = signal<number | null>(null);
  protected readonly selectedSizeId = signal<number | null>(null);
  protected readonly editorQuantity = signal(1);
  protected readonly selectedAddonMap = signal<Record<number, number[]>>({});
  protected readonly cartTotal = computed(() => this.storefront.cart()?.subtotal ?? 0);

  async ngOnInit(): Promise<void> {
    await this.storefront.refreshCart();
  }

  protected async updateQuantity(itemId: number, quantity: number): Promise<void> {
    await firstValueFrom(this.publicApi.updateCartItem(itemId, { quantity }));
    await this.storefront.refreshCart();
  }

  protected async removeItem(itemId: number): Promise<void> {
    await firstValueFrom(this.publicApi.removeCartItem(itemId));
    await this.storefront.refreshCart();
    this.message.add({ severity: 'success', summary: this.ui.t('cart.title'), detail: this.ui.t('cart.removed') });
  }

  protected async clearCart(): Promise<void> {
    await firstValueFrom(this.publicApi.clearCart());
    await this.storefront.refreshCart();
    this.message.add({ severity: 'success', summary: this.ui.t('cart.title'), detail: this.ui.t('cart.cleared') });
  }

  protected async previewCoupon(): Promise<void> {
    if (!this.couponCode()) {
      return;
    }

    this.loading.set(true);

    try {
      this.couponPreview.set(
        await firstValueFrom(
          this.publicApi.previewCoupon({
            coupon_code: this.couponCode(),
          }),
        ),
      );
    } finally {
      this.loading.set(false);
    }
  }

  protected couponPreviewMessage(): string {
    return (this.couponPreview()?.['message'] as string | undefined) ?? this.ui.t('cart.couponPreview');
  }

  protected async openEditor(itemId: number): Promise<void> {
    const item = this.storefront.cart()?.items.find((entry) => entry.id === itemId);

    if (!item) {
      return;
    }

    this.editorVisible.set(true);
    this.editorLoading.set(true);
    this.editingItemId.set(item.id);
    this.editorQuantity.set(item.quantity);

    try {
      const product = await firstValueFrom(this.publicApi.getProduct(item.product_id));
      this.editorProduct.set(product);
      this.selectedSizeId.set(item.product_size_id ?? product.sizes[0]?.id ?? null);

      const nextMap: Record<number, number[]> = {};
      for (const group of product.addon_groups) {
        nextMap[group.id] = (item.selected_addon_option_ids ?? []).filter((optionId) => group.options.some((option) => option.id === optionId));
      }
      this.selectedAddonMap.set(nextMap);
    } finally {
      this.editorLoading.set(false);
    }
  }

  protected closeEditor(): void {
    this.editorVisible.set(false);
    this.editorProduct.set(null);
    this.editingItemId.set(null);
  }

  protected toggleOption(group: AddonGroup, optionId: number): void {
    const current = { ...this.selectedAddonMap() };
    const selected = current[group.id] ?? [];

    if (group.selection_type === 'single') {
      if (!group.is_required && selected.includes(optionId)) {
        current[group.id] = [];
        this.selectedAddonMap.set(current);
        return;
      }

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

  protected async saveEditor(): Promise<void> {
    const itemId = this.editingItemId();

    if (!itemId) {
      return;
    }

    this.editorLoading.set(true);

    try {
      await firstValueFrom(
        this.publicApi.updateCartItem(itemId, {
          quantity: this.editorQuantity(),
          product_size_id: this.selectedSizeId(),
          addon_option_ids: Object.values(this.selectedAddonMap()).flat(),
        }),
      );

      await this.storefront.refreshCart();
      this.message.add({ severity: 'success', summary: this.ui.t('cart.title'), detail: this.ui.t('cart.saved') });
      this.closeEditor();
    } finally {
      this.editorLoading.set(false);
    }
  }
}
