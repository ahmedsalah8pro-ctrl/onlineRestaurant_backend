<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => Translatable::get($this->name),
            'translations' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description ? Translatable::get($this->short_description) : null,
            'base_price' => $this->base_price !== null ? (float) $this->base_price : null,
            'main_image_path' => $this->main_image_path,
            'is_active' => $this->is_active,
            'is_best_seller_pinned' => $this->is_best_seller_pinned,
            'best_seller_rank' => $this->best_seller_rank,
            'rating_summary' => [
                'average' => round((float) ($this->reviews_avg_rating ?? 0), 2),
                'count' => (int) ($this->reviews_count ?? 0),
            ],
            'addon_groups_count' => (int) ($this->addon_groups_count ?? 0),
        ];
    }
}
