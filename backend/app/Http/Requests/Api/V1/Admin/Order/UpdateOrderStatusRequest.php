<?php

namespace App\Http\Requests\Api\V1\Admin\Order;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', 'string', 'in:confirmed,preparing,out_for_delivery,delivered,cancelled,refunded'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
