<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\ShareLink;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShareLinksApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_generate_and_open_a_product_share_link(): void
    {
        $this->seed(DatabaseSeeder::class);

        $product = Product::query()->where('slug', 'hekaya-pizza')->firstOrFail();

        $response = $this->withServerVariables([
            'REMOTE_ADDR' => '127.10.10.10',
            'HTTP_USER_AGENT' => 'Codex Test Browser',
        ])->postJson('/api/v1/share-links', [
            'type' => 'product',
            'resource_id' => $product->id,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.type', 'product')
            ->assertJsonPath('data.slug_hint', $product->slug)
            ->assertJsonPath('data.destination_url', config('app.frontend_url').'/products/'.$product->id.'/'.$product->slug);

        $link = ShareLink::query()->latest('id')->firstOrFail();
        $this->assertNotNull($link->creator_ip_hash);

        $path = parse_url((string) $response->json('data.share_url'), PHP_URL_PATH);
        $this->assertIsString($path);

        $this->get($path)
            ->assertOk()
            ->assertSee('og:title', false)
            ->assertSee('/products/'.$product->id.'/'.$product->slug, false);

        $this->assertSame(1, $link->fresh()->visits_count);
    }

    public function test_menu_share_links_preserve_selected_filters(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->postJson('/api/v1/share-links', [
            'type' => 'menu',
            'query' => [
                'branch_id' => 1,
                'category_id' => 1,
                'search' => 'pizza',
            ],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.type', 'menu')
            ->assertJsonPath('data.slug_hint', 'menu-b1-c1-pizza')
            ->assertJsonPath('data.destination_url', config('app.frontend_url').'/menu?branch_id=1&category_id=1&search=pizza');
    }
}
