import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Address } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-checkout-page',
  imports: [SharedUiModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage implements OnInit {
  protected readonly storefront = inject(StorefrontService);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly ui = inject(UiTextService);
  private readonly router = inject(Router);

  protected readonly addresses = signal<Address[]>([]);
  protected readonly walletBalance = signal(0);
  protected readonly loading = signal(false);
  protected readonly couponPreview = signal<Record<string, unknown> | null>(null);

  protected form = {
    branch_id: null as number | null,
    delivery_zone_id: null as number | null,
    address_id: null as number | null,
    notes: '',
    coupon_code: '',
    wallet_amount: 0,
    payment_method: 'cash_on_delivery',
  };

  protected newAddress = {
    label: 'Home',
    recipient_name: '',
    phone: '',
    country: 'Egypt',
    city: 'Cairo',
    area: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    landmark: '',
    notes: '',
    is_default: true,
  };

  protected readonly zones = computed(() => {
    const branchId = this.form.branch_id;
    return this.storefront.branches().find((branch) => branch.id === branchId)?.delivery_zones ?? [];
  });

  protected selectedDeliveryFee(): number {
    return this.zones().find((zone) => zone.id === this.form.delivery_zone_id)?.delivery_fee ?? 0;
  }

  async ngOnInit(): Promise<void> {
    await this.storefront.refreshCart();
    const [addresses, wallet] = await Promise.all([
      firstValueFrom(this.publicApi.getAddresses()),
      firstValueFrom(this.publicApi.getWallet()),
    ]);

    this.addresses.set(addresses);
    this.walletBalance.set(wallet.balance);
    this.form.branch_id = this.storefront.cart()?.branch_id ?? this.storefront.branches()[0]?.id ?? null;
    this.form.delivery_zone_id = this.zones()[0]?.id ?? null;
    this.form.address_id = addresses.find((address) => address.is_default)?.id ?? addresses[0]?.id ?? null;
  }

  protected async previewCoupon(): Promise<void> {
    if (!this.form.coupon_code) {
      this.couponPreview.set(null);
      return;
    }

    this.couponPreview.set(
      await firstValueFrom(
        this.publicApi.previewCoupon({
          coupon_code: this.form.coupon_code,
          delivery_fee: this.selectedDeliveryFee(),
        }),
      ),
    );
  }

  protected async createAddress(): Promise<void> {
    const created = await firstValueFrom(this.publicApi.createAddress(this.newAddress));
    this.addresses.set([created, ...this.addresses()]);
    this.form.address_id = created.id;
  }

  protected async submitOrder(): Promise<void> {
    this.loading.set(true);

    try {
      const order = await firstValueFrom(
        this.publicApi.checkout({
          ...this.form,
        }),
      );

      await this.storefront.refreshCart();
      await this.router.navigate(['/orders'], { queryParams: { highlight: order.id } });
    } finally {
      this.loading.set(false);
    }
  }

  protected couponPreviewMessage(): string {
    return (this.couponPreview()?.['message'] as string | undefined) ?? 'Coupon preview loaded.';
  }
}
