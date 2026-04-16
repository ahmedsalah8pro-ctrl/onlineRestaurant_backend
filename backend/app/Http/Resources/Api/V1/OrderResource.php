<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    protected function paymentMethod(): string
    {
        if ((float) $this->wallet_amount > 0 && (float) $this->total > 0) {
            return 'wallet_plus_cash_on_delivery';
        }

        if ((float) $this->wallet_amount > 0) {
            return 'wallet';
        }

        return 'cash_on_delivery';
    }

    public function toArray(Request $request): array
    {
        $grandTotalBeforeDiscount = round((float) $this->subtotal + (float) $this->delivery_fee, 2);
        $grandTotalBeforeWallet = round($grandTotalBeforeDiscount - (float) $this->discount_total, 2);

        return [
            'id' => $this->id,
            'status' => $this->status,
            'subtotal' => (float) $this->subtotal,
            'delivery_fee' => (float) $this->delivery_fee,
            'discount_total' => (float) $this->discount_total,
            'wallet_amount' => (float) $this->wallet_amount,
            'total' => (float) $this->total,
            'grand_total_before_discount' => $grandTotalBeforeDiscount,
            'grand_total_before_wallet' => $grandTotalBeforeWallet,
            'payment_method' => $this->paymentMethod(),
            'coupon_code' => $this->coupon_code,
            'grace_period_ends_at' => $this->grace_period_ends_at,
            'placed_at' => $this->placed_at,
        ];
    }
}
