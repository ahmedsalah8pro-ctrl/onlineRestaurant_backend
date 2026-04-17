import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-public-shell',
  standalone: true,
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
  protected readonly logoUrl = computed(() => {
    const settings = this.storefront.settings();

    if (settings?.branding?.square_logo_path) {
      return this.runtime.resolveAsset(settings.branding.square_logo_path);
    }

    if (settings?.branding?.logo_path) {
      return this.runtime.resolveAsset(settings.branding.logo_path);
    }

    return '';
  });
  protected readonly tagline = computed(() =>
    this.theme.resolveText(this.storefront.settings()?.branding?.brand_tagline) || this.ui.t('public.taglineFallback'),
  );
  protected readonly socialLinks = computed(() => {
    const links = this.storefront.settings()?.branding?.social_links || {};
    return [
      { key: 'facebook', icon: 'pi pi-facebook', href: links['facebook'] || null },
      { key: 'instagram', icon: 'pi pi-instagram', href: links['instagram'] || null },
      { key: 'x', icon: 'pi pi-twitter', href: links['x'] || null },
      { key: 'youtube', icon: 'pi pi-youtube', href: links['youtube'] || null },
      { key: 'tiktok', icon: 'pi pi-video', href: links['tiktok'] || null },
    ].filter((item) => !!item.href);
  });
  protected readonly cartCount = computed(() =>
    this.storefront.cart()?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  );
  protected readonly walletBalance = computed(() => this.storefront.walletBalance());
  protected readonly currentYear = new Date().getFullYear();

  protected readonly isScrolled = signal(false);
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navigation = [
    { key: 'nav.home', path: '/', icon: 'pi pi-home' },
    { key: 'nav.menu', path: '/menu', icon: 'pi pi-shopping-cart' },
    { key: 'nav.orders', path: '/orders', auth: true, icon: 'pi pi-list' },
    { key: 'nav.wallet', path: '/wallet', auth: true, icon: 'pi pi-wallet' },
    { key: 'nav.account', path: '/account', auth: true, icon: 'pi pi-user' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    await this.storefront.refreshCart();

    if (this.auth.isAuthenticated()) {
      await Promise.allSettled([this.storefront.refreshUnreadNotifications(), this.storefront.refreshWallet()]);
    }
    
    // Initial check
    this.isScrolled.set(window.scrollY > 50);
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
