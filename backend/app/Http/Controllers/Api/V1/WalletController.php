<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\WalletTransactionType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Wallet\RedeemGiftCardRequest;
use App\Http\Resources\Api\V1\WalletResource;
use App\Http\Resources\Api\V1\WalletTransactionResource;
use App\Models\GiftCard;
use App\Services\Audit\AuditLogService;
use App\Services\Wallet\WalletService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class WalletController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService,
        protected AuditLogService $auditLogService,
    )
    {
    }

    public function show(): JsonResponse
    {
        return $this->successResponse(new WalletResource($this->authUser()->wallet()->with('transactions')->firstOrFail()), 'Wallet loaded.');
    }

    public function transactions(): JsonResponse
    {
        $wallet = $this->authUser()->wallet()->firstOrFail();
        $transactions = $wallet->transactions()->latest()->paginate(20);

        return $this->paginatedResponse($transactions, WalletTransactionResource::collection($transactions), 'Wallet transactions loaded.');
    }

    public function redeem(RedeemGiftCardRequest $request): JsonResponse
    {
        $user = $this->authUser($request);
        $giftCard = GiftCard::active()->where('code', Str::upper((string) $request->validated('code')))->first();

        if (! $giftCard || $giftCard->redeemed_at || ($giftCard->expires_at && $giftCard->expires_at->isPast())) {
            return $this->errorResponse('Gift card is invalid or already redeemed.', 422);
        }

        $transaction = $this->walletService->credit(
            $user,
            (float) $giftCard->amount,
            WalletTransactionType::GiftCardRedeem->value,
            $giftCard,
            $user->id,
            'Gift card redeemed.'
        );

        $giftCard->update([
            'redeemed_at' => now(),
            'redeemed_by_user_id' => $user->id,
        ]);

        $giftCard->redemptions()->create([
            'user_id' => $user->id,
            'wallet_transaction_id' => $transaction->id,
            'amount' => $giftCard->amount,
        ]);
        $this->auditLogService->record($user, 'wallet.gift-card.redeemed', $giftCard, [
            'amount' => (float) $giftCard->amount,
            'currency_code' => $giftCard->currency_code,
            'wallet_transaction_id' => $transaction->id,
        ], $request);

        return $this->successResponse(new WalletResource($user->wallet()->with('transactions')->firstOrFail()), 'Gift card redeemed successfully.');
    }
}
