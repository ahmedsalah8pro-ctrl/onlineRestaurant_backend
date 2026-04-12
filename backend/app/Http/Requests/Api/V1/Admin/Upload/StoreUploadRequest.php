<?php

namespace App\Http\Requests\Api\V1\Admin\Upload;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'max:51200', 'mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/webm'],
            'directory' => ['nullable', 'string', 'max:100', 'regex:/^[a-zA-Z0-9_\\/-]+$/'],
            'visibility' => ['nullable', Rule::in(['public'])],
        ];
    }
}
