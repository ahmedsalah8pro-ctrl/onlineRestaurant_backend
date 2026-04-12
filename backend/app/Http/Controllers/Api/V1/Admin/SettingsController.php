<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Settings\UpdateSettingGroupRequest;
use App\Models\Setting;
use App\Services\Audit\AuditLogService;
use App\Services\Settings\SettingService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SettingService $settingService,
        protected AuditLogService $auditLogService,
    )
    {
    }

    public function index(): JsonResponse
    {
        return $this->successResponse(Setting::query()->orderBy('group')->orderBy('key')->get());
    }

    public function update(UpdateSettingGroupRequest $request, string $group): JsonResponse
    {
        /** @var array<string, mixed> $values */
        $values = $request->validated('values');
        $this->settingService->setGroup($group, $values);
        $this->auditLogService->record($this->authUser($request), 'settings.group.updated', null, [
            'group' => $group,
            'keys' => array_keys($values),
        ], $request);

        return $this->successResponse($this->settingService->getGroup($group), 'Settings group updated.');
    }
}
