<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Branch;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminProductMediaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_create_product_with_media_gallery(): void
    {
        $this->seed(DatabaseSeeder::class);

        Sanctum::actingAs(User::query()->findOrFail(1));

        $branch = Branch::query()->firstOrFail();
        $category = Category::query()->where('slug', 'pizza')->firstOrFail();
        $tag = Tag::query()->where('slug', 'best-seller')->firstOrFail();

        $response = $this->postJson('/api/v1/admin/products', [
            'name' => [
                'ar' => 'بيتزا ميديا',
                'en' => 'Media Pizza',
            ],
            'slug' => 'media-pizza',
            'description' => [
                'ar' => 'منتج مع معرض صور وفيديو',
                'en' => 'Product with image and video gallery',
            ],
            'base_price' => 150,
            'is_active' => true,
            'category_ids' => [$category->id],
            'tag_ids' => [$tag->id],
            'branch_ids' => [$branch->id],
            'media' => [
                [
                    'media_type' => 'image',
                    'disk' => 'uploads',
                    'path' => 'products/2026/04/demo-image.webp',
                    'title' => [
                        'ar' => 'صورة أساسية',
                        'en' => 'Primary Image',
                    ],
                    'is_primary' => true,
                ],
                [
                    'media_type' => 'external_video',
                    'external_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    'title' => [
                        'ar' => 'فيديو المنتج',
                        'en' => 'Product Video',
                    ],
                ],
            ],
            'sizes' => [
                [
                    'code' => 'medium',
                    'name' => [
                        'ar' => 'وسط',
                        'en' => 'Medium',
                    ],
                    'price' => 150,
                    'is_default' => true,
                ],
            ],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.slug', 'media-pizza')
            ->assertJsonCount(2, 'data.media')
            ->assertJsonPath('data.media.0.media_type', 'image')
            ->assertJsonPath('data.media.1.media_type', 'external_video');
    }
}
