<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Branch;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\DynamicPage;
use App\Models\GiftCard;
use App\Models\Review;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminManagementCoverageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_manage_core_admin_crud_domains(): void
    {
        $this->seed(DatabaseSeeder::class);
        Sanctum::actingAs(User::query()->findOrFail(1));

        $branchResponse = $this->postJson('/api/v1/admin/branches', [
            'name' => ['ar' => 'فرع أسيوط', 'en' => 'Assiut Branch'],
            'slug' => 'assiut-branch',
            'phone' => '0880000000',
            'email' => 'assiut@example.com',
            'address' => 'Assiut, Egypt',
            'is_active' => true,
        ]);
        $branchResponse->assertCreated()->assertJsonPath('data.slug', 'assiut-branch');
        $branch = Branch::query()->where('slug', 'assiut-branch')->firstOrFail();
        $branchId = $branch->id;

        $this->getJson("/api/v1/admin/branches/{$branchId}")
            ->assertOk()
            ->assertJsonPath('data.slug', 'assiut-branch');

        $this->patchJson("/api/v1/admin/branches/{$branchId}", [
            'phone' => '0881111111',
        ])
            ->assertOk()
            ->assertJsonPath('data.phone', '0881111111');

        $categoryResponse = $this->postJson('/api/v1/admin/categories', [
            'name' => ['ar' => 'المعجنات', 'en' => 'Pastries'],
            'slug' => 'pastries',
            'is_active' => true,
        ]);
        $categoryResponse->assertCreated()->assertJsonPath('data.slug', 'pastries');
        $category = Category::query()->where('slug', 'pastries')->firstOrFail();
        $categoryId = $category->id;

        $this->patchJson("/api/v1/admin/categories/{$categoryId}", [
            'description' => ['ar' => 'قسم المعجنات', 'en' => 'Pastries section'],
        ])->assertOk();

        $couponResponse = $this->postJson('/api/v1/admin/coupons', [
            'code' => 'bigsave',
            'type' => 'fixed',
            'value' => 50,
            'applies_to' => 'products',
            'is_active' => true,
        ]);
        $couponResponse->assertCreated()->assertJsonPath('data.code', 'BIGSAVE');
        $coupon = Coupon::query()->where('code', 'BIGSAVE')->firstOrFail();
        $couponId = $coupon->id;

        $this->getJson("/api/v1/admin/coupons/{$couponId}")
            ->assertOk()
            ->assertJsonPath('data.code', 'BIGSAVE');

        $this->patchJson("/api/v1/admin/coupons/{$couponId}", [
            'value' => 60,
        ])
            ->assertOk()
            ->assertJsonPath('data.value', '60.00');

        $giftCardResponse = $this->postJson('/api/v1/admin/gift-cards', [
            'code' => 'gift200',
            'amount' => 200,
            'currency_code' => 'EGP',
            'is_active' => true,
        ]);
        $giftCardResponse->assertCreated()->assertJsonPath('data.code', 'GIFT200');
        $giftCard = GiftCard::query()->where('code', 'GIFT200')->firstOrFail();
        $giftCardId = $giftCard->id;

        $this->patchJson("/api/v1/admin/gift-cards/{$giftCardId}", [
            'amount' => 225,
        ])
            ->assertOk()
            ->assertJsonPath('data.amount', '225.00');

        $pageResponse = $this->postJson('/api/v1/admin/pages', [
            'slug' => 'privacy-policy',
            'title' => ['ar' => 'سياسة الخصوصية', 'en' => 'Privacy Policy'],
            'content' => ['ar' => 'محتوى عربي', 'en' => 'English content'],
            'is_active' => true,
        ]);
        $pageResponse->assertCreated()->assertJsonPath('data.slug', 'privacy-policy');
        $page = DynamicPage::query()->where('slug', 'privacy-policy')->firstOrFail();
        $pageId = $page->id;

        $this->patchJson("/api/v1/admin/pages/{$pageId}", [
            'content' => ['ar' => 'محتوى محدث', 'en' => 'Updated content'],
        ])
            ->assertOk();

        $roleResponse = $this->postJson('/api/v1/admin/roles', [
            'name' => 'qa-auditor',
            'permissions' => ['orders.view', 'reviews.view'],
        ]);
        $roleResponse->assertCreated()->assertJsonPath('data.name', 'qa-auditor');
        $role = Role::query()->where('name', 'qa-auditor')->firstOrFail();
        $roleId = $role->id;

        $this->patchJson("/api/v1/admin/roles/{$roleId}", [
            'permissions' => ['orders.view'],
        ])
            ->assertOk()
            ->assertJsonCount(1, 'data.permissions');

        $this->getJson('/api/v1/admin/settings')
            ->assertOk();

        $this->getJson('/api/v1/admin/settings/schema')
            ->assertOk()
            ->assertJsonPath('data.groups.branding.group', 'branding');

        $this->getJson('/api/v1/admin/settings/general')
            ->assertOk()
            ->assertJsonPath('data.group', 'general');

        $this->patchJson('/api/v1/admin/settings/general', [
            'values' => [
                'site_name' => 'Backend QA Restaurant',
            ],
        ])
            ->assertOk()
            ->assertJsonPath('data.site_name', 'Backend QA Restaurant');

        $this->getJson('/api/v1/admin/settings/export')
            ->assertOk()
            ->assertJsonPath('data.groups.general.site_name', 'Backend QA Restaurant');

        $review = Review::query()->latest()->firstOrFail();
        $this->getJson('/api/v1/admin/reviews')
            ->assertOk()
            ->assertJsonPath('meta.total', 1);

        $this->patchJson("/api/v1/admin/reviews/{$review->id}", [
            'is_visible' => false,
            'comment' => 'Moderated by admin',
        ])
            ->assertOk()
            ->assertJsonPath('data.comment', 'Moderated by admin');

        $this->assertDatabaseHas('reviews', [
            'id' => $review->id,
            'is_visible' => false,
            'comment' => 'Moderated by admin',
        ]);

        $this->deleteJson("/api/v1/admin/coupons/{$couponId}")->assertOk();
        $this->deleteJson("/api/v1/admin/gift-cards/{$giftCardId}")->assertOk();
        $this->deleteJson("/api/v1/admin/pages/{$pageId}")->assertOk();
        $this->deleteJson("/api/v1/admin/categories/{$categoryId}")->assertOk();
        $this->deleteJson("/api/v1/admin/branches/{$branchId}")->assertOk();
        $this->deleteJson("/api/v1/admin/roles/{$roleId}")->assertOk();
    }
}
