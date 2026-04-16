import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { OrderDetail, OrderSummary } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

type OrderStepState = 'complete' | 'current' | 'upcoming';

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
  protected readonly listLoading = signal(false);
  protected readonly detailLoading = signal(false);
  protected readonly detailError = signal('');

  protected readonly orderSteps = [
    'created',
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered',
  ] as const;

  protected readonly activeOrdersCount = computed(() => this.orders().filter((order) => !['delivered', 'cancelled', 'refunded'].includes(order.status)).length);
  protected readonly deliveredOrdersCount = computed(() => this.orders().filter((order) => order.status === 'delivered').length);

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      void this.resolveRoute(id);
    });
  }

  protected async openOrder(orderId: number): Promise<void> {
    await this.router.navigate(['/orders', orderId]);
  }

  protected goBack(): void {
    void this.router.navigate(['/orders']);
  }

  protected canSelfManage(order: OrderDetail): boolean {
    return order.status === 'created' || order.status === 'pending';
  }

  protected isSpecialTerminalStatus(order: OrderDetail): boolean {
    return order.status === 'cancelled' || order.status === 'refunded';
  }

  protected stepState(order: OrderDetail, step: string): OrderStepState {
    const currentIndex = this.progressIndex(order.status);
    const stepIndex = this.orderSteps.indexOf(step as (typeof this.orderSteps)[number]);

    if (stepIndex < currentIndex) {
      return 'complete';
    }

    if (stepIndex === currentIndex) {
      return 'current';
    }

    return 'upcoming';
  }

  protected originalOrderTotal(order: OrderSummary | OrderDetail): number {
    return Number(order.grand_total_before_discount ?? (Number(order.subtotal) + Number(order.delivery_fee)));
  }

  protected totalAfterDiscount(order: OrderSummary | OrderDetail): number {
    return Number(order.grand_total_before_wallet ?? (this.originalOrderTotal(order) - Number(order.discount_total)));
  }

  protected dueAmount(order: OrderSummary | OrderDetail): number {
    return Number(order.total ?? 0);
  }

  protected walletPaid(order: OrderSummary | OrderDetail): number {
    return Number(order.wallet_amount ?? 0);
  }

  protected paymentMethodLabel(order: OrderSummary | OrderDetail): string {
    switch (order.payment_method) {
      case 'wallet':
        return this.ui.locale() === 'ar' ? 'المحفظة فقط' : 'Wallet only';
      case 'wallet_plus_cash_on_delivery':
        return this.ui.locale() === 'ar' ? 'المحفظة + الدفع عند الاستلام' : 'Wallet + Cash on Delivery';
      default:
        return this.ui.locale() === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery';
    }
  }

  protected statusTagSeverity(order: OrderSummary | OrderDetail): 'success' | 'info' | 'warn' | 'danger' {
    if (order.status === 'delivered') {
      return 'success';
    }

    if (order.status === 'cancelled' || order.status === 'refunded') {
      return 'danger';
    }

    if (order.status === 'out_for_delivery') {
      return 'warn';
    }

    return 'info';
  }

  protected async saveNotes(): Promise<void> {
    const current = this.selectedOrder();
    if (!current) {
      return;
    }

    const updated = await firstValueFrom(this.publicApi.updateOrderNotes(current.id, this.noteDraft()));
    this.selectedOrder.set(updated);
    this.noteDraft.set(updated.notes ?? '');
    this.message.add({
      severity: 'success',
      summary: this.ui.t('nav.orders'),
      detail: this.ui.locale() === 'ar' ? 'تم تحديث ملاحظات الطلب بنجاح.' : 'Order notes updated successfully.',
    });
  }

  protected async cancelOrder(): Promise<void> {
    const current = this.selectedOrder();
    if (!current) {
      return;
    }

    const updated = await firstValueFrom(this.publicApi.cancelOrder(current.id));
    this.selectedOrder.set(updated);
    this.message.add({
      severity: 'warn',
      summary: this.ui.t('nav.orders'),
      detail: this.ui.locale() === 'ar' ? 'تم إلغاء الطلب.' : 'Order cancelled.',
    });
    await this.loadOrders();
  }

  private async resolveRoute(id: string | null): Promise<void> {
    if (id) {
      await this.loadOrder(Number(id));
      return;
    }

    this.selectedOrder.set(null);
    await this.loadOrders();
  }

  private async loadOrders(): Promise<void> {
    this.listLoading.set(true);

    try {
      const response = await firstValueFrom(this.publicApi.getOrders());
      this.orders.set(response.items);
    } finally {
      this.listLoading.set(false);
    }
  }

  private async loadOrder(orderId: number): Promise<void> {
    this.detailLoading.set(true);
    this.detailError.set('');

    try {
      const order = await firstValueFrom(this.publicApi.getOrder(orderId));
      this.selectedOrder.set(order);
      this.noteDraft.set(order.notes ?? '');
    } catch (error) {
      await this.handleOrderError(error, orderId);
    } finally {
      this.detailLoading.set(false);
    }
  }

  private async handleOrderError(error: unknown, orderId: number): Promise<void> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        await this.router.navigate(['/401'], { queryParams: { next: `/orders/${orderId}` } });
        return;
      }

      if (error.status === 403) {
        await this.router.navigate(['/403'], { queryParams: { resource: 'order', id: orderId } });
        return;
      }

      if (error.status === 404) {
        await this.router.navigate(['/404'], { queryParams: { resource: 'order', id: orderId } });
        return;
      }
    }

    this.detailError.set(
      this.ui.locale() === 'ar'
        ? 'تعذر تحميل بيانات الطلب حاليًا. حاول مرة أخرى.'
        : 'Unable to load the order right now. Please try again.',
    );
  }

  private progressIndex(status: string): number {
    if (status === 'cancelled' || status === 'refunded') {
      return 1;
    }

    const index = this.orderSteps.indexOf(status as (typeof this.orderSteps)[number]);
    return index >= 0 ? index : 0;
  }
}
