# Scalability And Future Mobile

## Goal
- Keep the backend ready for future clients and higher traffic.

## Scalability Principles
- Stable API contracts.
- Token-based auth.
- Clear domain services.
- Queue heavy tasks.
- Cache hot data.
- Keep storage abstraction flexible.

## Mobile Readiness
- Bearer token auth fits mobile.
- JSON-only responses fit mobile.
- Versioned endpoints fit long-lived app releases.
- Snapshot-based orders keep historical consistency.

## Future Client Compatibility
- Avoid web-specific assumptions in API responses.
- Avoid session-only logic.
- Return explicit data needed by mobile apps.
- Keep enums/status names stable and documented.

## Caching Candidates
- Public settings.
- Branch list.
- Delivery zones by branch.
- Category tree.
- Best-seller products.
- Product detail if traffic warrants.

## Queue Candidates
- Notifications.
- Mail.
- Best-seller recomputation.
- Media post-processing.
- Audit fan-out tasks if added.

## Storage/CDN Strategy
- Use Laravel disk abstraction.
- Dedicated uploads disk.
- Public URL base configurable.
- CDN migration should be configuration-driven.

## Database Strategy
- Use SQLite locally.
- Keep migrations MySQL-friendly.
- Use indexes for hot queries.
- Keep decimal money values.

## Future MySQL Notes
- Move to MySQL 8 in staging/production if needed.
- Re-test JSON/text behavior.
- Re-test indexes and constraints.

## Octane / Horizon / Redis Notes
- Keep code Octane-safe if Octane used later.
- Horizon useful once Redis queues are active.
- Local dev can defer some of these if environment is lighter.

## Scaling Risks
- Product list query complexity.
- Coupon evaluation complexity.
- Wallet/order race conditions.
- Notification fan-out.
- Best-seller recalculation cost.

## Mitigation Strategies
- Query objects.
- Indexing.
- Eager loading.
- Cache with invalidation points.
- Transactions for financial writes.
- Background jobs for heavy side effects.

## Future Mobile API Considerations
- Return compact but sufficient payloads.
- Provide pagination metadata.
- Provide structured error codes if needed later.
- Avoid response shapes that depend on HTML rendering concepts.

## Future Features
- Push notifications.
- Scheduled orders.
- Loyalty points.
- Driver accounts and tracking.
- Region-based taxation.
- Multi-brand tenancy.

## Testing Readiness
- Keep curl-based local checks for dev.
- Keep feature tests around auth, cart, checkout, orders.
- Add load/perf tests later for hot endpoints.

## Final Notes
- Design v1 for correctness first.
- Keep extension points in services and configuration.
- Do not over-engineer beyond current backend scope.
