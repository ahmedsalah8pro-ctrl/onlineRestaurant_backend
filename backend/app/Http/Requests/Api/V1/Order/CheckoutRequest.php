<?php

namespace App\Http\Requests\Api\V1\Order;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'branch_id' => ['required', 'integer', 'exists:branches,id'],
            'delivery_zone_id' => ['required', 'integer', 'exists:delivery_zones,id'],
            'address_id' => ['required', 'integer', 'exists:user_addresses,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'coupon_code' => ['nullable', 'string', 'max:100'],
            'wallet_amount' => ['nullable', 'numeric', 'min:0'],
            'payment_method' => ['required', 'string', 'in:cash_on_delivery,wallet,wallet_plus_cash_on_delivery'],
        ];
    }
}
