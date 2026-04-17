<?php

namespace Tests\Feature\Api;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarketingFeedsAndSitemapTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_marketing_endpoints_expose_robots_sitemap_and_feeds(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('User-agent: *', false)
            ->assertSee('Sitemap: ', false)
            ->assertSee('Disallow: /admin', false);

        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertSee('<?xml version="1.0" encoding="UTF-8"?>', false)
            ->assertSee('/menu', false)
            ->assertSee('/products/', false);

        $this->get('/feeds/products/google.xml')
            ->assertOk()
            ->assertSee('<rss version="2.0"', false)
            ->assertSee('<g:id>', false)
            ->assertSee('/products/', false);

        $this->get('/feeds/products/meta.csv')
            ->assertOk()
            ->assertSee('id,title,description,availability,condition,price,link,image_link,brand,google_product_category,product_type', false)
            ->assertSee('/products/', false);
    }
}
