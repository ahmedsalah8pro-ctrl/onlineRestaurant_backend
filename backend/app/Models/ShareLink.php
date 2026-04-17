<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShareLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'resource_type',
        'resource_id',
        'code',
        'slug_hint',
        'destination_path',
        'destination_query',
        'title',
        'description',
        'image_url',
        'payload',
        'created_by_user_id',
        'creator_ip_hash',
        'creator_user_agent',
        'visits_count',
        'last_visited_at',
        'last_visitor_ip_hash',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'destination_query' => 'array',
            'payload' => 'array',
            'last_visited_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
