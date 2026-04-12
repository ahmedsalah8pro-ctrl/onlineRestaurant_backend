<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryZoneResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'branch_id' => $this->branch_id,
            'name' => Translatable::get($this->name),
            'translations' => $this->name,
            'code' => $this->code,
            'delivery_fee' => (float) $this->delivery_fee,
            'min_delivery_time_minutes' => $this->min_delivery_time_minutes,
            'max_delivery_time_minutes' => $this->max_delivery_time_minutes,
            'is_active' => $this->is_active,
        ];
    }
}
