<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\Marketing\ShareLinkService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShareLinkController extends Controller
{
    use ApiResponse;

    public function __construct(protected ShareLinkService $shareLinks)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'type' => ['required', 'string', 'in:product,menu,page,home'],
            'resource_id' => ['nullable', 'integer', 'min:1'],
            'slug' => ['nullable', 'string', 'max:160'],
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
            'image_url' => $link->image_url,
            'share_url' => $this->shareLinks->shareUrl($link),
            'destination_url' => $this->shareLinks->destinationUrl($link),
        ], 'Share link created.', 201);
    }
}
