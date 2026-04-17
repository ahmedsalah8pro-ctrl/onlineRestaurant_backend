<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\Marketing\ShareLinkService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Throwable;

class ShareLinkController extends Controller
{
    use ApiResponse;

    public function __construct(protected ShareLinkService $shareLinks)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $infrastructureError = $this->ensureInfrastructureReady();

        if ($infrastructureError !== null) {
            return $this->errorResponse($infrastructureError, 503);
        }

        $payload = $request->validate([
            'type' => ['required', 'string', 'in:product,menu,page,home'],
            'resource_id' => ['nullable', 'integer', 'min:1'],
            'slug' => ['nullable', 'string', 'max:160'],
            'locale' => ['nullable', 'string', 'in:ar,en'],
            'query' => ['nullable', 'array'],
            'query.branch_id' => ['nullable', 'integer', 'min:1'],
            'query.category_id' => ['nullable', 'integer', 'min:1'],
            'query.search' => ['nullable', 'string', 'max:120'],
            'query.sort' => ['nullable', 'string', 'max:60'],
            'query.tag' => ['nullable', 'string', 'max:120'],
        ]);

        $link = $this->shareLinks->create($payload, $request->user(), $request);

        return $this->successResponse([
            'id' => $link->id,
            'type' => $link->resource_type,
            'code' => $link->code,
            'slug_hint' => $link->slug_hint,
            'title' => $link->title,
            'description' => $link->description,
            'image_url' => $this->shareLinks->previewImageUrl($link),
            'share_url' => $this->shareLinks->shareUrl($link),
            'destination_url' => $this->shareLinks->destinationUrl($link),
        ], 'Share link created.', 201);
    }

    protected function ensureInfrastructureReady(): ?string
    {
        if (Schema::hasTable('share_links')) {
            return null;
        }

        if (app()->environment(['local', 'testing'])) {
            try {
                Artisan::call('migrate', ['--force' => true]);
            } catch (Throwable) {
                // We return a clean API response below instead of leaking SQL or CLI errors.
            }

            if (Schema::hasTable('share_links')) {
                return null;
            }
        }

        return __('Share links are not ready yet. Please run the latest migrations and try again.');
    }
}
