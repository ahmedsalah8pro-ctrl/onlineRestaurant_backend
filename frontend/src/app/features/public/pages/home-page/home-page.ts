import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
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
  protected readonly ui = inject(UiTextService);

  protected readonly metrics = computed(() => [
    { label: this.ui.t('home.metrics.branches'), value: this.storefront.branches().length },
    { label: this.ui.t('home.metrics.categories'), value: this.storefront.categories().length },
    { label: this.ui.t('home.metrics.bestSellers'), value: this.storefront.bestSellers().length },
    {
      label: this.ui.t('home.metrics.reviews'),
      value: this.storefront.bestSellers().reduce((sum, product) => sum + Number(product.rating_summary.count ?? 0), 0),
    },
  ]);

  protected readonly capabilityCards = computed(() => [
    this.ui.t('home.capability.branches'),
    this.ui.t('home.capability.variants'),
    this.ui.t('home.capability.checkout'),
    this.ui.t('home.capability.branding'),
  ]);
}
