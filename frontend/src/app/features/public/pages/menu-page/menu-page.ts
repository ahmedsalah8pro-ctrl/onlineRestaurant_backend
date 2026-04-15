import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductListItem } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-menu-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage implements OnInit {
  protected readonly storefront = inject(StorefrontService);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);

  protected readonly products = signal<ProductListItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly total = signal(0);
  protected readonly page = signal(1);
  protected readonly lastPage = signal(1);

  protected filters = {
    search: '',
    branch_id: null as number | null,
    category_id: null as number | null,
    sort: 'default',
  };

  protected sortOptions = this.buildSortOptions();

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    this.sortOptions = this.buildSortOptions();
    await this.loadProducts();
  }

  protected async loadProducts(page = this.page()): Promise<void> {
    this.loading.set(true);
    this.page.set(page);

    try {
      const response = await firstValueFrom(
        this.publicApi.getProducts({
          page,
          search: this.filters.search,
          branch_id: this.filters.branch_id,
          category_id: this.filters.category_id,
          sort: this.filters.sort === 'default' ? null : this.filters.sort,
        }),
      );

      this.products.set(response?.items ?? []);
      this.total.set(Number(response?.meta?.total ?? 0));
      this.lastPage.set(Number(response?.meta?.last_page ?? 1));
    } finally {
      this.loading.set(false);
    }
  }

  private buildSortOptions(): Array<{ label: string; value: string }> {
    return [
      { label: this.ui.sortLabel('default'), value: 'default' },
      { label: this.ui.sortLabel('price_asc'), value: 'price_asc' },
      { label: this.ui.sortLabel('price_desc'), value: 'price_desc' },
      { label: this.ui.sortLabel('rating_desc'), value: 'rating_desc' },
      { label: this.ui.sortLabel('best_seller'), value: 'best_seller' },
    ];
  }
}
