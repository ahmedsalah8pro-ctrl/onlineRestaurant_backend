# Execution Checklist

## Purpose
- This file is an execution control layer.
- It tells the downstream coding agent what to do first.
- It minimizes skipped steps.
- It keeps the run backend-only.

## Global Execution Rules
1. Stay strictly inside backend scope.
2. Do not create frontend artifacts.
3. Do not create mobile app artifacts.
4. Do not switch to UI work.
5. Do not skip planning documents.
6. Do not skip tests.
7. Do not skip documentation.
8. Do not hide assumptions.

## Phase 1: Repository Grounding
1. Inspect the workspace.
2. Confirm whether the root is empty or already contains files.
3. Confirm whether Git is initialized.
4. Confirm PHP availability if command execution is allowed.
5. Confirm Composer availability if command execution is allowed.
6. Confirm there is no conflicting frontend scaffold.
7. Keep notes of any unexpected files.

## Phase 2: Internal Planning Docs First
1. Create `plans/`.
2. Create `plans/00-full-project-overview.md`.
3. Create `plans/01-database-schema-and-models.md`.
4. Create `plans/02-api-endpoints-and-versioning.md`.
5. Create `plans/03-authentication-and-authorization.md`.
6. Create `plans/04-branches-and-menus-system.md`.
7. Create `plans/05-products-categories-sizes-addons.md`.
8. Create `plans/06-reviews-ratings-tags-best-sellers.md`.
9. Create `plans/07-users-profiles-addresses-wallet-giftcards.md`.
10. Create `plans/08-cart-orders-checkout-shipping-coupons.md`.
11. Create `plans/09-admin-roles-permissions-notifications.md`.
12. Create `plans/10-security-best-practices-and-testing.md`.
13. Create `plans/11-localization-arabic-english.md`.
14. Create `plans/12-scalability-and-future-mobile.md`.
15. Ensure total planning documentation exceeds 1000 useful lines.
16. Keep every planning file backend-only.

## Phase 3: Scaffold Laravel Backend
1. Create `backend/` Laravel project using Laravel 13.
2. Confirm generated clean Laravel structure.
3. Initialize Git if needed.
4. Verify `.gitignore`.
5. Keep project portable.
6. Do not add machine-specific path assumptions.

## Phase 4: Install Core Packages
1. Install `laravel/sanctum`.
2. Install `spatie/laravel-permission`.
3. Install `laravel/horizon`.
4. Install `laravel/telescope` for development.
5. Install debug tooling only for non-production if compatible.
6. Install `laravel/octane` only if aligned with runtime strategy.
7. Add static analysis tooling.
8. Add formatter/lint tooling if required by the project standard.

## Phase 5: Configure Environment Example
1. Prepare `.env.example`.
2. Add app settings.
3. Add database settings.
4. Add Redis settings.
5. Add queue settings.
6. Add Sanctum-related settings if needed.
7. Add mail settings.
8. Add broadcasting settings.
9. Add feature-toggle settings.
10. Add any operational defaults.

## Phase 6: Establish API Foundations
1. Create API version namespace strategy.
2. Group routes under `/api/v1`.
3. Create common API response helpers or patterns.
4. Ensure exception rendering is JSON-friendly.
5. Add localization middleware or request-resolution strategy.
6. Add auth middleware strategy for protected endpoints.

## Phase 7: Database Foundation
1. Design migrations before coding models.
2. Create base user-related migrations.
3. Create branches and delivery zones migrations.
4. Create categories and tags migrations.
5. Create products and media migrations.
6. Create sizes and add-on migrations.
7. Create carts and cart items migrations if persistent cart storage is used.
8. Create orders and order items migrations.
9. Create order status history migrations.
10. Create coupon and usage tracking migrations.
11. Create wallet and wallet transaction migrations.
12. Create gift card and redemption migrations.
13. Create settings migrations.
14. Create dynamic pages migrations.
15. Create review migrations.
16. Create audit log migrations if included.

## Phase 8: Eloquent Model Layer
1. Create models per domain.
2. Define relationships explicitly.
3. Define casts explicitly.
4. Add accessors/mutators only where justified.
5. Normalize lowercase fields safely.
6. Keep models concise.
7. Avoid large business methods inside models.

## Phase 9: Authorization Layer
1. Configure Spatie roles and permissions.
2. Create seed strategy for super admin and baseline roles.
3. Add policies for protected resources.
4. Add gates for broader abilities.
5. Implement branch-aware authorization checks.
6. Add tests for authorization boundaries.

## Phase 10: Auth Module
1. Create registration endpoint.
2. Create login endpoint.
3. Create logout endpoint.
4. Create token revocation flows.
5. Implement lowercase normalization.
6. Implement password rules.
7. Implement auth tests.

## Phase 11: Users, Profiles, And Addresses
1. Create user profile endpoints.
2. Create address CRUD endpoints.
3. Create default address handling.
4. Create public profile read endpoint.
5. Add privacy controls.
6. Add profile statistics service.

## Phase 12: Branches And Delivery Zones
1. Create branch CRUD endpoints.
2. Create delivery zone CRUD endpoints.
3. Add branch availability rules.
4. Add shipping calculation strategy.
5. Add tests for branch-product compatibility.

## Phase 13: Catalog Module
1. Create category CRUD endpoints.
2. Create tag CRUD endpoints.
3. Create product CRUD endpoints.
4. Create product media handling endpoints.
5. Create size/variant endpoints.
6. Create add-on group and option endpoints.
7. Add branch availability attachment logic.
8. Add search/filter/sort strategy.

## Phase 14: Cart Module
1. Create cart fetch endpoint.
2. Create add item endpoint.
3. Create update item endpoint.
4. Create remove item endpoint.
5. Create clear cart endpoint.
6. Compute line identity by configuration.
7. Validate size/add-on compatibility.
8. Validate branch compatibility.
9. Validate stock if enabled.

## Phase 15: Coupon Module
1. Create coupon CRUD endpoints for admin.
2. Create coupon apply/preview logic.
3. Create eligibility evaluation service.
4. Enforce max discount caps.
5. Enforce per-user usage limits.
6. Enforce global usage limits.
7. Enforce product/category scope logic.
8. Enforce delivery inclusion rules.

## Phase 16: Wallet And Gift Cards
1. Create wallet balance endpoint.
2. Create wallet history endpoint.
3. Create gift card generation endpoints for admins.
4. Create gift card redeem endpoint.
5. Add transactional credit/debit flows.
6. Add tests for single-use and balance updates.

## Phase 17: Orders And Checkout
1. Create checkout endpoint.
2. Validate cart state at checkout.
3. Snapshot final pricing.
4. Snapshot selected branch and zone.
5. Snapshot coupon result.
6. Snapshot wallet usage.
7. Create order detail endpoint.
8. Create order list endpoint.
9. Create cancel-within-grace-period flow.
10. Create note-update-within-grace-period flow if kept in scope.

## Phase 18: Order Operations
1. Create staff/admin order review endpoints.
2. Create order status transition actions.
3. Create delivery assignment action.
4. Create status history output.
5. Add transition policy checks.
6. Add transition tests.

## Phase 19: Reviews
1. Create review creation endpoint.
2. Require verified purchase eligibility.
3. Allow anonymous flag.
4. Create moderation endpoints.
5. Add tests for eligibility and moderation.

## Phase 20: Settings And Dynamic Pages
1. Create settings read/update endpoints.
2. Separate settings by group or domain.
3. Create dynamic pages CRUD endpoints.
4. Create theme JSON import/export endpoints or service logic.
5. Validate payloads carefully.

## Phase 21: Notifications
1. Configure database notifications.
2. Configure mail notification channels.
3. Add queued notifications where useful.
4. Add optional broadcasting hooks if kept in scope.

## Phase 22: Security Hardening Pass
1. Review rate limits.
2. Review policy coverage.
3. Review free-text sanitization.
4. Review upload validation.
5. Review token flows.
6. Review exception JSON shape.
7. Review sensitive settings protection.
8. Review audit logging for privileged actions.

## Phase 23: Testing Pass
1. Run unit tests.
2. Run feature tests.
3. Add missing regression tests.
4. Test auth normalization.
5. Test branch restrictions.
6. Test coupon edge cases.
7. Test wallet/gift-card flows.
8. Test order grace period.
9. Test review eligibility.
10. Test localization-sensitive responses if implemented.

## Phase 24: Documentation Pass
1. Create project `README.md`.
2. Document setup steps.
3. Document env variables.
4. Document queue and Redis usage.
5. Document authentication flow.
6. Document API versioning.
7. Document key endpoints.
8. Document testing commands.
9. Document assumptions.

## Required Output Behavior
1. Show terminal commands when the user explicitly asks for them.
2. Keep file changes organized.
3. Avoid giant undifferentiated files.
4. Prefer reusable services.
5. Prefer explicit comments only where necessary.
6. Prefer backend-safe defaults over speculative convenience.

## Things The Downstream Agent Must Not Do
1. Must not create frontend code.
2. Must not create Blade files.
3. Must not create Livewire files.
4. Must not create Filament resources.
5. Must not create `android/` now.
6. Must not create `ios/` now.
7. Must not discuss CSS/JS framework selection.
8. Must not rely on frontend validation as security.

## Completion Gate
1. `plans/` exists with files `00` through `12`.
2. `backend/` exists.
3. Core packages are configured.
4. Main domains are implemented.
5. Tests exist.
6. Documentation exists.
7. Backend-only scope is preserved.
