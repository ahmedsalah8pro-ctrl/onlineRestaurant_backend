<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Tag\StoreTagRequest;
use App\Http\Requests\Api\V1\Admin\Tag\UpdateTagRequest;
use App\Http\Resources\Api\V1\TagResource;
use App\Models\Tag;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(TagResource::collection(Tag::query()->latest()->get()));
    }

    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = Tag::create($request->validated());

        return $this->successResponse(new TagResource($tag), 'Tag created.', 201);
    }

    public function show(Tag $tag): JsonResponse
    {
        return $this->successResponse(new TagResource($tag), 'Tag loaded.');
    }

    public function update(UpdateTagRequest $request, Tag $tag): JsonResponse
    {
        $tag->update($request->validated());

        return $this->successResponse(new TagResource($tag->fresh() ?? $tag), 'Tag updated.');
    }

    public function destroy(Tag $tag): JsonResponse
    {
        $tag->delete();

        return $this->successResponse(null, 'Tag deleted.');
    }
}
