<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductSize>
 */
class ProductSizeFactory extends Factory
{
    protected $model = ProductSize::class;

    public function definition(): array
    {
        $code = fake()->randomElement(['small', 'medium', 'large']);

        return [
            'product_id' => Product::factory(),
            'code' => $code,
            'name' => [
                'ar' => match ($code) {
                    'small' => 'صغير',
                    'medium' => 'وسط',
                    default => 'كبير',
                },
                'en' => ucfirst($code),
            ],
            'price' => fake()->randomFloat(2, 50, 250),
            'is_default' => $code === 'medium',
            'sort_order' => match ($code) {
                'small' => 1,
                'medium' => 2,
                default => 3,
            },
            'is_active' => true,
        ];
    }
}
