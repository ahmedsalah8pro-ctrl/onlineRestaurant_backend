<?php

namespace App\Http\Requests\Api\V1\Address;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'label' => ['sometimes', 'nullable', 'string', 'max:100'],
            'recipient_name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:30'],
            'alternative_phones' => ['sometimes', 'nullable', 'array', 'max:3'],
            'alternative_phones.*' => ['string', 'max:30'],
            'country' => ['sometimes', 'nullable', 'string', 'max:100'],
            'delivery_zone_id' => ['sometimes', 'exists:delivery_zones,id'],
            'street' => ['sometimes', 'nullable', 'string', 'max:255'],
            'building' => ['sometimes', 'nullable', 'string', 'max:100'],
            'floor' => ['sometimes', 'nullable', 'string', 'max:100'],
            'apartment' => ['sometimes', 'nullable', 'string', 'max:100'],
            'landmark' => ['sometimes', 'nullable', 'string', 'max:255'],
            'notes' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'is_default' => ['sometimes', 'boolean'],
        ];
    }
}
