<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class CorsPreflightAliasTest extends TestCase
{
    public function test_v1_alias_supports_cors_preflight_for_frontend_origin(): void
    {
        config()->set('cors.allowed_origins', ['https://restaurant-demo.ahmedsalah.dev']);

        $response = $this->call('OPTIONS', '/v1/auth/login', [], [], [], [
            'HTTP_ORIGIN' => 'https://restaurant-demo.ahmedsalah.dev',
            'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'POST',
            'HTTP_ACCESS_CONTROL_REQUEST_HEADERS' => 'authorization,content-type',
        ]);

        $response
            ->assertNoContent()
            ->assertHeader('Access-Control-Allow-Origin', 'https://restaurant-demo.ahmedsalah.dev');
    }
}
