<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar_path',
        'bio',
        'is_public_profile',
        'show_total_orders',
        'show_total_spent',
        'show_monthly_rank',
        'show_yearly_rank',
        'show_favorite_products',
    ];

    protected function casts(): array
    {
        return [
            'is_public_profile' => 'boolean',
            'show_total_orders' => 'boolean',
            'show_total_spent' => 'boolean',
            'show_monthly_rank' => 'boolean',
            'show_yearly_rank' => 'boolean',
            'show_favorite_products' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
