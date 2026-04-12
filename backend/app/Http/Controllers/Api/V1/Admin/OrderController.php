<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Order\AssignDeliveryRequest;
use App\Http\Requests\Api\V1\Admin\Order\UpdateOrderStatusRequest;
use App\Http\Resources\Api\V1\OrderDetailResource;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\Order;
use App\Services\Audit\AuditLogService;
use App\Services\Notifications\OrderNotificationService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected OrderNotificationService $orderNotificationService,
        protected AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['user', 'branch', 'deliveryZone'])->latest();
        $user = $this->authUser($request);

        if (
            ! $user->hasAnyPermission(['orders.view', 'orders.manage'], 'sanctum')
            && $user->hasPermissionTo('orders.manage.assigned-branches', 'sanctum')
        ) {
            $query->whereIn('branch_id', $user->managedBranches()->pluck('branches.id'));
        }

        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->integer('branch_id'));
        }

        $orders = $query->paginate(20);

        return $this->paginatedResponse($orders, OrderResource::collection($orders));
    }

    public function show(Order $order): JsonResponse
    {
        return $this->successResponse(new OrderDetailResource($order->load(['items', 'statusLogs', 'branch', 'deliveryZone', 'address'])));
    }

    public function updateStatus(UpdateOrderStatusRequest $request, Order $order): JsonResponse
    {
        $from = $order->status;
        /** @var string|null $notes */
        $notes = $request->validated('notes');
        $order->update(['status' => $request->validated('status')]);
        $order->statusLogs()->create([
            'from_status' => $from,
            'to_status' => $request->validated('status'),
            'actor_id' => $this->authUser($request)->id,
            'notes' => $notes,
        ]);
        $order = $order->fresh(['items', 'statusLogs', 'branch', 'deliveryZone', 'address', 'user']) ?? $order;
        $this->orderNotificationService->notifyStatusChanged($order, $from, $order->status, $notes);
        $this->auditLogService->record($this->authUser($request), 'order.status.updated-by-admin', $order, [
            'from_status' => $from,
            'to_status' => $order->status,
            'notes' => $notes,
        ], $request);

        return $this->successResponse(new OrderDetailResource($order), 'Order status updated.');
    }

    public function assignDelivery(AssignDeliveryRequest $request, Order $order): JsonResponse
    {
        $order->update($request->validated());
        $order = $order->fresh(['items', 'statusLogs', 'branch', 'deliveryZone', 'address', 'user']) ?? $order;
        $this->orderNotificationService->notifyDeliveryAssigned($order);
        $this->auditLogService->record($this->authUser($request), 'order.delivery.assigned', $order, [
            'delivery_person_name' => $order->delivery_person_name,
            'delivery_person_phone' => $order->delivery_person_phone,
        ], $request);

        return $this->successResponse(new OrderDetailResource($order), 'Delivery assignment updated.');
    }
}
