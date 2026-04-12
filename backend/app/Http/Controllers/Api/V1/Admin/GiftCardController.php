<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\GiftCard\StoreGiftCardRequest;
use App\Models\GiftCard;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GiftCardController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(GiftCard::latest()->get());
    }

    public function store(StoreGiftCardRequest $request): JsonResponse
    {
        $giftCard = GiftCard::create([
            ...$request->validated(),
            'code' => Str::upper($request->validated('code')),
        ]);

        return $this->successResponse($giftCard, 'Gift card created.', 201);
    }

    public function show(GiftCard $giftCard): JsonResponse
    {
        return $this->successResponse($giftCard);
    }

    public function update(Request $request, GiftCard $giftCard): JsonResponse
    {
        $data = $request->validate([
            'code' => ['sometimes', 'string', 'max:100', Rule::unique('gift_cards', 'code')->ignore($giftCard->id)],
            'amount' => ['sometimes', 'numeric', 'min:0.01'],
            'currency_code' => ['sometimes', 'string', 'size:3'],
            'is_active' => ['sometimes', 'boolean'],
            'expires_at' => ['nullable', 'date'],
        ]);

        if (isset($data['code'])) {
            $data['code'] = Str::upper($data['code']);
        }

        $giftCard->update($data);

        return $this->successResponse($giftCard->fresh(), 'Gift card updated.');
    }

    public function destroy(GiftCard $giftCard): JsonResponse
    {
        $giftCard->delete();

        return $this->successResponse(null, 'Gift card deleted.');
    }
}
