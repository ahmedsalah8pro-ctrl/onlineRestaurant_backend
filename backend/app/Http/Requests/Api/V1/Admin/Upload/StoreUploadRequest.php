<?php

namespace App\Http\Requests\Api\V1\Admin\Upload;

use App\Services\Settings\SettingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Validation\Rule;

class StoreUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var SettingService $settings */
        $settings = app(SettingService::class);
        $allowedMimes = array_merge(
            $settings->allowedUploadImageMimes(),
            $settings->allowedUploadVideoMimes(),
            $settings->allowedUploadFontMimes(),
        );

        return [
            'file' => [
                'required',
                'file',
                'max:'.max(
                    $settings->uploadImageMaxKilobytes(),
                    $settings->uploadVideoMaxKilobytes(),
                    $settings->uploadFontMaxKilobytes(),
                ),
                'mimetypes:'.implode(',', $allowedMimes),
            ],
            'directory' => ['nullable', 'string', 'max:100', 'regex:/^[a-zA-Z0-9_\\/-]+$/'],
            'visibility' => ['nullable', Rule::in(['public'])],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $file = $this->file('file');

            if ($file === null) {
                return;
            }

            /** @var SettingService $settings */
            $settings = app(SettingService::class);
            $mime = (string) $file->getMimeType();
            $sizeInKilobytes = (int) ceil(((int) $file->getSize()) / 1024);
            $imageMimes = $settings->allowedUploadImageMimes();
            $videoMimes = $settings->allowedUploadVideoMimes();
            $fontMimes = $settings->allowedUploadFontMimes();

            if (in_array($mime, $imageMimes, true) && $sizeInKilobytes > $settings->uploadImageMaxKilobytes()) {
                $validator->errors()->add('file', 'The uploaded image exceeds the configured image size limit.');
            }

            if (in_array($mime, $videoMimes, true) && $sizeInKilobytes > $settings->uploadVideoMaxKilobytes()) {
                $validator->errors()->add('file', 'The uploaded video exceeds the configured video size limit.');
            }

            if (in_array($mime, $fontMimes, true) && $sizeInKilobytes > $settings->uploadFontMaxKilobytes()) {
                $validator->errors()->add('file', 'The uploaded font exceeds the configured font size limit.');
            }
        });
    }
}
