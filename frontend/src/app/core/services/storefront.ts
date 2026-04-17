import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Branch, Cart, Category, CouponPreview, ProductListItem, PublicSettings } from '../models/api.models';
import { PublicApiService } from './public-api';
import { RuntimeConfigService } from './runtime-config';
import { SeoService } from './seo';
import { ThemeService } from './theme';
import { UiTextService } from './ui-text';

@Injectable({
  providedIn: 'root',
})
export class StorefrontService {
  private readonly publicApi = inject(PublicApiService);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly seo = inject(SeoService);
  private readonly theme = inject(ThemeService);
  private readonly ui = inject(UiTextService);

  readonly settings = signal<PublicSettings | null>(null);
  readonly branches = signal<Branch[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly bestSellers = signal<ProductListItem[]>([]);
  readonly cart = signal<Cart | null>(null);
  readonly walletBalance = signal(0);
  readonly unreadNotificationCount = signal(0);
  readonly loading = signal(false);
  readonly cartPulse = signal(false);
  readonly cartOpen = signal(false);
  readonly cartFlying = signal(false);
  readonly flightPath = signal<{ x: number; y: number } | null>(null);
  readonly appliedCouponCode = signal('');
  readonly appliedCouponPreview = signal<CouponPreview | null>(null);

  readonly siteName = computed(() => this.settings()?.general?.site_name ?? 'Online Restaurant');
  readonly currency = computed(() => ({
    code: this.settings()?.currency?.code ?? 'EGP',
    symbol: this.ui.t('currency.symbol'),
    symbolPosition: this.settings()?.currency?.symbol_position ?? 'after',
  }));

  async bootstrap(): Promise<void> {
    this.loading.set(true);

    try {
      const [settings, branches, categories, bestSellers] = await Promise.all([
        firstValueFrom(this.publicApi.getPublicSettings()),
        firstValueFrom(this.publicApi.getBranches()),
        firstValueFrom(this.publicApi.getCategories()),
        firstValueFrom(this.publicApi.getBestSellers()),
      ]);

      this.settings.set(settings);
      this.branches.set(branches);
      this.categories.set(categories);
      this.bestSellers.set(bestSellers);
      this.theme.applyPublicSettings(settings);
      this.seo.hydrateSettings(settings);
      this.seo.applyPage({
        title: this.theme.resolveText(settings.seo?.default_meta_title) || settings.general?.site_name || 'Online Restaurant',
        description: this.theme.resolveText(settings.seo?.default_meta_description) || this.ui.t('public.footerAbout'),
        image: settings.seo?.default_og_image_path
          ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
          : settings.branding?.cover_image_path
            ? this.runtime.resolveAsset(settings.branding.cover_image_path)
            : undefined,
        url: settings.seo?.canonical_host || undefined,
        type: 'website',
      });
    } finally {
      this.loading.set(false);
    }
  }

  async refreshCart(): Promise<void> {
    this.cart.set(await firstValueFrom(this.publicApi.getCart()));
    
    this.cartPulse.set(true);
    setTimeout(() => this.cartPulse.set(false), 1200);
  }

  triggerFlight(event: MouseEvent | TouchEvent | Event): void {
    let clientX = 0, clientY = 0;
    
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    if (clientX === 0 && clientY === 0) return;

    this.flightPath.set({ x: clientX, y: clientY });
    this.cartFlying.set(true);
    
    // Animation phases
    setTimeout(() => this.cartOpen.set(true), 200);
    setTimeout(() => {
      this.cartFlying.set(false);
      this.flightPath.set(null);
    }, 1000);
    setTimeout(() => this.cartOpen.set(false), 1400);
  }

  async refreshUnreadNotifications(): Promise<void> {
    const data = await firstValueFrom(this.publicApi.getUnreadNotificationCount());
    this.unreadNotificationCount.set(data.unread_count);
  }

  async refreshWallet(): Promise<void> {
    const wallet = await firstValueFrom(this.publicApi.getWallet());
    this.walletBalance.set(Number(wallet.balance ?? 0));
  }

  setAppliedCoupon(code: string, preview: CouponPreview | null): void {
    const normalized = code.trim();
    this.appliedCouponCode.set(normalized);
    this.appliedCouponPreview.set(preview);
  }

  clearAppliedCoupon(): void {
    this.appliedCouponCode.set('');
    this.appliedCouponPreview.set(null);
  }

  formatMoney(amount: number | null | undefined): string {
    const value = Number(amount ?? 0);
    const currency = this.currency();
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: this.settings()?.currency?.decimal_places ?? 2,
    });

    return currency.symbolPosition === 'before'
      ? `${currency.symbol} ${formatted}`
      : `${formatted} ${currency.symbol}`;
  }
}
