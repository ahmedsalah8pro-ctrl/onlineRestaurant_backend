import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { StorefrontService } from '../../../../core/services/storefront';
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

  protected readonly navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Catalog', path: '/admin/catalog' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Settings', path: '/admin/settings' },
    { label: 'Access', path: '/admin/access' },
    { label: 'Content', path: '/admin/content' },
    { label: 'Integrations', path: '/admin/integrations' },
  ];

  protected readonly adminName = computed(() => this.auth.user()?.name ?? 'Admin');

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
  }
}
