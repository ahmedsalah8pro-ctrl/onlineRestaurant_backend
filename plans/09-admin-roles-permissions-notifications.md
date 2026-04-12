# Admin Roles Permissions Notifications

## Goal
- Provide strong operational control without overexposing privileges.

## Admin Core Capabilities
- Manage branches and zones.
- Manage products, categories, tags, sizes, add-ons.
- Manage orders and delivery assignments.
- Manage coupons and gift cards.
- Manage settings and dynamic pages.
- Manage roles, permissions, and admin users.
- Moderate reviews.

## Role Model
- Use Spatie roles and permissions.
- Roles are human-friendly bundles.
- Permissions are atomic operations.
- Policies enforce object-level rules.

## Suggested Roles
- `super-admin`
- `catalog-manager`
- `orders-manager`
- `branch-manager`
- `support-agent`
- `settings-manager`
- `marketing-manager`

## Suggested Permission Groups
| Group | Example Permissions |
| --- | --- |
| Branches | branches.view, branches.create, branches.update |
| Delivery | delivery-zones.manage, orders.assign-delivery |
| Catalog | products.create, products.update, categories.manage |
| Orders | orders.view, orders.update-status, orders.refund |
| Reviews | reviews.moderate |
| Coupons | coupons.manage |
| Wallet | wallet.adjust |
| Settings | settings.manage |
| Admins | roles.manage, admin-users.manage |

## Branch Scope Strategy
- Permissions stay generic.
- Branch assignments determine effective scope.
- Policies check user assigned branches against target branch.

## Super Admin Notes
- Super admin bypass is centralized.
- Super admin sees all logs and all branches.
- Super admin can manage roles/permissions.

## Admin User Strategy
- Reuse main `users` table.
- Admin is any user with elevated role(s).
- Avoid separate admin table unless operationally needed.

## Notifications Goals
- Notify customers about order changes.
- Notify admins/staff about new orders or operational events.
- Support database notifications in v1.
- Support email notifications where configured.

## Notification Channels
- Database.
- Mail.
- Broadcast later if enabled.

## Notification Candidates
- New order created.
- Order confirmed.
- Order out for delivery.
- Order delivered.
- Order cancelled.
- Refund completed.
- Gift card redeemed.
- Sensitive settings changed.

## Notification Storage
- Use Laravel notifications table.
- Keep notification payloads JSON-friendly.
- Include translation-ready message keys where possible.

## Admin Audit Events
- Role assigned.
- Permission set changed.
- Settings updated.
- Wallet adjusted.
- Coupon created/updated/deleted.
- Gift card generated.
- Order refunded.

## Suggested Services
- `AdminRoleService`
- `PermissionSyncService`
- `OrderNotificationService`
- `AuditLogService`

## Suggested Policies
- `RolePolicy`
- `PermissionPolicy`
- `SettingsPolicy`
- `AdminUserPolicy`

## Dynamic Pages Notes
- Admin can CRUD pages like TOS and Privacy.
- These are backend content entities only.
- Public API can expose active page by slug.

## Theme JSON Notes
- Admin can upload/update/export theme settings JSON.
- Treat this as stored configuration only.
- Validate JSON structure.
- Do not render anything server-side.

## Settings Groups
- `general`
- `currency`
- `auth`
- `orders`
- `wallet`
- `gift_cards`
- `notifications`
- `mail`
- `theme`
- `features`

## Admin Endpoint Security
- Require auth.
- Require explicit permissions.
- Apply stricter rate limits on admin auth.
- Audit privileged actions.

## Testing Scenarios
1. Branch manager sees only assigned branch orders.
2. Support agent cannot edit settings.
3. Super admin can assign roles.
4. Review moderator can hide review but not change wallet.
5. New order creates notification to appropriate staff.

## Future Extensions
- In-app admin dashboard widgets.
- Escalation rules.
- Notification templates editor.
- Webhook notifications.
