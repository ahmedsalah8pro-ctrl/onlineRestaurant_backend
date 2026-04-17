<?php

namespace App\Services\Marketing;

use App\Models\Branch;
use App\Models\Category;
use App\Models\DynamicPage;
use App\Models\Product;
use App\Services\Settings\SettingService;
use App\Support\Translatable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MarketingService
{
    public function __construct(protected SettingService $settings)
    {
    }

    public function frontendBaseUrl(): string
    {
        $configured = (string) $this->settings->getValue('seo', 'canonical_host', config('app.frontend_url'));
        $backendUrl = $this->backendBaseUrl();

        if ($configured !== '') {
            if (app()->environment('local') && rtrim($configured, '/') === $backendUrl) {
                return 'http://127.0.0.1:4200';
            }

            return rtrim($configured, '/');
        }

        if (app()->environment('local')) {
            return 'http://127.0.0.1:4200';
        }

        return rtrim((string) config('app.frontend_url', config('app.url', 'http://localhost')), '/');
    }

    public function backendBaseUrl(): string
    {
        return rtrim((string) config('app.url', 'http://localhost'), '/');
    }

    public function siteName(): string
    {
        $configured = (string) $this->settings->getValue('general', 'site_name', config('app.name', 'Restaurant'));

        return $configured !== '' ? $configured : 'Restaurant';
    }

    public function supportPhone(): ?string
    {
        $value = $this->settings->getValue('general', 'support_phone');

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function supportEmail(): ?string
    {
        $value = $this->settings->getValue('general', 'support_email');

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function logoUrl(): ?string
    {
        $path = $this->settings->getValue('branding', 'square_logo_path')
            ?? $this->settings->getValue('branding', 'logo_path');

        return $this->assetUrl(is_string($path) ? $path : null);
    }

    /**
     * @return array{primary:string,secondary:string,accent:string,surface:string}
     */
    public function brandPalette(): array
    {
        $palette = $this->settings->getValue('branding', 'brand_palette', []);

        return [
            'primary' => is_array($palette) && is_string($palette['primary'] ?? null) ? $palette['primary'] : '#B22222',
            'secondary' => is_array($palette) && is_string($palette['secondary'] ?? null) ? $palette['secondary'] : '#111827',
            'accent' => is_array($palette) && is_string($palette['accent'] ?? null) ? $palette['accent'] : '#F59E0B',
            'surface' => is_array($palette) && is_string($palette['surface'] ?? null) ? $palette['surface'] : '#FFF7ED',
        ];
    }

    public function defaultMetaTitle(?string $locale = null): string
    {
        $configured = $this->translated($this->settings->getValue('seo', 'default_meta_title'), $locale);

        return $configured !== '' ? $configured : $this->siteName();
    }

    public function defaultMetaDescription(?string $locale = null): string
    {
        $configured = $this->translated($this->settings->getValue('seo', 'default_meta_description'), $locale);

        return $configured !== '' ? $configured : __('Discover restaurant favorites, new menu highlights, and delivery-ready meals.');
    }

    public function defaultLocale(): string
    {
        $locale = (string) $this->settings->getValue('localization', 'default_locale', config('app.locale', 'ar'));

        return in_array($locale, ['ar', 'en'], true) ? $locale : 'ar';
    }

    public function twitterHandle(): ?string
    {
        $value = $this->settings->getValue('seo', 'twitter_handle');

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function googleSiteVerification(): ?string
    {
        $value = $this->settings->getValue('seo', 'google_site_verification');

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function bingSiteVerification(): ?string
    {
        $value = $this->settings->getValue('seo', 'bing_site_verification');

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function marketingEnabled(): bool
    {
        return (bool) $this->settings->getValue('seo', 'marketing_ready_mode', true);
    }

    public function shareLinksEnabled(): bool
    {
        return (bool) $this->settings->getValue('seo', 'share_links_enabled', true);
    }

    public function merchantFeedsEnabled(): bool
    {
        return (bool) $this->settings->getValue('seo', 'merchant_feeds_enabled', true);
    }

    public function robotsIndexingEnabled(): bool
    {
        return (bool) $this->settings->getValue('seo', 'robots_indexing_enabled', false);
    }

    public function defaultOgImageUrl(): ?string
    {
        $image = $this->settings->getValue('seo', 'default_og_image_path')
            ?? $this->settings->getValue('branding', 'cover_image_path')
            ?? $this->settings->getValue('branding', 'square_logo_path')
            ?? $this->settings->getValue('branding', 'logo_path');

        return $this->assetUrl(is_string($image) ? $image : null);
    }

    public function assetUrl(?string $path): ?string
    {
        if ($path === null || $path === '' || $path === 'null') {
            return null;
        }

        if (preg_match('/^https?:\/\//i', $path) === 1) {
            return $path;
        }

        $base = (string) $this->settings->getValue(
            'uploads',
            'public_base_url',
            config('filesystems.disks.uploads.url', $this->backendBaseUrl().'/storage')
        );

        $base = $base !== '' ? rtrim($base, '/') : $this->backendBaseUrl().'/storage';
        $cleanPath = ltrim((string) preg_replace('/^storage\//i', '', $path), '/');

        return $base.'/'.$cleanPath;
    }

    /**
     * @param  array<string, mixed>  $query
     */
    public function menuUrl(array $query = []): string
    {
        $url = $this->frontendBaseUrl().'/menu';
        $filtered = array_filter($query, static fn (mixed $value): bool => $value !== null && $value !== '');

        if ($filtered === []) {
            return $url;
        }

        return $url.'?'.http_build_query($filtered);
    }

    public function productUrl(Product $product): string
    {
        return $this->frontendBaseUrl().'/products/'.$product->id.'/'.$product->slug;
    }

    public function pageUrl(DynamicPage $page): string
    {
        return $this->frontendBaseUrl().'/pages/'.$page->slug;
    }

    public function homeUrl(): string
    {
        return $this->frontendBaseUrl();
    }

    public function merchantBrandName(): string
    {
        $configured = $this->settings->getValue('seo', 'merchant_feed_brand_name');

        return is_string($configured) && $configured !== '' ? $configured : $this->siteName();
    }

    public function currencyCode(): string
    {
        return strtoupper($this->settings->currencyCode());
    }

    public function merchantCondition(): string
    {
        $configured = (string) $this->settings->getValue('seo', 'merchant_feed_condition', 'new');

        return in_array($configured, ['new', 'used', 'refurbished'], true) ? $configured : 'new';
    }

    public function defaultMenuShareTitle(array $filters = []): string
    {
        $parts = [__('Menu')];

        if (! empty($filters['branch_id'])) {
            $branch = Branch::query()->find((int) $filters['branch_id']);
            if ($branch !== null) {
                $parts[] = $this->translated($branch->name);
            }
        }

        if (! empty($filters['category_id'])) {
            $category = Category::query()->find((int) $filters['category_id']);
            if ($category !== null) {
                $parts[] = $this->translated($category->name);
            }
        }

        return implode(' | ', [...$parts, $this->siteName()]);
    }

    public function defaultMenuShareDescription(array $filters = []): string
    {
        $search = isset($filters['search']) && is_string($filters['search']) ? trim($filters['search']) : '';

        if ($search !== '') {
            return __('Browse the filtered restaurant menu for ":search" and order directly online.', ['search' => $search]);
        }

        return __('Browse the latest menu, featured meals, and restaurant offers ready for delivery.');
    }

    public function menuImage(array $filters = []): ?string
    {
        $query = Product::query()->active();

        if (! empty($filters['branch_id'])) {
            $branchId = (int) $filters['branch_id'];
            $query->where(function ($branchQuery) use ($branchId): void {
                $branchQuery->where('is_available_in_all_branches', true)
                    ->orWhereHas('branches', fn ($related) => $related->where('branches.id', $branchId));
            });
        }

        if (! empty($filters['category_id'])) {
            $query->whereHas('categories', fn ($related) => $related->where('categories.id', (int) $filters['category_id']));
        }

        $product = $query->orderBy('best_seller_rank')->orderByDesc('purchases_count')->first();

        return $product !== null ? $this->assetUrl($product->main_image_path) : $this->defaultOgImageUrl();
    }

    /**
     * @return Collection<int, Product>
     */
    public function activeProductsForMarketing(): Collection
    {
        return Product::query()
            ->active()
            ->with(['categories', 'tags'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function sitemapEntries(): Collection
    {
        $entries = collect([
            [
                'loc' => $this->homeUrl(),
                'lastmod' => now()->toDateString(),
                'changefreq' => 'daily',
                'priority' => '1.0',
            ],
            [
                'loc' => $this->menuUrl(),
                'lastmod' => now()->toDateString(),
                'changefreq' => 'daily',
                'priority' => '0.9',
            ],
        ]);

        $productEntries = Product::query()
            ->active()
            ->latest('updated_at')
            ->get()
            ->map(fn (Product $product): array => [
                'loc' => $this->productUrl($product),
                'lastmod' => optional($product->updated_at)->toDateString() ?? now()->toDateString(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ]);

        $pageEntries = DynamicPage::query()
            ->active()
            ->latest('updated_at')
            ->get()
            ->map(fn (DynamicPage $page): array => [
                'loc' => $this->pageUrl($page),
                'lastmod' => optional($page->updated_at)->toDateString() ?? now()->toDateString(),
                'changefreq' => 'weekly',
                'priority' => '0.7',
            ]);

        return $entries->concat($productEntries)->concat($pageEntries);
    }

    public function translated(array|string|null $value, ?string $locale = null): string
    {
        $resolved = Translatable::get($value, $locale ?? app()->getLocale(), $this->defaultLocale());

        return is_string($resolved) ? trim($resolved) : '';
    }

    /**
     * @param  array<string, mixed>  $query
     * @return array<string, string>
     */
    public function normalizedQuery(array $query): array
    {
        return collect($query)
            ->filter(static fn (mixed $value): bool => $value !== null && $value !== '')
            ->map(static fn (mixed $value): string => is_scalar($value)
                ? (string) $value
                : (json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '')
            )
            ->sortKeys()
            ->all();
    }

    public function secureDescription(?string $description, int $limit = 260): string
    {
        $plain = trim(strip_tags((string) $description));

        if ($plain === '') {
            return __('Discover restaurant favorites, new menu highlights, and delivery-ready meals.');
        }

        return Str::limit(preg_replace('/\s+/', ' ', $plain) ?: $plain, $limit, '...');
    }
}
