# Products Categories Sizes Addons

## Goal
- Model restaurant catalog data with enough flexibility for real menu complexity.
- Support multiple categories, tags, sizes, and add-ons with pricing logic.

## Product Core Requirements
- Multilingual names.
- Multilingual descriptions.
- Base price optional.
- Main image and gallery.
- External or uploaded video references.
- Active/inactive toggle.
- Limited stock toggle and quantity.
- Best-seller metadata.

## Category Rules
- Categories support parent-child nesting.
- Products may belong to multiple categories.
- Category names are translatable.
- Categories have sort order and active state.

## Tag Rules
- Products may belong to many tags.
- Tags support search/filter experiences.
- Tags are not branch-specific by default.

## Product Media Rules
- One main image path on product.
- Additional media records in `product_media`.
- Media types: image, uploaded video, external video.
- Product detail response includes ordered media array.

## Size Rules
- Product can have zero or many sizes.
- If a product has sizes, price resolution prefers selected size price.
- One size may be default.
- Size names are translatable.
- Size code should be stable, such as `small`, `medium`, `large`.

## Add-On Group Rules
- Add-on groups belong to product.
- Group can be `single` or `multiple`.
- Group can be required or optional.
- Group can define minimum and maximum selections.
- Group order should be controllable.

## Add-On Option Rules
- Options belong to add-on group.
- Options have localized names.
- Options have base price.
- Options may have size-specific price overrides.
- Options can be enabled or disabled.

## Price Calculation Priority
1. Base product price or selected size price.
2. Add selected add-on option prices.
3. Multiply by quantity.
4. Apply coupon logic later in cart/order services.

## Example Product Model
```text
Product: Pizza Margherita
Base price: null
Sizes:
 - Small: 100
 - Medium: 150
 - Large: 210
Addon Group 1: Crust Stuffing (single)
 - Cheese: +20 small / +25 medium / +30 large
 - Sausage: +25 small / +30 medium / +35 large
Addon Group 2: Extra Cheese (multiple, optional)
 - Mozzarella: +15 / +20 / +25
 - Roumy: +12 / +17 / +22
```

## Listing Behavior
- Product list returns summary only.
- Product detail returns sizes, add-on groups, tags, categories, media.
- Only active and available items appear publicly.

## Search Fields
- Product name current locale.
- Product name alternate locale.
- Description optionally.
- Tags.
- Categories.

## Sort Fields
- Effective minimum price.
- Rating average.
- Best-seller rank.
- Custom sort order.

## Recommended Services
- `ProductCatalogService`
- `ProductAvailabilityService`
- `ProductPriceResolver`
- `AddonSelectionValidator`
- `ProductSearchService`

## Recommended Resource Structure
```json
{
  "id": 10,
  "name": {"ar": "بيتزا", "en": "Pizza"},
  "base_price": null,
  "sizes": [],
  "addon_groups": [],
  "categories": [],
  "tags": [],
  "media": []
}
```

## Admin Product CRUD Notes
- Create product core fields.
- Attach categories.
- Attach tags.
- Attach branches or mark all branches.
- Create sizes.
- Create add-on groups.
- Create add-on options.
- Upload or assign media.

## Validation Rules
- Name required in Arabic at minimum.
- Slug unique.
- Base price required only if no sizes exist.
- Stock quantity required if limited stock is enabled.
- Add-on min/max must be coherent.
- Size override prices must be non-negative.
- Media URLs must be valid when external.

## Branch Availability Notes
- Product global activity and branch activity are separate.
- A globally disabled product is hidden everywhere.
- A globally active product with branch restrictions appears only where allowed.

## Best Seller Notes
- `is_best_seller_pinned` indicates admin choice.
- Calculated top sellers can be derived from fulfilled order items.
- API may expose `is_best_seller` after merge of pinned and calculated logic.

## Eloquent Relationship Notes
- `Product belongsToMany Category`
- `Product belongsToMany Tag`
- `Product belongsToMany Branch`
- `Product hasMany ProductSize`
- `Product hasMany AddonGroup`
- `AddonGroup hasMany AddonOption`
- `AddonOption hasMany AddonOptionSizeOverride`

## Cart Validation Inputs
- `product_id`
- `product_size_id nullable`
- `quantity`
- `addon_option_ids[]`

## Cart Validation Rules
- Selected size must belong to product.
- Selected add-ons must belong to the product via groups.
- Required group must be satisfied.
- Single-select group must have max one option.
- Multiple group max must be respected.
- Branch availability must pass before add/update.

## Product Detail API Example Sections
- `pricing`
- `availability`
- `sizes`
- `addons`
- `media`
- `categories`
- `tags`
- `rating_summary`

## Media Storage Notes
- Use storage disk abstraction.
- Public URL can be derived from configured upload base URL.
- This enables later CDN swap.
- Do not hardcode public filesystem paths inside business logic.

## Upload Rules
- Only allow safe image/video formats.
- Validate max file size.
- Sanitize filenames.
- Keep metadata stored separately from actual URL generation.

## Testing Scenarios
1. Product with sizes requires valid size at add-to-cart if configured that way.
2. Required add-on group blocks invalid add-to-cart.
3. Single-select add-on group rejects multiple choices.
4. Size-specific addon pricing resolves correctly.
5. Inactive product does not appear in public listing.
6. Branch-restricted product does not appear in unauthorized branch context.

## Future Extensions
- Product bundles.
- Time-window availability.
- Branch-specific prices.
- Nutritional metadata.
- SEO fields for website client later.
