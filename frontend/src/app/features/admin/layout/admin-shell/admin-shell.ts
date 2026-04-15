import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
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
  private readonly router = inject(Router);
  protected mobileMenuOpen = false;
  protected sidebarCollapsed = false;
  protected readonly isMobile = signal(typeof window !== 'undefined' ? window.innerWidth <= 1100 : false);
  private readonly currentRouteUrl = signal(this.router.url);

  protected readonly navItems = [
    { labelKey: 'admin.section.dashboard', path: '/admin' },
    { labelKey: 'admin.section.orders', path: '/admin/orders' },
    { labelKey: 'admin.section.catalog', path: '/admin/catalog' },
    { labelKey: 'admin.section.customers', path: '/admin/access' },
    { labelKey: 'admin.section.branding', path: '/admin/settings' },
    { labelKey: 'admin.section.content', path: '/admin/content' },
    { labelKey: 'admin.section.media', path: '/admin/integrations' },
  ];

  protected readonly adminName = computed(() => this.auth.user()?.name ?? 'Admin');
  protected readonly currentSectionLabel = computed(() => {
    const current = this.navItems.find((item) =>
      item.path === '/admin'
        ? this.currentRouteUrl() === '/admin'
        : this.currentRouteUrl().startsWith(item.path),
    );

    return this.ui.t(current?.labelKey ?? 'admin.section.dashboard');
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

  @HostListener('window:resize')
  protected syncViewport(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const isMobile = window.innerWidth <= 1100;
    this.isMobile.set(isMobile);

    if (!isMobile) {
      this.mobileMenuOpen = false;
    }
  }
}
