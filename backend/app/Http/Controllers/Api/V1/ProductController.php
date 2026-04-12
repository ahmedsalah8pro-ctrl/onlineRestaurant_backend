<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ProductDetailResource;
use App\Http\Resources\Api\V1\ProductResource;
use App\Models\Product;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Product::query()
            ->active()
            ->withCount('reviews')
            ->withAvg(['reviews as reviews_avg_rating' => fn ($q) => $q->visible()], 'rating');

        if ($request->filled('category_id')) {
            $query->whereHas('categories', fn ($q) => $q->where('categories.id', $request->integer('category_id')));
        }

        if ($request->filled('tag')) {
            $searchTag = strtolower($request->string('tag'));
            $query->whereHas('tags', fn ($q) => $q->where('slug', $searchTag));
        }

        if ($request->filled('search')) {
            $search = strtolower($request->string('search'));
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('slug', 'like', "%{$search}%")
                    ->orWhereRaw('LOWER(json_extract(name, "$.ar")) like ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(json_extract(name, "$.en")) like ?', ["%{$search}%"]);
            });
        }

        if ($request->filled('branch_id')) {
            $branchId = $request->integer('branch_id');
            $query->where(function ($branchQuery) use ($branchId) {
                $branchQuery->where('is_available_in_all_branches', true)
                    ->orWhereHas('branches', fn ($q) => $q->where('branches.id', $branchId)->where('branch_product.is_active', true));
            });
        }

        match ($request->string('sort')->value()) {
            'price_asc' => $query->orderBy('base_price'),
            'price_desc' => $query->orderByDesc('base_price'),
            'rating_desc' => $query->orderByDesc('reviews_avg_rating'),
            'best_seller' => $query->orderBy('best_seller_rank'),
            default => $query->orderBy('sort_order')->orderByDesc('id'),
        };

        $products = $query->paginate(min($request->integer('per_page', 15), 50));

        return $this->paginatedResponse($products, ProductResource::collection($products));
    }

    public function show(Product $product): JsonResponse
    {
        abort_unless($product->is_active, 404);

        return $this->successResponse(
            new ProductDetailResource($product->load(['categories', 'tags', 'sizes', 'addonGroups.options', 'media'])),
            'Product loaded.'
        );
    }

    public function bestSellers(): JsonResponse
    {
        $products = Product::query()
            ->active()
            ->where(function ($query) {
                $query->where('is_best_seller_pinned', true)->orWhereNotNull('best_seller_rank');
            })
            ->withCount('reviews')
            ->withAvg(['reviews as reviews_avg_rating' => fn ($q) => $q->visible()], 'rating')
            ->orderBy('best_seller_rank')
            ->limit(10)
            ->get();

        return $this->successResponse(ProductResource::collection($products), 'Best sellers loaded.');
    }
}
