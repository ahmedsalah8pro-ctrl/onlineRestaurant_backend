<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Branch extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($branch) {
            if (blank($branch->slug)) {
                $name = data_get($branch->name, 'en')
                    ?? data_get($branch->name, 'ar')
                    ?? 'branch';

                $branch->slug = Str::slug((string) $name);
            } elseif ($branch->isDirty('slug')) {
                $branch->slug = Str::slug((string) $branch->slug);
            }

            if (blank($branch->slug)) {
                $branch->slug = 'branch';
            }

            $branch->slug = static::makeUniqueSlug($branch->slug, $branch->id);
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
        'phone',
        'email',
        'address',
        'latitude',
        'longitude',
        'working_hours',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'address' => 'array',
            'working_hours' => 'array',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function deliveryZones(): HasMany
    {
        return $this->hasMany(DeliveryZone::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)
            ->withPivot(['is_active', 'custom_stock_quantity'])
            ->withTimestamps();
    }

    public function managers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'admin_branch_user')->withTimestamps();
    }
}
