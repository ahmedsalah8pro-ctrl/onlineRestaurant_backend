<?php

namespace App\Http\Requests\Api\V1\Admin\Tag;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'array'],
            'name.ar' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:100', Rule::unique('tags', 'slug')],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
