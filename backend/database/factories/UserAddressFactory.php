<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserAddress>
 */
class UserAddressFactory extends Factory
{
    protected $model = UserAddress::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'label' => fake()->randomElement(['home', 'work']),
            'recipient_name' => fake()->name(),
            'phone' => '01'.fake()->numerify('#########'),
            'country' => 'Egypt',
            'city' => fake()->city(),
            'area' => fake()->streetName(),
            'street' => fake()->streetAddress(),
            'building' => fake()->buildingNumber(),
            'floor' => (string) fake()->numberBetween(1, 10),
            'apartment' => (string) fake()->numberBetween(1, 30),
            'landmark' => fake()->optional()->sentence(3),
            'notes' => fake()->optional()->sentence(),
            'is_default' => true,
        ];
    }
}
