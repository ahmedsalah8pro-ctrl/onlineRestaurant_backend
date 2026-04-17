<?php

namespace App\Services\Marketing;

use App\Models\DynamicPage;
use App\Models\Product;
use App\Models\ShareLink;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ShareLinkService
{
    public function __construct(
        protected MarketingService $marketing,
        protected MenuSharePreviewService $menuPreview,
    )
    {
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function create(array $payload, ?User $user, Request $request): ShareLink
    {
        if (! $this->marketing->shareLinksEnabled()) {
            throw new UnprocessableEntityHttpException('Share links are disabled.');
        }

        $type = strtolower((string) ($payload['type'] ?? ''));

        $locale = $payload['locale'] ?? app()->getLocale();

        $snapshot = match ($type) {
            'product' => $this->buildProductSnapshot((int) ($payload['resource_id'] ?? 0), $locale),
            'menu' => $this->buildMenuSnapshot(Arr::wrap($payload['query'] ?? []), $locale),
            'page' => $this->buildPageSnapshot((string) ($payload['slug'] ?? ''), $locale),
            'home' => $this->buildHomeSnapshot($locale),
            default => throw new UnprocessableEntityHttpException('Unsupported share link type.'),
        };

        $snapshot['payload']['locale'] = $locale;

        return ShareLink::query()->create([
            'resource_type' => $type,
            'resource_id' => $snapshot['resource_id'],
            'code' => $this->generateUniqueCode(),
            'slug_hint' => $snapshot['slug_hint'],
            'destination_path' => $snapshot['destination_path'],
            'destination_query' => $snapshot['destination_query'],
            'title' => $snapshot['title'],
            'description' => $snapshot['description'],
            'image_url' => $snapshot['image_url'],
            'payload' => $snapshot['payload'],
            'created_by_user_id' => $user?->id,
            'creator_ip_hash' => $this->hashIp($request->ip()),
            'creator_user_agent' => Str::limit((string) $request->userAgent(), 1024, ''),
        ]);
    }

    public function findActive(string $type, string $code): ShareLink
    {
        $link = ShareLink::query()
            ->where('resource_type', strtolower($type))
            ->where('code', strtolower($code))
            ->first();

        if ($link === null || ($link->expires_at !== null && $link->expires_at->isPast())) {
            throw new NotFoundHttpException('Share link not found.');
        }

        return $link;
    }

    public function destinationUrl(ShareLink $link): string
    {
        $path = '/'.ltrim($link->destination_path, '/');
        $base = rtrim($this->marketing->frontendBaseUrl(), '/');
        $query = is_array($link->destination_query) ? $link->destination_query : [];
        $filtered = $this->marketing->normalizedQuery($query);

        if ($filtered === []) {
            return $base.$path;
        }

        return $base.$path.'?'.http_build_query($filtered);
    }

    public function shareUrl(ShareLink $link): string
    {
        $slug = $link->slug_hint !== null && $link->slug_hint !== '' ? $link->slug_hint : 'link';

        return sprintf(
            '%s/share/%s/%s/%s',
            $this->marketing->backendBaseUrl(),
            rawurlencode($link->resource_type),
            rawurlencode($slug),
            rawurlencode($link->code),
        );
    }

    public function previewImageUrl(ShareLink $link): ?string
    {
        if ($link->resource_type === 'menu') {
            return $this->menuPreview->previewUrl($link);
        }

        return $link->image_url ?: $this->marketing->defaultOgImageUrl();
    }

    public function recordVisit(ShareLink $link, Request $request): void
    {
        $link->forceFill([
            'visits_count' => $link->visits_count + 1,
            'last_visited_at' => now(),
            'last_visitor_ip_hash' => $this->hashIp($request->ip()),
        ])->save();
    }

    protected function generateUniqueCode(): string
    {
        do {
            $code = strtolower(Str::random(8));
        } while (ShareLink::query()->where('code', $code)->exists());

        return $code;
    }

    protected function hashIp(?string $ip): ?string
    {
        if ($ip === null || $ip === '') {
            return null;
        }

        return hash('sha256', $ip.'|'.((string) config('app.key')));
    }

    /**
     * @return array<string, mixed>
     */
    protected function buildProductSnapshot(int $productId, string $locale): array
    {
        $product = Product::query()->active()->find($productId);

        if ($product === null) {
            throw new NotFoundHttpException('Product not found for sharing.');
        }

        $title = implode(' | ', array_filter([
            $this->marketing->translated($product->name, $locale),
            $this->marketing->siteName(),
        ]));

        $description = $this->marketing->secureDescription(
            $this->marketing->translated($product->short_description, $locale) ?: $this->marketing->translated($product->description, $locale)
        );

        return [
            'resource_id' => $product->id,
            'slug_hint' => $product->slug,
            'destination_path' => '/products/'.$product->id.'/'.$product->slug,
            'destination_query' => [],
            'title' => $title,
            'description' => $description,
            'image_url' => $this->marketing->assetUrl($product->main_image_path) ?? $this->marketing->defaultOgImageUrl(),
            'payload' => [
                'product_slug' => $product->slug,
                'product_name' => $this->marketing->translated($product->name),
                'price' => (float) ($product->base_price ?? 0),
                'currency_code' => $this->marketing->currencyCode(),
                'brand' => $this->marketing->merchantBrandName(),
                'availability' => 'in stock',
                'condition' => $this->marketing->merchantCondition(),
            ],
        ];
    }

    /**
     * @param  array<int|string, mixed>  $rawQuery
     * @return array<string, mixed>
     */
    protected function buildMenuSnapshot(array $rawQuery, string $locale): array
    {
        $query = $this->marketing->normalizedQuery($rawQuery);
        $branch = isset($query['branch_id']) ? (int) $query['branch_id'] : null;
        $category = isset($query['category_id']) ? (int) $query['category_id'] : null;
        $search = $query['search'] ?? null;
        $parts = ['menu'];

        if ($branch !== null) {
            $parts[] = 'b'.$branch;
        }

        if ($category !== null) {
            $parts[] = 'c'.$category;
        }

        if (is_string($search) && $search !== '') {
            $parts[] = Str::slug(Str::limit($search, 24, ''), '-');
        }

        return [
            'resource_id' => null,
            'slug_hint' => implode('-', array_filter($parts)),
            'destination_path' => '/menu',
            'destination_query' => $query,
            'title' => $this->marketing->defaultMenuShareTitle($query),
            'description' => $this->marketing->defaultMenuShareDescription($query),
            'image_url' => $this->marketing->menuImage($query),
            'payload' => [
                'filters' => $query,
                'locale' => $locale,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function buildPageSnapshot(string $slug, string $locale): array
    {
        $page = DynamicPage::query()->active()->where('slug', $slug)->first();

        if ($page === null) {
            throw new NotFoundHttpException('Page not found for sharing.');
        }

        $title = implode(' | ', array_filter([
            $this->marketing->translated($page->title, $locale),
            $this->marketing->siteName(),
        ]));

        return [
            'resource_id' => $page->id,
            'slug_hint' => $page->slug,
            'destination_path' => '/pages/'.$page->slug,
            'destination_query' => [],
            'title' => $title,
            'description' => $this->marketing->secureDescription($this->marketing->translated($page->content, $locale)),
            'image_url' => $this->marketing->defaultOgImageUrl(),
            'payload' => [
                'page_slug' => $page->slug,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function buildHomeSnapshot(string $locale): array
    {
        return [
            'resource_id' => null,
            'slug_hint' => 'home',
            'destination_path' => '/',
            'destination_query' => [],
            'title' => $this->marketing->defaultMetaTitle($locale),
            'description' => $this->marketing->defaultMetaDescription($locale),
            'image_url' => $this->marketing->defaultOgImageUrl(),
            'payload' => [
                'type' => 'home',
                'locale' => $locale,
            ],
        ];
    }
}
