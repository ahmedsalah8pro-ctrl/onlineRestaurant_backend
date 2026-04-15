<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class PublicApiAliasTest extends TestCase
{
    public function test_v1_alias_returns_same_health_payload_as_api_prefix(): void
    {
        $response = $this->getJson('/v1/health', [
            'Accept-Language' => 'en',
            'X-Request-Id' => 'alias-health-001',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', 'ok')
            ->assertJsonPath('data.app.api_version', 'v1')
            ->assertHeader('X-Request-Id', 'alias-health-001')
            ->assertHeader('X-API-Version', 'v1')
            ->assertHeader('Content-Language', 'en');
    }
}
