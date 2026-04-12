<?php

namespace App\Policies;

use App\Models\Coupon;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class CouponPolicy
{
    use ChecksPermissions;

    public function viewAny(User $user): bool
    {
        return $this->hasPermission($user, 'coupons.view');
    }

    public function view(User $user, Coupon $coupon): bool
    {
        return $this->hasPermission($user, 'coupons.view');
    }

    public function create(User $user): bool
    {
        return $this->hasPermission($user, 'coupons.create');
    }

    public function update(User $user, Coupon $coupon): bool
    {
        return $this->hasPermission($user, 'coupons.update');
    }

    public function delete(User $user, Coupon $coupon): bool
    {
        return $this->hasPermission($user, 'coupons.delete');
    }
}
