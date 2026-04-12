<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Branch;
use App\Models\Tag;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminCatalogManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_manage_tags_and_delivery_zones(): void
    {
        $this->seed(DatabaseSeeder::class);

        $admin = User::query()->findOrFail(1);
        $branch = Branch::query()->where('slug', 'cairo-branch')->firstOrFail();

        Sanctum::actingAs($admin);

        $tagResponse = $this->postJson('/api/v1/admin/tags', [
            'name' => [
                'ar' => 'جديد',
                'en' => 'New',
            ],
            'slug' => 'new-tag',
            'is_active' => true,
        ]);

        $tagResponse
            ->assertCreated()
            ->assertJsonPath('data.slug', 'new-tag');

        $tag = Tag::query()->where('slug', 'new-tag')->firstOrFail();

        $this->patchJson("/api/v1/admin/tags/{$tag->id}", [
            'name' => [
                'ar' => 'مميز',
                'en' => 'Featured',
            ],
        ])
            ->assertOk()
            ->assertJsonPath('data.name', 'مميز');

        $zoneResponse = $this->postJson('/api/v1/admin/delivery-zones', [
            'branch_id' => $branch->id,
            'name' => [
                'ar' => 'مصر الجديدة',
                'en' => 'Heliopolis',
            ],
            'code' => 'HELIOPOLIS',
            'delivery_fee' => 35,
            'min_delivery_time_minutes' => 25,
            'max_delivery_time_minutes' => 45,
            'is_active' => true,
        ]);

        $zoneResponse
            ->assertCreated()
            ->assertJsonPath('data.code', 'HELIOPOLIS');

        $this->getJson('/api/v1/admin/delivery-zones?branch_id='.$branch->id)
            ->assertOk()
            ->assertJsonFragment(['code' => 'HELIOPOLIS']);
    }
}
