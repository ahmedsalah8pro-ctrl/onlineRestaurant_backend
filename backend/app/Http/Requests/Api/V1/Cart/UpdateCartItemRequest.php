<?php

namespace App\Http\Requests\Api\V1\Cart;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
            'product_size_id' => ['nullable', 'integer', 'exists:product_sizes,id'],
            'addon_option_ids' => ['nullable', 'array'],
            'addon_option_ids.*' => ['integer', 'exists:addon_options,id'],
        ];
    }
}
