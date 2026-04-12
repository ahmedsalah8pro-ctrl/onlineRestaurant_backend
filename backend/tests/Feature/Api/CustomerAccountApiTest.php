<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\UserAddress;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CustomerAccountApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_protected_customer_endpoints_require_authentication(): void
    {
        $protectedEndpoints = [
            ['GET', '/api/v1/profile'],
            ['GET', '/api/v1/addresses'],
            ['GET', '/api/v1/cart'],
            ['GET', '/api/v1/orders'],
            ['GET', '/api/v1/notifications'],
            ['GET', '/api/v1/wallet'],
        ];

        foreach ($protectedEndpoints as [$method, $uri]) {
            $response = $this->json($method, $uri);

            $response->assertUnauthorized();
        }
    }

    public function test_customer_can_manage_addresses_and_profile_privacy_with_sanitization(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        Sanctum::actingAs($user);

        $addressResponse = $this->postJson('/api/v1/addresses', [
            'label' => '<b>home</b>',
            'recipient_name' => '<script>alert(1)</script>Ahmed',
            'phone' => '01020030040',
            'city' => 'Cairo',
            'area' => 'Nasr City',
            'street' => '<i>Main</i> Street',
            'landmark' => '<img src=x onerror=alert(1)>Near gate',
            'notes' => '<script>steal()</script>call before arrival',
            'is_default' => true,
        ]);

        $addressResponse
            ->assertCreated()
            ->assertJsonPath('data.label', 'home')
            ->assertJsonPath('data.recipient_name', 'alert(1)Ahmed')
            ->assertJsonPath('data.street', 'Main Street')
            ->assertJsonPath('data.landmark', 'Near gate')
            ->assertJsonPath('data.notes', 'steal()call before arrival')
            ->assertJsonPath('data.is_default', true);

        $createdAddressId = UserAddress::query()->where('user_id', $user->id)->where('phone', '01020030040')->firstOrFail()->id;

        $this->patchJson("/api/v1/addresses/{$createdAddressId}", [
            'city' => 'Giza',
            'area' => 'Dokki',
            'street' => '<u>Updated</u> Street',
            'recipient_name' => 'Ahmed Salah',
        ])
            ->assertOk()
            ->assertJsonPath('data.city', 'Giza')
            ->assertJsonPath('data.street', 'Updated Street');

        $secondAddress = $this->postJson('/api/v1/addresses', [
            'label' => 'office',
            'recipient_name' => 'Ahmed Salah',
            'phone' => '01020030041',
            'city' => 'Cairo',
            'area' => 'Heliopolis',
            'street' => 'Office street',
            'is_default' => false,
        ])
            ->assertCreated();

        $secondAddressId = UserAddress::query()->where('user_id', $user->id)->where('phone', '01020030041')->firstOrFail()->id;

        $this->patchJson("/api/v1/addresses/{$secondAddressId}/default")
            ->assertOk()
            ->assertJsonPath('data.is_default', true);

        $this->patchJson('/api/v1/profile', [
            'name' => 'Demo Customer Updated',
            'bio' => '<script>xss()</script>backend lover',
            'is_public_profile' => true,
            'show_total_orders' => true,
            'show_total_spent' => true,
            'show_monthly_rank' => true,
            'show_yearly_rank' => true,
            'show_favorite_products' => true,
        ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Demo Customer Updated')
            ->assertJsonPath('data.profile.is_public_profile', true);

        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'bio' => 'xss()backend lover',
            'is_public_profile' => true,
        ]);

        $this->getJson('/api/v1/profiles/democustomer')
            ->assertOk()
            ->assertJsonPath('data.username', 'democustomer')
            ->assertJsonPath('data.stats.total_orders', 1)
            ->assertJsonPath('data.stats.total_spent', 195);

        $this->deleteJson("/api/v1/addresses/{$secondAddressId}")
            ->assertOk();

        $this->assertDatabaseMissing('user_addresses', [
            'id' => $secondAddressId,
        ]);
    }

    public function test_customer_cannot_modify_another_users_address(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('username', 'democustomer')->firstOrFail();
        $otherUser = User::factory()->create();
        $otherAddress = UserAddress::factory()->create([
            'user_id' => $otherUser->id,
        ]);

        Sanctum::actingAs($user);

        $this->patchJson("/api/v1/addresses/{$otherAddress->id}", [
            'city' => 'Unauthorized City',
        ])->assertForbidden();

        $this->deleteJson("/api/v1/addresses/{$otherAddress->id}")
            ->assertForbidden();
    }
}
