<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BackendLandingController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');

        return response()->json([
            'success' => true,
            'message' => 'Backend ready.',
            'data' => [
                'application' => config('app.name'),
                'environment' => config('app.env'),
                'backend_only' => true,
                'frontend' => false,
                'api_version' => 'v1',
                'host' => $request->getHost(),
                'scheme' => $request->getScheme(),
                'links' => [
                    'base_url' => $baseUrl,
                    'health' => $baseUrl.'/api/v1/health',
                    'public_settings' => $baseUrl.'/api/v1/settings/public',
                    'products' => $baseUrl.'/api/v1/products',
                ],
            ],
            'meta' => [],
        ]);
    }
}
