# Users Profiles Addresses Wallet Gift Cards

## Goal
- Provide a secure customer identity and value-storage system.

## User Rules
- Unique lowercase username.
- Unique lowercase email when present.
- Required unique primary phone.
- Optional secondary phones.
- Secure password rules.
- Active/inactive state.

## Profile Rules
- Public profile optional.
- Public profile identified by username.
- Privacy settings control exposed stats.
- Avatar path stored in profile record.
- Bio optional and sanitized.

## Public Profile Stats
- Total orders.
- Total spending.
- Monthly rank.
- Yearly rank.
- Favorite products.

## Privacy Flags
- `is_public_profile`
- `show_total_orders`
- `show_total_spent`
- `show_monthly_rank`
- `show_yearly_rank`
- `show_favorite_products`

## Addresses
- User can have multiple addresses.
- One address can be default.
- Setting a new default should clear previous default.
- Address notes and landmarks should be sanitized.

## Secondary Phones
- Useful for delivery backup contact.
- Non-unique globally.
- Belong to user.

## Wallet Rules
- Every user should have one wallet.
- Wallet balance is numeric and non-negative.
- Wallet operations must be transactional.
- Wallet history must be persisted.

## Wallet Transaction Types
- `credit`
- `debit`
- `refund`
- `gift_card_redeem`
- `manual_adjustment`
- `order_payment`

## Wallet Use Cases
- Refund to wallet.
- Partial payment during checkout.
- Full wallet payment.
- Gift card redemption.
- Manual admin credit/debit.

## Gift Card Rules
- Gift cards created by admin.
- Gift cards have unique code.
- Gift cards have amount.
- Gift cards may expire.
- Gift cards may be disabled.
- Gift cards redeem into wallet.
- Redeem should be single-use unless explicitly designed otherwise.

## Gift Card Settings
- Feature toggle: enable/disable.
- Default currency code.
- Code length and format if configurable later.

## Profile Endpoints
- `GET /api/v1/profile`
- `PUT /api/v1/profile`
- `GET /api/v1/profiles/{username}`
- `PUT /api/v1/profile/privacy`

## Address Endpoints
- `GET /api/v1/addresses`
- `POST /api/v1/addresses`
- `PUT /api/v1/addresses/{id}`
- `DELETE /api/v1/addresses/{id}`
- `POST /api/v1/addresses/{id}/default`

## Wallet Endpoints
- `GET /api/v1/wallet`
- `GET /api/v1/wallet/transactions`
- `POST /api/v1/wallet/redeem`

## Suggested Services
- `ProfileService`
- `AddressService`
- `WalletService`
- `GiftCardService`
- `WalletLedgerService`

## Suggested Policies
- `ProfilePolicy`
- `AddressPolicy`
- `WalletPolicy`
- `GiftCardPolicy`

## Stats Computation Strategy
- Aggregate orders in delivered/eligible states.
- Use date range boundaries by calendar month/year.
- Prefer service/query objects.
- Cache if needed for hot endpoints.

## Calendar Ranking Notes
- Monthly ranking uses actual month boundaries.
- Yearly ranking uses actual year boundaries.
- Do not use rolling 30-day windows when requirement says calendar period.

## Avatar Upload Notes
- Use storage disk abstraction.
- Validate uploads strictly.
- Keep path only in DB.
- URL should be derived from storage/CDN config.

## Validation Rules
- Username alphanumeric/dash/underscore policy if desired.
- Username unique ignoring case.
- Primary phone unique.
- Address city/street required.
- Gift card code required and normalized.

## Eloquent Relationship Notes
- `User hasOne UserProfile`
- `User hasMany UserAddress`
- `User hasMany UserSecondaryPhone`
- `User hasOne Wallet`
- `Wallet hasMany WalletTransaction`
- `GiftCard hasMany GiftCardRedemption`

## Security Notes
- Wallet balance must not be modified by client payloads directly.
- Gift card redeem endpoint should be rate-limited.
- Manual wallet adjustments require explicit admin permission.
- Sensitive profile fields remain private unless explicitly public.

## Testing Scenarios
1. Username/email stored lowercase.
2. Default address uniqueness per user holds.
3. Public profile respects privacy flags.
4. Gift card redeem increases wallet balance exactly once.
5. Duplicate redeem is rejected.
6. Wallet debit cannot exceed balance when full prepayment is required.

## Future Extensions
- Phone verification.
- Wallet expiration or loyalty points.
- Referral codes.
- Customer tiers.
