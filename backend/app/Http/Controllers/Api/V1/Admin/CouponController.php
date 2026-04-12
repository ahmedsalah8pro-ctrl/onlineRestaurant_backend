<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Coupon\StoreCouponRequest;
use App\Models\Coupon;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CouponController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(Coupon::latest()->get());
    }

    public function store(StoreCouponRequest $request): JsonResponse
    {
        $coupon = Coupon::create([
            ...$request->validated(),
            'code' => Str::upper($request->validated('code')),
        ]);

        return $this->successResponse($coupon, 'Coupon created.', 201);
    }

    public function show(Coupon $coupon): JsonResponse
    {
        return $this->successResponse($coupon);
    }

    public function update(Request $request, Coupon $coupon): JsonResponse
    {
        $data = $request->validate([
            'code' => ['sometimes', 'string', 'max:100', Rule::unique('coupons', 'code')->ignore($coupon->id)],
            'type' => ['sometimes', 'string', 'in:fixed,percentage'],
            'value' => ['sometimes', 'numeric', 'min:0'],
            'max_discount_amount' => ['nullable', 'numeric', 'min:0'],
            'min_cart_value' => ['nullable', 'numeric', 'min:0'],
            'applies_to' => ['sometimes', 'string', 'in:products,delivery,both'],
            'usage_limit_total' => ['nullable', 'integer', 'min:1'],
            'usage_limit_per_user' => ['nullable', 'integer', 'min:1'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date'],
            'is_active' => ['sometimes', 'boolean'],
            'conditions' => ['nullable', 'array'],
        ]);

        if (isset($data['code'])) {
            $data['code'] = Str::upper($data['code']);
        }

        $coupon->update($data);

        return $this->successResponse($coupon->fresh(), 'Coupon updated.');
    }

    public function destroy(Coupon $coupon): JsonResponse
    {
        $coupon->delete();

        return $this->successResponse(null, 'Coupon deleted.');
    }
}
