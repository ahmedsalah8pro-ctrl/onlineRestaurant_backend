import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
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

  protected readonly siteName = computed(() => this.storefront.siteName());
  protected readonly cartCount = computed(() =>
    this.storefront.cart()?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  );

  protected readonly navigation = [
    { label: 'الرئيسية', path: '/' },
    { label: 'المنيو', path: '/menu' },
    { label: 'الطلبات', path: '/orders', auth: true },
    { label: 'المحفظة', path: '/wallet', auth: true },
    { label: 'الحساب', path: '/account', auth: true },
  ];

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    if (this.auth.isAuthenticated()) {
      await Promise.allSettled([this.storefront.refreshCart(), this.storefront.refreshUnreadNotifications()]);
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    this.storefront.cart.set(null);
    this.storefront.unreadNotificationCount.set(0);
  }

  protected switchLocale(locale: 'ar' | 'en'): void {
    this.theme.setLocale(locale);
  }
}
