# Full Project Overview

## Objective
- Build a `Laravel 13` backend-only platform for an Egyptian/Arabic online restaurant.
- Keep the current scope strictly inside `backend/`.
- Serve future clients through versioned JSON APIs.
- Prioritize security, modularity, testability, and future mobile reuse.

## Hard Scope
- Build `RESTful JSON APIs`.
- Build backend services and business rules.
- Build admin-facing API capabilities only.
- Build no frontend, no Blade, no Filament, no Livewire.
- Build no Android and no iOS projects now.

## Business Goals
- Support Arabic as the primary language.
- Support English as the secondary language.
- Support one branch or multiple branches.
- Support advanced product options and pricing rules.
- Support complex checkout, coupons, wallet, gift cards, and order tracking.
- Support configurable settings and dynamic content through backend APIs.

## Technical Baseline
| Item | Decision |
| --- | --- |
| Framework | Laravel 13 |
| PHP | 8.3+ |
| DB | SQLite by default for local simplicity |
| Queue | Redis-ready, DB fallback for local |
| Cache | Redis-ready, file/database fallback locally |
| Auth | Laravel Sanctum access tokens |
| Permissions | Spatie Laravel Permission |
| API Style | `/api/v1/*` JSON only |
| Testing | PHPUnit/Pest compatible, feature-first |

## Target Consumers
- Website client in the future.
- Android app in the future.
- iOS app in the future.
- Internal admin panel UI in the future.
- Customer support tools in the future.

## Domain Map
```text
Identity
 ├─ Auth
 ├─ Users
 ├─ Profiles
 └─ Addresses

Commerce
 ├─ Branches
 ├─ Delivery Zones
 ├─ Categories
 ├─ Tags
 ├─ Products
 ├─ Variants / Sizes
 ├─ Addon Groups
 ├─ Cart
 ├─ Orders
 ├─ Coupons
 ├─ Wallet
 └─ Gift Cards

Platform
 ├─ Settings
 ├─ Dynamic Pages
 ├─ Notifications
 ├─ Roles / Permissions
 └─ Audit Logs
```

## Main User Roles
- Customer.
- Super Admin.
- Branch Manager.
- Orders Manager.
- Support Agent.
- Content Moderator.
- Delivery Coordinator.

## Main Customer Flows
1. Register or login.
2. Browse branches and menu.
3. Add configured products to cart.
4. Select branch and delivery zone.
5. Apply coupon if eligible.
6. Use wallet if desired.
7. Checkout and create order.
8. Track order status.
9. Submit verified review after fulfillment.

## Main Admin Flows
1. Create/manage branches.
2. Create/manage categories, tags, products, sizes, and add-ons.
3. Control product branch availability.
4. Create/manage coupons and gift cards.
5. Control general settings and feature toggles.
6. Review and update order statuses.
7. Assign delivery person details.
8. Moderate reviews.
9. Manage roles and permissions.

## Core Non-Functional Requirements
- Secure by default.
- Scalable code organization.
- Small reusable classes.
- Test coverage for critical flows.
- JSON-only error handling.
- Stable API contracts.
- Localizable content.
- Consistent monetary calculations.

## Delivery Decisions
- Use `backend/` as the Laravel root.
- Use `plans/` in repo root as implementation documentation.
- Use SQLite for local development to reduce setup friction.
- Keep database design MySQL-compatible where possible.
- Prepare storage/CDN abstraction for uploaded files.

## Module Strategy
- Start with shared foundations.
- Build auth and user modules first.
- Build branch, settings, and catalog foundations next.
- Build cart and order logic after catalog validation exists.
- Build wallet, coupons, and gift cards after order pricing services exist.
- Build reviews, notifications, and dynamic pages after core commerce flows.

## Shared Conventions
- `snake_case` database columns.
- UUIDs optional later, numeric IDs acceptable for v1 unless otherwise required.
- Lowercase normalization for email and username.
- API resources for response formatting.
- Form requests for request validation.
- Services for business rules.
- Policies for authorization.
- Enums for statuses and important types.

## Order Lifecycle Overview
```text
created
  -> pending
    -> confirmed
      -> preparing
        -> out_for_delivery
          -> delivered
    -> cancelled
    -> refunded
```

## Grace Period Rule
- Orders remain customer-editable/cancelable for `2 minutes`.
- This value should be configurable.
- After grace-period expiry, customer direct cancellation is blocked.
- Staff transitions remain policy-controlled.

## Pricing Overview
- Product may have a base price.
- Size may override effective price.
- Add-ons may add extra amounts.
- Coupons may affect products and/or delivery depending on rules.
- Wallet may partially or fully reduce payable amount.
- Delivery fee depends on selected branch and delivery zone.

## Security Overview
- Sanctum token-based auth.
- Rate limits on sensitive endpoints.
- Sanitization for free-text fields.
- Strict upload validation.
- Spatie permissions for RBAC.
- Audit logs for privileged actions.

## Localization Overview
- `Accept-Language: ar|en`.
- Content fields stored in translation-friendly format.
- Validation and API messages localizable.
- Arabic-first business copy.

## Storage Overview
- Use Laravel storage abstraction.
- Keep a dedicated upload disk and URL prefix.
- Allow future CDN swap without changing domain logic.
- Save only references/paths in DB.

## Initial Milestones
1. Plans documentation.
2. Laravel project scaffold.
3. Core packages and settings.
4. Auth and roles.
5. Branches and catalog.
6. Cart, orders, coupons, wallet.
7. Reviews, notifications, docs, tests.

## Definition Of Done
- Repo contains `plans/00` through `plans/12`.
- Repo contains working `backend/` Laravel 13 project.
- Core APIs exist and return JSON.
- Critical flows have tests.
- Local server can be exercised with `curl`.
- No frontend artifacts exist in the implementation.
