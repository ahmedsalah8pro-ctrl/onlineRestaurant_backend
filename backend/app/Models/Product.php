<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($product) {
            if ($product->isDirty('slug')) {
                $product->slug = static::makeUniqueSlug($product->slug, $product->id);
            }
        });
    }

    protected static function makeUniqueSlug(string $slug, $id = null): string
    {
        $original = $slug;
        $count = 2;

        while (static::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'base_price',
        'main_image_path',
        'is_active',
        'is_limited_stock',
        'stock_quantity',
        'is_available_in_all_branches',
        'is_best_seller_pinned',
        'best_seller_rank',
        'sort_order',
        'purchases_count',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'description' => 'array',
            'short_description' => 'array',
            'base_price' => 'decimal:2',
            'is_active' => 'boolean',
            'is_limited_stock' => 'boolean',
            'is_available_in_all_branches' => 'boolean',
            'is_best_seller_pinned' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class)
            ->withPivot(['is_active', 'custom_stock_quantity'])
            ->withTimestamps();
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProductMedia::class);
    }

    public function sizes(): HasMany
    {
        return $this->hasMany(ProductSize::class);
    }

    public function addonGroups(): HasMany
    {
        return $this->hasMany(AddonGroup::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
