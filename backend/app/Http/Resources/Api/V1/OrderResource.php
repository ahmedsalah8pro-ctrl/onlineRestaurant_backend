<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'grace_period_ends_at' => $this->grace_period_ends_at,
            'placed_at' => $this->placed_at,
        ];
    }
}
