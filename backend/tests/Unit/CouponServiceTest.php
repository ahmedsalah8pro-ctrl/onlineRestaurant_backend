<?php

namespace Tests\Unit;

use App\Models\Coupon;
use App\Models\User;
use App\Services\Coupons\CouponService;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CouponServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_coupon_service_caps_discount_to_eligible_amounts_only(): void
    {
        $this->seed(DatabaseSeeder::class);

        $coupon = Coupon::query()->where('code', 'FREEDEL')->firstOrFail();
        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $items = $user->orders()->latest()->firstOrFail()->items()->with('product.categories')->get();

        $result = app(CouponService::class)->evaluate($coupon, $user, $items, 20, 5);

        $this->assertTrue($result['valid']);
        $this->assertSame(0.0, $result['discount_products']);
        $this->assertSame(5.0, $result['discount_delivery']);
        $this->assertSame(5.0, $result['discount_total']);
    }
}
