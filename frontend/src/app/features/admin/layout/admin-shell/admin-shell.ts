import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-admin-shell',
  imports: [SharedUiModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell implements OnInit {
  protected readonly auth = inject(AuthService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);

  protected mobileMenuOpen = false;
  protected sidebarCollapsed = false;
  protected readonly isMobile = signal(typeof window !== 'undefined' ? window.innerWidth <= 1100 : false);
  private readonly currentRouteUrl = signal(this.router.url);

  protected readonly navItems = [
    { labelKey: 'admin.section.dashboard', path: '/admin', icon: '📊' },
    { labelKey: 'admin.section.orders', path: '/admin/orders', icon: '🛒' },
    { labelKey: 'admin.section.catalog', path: '/admin/catalog', icon: '🍔', hasSub: true },
    { labelKey: 'admin.section.customers', path: '/admin/access/members', icon: '👥', hasSub: true },
    { labelKey: 'admin.section.branding', path: '/admin/settings', icon: '🎨' },
    { labelKey: 'admin.section.content', path: '/admin/content', icon: '📝' },
    { labelKey: 'admin.section.logs', path: '/admin/integrations', icon: '📋' },
  ];

  protected readonly catalogItems = [
    { labelKey: 'admin.catalog.products', path: '/admin/catalog/products', icon: '📦' },
    { labelKey: 'admin.catalog.categories', path: '/admin/catalog/categories', icon: '🏷️' },
    { labelKey: 'admin.catalog.tags', path: '/admin/catalog/tags', icon: '🔖' },
    { labelKey: 'admin.catalog.addons', path: '/admin/catalog/addon-groups', icon: '➕' },
    { labelKey: 'admin.catalog.branches', path: '/admin/catalog/branches', icon: '🏢' },
    { labelKey: 'admin.catalog.delivery', path: '/admin/catalog/delivery-zones', icon: '📍' },
    { labelKey: 'admin.catalog.coupons', path: '/admin/catalog/coupons', icon: '🎟️' },
    { labelKey: 'admin.catalog.giftcards', path: '/admin/catalog/gift-cards', icon: '🎁' },
  ];

  protected readonly accessItems = [
    { labelKey: 'account.members', path: '/admin/access/members', icon: '👥' },
    { labelKey: 'menu.roles', path: '/admin/access/roles', icon: '🛡️' },
    { labelKey: 'menu.permissions', path: '/admin/access/permissions', icon: '🔐' },
  ];

  protected readonly menuMode = computed(() => {
    if (this.currentRouteUrl().startsWith('/admin/catalog')) return 'catalog';
    if (this.currentRouteUrl().startsWith('/admin/access')) return 'access';
    return 'main';
  });

  protected readonly adminName = computed(() => this.auth.user()?.name ?? 'Admin');

  protected readonly currentSectionLabel = computed(() => {
    const current = this.navItems.find((item) =>
      item.path === '/admin'
        ? this.currentRouteUrl() === '/admin'
        : this.currentRouteUrl().startsWith(item.path),
    );
    return this.ui.t(current?.labelKey ?? 'admin.section.dashboard');
  });

  protected readonly currentSectionIcon = computed(() => {
    const current = this.navItems.find((item) =>
      item.path === '/admin'
        ? this.currentRouteUrl() === '/admin'
        : this.currentRouteUrl().startsWith(item.path),
    );
    return current?.icon ?? '📊';
  });

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }
    this.syncViewport();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRouteUrl.set(event.urlAfterRedirects);
        if (this.isMobile()) {
          this.mobileMenuOpen = false;
        }
      });
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    this.mobileMenuOpen = false;
    await this.router.navigateByUrl('/admin/login');
  }

  protected toggleMenu(): void {
    if (this.isMobile()) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      return;
    }
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  protected closeMenu(): void {
    this.mobileMenuOpen = false;
  }

  protected switchLocale(locale: 'ar' | 'en'): void {
    this.theme.setLocale(locale);
  }

  @HostListener('window:resize')
  protected syncViewport(): void {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth <= 1100;
    this.isMobile.set(isMobile);
    if (!isMobile) this.mobileMenuOpen = false;
  }
}
