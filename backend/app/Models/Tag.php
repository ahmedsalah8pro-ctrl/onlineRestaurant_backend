<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($tag) {
            if (blank($tag->slug)) {
                $name = data_get($tag->name, 'en')
                    ?? data_get($tag->name, 'ar')
                    ?? 'tag';

                $tag->slug = Str::slug((string) $name);
            } elseif ($tag->isDirty('slug')) {
                $tag->slug = Str::slug((string) $tag->slug);
            }

            if (blank($tag->slug)) {
                $tag->slug = 'tag';
            }

            $tag->slug = static::makeUniqueSlug($tag->slug, $tag->id);
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
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
