<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use App\Policies\Concerns\ChecksPermissions;

class OrderPolicy
{
    use ChecksPermissions;

    public function view(User $user, Order $order): bool
    {
        return $order->user_id === $user->id
            || $this->hasPermission($user, 'orders.view')
            || ($this->hasPermission($user, 'orders.manage.assigned-branches')
                && $this->managesBranch($user, $order->branch_id));
    }

    public function update(User $user, Order $order): bool
    {
        return $order->user_id === $user->id
            || $this->manage($user, $order);
    }

    public function viewAdmin(User $user, ?Order $order = null): bool
    {
        if ($this->hasPermission($user, 'orders.view')) {
            return true;
        }

        if ($order) {
            return $this->hasPermission($user, 'orders.manage.assigned-branches')
                && $this->managesBranch($user, $order->branch_id);
        }

        return $this->hasPermission($user, 'orders.manage.assigned-branches')
            && $user->managedBranches()->exists();
    }

    public function manage(User $user, Order $order): bool
    {
        return $this->hasPermission($user, 'orders.manage')
            || ($this->hasPermission($user, 'orders.manage.assigned-branches')
                && $this->managesBranch($user, $order->branch_id));
    }
}
