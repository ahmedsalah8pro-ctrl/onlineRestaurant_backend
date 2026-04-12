<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class ProductPolicy
{
    use ChecksPermissions;

    public function viewAny(User $user): bool
    {
        return $this->hasPermission($user, 'products.view');
    }

    public function view(User $user, Product $product): bool
    {
        return $this->hasPermission($user, 'products.view');
    }

    public function create(User $user): bool
    {
        return $this->hasPermission($user, 'products.create');
    }

    public function update(User $user, Product $product): bool
    {
        return $this->hasPermission($user, 'products.update');
    }

    public function delete(User $user, Product $product): bool
    {
        return $this->hasPermission($user, 'products.delete');
    }
}
