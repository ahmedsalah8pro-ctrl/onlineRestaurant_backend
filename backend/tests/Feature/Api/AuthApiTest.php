<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_load_current_profile(): void
    {
        $registerResponse = $this->postJson('/api/v1/auth/register', [
            'name' => 'New User',
            'username' => 'newuser',
            'email' => 'new.user@example.com',
            'primary_phone' => '01011111111',
            'password' => 'Password1!',
            'password_confirmation' => 'Password1!',
            'device_name' => 'phpunit',
        ]);

        $registerResponse
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.username', 'newuser');

        $token = $registerResponse->json('data.token');

        $this->getJson('/api/v1/auth/me', [
            'Authorization' => 'Bearer '.$token,
        ])
            ->assertOk()
            ->assertJsonPath('data.username', 'newuser');
    }

    public function test_registration_normalizes_identity_and_logout_all_revokes_existing_tokens(): void
    {
        $registerResponse = $this->postJson('/api/v1/auth/register', [
            'name' => 'Case User',
            'username' => 'Case.User',
            'email' => 'Case.User@Example.COM',
            'primary_phone' => '01011111112',
            'password' => 'Password1!',
            'password_confirmation' => 'Password1!',
            'device_name' => 'register-device',
        ]);

        $registerResponse
            ->assertCreated()
            ->assertJsonPath('data.user.username', 'case.user')
            ->assertJsonPath('data.user.email', 'case.user@example.com');

        $user = User::query()->where('username', 'case.user')->firstOrFail();
        $this->assertSame('case.user@example.com', $user->email);

        $usernameLogin = $this->postJson('/api/v1/auth/login', [
            'email_or_username' => 'CASE.USER',
            'password' => 'Password1!',
            'device_name' => 'upper-username',
        ]);
        $usernameLogin->assertOk();

        $emailLogin = $this->postJson('/api/v1/auth/login', [
            'email_or_username' => 'CASE.USER@EXAMPLE.COM',
            'password' => 'Password1!',
            'device_name' => 'upper-email',
        ]);
        $emailLogin->assertOk();
        /** @var string $emailToken */
        $emailToken = $emailLogin->json('data.token');

        $this->postJson('/api/v1/auth/logout-all', [], [
            'Authorization' => 'Bearer '.$emailToken,
        ])->assertOk();

        $freshUser = $user->fresh();
        $this->assertInstanceOf(User::class, $freshUser);
        $this->assertSame(0, $freshUser->tokens()->count());
    }

    public function test_registration_rejects_passwords_that_contain_personal_identity_fragments(): void
    {
        $this->postJson('/api/v1/auth/register', [
            'name' => 'Ahmed Salah',
            'username' => 'ahmed.salah',
            'email' => 'ahmed.salah@example.com',
            'primary_phone' => '01011111113',
            'password' => 'Ahmed.Salah1!',
            'password_confirmation' => 'Ahmed.Salah1!',
            'device_name' => 'phpunit',
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_login_route_is_rate_limited_after_repeated_invalid_attempts(): void
    {
        User::factory()->create([
            'username' => 'ratelimited',
            'email' => 'ratelimited@example.com',
            'primary_phone' => '01011111114',
            'password' => Hash::make('Password1!'),
        ]);

        for ($attempt = 1; $attempt <= 15; $attempt++) {
            $this->postJson('/api/v1/auth/login', [
                'email_or_username' => 'ratelimited',
                'password' => 'WrongPassword1!',
                'device_name' => 'phpunit-rate-limit',
            ])->assertStatus(422);
        }

        $this->postJson('/api/v1/auth/login', [
            'email_or_username' => 'ratelimited',
            'password' => 'WrongPassword1!',
            'device_name' => 'phpunit-rate-limit',
        ])->assertStatus(429);
    }
}
