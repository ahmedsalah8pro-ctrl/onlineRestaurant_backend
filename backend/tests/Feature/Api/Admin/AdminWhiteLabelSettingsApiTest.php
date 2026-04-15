<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\User;
use App\Models\UserAddress;
use Carbon\Carbon;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminWhiteLabelSettingsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_manage_whitelabel_settings_schema_export_import_and_reset(): void
    {
        $this->seed(DatabaseSeeder::class);
        Sanctum::actingAs(User::query()->findOrFail(1));

        $this->getJson('/api/v1/admin/settings/schema')
            ->assertOk()
            ->assertJsonPath('data.version', 1)
            ->assertJsonPath('data.groups.branding.fields.logo_path.type', 'string')
            ->assertJsonPath('data.groups.ordering.fields.grace_period_minutes.value', 2);

        $this->getJson('/api/v1/admin/settings/branding')
            ->assertOk()
            ->assertJsonPath('data.group', 'branding')
            ->assertJsonPath('data.values.logo_path', 'branding/logo.png');

        $this->patchJson('/api/v1/admin/settings/branding', [
            'values' => [
                'logo_path' => 'branding/tenant-a/logo.png',
                'brand_palette' => [
                    'primary' => '#123456',
                ],
            ],
        ])
            ->assertOk()
            ->assertJsonPath('data.logo_path', 'branding/tenant-a/logo.png')
            ->assertJsonPath('data.brand_palette.primary', '#123456')
            ->assertJsonPath('data.brand_palette.secondary', '#111827');

        $this->getJson('/api/v1/admin/settings/export')
            ->assertOk()
            ->assertJsonPath('data.groups.branding.logo_path', 'branding/tenant-a/logo.png');

        $this->postJson('/api/v1/admin/settings/import', [
            'groups' => [
                'general' => [
                    'site_name' => 'Tenant A Restaurant',
                    'website_slug' => 'tenant-a',
                ],
                'seo' => [
                    'canonical_host' => 'https://tenant-a.example.com',
                ],
            ],
        ])
            ->assertOk()
            ->assertJsonPath('data.group_count', 2)
            ->assertJsonPath('data.imported_groups.general.site_name', 'Tenant A Restaurant');

        $this->postJson('/api/v1/admin/settings/branding/reset')
            ->assertOk()
            ->assertJsonPath('data.logo_path', 'branding/logo.png')
            ->assertJsonPath('data.brand_palette.primary', '#B22222');
    }

    public function test_public_settings_only_expose_safe_whitelabel_configuration(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->getJson('/api/v1/settings/public')
            ->assertOk()
            ->assertJsonPath('data.schema_version', 1)
            ->assertJsonPath('data.branding.logo_path', 'branding/logo.png')
            ->assertJsonPath('data.currency.code', 'EGP')
            ->assertJsonPath('data.auth.login_with_email', true)
            ->assertJsonMissingPath('data.notifications')
            ->assertJsonMissingPath('data.uploads.allowed_image_mimes');
    }

    public function test_admin_managed_upload_limits_and_order_grace_period_are_enforced(): void
    {
        $this->seed(DatabaseSeeder::class);
        Storage::fake('uploads');

        $admin = User::query()->findOrFail(1);
        Sanctum::actingAs($admin);

        $this->patchJson('/api/v1/admin/settings/uploads', [
            'values' => [
                'image_max_kb' => 64,
            ],
        ])->assertOk();

        $this->patchJson('/api/v1/admin/settings/ordering', [
            'values' => [
                'grace_period_minutes' => 7,
            ],
        ])->assertOk();

        $this->post('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->image('too-large.png')->size(70),
            'directory' => 'tenant-assets',
        ], [
            'Accept' => 'application/json',
        ])->assertStatus(422);

        $customer = User::query()->where('username', 'democustomer')->firstOrFail();
        $product = Product::query()->where('slug', 'hekaya-pizza')->firstOrFail();
        $branch = Branch::query()->whereHas('products', fn ($query) => $query->whereKey($product->id))->firstOrFail();
        $zone = DeliveryZone::query()->where('branch_id', $branch->id)->firstOrFail();
        $address = UserAddress::query()->where('user_id', $customer->id)->where('is_default', true)->firstOrFail();
        $size = ProductSize::query()->where('product_id', $product->id)->where('code', 'medium')->firstOrFail();

        Sanctum::actingAs($customer);

        $this->postJson('/api/v1/cart/items', [
            'product_id' => $product->id,
            'product_size_id' => $size->id,
            'quantity' => 1,
            'branch_id' => $branch->id,
        ])->assertCreated();

        $checkoutResponse = $this->postJson('/api/v1/orders/checkout', [
            'branch_id' => $branch->id,
            'delivery_zone_id' => $zone->id,
            'address_id' => $address->id,
            'notes' => 'settings-driven checkout',
            'payment_method' => 'cash_on_delivery',
        ]);

        $checkoutResponse->assertCreated();

        $gracePeriodValue = $checkoutResponse->json('data.grace_period_ends_at');
        $this->assertIsString($gracePeriodValue);

        $gracePeriodEndsAt = Carbon::parse($gracePeriodValue);
        $this->assertTrue($gracePeriodEndsAt->betweenIncluded(now()->addMinutes(6), now()->addMinutes(8)));
        $this->assertSame('EGP', $checkoutResponse->json('data.currency_code'));
    }
}
