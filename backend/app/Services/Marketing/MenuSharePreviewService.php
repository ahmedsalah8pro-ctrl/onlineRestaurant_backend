<?php

namespace App\Services\Marketing;

use App\Models\Product;
use App\Models\ShareLink;
use ArPHP\I18N\Arabic;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MenuSharePreviewService
{
    protected const RENDER_VERSION = 'v2';

    public function __construct(protected MarketingService $marketing)
    {
    }

    public function previewUrl(ShareLink $link): string
    {
        $slug = $link->slug_hint !== null && $link->slug_hint !== '' ? $link->slug_hint : 'menu';

        return sprintf(
            '%s/share/%s/%s/%s/preview.jpg',
            $this->marketing->backendBaseUrl(),
            rawurlencode($link->resource_type),
            rawurlencode($slug),
            rawurlencode($link->code),
        );
    }

    public function ensureGenerated(ShareLink $link): string
    {
        $path = storage_path('app/share-previews/'.$this->cacheKey($link).'.jpg');

        // SMART CACHE: Check if file exists AND is less than 24h old
        if (is_file($path) && filesize($path) > 0) {
            $lastModified = filemtime($path);
            if ((time() - $lastModified) < 86400) { // 24 hours
                return $path;
            }
        }

        // Keep exactly one preview per menu cache key.
        $this->pruneMenuPreviews($link);

        File::ensureDirectoryExists(dirname($path));
        file_put_contents($path, $this->render($link));

        return $path;
    }

    protected function pruneOldPreviews(): void
    {
        $dir = storage_path('app/share-previews');
        if (!is_dir($dir)) return;
        
        $files = File::files($dir);
        $now = time();
        foreach ($files as $file) {
            if (($now - filemtime($file->getRealPath())) > (86400 * 30)) { // 30 days
                File::delete($file->getRealPath());
            }
        }
    }

    protected function pruneMenuPreviews(ShareLink $link): void
    {
        $dir = storage_path('app/share-previews');
        if (!is_dir($dir)) {
            return;
        }

        $targetName = $this->cacheKey($link).'.jpg';
        $groupToken = $this->cacheGroupToken($link);
        foreach (File::files($dir) as $file) {
            $name = $file->getFilename();
            $matchesCurrentGroup = preg_match(
                '/^menu_(?:v[^_]+_)?'.preg_quote($groupToken, '/').'\d+\.jpg$/',
                $name
            ) === 1;
            $isLegacyCodePreview = preg_match('/^[a-z0-9]{8}\.jpg$/', $name) === 1;

            if (($matchesCurrentGroup && $name !== $targetName) || $isLegacyCodePreview) {
                File::delete($file->getRealPath());
            }
        }
    }

    protected function cacheGroupToken(ShareLink $link): string
    {
        $locale = (string) ($link->payload['locale'] ?? 'ar');
        $filters = is_array($link->payload['filters'] ?? null) ? $link->payload['filters'] : [];
        $stable = [
            'branch_id' => $filters['branch_id'] ?? null,
            'category_id' => $filters['category_id'] ?? null,
            'sort' => $filters['sort'] ?? null,
            'search' => $filters['search'] ?? null,
        ];

        return $locale.'_'.substr(sha1(json_encode($stable, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)), 0, 10).'_';
    }

    protected function cacheKeyPrefix(ShareLink $link): string
    {
        // Share all menu links within 24h for same locale+filters.
        return 'menu_'.self::RENDER_VERSION.'_'.$this->cacheGroupToken($link);
    }

    protected function cacheKey(ShareLink $link): string
    {
        // Use a single rolling key per day to enforce "regen at most once per 24h".
        $day = (int) floor(time() / 86400);
        return $this->cacheKeyPrefix($link).$day;
    }

    public function render(ShareLink $link): string
    {
        $width = 1200;
        $height = 630;
        $canvas = imagecreatetruecolor($width, $height);
        $locale = $link->payload['locale'] ?? 'ar';
        $isRtl = $locale === 'ar';

        // 1. Background (Cinematic Blur)
        $cover = $this->fetchImage($this->marketing->coverImageUrl());
        if ($cover) {
            $this->copyCropped($canvas, $cover, 0, 0, $width, $height);
            imagedestroy($cover);
            $this->applyBlur($canvas, 30); // Deeper blur for premium feel
        } else {
             $this->drawGradient($canvas, $width, $height, '#1e293b', '#0f172a');
        }

        // Dark Matte Overlay for luxury feel
        $overlayColor = imagecolorallocatealpha($canvas, 15, 23, 42, 35); // Deep navy overlay
        imagefilledrectangle($canvas, 0, 0, $width, $height, $overlayColor);

        // Core Colors (Slate & White + Brand Accent)
        $white = imagecolorallocate($canvas, 248, 250, 252);
        $muted = imagecolorallocate($canvas, 148, 163, 184);
        $brandColor = $this->marketing->brandPalette()['primary'];
        [$bR, $bG, $bB] = $this->hexToRgb($brandColor);
        $accent = imagecolorallocate($canvas, $bR, $bG, $bB);
        
        // Premium Card Config
        $cardBg = imagecolorallocatealpha($canvas, 255, 255, 255, 115); // Glassy white
        $cardBorder = imagecolorallocatealpha($canvas, 255, 255, 255, 105);
        $textShadow = imagecolorallocatealpha($canvas, 0, 0, 0, 80);

        // 2. Header
        $title = $this->marketing->translated($link->title, $locale) ?: $this->marketing->siteName();
        $this->drawText($canvas, 50, 80, 42, $white, $title, true, $locale);
        
        $subtitle = $this->marketing->translated($link->description, $locale) ?: 'Modern Restaurant Solutions';
        $subtitle = $isRtl ? $subtitle : Str::upper($subtitle);
        $this->drawText($canvas, 50, 120, 16, $muted, $subtitle, false, $locale);

        // 3. Product Grid (2x5)
        $products = $this->selectProducts($link);
        $columns = 5;
        $rows = 2;
        $paddingX = 50;
        $gridTop = 160;
        $gap = 25;
        $tileWidth = (int) floor(($width - ($paddingX * 2) - ($gap * ($columns - 1))) / $columns);
        $tileHeight = 195;

        foreach ($products as $index => $product) {
            $col = $index % $columns;
            $row = (int) floor($index / $columns);
            $x = $paddingX + ($col * ($tileWidth + $gap));
            $y = $gridTop + ($row * ($tileHeight + $gap));

            // Product Card Shadow/Glow
            $glow = imagecolorallocatealpha($canvas, $bR, $bG, $bB, 115);
            imagefilledrectangle($canvas, $x - 2, $y - 2, $x + $tileWidth + 2, $y + $tileHeight + 2, $glow);

            // Product Card Body
            imagefilledrectangle($canvas, $x, $y, $x + $tileWidth, $y + $tileHeight, $cardBg);
            imagerectangle($canvas, $x, $y, $x + $tileWidth, $y + $tileHeight, $cardBorder);

            // Product Image (Square crop)
            $imgUrl = $this->marketing->assetUrl($product->main_image_path);
            $img = $this->fetchImage($imgUrl);
            if ($img) {
                // Main Image
                $this->copyCropped($canvas, $img, $x + 8, $y + 8, $tileWidth - 16, $tileHeight - 75);
                imagedestroy($img);
            }

            // Info Bar Design
            $infoY = $y + $tileHeight - 65;
            $name = $this->marketing->translated($product->name, $locale);
            $price = $product->base_price ? number_format($product->base_price, 0) . ' ' . $this->marketing->currencyCode() : '';
            
            // Name Background Strip
            $nameBg = imagecolorallocatealpha($canvas, 15, 23, 42, 40);
            imagefilledrectangle($canvas, $x + 8, $infoY + 10, $x + $tileWidth - 8, $infoY + 60, $nameBg);
            
            $this->drawText($canvas, $x + 12, $infoY + 32, 11, $white, $name, true, $locale, $tileWidth - 24);
            $this->drawText($canvas, $x + 12, $infoY + 52, 13, $accent, $price, true, $locale);
        }

        // 4. Footer
        $footerTop = 560;
        $this->drawText($canvas, 50, $footerTop + 35, 24, $white, $this->marketing->siteName(), true, $locale);
        
        $contacts = array_values(array_filter([
            $this->marketing->supportPhone(),
            $this->marketing->supportEmail(),
            str_replace(['https://', 'http://'], '', $this->marketing->frontendBaseUrl()),
        ]));
        $this->drawText($canvas, 50, $footerTop + 65, 12, $muted, implode('   |   ', $contacts), false, $locale);

        // Branding Badge (ORDER NOW) - Professional Gold or Accent
        $badgeColor = imagecolorallocate($canvas, 31, 41, 55); // Dark grey/navy
        $badgeText = imagecolorallocate($canvas, 255, 255, 255);
        imagefilledrectangle($canvas, $width - 200, $footerTop + 20, $width - 50, $footerTop + 70, $accent);
        $this->drawText($canvas, $width - 170, $footerTop + 52, 15, $white, $isRtl ? 'اطلب الآن' : 'ORDER NOW', true, $locale);

        // 5. Watermark (Subtle Center Logo)
        $this->drawWatermark($canvas, $width, $height, $link);

        ob_start();
        imagejpeg($canvas, null, 92); // High quality
        $binary = (string) ob_get_clean();
        imagedestroy($canvas);

        return $binary;
    }

    protected function drawWatermark($canvas, int $width, int $height, ShareLink $link): void
    {
        $logo = $this->fetchImage($this->marketing->logoUrl());
        $opacity = 50;

        if ($logo !== null) {
            $targetWidth = 240;
            $targetHeight = (int) round((imagesy($logo) / max(imagesx($logo), 1)) * $targetWidth);
            $resized = imagecreatetruecolor($targetWidth, max(40, $targetHeight));
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
            imagefill($resized, 0, 0, imagecolorallocatealpha($resized, 0, 0, 0, 127));
            imagecopyresampled($resized, $logo, 0, 0, 0, 0, $targetWidth, max(40, $targetHeight), imagesx($logo), imagesy($logo));
            
            $this->copyImageWithOpacity(
                $canvas,
                $resized,
                (int) (($width - $targetWidth) / 2),
                (int) (($height - $targetHeight) / 2),
                $opacity
            );
            imagedestroy($resized);
            imagedestroy($logo);
        } else {
            $locale = (string) ($link->payload['locale'] ?? 'en');
            $watermarkColor = imagecolorallocatealpha($canvas, 255, 255, 255, 90);
            $siteName = $locale === 'ar'
                ? $this->marketing->translated($this->marketing->siteName(), 'ar')
                : strtoupper($this->marketing->siteName());
            $this->drawText($canvas, (int) ($width / 2) - 150, (int) ($height / 2), 40, $watermarkColor, $siteName, true, $locale);
        }
    }

    protected function selectProducts(ShareLink $link): Collection
    {
        $filters = is_array($link->payload['filters'] ?? null) ? $link->payload['filters'] : [];
        $query = Product::query()->active()->whereNotNull('main_image_path');

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

        return $query->inRandomOrder()->take(10)->get();
    }

    protected function fetchImage(?string $url)
    {
        if (! $url) return null;

        // Smart Check: If URL is on our own server, try local path first for speed & reliability
        $backendUrl = $this->marketing->backendBaseUrl();
        if (str_starts_with($url, $backendUrl)) {
            $storagePart = Str::after($url, $backendUrl.'/storage/');
            $cdnPart = Str::after($url, $backendUrl.'/cdn/');

            if ($cdnPart !== $url) {
                // Files are actually in storage/app/uploads for this project
                $localPath = storage_path('app/uploads/'.$cdnPart);
                if (is_file($localPath)) {
                    return @imagecreatefromjpeg($localPath) ?: @imagecreatefrompng($localPath) ?: @imagecreatefromwebp($localPath) ?: @imagecreatefromstring(file_get_contents($localPath));
                }
            }

            if ($storagePart !== $url) {
                $localPath = storage_path('app/public/'.$storagePart);
                if (is_file($localPath)) {
                    return @imagecreatefromjpeg($localPath) ?: @imagecreatefrompng($localPath) ?: @imagecreatefromwebp($localPath) ?: @imagecreatefromstring(file_get_contents($localPath));
                }
            }
        }

        try {
            $response = Http::timeout(5)->withOptions(['verify' => false])->get($url);
            return $response->successful() ? @imagecreatefromstring($response->body()) : null;
        } catch (\Throwable) { return null; }
    }

    protected function copyCropped($destination, $source, int $x, int $y, int $width, int $height): void
    {
        $sw = imagesx($source);
        $sh = imagesy($source);
        $ratio = $width / $height;
        $sRatio = $sw / $sh;

        if ($sRatio > $ratio) {
            $cw = (int) ($sh * $ratio);
            $cx = (int) (($sw - $cw) / 2);
            imagecopyresampled($destination, $source, $x, $y, $cx, 0, $width, $height, $cw, $sh);
        } else {
            $ch = (int) ($sw / $ratio);
            $cy = (int) (($sh - $ch) / 2);
            imagecopyresampled($destination, $source, $x, $y, 0, $cy, $width, $height, $sw, $ch);
        }
    }

    protected function drawText($canvas, int $x, int $y, int $size, int $color, string $text, bool $bold = false, string $locale = 'ar', int $maxWidth = 0): void
    {
        $text = trim($text);
        if ($text === '') {
            return;
        }

        if ($maxWidth > 0) {
            $text = $this->truncateText($text, $size, $maxWidth, $bold, $locale);
        }

        $text = $this->prepareDisplayText($text, $locale);
        $font = $this->fontPath($bold);
        if ($font && function_exists('imagettftext')) {
            imagettftext($canvas, $size, 0, $x, $y, $color, $font, $text);
            return;
        }

        imagestring($canvas, $bold ? 5 : 4, $x, $y - 15, $text, $color);
    }

    protected function prepareDisplayText(string $text, string $locale): string
    {
        if ($this->containsArabic($text) || $locale === 'ar') {
            try {
                return $this->arabic()->utf8Glyphs($text, 120, false, true);
            } catch (\Throwable) {
                return $text;
            }
        }

        return $text;
    }

    protected function truncateText(string $text, int $size, int $maxWidth, bool $bold, string $locale): string
    {
        $font = $this->fontPath($bold);
        if (! $font) {
            return mb_strimwidth($text, 0, 20, '...');
        }

        $displayText = $this->prepareDisplayText($text, $locale);
        $box = imagettfbbox($size, 0, $font, $displayText);
        $width = abs($box[2] - $box[0]);

        if ($width <= $maxWidth) {
            return $text;
        }

        $ellipsis = $this->containsArabic($text) ? '…' : '...';
        while (mb_strlen($text) > 3) {
            $text = mb_substr($text, 0, -1);
            $candidate = $this->prepareDisplayText($text.$ellipsis, $locale);
            $box = imagettfbbox($size, 0, $font, $candidate);
            if (abs($box[2] - $box[0]) <= $maxWidth) {
                break;
            }
        }

        return $text.$ellipsis;
    }

    protected function containsArabic(string $text): bool
    {
        return preg_match('/[\x{0600}-\x{06FF}\x{0750}-\x{077F}\x{08A0}-\x{08FF}]/u', $text) === 1;
    }

    protected function arabic(): Arabic
    {
        static $arabic = null;

        if (! $arabic instanceof Arabic) {
            $arabic = new Arabic();
        }

        return $arabic;
    }

    protected function copyImageWithOpacity($destination, $source, int $x, int $y, int $opacity): void
    {
        $width = imagesx($source);
        $height = imagesy($source);
        $opacity = max(0, min(100, $opacity));

        $buffer = imagecreatetruecolor($width, $height);
        imagealphablending($buffer, false);
        imagesavealpha($buffer, true);
        imagefill($buffer, 0, 0, imagecolorallocatealpha($buffer, 0, 0, 0, 127));

        imagecopy($buffer, $source, 0, 0, 0, 0, $width, $height);

        for ($px = 0; $px < $width; $px++) {
            for ($py = 0; $py < $height; $py++) {
                $rgba = imagecolorat($buffer, $px, $py);
                $alpha = ($rgba & 0x7F000000) >> 24;
                $red = ($rgba >> 16) & 0xFF;
                $green = ($rgba >> 8) & 0xFF;
                $blue = $rgba & 0xFF;
                $adjustedAlpha = 127 - (int) round((127 - $alpha) * ($opacity / 100));
                $color = imagecolorallocatealpha($buffer, $red, $green, $blue, $adjustedAlpha);
                imagesetpixel($buffer, $px, $py, $color);
            }
        }

        imagealphablending($destination, true);
        imagecopy($destination, $buffer, $x, $y, 0, 0, $width, $height);
        imagedestroy($buffer);
    }

    protected function applyBlur($canvas, int $radius): void
    {
        for ($i = 0; $i < $radius; $i++) {
            imagefilter($canvas, IMG_FILTER_GAUSSIAN_BLUR);
        }
    }

    protected function drawGradient($canvas, int $w, int $h, string $start, string $end): void
    {
        [$r1, $g1, $b1] = $this->hexToRgb($start);
        [$r2, $g2, $b2] = $this->hexToRgb($end);
        for ($y = 0; $y < $h; $y++) {
            $p = $y / $h;
            $c = imagecolorallocate($canvas, (int)($r1 + ($r2 - $r1) * $p), (int)($g1 + ($g2 - $g1) * $p), (int)($b1 + ($b2 - $b1) * $p));
            imageline($canvas, 0, $y, $w, $y, $c);
        }
    }

    protected function hexToRgb(string $hex): array
    {
        $h = ltrim($hex, '#');
        if (strlen($h) === 3) $h = $h[0].$h[0].$h[1].$h[1].$h[2].$h[2];
        return [hexdec(substr($h, 0, 2)), hexdec(substr($h, 2, 2)), hexdec(substr($h, 4, 2))];
    }

    protected function fontPath(bool $bold = false): ?string
    {
        $candidates = $bold ? [
            'C:\\Windows\\Fonts\\arialbd.ttf',
            '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        ] : [
            'C:\\Windows\\Fonts\\arial.ttf',
            '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        ];

        foreach ($candidates as $c) if (is_file($c)) return $c;
        return null;
    }
}
