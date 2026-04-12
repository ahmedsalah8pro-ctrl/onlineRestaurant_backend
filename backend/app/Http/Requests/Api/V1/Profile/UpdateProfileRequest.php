<?php

namespace App\Http\Requests\Api\V1\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'username' => ['sometimes', 'string', 'max:50', 'regex:/^[a-zA-Z0-9_.-]+$/', Rule::unique('users', 'username')->ignore($this->user()?->id)],
            'email' => ['sometimes', 'nullable', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->user()?->id)],
            'primary_phone' => ['sometimes', 'string', 'max:30', Rule::unique('users', 'primary_phone')->ignore($this->user()?->id)],
            'bio' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'avatar_path' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'is_public_profile' => ['sometimes', 'boolean'],
            'show_total_orders' => ['sometimes', 'boolean'],
            'show_total_spent' => ['sometimes', 'boolean'],
            'show_monthly_rank' => ['sometimes', 'boolean'],
            'show_yearly_rank' => ['sometimes', 'boolean'],
            'show_favorite_products' => ['sometimes', 'boolean'],
        ];
    }
}
