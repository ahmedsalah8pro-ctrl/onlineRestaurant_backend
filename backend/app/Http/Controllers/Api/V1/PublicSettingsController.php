<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\Settings\SettingService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class PublicSettingsController extends Controller
{
    use ApiResponse;

    public function __construct(protected SettingService $settingService)
    {
    }

    public function show(): JsonResponse
    {
        return $this->successResponse($this->settingService->publicSettings(), 'Public settings loaded.');
    }
}
