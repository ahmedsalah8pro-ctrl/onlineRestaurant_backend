<?php

namespace App\Http\Requests\Api\V1\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'array'],
            'name.ar' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
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
            'sizes.*.code' => ['nullable', 'string', 'max:100'],
            'sizes.*.name' => ['required_with:sizes', 'array'],
            'sizes.*.name.ar' => ['required_with:sizes', 'string', 'max:255'],
            'sizes.*.name.en' => ['nullable', 'string', 'max:255'],
            'sizes.*.price' => ['required_with:sizes', 'numeric', 'min:0'],
            'sizes.*.is_default' => ['sometimes', 'boolean'],
            'addon_groups' => ['nullable', 'array'],
            'addon_groups.*.name' => ['required_with:addon_groups', 'array'],
            'addon_groups.*.name.ar' => ['required_with:addon_groups', 'string', 'max:255'],
            'addon_groups.*.name.en' => ['nullable', 'string', 'max:255'],
            'addon_groups.*.selection_type' => ['required_with:addon_groups', 'string', 'in:single,multiple'],
            'addon_groups.*.min_select' => ['sometimes', 'integer', 'min:0'],
            'addon_groups.*.max_select' => ['nullable', 'integer', 'min:1'],
            'addon_groups.*.is_required' => ['sometimes', 'boolean'],
            'addon_groups.*.options' => ['nullable', 'array'],
            'addon_groups.*.options.*.name' => ['required_with:addon_groups.*.options', 'array'],
            'addon_groups.*.options.*.name.ar' => ['required_with:addon_groups.*.options', 'string', 'max:255'],
            'addon_groups.*.options.*.name.en' => ['nullable', 'string', 'max:255'],
            'addon_groups.*.options.*.base_price' => ['nullable', 'numeric', 'min:0'],
            'addon_groups.*.options.*.size_price_overrides' => ['nullable', 'array'],
        ];
    }
}
