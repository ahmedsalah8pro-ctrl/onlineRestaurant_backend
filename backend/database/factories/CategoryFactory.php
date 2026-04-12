<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $nameAr = fake()->randomElement(['بيتزا', 'كريب', 'حلويات', 'مشروبات', 'عروض']);
        $nameEn = Str::headline($nameAr).' '.fake()->unique()->numberBetween(1, 99);

        return [
            'parent_id' => null,
            'name' => ['ar' => $nameAr, 'en' => $nameEn],
            'slug' => Str::slug($nameEn).'-'.fake()->unique()->numberBetween(10, 999),
            'description' => [
                'ar' => 'وصف تجريبي للقسم',
                'en' => 'Demo category description',
            ],
            'sort_order' => fake()->numberBetween(0, 20),
            'is_active' => true,
        ];
    }
}
