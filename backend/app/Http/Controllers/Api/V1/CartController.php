<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Cart\StoreCartItemRequest;
use App\Http\Requests\Api\V1\Cart\UpdateCartItemRequest;
use App\Http\Resources\Api\V1\CartResource;
use App\Models\Coupon;
use App\Services\Cart\CartService;
use App\Services\Coupons\CouponService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected CartService $cartService,
        protected CouponService $couponService,
    ) {
    }

    public function show(Request $request): JsonResponse
    {
        $cart = $this->cartService->getOrCreate($request->user('sanctum'), $request->header('X-Session-Id'));
        $cart->load(['items.product', 'items.productSize']);

        return $this->successResponse(new CartResource($cart), 'Cart loaded.');
    }

    public function store(StoreCartItemRequest $request): JsonResponse
    {
        $cart = $this->cartService->addItem($request->user('sanctum'), $request->header('X-Session-Id'), $request->validated());

        return $this->successResponse(new CartResource($cart->load(['items.product', 'items.productSize'])), 'Item added to cart.', 201);
    }

    public function update(UpdateCartItemRequest $request, int $item): JsonResponse
    {
        $cart = $this->cartService->updateItem($request->user('sanctum'), $request->header('X-Session-Id'), $item, $request->validated());

        return $this->successResponse(new CartResource($cart), 'Cart item updated.');
    }

    public function destroy(Request $request, int $item): JsonResponse
    {
        $cart = $this->cartService->removeItem($request->user('sanctum'), $request->header('X-Session-Id'), $item);

        return $this->successResponse(new CartResource($cart), 'Cart item removed.');
    }

    public function clear(Request $request): JsonResponse
    {
        $this->cartService->clear($request->user('sanctum'), $request->header('X-Session-Id'));

        return $this->successResponse(null, 'Cart cleared.');
    }

    public function previewCoupon(Request $request): JsonResponse
    {
        $user = $request->user('sanctum');
        $data = $request->validate([
            'coupon_code' => ['required', 'string', 'max:100'],
            'delivery_fee' => ['nullable', 'numeric', 'min:0'],
        ]);

        $cart = $this->cartService->getOrCreate($user, $request->header('X-Session-Id'));
        $cart->load(['items.product.categories']);
        
        $subtotal = round($cart->items->sum(fn ($item) => (float) $item->price_snapshot * $item->quantity), 2);
        $coupon = Coupon::active()->where('code', Str::upper((string) $data['coupon_code']))->first();
        $result = $this->couponService->evaluate($coupon, $user, $cart->items, $subtotal, (float) ($data['delivery_fee'] ?? 0));

        return $this->successResponse($result, $result['message']);
    }
}
