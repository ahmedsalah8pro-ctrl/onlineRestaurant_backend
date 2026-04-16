import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Branch, Cart, Category, ProductListItem, PublicSettings } from '../models/api.models';
import { PublicApiService } from './public-api';
import { ThemeService } from './theme';
import { UiTextService } from './ui-text';

@Injectable({
  providedIn: 'root',
})
export class StorefrontService {
  private readonly publicApi = inject(PublicApiService);
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
    } finally {
      this.loading.set(false);
    }
  }

  async refreshCart(): Promise<void> {
    this.cart.set(await firstValueFrom(this.publicApi.getCart()));
    
    this.cartPulse.set(true);
    setTimeout(() => this.cartPulse.set(false), 800);
  }

  async refreshUnreadNotifications(): Promise<void> {
    const data = await firstValueFrom(this.publicApi.getUnreadNotificationCount());
    this.unreadNotificationCount.set(data.unread_count);
  }

  async refreshWallet(): Promise<void> {
    const wallet = await firstValueFrom(this.publicApi.getWallet());
    this.walletBalance.set(Number(wallet.balance ?? 0));
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
