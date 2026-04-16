import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { OrderSummary } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

interface ChartBar {
  label: string;
  count: number;
  pct: number; // 0–100 percentage of height
}

@Component({
  selector: 'app-dashboard-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);

  protected readonly metrics = signal<Array<{ label: string; value: string; icon: string }>>([
    { label: '', value: '—', icon: '📦' },
  ]);

  protected readonly chartData = signal<ChartBar[]>([]);
  protected readonly revenueFormatted = signal('');
  protected readonly pendingCount = signal(0);

  async ngOnInit(): Promise<void> {
    try {
      const [orders, products, branches, roles] = await Promise.all([
        firstValueFrom(this.adminApi.listOrders()),
        firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('products')),
        firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('branches')),
        firstValueFrom(this.adminApi.getRolesIndex()),
      ]);

      const orderItems = orders.items;
      const revenue = orderItems.reduce((sum, order) => sum + Number(order.total ?? 0), 0);
      const pending = orderItems.filter((order) =>
        ['created', 'pending', 'confirmed', 'preparing'].includes(order.status),
      ).length;

      this.revenueFormatted.set(this.storefront.formatMoney(revenue));
      this.pendingCount.set(pending);

      this.metrics.set([
        { label: this.ui.t('admin.metrics.orders'), value: String(orders.meta.total ?? orderItems.length), icon: '🛒' },
        { label: this.ui.t('admin.metrics.products'), value: String(products.length), icon: '🍔' },
        { label: this.ui.t('admin.metrics.branches'), value: String(branches.length), icon: '🏪' },
        { label: this.ui.t('admin.metrics.roles'), value: String(roles.roles.length), icon: '🔐' },
        { label: this.ui.t('admin.metrics.revenue'), value: this.storefront.formatMoney(revenue), icon: '💰' },
        { label: this.ui.t('admin.metrics.pending'), value: String(pending), icon: '⏳' },
      ]);

      this.chartData.set(this.buildChartData(orderItems));
    } catch {
      // silently handle auth/load errors
    }
  }

  private buildChartData(orders: OrderSummary[]): ChartBar[] {
    const counts = orders.reduce<Record<string, number>>((carry, order) => {
      carry[order.status] = (carry[order.status] ?? 0) + 1;
      return carry;
    }, {});

    const entries = Object.entries(counts);
    if (entries.length === 0) return [];

    const max = Math.max(...entries.map(([, v]) => v));

    return entries.map(([status, count]) => ({
      label: this.ui.orderStatus(status),
      count,
      pct: Math.round((count / max) * 100),
    }));
  }
}
