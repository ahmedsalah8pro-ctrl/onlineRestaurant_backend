<?php

namespace Tests\Feature\Api;

use App\Models\Branch;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\DatabaseNotification;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_list_and_mark_notifications_as_read(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $product = Product::query()->where('slug', 'hekaya-pizza')->with(['sizes', 'branches'])->firstOrFail();
        /** @var Branch $branch */
        $branch = $product->branches()->firstOrFail();
        $zone = $branch->deliveryZones()->firstOrFail();
        $address = $user->addresses()->where('is_default', true)->firstOrFail();
        $size = $product->sizes()->where('code', 'medium')->firstOrFail();

        Sanctum::actingAs($user);

        $this->postJson('/api/v1/cart/items', [
            'product_id' => $product->id,
            'product_size_id' => $size->id,
            'quantity' => 1,
            'branch_id' => $branch->id,
        ])->assertCreated();

        $this->postJson('/api/v1/orders/checkout', [
            'branch_id' => $branch->id,
            'delivery_zone_id' => $zone->id,
            'address_id' => $address->id,
            'notes' => 'ring the bell',
            'payment_method' => 'cash_on_delivery',
        ])->assertCreated();

        /** @var User $user */
        $user = $user->fresh();
        /** @var DatabaseNotification $notification */
        $notification = $user->notifications()->latest()->firstOrFail();
        $notificationId = (string) $notification->getKey();

        $this->assertNotNull($notificationId);

        $this->getJson('/api/v1/notifications')
            ->assertOk()
            ->assertJsonPath('meta.unread_count', 1)
            ->assertJsonPath('data.0.event', 'order.created.customer');

        $this->getJson('/api/v1/notifications/unread-count')
            ->assertOk()
            ->assertJsonPath('data.unread_count', 1);

        $this->patchJson("/api/v1/notifications/{$notificationId}/read")
            ->assertOk()
            ->assertJsonPath('data.event', 'order.created.customer');

        $this->getJson('/api/v1/notifications/unread-count')
            ->assertOk()
            ->assertJsonPath('data.unread_count', 0);
    }
}
