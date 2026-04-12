<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Translatable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'branch_id' => $this->branch_id,
            'items' => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => Translatable::get($item->product->name),
                'size' => $item->productSize ? Translatable::get($item->productSize->name) : null,
                'quantity' => $item->quantity,
                'price_snapshot' => (float) $item->price_snapshot,
                'selected_addons' => $item->selected_addons_snapshot,
                'line_subtotal' => round((float) $item->price_snapshot * $item->quantity, 2),
            ]),
            'subtotal' => round($this->items->sum(fn ($item) => (float) $item->price_snapshot * $item->quantity), 2),
        ];
    }
}
