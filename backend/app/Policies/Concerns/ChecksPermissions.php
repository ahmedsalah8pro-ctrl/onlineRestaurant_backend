<?php

namespace App\Policies\Concerns;

use App\Models\User;

trait ChecksPermissions
{
    protected function hasPermission(User $user, string $permission): bool
    {
        return $user->hasPermissionTo($permission, 'sanctum');
    }

    protected function hasAnyPermission(User $user, array $permissions): bool
    {
        return collect($permissions)
            ->filter()
            ->contains(fn (string $permission) => $user->hasPermissionTo($permission, 'sanctum'));
    }

    protected function managesBranch(User $user, ?int $branchId): bool
    {
        return $branchId !== null
            && $user->managedBranches()->whereKey($branchId)->exists();
    }
}
