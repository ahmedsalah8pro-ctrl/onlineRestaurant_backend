<?php

namespace Database\Factories;

use App\Models\Branch;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Branch>
 */
class BranchFactory extends Factory
{
    protected $model = Branch::class;

    public function definition(): array
    {
        $nameAr = 'فرع '.fake()->city();
        $nameEn = 'Branch '.fake()->city();

        return [
            'name' => ['ar' => $nameAr, 'en' => $nameEn],
            'slug' => Str::slug($nameEn).'-'.fake()->unique()->numberBetween(10, 999),
            'phone' => '01'.fake()->numerify('#########'),
            'email' => fake()->companyEmail(),
            'address' => fake()->address(),
            'latitude' => fake()->latitude(22, 31),
            'longitude' => fake()->longitude(25, 35),
            'working_hours' => [
                'sat-thu' => ['from' => '10:00', 'to' => '23:30'],
                'fri' => ['from' => '13:00', 'to' => '23:30'],
            ],
            'is_active' => true,
        ];
    }
}
