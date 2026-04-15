import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderSummary } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
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

  protected readonly metrics = signal([
    { label: 'Orders', value: '0' },
    { label: 'Products', value: '0' },
    { label: 'Branches', value: '0' },
    { label: 'Roles', value: '0' },
  ]);

  protected chartOptions: Record<string, unknown> = {};

  async ngOnInit(): Promise<void> {
    const [orders, products, branches, roles] = await Promise.all([
      firstValueFrom(this.adminApi.listOrders()),
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('products')),
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('branches')),
      firstValueFrom(this.adminApi.getRolesIndex()),
    ]);

    this.metrics.set([
      { label: 'Orders', value: String(orders.meta.total ?? orders.items.length) },
      { label: 'Products', value: String(products.length) },
      { label: 'Branches', value: String(branches.length) },
      { label: 'Roles', value: String(roles.roles.length) },
    ]);

    this.chartOptions = this.buildStatusChart(orders.items);
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
        text: 'Order Status Overview',
        style: { color: '#f8fafc' },
      },
      xAxis: {
        categories: Object.keys(counts),
        labels: { style: { color: '#cbd5e1' } },
      },
      yAxis: {
        title: { text: 'Orders', style: { color: '#cbd5e1' } },
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
