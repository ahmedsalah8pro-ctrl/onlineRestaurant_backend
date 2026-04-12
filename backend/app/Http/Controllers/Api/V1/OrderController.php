<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Order\CheckoutRequest;
use App\Http\Resources\Api\V1\OrderDetailResource;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\Order;
use App\Services\Audit\AuditLogService;
use App\Services\Notifications\OrderNotificationService;
use App\Services\Orders\CheckoutService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected CheckoutService $checkoutService,
        protected OrderNotificationService $orderNotificationService,
        protected AuditLogService $auditLogService,
    )
    {
    }

    public function index(): JsonResponse
    {
        $orders = $this->authUser()->orders()->latest()->paginate(15);

        return $this->paginatedResponse($orders, OrderResource::collection($orders));
    }

    public function checkout(CheckoutRequest $request): JsonResponse
    {
        $order = $this->checkoutService->checkout($this->authUser($request), $request->validated());

        return $this->successResponse(new OrderDetailResource($order), 'Order created.', 201);
    }

    public function show(Order $order): JsonResponse
    {
        abort_unless($order->user_id === $this->authUser()->id, 403);

        return $this->successResponse(
            new OrderDetailResource($order->load(['items', 'statusLogs', 'branch', 'deliveryZone', 'address'])),
            'Order loaded.'
        );
    }

    public function cancel(Order $order): JsonResponse
    {
        $user = $this->authUser();

        abort_unless($order->user_id === $user->id, 403);

        if ($order->grace_period_ends_at->isPast() || $order->status !== OrderStatus::Pending->value) {
            return $this->errorResponse('Order can no longer be cancelled instantly.', 422);
        }

        $order->update(['status' => OrderStatus::Cancelled->value]);
        $order->statusLogs()->create([
            'from_status' => OrderStatus::Pending->value,
            'to_status' => OrderStatus::Cancelled->value,
            'actor_id' => $order->user_id,
            'notes' => 'Cancelled by customer during grace period.',
        ]);
        $order = $order->fresh(['items', 'statusLogs', 'branch', 'deliveryZone', 'address', 'user']) ?? $order;
        $this->orderNotificationService->notifyCancelled($order);
        $this->auditLogService->record($user, 'order.cancelled.by-customer', $order, [
            'status' => $order->status,
        ]);

        return $this->successResponse(new OrderDetailResource($order), 'Order cancelled.');
    }

    public function updateNotes(Request $request, Order $order): JsonResponse
    {
        abort_unless($order->user_id === $this->authUser($request)->id, 403);

        if ($order->grace_period_ends_at->isPast() || $order->status !== OrderStatus::Pending->value) {
            return $this->errorResponse('Order notes can no longer be updated.', 422);
        }

        $data = $request->validate([
            'notes' => ['required', 'string', 'max:1000'],
        ]);

        $order->update(['notes' => strip_tags($data['notes'])]);
        $order = $order->fresh(['items', 'statusLogs', 'branch', 'deliveryZone', 'address', 'user']) ?? $order;
        $this->orderNotificationService->notifyNotesUpdated($order);
        $this->auditLogService->record($this->authUser($request), 'order.notes.updated-by-customer', $order, [
            'notes' => $order->notes,
        ], $request);

        return $this->successResponse(new OrderDetailResource($order), 'Order notes updated.');
    }
}
