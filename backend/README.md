# Online Restaurant Backend

Laravel 13 API-only backend for an Arabic/Egyptian online restaurant platform. This project is strictly backend-only and exposes versioned JSON APIs under `/api/v1`.

## Stack

- Laravel 13
- PHP 8.3+
- SQLite by default for local development
- Laravel Sanctum access tokens
- Spatie Laravel Permission
- Telescope, Debugbar, Horizon, Octane scaffolding

## Backend Scope

- Multi-branch restaurant support
- Delivery zones and branch-specific product availability
- Products, categories, tags, sizes, and add-ons
- Product media gallery records with uploaded paths and external video URLs
- Cart, checkout, coupons, wallet, and gift cards
- Reviews, profiles, addresses, and dynamic pages
- Database notifications and admin audit logs
- Admin-only CRUD APIs with granular permissions

## Local Setup

```powershell
cd backend
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --host=127.0.0.1 --port=8000
```

## Seeded Demo Accounts

- `superadmin` / `Password1!`
- `branchmanager` / `Password1!`
- `democustomer` / `Password1!`

## Seeded Demo Data

- Branches:
  - `cairo-branch`
  - `giza-branch`
- Product:
  - `hekaya-pizza`
- Coupons:
  - `SAVE10`
  - `FREEDEL`
- Gift card:
  - `GIFT100`
- Dynamic page:
  - `terms-of-service`

## Main API Groups

- Public:
  - `GET /api/v1/settings/public`
  - `GET /api/v1/branches`
  - `GET /api/v1/categories`
  - `GET /api/v1/products`
  - `GET /api/v1/products/{product}`
  - `GET /api/v1/pages/{slug}`
  - `GET /api/v1/profiles/{username}`
- Auth:
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
  - `POST /api/v1/auth/logout`
- Customer:
  - `GET /api/v1/profile`
  - `GET|POST|PATCH|DELETE /api/v1/addresses`
  - `GET /api/v1/cart`
  - `POST /api/v1/cart/items`
  - `POST /api/v1/orders/checkout`
  - `GET /api/v1/orders`
  - `GET /api/v1/notifications`
  - `PATCH /api/v1/notifications/{id}/read`
  - `GET /api/v1/wallet`
  - `POST /api/v1/wallet/redeem`
- Admin:
  - `GET /api/v1/admin/orders`
  - `PATCH /api/v1/admin/orders/{order}/status`
  - `GET /api/v1/admin/audit-logs`
  - `POST /api/v1/admin/uploads`
  - CRUD for branches, delivery zones, categories, tags, products, coupons, gift cards, pages, reviews, roles, settings

## Example cURL

Login:

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{\"email_or_username\":\"superadmin\",\"password\":\"Password1!\",\"device_name\":\"curl\"}"
```

Public products:

```bash
curl http://127.0.0.1:8000/api/v1/products -H "Accept: application/json"
```

Checkout flow outline:

1. Login and store the returned access token.
2. Add an item to cart using `POST /api/v1/cart/items`.
3. Preview coupon using `POST /api/v1/cart/preview-coupon`.
4. Submit checkout using `POST /api/v1/orders/checkout`.

## Testing

```powershell
php artisan test
php vendor/bin/phpstan analyse --memory-limit=1G
```

Current automated coverage includes:

- auth registration and token flow
- public catalog endpoints
- cart and checkout
- customer notification listing and read flow
- admin order management
- admin audit log visibility
- admin tags, delivery zones, uploads, and product media
- coupon evaluation rules

## Storage / CDN

- Default uploads disk: `uploads`
- Physical path: `storage/app/uploads`
- Public CDN-style URL base: `/cdn`
- Config key: `UPLOADS_CDN_URL`

## Notes

- Local development defaults to SQLite for simplicity.
- Access tokens are the primary auth mode for future website/mobile consumers.
- No frontend artifacts are part of this backend implementation.
- `PHPStan` level 9 is wired through `phpstan.neon.dist` and currently runs clean using the generated `phpstan-baseline.neon`.
