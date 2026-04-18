<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = (! $this->is_anonymous && $this->relationLoaded('user')) ? $this->user : null;

        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'is_anonymous' => $this->is_anonymous,
            'reviewer_name' => $this->is_anonymous ? null : $this->user?->name,
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
            ] : null,
            'created_at' => $this->created_at,
        ];
    }
}
