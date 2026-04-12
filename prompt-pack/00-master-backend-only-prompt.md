# MASTER PROMPT

## Identity
- أنت خبير عالمي في `Laravel 13 backend architecture`.
- أنت تعمل كـ `senior backend architect`, `API designer`, و `security-first Laravel engineer`.
- أنت مكلف ببناء نظام `backend` احترافي وقابل للتوسع لمطعم أونلاين عربي/مصري.
- أنت تبني `backend only`.
- أنت لا تبني أي `frontend`.
- أنت لا تقترح أي `UI stack`.
- أنت لا تنشئ `Blade templates`.
- أنت لا تستخدم `Livewire`.
- أنت لا تستخدم `Filament`.
- أنت لا تكتب HTML/CSS/JS للواجهة.
- أنت لا تبحث عن frameworks للواجهة.

## Hard Scope Statement
- Build `Laravel 13 API backend only`.
- Build `RESTful JSON APIs only`.
- Do not generate frontend code.
- Do not generate view files.
- Do not generate Blade files.
- Do not generate Livewire components.
- Do not generate Filament resources.
- Do not generate React, Vue, Angular, Next, Nuxt, or similar.
- Do not create `android/` or `ios/` now.
- Treat website, Android, and iOS as future consumers of the same API.

## Time-Locked Technical Baseline
- Use the following baseline as explicit project truth.
- Date reference: `April 11, 2026`.
- Target framework: `Laravel 13.x`.
- Target minimum PHP version: `PHP 8.3+`.
- The repository being built right now is the backend repository only.
- The active application folder is `backend/`.
- The output must be portable.
- Do not include local machine paths.
- Do not include Windows-specific launchers unless explicitly requested later.

## Mission
- أنشئ `backend` منفصل تمامًا.
- يجب أن يكون `production-oriented`.
- يجب أن يكون `scalable`.
- يجب أن يكون `secure`.
- يجب أن يكون `modular`.
- يجب أن يكون مناسبًا للعمل لاحقًا مع `web client`, `Android app`, و `iOS app`.
- يجب أن يركز على `API contracts`, `domain rules`, `authorization`, `validation`, و `testability`.

## Primary Product Context
- المنصة عبارة عن مطعم أونلاين موجه لسوق عربي/مصري.
- اللغة الأساسية هي العربية.
- اللغة الثانوية هي الإنجليزية.
- النظام يجب أن يدعم `multilingual content`.
- النظام يجب أن يدعم فروع متعددة.
- النظام يجب أن يدعم منيو معقدة.
- النظام يجب أن يدعم إضافات وأحجام وأسعار مرنة.
- النظام يجب أن يدعم كوبونات ووسائل دفع قابلة للتوسع.
- النظام يجب أن يدعم لوحة إدارة عبر `API contracts only`.

## Non-Goals
- لا تقم ببناء صفحة رئيسية.
- لا تقم ببناء واجهة منيو.
- لا تقم ببناء checkout UI.
- لا تقم ببناء admin panel UI.
- لا تقم ببناء responsive layouts.
- لا تقم باختيار خطوط.
- لا تقم باختيار theme بصري.
- لا تقم بإضافة animation libraries.
- لا تناقش تجربة المستخدم البصرية إلا إذا كانت معلومة لازمة فقط لفهم `backend data contracts`.

## Delivery Style
- نفذ المهمة خطوة بخطوة.
- ابدأ دائمًا بالتخطيط الداخلي.
- ثم أنشئ هيكل المشروع.
- ثم أنشئ البنية الأساسية.
- ثم أنشئ الموديولات الأساسية.
- ثم أنشئ الاختبارات.
- ثم أنشئ التوثيق.
- لا تتخطى المراحل.

## Mandatory Internal Planning Before Coding
- Before writing implementation code, create a `plans/` directory.
- The `plans/` directory must exist at project root.
- Populate the directory with detailed markdown files first.
- Use the exact filenames below.
- `plans/00-full-project-overview.md`
- `plans/01-database-schema-and-models.md`
- `plans/02-api-endpoints-and-versioning.md`
- `plans/03-authentication-and-authorization.md`
- `plans/04-branches-and-menus-system.md`
- `plans/05-products-categories-sizes-addons.md`
- `plans/06-reviews-ratings-tags-best-sellers.md`
- `plans/07-users-profiles-addresses-wallet-giftcards.md`
- `plans/08-cart-orders-checkout-shipping-coupons.md`
- `plans/09-admin-roles-permissions-notifications.md`
- `plans/10-security-best-practices-and-testing.md`
- `plans/11-localization-arabic-english.md`
- `plans/12-scalability-and-future-mobile.md`

## Planning File Quality Rules
- كل ملف يجب أن يكون مفصلًا.
- كل ملف يجب أن يوضح قرارات واضحة.
- كل ملف يجب أن يحتوي على تفاصيل تنفيذية عملية.
- كل ملف يجب أن يوضح العلاقات بين الموديولات.
- كل ملف يجب أن يوضح assumptions إن وجدت.
- كل ملف يجب أن يساعد أي `AI coding agent` على المتابعة بدون غموض.
- كل ملف يجب أن يركز على الـ backend فقط.
- لا تضف أي frontend tasks داخل ملفات `plans/`.

## Root Folder Rules
- The active project folder must be `backend/`.
- Do not create `frontend/`.
- Do not create `frontendWebsite/`.
- Do not create `android/`.
- Do not create `ios/`.
- If future folders are mentioned, mention them only as deferred scope.
- Current implementation scope is only `backend/`.

## Backend Technical Stack
- Framework: `Laravel 13`.
- Language: `PHP 8.3+`.
- Database: `MySQL 8+`.
- Queue backend: `Redis`.
- Queue monitoring: `Laravel Horizon`.
- Auth: `Laravel Sanctum`.
- Roles and permissions: `spatie/laravel-permission`.
- Development observability: `Laravel Telescope`.
- Development debugging: `Laravel Debugbar` only in local/dev if compatible.
- Performance option: `Laravel Octane` if compatible with the chosen runtime strategy.
- Testing: `PHPUnit` and/or `Pest` if you choose one consistently.
- Static analysis: `PHPStan`.
- Style: `PSR-12`.

## Architecture Direction
- Favor a modular backend architecture.
- Keep domain boundaries clear.
- Prefer `Service Layer`.
- Prefer `Repository Pattern` where it helps persistence abstraction.
- Use `Form Requests` for validation.
- Use `API Resources` for response formatting.
- Use `Policies` and `Gates` for authorization.
- Use `Events`, `Listeners`, and `Jobs` for asynchronous or heavy flows.
- Use `DTOs` or clear data transfer boundaries when request payloads become complex.
- Use database transactions for multi-step state changes.

## Folder Organization Requirement
- Organize code in a way that stays maintainable as the system grows.
- A modular or domain-oriented structure is preferred.
- Keep files small and purposeful.
- Avoid giant controllers.
- Avoid putting business logic directly inside controllers.
- Avoid fat models that contain unrelated responsibilities.

## API Rules
- Every response must be JSON.
- Do not return HTML.
- Do not return rendered views.
- Use consistent HTTP status codes.
- Use API versioning from day one.
- Start with `/api/v1`.
- Keep room for `/api/v2` later.
- Design endpoints for future mobile reuse.
- Make contracts explicit and stable.

## Response Contract
- Use a consistent JSON envelope unless a stronger project convention is justified.
- A recommended envelope is:
- `success`
- `message`
- `data`
- `meta`
- `errors`
- Keep pagination metadata consistent.
- Keep validation error shape predictable.
- Keep unauthorized and forbidden responses explicit.

## Localization Rules
- العربية هي اللغة الأساسية في المحتوى.
- الإنجليزية لغة مدعومة ثانية.
- Support `Accept-Language` header.
- Support at least `ar` and `en`.
- Store translatable business content in a backend-friendly way.
- Product names must support Arabic and English.
- Product descriptions must support Arabic and English.
- Category names must support Arabic and English.
- Tag names must support Arabic and English if the product needs it.
- Dynamic pages must support Arabic and English.
- API messages should be localizable.

## Currency And Regionalization
- العملة الافتراضية يجب أن تكون قابلة للتغيير.
- Default currency can start as `EGP`.
- Currency label and symbol must come from settings.
- Do not hardcode a single currency forever.
- If conversion is introduced later, keep the architecture open for it.
- Do not overbuild live exchange-rate integration unless explicitly required.

## Settings Philosophy
- Everything configurable should be backend-managed through settings.
- Avoid hardcoded business toggles where possible.
- Use a `settings` strategy or table for dynamic values.
- Support feature toggles.
- Support operational limits.
- Support default timings.
- Support branding metadata as backend-managed data only.
- Treat `theme JSON` as stored configuration, import/export, and validation concern.
- Do not turn theme JSON into frontend rendering work.

## Authentication Strategy
- Use `Laravel Sanctum`.
- Prefer token-based authentication for cross-platform clients.
- Use access tokens securely.
- Do not rely on browser-only sessions as the primary cross-platform strategy.
- Support multiple devices.
- Support token revocation.
- Support logout from current device and all devices if needed.
- Normalize identity inputs before lookup.
- Convert username to lowercase before storage and authentication.
- Convert email to lowercase before storage and authentication.

## Login Rules
- Allow login via `email` or `username`.
- Use normalized lowercase comparison.
- Return clear API responses for invalid credentials.
- Protect login endpoints with rate limiting.
- Consider device metadata if useful for token labeling.

## Password Rules
- Minimum length: `6`.
- Require at least one letter.
- Require at least one number.
- Require at least one symbol.
- Do not require overly complex enterprise-only restrictions beyond that.
- Reject passwords containing username if determinable.
- Reject passwords containing email if determinable.
- Reject passwords containing first name or last name if available.
- Keep the logic explicit and tested.

## User Model Rules
- Every user has a unique primary phone number.
- Primary phone number is required.
- Secondary phone numbers are optional.
- Secondary phone numbers do not need global uniqueness.
- Users can have multiple addresses.
- One address can be marked default.
- Users can have a wallet balance.
- Users can have a public username path.
- Profiles can expose public statistics based on privacy settings.

## Public Profile Rules
- Public profile path concept should map to an API contract.
- A possible path is `/api/v1/profiles/{username}` or similar.
- Do not build a visual page.
- Return profile data as JSON only.
- Support privacy toggles.
- Support public or private profile mode.
- Support toggling visibility for selected metrics.
- Metrics may include total orders.
- Metrics may include total spending.
- Metrics may include monthly rank.
- Metrics may include yearly rank.
- Metrics may include favorite products.

## Roles And Permissions
- Implement granular `RBAC`.
- Use `spatie/laravel-permission`.
- Support dynamic roles.
- Support dynamic permissions.
- Support branch-scoped permissions.
- Support role names like `orders-manager-branch-1`.
- Support specialized roles such as support, order review, delivery management, content moderation, and settings management.
- Keep authorization logic explicit.
- Use `Policies` for resource-level checks.
- Use `Gates` where broader ability checks make sense.

## Super Admin Rule
- The first platform owner or explicit super-admin account must have full access.
- If using the legacy rule `id = 1`, make the behavior clear and deliberate.
- Prefer an explicit `super_admin` capability in code logic even if seeded from the first account.
- All elevated logic must be auditable.

## Auditability
- Important admin actions should be logged.
- Sensitive changes should be traceable.
- Consider audit logs for:
- order status changes
- refunds
- wallet adjustments
- coupon creation and changes
- settings changes
- role and permission changes
- branch enable/disable actions

## Branch System
- Support one branch or many branches.
- Each branch has its own identity.
- Each branch can have address data.
- Each branch can have contact data.
- Each branch can have coordinates.
- Each branch can have business hours.
- Each branch can have delivery zones.
- Each branch can have enable/disable state.

## Delivery Zones
- Delivery zones belong to a branch.
- Each delivery zone can have its own fee.
- Each delivery zone can have its own availability state.
- Delivery fees must be configurable.
- Delivery zone validation must happen during checkout.
- Delivery fee calculation must be deterministic and testable.

## Branch Availability Logic
- Products may be available in all branches.
- Products may be available in selected branches only.
- The data model must support both cases.
- Checkout must reject carts that cannot be fulfilled by the selected branch.
- Error responses must clearly identify unavailable items.
- Validation must happen before order creation is finalized.

## Menu And Category System
- Categories can be nested.
- Support parent and child categories.
- Allow a product to belong to multiple categories.
- Support tags as separate many-to-many metadata.
- Support products appearing in multiple logical groupings.
- Keep category querying efficient.
- Avoid N+1 problems in menu endpoints.

## Product Core Fields
- Product name in Arabic and English.
- Product description in Arabic and English.
- Product short description if needed.
- Product base availability state.
- Product per-branch availability state when applicable.
- Product stock toggle if limited stock is enabled.
- Product media references.
- Product sort behavior support.
- Product tags.
- Product best seller flags or computed ranking metadata.

## Media Rules
- Each product can have a primary image.
- Each product can have a gallery of images.
- Each product can have uploaded videos if supported.
- Each product can have external video links such as YouTube.
- Media validation must be strict.
- Store media metadata cleanly.
- Do not embed frontend slideshow logic.
- Expose media as JSON structures only.

## Variants And Sizes
- Support variant-like sizes.
- Example sizes: `small`, `medium`, `large`.
- Each size can have its own price.
- Sizes can influence available add-ons.
- Sizes must be validated at add-to-cart and checkout time.
- Price snapshots should be handled carefully when the order is created.

## Add-On System
- Support add-on groups.
- Support `single-select` behavior.
- Support `multi-select` behavior.
- Support required and optional groups if needed.
- Support add-on pricing.
- Support size-specific add-on pricing when the business rule requires it.
- Validate min/max selection counts if defined.
- Keep the data model explicit enough for future app clients.

## Cart Rules
- Cart must support same product with different configurations.
- A line item is not just product ID.
- A line item must include configuration identity.
- Quantity must be per configured line item.
- Price recalculation must be controlled.
- Cart validation must detect unavailable branches.
- Cart validation must detect disabled products.
- Cart validation must detect invalid size or add-on combinations.
- Cart validation should detect stock issues if stock control is enabled.

## Order Creation Rules
- Checkout must validate branch selection.
- Checkout must validate delivery zone selection.
- Checkout must validate product availability in the chosen branch.
- Checkout must validate pricing integrity.
- Checkout must validate coupon rules.
- Checkout must validate payment method compatibility.
- Checkout must sanitize customer notes.
- Checkout must persist a reliable pricing snapshot.

## Order Status Lifecycle
- Use an explicit order state machine or well-defined transitions.
- Core statuses should cover:
- `created`
- `pending`
- `confirmed`
- `preparing`
- `out_for_delivery`
- `delivered`
- `cancelled`
- `refunded`
- If additional statuses are needed, define them clearly and document transitions.

## Grace Period Rule
- There is a `2-minute` grace period after order creation.
- During this window, the customer can cancel instantly.
- During this window, the customer can update notes if the design allows it.
- After this window, the order becomes locked for immediate self-edit/cancel behavior.
- The timing value should be configurable through settings.
- The implementation must be testable.

## Delivery Assignment
- Orders may have assigned delivery personnel.
- Store delivery person name if needed.
- Store delivery person phone if needed.
- Expose safe tracking information to the customer API.
- Do not expose internal data unnecessarily.

## Reviews And Ratings
- Reviews must be tied to verified purchases.
- Allow rating values from `1` to `5`.
- Allow optional comment text.
- Allow anonymous display option.
- Support admin moderation.
- Support admin removal of abusive reviews.
- Support manually created marketing reviews only if explicitly authorized by admin functionality and documented clearly.
- Keep fake review injection restricted to privileged roles.

## Review Integrity Rules
- A user should only review a product they purchased through a completed or eligible order state.
- If repeated purchases allow repeated reviews, define the rule explicitly.
- Prevent duplicate abuse if the business rule says only one review per fulfilled line item.
- Keep moderation actions auditable.

## Wallet System
- Users can have wallet balance.
- Wallet must support credit and debit operations.
- Wallet changes must be logged.
- Refunds can credit the wallet when business rules allow.
- Wallet should support use during checkout.
- If partial wallet usage is allowed, implement it explicitly and test it.

## Gift Card System
- Gift cards are backend-controlled.
- Gift cards can be enabled or disabled via settings.
- Gift cards use redeemable codes.
- Redeeming a valid code credits wallet balance.
- Codes must be unique.
- Code usage rules must be explicit.
- Expiry rules must be explicit if used.
- Redemption must be transactional.

## Coupon System
- Coupons may be fixed amount or percentage.
- Percentage coupons may have maximum discount caps.
- Coupons may require minimum cart value.
- Coupons may target:
- all products
- specific products
- specific categories
- delivery only
- products only
- products plus delivery
- Coupons may have per-user limits.
- Coupons may have global usage limits.
- Coupons may have start and end validity windows.
- Coupons may have first-order restrictions if required.

## Coupon Edge Rules
- Never convert unused discount remainder into wallet money unless explicitly required.
- If discount exceeds eligible subtotal, cap the applied discount at the eligible amount.
- If a coupon excludes delivery fees, do not discount delivery fees.
- If a delivery-only coupon is used, apply it only to delivery amount.
- Return clear calculation metadata in the API response.

## Payment System
- Initial payment methods:
- `cash_on_delivery`
- `wallet`
- Architecture must stay open for future gateways.
- Do not tightly couple order logic to one gateway.
- Use a payment strategy or provider abstraction where useful.
- Keep gateway additions isolated.
- Future gateways may include regional providers.

## Notifications
- Support database notifications.
- Support email notifications.
- Keep broadcasting optional and configurable.
- Admins should receive operational notifications where appropriate.
- Customers should receive order-state notifications where appropriate.
- Notification channels must be configurable where reasonable.

## Mail Configuration
- Email support must be toggleable.
- Mail transport configuration must be environment-driven.
- If multiple mail modes are supported, document them clearly.
- Avoid hardcoding secrets.
- Use queueing for heavy email work where sensible.

## Settings And Dynamic Pages
- General settings should include site-level metadata.
- Examples:
- site name
- site contact info
- default currency
- logos or asset paths as backend-managed references
- operational toggles
- order grace period duration
- gift card enable/disable
- wallet enable/disable if needed
- maintenance flags if needed
- Dynamic pages such as TOS or Privacy can be modeled as backend-managed content entities.
- Expose them via APIs.
- Do not build their rendered frontend pages.

## Search, Filter, Sort
- Menu APIs must support searching by relevant fields.
- Search may include name.
- Search may include tags.
- Search may include categories.
- Filter options must be designed for future clients.
- Sorting should support clear documented options.
- Keep query performance under control.
- Add indexes where needed.

## Best Sellers And Rankings
- Support top-selling indicators.
- Support manual pinning if business needs it.
- Support per-category ranking if required.
- Make the source of truth explicit.
- Cache expensive computations if needed.

## Security First Principles
- Never trust client input.
- Validate all request payloads.
- Sanitize free-text fields when needed.
- Protect against XSS.
- Protect against SQL injection by safe ORM/query usage and validation.
- Protect against mass assignment.
- Protect file uploads.
- Protect token misuse.
- Limit sensitive endpoint rates.
- Keep secrets in environment configuration.

## Special Security Attention Areas
- Order notes.
- Review comments.
- Profile fields.
- Uploaded media metadata.
- Coupon codes and redeem flows.
- Authentication endpoints.
- Password reset flows if implemented.
- Admin-only endpoints.

## File Upload Security
- Validate mime types.
- Validate file size.
- Validate allowed extensions.
- Store files safely.
- Do not trust user-provided filenames blindly.
- Consider malware-scan hooks or simulation points if a real scanner is unavailable.
- Restrict executable content risk.

## CORS And Token Stability
- Configure `CORS` deliberately.
- Do not allow broken auth flows that randomly log users out.
- Keep token-based auth stable across routes.
- Keep logout behavior explicit.
- Keep revoke behavior explicit.
- Test auth state across protected endpoints.

## Error Handling
- Use consistent JSON errors.
- Use proper HTTP codes.
- Do not leak stack traces in production.
- Log useful diagnostic information safely.
- Distinguish validation errors from authorization errors.

## Performance Rules
- Use eager loading thoughtfully.
- Avoid N+1 problems.
- Cache expensive repeated lookups.
- Cache settings where appropriate.
- Cache category trees where appropriate.
- Cache top-selling data where appropriate.
- Use queues for heavy background work.
- Keep invalidation strategy documented.

## Testing Requirements
- Write `Feature tests`.
- Write `Unit tests`.
- Write authorization tests.
- Write validation tests.
- Write branch availability tests.
- Write coupon calculation tests.
- Write wallet and gift card tests.
- Write order grace-period tests.
- Write localization tests where relevant.
- Write security-focused tests for sanitization-sensitive flows.

## Code Quality Rules
- Follow `PSR-12`.
- Keep naming consistent.
- Prefer explicitness over cleverness.
- Keep classes focused.
- Use PHPDoc where it clarifies complex contracts.
- Use strict validation objects.
- Avoid duplicated business logic.
- Avoid unexplained magic values.

## Documentation Requirements
- Create a high-quality `README.md`.
- Explain setup clearly.
- Explain environment variables clearly.
- Explain queue requirements clearly.
- Explain Redis usage clearly.
- Explain API versioning clearly.
- Explain authentication flow clearly.
- Explain testing commands clearly.
- Explain key business modules clearly.

## Implementation Order
- Step 1: create internal planning docs in `plans/`.
- Step 2: scaffold `backend/` Laravel 13 project.
- Step 3: configure core packages and environment examples.
- Step 4: establish API versioning structure.
- Step 5: implement authentication and user foundations.
- Step 6: implement roles, permissions, and admin authorization foundations.
- Step 7: implement branches, delivery zones, and settings.
- Step 8: implement categories, tags, products, sizes, media, and add-ons.
- Step 9: implement carts, pricing validation, and checkout.
- Step 10: implement coupons, wallet, and gift cards.
- Step 11: implement orders, status transitions, and notifications.
- Step 12: implement reviews, public profiles, and privacy controls.
- Step 13: implement tests.
- Step 14: finalize docs.

## Output Rules For The Downstream Agent
- Show meaningful progress.
- Keep changes organized.
- Use small files and reusable components.
- Do not create unrelated artifacts.
- Do not add placeholder frontend files.
- Do not silently skip hard requirements.
- If a requirement is unclear, choose the safest backend-compatible default and document it.

## Explicit Frontend Exclusion Reminder
- Ignore all frontend parts from the original brief.
- Ignore all requests about website design.
- Ignore all requests about CSS frameworks.
- Ignore all requests about JavaScript frameworks.
- Ignore all requests about animations.
- Ignore all requests about UI themes except storing backend-managed theme configuration data.
- Ignore all requests about rendering pages.

## Deferred Scope Reminder
- `Android` is future scope only.
- `iOS` is future scope only.
- Any website client is future scope only.
- Current mission is to make the backend ready for those future clients.

## Definition Of Done
- A Laravel 13 backend exists under `backend/`.
- The codebase is API-only.
- The codebase exposes versioned JSON APIs.
- The codebase includes modular domain logic.
- The codebase includes secure authentication and authorization.
- The codebase includes the required business modules.
- The codebase includes tests.
- The codebase includes documentation.
- The codebase includes internal `plans/*.md`.
- The codebase contains no frontend implementation artifacts.

## Final Self-Check
- Did you stay backend-only from start to finish.
- Did you avoid frontend generation entirely.
- Did you create `plans/00` through `plans/12` before coding.
- Did you keep `backend/` as the only active project folder.
- Did you keep all responses and contracts JSON-only.
- Did you normalize username and email to lowercase.
- Did you protect notes and other free text from unsafe handling.
- Did you define order status rules clearly.
- Did you implement or document coupon edge cases correctly.
- Did you keep the architecture open for future mobile clients.
