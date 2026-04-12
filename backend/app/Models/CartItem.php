<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'product_size_id',
        'quantity',
        'price_snapshot',
        'selected_addon_option_ids',
        'selected_addons_snapshot',
        'configuration_hash',
    ];

    protected function casts(): array
    {
        return [
            'price_snapshot' => 'decimal:2',
            'selected_addon_option_ids' => 'array',
            'selected_addons_snapshot' => 'array',
        ];
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productSize(): BelongsTo
    {
        return $this->belongsTo(ProductSize::class);
    }
}
