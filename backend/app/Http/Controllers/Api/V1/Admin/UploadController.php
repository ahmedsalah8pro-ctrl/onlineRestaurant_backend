<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Upload\StoreUploadRequest;
use App\Services\Audit\AuditLogService;
use App\Services\Settings\SettingService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AuditLogService $auditLogService,
        protected SettingService $settingService,
    ) {
    }

    public function store(StoreUploadRequest $request): JsonResponse
    {
        $file = $request->file('file');
        abort_unless($file !== null, 422, 'Upload file is missing.');

        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'bin');
        $directory = trim((string) $request->validated('directory', 'misc'), '/');
        $safeDirectory = preg_replace('/[^a-zA-Z0-9_\\/-]/', '', $directory) ?: 'misc';
        $pathPrefix = $this->settingService->uploadPathPrefix();
        $disk = $this->settingService->uploadDisk();
        $filename = Str::uuid().'.'.$extension;
        $path = $file->storeAs(trim($pathPrefix.'/'.$safeDirectory.'/'.now()->format('Y/m'), '/'), $filename, $disk);

        abort_unless($path !== false, 500, 'Failed to store uploaded file.');
        $this->auditLogService->record($this->authUser($request), 'upload.created', null, [
            'disk' => $disk,
            'path' => $path,
            'path_prefix' => $pathPrefix,
            'directory' => $safeDirectory,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ], $request);

        return $this->successResponse([
            'disk' => $disk,
            'path' => $path,
            'filename' => basename($path),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'sha256' => hash_file('sha256', $file->getRealPath() ?: $file->path()),
            'scan_status' => $this->settingService->getValue('uploads', 'virus_scan_mode', 'simulated') === 'disabled' ? 'skipped' : 'clean',
            'scan_simulated' => $this->settingService->getValue('uploads', 'virus_scan_mode', 'simulated') === 'simulated',
            'url' => Storage::disk($disk)->url($path),
        ], 'File uploaded successfully.', 201);
    }
}
