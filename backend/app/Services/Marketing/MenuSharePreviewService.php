<?php

namespace App\Services\Marketing;

use App\Models\Product;
use App\Models\ShareLink;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class MenuSharePreviewService
{
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
        $path = storage_path('app/share-previews/'.$link->code.'.jpg');

        if (is_file($path) && filesize($path) > 0) {
            return $path;
        }

        File::ensureDirectoryExists(dirname($path));
        file_put_contents($path, $this->render($link));

        return $path;
    }

    public function render(ShareLink $link): string
    {
        $width = 1200;
        $height = 630;
        $canvas = imagecreatetruecolor($width, $height);

        $palette = $this->marketing->brandPalette();
        [$backgroundStartR, $backgroundStartG, $backgroundStartB] = $this->hexToRgb($palette['secondary']);
        [$backgroundEndR, $backgroundEndG, $backgroundEndB] = $this->hexToRgb('#0b1220');

        for ($y = 0; $y < $height; $y++) {
            $progress = $height > 1 ? $y / ($height - 1) : 0;
            $color = imagecolorallocate(
                $canvas,
                (int) round($backgroundStartR + (($backgroundEndR - $backgroundStartR) * $progress)),
                (int) round($backgroundStartG + (($backgroundEndG - $backgroundStartG) * $progress)),
                (int) round($backgroundStartB + (($backgroundEndB - $backgroundStartB) * $progress)),
            );
            imageline($canvas, 0, $y, $width, $y, $color);
        }

        $white = imagecolorallocate($canvas, 248, 250, 252);
        $muted = imagecolorallocate($canvas, 148, 163, 184);
        $chipBackground = imagecolorallocatealpha($canvas, 17, 24, 39, 30);
        $panelBorder = imagecolorallocatealpha($canvas, 255, 255, 255, 100);
        [$accentR, $accentG, $accentB] = $this->hexToRgb($palette['accent']);
        [$primaryR, $primaryG, $primaryB] = $this->hexToRgb($palette['primary']);
        $accent = imagecolorallocate($canvas, $accentR, $accentG, $accentB);
        $primary = imagecolorallocate($canvas, $primaryR, $primaryG, $primaryB);

        imagefilledrectangle($canvas, 32, 26, 1168, 96, $chipBackground);
        imagerectangle($canvas, 32, 26, 1168, 96, $panelBorder);

        $title = $link->title !== '' ? $link->title : $this->marketing->siteName();
        $subtitle = $link->description !== '' ? $link->description : 'Menu ready for social sharing';
        $this->drawText($canvas, 36, 70, 28, $white, $title, true);
        $this->drawText($canvas, 36, 92, 12, $muted, $subtitle);

        $products = $this->selectProducts($link);
        $tiles = max(1, min(10, $products->count() ?: 1));
        $columns = 5;
        $rows = 2;
        $paddingX = 32;
        $gridTop = 118;
        $gridBottom = 520;
        $gap = 14;
        $tileWidth = (int) floor(($width - ($paddingX * 2) - ($gap * ($columns - 1))) / $columns);
        $tileHeight = (int) floor((($gridBottom - $gridTop) - $gap) / $rows);

        for ($index = 0; $index < min($tiles, 10); $index++) {
            $column = $index % $columns;
            $row = (int) floor($index / $columns);
            $x = $paddingX + ($column * ($tileWidth + $gap));
            $y = $gridTop + ($row * ($tileHeight + $gap));

            imagefilledrectangle($canvas, $x, $y, $x + $tileWidth, $y + $tileHeight, $chipBackground);
            imagerectangle($canvas, $x, $y, $x + $tileWidth, $y + $tileHeight, $panelBorder);

            $product = $products->get($index);
            $sourceUrl = $product !== null ? $this->marketing->assetUrl($product->main_image_path) : null;
            $image = $this->fetchImage($sourceUrl);

            if ($image !== null) {
                $this->copyCropped($canvas, $image, $x, $y, $tileWidth, $tileHeight);
                imagedestroy($image);
            } else {
                imagefilledrectangle($canvas, $x + 1, $y + 1, $x + $tileWidth - 1, $y + $tileHeight - 1, $primary);
            }
        }

        $this->drawWatermark($canvas, $width, $height, $link);

        $footerTop = 536;
        imagefilledrectangle($canvas, 0, $footerTop, $width, $height, $chipBackground);
        imageline($canvas, 0, $footerTop, $width, $footerTop, $panelBorder);

        $this->drawText($canvas, 36, 580, 20, $white, $this->marketing->siteName(), true);

        $contacts = array_values(array_filter([
            $this->marketing->supportPhone(),
            $this->marketing->supportEmail(),
        ]));
        $contactLine = implode('   •   ', $contacts);

        if ($contactLine !== '') {
            $this->drawText($canvas, 36, 608, 12, $muted, $contactLine);
        }

        $badge = 'MENU';
        $badgeWidth = 120;
        imagefilledrectangle($canvas, 1040, 558, 1040 + $badgeWidth, 604, $accent);
        $this->drawText($canvas, 1072, 588, 14, $backgroundEnd = imagecolorallocate($canvas, 11, 18, 32), $badge, true);

        ob_start();
        imagejpeg($canvas, null, 90);
        $binary = (string) ob_get_clean();
        imagedestroy($canvas);

        return $binary;
    }

    protected function drawWatermark($canvas, int $width, int $height, ShareLink $link): void
    {
        $logo = $this->fetchImage($this->marketing->logoUrl());

        if ($logo !== null) {
            $targetWidth = 280;
            $targetHeight = (int) round((imagesy($logo) / max(imagesx($logo), 1)) * $targetWidth);
            $resized = imagecreatetruecolor($targetWidth, max(60, $targetHeight));
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
            $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
            imagefilledrectangle($resized, 0, 0, $targetWidth, max(60, $targetHeight), $transparent);
            imagecopyresampled($resized, $logo, 0, 0, 0, 0, $targetWidth, max(60, $targetHeight), imagesx($logo), imagesy($logo));
            imagecopymerge(
                $canvas,
                $resized,
                (int) round(($width - $targetWidth) / 2),
                (int) round(($height - max(60, $targetHeight)) / 2) - 20,
                0,
                0,
                $targetWidth,
                max(60, $targetHeight),
                35
            );
            imagedestroy($resized);
            imagedestroy($logo);

            return;
        }

        $watermarkColor = imagecolorallocatealpha($canvas, 255, 255, 255, 90);
        $this->drawText(
            $canvas,
            150,
            332,
            36,
            $watermarkColor,
            strtoupper($this->marketing->siteName()),
            true
        );
    }

    /**
     * @return Collection<int, Product>
     */
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

        if (! empty($filters['search']) && is_string($filters['search'])) {
            $search = trim($filters['search']);
            if ($search !== '') {
                $query->where(function ($searchQuery) use ($search): void {
                    $searchQuery
                        ->where('slug', 'like', '%'.$search.'%')
                        ->orWhere('name->ar', 'like', '%'.$search.'%')
                        ->orWhere('name->en', 'like', '%'.$search.'%');
                });
            }
        }

        return $query
            ->get()
            ->sortBy(fn (Product $product): string => md5($link->code.'|'.$product->id))
            ->take(10)
            ->values();
    }

    protected function fetchImage(?string $url)
    {
        if ($url === null || $url === '') {
            return null;
        }

        try {
            $response = Http::timeout(4)->withOptions(['verify' => false])->get($url);

            if (! $response->successful()) {
                return null;
            }

            $image = @imagecreatefromstring($response->body());

            return $image !== false ? $image : null;
        } catch (\Throwable) {
            return null;
        }
    }

    protected function copyCropped($destination, $source, int $x, int $y, int $width, int $height): void
    {
        $sourceWidth = imagesx($source);
        $sourceHeight = imagesy($source);
        $sourceRatio = $sourceWidth / max($sourceHeight, 1);
        $targetRatio = $width / max($height, 1);

        if ($sourceRatio > $targetRatio) {
            $cropHeight = $sourceHeight;
            $cropWidth = (int) round($cropHeight * $targetRatio);
            $cropX = (int) round(($sourceWidth - $cropWidth) / 2);
            $cropY = 0;
        } else {
            $cropWidth = $sourceWidth;
            $cropHeight = (int) round($cropWidth / $targetRatio);
            $cropX = 0;
            $cropY = (int) round(($sourceHeight - $cropHeight) / 2);
        }

        imagecopyresampled(
            $destination,
            $source,
            $x,
            $y,
            $cropX,
            $cropY,
            $width,
            $height,
            $cropWidth,
            $cropHeight,
        );
    }

    /**
     * @return array{0:int,1:int,2:int}
     */
    protected function hexToRgb(string $hex): array
    {
        $normalized = ltrim($hex, '#');

        if (strlen($normalized) !== 6) {
            $normalized = '111827';
        }

        return [
            hexdec(substr($normalized, 0, 2)),
            hexdec(substr($normalized, 2, 2)),
            hexdec(substr($normalized, 4, 2)),
        ];
    }

    protected function drawText($canvas, int $x, int $y, int $size, int $color, string $text, bool $bold = false): void
    {
        $text = trim($text);

        if ($text === '') {
            return;
        }

        $font = $this->fontPath();

        if ($font !== null && function_exists('imagettftext')) {
            $fontSize = max(12, (int) round($size));
            if ($bold) {
                imagettftext($canvas, $fontSize, 0, $x + 1, $y, $color, $font, $text);
            }
            imagettftext($canvas, $fontSize, 0, $x, $y, $color, $font, $text);

            return;
        }

        imagestring($canvas, $bold ? 5 : 4, $x, max(0, $y - 16), $text, $color);
    }

    protected function fontPath(): ?string
    {
        $candidates = [
            'C:\\Windows\\Fonts\\arial.ttf',
            'C:\\Windows\\Fonts\\segoeui.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
        ];

        foreach ($candidates as $candidate) {
            if (is_file($candidate)) {
                return $candidate;
            }
        }

        return null;
    }
}
