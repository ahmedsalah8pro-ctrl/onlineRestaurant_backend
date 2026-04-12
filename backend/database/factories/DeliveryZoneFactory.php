<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\DeliveryZone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DeliveryZone>
 */
class DeliveryZoneFactory extends Factory
{
    protected $model = DeliveryZone::class;

    public function definition(): array
    {
        $nameAr = 'منطقة '.fake()->city();
        $nameEn = 'Zone '.fake()->city();

        return [
            'branch_id' => Branch::factory(),
            'name' => ['ar' => $nameAr, 'en' => $nameEn],
            'code' => fake()->unique()->bothify('ZONE-###'),
            'delivery_fee' => fake()->randomFloat(2, 10, 80),
            'min_delivery_time_minutes' => fake()->numberBetween(20, 35),
            'max_delivery_time_minutes' => fake()->numberBetween(40, 70),
            'is_active' => true,
        ];
    }
}
