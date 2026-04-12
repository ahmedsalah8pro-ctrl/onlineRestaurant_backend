<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => Translatable::get($this->name),
            'translations' => $this->name,
            'slug' => $this->slug,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'working_hours' => $this->working_hours,
            'is_active' => $this->is_active,
            'delivery_zones' => $this->whenLoaded('deliveryZones', fn () => $this->deliveryZones->map(fn ($zone) => [
                'id' => $zone->id,
                'name' => Translatable::get($zone->name),
                'translations' => $zone->name,
                'delivery_fee' => (float) $zone->delivery_fee,
            ])),
        ];
    }
}
