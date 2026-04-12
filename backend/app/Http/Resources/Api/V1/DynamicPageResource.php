<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DynamicPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => Translatable::get($this->title),
            'translations' => [
                'title' => $this->title,
                'content' => $this->content,
            ],
            'content' => Translatable::get($this->content),
            'is_active' => $this->is_active,
        ];
    }
}
