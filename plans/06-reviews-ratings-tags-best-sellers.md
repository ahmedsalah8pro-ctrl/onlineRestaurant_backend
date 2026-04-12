# Reviews Ratings Tags Best Sellers

## Goal
- Support trustworthy customer reviews and useful discovery metadata.

## Review Rules
- Only verified buyers can review.
- Reviews rate from `1` to `5`.
- Review comment is optional.
- Review can be anonymous.
- Review moderation is required.

## Verified Purchase Rule
- User must have purchased the product in an eligible fulfilled order state.
- Recommended eligible order state: `delivered`.
- Review creation should verify the relationship through order items.

## Repeat Review Rule
- A user may review again only after another eligible purchase if business wants repeated reviews.
- Simpler v1 rule: one review per order item or per fulfilled purchase event.

## Review Fields
| Field | Type | Notes |
| --- | --- | --- |
| user_id | FK | reviewer |
| product_id | FK | product |
| order_item_id | FK nullable | verification link |
| rating | integer | 1-5 |
| comment | text nullable | sanitized |
| is_anonymous | boolean | display choice |
| is_visible | boolean | moderation |
| is_admin_generated | boolean | marketing/manual seed |

## Display Rules
- Public API returns only visible reviews.
- Anonymous reviews hide customer identity.
- Review summary includes count and average rating.
- Optional metadata may include verified purchase flag.

## Admin Moderation Rules
- Admin can hide review.
- Admin can delete review.
- Admin can create manual promotional review only with explicit permission.
- Manual reviews should be marked internally.

## Abuse Prevention
- Sanitize comments.
- Rate-limit review submission.
- Require verified purchase.
- Optionally disallow editing after a time window.

## Rating Aggregation
- Product average rating should be computed or cached from visible reviews.
- Product rating count should be included.
- Recalculation should happen after create/update/delete/hide actions.

## Tags Rules
- Tags support discovery.
- Tags can be managed by admin.
- Tags can be attached/detached from products.
- Public product APIs can return tags for filtering and search.

## Best Seller Strategy
- Best sellers should be based on fulfilled order item quantities.
- Pinned best sellers override or augment computed ranking.
- Best sellers can be global and per category.

## Suggested Best Seller Calculation
1. Consider eligible order states.
2. Aggregate order item quantities by product.
3. Apply time window if desired later.
4. Merge with pinned metadata.
5. Cache output.

## Best Seller API Output
- `product_id`
- `sales_count`
- `is_pinned`
- `rank`

## Review API Endpoints
- `POST /api/v1/reviews`
- `GET /api/v1/products/{id}/reviews`
- `GET /api/v1/admin/reviews`
- `DELETE /api/v1/admin/reviews/{id}`
- `PUT /api/v1/admin/reviews/{id}`

## Validation Rules
- Rating required and between 1 and 5.
- Comment max length controlled.
- Product must exist.
- Reviewer must own eligible purchase.

## Eloquent Notes
- `Review belongsTo User`
- `Review belongsTo Product`
- `Review belongsTo OrderItem`
- `Product hasMany Review`

## Response Design
```json
{
  "id": 12,
  "rating": 5,
  "comment": "Excellent",
  "is_anonymous": false,
  "reviewer_name": "Ali",
  "created_at": "2026-04-11T12:00:00Z"
}
```

## Privacy Notes
- Anonymous reviews should not expose username.
- Public display may show masked identity if needed.
- Admin APIs can still see real owner if authorized.

## Testing Scenarios
1. Non-buyer cannot review.
2. Buyer with delivered order can review.
3. Anonymous review hides identity publicly.
4. Hidden review is absent from public listing.
5. Product rating average updates after moderation change.
6. Admin-generated review is flagged internally.

## Future Extensions
- Review images.
- Helpfulness votes.
- Merchant replies.
- Review edit history.
