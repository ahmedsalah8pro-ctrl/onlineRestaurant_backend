# Acceptance Checklist

## Purpose
- هذا الملف يعرّف النجاح والفشل بشكل موضوعي.
- استخدمه لمراجعة prompt أو implementation ناتج من الـ prompt.
- إذا فشل أي بند حرج، اعتبر النتيجة غير مكتملة.

## A. Scope Integrity
- Does the prompt state `backend only` clearly at the top.
- Does it explicitly ban frontend implementation.
- Does it explicitly ban Blade.
- Does it explicitly ban Livewire.
- Does it explicitly ban Filament.
- Does it explicitly ban UI design discussion.
- Does it explicitly ban CSS/JS framework selection.
- Does it keep Android and iOS as future consumers only.
- Does it keep `backend/` as the current active project folder.
- Does it avoid creating `frontend/`, `android/`, or `ios/` now.

## Fail Conditions For Scope
- Any generated frontend code exists.
- Any generated Blade template exists.
- Any generated UI component exists.
- Any section instructs selecting a frontend framework.
- Any section instructs designing pages visually.
- Any section mixes backend tasks with frontend delivery.

## B. Technical Baseline Integrity
- Does the pack explicitly target `Laravel 13`.
- Does the pack explicitly target `PHP 8.3+`.
- Does it avoid vague wording like `latest maybe v12 or v13`.
- Does it avoid hardcoded local Windows executable paths.
- Does it stay portable across environments.

## C. Planning Requirement Integrity
- Does the prompt require `plans/` before implementation.
- Does it list all required planning files.
- Does it include files `00` through `12`.
- Does it preserve exact planning file names.
- Does it instruct the downstream agent to keep those files backend-only.

## D. API Contract Integrity
- Are APIs required to be `RESTful` or REST-compatible.
- Are responses required to be JSON only.
- Is API versioning required from day one.
- Is `/api/v1` specified clearly.
- Is a consistent response envelope suggested or required.
- Are HTTP status codes mentioned.
- Are validation errors expected in structured JSON.

## E. Authentication Integrity
- Is `Laravel Sanctum` the default auth choice.
- Does the pack prefer access tokens for cross-platform consumers.
- Does it avoid session-only architecture as the primary mobile-ready approach.
- Does it mention multi-device token support.
- Does it mention logout and revocation behavior.
- Does it require lowercase normalization for username and email.
- Does it define password rules clearly.

## F. Authorization Integrity
- Are `Policies` required.
- Are `Gates` required where needed.
- Is `spatie/laravel-permission` required.
- Are granular roles and permissions described.
- Is branch-scoped authorization described.
- Is super-admin behavior documented.

## G. Branch And Catalog Integrity
- Does the prompt require single-branch and multi-branch support.
- Does it require delivery zones with fees.
- Does it require per-branch product availability.
- Does it require category nesting.
- Does it require products in multiple categories.
- Does it require tags.
- Does it require sizes/variants.
- Does it require add-on groups with single and multi select support.

## H. Order And Checkout Integrity
- Does the prompt require cart support for same product with different configurations.
- Does it require branch compatibility validation at checkout.
- Does it require pricing validation.
- Does it require shipping calculation.
- Does it require snapshotting final pricing into the order.
- Does it require order status workflow.
- Does it require the 2-minute grace period.
- Does it require customer cancellation/edit constraints.

## I. Coupon And Wallet Integrity
- Does the prompt require fixed and percentage coupons.
- Does it require max discount caps.
- Does it require minimum cart conditions.
- Does it require specific product/category targeting.
- Does it require per-user and global usage limits.
- Does it require delivery-only or delivery-inclusive logic.
- Does it forbid converting extra discount remainder into wallet money by default.
- Does it require wallet support.
- Does it require gift-card support.

## J. Profile And Review Integrity
- Does it require public profile API support.
- Does it require privacy settings.
- Does it require profile statistics.
- Does it require verified-purchase reviews.
- Does it require anonymous review option.
- Does it require moderation capability.

## K. Settings And Dynamic Content Integrity
- Does it require global settings.
- Does it require feature toggles.
- Does it require currency configurability.
- Does it treat theme JSON as backend-managed data.
- Does it avoid turning theme JSON into frontend rendering work.
- Does it require dynamic page entities via API.

## L. Security Integrity
- Does the pack explicitly mention XSS defense.
- Does the pack explicitly mention SQL injection defense.
- Does the pack explicitly mention mass assignment defense.
- Does the pack explicitly mention file upload validation.
- Does the pack explicitly mention rate limiting.
- Does the pack explicitly mention free-text sanitization.
- Does the pack explicitly mention token handling safety.
- Does the pack explicitly mention branch/order authorization safety.
- Does it mention auditability for sensitive actions.

## M. Testing Integrity
- Does the prompt require feature tests.
- Does the prompt require unit tests.
- Does the prompt require security-sensitive tests.
- Does it mention auth tests.
- Does it mention authorization tests.
- Does it mention coupon edge-case tests.
- Does it mention order grace-period tests.
- Does it mention review eligibility tests.

## N. Documentation Integrity
- Does it require a project `README.md`.
- Does it require setup documentation.
- Does it require environment variable documentation.
- Does it require authentication flow documentation.
- Does it require API/versioning documentation.
- Does it require internal plan docs.

## O. Prompt-Pack Quality Integrity
- Is Arabic the primary narrative language.
- Is English used mainly for technical precision.
- Is the content organized rather than duplicated blindly.
- Is the combined pack larger than 1000 meaningful lines.
- Is the content free from obvious padding lines.
- Is the content reusable across `Codex`, `Claude`, and `Gemini Pro`.
- Does it avoid vendor-exclusive syntax dependencies.

## P. Portable Prompt Integrity
- No hardcoded local `php.exe` path.
- No local username path assumptions.
- No OS-locked launcher commands unless clearly optional.
- No editor-specific dependency.

## Q. Implementation Acceptance For A Downstream Run
- `plans/00` through `plans/12` exist.
- `backend/` exists as Laravel 13 project.
- Core packages are installed and configured.
- API versioning exists.
- Auth works with Sanctum.
- Permissions work with Spatie.
- Branches and delivery zones exist.
- Catalog entities exist.
- Cart and checkout logic exist.
- Orders and status transitions exist.
- Coupons, wallet, and gift cards exist.
- Reviews and profiles exist.
- Settings and dynamic pages exist.
- Tests exist.
- Documentation exists.

## R. Red Flags
- The agent says “frontend later” and still creates frontend code now.
- The agent chooses a JS framework.
- The agent generates Blade templates “just for testing”.
- The agent stores unsafe raw HTML without policy.
- The agent uses sessions as the only auth strategy despite the cross-platform token requirement.
- The agent skips plan files.
- The agent leaves coupon edge-case behavior undocumented.
- The agent ignores branch availability validation.
- The agent leaves free-text sanitization unspecified.

## S. Pass Definition
- All critical scope, security, API, auth, branch, order, and testing checks pass.
- No frontend artifacts are present.
- No critical business rule is missing.
- No machine-specific path assumption remains.
- The result is implementation-ready.

## T. Reviewer Decision Template
- `PASS` if all critical items are satisfied and no red flag is present.
- `PASS WITH MINOR GAPS` only if gaps are documentation-level and do not change scope or security.
- `FAIL` if backend-only scope is broken.
- `FAIL` if auth/security rules are materially incomplete.
- `FAIL` if planning docs are missing.
- `FAIL` if the prompt still mixes frontend implementation into the build request.
