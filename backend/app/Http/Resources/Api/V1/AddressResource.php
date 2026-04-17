<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'recipient_name' => $this->recipient_name,
            'phone' => $this->phone,
            'alternative_phones' => $this->alternative_phones,
            'country' => $this->country,
            'city' => $this->city,
            'area' => $this->area,
            'delivery_zone_id' => $this->delivery_zone_id,
            'delivery_zone' => new DeliveryZoneResource($this->whenLoaded('deliveryZone')),
            'street' => $this->street,
            'building' => $this->building,
            'floor' => $this->floor,
            'apartment' => $this->apartment,
            'landmark' => $this->landmark,
            'notes' => $this->notes,
            'is_default' => $this->is_default,
        ];
    }
}
