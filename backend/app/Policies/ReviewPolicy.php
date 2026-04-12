<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class ReviewPolicy
{
    use ChecksPermissions;

    public function viewAny(User $user): bool
    {
        return $this->hasPermission($user, 'reviews.view');
    }

    public function view(User $user, Review $review): bool
    {
        return $review->user_id === $user->id
            || $this->hasPermission($user, 'reviews.view');
    }

    public function update(User $user, Review $review): bool
    {
        return $this->hasPermission($user, 'reviews.update');
    }

    public function delete(User $user, Review $review): bool
    {
        return $this->hasPermission($user, 'reviews.delete');
    }
}
