<?php

namespace App\Services\Orders;

use App\Enums\OrderStatus;
use App\Enums\WalletTransactionType;
use App\Models\Coupon;
use App\Models\DeliveryZone;
use App\Models\Order;
use App\Models\User;
use App\Services\Audit\AuditLogService;
use App\Services\Cart\CartService;
use App\Services\Coupons\CouponService;
use App\Services\Notifications\OrderNotificationService;
use App\Services\Wallet\WalletService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CheckoutService
{
    public function __construct(
        protected CartService $cartService,
        protected CouponService $couponService,
        protected OrderNotificationService $orderNotificationService,
        protected AuditLogService $auditLogService,
        protected WalletService $walletService,
    ) {
    }

    public function checkout(User $user, array $payload): Order
    {
        return DB::transaction(function () use ($user, $payload) {
            $cart = $user->cart()->with(['items.product.categories', 'items.productSize'])->firstOrFail();

            if ($cart->items->isEmpty()) {
                throw ValidationException::withMessages(['cart' => ['Cart is empty.']]);
            }

            $this->cartService->ensureBranchAvailability($cart, (int) $payload['branch_id']);

            $deliveryZone = DeliveryZone::where('branch_id', $payload['branch_id'])
                ->active()
                ->findOrFail($payload['delivery_zone_id']);

            $subtotal = round($cart->items->sum(fn ($item) => (float) $item->price_snapshot * $item->quantity), 2);
            $coupon = empty($payload['coupon_code']) ? null : Coupon::active()->where('code', Str::upper($payload['coupon_code']))->first();
            $couponData = $this->couponService->evaluate($coupon, $user, $cart->items, $subtotal, (float) $deliveryZone->delivery_fee);

            $walletAmount = min(
                round((float) ($payload['wallet_amount'] ?? 0), 2),
                round($subtotal + (float) $deliveryZone->delivery_fee - (float) $couponData['discount_total'], 2),
                (float) $user->wallet->balance
            );

            $total = round($subtotal + (float) $deliveryZone->delivery_fee - (float) $couponData['discount_total'] - $walletAmount, 2);
            $total = max($total, 0);

            $order = Order::create([
                'user_id' => $user->id,
                'branch_id' => $payload['branch_id'],
                'delivery_zone_id' => $deliveryZone->id,
                'address_id' => $payload['address_id'],
                'status' => OrderStatus::Pending->value,
                'currency_code' => config('app.currency_code', 'EGP'),
                'subtotal' => $subtotal,
                'addons_total' => 0,
                'delivery_fee' => $deliveryZone->delivery_fee,
                'discount_total' => $couponData['discount_total'],
                'wallet_amount' => $walletAmount,
                'total' => $total,
                'coupon_code' => $coupon?->code,
                'coupon_snapshot' => [
                    'message' => $couponData['message'],
                    'discount_products' => $couponData['discount_products'],
                    'discount_delivery' => $couponData['discount_delivery'],
                ],
                'notes' => strip_tags((string) ($payload['notes'] ?? '')),
                'grace_period_ends_at' => now()->addMinutes((int) config('app.order_grace_period_minutes', 2)),
                'placed_at' => now(),
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_size_id' => $item->product_size_id,
                    'product_snapshot' => [
                        'name' => $item->product->name,
                        'slug' => $item->product->slug,
                        'size' => $item->productSize?->name,
                    ],
                    'selected_addons' => $item->selected_addons_snapshot,
                    'unit_price' => $item->price_snapshot,
                    'quantity' => $item->quantity,
                    'line_subtotal' => round((float) $item->price_snapshot * $item->quantity, 2),
                ]);
            }

            $order->statusLogs()->create([
                'from_status' => null,
                'to_status' => OrderStatus::Pending->value,
                'actor_id' => $user->id,
                'notes' => 'Order created.',
            ]);

            if ($coupon) {
                $coupon->usages()->create([
                    'user_id' => $user->id,
                    'order_id' => $order->id,
                    'used_at' => now(),
                ]);
            }

            if ($walletAmount > 0) {
                $this->walletService->debit($user, $walletAmount, WalletTransactionType::OrderPayment->value, $order, $user->id, 'Wallet used during checkout.');
            }

            $cart->items()->delete();
            $cart->update(['branch_id' => $payload['branch_id']]);

            $order = $order->fresh(['items', 'statusLogs', 'branch', 'deliveryZone', 'address', 'user']) ?? $order;

            $this->orderNotificationService->notifyOrderCreated($order);
            $this->auditLogService->record($user, 'order.checkout.completed', $order, [
                'branch_id' => $order->branch_id,
                'delivery_zone_id' => $order->delivery_zone_id,
                'total' => (float) $order->total,
                'coupon_code' => $order->coupon_code,
            ]);

            return $order;
        });
    }
}
