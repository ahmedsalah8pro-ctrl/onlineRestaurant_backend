<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $nameEn = fake()->unique()->words(3, true);
        $nameAr = 'منتج '.fake()->unique()->numberBetween(1, 999);

        return [
            'name' => ['ar' => $nameAr, 'en' => Str::title($nameEn)],
            'slug' => Str::slug($nameEn).'-'.fake()->unique()->numberBetween(10, 999),
            'description' => [
                'ar' => 'وصف عربي للمنتج',
                'en' => 'English product description',
            ],
            'short_description' => [
                'ar' => 'وصف مختصر',
                'en' => 'Short description',
            ],
            'base_price' => fake()->randomFloat(2, 40, 300),
            'main_image_path' => 'products/demo-product.jpg',
            'is_active' => true,
            'is_limited_stock' => false,
            'stock_quantity' => null,
            'is_available_in_all_branches' => true,
            'is_best_seller_pinned' => false,
            'best_seller_rank' => null,
            'sort_order' => fake()->numberBetween(0, 20),
        ];
    }
}
