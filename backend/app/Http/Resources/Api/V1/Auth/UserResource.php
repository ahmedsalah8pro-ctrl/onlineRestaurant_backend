<?php

namespace App\Http\Resources\Api\V1\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'primary_phone' => $this->primary_phone,
            'is_active' => $this->is_active,
            'roles' => $this->whenLoaded('roles', fn () => $this->roles->pluck('name')->values()),
            'profile' => $this->whenLoaded('profile', [
                'avatar_path' => $this->profile?->avatar_path,
                'is_public_profile' => $this->profile?->is_public_profile,
            ]),
        ];
    }
}
