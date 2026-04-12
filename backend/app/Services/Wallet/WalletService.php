<?php

namespace App\Services\Wallet;

use App\Enums\WalletTransactionType;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WalletService
{
    public function credit(User $user, float $amount, string $type = WalletTransactionType::Credit->value, mixed $reference = null, ?int $actorId = null, ?string $notes = null): WalletTransaction
    {
        return DB::transaction(function () use ($user, $amount, $type, $reference, $actorId, $notes) {
            $wallet = $user->wallet()->lockForUpdate()->firstOrCreate([], ['balance' => 0]);
            $before = (float) $wallet->balance;
            $after = round($before + $amount, 2);

            $wallet->update(['balance' => $after]);

            return $wallet->transactions()->create([
                'type' => $type,
                'amount' => round($amount, 2),
                'balance_before' => $before,
                'balance_after' => $after,
                'reference_type' => $reference ? $reference::class : null,
                'reference_id' => $reference?->id,
                'actor_id' => $actorId,
                'notes' => $notes,
            ]);
        });
    }

    public function debit(User $user, float $amount, string $type = WalletTransactionType::Debit->value, mixed $reference = null, ?int $actorId = null, ?string $notes = null): WalletTransaction
    {
        return DB::transaction(function () use ($user, $amount, $type, $reference, $actorId, $notes) {
            /** @var Wallet $wallet */
            $wallet = $user->wallet()->lockForUpdate()->firstOrCreate([], ['balance' => 0]);
            $before = (float) $wallet->balance;

            if ($before < $amount) {
                throw ValidationException::withMessages([
                    'wallet' => ['Insufficient wallet balance.'],
                ]);
            }

            $after = round($before - $amount, 2);
            $wallet->update(['balance' => $after]);

            return $wallet->transactions()->create([
                'type' => $type,
                'amount' => round($amount, 2),
                'balance_before' => $before,
                'balance_after' => $after,
                'reference_type' => $reference ? $reference::class : null,
                'reference_id' => $reference?->id,
                'actor_id' => $actorId,
                'notes' => $notes,
            ]);
        });
    }
}
