# API Endpoints And Versioning

## Versioning Rules
- All public endpoints start with `/api/v1`.
- Future breaking changes go to `/api/v2`.
- Do not mix versionless public APIs with versioned APIs.

## Response Envelope
```json
{
  "success": true,
  "message": "Localized message",
  "data": {},
  "meta": {}
}
```

## Error Shape
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field": ["The field is required."]
  }
}
```

## Auth Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| POST | /api/v1/auth/register | Create customer account |
| POST | /api/v1/auth/login | Login by email or username |
| POST | /api/v1/auth/logout | Revoke current token |
| POST | /api/v1/auth/logout-all | Revoke all tokens |
| GET | /api/v1/auth/me | Current user profile summary |

## Profile Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/profile | Authenticated profile |
| PUT | /api/v1/profile | Update authenticated profile |
| GET | /api/v1/profiles/{username} | Public profile |
| PUT | /api/v1/profile/privacy | Update privacy settings |

## Address Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/addresses | List addresses |
| POST | /api/v1/addresses | Create address |
| PUT | /api/v1/addresses/{id} | Update address |
| DELETE | /api/v1/addresses/{id} | Delete address |
| POST | /api/v1/addresses/{id}/default | Set default |

## Branch Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/branches | Public branch list |
| GET | /api/v1/branches/{id} | Public branch detail |
| GET | /api/v1/branches/{id}/delivery-zones | Delivery zone list |

## Menu Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/categories | Public categories tree |
| GET | /api/v1/tags | Public tags list |
| GET | /api/v1/products | Public product listing |
| GET | /api/v1/products/{id} | Public product detail |
| GET | /api/v1/products/best-sellers | Best sellers listing |

## Cart Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/cart | Get current cart |
| POST | /api/v1/cart/items | Add item |
| PUT | /api/v1/cart/items/{id} | Update item |
| DELETE | /api/v1/cart/items/{id} | Remove item |
| DELETE | /api/v1/cart | Clear cart |
| POST | /api/v1/cart/coupon | Preview/apply coupon |

## Order Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| POST | /api/v1/orders/checkout | Create order from cart |
| GET | /api/v1/orders | List customer orders |
| GET | /api/v1/orders/{id} | Order detail |
| POST | /api/v1/orders/{id}/cancel | Customer cancel during grace period |
| PUT | /api/v1/orders/{id}/notes | Customer update notes during grace period |

## Review Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| POST | /api/v1/reviews | Create review |
| GET | /api/v1/products/{id}/reviews | Public review list |

## Wallet Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/wallet | Balance summary |
| GET | /api/v1/wallet/transactions | Wallet ledger |
| POST | /api/v1/wallet/redeem | Redeem gift card |

## Settings/Public Content Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| GET | /api/v1/settings/public | Public settings bundle |
| GET | /api/v1/pages/{slug} | Public dynamic page |

## Admin Auth Endpoints
| Method | URI | Purpose |
| --- | --- | --- |
| POST | /api/v1/admin/auth/login | Admin login |
| POST | /api/v1/admin/auth/logout | Admin logout |

## Admin Branch Endpoints
- `GET /api/v1/admin/branches`
- `POST /api/v1/admin/branches`
- `GET /api/v1/admin/branches/{id}`
- `PUT /api/v1/admin/branches/{id}`
- `DELETE /api/v1/admin/branches/{id}`
- `GET /api/v1/admin/branches/{id}/delivery-zones`
- `POST /api/v1/admin/delivery-zones`
- `PUT /api/v1/admin/delivery-zones/{id}`
- `DELETE /api/v1/admin/delivery-zones/{id}`

## Admin Catalog Endpoints
- `GET /api/v1/admin/categories`
- `POST /api/v1/admin/categories`
- `PUT /api/v1/admin/categories/{id}`
- `DELETE /api/v1/admin/categories/{id}`
- `GET /api/v1/admin/tags`
- `POST /api/v1/admin/tags`
- `PUT /api/v1/admin/tags/{id}`
- `DELETE /api/v1/admin/tags/{id}`
- `GET /api/v1/admin/products`
- `POST /api/v1/admin/products`
- `GET /api/v1/admin/products/{id}`
- `PUT /api/v1/admin/products/{id}`
- `DELETE /api/v1/admin/products/{id}`

## Admin Product Option Endpoints
- `POST /api/v1/admin/products/{id}/sizes`
- `PUT /api/v1/admin/sizes/{id}`
- `DELETE /api/v1/admin/sizes/{id}`
- `POST /api/v1/admin/products/{id}/addon-groups`
- `PUT /api/v1/admin/addon-groups/{id}`
- `DELETE /api/v1/admin/addon-groups/{id}`
- `POST /api/v1/admin/addon-groups/{id}/options`
- `PUT /api/v1/admin/addon-options/{id}`
- `DELETE /api/v1/admin/addon-options/{id}`

## Admin Order Endpoints
- `GET /api/v1/admin/orders`
- `GET /api/v1/admin/orders/{id}`
- `POST /api/v1/admin/orders/{id}/status`
- `POST /api/v1/admin/orders/{id}/assign-delivery`
- `POST /api/v1/admin/orders/{id}/refund`

## Admin Coupon Endpoints
- `GET /api/v1/admin/coupons`
- `POST /api/v1/admin/coupons`
- `GET /api/v1/admin/coupons/{id}`
- `PUT /api/v1/admin/coupons/{id}`
- `DELETE /api/v1/admin/coupons/{id}`

## Admin Gift Card Endpoints
- `GET /api/v1/admin/gift-cards`
- `POST /api/v1/admin/gift-cards`
- `GET /api/v1/admin/gift-cards/{id}`
- `PUT /api/v1/admin/gift-cards/{id}`
- `DELETE /api/v1/admin/gift-cards/{id}`

## Admin Review Endpoints
- `GET /api/v1/admin/reviews`
- `PUT /api/v1/admin/reviews/{id}`
- `DELETE /api/v1/admin/reviews/{id}`
- `POST /api/v1/admin/reviews/manual`

## Admin Settings Endpoints
- `GET /api/v1/admin/settings`
- `PUT /api/v1/admin/settings/{group}`
- `POST /api/v1/admin/settings/theme/import`
- `GET /api/v1/admin/settings/theme/export`

## Admin Dynamic Pages Endpoints
- `GET /api/v1/admin/pages`
- `POST /api/v1/admin/pages`
- `GET /api/v1/admin/pages/{id}`
- `PUT /api/v1/admin/pages/{id}`
- `DELETE /api/v1/admin/pages/{id}`

## Admin Roles And Permissions Endpoints
- `GET /api/v1/admin/roles`
- `POST /api/v1/admin/roles`
- `PUT /api/v1/admin/roles/{id}`
- `DELETE /api/v1/admin/roles/{id}`
- `GET /api/v1/admin/permissions`
- `POST /api/v1/admin/admin-users`
- `PUT /api/v1/admin/admin-users/{id}/roles`

## Query Parameters For Product List
- `branch_id`
- `category_id`
- `tag`
- `search`
- `sort=price_asc|price_desc|best_seller|rating_desc`
- `min_price`
- `max_price`
- `page`
- `per_page`

## Headers
- `Accept: application/json`
- `Accept-Language: ar` or `en`
- `Authorization: Bearer {token}`

## Authz Strategy By Route Type
- Public routes: no auth.
- Customer routes: auth token.
- Admin routes: auth token + role/permission checks.
- Branch-scoped admin routes: auth token + permission + branch scope.

## Versioning File Layout
```text
routes/
 ├─ api.php
app/
 └─ Modules/
    └─ Shared/
       └─ Http/
          └─ Controllers/
```

## Documentation Notes
- Each endpoint should document request body.
- Each endpoint should document validation rules.
- Each endpoint should document success response.
- Each endpoint should document common failure responses.
