<?php

namespace App\Http\Controllers;

use App\Services\Marketing\MenuSharePreviewService;
use App\Services\Marketing\ShareLinkService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SharePreviewImageController extends Controller
{
    public function __construct(
        protected ShareLinkService $shareLinks,
        protected MenuSharePreviewService $menuPreview,
    ) {
    }

    public function __invoke(Request $request, string $type, string $slug, string $code): BinaryFileResponse
    {
        $link = $this->shareLinks->findActive($type, $code);

        if ($link->resource_type !== 'menu') {
            abort(404);
        }

        $path = $this->menuPreview->ensureGenerated($link);

        return response()->file($path, [
            'Content-Type' => 'image/jpeg',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
