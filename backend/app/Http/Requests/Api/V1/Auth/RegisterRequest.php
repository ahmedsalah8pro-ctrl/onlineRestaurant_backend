<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'regex:/^[a-zA-Z0-9_.-]+$/', Rule::unique('users', 'username')],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('users', 'email')],
            'primary_phone' => ['required', 'string', 'max:30', Rule::unique('users', 'primary_phone')],
            'password' => ['required', 'confirmed', 'min:6', 'regex:/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).+$/'],
        ];
    }
}
