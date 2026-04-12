# Architecture And Spec Companion

## Purpose
- هذا الملف ليس prompt بديلًا.
- هذا الملف companion spec.
- يستخدم مع الملف الأساسي.
- يوضح architecture boundaries.
- يوضح module responsibilities.
- يوضح data ownership.
- يوضح backend contracts المطلوبة.

## Product Intent
- النظام هو منصة مطعم أونلاين عربية/مصرية.
- الهدف هو backend API متقدم.
- العملاء المستقبلية قد تكون:
- `web client`
- `Android app`
- `iOS app`
- التطبيق الحالي المطلوب الآن:
- `backend only`

## Architectural Principles
- API-first.
- Domain-oriented design.
- Clear separation of concerns.
- Business logic outside controllers.
- Authorization explicit and testable.
- Validation centralized in request objects and domain services.
- Pricing logic isolated from transport logic.
- State transitions explicit and auditable.

## Suggested Top-Level Structure
- `backend/app/Modules`
- `backend/app/Shared`
- `backend/app/Providers`
- `backend/config`
- `backend/database`
- `backend/routes`
- `backend/tests`

## Suggested Module List
- `Auth`
- `Users`
- `Profiles`
- `Addresses`
- `Wallet`
- `GiftCards`
- `Branches`
- `DeliveryZones`
- `Categories`
- `Tags`
- `Products`
- `ProductMedia`
- `Variants`
- `Addons`
- `Cart`
- `Orders`
- `Coupons`
- `Payments`
- `Reviews`
- `Notifications`
- `Settings`
- `DynamicPages`
- `Admin`
- `AuditLogs`

## Suggested Internal Module Layout
- `Controllers`
- `Requests`
- `Resources`
- `Services`
- `Repositories`
- `DTOs`
- `Policies`
- `Actions`
- `Enums`
- `Exceptions`
- `Support`

## Shared Layer Suggestions
- `Shared/Http`
- `Shared/Responses`
- `Shared/Concerns`
- `Shared/Enums`
- `Shared/Traits`
- `Shared/Services`
- `Shared/Support`
- `Shared/Exceptions`
- `Shared/ValueObjects`

## Why Modular Laravel Here
- كثافة المتطلبات كبيرة.
- الموديولات كثيرة.
- قواعد التسعير معقدة.
- الـ authorization granular.
- الإدارة متعددة الفروع تحتاج boundaries واضحة.
- فصل الدومينات يجعل التطوير والاختبار أسهل.

## Request Flow
1. Client sends HTTP request.
2. Route resolves versioned endpoint.
3. Middleware authenticates and normalizes request context.
4. `FormRequest` validates structure and primitive rules.
5. Controller delegates to `Service` or `Action`.
6. Service calls repositories and domain helpers.
7. Domain rules run.
8. Database transactions protect multi-write flows.
9. Events fire for side effects.
10. API Resource formats final JSON response.

## Response Philosophy
- Keep response contracts stable.
- Keep successful payloads predictable.
- Keep metadata consistent.
- Keep pagination schema consistent.
- Keep business calculation fields explicit.
- Return human-safe localized messages.
- Return machine-safe structured errors.

## API Versioning Strategy
- All routes begin with `/api/v1`.
- Version is grouped at route file and namespace level.
- New major behavioral changes go to `/api/v2`.
- Minor additions should be backward-compatible.
- Deprecation must be documented.

## Route Group Strategy
- `/api/v1/auth/*`
- `/api/v1/profile/*`
- `/api/v1/branches/*`
- `/api/v1/menu/*`
- `/api/v1/products/*`
- `/api/v1/cart/*`
- `/api/v1/orders/*`
- `/api/v1/coupons/*`
- `/api/v1/wallet/*`
- `/api/v1/gift-cards/*`
- `/api/v1/reviews/*`
- `/api/v1/settings/*`
- `/api/v1/pages/*`
- `/api/v1/admin/*`

## Suggested Data Model Domains
- Identity domain.
- Catalog domain.
- Ordering domain.
- Fulfillment domain.
- Billing domain.
- Administration domain.
- Configuration domain.
- Communication domain.

## Identity Domain
- Users.
- Admin accounts if same user model, differentiated by roles.
- Access tokens.
- Password resets if implemented.
- Email verification if needed.
- Phone verification if needed.
- Device sessions metadata if tracked.

## Catalog Domain
- Categories.
- Tags.
- Products.
- Product translations if not using JSON columns.
- Product media.
- Product variants or sizes.
- Add-on groups.
- Add-on options.
- Branch availability pivots.
- Best-seller ranking metadata.

## Ordering Domain
- Cart.
- Cart items.
- Order.
- Order items.
- Order item add-ons.
- Order status transitions.
- Checkout calculations.
- Grace-period edit/cancel rules.

## Fulfillment Domain
- Branches.
- Delivery zones.
- Delivery assignments.
- Branch hours.
- Availability windows if needed later.

## Billing Domain
- Coupon definitions.
- Coupon usage records.
- Wallet balances.
- Wallet transactions.
- Gift cards.
- Gift card redemptions.
- Payment attempts.
- Payment method adapters.

## Configuration Domain
- Settings.
- Feature toggles.
- Currency settings.
- Theme JSON storage.
- Localization settings.
- Mail settings references.
- Notification channel settings.

## Communication Domain
- Notifications.
- Broadcast events if enabled.
- Email jobs.
- Audit events.

## Admin Domain
- Roles.
- Permissions.
- Admin-only reports.
- Moderation actions.
- Content management endpoints.

## Core Entity Notes
- `User` is central but should not own every concern directly.
- `Branch` is central to ordering constraints.
- `Product` is central to catalog and checkout calculations.
- `Order` is central to financial and operational workflows.
- `Coupon` logic must remain isolated because it has many edge cases.
- `WalletTransaction` should be append-only friendly.

## Suggested Relationship Overview
```text
User
 ├─ hasMany Addresses
 ├─ hasOne Wallet
 ├─ hasMany Orders
 ├─ hasMany Reviews
 ├─ hasMany WalletTransactions
 └─ belongsToMany Roles

Branch
 ├─ hasMany DeliveryZones
 ├─ belongsToMany Products
 └─ hasMany Orders

Category
 ├─ belongsTo Category (parent)
 ├─ hasMany Categories (children)
 └─ belongsToMany Products

Product
 ├─ belongsToMany Categories
 ├─ belongsToMany Tags
 ├─ belongsToMany Branches
 ├─ hasMany ProductMedia
 ├─ hasMany ProductSizes
 ├─ hasMany AddonGroups
 ├─ hasMany Reviews
 └─ hasMany OrderItems

Order
 ├─ belongsTo User
 ├─ belongsTo Branch
 ├─ belongsTo Address
 ├─ hasMany OrderItems
 ├─ hasMany StatusLogs
 ├─ mayHave PaymentRecord
 └─ mayUse Coupon
```

## Product Modeling Decision
- Do not keep product pricing in one flat field only.
- Keep a `base_price` only if it has meaning.
- If sizes are required for many products, create explicit size entities.
- Add-on pricing should support overrides per size.
- Snapshot final order item pricing at checkout.

## Product Availability Decision
- Global product enable state is not enough.
- Add per-branch availability support.
- Support an `all_branches` mode.
- Support explicit branch whitelist mode.
- Validate at cart update and checkout.

## Category Strategy
- Use adjacency list first unless nested sets become necessary.
- Add `parent_id`.
- Add sort/order field if needed.
- Add slug if clients need stable category URLs later.
- Keep translatable names.

## Tag Strategy
- Tags are lightweight metadata.
- Keep them many-to-many.
- Allow search/filter indexing if needed.

## Media Strategy
- Use a dedicated product media table.
- Separate primary image from gallery logic if simpler.
- Track media type.
- Track storage disk/path.
- Track external URL.
- Track sort order.
- Keep `is_primary` explicit.

## Review Strategy
- Keep verified purchase status derivable or snapshotted.
- Keep anonymity flag explicit.
- Keep moderation fields explicit.
- Optionally keep approval state if moderation flow requires it.

## Profile Strategy
- Public profile is API data, not a frontend page.
- Suggested fields:
- `username`
- `avatar_path`
- `bio` if desired
- `is_public_profile`
- per-metric visibility flags
- monthly/yearly ranking may be computed or cached

## Address Strategy
- Separate addresses from users.
- Support multiple saved addresses.
- Support one default address.
- Keep structured location fields.
- Allow optional landmarks and notes.
- Sanitize notes.

## Wallet Strategy
- Keep a wallet table for current balance.
- Keep a wallet transaction ledger for history.
- Never rely on balance-only writes without history.
- Use transactions and row locking where needed.

## Coupon Strategy
- Keep coupon definition separate from usage tracking.
- Track per-user uses.
- Track global uses.
- Track eligible scopes.
- Track delivery applicability.
- Track amount vs percentage mode.
- Track cap.
- Track validity windows.

## Order Strategy
- Orders need immutable pricing snapshots.
- Order item names should be snapshotted.
- Order item prices should be snapshotted.
- Selected size and add-ons should be snapshotted.
- Delivery fee should be snapshotted.
- Coupon result should be snapshotted.
- Wallet deduction should be snapshotted.

## Status Transition Strategy
- Keep current order status on the order.
- Keep a separate transition log.
- Log actor where possible.
- Log reason where useful.
- Log timestamps.
- Prevent invalid transitions.

## Grace Period Implementation Notes
- Store `grace_period_ends_at` on the order.
- Use settings-driven default duration.
- Check this value in cancel/edit policies and services.
- Do not depend only on frontend timing assumptions.

## Branch-Specific Permissions
- Branch managers should not see everything by default.
- Support scoped abilities.
- Examples:
- `orders.view.any`
- `orders.view.branch`
- `orders.update.branch`
- `branches.manage`
- `products.manage.branch`
- Represent branch scope either through permission conventions or policy context checks.

## Configuration Storage Strategy
- Key-value settings table is acceptable.
- Add typed casting support at service layer.
- Group settings by domain:
- `general`
- `currency`
- `auth`
- `orders`
- `wallet`
- `gift_cards`
- `mail`
- `notifications`
- `theme`
- `features`

## Theme JSON Rule
- Treat theme JSON as raw configuration payload.
- Validate schema if possible.
- Store versions.
- Support import/export.
- Do not render UI from it here.

## Search And Filtering Strategy
- Keep filter logic close to query builders.
- Whitelist sortable fields.
- Whitelist filterable fields.
- Avoid unsafe dynamic column sorting.
- Add indexes for heavy filters.

## Performance Baseline
- Redis for caching and queues.
- Eager loading on menu/catalog endpoints.
- Cached settings resolution.
- Cached branch-category-product aggregates where appropriate.
- Query profiling in development only.

## Event-Driven Candidates
- Order created.
- Order status changed.
- Wallet credited.
- Wallet debited.
- Gift card redeemed.
- Coupon consumed.
- Review created.
- Review moderated.
- Settings changed.

## Job Candidates
- Send emails.
- Dispatch push notifications.
- Rebuild best-seller caches.
- Generate reports.
- Process slow media tasks.

## Documentation Mapping
- `plans/00` covers high-level overview.
- `plans/01` covers schema and Eloquent relationships.
- `plans/02` covers API routes and versioning.
- `plans/03` covers auth and authorization.
- `plans/04` covers branches and menus.
- `plans/05` covers products, sizes, and add-ons.
- `plans/06` covers reviews, ratings, tags, and best sellers.
- `plans/07` covers users, profiles, addresses, wallet, and gift cards.
- `plans/08` covers cart, orders, checkout, shipping, and coupons.
- `plans/09` covers admin, roles, permissions, and notifications.
- `plans/10` covers security and testing.
- `plans/11` covers localization.
- `plans/12` covers scalability and future mobile readiness.

## Anti-Pattern Warnings
- Do not place pricing math in controllers.
- Do not place authorization decisions in JavaScript.
- Do not expose internal admin fields to public APIs.
- Do not rely on frontend to enforce business rules.
- Do not mix branch validation with presentation logic.
- Do not silently auto-fix invalid cart states at order time without clear response messaging.

## Success Shape
- A downstream coding agent can implement from this spec without inventing major architecture decisions.
- Module boundaries stay understandable.
- Data contracts stay stable.
- Backend-only scope remains enforced.
