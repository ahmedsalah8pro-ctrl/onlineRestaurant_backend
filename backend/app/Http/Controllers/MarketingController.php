<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\Marketing\MarketingService;
use App\Support\Translatable;
use Illuminate\Http\Response;

class MarketingController extends Controller
{
    public function __construct(protected MarketingService $marketing)
    {
    }

    public function robots(): Response
    {
        $lines = [
            'User-agent: *',
            $this->marketing->robotsIndexingEnabled() ? 'Allow: /' : 'Disallow: /',
            'Disallow: /admin',
            'Disallow: /auth',
            'Disallow: /account',
            'Disallow: /wallet',
            'Disallow: /orders',
            'Disallow: /checkout',
            'Disallow: /cart',
            'Sitemap: '.$this->marketing->backendBaseUrl().'/sitemap.xml',
        ];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    public function sitemap(): Response
    {
        $entries = $this->marketing->sitemapEntries();

        $xml = view('xml.sitemap', ['entries' => $entries])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    public function googleMerchantFeed(): Response
    {
        abort_unless($this->marketing->merchantFeedsEnabled(), 404);

        $products = $this->marketing->activeProductsForMarketing();
        $xml = view('xml.google-merchant-feed', [
            'products' => $products,
            'marketing' => $this->marketing,
        ])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    public function metaCatalogFeed(): Response
    {
        abort_unless($this->marketing->merchantFeedsEnabled(), 404);

        $products = $this->marketing->activeProductsForMarketing();
        $handle = fopen('php://temp', 'r+');

        fputcsv($handle, [
            'id',
            'title',
            'description',
            'availability',
            'condition',
            'price',
            'link',
            'image_link',
            'brand',
            'google_product_category',
            'product_type',
        ]);

        /** @var Product $product */
        foreach ($products as $product) {
            $category = $product->categories->first();

            fputcsv($handle, [
                $product->id,
                Translatable::get($product->name),
                $this->marketing->secureDescription(
                    Translatable::get($product->short_description) ?: Translatable::get($product->description)
                ),
                'in stock',
                $this->marketing->merchantCondition(),
                number_format((float) ($product->base_price ?? 0), 2, '.', '').' '.$this->marketing->currencyCode(),
                $this->marketing->productUrl($product),
                $this->marketing->assetUrl($product->main_image_path) ?? $this->marketing->defaultOgImageUrl(),
                $this->marketing->merchantBrandName(),
                'Food, Beverages & Tobacco > Food Items',
                $category !== null ? Translatable::get($category->name) : 'Restaurant Menu',
            ]);
        }

        rewind($handle);
        $csv = stream_get_contents($handle) ?: '';
        fclose($handle);

        return response($csv, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'inline; filename="meta-catalog-feed.csv"',
        ]);
    }
}
