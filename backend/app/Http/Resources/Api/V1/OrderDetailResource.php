<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusLog;
use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\UserAddress;
use App\Support\Translatable;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @mixin \App\Models\Order
 */
class OrderDetailResource extends JsonResource
{
    protected function paymentMethod(Order $order): string
    {
        if ((float) $order->wallet_amount > 0 && (float) $order->total > 0) {
            return 'wallet_plus_cash_on_delivery';
        }

        if ((float) $order->wallet_amount > 0) {
            return 'wallet';
        }

        return 'cash_on_delivery';
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var Order $order */
        $order = $this->resource;
        /** @var Branch|null $branch */
        $branch = $order->branch;
        /** @var DeliveryZone|null $deliveryZone */
        $deliveryZone = $order->deliveryZone;
        /** @var UserAddress|null $address */
        $address = $order->address;
        /** @var EloquentCollection<int, OrderItem> $items */
        $items = $order->items;
        /** @var EloquentCollection<int, OrderStatusLog> $statusLogs */
        $statusLogs = $order->statusLogs;
        $grandTotalBeforeDiscount = round((float) $order->subtotal + (float) $order->delivery_fee, 2);
        $grandTotalBeforeWallet = round($grandTotalBeforeDiscount - (float) $order->discount_total, 2);
        $paymentMethod = $this->paymentMethod($order);
        $graceEndsAt = $order->grace_period_ends_at ? Carbon::parse($order->grace_period_ends_at) : null;
        $isInGracePeriod = $order->status === \App\Enums\OrderStatus::Pending->value && $graceEndsAt && $graceEndsAt->isFuture();
        $canUpdateNotes = $isInGracePeriod;
        $canCancelInstantly = in_array($order->status, [\App\Enums\OrderStatus::Created->value, \App\Enums\OrderStatus::Pending->value], true);

        return [
            'id' => $order->id,
            'status' => $order->status,
            'currency_code' => $order->currency_code,
            'subtotal' => (float) $order->subtotal,
            'delivery_fee' => (float) $order->delivery_fee,
            'discount_total' => (float) $order->discount_total,
            'wallet_amount' => (float) $order->wallet_amount,
            'total' => (float) $order->total,
            'grand_total_before_discount' => $grandTotalBeforeDiscount,
            'grand_total_before_wallet' => $grandTotalBeforeWallet,
            'payment_method' => $paymentMethod,
            'payment_summary' => [
                'method' => $paymentMethod,
                'paid_from_wallet' => (float) $order->wallet_amount,
                'due_on_delivery' => (float) $order->total,
                'grand_total_before_discount' => $grandTotalBeforeDiscount,
                'grand_total_before_wallet' => $grandTotalBeforeWallet,
                'discount_total' => (float) $order->discount_total,
            ],
            'coupon_code' => $order->coupon_code,
            'coupon_snapshot' => $order->coupon_snapshot,
            'notes' => $order->notes,
            'can_update_notes' => (bool) $canUpdateNotes,
            'notes_locked_reason' => $canUpdateNotes ? null : 'Order notes can no longer be updated.',
            'can_cancel_instantly' => (bool) $canCancelInstantly,
            'cancel_locked_reason' => $canCancelInstantly ? null : 'Order can no longer be cancelled instantly.',
            'grace_period_ends_at' => $order->grace_period_ends_at,
            'placed_at' => $order->placed_at,
            'delivery_person_name' => $order->delivery_person_name,
            'delivery_person_phone' => $order->delivery_person_phone,
            'branch' => $branch ? new BranchResource($branch) : null,
            'delivery_zone' => $deliveryZone ? [
                'id' => $deliveryZone->id,
                'name' => Translatable::get($deliveryZone->name),
                'translations' => $deliveryZone->name,
                'delivery_fee' => (float) $deliveryZone->delivery_fee,
            ] : null,
            'address' => $address ? new AddressResource($address) : null,
            'items' => $items->map(fn (OrderItem $item) => [
                'id' => $item->id,
                'product_snapshot' => $item->product_snapshot,
                'product_name' => Translatable::get($item->product_snapshot['name'] ?? 'Product'),
                'product_translations' => $item->product_snapshot['name'] ?? null,
                'size' => Translatable::get($item->product_snapshot['size'] ?? ''),
                'size_translations' => $item->product_snapshot['size'] ?? null,
                'selected_addons' => $item->selected_addons,
                'unit_price' => (float) $item->unit_price,
                'quantity' => $item->quantity,
                'line_subtotal' => (float) $item->line_subtotal,
            ]),
            'status_logs' => $statusLogs->map(fn (OrderStatusLog $log) => [
                'id' => $log->id,
                'from_status' => $log->from_status,
                'to_status' => $log->to_status,
                'notes' => $log->notes,
                'created_at' => $log->created_at,
            ]),
        ];
    }
}
