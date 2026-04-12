# Backend-Only Prompt Pack

## Purpose
- This folder contains a reusable bilingual prompt pack.
- The pack is optimized for `Codex`, `Claude`, and `Gemini Pro`.
- The pack is intentionally `backend only`.
- It removes all frontend implementation scope from the original brief.
- It keeps mobile and website clients only as future `API consumers`.

## Verified Baseline
- Date lock for this pack: `April 11, 2026`.
- Verified assumption used in the pack: `Laravel 13.x` exists in official documentation.
- Verified baseline used in the pack: `PHP 8.3+` is required for the Laravel 13 generation being targeted here.
- This pack uses portable wording.
- This pack does not include local Windows launcher paths.
- This pack does not assume one machine, one shell profile, or one editor.

## Main Goal
- Rewrite the user brief into a high-control prompt pack.
- Keep the narrative primarily Arabic.
- Keep English for technical terms and backend contracts.
- Convert vague wishes into enforceable backend requirements.
- Make the output safer for code-generation agents.

## Hard Scope
- `Laravel 13 API backend only`
- `No frontend`
- `No Blade`
- `No Livewire`
- `No Filament`
- `No UI design`
- `No CSS frameworks`
- `No JavaScript frameworks`
- `No mobile app code`
- `No Android project`
- `No iOS project`

## Folder Contents
- `00-master-backend-only-prompt.md`
- `01-architecture-spec-companion.md`
- `02-security-auth-companion.md`
- `03-execution-checklist.md`
- `04-acceptance-checklist.md`

## How To Use
1. Start with `00-master-backend-only-prompt.md`.
2. Paste it into your target coding agent.
3. Attach the companion files if the agent can consume multiple docs.
4. If the agent handles only one prompt, merge the master prompt with the checklists.
5. If the agent tends to drift into frontend work, attach `04-acceptance-checklist.md` as a guardrail.

## Recommended Usage By Agent Type
### Codex
- Use the master prompt as the system or task body.
- Attach the execution checklist when you want strict ordering.
- Attach the acceptance checklist when you want hard review gates.

### Claude
- Use the master prompt first.
- Add the architecture companion if you want better planning depth.
- Add the security companion if the run is security-sensitive.

### Gemini Pro
- Use the master prompt plus the acceptance checklist.
- Keep the execution checklist nearby to reduce scope drift.
- Prefer the shorter section headers when pasting into constrained contexts.

## Why The Pack Is Split
- One giant prompt becomes hard to audit.
- Splitting improves reuse.
- Splitting makes backend constraints easier to enforce.
- Splitting allows one file to act as the canonical prompt and the others as control layers.
- Splitting makes future edits safer.

## What The Pack Intentionally Preserves
- Arabic-first product context.
- Egyptian and Arabic restaurant business needs.
- Multi-branch support.
- Wallet, coupons, gift cards, and delivery logic.
- Admin-driven configurability.
- Future mobile compatibility.

## What The Pack Intentionally Removes
- Frontend stack research.
- Website visual design discussion.
- Animation libraries.
- Blade or server-rendered pages.
- Frontend validation implementation details.
- Any instruction to generate HTML, CSS, Tailwind, React, Vue, Angular, or similar.

## Backend Philosophy
- API-first.
- Modular.
- Secure by default.
- Future-proof for mobile consumption.
- Configurable via backend-managed settings.
- Clear contracts before code generation.

## Important Reminder
- The master prompt requires the implementing agent to create internal project planning documents first.
- Those documents live under `plans/`.
- The internal planning sequence remains:
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

## Output Expectations From The Downstream Agent
- It must stay backend-only.
- It must not create frontend folders.
- It must not invent UI implementation work.
- It must produce JSON APIs only.
- It must use secure defaults.
- It must include tests.

## Maintenance Notes
- If Laravel major-version facts change later, update the baseline section first.
- If your business rules change, update the master prompt and the acceptance checklist together.
- If you add payment providers later, update the architecture and security companions together.
