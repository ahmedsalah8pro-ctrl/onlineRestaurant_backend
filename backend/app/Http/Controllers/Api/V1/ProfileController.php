<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Profile\UpdateProfileRequest;
use App\Http\Resources\Api\V1\Auth\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    use ApiResponse;

    public function show(): JsonResponse
    {
        $user = $this->authUser()->load('profile', 'wallet');

        return $this->successResponse([
            'user' => new UserResource($user->load('roles')),
            'stats' => $this->buildStats($user),
        ], 'Profile loaded.');
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->authUser($request);
        $data = $request->validated();

        $user->fill(collect($data)->only(['name', 'username', 'email', 'primary_phone'])->toArray())->save();

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            collect($data)->only([
                'bio',
                'avatar_path',
                'is_public_profile',
                'show_total_orders',
                'show_total_spent',
                'show_monthly_rank',
                'show_yearly_rank',
                'show_favorite_products',
            ])->map(fn ($value) => is_string($value) ? strip_tags($value) : $value)->toArray()
        );

        return $this->successResponse(new UserResource(($user->fresh() ?? $user)->load('profile', 'roles')), 'Profile updated.');
    }

    public function updatePrivacy(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->authUser($request);
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            collect($request->validated())->only([
                'is_public_profile',
                'show_total_orders',
                'show_total_spent',
                'show_monthly_rank',
                'show_yearly_rank',
                'show_favorite_products',
            ])->toArray()
        );

        return $this->successResponse($user->profile()->first(), 'Privacy settings updated.');
    }

    public function publicShow(string $username): JsonResponse
    {
        $user = User::query()
            ->where('username', strtolower($username))
            ->with('profile')
            ->firstOrFail();

        abort_unless($user->profile?->is_public_profile, 404);

        $stats = $this->buildStats($user);

        return $this->successResponse([
            'name' => $user->name,
            'username' => $user->username,
            'avatar_path' => $user->profile?->avatar_path,
            'stats' => [
                'total_orders' => $user->profile?->show_total_orders ? $stats['total_orders'] : null,
                'total_spent' => $user->profile?->show_total_spent ? $stats['total_spent'] : null,
                'monthly_rank' => $user->profile?->show_monthly_rank ? $stats['monthly_rank'] : null,
                'yearly_rank' => $user->profile?->show_yearly_rank ? $stats['yearly_rank'] : null,
                'favorite_products' => $user->profile?->show_favorite_products ? $stats['favorite_products'] : [],
            ],
        ], 'Public profile loaded.');
    }

    protected function buildStats(User $user): array
    {
        $delivered = $user->orders()->where('status', 'delivered');
        $monthStart = now()->startOfMonth();
        $yearStart = now()->startOfYear();
        $monthlyRanking = DB::table('orders')
            ->selectRaw('user_id, SUM(total) as total_spent')
            ->where('status', 'delivered')
            ->where('created_at', '>=', $monthStart)
            ->groupBy('user_id')
            ->orderByDesc('total_spent')
            ->pluck('user_id');
        $yearlyRanking = DB::table('orders')
            ->selectRaw('user_id, SUM(total) as total_spent')
            ->where('status', 'delivered')
            ->where('created_at', '>=', $yearStart)
            ->groupBy('user_id')
            ->orderByDesc('total_spent')
            ->pluck('user_id');

        return [
            'total_orders' => $delivered->count(),
            'total_spent' => (float) $delivered->sum('total'),
            'monthly_rank' => (($monthlyRanking->search($user->id) ?: 0) + 1),
            'yearly_rank' => (($yearlyRanking->search($user->id) ?: 0) + 1),
            'favorite_products' => DB::table('order_items')
                ->join('orders', 'orders.id', '=', 'order_items.order_id')
                ->where('orders.user_id', $user->id)
                ->selectRaw('JSON_EXTRACT(product_snapshot, "$.name.ar") as name, COUNT(*) as count')
                ->groupBy('name')
                ->orderByDesc('count')
                ->limit(5)
                ->get(),
        ];
    }
}
