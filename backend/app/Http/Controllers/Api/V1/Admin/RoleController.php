<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse([
            'roles' => Role::query()->with('permissions')->get(),
            'permissions' => Permission::query()->get(),
        ]);
    }

    public function show(Role $role): JsonResponse
    {
        return $this->successResponse($role->load('permissions'));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:roles,name'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role = Role::create(['name' => $data['name'], 'guard_name' => 'sanctum']);
        $role->syncPermissions($data['permissions'] ?? []);

        return $this->successResponse($role->load('permissions'), 'Role created.', 201);
    }

    public function update(Request $request, Role $role): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:100', 'unique:roles,name,'.$role->id],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        if (isset($data['name'])) {
            $role->update(['name' => $data['name']]);
        }

        if (array_key_exists('permissions', $data)) {
            $role->syncPermissions($data['permissions'] ?? []);
        }

        return $this->successResponse($role->fresh()->load('permissions'), 'Role updated.');
    }

    public function destroy(Role $role): JsonResponse
    {
        $role->delete();

        return $this->successResponse(null, 'Role deleted.');
    }
}
