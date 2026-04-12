<?php

namespace App\Services\Coupons;

use App\Enums\CouponAppliesTo;
use App\Enums\CouponType;
use App\Models\Coupon;
use App\Models\User;
use Illuminate\Support\Collection;

class CouponService
{
    public function evaluate(?Coupon $coupon, User $user, Collection $cartItems, float $productsTotal, float $deliveryFee): array
    {
        if (! $coupon) {
            return $this->emptyResult();
        }

        if (! $coupon->is_active) {
            return $this->emptyResult('Coupon is inactive.');
        }

        if ($coupon->starts_at && now()->lt($coupon->starts_at)) {
            return $this->emptyResult('Coupon is not active yet.');
        }

        if ($coupon->expires_at && now()->gt($coupon->expires_at)) {
            return $this->emptyResult('Coupon has expired.');
        }

        if ($coupon->min_cart_value !== null && $productsTotal < (float) $coupon->min_cart_value) {
            return $this->emptyResult('Cart total is below the minimum required amount.');
        }

        $conditions = $coupon->conditions ?? [];

        if (($conditions['first_order_only'] ?? false) && $user->orders()->exists()) {
            return $this->emptyResult('Coupon is valid only for first orders.');
        }

        if ($coupon->usage_limit_total !== null && $coupon->usages()->count() >= $coupon->usage_limit_total) {
            return $this->emptyResult('Coupon usage limit has been reached.');
        }

        if ($coupon->usage_limit_per_user !== null && $coupon->usages()->where('user_id', $user->id)->count() >= $coupon->usage_limit_per_user) {
            return $this->emptyResult('You have already reached the usage limit for this coupon.');
        }

        $eligibleProductsTotal = $this->eligibleProductsTotal($conditions, $cartItems, $productsTotal);
        $discountProducts = 0.0;
        $discountDelivery = 0.0;

        if (in_array($coupon->applies_to, [CouponAppliesTo::Products->value, CouponAppliesTo::Both->value], true)) {
            $discountProducts = $this->calculateDiscount($coupon, $eligibleProductsTotal);
            $discountProducts = min($discountProducts, $eligibleProductsTotal);
        }

        if (in_array($coupon->applies_to, [CouponAppliesTo::Delivery->value, CouponAppliesTo::Both->value], true)) {
            $discountDelivery = $this->calculateDiscount($coupon, $deliveryFee);
            $discountDelivery = min($discountDelivery, $deliveryFee);
        }

        return [
            'valid' => ($discountProducts + $discountDelivery) > 0,
            'message' => ($discountProducts + $discountDelivery) > 0 ? 'Coupon applied successfully.' : 'Coupon does not match any eligible amounts.',
            'discount_products' => round($discountProducts, 2),
            'discount_delivery' => round($discountDelivery, 2),
            'discount_total' => round($discountProducts + $discountDelivery, 2),
            'coupon' => $coupon,
        ];
    }

    protected function eligibleProductsTotal(array $conditions, Collection $cartItems, float $fallbackTotal): float
    {
        $allowedProductIds = collect($conditions['allowed_product_ids'] ?? [])->map(fn ($id) => (int) $id)->all();
        $allowedCategoryIds = collect($conditions['allowed_category_ids'] ?? [])->map(fn ($id) => (int) $id)->all();

        if ($allowedProductIds === [] && $allowedCategoryIds === []) {
            return round($fallbackTotal, 2);
        }

        return round($cartItems->filter(function ($item) use ($allowedProductIds, $allowedCategoryIds) {
            $productAllowed = $allowedProductIds === [] || in_array($item->product_id, $allowedProductIds, true);
            $categoryAllowed = $allowedCategoryIds === []
                || $item->product->categories()->whereIn('categories.id', $allowedCategoryIds)->exists();

            return $productAllowed && $categoryAllowed;
        })->sum(fn ($item) => (float) $item->price_snapshot * (int) $item->quantity), 2);
    }

    protected function calculateDiscount(Coupon $coupon, float $amount): float
    {
        if ($amount <= 0) {
            return 0.0;
        }

        $discount = $coupon->type === CouponType::Percentage->value
            ? ($amount * ((float) $coupon->value / 100))
            : (float) $coupon->value;

        if ($coupon->type === CouponType::Percentage->value && $coupon->max_discount_amount !== null) {
            $discount = min($discount, (float) $coupon->max_discount_amount);
        }

        return round($discount, 2);
    }

    protected function emptyResult(string $message = 'Coupon is not applicable.'): array
    {
        return [
            'valid' => false,
            'message' => $message,
            'discount_products' => 0.0,
            'discount_delivery' => 0.0,
            'discount_total' => 0.0,
            'coupon' => null,
        ];
    }
}
