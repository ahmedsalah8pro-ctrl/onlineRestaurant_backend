import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-home-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly storefront = inject(StorefrontService);
  protected readonly theme = inject(ThemeService);
  protected readonly runtime = inject(RuntimeConfigService);

  protected readonly metrics = computed(() => [
    { label: 'Branches', value: this.storefront.branches().length },
    { label: 'Categories', value: this.storefront.categories().length },
    { label: 'Best Sellers', value: this.storefront.bestSellers().length },
    { label: 'API Mode', value: 'REST / JSON' },
  ]);

  protected readonly capabilityCards = [
    'Multi-branch menus and delivery zones',
    'Variant pricing and add-on groups',
    'Wallet, coupons, gift cards, and secure checkout',
    'White-label branding from admin settings only',
  ];
}
