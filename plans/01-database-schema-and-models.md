# Database Schema And Models

## Goals
- Keep schema normalized enough for maintainability.
- Keep schema practical for Laravel development.
- Preserve MySQL compatibility while using SQLite locally.
- Support branch-aware catalog and checkout rules.

## Key Tables
| Domain | Tables |
| --- | --- |
| Identity | users, personal_access_tokens, password_reset_tokens |
| Profiles | user_profiles, user_addresses, user_secondary_phones |
| Branches | branches, delivery_zones |
| Catalog | categories, tags, products, product_media, product_sizes, addon_groups, addon_options |
| Pivots | category_product, product_tag, branch_product, addon_group_product_size, addon_option_product_size |
| Cart | carts, cart_items, cart_item_addons |
| Orders | orders, order_items, order_item_addons, order_status_logs |
| Billing | coupons, coupon_usages, wallets, wallet_transactions, gift_cards, gift_card_redemptions |
| Platform | settings, dynamic_pages, audit_logs |
| Reviews | reviews |
| Authz | roles, permissions, model_has_roles, model_has_permissions, role_has_permissions |

## Users
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| name | string | display name |
| username | string unique | lowercase normalized |
| email | string unique nullable | lowercase normalized |
| primary_phone | string unique | required |
| password | string | hashed |
| email_verified_at | timestamp nullable | optional |
| is_active | boolean | access control |
| last_login_at | timestamp nullable | auditing |
| remember_token | nullable | Laravel default, not primary auth |
| timestamps | timestamps | standard |

## User Profiles
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| user_id | foreign key | unique |
| avatar_path | string nullable | storage path |
| bio | text nullable | sanitized |
| is_public_profile | boolean | public toggle |
| show_total_orders | boolean | privacy |
| show_total_spent | boolean | privacy |
| show_monthly_rank | boolean | privacy |
| show_yearly_rank | boolean | privacy |
| show_favorite_products | boolean | privacy |
| timestamps | timestamps | standard |

## User Addresses
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| user_id | foreign key | owner |
| label | string | home/work |
| recipient_name | string | delivery |
| phone | string | contact override |
| country | string nullable | optional |
| city | string | required |
| area | string | area/zone text |
| street | string | required |
| building | string nullable | optional |
| floor | string nullable | optional |
| apartment | string nullable | optional |
| landmark | string nullable | sanitized |
| notes | text nullable | sanitized |
| is_default | boolean | one per user |
| timestamps | timestamps | standard |

## User Secondary Phones
- Simple table preferred over JSON for searchability and validation.
- Fields: `id`, `user_id`, `phone`, `label`, timestamps.

## Branches
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| name | json/text | ar/en |
| slug | string unique | stable key |
| phone | string nullable | branch contact |
| email | string nullable | optional |
| address | text nullable | localized or plain |
| latitude | decimal nullable | geodata |
| longitude | decimal nullable | geodata |
| working_hours_json | text nullable | structured hours |
| is_active | boolean | enabled state |
| timestamps | timestamps | standard |

## Delivery Zones
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| branch_id | foreign key | owner |
| name | json/text | ar/en |
| code | string nullable | optional key |
| delivery_fee | decimal(10,2) | money |
| min_delivery_time_minutes | integer nullable | ETA |
| max_delivery_time_minutes | integer nullable | ETA |
| is_active | boolean | enabled |
| timestamps | timestamps | standard |

## Categories
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| parent_id | foreign key nullable | nested categories |
| name | json/text | ar/en |
| slug | string unique | future friendly |
| description | json/text nullable | optional |
| sort_order | integer default 0 | ordering |
| is_active | boolean | enabled |
| timestamps | timestamps | standard |

## Tags
- Fields: `id`, `name`, `slug`, `is_active`, timestamps.
- `name` can also be translatable.

## Products
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| name | json/text | ar/en |
| slug | string unique | API-friendly |
| description | json/text nullable | ar/en |
| short_description | json/text nullable | ar/en |
| base_price | decimal(10,2) nullable | optional when sizes define price |
| main_image_path | string nullable | storage path |
| is_active | boolean | product enabled |
| is_limited_stock | boolean | stock toggle |
| stock_quantity | integer nullable | if tracked |
| is_available_in_all_branches | boolean | availability mode |
| is_best_seller_pinned | boolean | admin override |
| best_seller_rank | integer nullable | optional |
| sort_order | integer default 0 | listing |
| timestamps | timestamps | standard |

## Branch Product Pivot
| Column | Type | Notes |
| --- | --- | --- |
| branch_id | FK | branch |
| product_id | FK | product |
| is_active | boolean | branch override |
| custom_stock_quantity | integer nullable | optional override |
| timestamps | timestamps | audit |

## Product Media
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| product_id | foreign key | owner |
| media_type | string | image/video/external_video |
| disk | string nullable | storage disk |
| path | string nullable | local path |
| external_url | string nullable | e.g. YouTube |
| title | json/text nullable | localized |
| sort_order | integer default 0 | ordering |
| is_primary | boolean | primary media |
| timestamps | timestamps | standard |

## Product Sizes
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| product_id | foreign key | owner |
| code | string | small/medium/large |
| name | json/text | ar/en |
| price | decimal(10,2) | actual price |
| is_default | boolean | default size |
| sort_order | integer | ordering |
| is_active | boolean | enabled |
| timestamps | timestamps | standard |

## Addon Groups
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| product_id | foreign key | owner product |
| name | json/text | ar/en |
| selection_type | string | single/multiple |
| min_select | integer default 0 | validation |
| max_select | integer nullable | validation |
| is_required | boolean | validation |
| sort_order | integer | listing |
| is_active | boolean | enabled |
| timestamps | timestamps | standard |

## Addon Options
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| addon_group_id | foreign key | owner group |
| name | json/text | ar/en |
| base_price | decimal(10,2) default 0 | fallback |
| sort_order | integer | listing |
| is_active | boolean | enabled |
| timestamps | timestamps | standard |

## Addon Option Size Overrides
- Needed because add-on prices can differ by size.
- Suggested columns: `id`, `addon_option_id`, `product_size_id`, `price`, timestamps.

## Cart Tables
- `carts`: `id`, `user_id`, `branch_id nullable`, timestamps.
- `cart_items`: `id`, `cart_id`, `product_id`, `product_size_id nullable`, `quantity`, `price_snapshot`, `configuration_hash`, timestamps.
- `cart_item_addons`: `id`, `cart_item_id`, `addon_option_id`, `price_snapshot`, timestamps.

## Orders
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| user_id | foreign key | owner |
| branch_id | foreign key | selected branch |
| delivery_zone_id | foreign key nullable | delivery area |
| address_id | foreign key nullable | shipping address |
| status | string | enum-like |
| currency_code | string | e.g. EGP |
| subtotal | decimal(10,2) | products total |
| addons_total | decimal(10,2) | extras |
| delivery_fee | decimal(10,2) | shipping |
| discount_total | decimal(10,2) | all discounts |
| wallet_amount | decimal(10,2) | wallet deduction |
| total | decimal(10,2) | final total |
| coupon_code | string nullable | snapshot |
| coupon_snapshot | text nullable | applied rule summary |
| notes | text nullable | sanitized |
| grace_period_ends_at | timestamp | cancel/edit cutoff |
| delivery_person_name | string nullable | tracking |
| delivery_person_phone | string nullable | tracking |
| placed_at | timestamp nullable | lifecycle |
| timestamps | timestamps | standard |

## Order Items
- Snapshot product fields to protect history.
- Suggested columns:
- `id`
- `order_id`
- `product_id nullable`
- `product_name_snapshot`
- `product_size_name_snapshot nullable`
- `product_size_code nullable`
- `unit_price`
- `quantity`
- `line_subtotal`
- `metadata_json nullable`
- timestamps

## Order Item Addons
- `id`, `order_item_id`, `addon_option_id nullable`, `addon_name_snapshot`, `price`, timestamps.

## Order Status Logs
- `id`, `order_id`, `from_status nullable`, `to_status`, `actor_id nullable`, `actor_type nullable`, `notes nullable`, timestamps.

## Coupons
| Column | Type | Notes |
| --- | --- | --- |
| id | big integer | PK |
| code | string unique | uppercase or normalized |
| type | string | fixed/percentage |
| value | decimal(10,2) | amount or percent |
| max_discount_amount | decimal(10,2) nullable | percent cap |
| min_cart_value | decimal(10,2) nullable | threshold |
| applies_to | string | products/delivery/both |
| usage_limit_total | integer nullable | global |
| usage_limit_per_user | integer nullable | user |
| starts_at | timestamp nullable | validity |
| expires_at | timestamp nullable | validity |
| is_active | boolean | enabled |
| conditions_json | text nullable | category/product rules |
| timestamps | timestamps | standard |

## Coupon Usages
- `id`, `coupon_id`, `user_id`, `order_id nullable`, `used_at`, timestamps.

## Wallets
- `id`, `user_id unique`, `balance decimal(10,2)`, timestamps.

## Wallet Transactions
- `id`, `wallet_id`, `type`, `amount`, `balance_before`, `balance_after`, `reference_type`, `reference_id`, `notes nullable`, `actor_id nullable`, timestamps.

## Gift Cards
- `id`, `code unique`, `amount`, `currency_code`, `is_active`, `expires_at nullable`, `redeemed_at nullable`, `redeemed_by_user_id nullable`, timestamps.

## Gift Card Redemptions
- `id`, `gift_card_id`, `user_id`, `wallet_transaction_id nullable`, `redeemed_amount`, timestamps.

## Reviews
- `id`, `user_id`, `product_id`, `order_item_id nullable`, `rating`, `comment nullable`, `is_anonymous`, `is_visible`, `is_admin_generated`, timestamps.

## Settings
- `id`, `group`, `key`, `value`, `value_type`, timestamps.

## Dynamic Pages
- `id`, `slug unique`, `title`, `content`, `is_active`, timestamps.

## Audit Logs
- `id`, `actor_id nullable`, `action`, `target_type`, `target_id`, `metadata_json nullable`, timestamps.

## Eloquent Relationship Summary
```text
User hasOne UserProfile
User hasMany UserAddress
User hasMany UserSecondaryPhone
User hasOne Wallet
User hasMany Order
User hasMany Review

Branch hasMany DeliveryZone
Branch belongsToMany Product
Branch hasMany Order

Product belongsToMany Category
Product belongsToMany Tag
Product belongsToMany Branch
Product hasMany ProductMedia
Product hasMany ProductSize
Product hasMany AddonGroup
Product hasMany Review

Order belongsTo User
Order belongsTo Branch
Order belongsTo DeliveryZone
Order hasMany OrderItem
Order hasMany OrderStatusLog
```

## Migration Order
1. users and auth tables.
2. branches and delivery zones.
3. categories and tags.
4. products and pivots.
5. product sizes and add-ons.
6. profiles and addresses.
7. carts.
8. orders.
9. coupons.
10. wallets and gift cards.
11. reviews.
12. settings, pages, logs.

## Notes
- Keep money columns decimal, not float.
- Keep JSON/text columns SQLite-safe.
- Keep enums as strings if SQLite compatibility matters.
- Add indexes on common lookup fields.
