<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($category) {
            if (blank($category->slug)) {
                $name = data_get($category->name, 'en')
                    ?? data_get($category->name, 'ar')
                    ?? 'category';

                $category->slug = Str::slug((string) $name);
            } elseif ($category->isDirty('slug')) {
                $category->slug = Str::slug((string) $category->slug);
            }

            if (blank($category->slug)) {
                $category->slug = 'category';
            }

            $category->slug = static::makeUniqueSlug($category->slug, $category->id);
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
        'parent_id',
        'name',
        'slug',
        'description',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'description' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
