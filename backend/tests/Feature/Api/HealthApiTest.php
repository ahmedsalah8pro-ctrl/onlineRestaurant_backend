<?php

namespace Tests\Feature\Api;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HealthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_health_endpoint_returns_operational_metadata_and_headers(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->withHeaders([
            'Accept-Language' => 'en',
            'X-Request-Id' => 'health-check-001',
        ])->getJson('/api/v1/health');

        $response
            ->assertOk()
            ->assertHeader('X-Request-Id', 'health-check-001')
            ->assertHeader('X-API-Version', 'v1')
            ->assertHeader('Content-Language', 'en')
            ->assertJsonPath('data.status', 'ok')
            ->assertJsonPath('data.app.api_version', 'v1')
            ->assertJsonPath('data.app.locale', 'en')
            ->assertJsonPath('data.checks.database.status', 'ok')
            ->assertJsonPath('data.checks.storage.status', 'ok');

        $this->assertNotNull($response->headers->get('X-Response-Time-Ms'));
    }
}
