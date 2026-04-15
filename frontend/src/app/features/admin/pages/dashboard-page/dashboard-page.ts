import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderSummary } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-dashboard-page',
  imports: [SharedUiModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);

  protected readonly metrics = signal([
    { label: '', value: '0' },
  ]);

  protected chartOptions: Record<string, unknown> = {};

  async ngOnInit(): Promise<void> {
    const [orders, products, branches, roles] = await Promise.all([
      firstValueFrom(this.adminApi.listOrders()),
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('products')),
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('branches')),
      firstValueFrom(this.adminApi.getRolesIndex()),
    ]);

    const orderItems = orders.items;
    const revenue = orderItems.reduce((sum, order) => sum + Number(order.total ?? 0), 0);
    const pending = orderItems.filter((order) => ['created', 'pending', 'confirmed', 'preparing'].includes(order.status)).length;

    this.metrics.set([
      { label: this.ui.t('admin.metrics.orders'), value: String(orders.meta.total ?? orderItems.length) },
      { label: this.ui.t('admin.metrics.products'), value: String(products.length) },
      { label: this.ui.t('admin.metrics.branches'), value: String(branches.length) },
      { label: this.ui.t('admin.metrics.roles'), value: String(roles.roles.length) },
      { label: this.ui.t('admin.metrics.revenue'), value: this.storefront.formatMoney(revenue) },
      { label: this.ui.t('admin.metrics.pending'), value: String(pending) },
    ]);

    this.chartOptions = this.buildStatusChart(orderItems);
  }

  private buildStatusChart(orders: OrderSummary[]): Record<string, unknown> {
    const counts = orders.reduce<Record<string, number>>((carry, order) => {
      carry[order.status] = (carry[order.status] ?? 0) + 1;
      return carry;
    }, {});

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
      },
      title: {
        text: this.ui.t('admin.chart.orderStatus'),
        style: { color: '#f8fafc', fontSize: '18px' },
      },
      xAxis: {
        categories: Object.keys(counts).map((status) => this.ui.orderStatus(status)),
        labels: { style: { color: '#cbd5e1' } },
      },
      yAxis: {
        title: { text: this.ui.t('admin.metrics.orders'), style: { color: '#cbd5e1' } },
        labels: { style: { color: '#cbd5e1' } },
      },
      legend: { enabled: false },
      series: [
        {
          type: 'column',
          data: Object.values(counts),
          color: '#22c55e',
        },
      ],
      credits: { enabled: false },
    };
  }
}
