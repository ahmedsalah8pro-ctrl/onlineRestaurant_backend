import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Address } from '../../../../core/models/api.models';
import { AuthService } from '../../../../core/services/auth';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
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
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = inject(UiTextService);
  private readonly message = inject(MessageService);
  private readonly router = inject(Router);

  protected readonly addresses = signal<Address[]>([]);
  protected readonly walletBalance = signal(0);
  protected readonly loading = signal(false);
  protected readonly couponPreview = signal<Record<string, unknown> | null>(null);
  protected readonly feedback = signal<{ severity: 'success' | 'error'; text: string } | null>(null);
  protected readonly showQuickAddress = signal(false);
  protected readonly alternativePhoneModels = signal<string[]>([]);
  protected readonly isGuest = computed(() => !this.auth.isAuthenticated());

  protected form = {
    branch_id: null as number | null,
    delivery_zone_id: null as number | null,
    address_id: null as number | null,
    notes: '',
    coupon_code: '',
    payment_method: 'cash_on_delivery',
  };

  protected newAddress = {
    label: '',
    recipient_name: '',
    phone: '',
    country: '',
    delivery_zone_id: null as number | null,
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

  protected readonly checkoutTotal = computed(() => {
    const subtotal = this.storefront.cart()?.subtotal ?? 0;
    const delivery = this.selectedDeliveryFee();
    const preview = this.couponPreview();
    const discount = preview?.['valid'] ? Number(preview['discount_total']) : 0;
    
    return Math.max(0, subtotal + delivery - discount);
  });
  protected readonly paymentOptions = computed(() => [
    { label: this.ui.t('checkout.payment.cash'), value: 'cash_on_delivery' },
    { label: this.ui.t('checkout.payment.wallet'), value: 'wallet' },
    { label: this.ui.t('checkout.payment.hybrid'), value: 'wallet_plus_cash_on_delivery' },
  ]);

  protected readonly addressOptions = computed(() => {
    const list = this.addresses().map(a => ({ 
      label: a.label || a.street || `${this.ui.t('checkout.address')} #${a.id}`, 
      value: a.id 
    }));
    return [{ label: this.ui.t('checkout.addNewAddress') || 'Add New Address', value: 'new' }, ...list];
  });

  protected selectedDeliveryFee(): number {
    return this.zones().find((zone) => zone.id === this.form.delivery_zone_id)?.delivery_fee ?? 0;
  }

  async ngOnInit(): Promise<void> {
    await this.storefront.refreshCart();
    
    if (this.auth.isAuthenticated()) {
      const [addresses, wallet] = await Promise.all([
        firstValueFrom(this.publicApi.getAddresses()),
        firstValueFrom(this.publicApi.getWallet()),
      ]);

      this.addresses.set(addresses);
      this.walletBalance.set(wallet.balance);
      this.storefront.walletBalance.set(wallet.balance);
      
      const defaultAddress = addresses.find((address) => address.is_default) || addresses[0];
      if (defaultAddress) {
        this.form.address_id = defaultAddress.id;
        this.form.delivery_zone_id = defaultAddress.delivery_zone_id;
        this.showQuickAddress.set(false);
      } else {
        this.form.address_id = 'new' as any;
        this.showQuickAddress.set(true);
      }
    } else {
        this.form.address_id = 'new' as any;
        this.showQuickAddress.set(true);
    }

    this.form.branch_id = this.storefront.cart()?.branch_id ?? this.storefront.branches()[0]?.id ?? null;
    if (!this.form.delivery_zone_id) {
        this.form.delivery_zone_id = this.zones()[0]?.id ?? null;
    }
  }

  protected onAddressSelect(value: any): void {
    if (value === 'new') {
      this.showQuickAddress.set(true);
    } else {
      this.showQuickAddress.set(false);
      const addr = this.addresses().find(a => a.id === value);
      if (addr) {
        this.form.delivery_zone_id = addr.delivery_zone_id;
      }
    }
  }

  protected addAlternativePhone(): void {
    if (this.alternativePhoneModels().length < 3) {
      this.alternativePhoneModels.set([...this.alternativePhoneModels(), '']);
    }
  }

  protected removeAlternativePhone(index: number): void {
    const current = [...this.alternativePhoneModels()];
    current.splice(index, 1);
    this.alternativePhoneModels.set(current);
  }

  protected updateAlternativePhone(index: number, value: string): void {
    const current = [...this.alternativePhoneModels()];
    current[index] = value;
    this.alternativePhoneModels.set(current);
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
    try {
      const payload = {
        ...this.newAddress,
        delivery_zone_id: this.form.delivery_zone_id,
        alternative_phones: this.alternativePhoneModels().filter(p => !!p)
      };
      
      const created = await firstValueFrom(this.publicApi.createAddress(payload));
      this.addresses.set([created, ...this.addresses()]);
      this.form.address_id = created.id;
      this.showQuickAddress.set(false);
      this.message.add({
        severity: 'success',
        summary: this.ui.t('checkout.quickAddress'),
        detail: this.ui.t('account.addressSaved'),
      });
    } catch (error) {
      this.message.add({
        severity: 'error',
        summary: this.ui.t('checkout.quickAddress'),
        detail: this.resolveErrorMessage(error),
      });
    }
  }

  protected async submitOrder(): Promise<void> {
    this.loading.set(true);
    this.feedback.set(null);

    try {
      const walletAmount = this.resolveWalletAmount();
      const order = await firstValueFrom(
        this.publicApi.checkout({
          ...this.form,
          wallet_amount: walletAmount,
        }),
      );

      await this.storefront.refreshCart();
      await this.storefront.refreshWallet();
      this.feedback.set({
        severity: 'success',
        text: `${this.ui.t('checkout.feedbackSuccess')} #${order.id}`,
      });
      this.message.add({
        severity: 'success',
        summary: this.ui.t('checkout.eyebrow'),
        detail: `#${order.id} ${this.ui.t('checkout.placeOrder')}`,
      });
      await this.delay(600);
      await this.router.navigate(['/orders'], { queryParams: { highlight: order.id } });
    } catch (error) {
      const detail = this.resolveErrorMessage(error);
      this.feedback.set({
        severity: 'error',
        text: detail || this.ui.t('checkout.feedbackError'),
      });
      this.message.add({
        severity: 'error',
        summary: this.ui.t('checkout.eyebrow'),
        detail,
      });
    } finally {
      this.loading.set(false);
    }
  }

  protected couponPreviewMessage(): string {
    return (this.couponPreview()?.['message'] as string | undefined) ?? 'Coupon preview loaded.';
  }

  private resolveWalletAmount(): number {
    if (this.form.payment_method === 'cash_on_delivery') {
      return 0;
    }

    return Number(this.walletBalance() ?? 0);
  }

  private resolveErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const firstField = error.error?.errors ? Object.values(error.error.errors)[0] : null;
      const firstMessage = Array.isArray(firstField) ? firstField[0] : error.error?.message;
      if (typeof firstMessage === 'string' && firstMessage.trim() !== '') {
        return firstMessage;
      }
      if (typeof error.error?.message === 'string' && error.error.message.trim() !== '') {
        return error.error.message;
      }
    }

    return this.ui.t('checkout.feedbackError');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
