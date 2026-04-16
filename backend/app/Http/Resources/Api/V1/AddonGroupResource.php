<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddonGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'name' => \App\Support\Translatable::get($this->name),
            'translations' => $this->name,
            'selection_type' => $this->selection_type,
            'min_select' => $this->min_select,
            'max_select' => $this->max_select,
            'is_required' => (bool) $this->is_required,
            'is_active' => (bool) $this->is_active,
            'options' => $this->options?->map(fn($opt) => [
                'id' => $opt->id,
                'name' => \App\Support\Translatable::get($opt->name),
                'translations' => $opt->name,
                'base_price' => (float) $opt->base_price,
            ]),
            'created_at' => $this->created_at,
        ];
    }
}
