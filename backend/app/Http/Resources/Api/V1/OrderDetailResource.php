<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'subtotal' => (float) $this->subtotal,
            'delivery_fee' => (float) $this->delivery_fee,
            'discount_total' => (float) $this->discount_total,
            'wallet_amount' => (float) $this->wallet_amount,
            'total' => (float) $this->total,
            'coupon_code' => $this->coupon_code,
            'coupon_snapshot' => $this->coupon_snapshot,
            'notes' => $this->notes,
            'delivery_person_name' => $this->delivery_person_name,
            'delivery_person_phone' => $this->delivery_person_phone,
            'branch' => $this->branch ? new BranchResource($this->branch) : null,
            'delivery_zone' => $this->deliveryZone ? [
                'id' => $this->deliveryZone->id,
                'name' => Translatable::get($this->deliveryZone->name),
                'delivery_fee' => (float) $this->deliveryZone->delivery_fee,
            ] : null,
            'address' => $this->address ? new AddressResource($this->address) : null,
            'items' => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'product_snapshot' => $item->product_snapshot,
                'selected_addons' => $item->selected_addons,
                'unit_price' => (float) $item->unit_price,
                'quantity' => $item->quantity,
                'line_subtotal' => (float) $item->line_subtotal,
            ]),
            'status_logs' => $this->statusLogs->map(fn ($log) => [
                'id' => $log->id,
                'from_status' => $log->from_status,
                'to_status' => $log->to_status,
                'notes' => $log->notes,
                'created_at' => $log->created_at,
            ]),
        ];
    }
}
