<?php

namespace App\Enums;

enum WalletTransactionType: string
{
    case Credit = 'credit';
    case Debit = 'debit';
    case Refund = 'refund';
    case GiftCardRedeem = 'gift_card_redeem';
    case ManualAdjustment = 'manual_adjustment';
    case OrderPayment = 'order_payment';
}
