<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => Translatable::get($this->name),
            'translations' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description ? Translatable::get($this->description) : null,
            'short_description' => $this->short_description ? Translatable::get($this->short_description) : null,
            'base_price' => $this->base_price !== null ? (float) $this->base_price : null,
            'main_image_path' => $this->main_image_path,
            'categories' => $this->categories->map(fn ($category) => [
                'id' => $category->id,
                'name' => Translatable::get($category->name),
                'slug' => $category->slug,
            ]),
            'tags' => $this->tags->map(fn ($tag) => [
                'id' => $tag->id,
                'name' => Translatable::get($tag->name),
                'slug' => $tag->slug,
            ]),
            'sizes' => $this->sizes->map(fn ($size) => [
                'id' => $size->id,
                'code' => $size->code,
                'name' => Translatable::get($size->name),
                'translations' => $size->name,
                'price' => (float) $size->price,
                'is_default' => $size->is_default,
            ]),
            'addon_groups' => $this->addonGroups->map(fn ($group) => [
                'id' => $group->id,
                'name' => Translatable::get($group->name),
                'translations' => $group->name,
                'selection_type' => $group->selection_type,
                'is_required' => $group->is_required,
                'min_select' => $group->min_select,
                'max_select' => $group->max_select,
                'options' => $group->options->map(fn ($option) => [
                    'id' => $option->id,
                    'name' => Translatable::get($option->name),
                    'translations' => $option->name,
                    'base_price' => (float) $option->base_price,
                    'size_price_overrides' => $option->size_price_overrides,
                ]),
            ]),
            'media' => $this->media->map(fn ($media) => [
                'id' => $media->id,
                'media_type' => $media->media_type,
                'disk' => $media->disk,
                'path' => $media->path,
                'external_url' => $media->external_url,
                'url' => $media->external_url ?: ($media->path ? Storage::disk($media->disk ?: 'uploads')->url($media->path) : null),
                'title' => $media->title ? Translatable::get($media->title) : null,
                'is_primary' => $media->is_primary,
            ]),
        ];
    }
}
