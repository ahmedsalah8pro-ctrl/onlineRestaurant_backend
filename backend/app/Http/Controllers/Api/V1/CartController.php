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

    public function show(): JsonResponse
    {
        $cart = $this->authUser()->cart()->with(['items.product', 'items.productSize'])->firstOrCreate();

        return $this->successResponse(new CartResource($cart), 'Cart loaded.');
    }

    public function store(StoreCartItemRequest $request): JsonResponse
    {
        $cart = $this->cartService->addItem($this->authUser($request), $request->validated());

        return $this->successResponse(new CartResource($cart->load(['items.product', 'items.productSize'])), 'Item added to cart.', 201);
    }

    public function update(UpdateCartItemRequest $request, int $item): JsonResponse
    {
        $cart = $this->cartService->updateItem($this->authUser($request), $item, $request->validated());

        return $this->successResponse(new CartResource($cart), 'Cart item updated.');
    }

    public function destroy(int $item): JsonResponse
    {
        $cart = $this->cartService->removeItem($this->authUser(), $item);

        return $this->successResponse(new CartResource($cart), 'Cart item removed.');
    }

    public function clear(): JsonResponse
    {
        $this->cartService->clear($this->authUser());

        return $this->successResponse(null, 'Cart cleared.');
    }

    public function previewCoupon(Request $request): JsonResponse
    {
        $user = $this->authUser($request);
        $data = $request->validate([
            'coupon_code' => ['required', 'string', 'max:100'],
            'delivery_fee' => ['nullable', 'numeric', 'min:0'],
        ]);

        $cart = $user->cart()->with(['items.product.categories'])->firstOrCreate();
        $subtotal = round($cart->items->sum(fn ($item) => (float) $item->price_snapshot * $item->quantity), 2);
        $coupon = Coupon::active()->where('code', Str::upper((string) $data['coupon_code']))->first();
        $result = $this->couponService->evaluate($coupon, $user, $cart->items, $subtotal, (float) ($data['delivery_fee'] ?? 0));

        return $this->successResponse($result, $result['message']);
    }
}
