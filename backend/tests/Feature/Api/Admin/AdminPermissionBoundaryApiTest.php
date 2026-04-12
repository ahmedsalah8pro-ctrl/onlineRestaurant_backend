<?php

namespace Tests\Feature\Api\Admin;

use App\Enums\OrderStatus;
use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\Order;
use App\Models\UserAddress;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminPermissionBoundaryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_branch_manager_is_limited_to_assigned_branch_orders_and_cannot_access_global_admin_controls(): void
    {
        $this->seed(DatabaseSeeder::class);

        $branchManager = User::query()->where('username', 'branchmanager')->firstOrFail();
        $customer = User::query()->where('username', 'democustomer')->firstOrFail();
        $secondaryBranch = Branch::query()->where('slug', 'giza-branch')->firstOrFail();
        $secondaryZone = DeliveryZone::query()->where('branch_id', $secondaryBranch->id)->firstOrFail();
        $address = UserAddress::query()->where('user_id', $customer->id)->where('is_default', true)->firstOrFail();

        $otherBranchOrder = Order::query()->create([
            'user_id' => $customer->id,
            'branch_id' => $secondaryBranch->id,
            'delivery_zone_id' => $secondaryZone->id,
            'address_id' => $address->id,
            'status' => OrderStatus::Pending->value,
            'currency_code' => 'EGP',
            'subtotal' => 120,
            'addons_total' => 0,
            'delivery_fee' => 30,
            'discount_total' => 0,
            'wallet_amount' => 0,
            'total' => 150,
            'coupon_code' => null,
            'coupon_snapshot' => null,
            'notes' => 'Second branch order',
            'grace_period_ends_at' => now()->addMinutes(2),
            'placed_at' => now(),
        ]);

        Sanctum::actingAs($branchManager);

        $this->getJson('/api/v1/admin/orders')
            ->assertOk()
            ->assertJsonPath('meta.total', 1)
            ->assertJsonMissing(['id' => $otherBranchOrder->id]);

        $this->getJson('/api/v1/admin/orders/1')
            ->assertOk();

        $this->getJson("/api/v1/admin/orders/{$otherBranchOrder->id}")
            ->assertForbidden();

        $this->patchJson('/api/v1/admin/settings/features', [
            'values' => [
                'gift_cards_enabled' => false,
            ],
        ])
            ->assertForbidden();

        $this->getJson('/api/v1/admin/audit-logs')
            ->assertForbidden();
    }
}
