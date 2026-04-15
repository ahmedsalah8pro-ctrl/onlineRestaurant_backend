import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderDetail, OrderSummary } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-orders-page',
  imports: [SharedUiModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage implements OnInit {
  protected readonly publicApi = inject(PublicApiService);
  protected readonly storefront = inject(StorefrontService);

  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly selectedOrder = signal<OrderDetail | null>(null);
  protected readonly detailVisible = signal(false);
  protected readonly noteDraft = signal('');

  async ngOnInit(): Promise<void> {
    const response = await firstValueFrom(this.publicApi.getOrders());
    this.orders.set(response.items);
  }

  protected async openOrder(orderId: number): Promise<void> {
    const order = await firstValueFrom(this.publicApi.getOrder(orderId));
    this.selectedOrder.set(order);
    this.noteDraft.set(order.notes ?? '');
    this.detailVisible.set(true);
  }

  protected async saveNotes(): Promise<void> {
    const current = this.selectedOrder();

    if (!current) {
      return;
    }

    const updated = await firstValueFrom(this.publicApi.updateOrderNotes(current.id, this.noteDraft()));
    this.selectedOrder.set(updated);
  }

  protected async cancelOrder(): Promise<void> {
    const current = this.selectedOrder();

    if (!current) {
      return;
    }

    const updated = await firstValueFrom(this.publicApi.cancelOrder(current.id));
    this.selectedOrder.set(updated);
    const refreshed = await firstValueFrom(this.publicApi.getOrders());
    this.orders.set(refreshed.items);
  }
}
