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

        $this->getJson('/api/v1/settings/public')
            ->assertOk()
            ->assertJsonPath('data.general.site_name', 'مطعم أونلاين')
            ->assertJsonPath('data.currency.code', 'EGP');

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
