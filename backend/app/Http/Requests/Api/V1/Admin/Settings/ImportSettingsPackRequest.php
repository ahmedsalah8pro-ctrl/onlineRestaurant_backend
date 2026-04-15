<?php

namespace App\Http\Requests\Api\V1\Admin\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ImportSettingsPackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'groups' => ['required', 'array', 'min:1'],
            'groups.*' => ['required', 'array'],
        ];
    }
}
