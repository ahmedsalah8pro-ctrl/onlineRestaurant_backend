# Authentication And Authorization

## Authentication Goals
- Use token-based authentication suitable for cross-platform clients.
- Keep auth flows consistent across website/mobile consumers.
- Avoid route-to-route auth instability.

## Primary Auth Choice
- `Laravel Sanctum` with access tokens.
- Use Bearer tokens for protected API routes.
- Avoid depending on session auth for the main public API contract.

## Registration Rules
- Accept `name`, `username`, `email`, `primary_phone`, `password`.
- Normalize `username` and `email` to lowercase.
- Enforce uniqueness on normalized values.
- Hash passwords using Laravel defaults.

## Password Policy
- Minimum `6` characters.
- At least `1` English letter.
- At least `1` number.
- At least `1` symbol.
- Must not include username.
- Must not include email.
- Must not include first/last name when known.

## Login Rules
- One field for `email_or_username`.
- Normalize to lowercase before lookup.
- Support login by `email` or `username`.
- Return sanitized generic failure messages.
- Rate-limit login attempts.

## Logout Rules
- Logout current token.
- Support logout all tokens.
- Return JSON only.

## Current User Endpoint
- Return user summary.
- Return profile summary.
- Return role names if helpful.
- Return permissions only if needed by the client.

## Token Metadata
- Token name can optionally include device/client hint.
- Store only hashed tokens through Sanctum.
- Do not log plaintext tokens.

## Authorization Goals
- Granular RBAC.
- Branch-scoped operations.
- Resource-level policy checks.
- Clear super-admin behavior.

## Role Examples
- `super-admin`
- `branch-manager`
- `orders-manager`
- `support-agent`
- `content-moderator`
- `catalog-manager`
- `settings-manager`

## Permission Examples
- `branches.view`
- `branches.create`
- `branches.update`
- `branches.delete`
- `delivery-zones.manage`
- `products.view`
- `products.create`
- `products.update`
- `products.delete`
- `orders.view`
- `orders.update-status`
- `orders.assign-delivery`
- `orders.refund`
- `reviews.moderate`
- `settings.manage`
- `roles.manage`

## Branch-Scoped Permission Strategy
- Permission names stay generic.
- Branch scope is enforced by policy context and assigned branch mapping.
- A branch manager may have generic `orders.view` but only for branch IDs assigned to them.

## Suggested Admin-Branch Mapping
- `admin_branch_user` pivot or similar.
- Fields: `user_id`, `branch_id`, timestamps.
- Used by policies and services.

## Super Admin Behavior
- Initial seeded super admin may be first admin account.
- Super admin bypass should be centralized.
- Prefer role/capability over raw `id == 1` alone, even if bootstrap starts with ID 1.

## Policy Targets
- AddressPolicy.
- BranchPolicy.
- DeliveryZonePolicy.
- ProductPolicy.
- CategoryPolicy.
- TagPolicy.
- OrderPolicy.
- CouponPolicy.
- GiftCardPolicy.
- ReviewPolicy.
- SettingsPolicy.
- DynamicPagePolicy.

## Customer Access Rules
- Customer can view/update only own profile.
- Customer can manage only own addresses.
- Customer can view only own wallet.
- Customer can view only own orders.
- Customer can create reviews only for eligible purchases.
- Customer cannot access admin routes.

## Admin Access Rules
- Admin must authenticate.
- Admin must carry proper role/permissions.
- Sensitive actions require explicit permission, not only broad role.
- Branch-restricted staff cannot access unrelated branches.

## Order Authorization Rules
- Customer can view own order.
- Customer can cancel only own order and only before grace-period expiry.
- Orders manager can view orders in assigned branches.
- Orders manager can transition only allowed states.
- Refund flow should require higher privilege.

## Catalog Authorization Rules
- Public can read active products/categories.
- Admin CRUD requires permissions.
- Branch-specific availability changes require product management rights.

## Settings Authorization Rules
- Settings updates should be tightly restricted.
- Theme JSON import/export should be restricted.
- Auth/mail/oauth settings require top-level admin permissions.

## Review Authorization Rules
- Public can read visible reviews.
- Customer can create only eligible review.
- Customer can edit/delete own review only if policy allows.
- Admin can hide/delete any review with moderation permission.

## Audit Requirements
- Log admin login events if feasible.
- Log role assignment changes.
- Log permission-sensitive updates.
- Log wallet manual adjustments.
- Log refunds and coupon edits.

## Middleware Stack
- `auth:sanctum`
- API locale resolver
- rate limiter
- admin access or permission middleware where needed

## Auth Error Responses
| Scenario | Status |
| --- | --- |
| Invalid credentials | 422 or 401 |
| Missing token | 401 |
| Invalid token | 401 |
| Authenticated but forbidden | 403 |

## Security Notes
- Never expose whether email or username exists during login failure.
- Normalize identity before validation and lookup.
- Rate-limit login and redemption endpoints.
- Keep free-text fields sanitized separately from auth logic.

## Test Cases
1. Register with uppercase email -> stored lowercase.
2. Register with uppercase username -> stored lowercase.
3. Login with uppercase email -> succeeds.
4. Login with uppercase username -> succeeds.
5. Invalid password rejected by policy.
6. Customer cannot view another customer order.
7. Branch manager cannot view unassigned branch orders.
8. Super admin can access restricted admin routes.

## Implementation Notes
- Keep auth controllers thin.
- Use dedicated actions/services for registration and login.
- Keep role seeding separate from business seed data.
