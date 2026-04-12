<?php

namespace App\Http\Requests\Api\V1\Admin\Order;

use Illuminate\Foundation\Http\FormRequest;

class AssignDeliveryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'delivery_person_name' => ['required', 'string', 'max:255'],
            'delivery_person_phone' => ['required', 'string', 'max:30'],
        ];
    }
}
