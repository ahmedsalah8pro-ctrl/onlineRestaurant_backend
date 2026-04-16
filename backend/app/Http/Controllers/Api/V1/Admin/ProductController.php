<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Product\StoreProductRequest;
use App\Http\Resources\Api\V1\ProductDetailResource;
use App\Models\Product;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(ProductDetailResource::collection(Product::with(['categories', 'tags', 'sizes', 'addonGroups.options', 'media'])->latest()->get()));
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = DB::transaction(function () use ($request) {
            $product = Product::create(Arr::except($request->validated(), ['category_ids', 'tag_ids', 'branch_ids', 'media', 'sizes', 'addon_groups']));
            $this->syncProductRelations($product, $request->validated());

            return $product;
        });

        return $this->successResponse(new ProductDetailResource($product->load(['categories', 'tags', 'sizes', 'addonGroups.options', 'media'])), 'Product created.', 201);
    }

    public function show(Product $product): JsonResponse
    {
        return $this->successResponse(new ProductDetailResource($product->load(['categories', 'tags', 'sizes', 'addonGroups.options', 'media'])), 'Product loaded.');
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'array'],
            'slug' => ['nullable', 'string', 'max:150'],
            'description' => ['nullable', 'array'],
            'short_description' => ['nullable', 'array'],
            'base_price' => ['nullable', 'numeric', 'min:0'],
            'main_image_path' => ['nullable', 'string', 'max:2048'],
            'is_active' => ['sometimes', 'boolean'],
            'is_limited_stock' => ['sometimes', 'boolean'],
            'stock_quantity' => ['nullable', 'integer', 'min:0'],
            'is_available_in_all_branches' => ['sometimes', 'boolean'],
            'is_best_seller_pinned' => ['sometimes', 'boolean'],
            'best_seller_rank' => ['nullable', 'integer', 'min:1'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
            'branch_ids' => ['nullable', 'array'],
            'branch_ids.*' => ['integer', 'exists:branches,id'],
            'media' => ['nullable', 'array'],
            'media.*.media_type' => ['required_with:media', 'string', 'in:image,video,external_video'],
            'media.*.disk' => ['nullable', 'string', 'max:50'],
            'media.*.path' => ['nullable', 'string', 'max:2048'],
            'media.*.external_url' => ['nullable', 'url', 'max:2048'],
            'media.*.title' => ['nullable', 'array'],
            'media.*.title.ar' => ['nullable', 'string', 'max:255'],
            'media.*.title.en' => ['nullable', 'string', 'max:255'],
            'media.*.is_primary' => ['sometimes', 'boolean'],
            'media.*.sort_order' => ['sometimes', 'integer', 'min:0'],
            'sizes' => ['nullable', 'array'],
            'addon_groups' => ['nullable', 'array'],
        ]);

        DB::transaction(function () use ($product, $data) {
            $product->update(Arr::except($data, ['category_ids', 'tag_ids', 'branch_ids', 'media', 'sizes', 'addon_groups']));
            $this->syncProductRelations($product, $data, true);
        });

        return $this->successResponse(new ProductDetailResource(($product->fresh() ?? $product)->load(['categories', 'tags', 'sizes', 'addonGroups.options', 'media'])), 'Product updated.');
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return $this->successResponse(null, 'Product deleted.');
    }

    protected function syncProductRelations(Product $product, array $data, bool $replace = false): void
    {
        if (array_key_exists('category_ids', $data)) {
            $product->categories()->sync($data['category_ids'] ?? []);
        }

        if (array_key_exists('tag_ids', $data)) {
            $product->tags()->sync($data['tag_ids'] ?? []);
        }

        if (array_key_exists('branch_ids', $data)) {
            $product->branches()->sync(collect($data['branch_ids'] ?? [])->mapWithKeys(fn ($id) => [$id => ['is_active' => true]])->toArray());
        }

        if ($replace) {
            $product->media()->delete();
            $product->sizes()->delete();
            foreach ($product->addonGroups as $group) {
                $group->options()->delete();
            }
            $product->addonGroups()->delete();
        }

        foreach ($data['media'] ?? [] as $mediaIndex => $mediaData) {
            $product->media()->create([
                'media_type' => $mediaData['media_type'],
                'disk' => $mediaData['disk'] ?? null,
                'path' => $mediaData['path'] ?? null,
                'external_url' => $mediaData['external_url'] ?? null,
                'title' => $mediaData['title'] ?? null,
                'sort_order' => $mediaData['sort_order'] ?? $mediaIndex,
                'is_primary' => $mediaData['is_primary'] ?? false,
            ]);
        }

        $usedSizeCodes = [];

        foreach ($data['sizes'] ?? [] as $index => $size) {
            $product->sizes()->create([
                'code' => $this->makeUniqueSizeCode(
                    $this->resolveSizeCode($size, $index),
                    $usedSizeCodes,
                ),
                'name' => $size['name'],
                'price' => $size['price'],
                'is_default' => $size['is_default'] ?? false,
                'sort_order' => $index,
            ]);
        }

        foreach ($data['addon_groups'] ?? [] as $groupIndex => $groupData) {
            $group = $product->addonGroups()->create([
                'name' => $groupData['name'],
                'selection_type' => $groupData['selection_type'],
                'min_select' => $groupData['min_select'] ?? 0,
                'max_select' => $groupData['max_select'] ?? null,
                'is_required' => $groupData['is_required'] ?? false,
                'sort_order' => $groupIndex,
            ]);

            foreach ($groupData['options'] ?? [] as $optionIndex => $optionData) {
                $group->options()->create([
                    'name' => $optionData['name'],
                    'base_price' => $optionData['base_price'] ?? 0,
                    'size_price_overrides' => $optionData['size_price_overrides'] ?? [],
                    'sort_order' => $optionIndex,
                ]);
            }
        }
    }

    protected function resolveSizeCode(array $size, int $index): string
    {
        $candidate = trim((string) ($size['code'] ?? ''));

        if ($candidate !== '') {
            $normalized = Str::slug($candidate, '_');

            return $normalized !== '' ? $normalized : 'size_'.($index + 1);
        }

        $name = data_get($size, 'name.en')
            ?? data_get($size, 'name.ar')
            ?? data_get($size, 'translations.en')
            ?? data_get($size, 'translations.ar')
            ?? null;

        $normalized = Str::slug((string) ($name ?? ''), '_');

        return $normalized !== '' ? $normalized : 'size_'.($index + 1);
    }

    /**
     * @param array<int, string> $usedCodes
     */
    protected function makeUniqueSizeCode(string $code, array &$usedCodes): string
    {
        $base = $code;
        $counter = 2;

        while (in_array($code, $usedCodes, true)) {
            $code = "{$base}_{$counter}";
            $counter++;
        }

        $usedCodes[] = $code;

        return $code;
    }
}
