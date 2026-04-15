<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Settings\ImportSettingsPackRequest;
use App\Http\Requests\Api\V1\Admin\Settings\UpdateSettingGroupRequest;
use App\Services\Audit\AuditLogService;
use App\Services\Settings\SettingService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SettingService $settingService,
        protected AuditLogService $auditLogService,
    ) {
    }

    public function index(): JsonResponse
    {
        return $this->successResponse($this->settingService->catalog());
    }

    public function schema(): JsonResponse
    {
        return $this->successResponse($this->settingService->schema(), 'Settings schema loaded.');
    }

    public function show(string $group): JsonResponse
    {
        return $this->successResponse($this->settingService->groupDetails($group), 'Settings group loaded.');
    }

    public function update(UpdateSettingGroupRequest $request, string $group): JsonResponse
    {
        /** @var array<string, mixed> $values */
        $values = $request->validated('values');
        $updated = $this->settingService->setGroup($group, $values);

        $this->auditLogService->record($this->authUser($request), 'settings.group.updated', null, [
            'group' => $group,
            'keys' => array_keys($values),
            'mode' => 'partial-update',
        ], $request);

        return $this->successResponse($updated, 'Settings group updated.');
    }

    public function reset(Request $request, string $group): JsonResponse
    {
        $reset = $this->settingService->resetGroup($group);

        $this->auditLogService->record($this->authUser($request), 'settings.group.reset', null, [
            'group' => $group,
            'keys' => array_keys($reset),
            'mode' => 'defaults',
        ], $request);

        return $this->successResponse($reset, 'Settings group reset to defaults.');
    }

    public function export(Request $request): JsonResponse
    {
        $groups = $request->query('groups');
        $selectedGroups = is_array($groups) ? array_values(array_map('strval', $groups)) : null;
        $export = $this->settingService->exportGroups($selectedGroups);

        return $this->successResponse($export, 'Settings export created.');
    }

    public function import(ImportSettingsPackRequest $request): JsonResponse
    {
        /** @var array<string, array<string, mixed>> $groups */
        $groups = $request->validated('groups');
        $imported = $this->settingService->importGroups($groups);

        $this->auditLogService->record($this->authUser($request), 'settings.import.completed', null, [
            'groups' => array_keys($groups),
            'group_count' => count($groups),
        ], $request);

        return $this->successResponse([
            'imported_groups' => $imported,
            'group_count' => count($imported),
        ], 'Settings import completed.');
    }
}
