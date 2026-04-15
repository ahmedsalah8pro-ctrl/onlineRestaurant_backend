import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderDetail, OrderSummary } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-orders-page',
  imports: [SharedUiModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly storefront = inject(StorefrontService);

  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly selectedOrder = signal<OrderDetail | null>(null);
  protected readonly detailVisible = signal(false);
  protected readonly statusForm = {
    status: 'confirmed',
    notes: '',
  };
  protected readonly deliveryForm = {
    delivery_person_name: '',
    delivery_person_phone: '',
  };

  protected readonly statusOptions = [
    'created',
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'refunded',
  ];

  async ngOnInit(): Promise<void> {
    const response = await firstValueFrom(this.adminApi.listOrders());
    this.orders.set(response.items);
  }

  protected async openOrder(orderId: number): Promise<void> {
    const order = await firstValueFrom(this.adminApi.showOrder(orderId));
    this.selectedOrder.set(order);
    this.statusForm.status = order.status;
    this.statusForm.notes = '';
    this.deliveryForm.delivery_person_name = order.delivery_person_name ?? '';
    this.deliveryForm.delivery_person_phone = order.delivery_person_phone ?? '';
    this.detailVisible.set(true);
  }

  protected async updateStatus(): Promise<void> {
    const current = this.selectedOrder();

    if (!current) {
      return;
    }

    this.selectedOrder.set(await firstValueFrom(this.adminApi.updateOrderStatus(current.id, this.statusForm)));
  }

  protected async assignDelivery(): Promise<void> {
    const current = this.selectedOrder();

    if (!current) {
      return;
    }

    this.selectedOrder.set(await firstValueFrom(this.adminApi.assignDelivery(current.id, this.deliveryForm)));
  }
}
