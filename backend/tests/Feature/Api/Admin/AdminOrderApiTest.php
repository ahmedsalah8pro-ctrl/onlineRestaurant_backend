<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Order;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminOrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_list_and_update_orders(): void
    {
        $this->seed(DatabaseSeeder::class);

        $admin = User::query()->findOrFail(1);
        $order = Order::query()->latest()->firstOrFail();

        Sanctum::actingAs($admin);

        $this->getJson('/api/v1/admin/orders')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('meta.total', 1);

        $this->patchJson("/api/v1/admin/orders/{$order->id}/delivery", [
            'delivery_person_name' => 'Mahmoud Courier',
            'delivery_person_phone' => '01012345678',
        ])
            ->assertOk()
            ->assertJsonPath('data.delivery_person_name', 'Mahmoud Courier');

        $this->patchJson("/api/v1/admin/orders/{$order->id}/status", [
            'status' => 'refunded',
            'notes' => 'Refund approved from admin test.',
        ])
            ->assertOk()
            ->assertJsonPath('data.status', 'refunded');
    }
}
