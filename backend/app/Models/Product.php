<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($product) {
            if (blank($product->slug)) {
                $name = data_get($product->name, 'en')
                    ?? data_get($product->name, 'ar')
                    ?? 'product';

                $product->slug = Str::slug((string) $name);
            } elseif ($product->isDirty('slug')) {
                $product->slug = Str::slug((string) $product->slug);
            }

            if (blank($product->slug)) {
                $product->slug = 'product';
            }

            $product->slug = static::makeUniqueSlug($product->slug, $product->id);
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

    public function scopeWithPublicMetrics(Builder $query): Builder
    {
        return $query
            ->withCount(['reviews as reviews_count' => fn (Builder $reviewQuery) => $reviewQuery->visible()])
            ->withAvg(['reviews as reviews_avg_rating' => fn ($reviewQuery) => $reviewQuery->visible()], 'rating')
            ->selectSub(
                OrderItem::query()
                    ->selectRaw('COALESCE(SUM(order_items.quantity), 0)')
                    ->join('orders', 'orders.id', '=', 'order_items.order_id')
                    ->whereColumn('order_items.product_id', 'products.id')
                    ->whereNotIn('orders.status', ['cancelled', 'refunded']),
                'ordered_quantity_total'
            )
            ->selectSub(
                OrderItem::query()
                    ->selectRaw('COUNT(DISTINCT orders.user_id)')
                    ->join('orders', 'orders.id', '=', 'order_items.order_id')
                    ->whereColumn('order_items.product_id', 'products.id')
                    ->whereNotIn('orders.status', ['cancelled', 'refunded'])
                    ->whereNotNull('orders.user_id'),
                'unique_customers_total'
            );
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

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
