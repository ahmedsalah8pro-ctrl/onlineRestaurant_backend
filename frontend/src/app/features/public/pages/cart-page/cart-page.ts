import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
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

  protected readonly loading = signal(false);
  protected readonly couponCode = signal('');
  protected readonly couponPreview = signal<Record<string, unknown> | null>(null);

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
  }

  protected async clearCart(): Promise<void> {
    await firstValueFrom(this.publicApi.clearCart());
    await this.storefront.refreshCart();
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
    return (this.couponPreview()?.['message'] as string | undefined) ?? 'Coupon checked.';
  }
}
