<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\DynamicPage\StoreDynamicPageRequest;
use App\Http\Resources\Api\V1\DynamicPageResource;
use App\Models\DynamicPage;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DynamicPageController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(DynamicPageResource::collection(DynamicPage::latest()->get()));
    }

    public function store(StoreDynamicPageRequest $request): JsonResponse
    {
        $page = DynamicPage::create($request->validated());

        return $this->successResponse(new DynamicPageResource($page), 'Page created.', 201);
    }

    public function show(DynamicPage $page): JsonResponse
    {
        return $this->successResponse(new DynamicPageResource($page));
    }

    public function update(Request $request, DynamicPage $page): JsonResponse
    {
        $data = $request->validate([
            'slug' => ['sometimes', 'string', Rule::unique('dynamic_pages', 'slug')->ignore($page->id)],
            'title' => ['sometimes', 'array'],
            'content' => ['sometimes', 'array'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $page->update($data);

        return $this->successResponse(new DynamicPageResource($page->fresh()), 'Page updated.');
    }

    public function destroy(DynamicPage $page): JsonResponse
    {
        $page->delete();

        return $this->successResponse(null, 'Page deleted.');
    }
}
