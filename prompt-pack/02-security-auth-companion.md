# Security And Auth Companion

## Purpose
- هذا الملف يحدد hard security defaults.
- هذا الملف يحدد auth strategy بوضوح.
- هذا الملف يمنع الـ agent من ترك فراغات أمنية بسبب التفسير الحر.
- استخدمه مع `00-master-backend-only-prompt.md`.

## Security Mindset
- Assume hostile input by default.
- Assume public APIs will be probed.
- Assume free-text fields can contain malicious payloads.
- Assume admin dashboards may later display unsafe content unless the backend constrains it.
- Assume tokens can be leaked if handled poorly.
- Assume coupon and wallet flows are attractive abuse targets.

## Primary Security Goals
- Preserve confidentiality.
- Preserve integrity.
- Preserve availability.
- Preserve auditability.
- Preserve pricing correctness.
- Preserve authorization boundaries.

## Required Threat Areas
- Authentication brute force.
- Token leakage.
- Broken access control.
- Insecure direct object references.
- XSS through notes and reviews.
- Mass assignment.
- File upload abuse.
- Coupon abuse.
- Wallet race conditions.
- Order status tampering.
- Branch-scope privilege escalation.

## Authentication Baseline
- Use `Laravel Sanctum`.
- Prefer access-token flow as the main cross-platform mechanism.
- Do not build the system around session-only auth.
- Support multi-device tokens.
- Store tokens using Sanctum’s secure hashing behavior.
- Label tokens meaningfully when possible.
- Revoke tokens explicitly on logout.
- Support logout current device.
- Support logout all devices if required.

## Identity Normalization
- Normalize `email` to lowercase before save.
- Normalize `username` to lowercase before save.
- Normalize on login lookup as well.
- Keep uniqueness checks aligned with normalized values.
- Add tests for case-insensitive identity behavior.

## Login Flow Rules
- Login endpoint accepts `email_or_username`.
- Resolve which identity type is being used safely.
- Apply rate limiting.
- Return generic invalid-credentials messages.
- Avoid username enumeration leaks.
- Optionally include device name in token creation.

## Registration Flow Rules
- Validate normalized uniqueness before persist.
- Enforce password policy.
- Enforce required primary phone.
- Sanitize optional profile fields.
- Keep registration response minimal.

## Password Policy
- Minimum length `6`.
- Require one letter.
- Require one number.
- Require one symbol.
- Reject passwords containing the user’s username if present.
- Reject passwords containing the user’s email if present.
- Reject passwords containing known first or last name if present.
- Keep the implementation deterministic.
- Cover with tests.

## Authorization Baseline
- Use `Policies` for resource access.
- Use `Gates` for coarse-grained abilities.
- Use `spatie/laravel-permission` for role and permission assignment.
- Keep role names descriptive.
- Keep permission names explicit.
- Never assume admin rights just because a route starts with `/admin`.
- Always enforce policy checks in controllers/services.

## Super Admin Rule
- If using `id = 1` bootstrap logic, document it clearly.
- Prefer also mapping that actor to a clear `super_admin` capability.
- Keep bypass logic centralized.
- Do not scatter super-admin bypass logic across controllers.

## Branch-Scoped Authorization
- Branch managers must only access allowed branches.
- Order viewers must not see orders outside authorized scope.
- Product editors may be scoped by branch or by general catalog permission.
- Delivery assignment should require explicit operational permissions.
- Review moderation should require moderation-specific permissions.

## Object Access Rules
- Users can only access their own tokens.
- Users can only access their own addresses unless privileged.
- Users can only access their own wallet history unless privileged.
- Users can only access their own orders unless privileged.
- Users can only review eligible purchased items.
- Public profiles expose only public fields.

## API Transport Rules
- JSON only.
- Reject unsupported content types where appropriate.
- Use `application/json`.
- Keep exception rendering JSON-safe.
- Never return HTML error pages in the API context.

## Rate Limiting
- Rate-limit login.
- Rate-limit registration if exposed publicly.
- Rate-limit password reset endpoints.
- Rate-limit gift-card redeem endpoint.
- Rate-limit coupon apply endpoint if abuse risk is high.
- Rate-limit review creation.
- Rate-limit admin login separately if needed.

## Brute Force Protection
- Combine rate limits with audit logging.
- Consider lockout windows for repeated failures.
- Keep user-facing error generic.
- Monitor suspicious patterns.

## Token Handling
- Do not expose plaintext tokens after initial issuance except where the auth flow requires the first reveal.
- Never log plaintext access tokens.
- Never store tokens in custom plain DB tables when Sanctum handles them.
- Design APIs so mobile and web consumers can manage token revocation clearly.

## Cookies Versus Tokens
- Primary backend brief prefers access tokens for cross-platform readiness.
- If cookies are ever used for some web context, keep them secure:
- `HttpOnly`
- `Secure`
- `SameSite` configured intentionally
- Do not make cookies the main mobile-ready contract.

## CORS Strategy
- Explicitly configure allowed origins.
- Avoid wildcard origins with credentials.
- Document dev and production origin behavior.
- Keep preflight behavior predictable.
- Test protected endpoints from allowed consumers.

## CSRF Notes
- For pure token APIs, CSRF concerns differ from stateful cookie flows.
- Do not claim CSRF is solved magically.
- If any stateful cookie endpoints are introduced later, document and protect them separately.
- Keep current scope centered on token-authenticated APIs.

## XSS Defense
- Free-text fields are dangerous.
- Notes are dangerous.
- Reviews are dangerous.
- Profile bios are dangerous.
- Dynamic page content can be dangerous.
- Sanitize or strictly validate according to field intent.
- Prefer plain-text storage for fields that do not need rich HTML.
- If rich text is ever allowed later, use a real allowlist sanitizer.

## SQL Injection Defense
- Use Eloquent or parameterized query builder usage.
- Never concatenate raw unsafe SQL from request parameters.
- Whitelist sortable fields.
- Whitelist filterable fields.
- Whitelist searchable relations where dynamic behavior exists.

## Mass Assignment Defense
- Guard models carefully.
- Prefer DTO/action/service boundaries for sensitive writes.
- Never trust raw `$request->all()` for privileged updates.
- Restrict fillable attributes or use explicit assignment patterns.

## Input Validation Strategy
- Use `FormRequest` objects for endpoint validation.
- Use nested rules for complex cart/configuration payloads.
- Use domain services for cross-entity validation.
- Return structured validation errors.
- Keep business-rule validation separate from primitive type validation when possible.

## Free-Text Sanitization Rules
- Order notes must be sanitized.
- Review comments must be sanitized.
- Profile text fields must be sanitized.
- Dynamic page content requires special care.
- Audit any field that may later be displayed in admin or client apps.

## File Upload Security
- Validate mime type.
- Validate extension.
- Validate max file size.
- Restrict accepted types tightly.
- Reject executable or suspicious content.
- Store outside dangerous public execution paths where applicable.
- Generate safe filenames.
- Record original filename separately only if needed.
- Consider image dimension checks if relevant.

## Media Type Policy
- Images:
- `jpeg`
- `jpg`
- `png`
- `webp`
- Videos only if required and storage policy is clear.
- External video URLs must be validated against allowed providers if such restriction is needed.

## Virus Scan Simulation Requirement
- If real malware scanning is unavailable, include a clear integration point or simulation abstraction.
- Do not pretend a fake scanner is real protection.
- Document it as a placeholder hook.

## Notes Safety Example
- A customer may submit `<script>` in order notes.
- The backend must not trust or preserve executable behavior blindly for display contexts.
- Store safe text or sanitize before persistence/display based on field policy.
- Cover this with automated tests.

## Coupon Abuse Risks
- Reuse beyond per-user limits.
- Reuse after expiry.
- Circumventing minimum cart totals.
- Applying coupons to ineligible items.
- Using delivery-only coupons on product totals.
- Repeated retry attacks on redeem/apply endpoints.

## Coupon Security Controls
- Validate eligibility server-side at every apply and checkout step.
- Snapshot applied coupon result into the order.
- Recheck validity in checkout finalization.
- Use transactions around final coupon usage increments.

## Wallet Security Risks
- Double-spend attempts.
- Race conditions during concurrent checkout.
- Replay on redeem endpoints.
- Manual admin balance abuse.

## Wallet Security Controls
- Use DB transactions.
- Use row-level locking or equivalent consistency control when needed.
- Keep append-only transaction history.
- Audit admin adjustments.
- Validate non-negative balance outcomes.

## Gift Card Security Risks
- Code guessing.
- Replay redemption.
- Predictable code generation.
- Unauthorized admin generation.

## Gift Card Security Controls
- Use high-entropy codes.
- Enforce single-use or explicit usage policy.
- Store redemption metadata.
- Protect generation endpoints with strong permissions.
- Protect redemption endpoints with rate limiting.

## Order Integrity Controls
- Snapshot prices at order creation.
- Snapshot selected size and add-ons.
- Snapshot delivery fee.
- Snapshot coupon result.
- Snapshot wallet deduction.
- Prevent later product edits from mutating historical orders.

## Status Transition Security
- Do not let arbitrary clients set any status.
- Define allowed transitions.
- Different actors can trigger different transitions.
- Customers may cancel only within grace period and only under allowed status.
- Admin/staff transitions must be authorized and logged.

## Sensitive Settings Controls
- Mail settings are sensitive.
- OAuth provider settings are sensitive.
- Token-related settings are sensitive.
- Currency and feature toggles affect business behavior.
- Restrict update permissions tightly.
- Audit changes.

## Logging Rules
- Log security-relevant events.
- Do not log secrets.
- Do not log plaintext passwords.
- Do not log plaintext tokens.
- Mask sensitive headers if request logging exists.

## Production Error Handling
- Never expose stack traces in production JSON.
- Use safe generic messages for unknown exceptions.
- Log detailed context server-side.
- Separate user-safe message from internal diagnostics.

## Testing Matrix
- Test login throttling.
- Test lowercase normalization.
- Test password validation.
- Test unauthorized access across user boundaries.
- Test branch-scope authorization.
- Test order note sanitization.
- Test coupon over-discount rules.
- Test wallet concurrency-sensitive operations where feasible.
- Test gift-card single-use behavior.
- Test invalid status transition rejection.

## Security Review Checklist For The Downstream Agent
- Are all auth endpoints rate-limited.
- Are tokens created and revoked safely.
- Are emails and usernames normalized.
- Are free-text fields sanitized or constrained.
- Are uploads strictly validated.
- Are policy checks enforced on every protected resource.
- Are coupon and wallet writes transactional.
- Are order status transitions restricted.
- Are sensitive settings protected and audited.

## Final Guardrail
- If a requirement is ambiguous, choose the more secure backend behavior.
- Document the assumption.
- Do not leave silent auth or security gaps.
