<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BackendLandingController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
        $apiPrefix = '/'.ltrim((string) config('app.api_public_prefix', '/api/v1'), '/');

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
                    'frontend' => config('app.frontend_url'),
                    'health' => $baseUrl.$apiPrefix.'/health',
                    'public_settings' => $baseUrl.$apiPrefix.'/settings/public',
                    'products' => $baseUrl.$apiPrefix.'/products',
                ],
            ],
            'meta' => [],
        ]);
    }
}
