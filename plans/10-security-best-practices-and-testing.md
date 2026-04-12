# Security Best Practices And Testing

## Goal
- Reduce common web/API vulnerabilities and keep critical flows testable.

## Core Security Controls
- Sanctum token auth.
- Lowercase identity normalization.
- Rate limiting.
- Policy-based authorization.
- Free-text sanitization.
- Strict upload validation.
- Transactional wallet/coupon/order writes.

## Threat Checklist
- XSS in notes and reviews.
- SQL injection in filtering/sorting.
- Mass assignment in admin CRUD.
- Broken access control.
- Token leakage.
- Coupon abuse.
- Gift card replay.
- Wallet race conditions.

## Input Validation Rules
- Use `FormRequest` on all write endpoints.
- Use nested validation for cart and product options.
- Use whitelist-based sorting and filtering.
- Reject unsupported enum/status values.

## Sanitization Rules
- Notes: sanitize as plain text.
- Reviews: sanitize as plain text.
- Profile bio: sanitize.
- Dynamic pages: if rich text allowed later, sanitize with allowlist.

## Upload Security
- Restrict mime types.
- Restrict file size.
- Restrict extensions.
- Generate safe filenames.
- Avoid executing uploaded files.
- Use configured disk and URL prefix.

## Access Control Rules
- Every protected route uses auth middleware.
- Every sensitive action checks policy or permission.
- Never rely on hidden routes.
- Never trust client-sent role flags.

## Sensitive Operations Requiring Transaction
- Checkout.
- Wallet redemption.
- Refund.
- Coupon usage finalization.
- Manual wallet adjustment.

## Logging Rules
- Log security-relevant actions.
- Do not log passwords.
- Do not log plaintext tokens.
- Mask sensitive headers when needed.

## Error Handling Rules
- JSON errors only.
- Safe production messages.
- Detailed internal logs only.

## Rate Limit Targets
- Register.
- Login.
- Admin login.
- Gift card redeem.
- Coupon apply.
- Review create.
- Password reset if implemented.

## Testing Pyramid
- Unit tests for calculation services.
- Feature tests for API flows.
- Integration-like tests for auth and permissions.

## Priority Test Matrix
| Area | Test Type |
| --- | --- |
| Auth normalization | Feature |
| Password rules | Unit/Feature |
| Branch availability | Feature |
| Cart validation | Feature |
| Coupon calculations | Unit |
| Wallet redemption | Feature |
| Order grace period | Feature |
| Review eligibility | Feature |
| Role scope | Feature |

## Security Test Cases
1. Uppercase email login works after normalization.
2. User cannot access another user order.
3. Branch manager blocked from unrelated branch.
4. XSS script in notes does not persist dangerously.
5. Unsupported upload type rejected.
6. Coupon over-discount remainder discarded.
7. Gift card cannot redeem twice.
8. Wallet cannot overdraw incorrectly.

## Curl Verification Targets
- Register.
- Login.
- Authenticated profile.
- Add cart item.
- Checkout.
- Cancel within grace period.
- Redeem gift card.

## Performance Test Targets
- Product list with filters.
- Category tree response.
- Order listing with eager loading.
- Notification creation not blocking request unnecessarily.

## Static Analysis
- Run `phpstan`.
- Keep strict types where practical.
- Fix high-risk issues first.

## Code Style
- PSR-12.
- Small service classes.
- No fat controllers.
- No raw unsafe SQL from request parameters.

## Future Security Extensions
- 2FA for admins.
- Device management UI later.
- Webhook signing.
- Dedicated audit viewer.
