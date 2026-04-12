<?php

namespace Tests\Feature\Api;

use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\User;
use App\Models\UserAddress;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CheckoutApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_add_to_cart_preview_coupon_and_checkout(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $product = Product::query()->where('slug', 'hekaya-pizza')->with('addonGroups.options')->firstOrFail();
        $branch = Branch::query()->whereHas('products', fn ($query) => $query->whereKey($product->id))->firstOrFail();
        $zone = DeliveryZone::query()->where('branch_id', $branch->id)->firstOrFail();
        $address = UserAddress::query()->where('user_id', $user->id)->where('is_default', true)->firstOrFail();
        $size = ProductSize::query()->where('product_id', $product->id)->where('code', 'medium')->firstOrFail();
        Sanctum::actingAs($user);

        $this->postJson('/api/v1/cart/items', [
            'product_id' => $product->id,
            'product_size_id' => $size->id,
            'quantity' => 2,
            'branch_id' => $branch->id,
        ])
            ->assertCreated()
            ->assertJsonPath('data.items.0.quantity', 2);

        $this->postJson('/api/v1/cart/preview-coupon', [
            'coupon_code' => 'SAVE10',
            'delivery_fee' => 25,
        ])
            ->assertOk()
            ->assertJsonPath('data.valid', true)
            ->assertJsonPath('data.discount_total', 34);

        $this->postJson('/api/v1/orders/checkout', [
            'branch_id' => $branch->id,
            'delivery_zone_id' => $zone->id,
            'address_id' => $address->id,
            'notes' => '<script>alert(1)</script> deliver fast please',
            'coupon_code' => 'SAVE10',
            'wallet_amount' => 50,
            'payment_method' => 'wallet_plus_cash_on_delivery',
        ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->assertJsonPath('data.branch.slug', 'cairo-branch');

        $this->assertDatabaseCount('orders', 2);
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $this->getJson('/api/v1/cart')
            ->assertOk()
            ->assertJsonPath('data.subtotal', 0);
    }

    public function test_customer_can_update_remove_and_clear_cart_and_cannot_view_another_users_order(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $otherUser = User::factory()->create();
        $product = Product::query()->where('slug', 'hekaya-pizza')->firstOrFail();
        $branch = Branch::query()->whereHas('products', fn ($query) => $query->whereKey($product->id))->firstOrFail();
        $size = ProductSize::query()->where('product_id', $product->id)->where('code', 'small')->firstOrFail();

        Sanctum::actingAs($user);

        $storeResponse = $this->postJson('/api/v1/cart/items', [
            'product_id' => $product->id,
            'product_size_id' => $size->id,
            'quantity' => 1,
            'branch_id' => $branch->id,
        ])->assertCreated();

        /** @var int $itemId */
        $itemId = $storeResponse->json('data.items.0.id');

        $this->getJson('/api/v1/cart')
            ->assertOk()
            ->assertJsonPath('data.items.0.quantity', 1);

        $this->patchJson("/api/v1/cart/items/{$itemId}", [
            'quantity' => 3,
        ])
            ->assertOk()
            ->assertJsonPath('data.items.0.quantity', 3);

        $this->deleteJson("/api/v1/cart/items/{$itemId}")
            ->assertOk();

        $this->getJson('/api/v1/cart')
            ->assertOk()
            ->assertJsonPath('data.items', []);

        $this->postJson('/api/v1/cart/items', [
            'product_id' => $product->id,
            'product_size_id' => $size->id,
            'quantity' => 2,
            'branch_id' => $branch->id,
        ])->assertCreated();

        $this->deleteJson('/api/v1/cart')
            ->assertOk();

        $this->getJson('/api/v1/cart')
            ->assertOk()
            ->assertJsonPath('data.items', []);

        Sanctum::actingAs($otherUser);

        $this->getJson('/api/v1/orders/1')
            ->assertForbidden();
    }
}
