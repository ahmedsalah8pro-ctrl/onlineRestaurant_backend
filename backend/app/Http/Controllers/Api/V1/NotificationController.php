<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $user = $this->authUser($request);
        $notifications = $user->notifications()->latest()->paginate(20);

        return $this->paginatedResponse(
            $notifications,
            NotificationResource::collection($notifications),
            'Notifications loaded.',
            ['unread_count' => $user->unreadNotifications()->count()]
        );
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $user = $this->authUser($request);

        return $this->successResponse([
            'unread_count' => $user->unreadNotifications()->count(),
        ], 'Unread notification count loaded.');
    }

    public function markRead(Request $request, string $notification): JsonResponse
    {
        $record = $this->authUser($request)->notifications()->whereKey($notification)->firstOrFail();
        $record->markAsRead();

        return $this->successResponse(new NotificationResource($record->fresh()), 'Notification marked as read.');
    }

    public function markAllRead(Request $request): JsonResponse
    {
        $user = $this->authUser($request);
        $updated = $user->unreadNotifications()->update(['read_at' => now()]);

        return $this->successResponse([
            'marked_as_read' => $updated,
        ], 'All notifications marked as read.');
    }
}
