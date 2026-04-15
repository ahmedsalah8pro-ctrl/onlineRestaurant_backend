import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-public-shell',
  imports: [SharedUiModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.scss',
})
export class PublicShell implements OnInit {
  protected readonly storefront = inject(StorefrontService);
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = inject(UiTextService);
  protected readonly runtime = inject(RuntimeConfigService);

  protected readonly siteName = computed(() => this.storefront.siteName());
  protected readonly logoUrl = computed(() =>
    this.runtime.resolveAsset(
      this.storefront.settings()?.branding?.square_logo_path || this.storefront.settings()?.branding?.logo_path,
    ),
  );
  protected readonly cartCount = computed(() =>
    this.storefront.cart()?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  );
  protected readonly walletBalance = computed(() => this.storefront.walletBalance());

  protected readonly navigation = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.menu', path: '/menu' },
    { key: 'nav.orders', path: '/orders', auth: true },
    { key: 'nav.wallet', path: '/wallet', auth: true },
    { key: 'nav.account', path: '/account', auth: true },
  ];

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    if (this.auth.isAuthenticated()) {
      await Promise.allSettled([this.storefront.refreshCart(), this.storefront.refreshUnreadNotifications(), this.storefront.refreshWallet()]);
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    this.storefront.cart.set(null);
    this.storefront.walletBalance.set(0);
    this.storefront.unreadNotificationCount.set(0);
  }

  protected switchLocale(locale: 'ar' | 'en'): void {
    this.theme.setLocale(locale);
    this.theme.applyPublicSettings(this.storefront.settings());
  }
}
