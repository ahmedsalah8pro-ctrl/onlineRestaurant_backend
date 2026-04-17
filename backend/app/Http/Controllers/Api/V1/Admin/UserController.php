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
        $users = User::query()->with(['roles', 'wallet'])->latest()->paginate(15);
        return $this->paginatedResponse($users, $users->items());
    }

    public function show(User $user): JsonResponse
    {
        return $this->successResponse($user->load(['roles', 'wallet']));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'email' => ['nullable', 'email', 'unique:users,email'],
            'primary_phone' => ['required', 'string', 'max:20', 'unique:users,primary_phone'],
            'password' => ['required', 'string', 'min:6'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'is_active' => ['boolean'],
            'balance' => ['nullable', 'numeric', 'min:0']
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        if ($request->has('balance')) {
            $user->wallet()->update(['balance' => $request->balance]);
        }

        if (!empty($data['role_id'])) {
            $role = Role::findById($data['role_id'], 'sanctum');
            if ($role) {
                $user->assignRole($role);
            }
        }

        return $this->successResponse($user->load(['roles', 'wallet']), 'User created.', 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'name' => ['string', 'max:255'],
            'username' => ['string', 'max:255', 'unique:users,username,' . $user->id],
            'email' => ['nullable', 'email', 'unique:users,email,' . $user->id],
            'primary_phone' => ['string', 'max:20', 'unique:users,primary_phone,' . $user->id],
            'password' => ['nullable', 'string', 'min:6'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'is_active' => ['boolean'],
            'balance' => ['nullable', 'numeric', 'min:0']
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if ($request->has('balance')) {
            $user->wallet()->update(['balance' => $request->balance]);
        }

        if (array_key_exists('role_id', $data)) {
            $user->roles()->detach();
            if ($data['role_id']) {
                $role = Role::findById($data['role_id'], 'sanctum');
                if ($role) {
                    $user->assignRole($role);
                }
            }
        }

        return $this->successResponse($user->load(['roles', 'wallet']), 'User updated.');
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return $this->successResponse(null, 'User deleted.');
    }
}
