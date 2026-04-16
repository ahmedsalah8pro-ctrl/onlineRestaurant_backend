<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Created = 'created';
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Preparing = 'preparing';
    case OutForDelivery = 'out_for_delivery';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
    case Refunded = 'refunded';
    
    public function label(): string
    {
        return match($this) {
            self::Created => 'تم الإنشاء',
            self::Pending => 'قيد المراجعة',
            self::Confirmed => 'تم التأكيد',
            self::Preparing => 'جارٍ التحضير',
            self::OutForDelivery => 'مع المندوب',
            self::Delivered => 'تم التسليم',
            self::Cancelled => 'ملغي',
            self::Refunded => 'مسترجع',
        };
    }
}
