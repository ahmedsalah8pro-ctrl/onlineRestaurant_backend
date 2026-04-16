<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $users = User::query()->with('roles')->latest()->paginate(15);
        return $this->paginatedResponse($users, $users->items());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'is_active' => ['boolean']
        ]);

        $data['password'] = Hash::make($data['password']);
        // Generates dummy username and phone if they are required but not supplied by form.
        $data['username'] = 'u' . uniqid();
        $data['primary_phone'] = uniqid();

        $user = User::create($data);

        if (!empty($data['role_id'])) {
            $role = Role::findById($data['role_id'], 'sanctum');
            if ($role) {
                $user->assignRole($role);
            }
        }

        return $this->successResponse($user->load('roles'), 'User created.', 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'name' => ['string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:6'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'is_active' => ['boolean']
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if (array_key_exists('role_id', $data)) {
            $user->roles()->detach();
            if ($data['role_id']) {
                $role = Role::findById($data['role_id'], 'sanctum');
                if ($role) {
                    $user->assignRole($role);
                }
            }
        }

        return $this->successResponse($user->load('roles'), 'User updated.');
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return $this->successResponse(null, 'User deleted.');
    }
}
