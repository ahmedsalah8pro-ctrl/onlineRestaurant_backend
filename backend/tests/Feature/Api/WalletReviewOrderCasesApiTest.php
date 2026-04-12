<?php

namespace Tests\Feature\Api;

use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Review;
use App\Models\UserAddress;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class WalletReviewOrderCasesApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_redeem_gift_cards_and_fetch_wallet_transactions(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        Sanctum::actingAs($user);

        $this->postJson('/api/v1/wallet/redeem', [
            'code' => 'GIFT100',
        ])
            ->assertOk()
            ->assertJsonPath('data.balance', 350);

        $this->postJson('/api/v1/wallet/redeem', [
            'code' => 'GIFT100',
        ])
            ->assertStatus(422)
            ->assertJsonPath('success', false);

        $this->getJson('/api/v1/wallet/transactions')
            ->assertOk()
            ->assertJsonFragment([
                'type' => 'gift_card_redeem',
            ]);
    }

    public function test_review_rules_and_order_grace_period_actions_are_enforced(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $purchasedProduct = Product::query()->where('slug', 'hekaya-pizza')->firstOrFail();
        $unpurchasedProduct = Product::factory()->create([
            'slug' => 'unbought-item',
        ]);

        Sanctum::actingAs($user);

        $this->postJson('/api/v1/reviews', [
            'product_id' => $unpurchasedProduct->id,
            'rating' => 5,
            'comment' => 'should fail',
        ])
            ->assertStatus(422)
            ->assertJsonPath('success', false);

        $reviewResponse = $this->postJson('/api/v1/reviews', [
            'product_id' => $purchasedProduct->id,
            'rating' => 5,
            'comment' => '<script>alert(1)</script>excellent',
            'is_anonymous' => true,
        ]);

        $reviewResponse
            ->assertCreated()
            ->assertJsonPath('data.comment', 'alert(1)excellent')
            ->assertJsonPath('data.is_anonymous', true);

        $reviewId = Review::query()
            ->where('user_id', $user->id)
            ->where('product_id', $purchasedProduct->id)
            ->latest('id')
            ->firstOrFail()
            ->id;

        $this->assertDatabaseHas('reviews', [
            'id' => $reviewId,
            'comment' => 'alert(1)excellent',
            'is_anonymous' => true,
        ]);

        $this->getJson("/api/v1/products/{$purchasedProduct->id}/reviews")
            ->assertOk()
            ->assertJsonPath('meta.total', 2);

        $orderId = $this->createPendingOrderFor($user, $purchasedProduct);

        $this->patchJson("/api/v1/orders/{$orderId}/notes", [
            'notes' => '<script>hack()</script>leave it at the door',
        ])
            ->assertOk()
            ->assertJsonPath('data.notes', 'hack()leave it at the door');

        $this->postJson("/api/v1/orders/{$orderId}/cancel")
            ->assertOk()
            ->assertJsonPath('data.status', 'cancelled');

        $this->patchJson("/api/v1/orders/{$orderId}/notes", [
            'notes' => 'too late',
        ])
            ->assertStatus(422);
    }

    protected function createPendingOrderFor(User $user, Product $product): int
    {
        $branch = Branch::query()
            ->whereHas('products', fn ($query) => $query->whereKey($product->id))
            ->firstOrFail();
        $zone = DeliveryZone::query()->where('branch_id', $branch->id)->firstOrFail();
        $address = UserAddress::query()->where('user_id', $user->id)->where('is_default', true)->firstOrFail();
        $size = ProductSize::query()->where('product_id', $product->id)->where('code', 'medium')->firstOrFail();

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
            'notes' => 'initial note',
            'payment_method' => 'cash_on_delivery',
        ]);

        $checkoutResponse
            ->assertCreated()
            ->assertJsonPath('data.status', 'pending');

        return Order::query()->where('user_id', $user->id)->latest('id')->firstOrFail()->id;
    }
}
