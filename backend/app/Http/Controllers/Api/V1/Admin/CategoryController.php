<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Category\StoreCategoryRequest;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(CategoryResource::collection(Category::with('children')->latest()->get()));
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());

        return $this->successResponse(new CategoryResource($category), 'Category created.', 201);
    }

    public function show(Category $category): JsonResponse
    {
        return $this->successResponse(new CategoryResource($category->load('children')), 'Category loaded.');
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $data = $request->validate([
            'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
            'name' => ['sometimes', 'array'],
            'slug' => ['nullable', 'string', Rule::unique('categories', 'slug')->ignore($category->id)],
            'description' => ['nullable', 'array'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $category->update($data);

        return $this->successResponse(new CategoryResource($category->fresh()->load('children')), 'Category updated.');
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return $this->successResponse(null, 'Category deleted.');
    }
}
