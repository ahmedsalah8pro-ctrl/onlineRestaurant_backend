<?php

namespace App\Http\Controllers;

use App\Services\Marketing\MarketingService;
use App\Services\Marketing\ShareLinkService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ShareRedirectController extends Controller
{
    public function __construct(
        protected ShareLinkService $shareLinks,
        protected MarketingService $marketing,
    ) {
    }

    public function __invoke(Request $request, string $type, string $slug, string $code): Response
    {
        $link = $this->shareLinks->findActive($type, $code);
        $this->shareLinks->recordVisit($link, $request);

        $destinationUrl = $this->shareLinks->destinationUrl($link);
        $language = $request->getPreferredLanguage(['ar', 'en']) ?: $this->marketing->defaultLocale();
        $title = e($link->title);
        $description = e($link->description ?? '');
        $imageUrl = e($this->shareLinks->previewImageUrl($link) ?? '');
        $canonicalUrl = e($destinationUrl);
        $shareUrl = e($this->shareLinks->shareUrl($link));
        $siteName = e($this->marketing->siteName());
        $jsonDestination = json_encode($destinationUrl, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $openGraphType = match ($link->resource_type) {
            'product' => 'product',
            'page' => 'article',
            default => 'website',
        };
        $twitterHandle = $this->marketing->twitterHandle();
        $verificationGoogle = $this->marketing->googleSiteVerification();
        $verificationBing = $this->marketing->bingSiteVerification();
        $metaRobots = $this->marketing->robotsIndexingEnabled() ? 'index,follow,max-image-preview:large' : 'noindex,nofollow';
        $structuredData = $this->buildStructuredData($link, $destinationUrl);
        $structuredDataJson = json_encode($structuredData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

        $twitterSite = $twitterHandle !== null ? '<meta name="twitter:site" content="'.e($twitterHandle).'">' : '';
        $googleVerification = $verificationGoogle !== null ? '<meta name="google-site-verification" content="'.e($verificationGoogle).'">' : '';
        $bingVerification = $verificationBing !== null ? '<meta name="msvalidate.01" content="'.e($verificationBing).'">' : '';
        $productMeta = $link->resource_type === 'product'
            ? $this->buildProductMetaTags($link->payload ?? [])
            : '';

        $html = <<<HTML
<!doctype html>
<html lang="{$language}">
<head>
  <meta charset="utf-8">
  <title>{$title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{$description}">
  <meta name="robots" content="{$metaRobots}">
  <link rel="canonical" href="{$canonicalUrl}">
  <meta property="og:url" content="{$shareUrl}">
  <meta property="og:type" content="{$openGraphType}">
  <meta property="og:title" content="{$title}">
  <meta property="og:description" content="{$description}">
  <meta property="og:image" content="{$imageUrl}">
  <meta property="og:image:secure_url" content="{$imageUrl}">
  <meta property="og:site_name" content="{$siteName}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{$title}">
  <meta name="twitter:description" content="{$description}">
  <meta name="twitter:image" content="{$imageUrl}">
  {$twitterSite}
  {$googleVerification}
  {$bingVerification}
  {$productMeta}
  <script type="application/ld+json">{$structuredDataJson}</script>
  <meta http-equiv="refresh" content="0;url={$canonicalUrl}">
  <style>
    body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0f172a;color:#e2e8f0;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}
    .card{max-width:720px;width:100%;background:#111827;border:1px solid rgba(148,163,184,.15);border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(15,23,42,.45)}
    img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#020617}
    .content{padding:28px}
    h1{margin:0 0 12px;font-size:clamp(1.4rem,3vw,2rem)}
    p{margin:0 0 18px;line-height:1.7;color:#cbd5e1}
    a{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border-radius:999px;background:#22c55e;color:#04120a;font-weight:700;text-decoration:none}
  </style>
</head>
<body>
  <article class="card">
    <img src="{$imageUrl}" alt="{$title}">
    <div class="content">
      <h1>{$title}</h1>
      <p>{$description}</p>
      <a href="{$canonicalUrl}">Continue to {$siteName}</a>
    </div>
  </article>
  <script>window.location.replace({$jsonDestination});</script>
</body>
</html>
HTML;

        return response($html, 200, ['Content-Type' => 'text/html; charset=UTF-8']);
    }

    /**
     * @return array<string, mixed>
     */
    protected function buildStructuredData(\App\Models\ShareLink $link, string $destinationUrl): array
    {
        $base = [
            '@context' => 'https://schema.org',
            'url' => $destinationUrl,
            'name' => $link->title,
            'description' => $link->description,
            'image' => $link->image_url,
        ];

        if ($link->resource_type === 'product') {
            return array_filter([
                ...$base,
                '@type' => 'Product',
                'brand' => [
                    '@type' => 'Brand',
                    'name' => $this->marketing->siteName(),
                ],
                'offers' => isset($link->payload['price']) ? [
                    '@type' => 'Offer',
                    'priceCurrency' => $link->payload['currency_code'] ?? $this->marketing->currencyCode(),
                    'price' => $link->payload['price'],
                    'availability' => 'https://schema.org/InStock',
                    'url' => $destinationUrl,
                ] : null,
            ], static fn (mixed $value): bool => $value !== null && $value !== '');
        }

        if ($link->resource_type === 'page') {
            return [
                ...$base,
                '@type' => 'Article',
            ];
        }

        return [
            ...$base,
            '@type' => 'WebPage',
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    protected function buildProductMetaTags(array $payload): string
    {
        $tags = [
            'product:brand' => $payload['brand'] ?? $this->marketing->siteName(),
            'product:availability' => $payload['availability'] ?? 'in stock',
            'product:condition' => $payload['condition'] ?? 'new',
            'product:price:amount' => $payload['price'] ?? null,
            'product:price:currency' => $payload['currency_code'] ?? $this->marketing->currencyCode(),
            'product:retailer_item_id' => $payload['product_slug'] ?? null,
            'product:item_group_id' => $payload['product_slug'] ?? null,
        ];

        return collect($tags)
            ->filter(static fn (mixed $value): bool => $value !== null && $value !== '')
            ->map(fn (mixed $value, string $property): string => '<meta property="'.e($property).'" content="'.e((string) $value).'">')
            ->implode("\n  ");
    }
}
