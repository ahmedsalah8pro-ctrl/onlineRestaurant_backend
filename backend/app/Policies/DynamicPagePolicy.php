<?php

namespace App\Policies;

use App\Models\DynamicPage;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class DynamicPagePolicy
{
    use ChecksPermissions;

    public function viewAny(User $user): bool
    {
        return $this->hasPermission($user, 'dynamic-pages.view');
    }

    public function view(User $user, DynamicPage $page): bool
    {
        return $this->hasPermission($user, 'dynamic-pages.view');
    }

    public function create(User $user): bool
    {
        return $this->hasPermission($user, 'dynamic-pages.create');
    }

    public function update(User $user, DynamicPage $page): bool
    {
        return $this->hasPermission($user, 'dynamic-pages.update');
    }

    public function delete(User $user, DynamicPage $page): bool
    {
        return $this->hasPermission($user, 'dynamic-pages.delete');
    }
}
