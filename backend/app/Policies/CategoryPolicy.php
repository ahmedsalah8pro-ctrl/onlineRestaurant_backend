<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class CategoryPolicy
{
    use ChecksPermissions;

    public function viewAny(User $user): bool
    {
        return $this->hasPermission($user, 'categories.view');
    }

    public function view(User $user, Category $category): bool
    {
        return $this->hasPermission($user, 'categories.view');
    }

    public function create(User $user): bool
    {
        return $this->hasPermission($user, 'categories.create');
    }

    public function update(User $user, Category $category): bool
    {
        return $this->hasPermission($user, 'categories.update');
    }

    public function delete(User $user, Category $category): bool
    {
        return $this->hasPermission($user, 'categories.delete');
    }
}
