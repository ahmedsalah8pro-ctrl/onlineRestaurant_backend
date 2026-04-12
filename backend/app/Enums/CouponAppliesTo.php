<?php

namespace App\Enums;

enum CouponAppliesTo: string
{
    case Products = 'products';
    case Delivery = 'delivery';
    case Both = 'both';
}
