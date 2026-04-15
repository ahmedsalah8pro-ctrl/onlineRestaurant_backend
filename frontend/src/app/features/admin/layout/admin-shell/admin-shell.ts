import { Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  protected readonly navGroups = [
    {
      labelKey: 'admin.section.dashboard',
      items: [{ labelKey: 'admin.section.dashboard', path: '/admin' }],
    },
    {
      labelKey: 'admin.section.orders',
      items: [{ labelKey: 'admin.section.orders', path: '/admin/orders' }],
    },
    {
      labelKey: 'admin.section.catalog',
      items: [{ labelKey: 'admin.section.catalog', path: '/admin/catalog' }],
    },
    {
      labelKey: 'admin.section.customers',
      items: [{ labelKey: 'admin.section.customers', path: '/admin/access' }],
    },
    {
      labelKey: 'admin.section.branding',
      items: [{ labelKey: 'admin.section.branding', path: '/admin/settings' }],
    },
    {
      labelKey: 'admin.section.content',
      items: [{ labelKey: 'admin.section.content', path: '/admin/content' }],
    },
    {
      labelKey: 'admin.section.media',
      items: [{ labelKey: 'admin.section.media', path: '/admin/integrations' }],
    },
  ];

  protected readonly adminName = computed(() => this.auth.user()?.name ?? 'Admin');

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    this.mobileMenuOpen = false;
    await this.router.navigateByUrl('/admin/login');
  }

  protected toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMenu(): void {
    this.mobileMenuOpen = false;
  }
}
