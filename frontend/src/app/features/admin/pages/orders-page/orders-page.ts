import { Component, OnInit, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { OrderDetail, OrderSummary } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
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
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  private readonly message = inject(MessageService);

  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly selectedOrder = signal<OrderDetail | null>(null);
  protected readonly deliveryCrew = signal<{ name: string; phone: string }[]>([]);
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
    const [response, usersRes] = await Promise.all([
      firstValueFrom(this.adminApi.listOrders()),
      firstValueFrom(this.adminApi.listUsers()).catch(() => ({ items: [] })),
    ]);
    this.orders.set(response.items);
    this.deliveryCrew.set(
      usersRes.items
        .filter((u: any) => u['roles']?.length > 0)
        .map((u: any) => ({ name: String(u['name']), phone: String(u['primary_phone'] ?? '') }))
    );
  }

  protected fillDeliveryPerson(person: { name: string; phone: string }): void {
    this.deliveryForm.delivery_person_name = person.name;
    this.deliveryForm.delivery_person_phone = person.phone;
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
    this.message.add({ severity: 'success', summary: this.ui.t('admin.orders.title'), detail: this.ui.t('admin.orders.updateStatus') });
  }

  protected async assignDelivery(): Promise<void> {
    const current = this.selectedOrder();

    if (!current) {
      return;
    }

    this.selectedOrder.set(await firstValueFrom(this.adminApi.assignDelivery(current.id, this.deliveryForm)));
    this.message.add({ severity: 'success', summary: this.ui.t('admin.orders.title'), detail: this.ui.t('admin.orders.assign') });
  }

  protected getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'created':
      case 'pending': return 'secondary';
      case 'confirmed':
      case 'preparing': return 'info';
      case 'out_for_delivery': return 'warn';
      case 'delivered': return 'success';
      case 'cancelled':
      case 'refunded': return 'danger';
      default: return 'info';
    }
  }

  protected getItemName(item: any): string {
    const snap = item.product_snapshot || {};
    if (snap['name'] && typeof snap['name'] === 'object') {
      return this.theme.resolveText(snap['name'] as never);
    }
    if (typeof snap['name'] === 'string') return snap['name'];
    
    if (snap['title'] && typeof snap['title'] === 'object') {
      return this.theme.resolveText(snap['title'] as never);
    }
    if (typeof snap['title'] === 'string') return snap['title'];

    return 'Product';
  }
}
