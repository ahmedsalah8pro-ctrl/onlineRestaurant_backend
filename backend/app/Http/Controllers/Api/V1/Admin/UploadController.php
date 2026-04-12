<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Upload\StoreUploadRequest;
use App\Services\Audit\AuditLogService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    use ApiResponse;

    public function __construct(protected AuditLogService $auditLogService)
    {
    }

    public function store(StoreUploadRequest $request): JsonResponse
    {
        $file = $request->file('file');
        abort_unless($file !== null, 422, 'Upload file is missing.');

        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'bin');
        $directory = trim((string) $request->validated('directory', 'misc'), '/');
        $safeDirectory = preg_replace('/[^a-zA-Z0-9_\\/-]/', '', $directory) ?: 'misc';
        $filename = Str::uuid().'.'.$extension;
        $path = $file->storeAs($safeDirectory.'/'.now()->format('Y/m'), $filename, 'uploads');

        abort_unless($path !== false, 500, 'Failed to store uploaded file.');
        $this->auditLogService->record($this->authUser($request), 'upload.created', null, [
            'disk' => 'uploads',
            'path' => $path,
            'directory' => $safeDirectory,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ], $request);

        return $this->successResponse([
            'disk' => 'uploads',
            'path' => $path,
            'filename' => basename($path),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'sha256' => hash_file('sha256', $file->getRealPath() ?: $file->path()),
            'scan_status' => 'clean',
            'scan_simulated' => true,
            'url' => Storage::disk('uploads')->url($path),
        ], 'File uploaded successfully.', 201);
    }
}
