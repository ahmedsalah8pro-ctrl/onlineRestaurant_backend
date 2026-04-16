<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'name' => Translatable::get($this->name),
            'translations' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description ? Translatable::get($this->description) : null,
            'description_translations' => $this->description,
            'is_active' => $this->is_active,
            'children' => self::collection($this->whenLoaded('children')),
        ];
    }
}
