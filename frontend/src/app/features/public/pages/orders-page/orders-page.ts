import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { OrderDetail, OrderSummary } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
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
  protected readonly publicApi = inject(PublicApiService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly selectedOrder = signal<OrderDetail | null>(null);
  protected readonly noteDraft = signal('');

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        await this.loadOrder(Number(id));
      } else {
        this.selectedOrder.set(null);
        const response = await firstValueFrom(this.publicApi.getOrders());
        this.orders.set(response.items);
      }
    });
  }

  protected async loadOrder(orderId: number): Promise<void> {
    const order = await firstValueFrom(this.publicApi.getOrder(orderId));
    this.selectedOrder.set(order);
    this.noteDraft.set(order.notes ?? '');
  }

  protected async openOrder(orderId: number): Promise<void> {
    await this.router.navigate(['/orders', orderId]);
  }

  protected goBack(): void {
    this.router.navigate(['/orders']);
  }

  protected async saveNotes(): Promise<void> {
    const current = this.selectedOrder();
    if (!current) return;

    const updated = await firstValueFrom(this.publicApi.updateOrderNotes(current.id, this.noteDraft()));
    this.selectedOrder.set(updated);
    this.message.add({ severity: 'success', summary: this.ui.t('nav.orders'), detail: 'تم التحديث / Updated Successfully' });
  }

  protected async cancelOrder(): Promise<void> {
    const current = this.selectedOrder();
    if (!current) return;

    const updated = await firstValueFrom(this.publicApi.cancelOrder(current.id));
    this.selectedOrder.set(updated);
    this.message.add({ severity: 'warn', summary: 'Cancelled', detail: 'تم إلغاء الطلب / Order Cancelled' });
    const refreshed = await firstValueFrom(this.publicApi.getOrders());
    this.orders.set(refreshed.items);
  }
}

