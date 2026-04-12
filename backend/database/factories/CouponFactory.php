<?php

namespace Database\Factories;

use App\Enums\CouponAppliesTo;
use App\Enums\CouponType;
use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Coupon>
 */
class CouponFactory extends Factory
{
    protected $model = Coupon::class;

    public function definition(): array
    {
        return [
            'code' => fake()->unique()->regexify('[A-Z]{5}[0-9]{2}'),
            'type' => fake()->randomElement([CouponType::Fixed->value, CouponType::Percentage->value]),
            'value' => fake()->randomFloat(2, 10, 100),
            'max_discount_amount' => fake()->optional()->randomFloat(2, 20, 80),
            'min_cart_value' => fake()->optional()->randomFloat(2, 50, 500),
            'applies_to' => fake()->randomElement([
                CouponAppliesTo::Products->value,
                CouponAppliesTo::Delivery->value,
                CouponAppliesTo::Both->value,
            ]),
            'usage_limit_total' => fake()->optional()->numberBetween(20, 100),
            'usage_limit_per_user' => fake()->optional()->numberBetween(1, 5),
            'starts_at' => now()->subDay(),
            'expires_at' => now()->addMonth(),
            'is_active' => true,
            'conditions' => [],
        ];
    }
}
