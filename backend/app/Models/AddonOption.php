<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AddonOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'addon_group_id',
        'name',
        'base_price',
        'size_price_overrides',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'base_price' => 'decimal:2',
            'size_price_overrides' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function addonGroup(): BelongsTo
    {
        return $this->belongsTo(AddonGroup::class);
    }
}
