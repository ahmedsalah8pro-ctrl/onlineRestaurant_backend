<?php

namespace Tests\Feature\Api;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicCatalogApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_catalog_endpoints_return_seeded_backend_data(): void
    {
        $this->seed(DatabaseSeeder::class);

        $settingsResponse = $this->withHeaders([
            'Accept-Language' => 'ar',
            'X-Request-Id' => 'catalog-public-settings',
        ])->getJson('/api/v1/settings/public');

        $settingsResponse
            ->assertOk()
            ->assertHeader('X-Request-Id', 'catalog-public-settings')
            ->assertHeader('X-API-Version', 'v1')
            ->assertHeader('Content-Language', 'ar')
            ->assertJsonPath('data.currency.code', 'EGP')
            ->assertJsonPath('data.branding.logo_path', 'branding/logo.png')
            ->assertJsonMissingPath('data.notifications');

        $this->assertNotNull($settingsResponse->headers->get('X-Response-Time-Ms'));

        $this->getJson('/api/v1/branches')
            ->assertOk()
            ->assertJsonFragment(['slug' => 'cairo-branch']);

        $this->getJson('/api/v1/products?search=hekaya', ['Accept-Language' => 'en'])
            ->assertOk()
            ->assertJsonFragment(['slug' => 'hekaya-pizza'])
            ->assertJsonFragment(['name' => 'Hekaya Pizza']);

        $this->getJson('/api/v1/pages/terms-of-service')
            ->assertOk()
            ->assertJsonPath('data.slug', 'terms-of-service');
    }
}
