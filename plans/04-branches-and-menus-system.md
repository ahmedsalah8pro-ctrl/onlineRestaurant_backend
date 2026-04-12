# Branches And Menus System

## Goal
- Support single-branch and multi-branch businesses with one codebase.
- Keep branch-specific availability and delivery pricing first-class concerns.

## Branch Business Rules
- A business can have one branch or many.
- Each branch can be enabled or disabled.
- Each branch has localized name fields.
- Each branch may have its own phone and address.
- Each branch may have its own coordinates.
- Each branch may have its own working hours.

## Delivery Zone Rules
- Delivery zones belong to branches.
- Delivery zones have delivery fees.
- Delivery zones can be enabled or disabled.
- Checkout must verify selected zone belongs to selected branch.

## Branch Data Contract
| Field | Type | Purpose |
| --- | --- | --- |
| id | integer | primary key |
| name | translatable | branch display |
| slug | string | stable identifier |
| phone | string | contact |
| address | text | display/admin |
| latitude | decimal | optional map use |
| longitude | decimal | optional map use |
| working_hours_json | json/text | structured schedule |
| is_active | bool | availability |

## Delivery Zone Data Contract
| Field | Type | Purpose |
| --- | --- | --- |
| id | integer | primary key |
| branch_id | integer | owner |
| name | translatable | zone name |
| delivery_fee | decimal | shipping |
| min_delivery_time_minutes | int | ETA |
| max_delivery_time_minutes | int | ETA |
| is_active | bool | availability |

## Menu Exposure Rules
- Public clients fetch active branches only.
- Public clients fetch only active zones for active branches.
- Public menu queries should optionally filter by branch.
- Product visibility should respect branch selection.

## Menu Query Flow
1. Client selects a branch or receives default branch context.
2. API resolves active products for that branch.
3. API resolves categories relevant to active products.
4. API returns best-seller and tag metadata where requested.
5. API includes branch availability indicators if helpful.

## Single-Branch Behavior
- If only one active branch exists, the client can treat it as default.
- Checkout still records branch explicitly.
- Delivery zone selection still applies where relevant.

## Multi-Branch Behavior
- Branch must be explicit in cart/checkout context.
- Product validation must use selected branch.
- Delivery zone fees come from selected branch only.

## Product Availability Modes
- Available in all branches.
- Available only in selected branches.
- Temporarily disabled globally.
- Temporarily disabled for one branch via pivot.

## Recommended Pivot Strategy
| Table | Meaning |
| --- | --- |
| branch_product | branch-specific availability and optional stock override |

## Menu Categories Rules
- Categories can be nested.
- Categories are global, not per branch by default.
- Product visibility under a category depends on branch availability.
- Empty categories can be hidden from public branch-filtered responses if desired.

## Tags Rules
- Tags are global.
- Tags help search and filtering.
- Tags can overlap with category concepts but do not replace them.

## Best Seller Rules
- Best sellers can be auto-calculated.
- Admin may pin manual best sellers.
- Per-category best sellers may be supported.
- Per-branch best sellers can be derived later if needed.

## Search Rules
- Search by product name in current locale and secondary locale.
- Search by tag names.
- Search by category names where practical.
- Search must not expose inactive/unavailable products.

## Sort Rules
- `price_asc`
- `price_desc`
- `best_seller`
- `rating_desc`
- `latest`

## Branch Filter Rules
- `branch_id` should be an explicit filter on product listing.
- If absent, API may use default active branch behavior or return general active items.
- Checkout requires explicit branch decision.

## Delivery Validation Example
```text
Customer selects branch 3
Cart contains product A available in branches 1 and 2 only
Checkout must fail
Reason: product A unavailable in selected branch
```

## Admin Branch CRUD
- Create branch.
- Update branch.
- Enable/disable branch.
- Delete branch if safe or soft-delete if desired.
- Manage zone list per branch.

## Admin Zone CRUD
- Create zone under branch.
- Update delivery fee.
- Update ETA values.
- Enable/disable zone.
- Remove zone if not referenced or handle safely.

## Suggested Services
- `BranchResolverService`
- `BranchAvailabilityService`
- `DeliveryFeeCalculator`
- `BranchMenuQueryService`

## Suggested Policies
- `BranchPolicy`
- `DeliveryZonePolicy`
- `ProductBranchAvailabilityPolicy` or product policy method

## Suggested Endpoints
- `GET /api/v1/branches`
- `GET /api/v1/branches/{id}`
- `GET /api/v1/branches/{id}/delivery-zones`
- `GET /api/v1/products?branch_id=1`
- `GET /api/v1/categories?branch_id=1`

## Admin Endpoint Notes
- Branch list endpoints should support filters.
- Branch create/update endpoints should accept localized names.
- Zone endpoints should validate positive delivery fees.

## Caching Notes
- Branch list can be cached.
- Delivery zones per branch can be cached.
- Branch-aware category tree can be cached carefully.
- Cache invalidation required on branch, zone, product availability changes.

## Testing Scenarios
1. Product available in all branches appears everywhere.
2. Product limited to branch 1 does not appear for branch 2 listing.
3. Disabled branch is absent from public list.
4. Disabled zone cannot be selected at checkout.
5. Checkout fails when branch-product mismatch exists.

## Data Integrity Notes
- Use foreign keys when supported.
- Prevent orphaned zones.
- Validate branch IDs in all admin/product assignment flows.
- Keep delivery fee non-negative.

## Future Extensions
- Branch-specific schedules per product.
- Pickup-only branches.
- Zone polygons/GIS support.
- Branch-specific taxes.
