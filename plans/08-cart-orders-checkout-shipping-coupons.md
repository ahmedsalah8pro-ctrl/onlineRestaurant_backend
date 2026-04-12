# Cart Orders Checkout Shipping Coupons

## Goal
- Convert configurable product selections into reliable, auditable orders.

## Cart Design Rules
- Cart is per authenticated user in v1.
- Cart can hold same product multiple times with different configurations.
- Cart item uniqueness is based on configuration hash, not only product ID.

## Cart Item Configuration Inputs
- `product_id`
- `product_size_id nullable`
- `addon_option_ids[]`
- `quantity`

## Cart Validation Rules
- Product exists and is active.
- Product is available for selected branch context if branch already chosen.
- Selected size belongs to product.
- Selected add-ons belong to product.
- Required add-on groups are satisfied.
- Quantity is positive.
- Limited stock is respected when enabled.

## Cart Storage Strategy
- Persistent DB-backed cart for authenticated users.
- Branch can be associated with cart when selected.
- Coupon preview/application can be cart-scoped, but final validation occurs again at checkout.

## Shipping Rules
- Delivery fee depends on selected branch and zone.
- Zone must belong to selected branch.
- Disabled zone cannot be used.
- Single-branch businesses still record zone when delivery is needed.

## Checkout Inputs
- `branch_id`
- `delivery_zone_id`
- `address_id`
- `notes nullable`
- `payment_method`
- `coupon_code nullable`
- `use_wallet_amount nullable`

## Checkout Validation Steps
1. Load current cart.
2. Ensure cart is not empty.
3. Ensure branch exists and active.
4. Ensure delivery zone belongs to branch and active.
5. Revalidate every cart item against branch availability.
6. Revalidate sizes/add-ons.
7. Recalculate subtotal/addons.
8. Evaluate coupon.
9. Evaluate wallet usage.
10. Persist order in transaction.

## Notes Field Security
- Notes are sanitized.
- Notes are plain text oriented.
- Notes should not preserve executable scripts.

## Payment Methods In V1
- `cash_on_delivery`
- `wallet`
- `wallet_plus_cash_on_delivery` if partial wallet use is allowed

## Coupon Rule Matrix
| Rule | Support |
| --- | --- |
| Fixed amount | Yes |
| Percentage | Yes |
| Max discount cap | Yes |
| Min cart value | Yes |
| Product/category conditions | Yes |
| Per-user usage limit | Yes |
| Global usage limit | Yes |
| Expiration window | Yes |
| Delivery only | Yes |
| Products only | Yes |
| Products + delivery | Yes |

## Coupon Application Rules
- Coupon eligibility is server-side only.
- Coupon may apply to eligible products subtotal only.
- Coupon may apply to delivery only.
- Coupon may apply to both depending on config.
- Extra unused discount is discarded.
- Extra unused discount is never converted into wallet credit by default.

## Coupon Example 1
```text
Coupon: 50 EGP off products only
Products subtotal: 20
Delivery: 5
Applied discount: 20
Final total: 5
Unused 30 is discarded
```

## Coupon Example 2
```text
Coupon: 50 EGP off both products and delivery
Products subtotal: 20
Delivery: 5
Applied discount: 25
Final total: 0
Unused 25 is discarded
```

## Order Snapshot Rules
- Copy customer-safe item names.
- Copy selected size names/codes.
- Copy add-on names and prices.
- Copy pricing breakdown.
- Copy coupon summary.
- Copy wallet deduction amount.
- Copy currency code.

## Order Statuses
- `created`
- `pending`
- `confirmed`
- `preparing`
- `out_for_delivery`
- `delivered`
- `cancelled`
- `refunded`

## Grace Period
- Store `grace_period_ends_at`.
- Default duration `2 minutes`.
- Customer can cancel own order within window.
- Customer may edit notes within window if enabled.
- After expiry, customer direct changes are blocked.

## Staff Order Flow
1. Staff sees newly eligible pending order.
2. Staff confirms after review.
3. Staff moves order to preparing.
4. Staff assigns delivery info.
5. Staff moves order to out_for_delivery.
6. Staff marks delivered.
7. Refund/cancel handled through controlled transitions.

## Suggested Services
- `CartService`
- `CartValidationService`
- `CheckoutService`
- `CouponEvaluator`
- `ShippingCalculator`
- `OrderStatusTransitionService`

## Suggested Policies
- `CartPolicy`
- `OrderPolicy`
- `CouponPolicy`

## Order API Notes
- Order detail response includes item snapshots.
- Order detail response includes status history.
- Order detail response includes delivery assignment if available.

## Cancel Rules
- Customer can cancel only own order.
- Only within grace period.
- Only when status is still cancelable.
- Cancel event should be logged.

## Refund Notes
- Refund may return to wallet or other method later.
- Refund action requires admin privilege.
- Refund should create wallet transaction when refunded to balance.

## Stock Handling Notes
- If stock tracking enabled, decrement safely during order creation or confirmation based on business decision.
- V1 simpler decision: reserve/decrement at order creation.
- Compensate on cancellation/refund if reservation policy uses stock.

## Curl Test Targets
- login
- fetch cart
- add item
- checkout
- list orders
- cancel order

## Testing Scenarios
1. Same product with different configurations creates separate cart lines.
2. Checkout fails when one item unavailable in selected branch.
3. Coupon delivery-only logic works.
4. Unused discount remainder is discarded.
5. Grace-period cancel works before cutoff.
6. Grace-period cancel fails after cutoff.

## Future Extensions
- Saved carts.
- Guest cart merge.
- Multiple addresses per order type.
- Scheduled orders.
