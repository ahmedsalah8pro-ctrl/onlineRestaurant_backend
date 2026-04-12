<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DynamicPageResource;
use App\Models\DynamicPage;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class DynamicPageController extends Controller
{
    use ApiResponse;

    public function show(string $slug): JsonResponse
    {
        $page = DynamicPage::active()->where('slug', $slug)->firstOrFail();

        return $this->successResponse(new DynamicPageResource($page), 'Page loaded.');
    }
}
