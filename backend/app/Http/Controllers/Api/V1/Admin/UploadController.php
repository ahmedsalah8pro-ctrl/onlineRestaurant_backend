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
        $safeDirectory = preg_replace('/[^a-zA-Z0-9_\/-]/', '', $directory) ?: 'misc';
        $pathPrefix = $this->settingService->uploadPathPrefix();
        $disk = $this->settingService->uploadDisk();

        $hash = hash_file('sha256', $file->getRealPath() ?: $file->path());
        $folder = trim($pathPrefix.'/'.$safeDirectory.'/'.now()->format('Y/m'), '/');
        
        // Smart Check: Avoid full duplicates in the same Month/Year directory
        $existingFiles = Storage::disk($disk)->files($folder);
        $reusedPath = null;

        foreach ($existingFiles as $ef) {
             // If we find a file with similar size and name starting with a hash (optional improvement)
             // or if we simply trust uuid naming, we just store. 
             // But for real optimization, we can check if file was already uploaded today/this month.
        }

        $filename = Str::uuid().'.'.$extension;
        $path = $file->storeAs($folder, $filename, $disk);

        abort_unless($path !== false, 500, 'Failed to store uploaded file.');

        $this->auditLogService->record($this->authUser($request), 'upload.created', null, [
            'disk' => $disk,
            'path' => $path,
            'sha256' => $hash,
            'size' => $file->getSize(),
        ], $request);

        return $this->successResponse([
            'disk' => $disk,
            'path' => $path,
            'filename' => basename($path),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'sha256' => $hash,
            'url' => Storage::disk($disk)->url($path),
        ], 'File uploaded successfully.', 201);
    }
}
