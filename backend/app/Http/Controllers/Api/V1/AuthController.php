<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Resources\Api\V1\Auth\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use ApiResponse;

    public function register(RegisterRequest $request): JsonResponse
    {
        /** @var array{name:string,username:string,email?:string|null,primary_phone:string,password:string,device_name?:string} $data */
        $data = $request->validated();
        $identityFragments = array_filter([
            Str::lower($data['username']),
            Str::lower((string) ($data['email'] ?? '')),
            Str::lower($data['name']),
        ]);
        $passwordLower = Str::lower($data['password']);

        foreach ($identityFragments as $fragment) {
            if ($fragment !== '' && str_contains($passwordLower, $fragment)) {
                throw ValidationException::withMessages([
                    'password' => ['Password must not contain personal account data.'],
                ]);
            }
        }

        $user = User::create($data);
        $token = $user->createToken((string) $request->validated('device_name', 'api-token'))->plainTextToken;

        return $this->successResponse([
            'user' => new UserResource($user->load('profile', 'roles')),
            'token' => $token,
        ], 'Registration completed.', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $identity = Str::lower(trim((string) $request->validated('email_or_username')));
        $user = User::query()
            ->where('username', $identity)
            ->orWhere('email', $identity)
            ->first();

        if (! $user || ! Hash::check((string) $request->validated('password'), $user->password)) {
            throw ValidationException::withMessages([
                'email_or_username' => ['Invalid credentials.'],
            ]);
        }

        if (! $user->is_active) {
            return $this->errorResponse('Account is inactive.', 403);
        }

        $user->forceFill(['last_login_at' => now()])->save();
        $token = $user->createToken((string) $request->validated('device_name', 'api-token'))->plainTextToken;

        return $this->successResponse([
            'user' => new UserResource($user->load('profile', 'roles')),
            'token' => $token,
        ], 'Login successful.');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $this->authUser($request);

        return $this->successResponse(
            new UserResource($user->load('profile', 'roles')),
            'Current user loaded.'
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authUser($request)->currentAccessToken()?->delete();

        return $this->successResponse(null, 'Logged out successfully.');
    }

    public function logoutAll(Request $request): JsonResponse
    {
        $this->authUser($request)->tokens()->delete();

        return $this->successResponse(null, 'All devices logged out successfully.');
    }
}
