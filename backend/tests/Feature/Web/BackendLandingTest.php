<?php

namespace Tests\Feature\Web;

use Tests\TestCase;

class BackendLandingTest extends TestCase
{
    public function test_root_returns_backend_landing_payload(): void
    {
        $this->getJson('/')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.backend_only', true)
            ->assertJsonPath('data.frontend', false)
            ->assertJsonPath('data.api_version', 'v1');
    }

    public function test_root_honors_forwarded_proto_and_host_when_trusted_proxy_headers_are_present(): void
    {
        $this->withHeaders([
            'X-Forwarded-Proto' => 'https',
            'X-Forwarded-Host' => 'restaurant-demo.ahmedsalah.dev',
        ])->getJson('/')
            ->assertOk()
            ->assertJsonPath('data.scheme', 'https')
            ->assertJsonPath('data.host', 'restaurant-demo.ahmedsalah.dev')
            ->assertJsonPath('data.links.base_url', 'https://restaurant-demo.ahmedsalah.dev')
            ->assertJsonPath('data.links.health', 'https://restaurant-demo.ahmedsalah.dev/api/v1/health');
    }
}
