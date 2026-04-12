<?php

namespace App\Providers;

use App\Models\Branch;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\DynamicPage;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserAddress;
use App\Policies\BranchPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\CouponPolicy;
use App\Policies\DynamicPagePolicy;
use App\Policies\OrderPolicy;
use App\Policies\ProductPolicy;
use App\Policies\ReviewPolicy;
use App\Policies\SettingPolicy;
use App\Policies\UserAddressPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Branch::class => BranchPolicy::class,
        Category::class => CategoryPolicy::class,
        Coupon::class => CouponPolicy::class,
        DynamicPage::class => DynamicPagePolicy::class,
        Order::class => OrderPolicy::class,
        Product::class => ProductPolicy::class,
        Review::class => ReviewPolicy::class,
        Setting::class => SettingPolicy::class,
        UserAddress::class => UserAddressPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::before(function (User $user, string $ability) {
            if ($user->id === 1 || $user->hasRole('super-admin', 'sanctum')) {
                return true;
            }

            return null;
        });
    }
}
