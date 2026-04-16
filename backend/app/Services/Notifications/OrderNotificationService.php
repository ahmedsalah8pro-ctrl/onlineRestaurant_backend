<?php

namespace App\Services\Notifications;

use App\Models\Branch;
use App\Models\DeliveryZone;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderLifecycleNotification;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Notification;

class OrderNotificationService
{
    public function notifyOrderCreated(Order $order): void
    {
        $order->loadMissing(['user', 'branch', 'deliveryZone']);
        /** @var User $customer */
        $customer = $order->user()->firstOrFail();

        $customer->notify(new OrderLifecycleNotification(
            'order.created.customer',
            'طلب جديد #' . $order->id,
            'تم استلام طلبك وهو بانتظار مراجعة الفرع.',
            $this->context($order)
        ));

        $admins = $this->adminRecipientsForOrder($order)->reject(
            fn (User $user): bool => $user->id === $order->user_id
        );

        if ($admins->isNotEmpty()) {
            Notification::send($admins, new OrderLifecycleNotification(
                'order.created.admin',
                'طلب جديد وارد',
                'تم تقديم طلب جديد من ' . ($order->user->name ?? 'عميل') . ' ويحتاج للمراجعة.',
                $this->context($order)
            ));
        }
    }

    public function notifyStatusChanged(Order $order, string $fromStatus, string $toStatus, ?string $notes = null): void
    {
        $order->loadMissing(['user', 'branch', 'deliveryZone']);
        /** @var User $customer */
        $customer = $order->user()->firstOrFail();

        $customer->notify(new OrderLifecycleNotification(
            'order.status.updated',
            'تحديث حالة الطلب #' . $order->id,
            "تغيرت حالة طلبك إلى: " . $order->status,
            $this->context($order, [
                'from_status' => $fromStatus,
                'to_status' => $toStatus,
                'notes' => $notes,
            ])
        ));
    }

    public function notifyDeliveryAssigned(Order $order): void
    {
        $order->loadMissing(['user', 'branch', 'deliveryZone']);
        /** @var User $customer */
        $customer = $order->user()->firstOrFail();

        $customer->notify(new OrderLifecycleNotification(
            'order.delivery.assigned',
            'تم تعيين مندوب للطلب',
            "طلبك الآن مع المندوب: {$order->delivery_person_name}. يمكنك التواصل معه على: {$order->delivery_person_phone}",
            $this->context($order, [
                'delivery_person_name' => $order->delivery_person_name,
                'delivery_person_phone' => $order->delivery_person_phone,
            ])
        ));
    }

    public function notifyCancelled(Order $order): void
    {
        $order->loadMissing(['user', 'branch', 'deliveryZone']);
        /** @var User $customer */
        $customer = $order->user()->firstOrFail();

        $customer->notify(new OrderLifecycleNotification(
            'order.cancelled',
            'Order cancelled',
            'Your order was cancelled successfully during the grace period.',
            $this->context($order)
        ));
    }

    public function notifyNotesUpdated(Order $order): void
    {
        $order->loadMissing(['user', 'branch', 'deliveryZone']);
        /** @var User $customer */
        $customer = $order->user()->firstOrFail();

        $customer->notify(new OrderLifecycleNotification(
            'order.notes.updated',
            'Order notes updated',
            'Your order notes were updated successfully.',
            $this->context($order, [
                'notes' => $order->notes,
            ])
        ));
    }

    /**
     * @return Collection<int, User>
     */
    protected function adminRecipientsForOrder(Order $order): Collection
    {
        return User::query()
            ->active()
            ->with('managedBranches')
            ->get()
            ->filter(function (User $user) use ($order): bool {
                return $user->hasAnyPermission(['orders.view', 'orders.manage'], 'sanctum')
                    || $user->managedBranches->contains('id', $order->branch_id);
            })
            ->values();
    }

    /**
     * @param  array<string, mixed>  $extra
     * @return array<string, mixed>
     */
    protected function context(Order $order, array $extra = []): array
    {
        /** @var Branch|null $branch */
        $branch = $order->branch;
        /** @var DeliveryZone|null $deliveryZone */
        $deliveryZone = $order->deliveryZone;

        return array_merge([
            'order_id' => $order->id,
            'status' => $order->status,
            'total' => (float) $order->total,
            'currency_code' => $order->currency_code,
            'branch' => [
                'id' => $branch?->id,
                'slug' => $branch?->slug,
                'name' => $branch?->name,
            ],
            'delivery_zone' => [
                'id' => $deliveryZone?->id,
                'code' => $deliveryZone?->code,
                'name' => $deliveryZone?->name,
            ],
        ], $extra);
    }
}
