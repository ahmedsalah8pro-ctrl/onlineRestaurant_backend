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

/**
 * @mixin \App\Models\Order
 */
class OrderDetailResource extends JsonResource
{
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

        return [
            'id' => $order->id,
            'status' => $order->status,
            'currency_code' => $order->currency_code,
            'subtotal' => (float) $order->subtotal,
            'delivery_fee' => (float) $order->delivery_fee,
            'discount_total' => (float) $order->discount_total,
            'wallet_amount' => (float) $order->wallet_amount,
            'total' => (float) $order->total,
            'coupon_code' => $order->coupon_code,
            'coupon_snapshot' => $order->coupon_snapshot,
            'notes' => $order->notes,
            'grace_period_ends_at' => $order->grace_period_ends_at,
            'placed_at' => $order->placed_at,
            'delivery_person_name' => $order->delivery_person_name,
            'delivery_person_phone' => $order->delivery_person_phone,
            'branch' => $branch ? new BranchResource($branch) : null,
            'delivery_zone' => $deliveryZone ? [
                'id' => $deliveryZone->id,
                'name' => Translatable::get($deliveryZone->name),
                'delivery_fee' => (float) $deliveryZone->delivery_fee,
            ] : null,
            'address' => $address ? new AddressResource($address) : null,
            'items' => $items->map(fn (OrderItem $item) => [
                'id' => $item->id,
                'product_snapshot' => $item->product_snapshot,
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
