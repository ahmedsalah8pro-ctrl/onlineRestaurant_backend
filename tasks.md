# Backend Master Tasks Matrix

Generated at: 2026-04-12T05:46:15
Workspace: c:/Users/PC/Desktop/onlineRestaurant2
Total task lines: 2550

Legend:
- ?? | done
- ?? | tested
- ?? | partial
- ?? | pending
- ?? | blocked_or_risk
- ?? | planned
- ?? | suggested
- ? | out_of_scope_backend_only
- ? | backlog_future

Status counts:
- done: 824
- tested: 354
- partial: 92
- pending: 1
- blocked_or_risk: 0
- planned: 887
- suggested: 108
- out_of_scope_backend_only: 195
- backlog_future: 89

Tasks:
0001 | ?? | done | implementation | Laravel 13 backend root created under backend/ with API-only structure and no frontend artifacts.
0002 | ?? | done | implementation | Laravel Sanctum token authentication is wired for cross-platform backend API usage.
0003 | ?? | done | implementation | SQLite local development database is configured and used for backend simplicity.
0004 | ?? | done | implementation | API versioning starts at /api/v1 across public, customer, and admin routes.
0005 | ?? | done | implementation | Arabic and English payload support exists through translatable JSON fields and locale middleware.
0006 | ?? | done | implementation | Core restaurant domains are implemented: branches, delivery zones, categories, tags, products, sizes, add-ons, carts, orders, coupons, wallets, gift cards, reviews, settings, roles, notifications, and audit logs.
0007 | ?? | tested | verification | PHPUnit suite covers auth, cart, checkout, reviews, wallet, notifications, admin CRUD, uploads, permissions, and audit log flows.
0008 | ?? | tested | verification | Python full_api_flow runner simulates public browsing, signup, address management, cart usage, checkout, order lifecycle, review posting, admin CRUD, upload, moderation, and permission denials.
0009 | ?? | tested | verification | Security checks currently verified include auth boundaries, route protection, upload mime restrictions, XSS sanitization, password identity rejection, and login throttling.
0010 | ?? | partial | quality | Static analysis is green using the current PHPStan baseline, but the baseline still masks many legacy app-level typing issues that should be reduced over time.
0011 | ?? | partial | architecture | Horizon, Octane, Telescope, and Debugbar packages are installed, but production-grade infrastructure wiring and runtime orchestration still need completion.
0012 | ?? | pending | deployment | Server deployment and reverse-proxy provisioning still need to be finalized and verified on the remote Ubuntu server.
0013 | ? | backlog_future | future | Future multi-domain and Cloudflare routing strategy must be formalized before production launch.
0014 | ? | out_of_scope_backend_only | scope | Frontend implementation, Blade views, Livewire, Filament, CSS frameworks, and UI design remain intentionally excluded.
0015 | ?? | done | routes | Route implemented: GET|HEAD api/v1/addresses is registered and reachable in the backend router.
0016 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/addresses.
0017 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/addresses.
0018 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/addresses.
0019 | ?? | done | routes | Route implemented: POST api/v1/addresses is registered and reachable in the backend router.
0020 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/addresses.
0021 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/addresses.
0022 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/addresses.
0023 | ?? | done | routes | Route implemented: PATCH api/v1/addresses/{address} is registered and reachable in the backend router.
0024 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/addresses/{address}.
0025 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/addresses/{address}.
0026 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/addresses/{address}.
0027 | ?? | done | routes | Route implemented: DELETE api/v1/addresses/{address} is registered and reachable in the backend router.
0028 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/addresses/{address}.
0029 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/addresses/{address}.
0030 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: DELETE api/v1/addresses/{address}.
0031 | ?? | done | routes | Route implemented: PATCH api/v1/addresses/{address}/default is registered and reachable in the backend router.
0032 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/addresses/{address}/default.
0033 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/addresses/{address}/default.
0034 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/addresses/{address}/default.
0035 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/audit-logs is registered and reachable in the backend router.
0036 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/audit-logs.
0037 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/audit-logs.
0038 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/audit-logs.
0039 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/branches is registered and reachable in the backend router.
0040 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/branches.
0041 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/branches.
0042 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/branches.
0043 | ?? | done | routes | Route implemented: POST api/v1/admin/branches is registered and reachable in the backend router.
0044 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/branches.
0045 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/branches.
0046 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/branches.
0047 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/branches/{branch} is registered and reachable in the backend router.
0048 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/branches/{branch}.
0049 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/branches/{branch}.
0050 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/branches/{branch}.
0051 | ?? | done | routes | Route implemented: PATCH api/v1/admin/branches/{branch} is registered and reachable in the backend router.
0052 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/branches/{branch}.
0053 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/branches/{branch}.
0054 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/branches/{branch}.
0055 | ?? | done | routes | Route implemented: DELETE api/v1/admin/branches/{branch} is registered and reachable in the backend router.
0056 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/branches/{branch}.
0057 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/branches/{branch}.
0058 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/branches/{branch}.
0059 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/categories is registered and reachable in the backend router.
0060 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/categories.
0061 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/categories.
0062 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/categories.
0063 | ?? | done | routes | Route implemented: POST api/v1/admin/categories is registered and reachable in the backend router.
0064 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/categories.
0065 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/categories.
0066 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/categories.
0067 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/categories/{category} is registered and reachable in the backend router.
0068 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/categories/{category}.
0069 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/categories/{category}.
0070 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/categories/{category}.
0071 | ?? | done | routes | Route implemented: PATCH api/v1/admin/categories/{category} is registered and reachable in the backend router.
0072 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/categories/{category}.
0073 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/categories/{category}.
0074 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/categories/{category}.
0075 | ?? | done | routes | Route implemented: DELETE api/v1/admin/categories/{category} is registered and reachable in the backend router.
0076 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/categories/{category}.
0077 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/categories/{category}.
0078 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/categories/{category}.
0079 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/coupons is registered and reachable in the backend router.
0080 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/coupons.
0081 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/coupons.
0082 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/coupons.
0083 | ?? | done | routes | Route implemented: POST api/v1/admin/coupons is registered and reachable in the backend router.
0084 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/coupons.
0085 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/coupons.
0086 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/coupons.
0087 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/coupons/{coupon} is registered and reachable in the backend router.
0088 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/coupons/{coupon}.
0089 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/coupons/{coupon}.
0090 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/coupons/{coupon}.
0091 | ?? | done | routes | Route implemented: PATCH api/v1/admin/coupons/{coupon} is registered and reachable in the backend router.
0092 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/coupons/{coupon}.
0093 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/coupons/{coupon}.
0094 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/coupons/{coupon}.
0095 | ?? | done | routes | Route implemented: DELETE api/v1/admin/coupons/{coupon} is registered and reachable in the backend router.
0096 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/coupons/{coupon}.
0097 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/coupons/{coupon}.
0098 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/coupons/{coupon}.
0099 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/delivery-zones is registered and reachable in the backend router.
0100 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/delivery-zones.
0101 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/delivery-zones.
0102 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/delivery-zones.
0103 | ?? | done | routes | Route implemented: POST api/v1/admin/delivery-zones is registered and reachable in the backend router.
0104 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/delivery-zones.
0105 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/delivery-zones.
0106 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/delivery-zones.
0107 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/delivery-zones/{deliveryZone} is registered and reachable in the backend router.
0108 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/delivery-zones/{deliveryZone}.
0109 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/delivery-zones/{deliveryZone}.
0110 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/delivery-zones/{deliveryZone}.
0111 | ?? | done | routes | Route implemented: PATCH api/v1/admin/delivery-zones/{deliveryZone} is registered and reachable in the backend router.
0112 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/delivery-zones/{deliveryZone}.
0113 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/delivery-zones/{deliveryZone}.
0114 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/delivery-zones/{deliveryZone}.
0115 | ?? | done | routes | Route implemented: DELETE api/v1/admin/delivery-zones/{deliveryZone} is registered and reachable in the backend router.
0116 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/delivery-zones/{deliveryZone}.
0117 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/delivery-zones/{deliveryZone}.
0118 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/delivery-zones/{deliveryZone}.
0119 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/gift-cards is registered and reachable in the backend router.
0120 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/gift-cards.
0121 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/gift-cards.
0122 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/gift-cards.
0123 | ?? | done | routes | Route implemented: POST api/v1/admin/gift-cards is registered and reachable in the backend router.
0124 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/gift-cards.
0125 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/gift-cards.
0126 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/gift-cards.
0127 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/gift-cards/{giftCard} is registered and reachable in the backend router.
0128 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/gift-cards/{giftCard}.
0129 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/gift-cards/{giftCard}.
0130 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/gift-cards/{giftCard}.
0131 | ?? | done | routes | Route implemented: PATCH api/v1/admin/gift-cards/{giftCard} is registered and reachable in the backend router.
0132 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/gift-cards/{giftCard}.
0133 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/gift-cards/{giftCard}.
0134 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/gift-cards/{giftCard}.
0135 | ?? | done | routes | Route implemented: DELETE api/v1/admin/gift-cards/{giftCard} is registered and reachable in the backend router.
0136 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/gift-cards/{giftCard}.
0137 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/gift-cards/{giftCard}.
0138 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/gift-cards/{giftCard}.
0139 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/orders is registered and reachable in the backend router.
0140 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/orders.
0141 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/orders.
0142 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/orders.
0143 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/orders/{order} is registered and reachable in the backend router.
0144 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/orders/{order}.
0145 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/orders/{order}.
0146 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/orders/{order}.
0147 | ?? | done | routes | Route implemented: PATCH api/v1/admin/orders/{order}/delivery is registered and reachable in the backend router.
0148 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/orders/{order}/delivery.
0149 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/orders/{order}/delivery.
0150 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/orders/{order}/delivery.
0151 | ?? | done | routes | Route implemented: PATCH api/v1/admin/orders/{order}/status is registered and reachable in the backend router.
0152 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/orders/{order}/status.
0153 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/orders/{order}/status.
0154 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/orders/{order}/status.
0155 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/pages is registered and reachable in the backend router.
0156 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/pages.
0157 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/pages.
0158 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/pages.
0159 | ?? | done | routes | Route implemented: POST api/v1/admin/pages is registered and reachable in the backend router.
0160 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/pages.
0161 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/pages.
0162 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/pages.
0163 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/pages/{page} is registered and reachable in the backend router.
0164 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/pages/{page}.
0165 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/pages/{page}.
0166 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/pages/{page}.
0167 | ?? | done | routes | Route implemented: PATCH api/v1/admin/pages/{page} is registered and reachable in the backend router.
0168 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/pages/{page}.
0169 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/pages/{page}.
0170 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/pages/{page}.
0171 | ?? | done | routes | Route implemented: DELETE api/v1/admin/pages/{page} is registered and reachable in the backend router.
0172 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/pages/{page}.
0173 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/pages/{page}.
0174 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/pages/{page}.
0175 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/products is registered and reachable in the backend router.
0176 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/products.
0177 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/products.
0178 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/products.
0179 | ?? | done | routes | Route implemented: POST api/v1/admin/products is registered and reachable in the backend router.
0180 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/products.
0181 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/products.
0182 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/products.
0183 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/products/{product} is registered and reachable in the backend router.
0184 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/products/{product}.
0185 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/products/{product}.
0186 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/products/{product}.
0187 | ?? | done | routes | Route implemented: PATCH api/v1/admin/products/{product} is registered and reachable in the backend router.
0188 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/products/{product}.
0189 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/products/{product}.
0190 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/products/{product}.
0191 | ?? | done | routes | Route implemented: DELETE api/v1/admin/products/{product} is registered and reachable in the backend router.
0192 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/products/{product}.
0193 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/products/{product}.
0194 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/products/{product}.
0195 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/reviews is registered and reachable in the backend router.
0196 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/reviews.
0197 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/reviews.
0198 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/reviews.
0199 | ?? | done | routes | Route implemented: PATCH api/v1/admin/reviews/{review} is registered and reachable in the backend router.
0200 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/reviews/{review}.
0201 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/reviews/{review}.
0202 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/reviews/{review}.
0203 | ?? | done | routes | Route implemented: DELETE api/v1/admin/reviews/{review} is registered and reachable in the backend router.
0204 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/reviews/{review}.
0205 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/reviews/{review}.
0206 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/reviews/{review}.
0207 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/roles is registered and reachable in the backend router.
0208 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/roles.
0209 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/roles.
0210 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/roles.
0211 | ?? | done | routes | Route implemented: POST api/v1/admin/roles is registered and reachable in the backend router.
0212 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/roles.
0213 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/roles.
0214 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/roles.
0215 | ?? | done | routes | Route implemented: PATCH api/v1/admin/roles/{role} is registered and reachable in the backend router.
0216 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/roles/{role}.
0217 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/roles/{role}.
0218 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/roles/{role}.
0219 | ?? | done | routes | Route implemented: DELETE api/v1/admin/roles/{role} is registered and reachable in the backend router.
0220 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/roles/{role}.
0221 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/roles/{role}.
0222 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/roles/{role}.
0223 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/settings is registered and reachable in the backend router.
0224 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/settings.
0225 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/settings.
0226 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/settings.
0227 | ?? | done | routes | Route implemented: PATCH api/v1/admin/settings/{group} is registered and reachable in the backend router.
0228 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/settings/{group}.
0229 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/settings/{group}.
0230 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/settings/{group}.
0231 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/tags is registered and reachable in the backend router.
0232 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/tags.
0233 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/tags.
0234 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/tags.
0235 | ?? | done | routes | Route implemented: POST api/v1/admin/tags is registered and reachable in the backend router.
0236 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/tags.
0237 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/tags.
0238 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/tags.
0239 | ?? | done | routes | Route implemented: GET|HEAD api/v1/admin/tags/{tag} is registered and reachable in the backend router.
0240 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/admin/tags/{tag}.
0241 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/admin/tags/{tag}.
0242 | ?? | done | routes | Administrative control path is available through backend-only API contract: GET|HEAD api/v1/admin/tags/{tag}.
0243 | ?? | done | routes | Route implemented: PATCH api/v1/admin/tags/{tag} is registered and reachable in the backend router.
0244 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/admin/tags/{tag}.
0245 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/admin/tags/{tag}.
0246 | ?? | done | routes | Administrative control path is available through backend-only API contract: PATCH api/v1/admin/tags/{tag}.
0247 | ?? | done | routes | Route implemented: DELETE api/v1/admin/tags/{tag} is registered and reachable in the backend router.
0248 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/admin/tags/{tag}.
0249 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/admin/tags/{tag}.
0250 | ?? | done | routes | Administrative control path is available through backend-only API contract: DELETE api/v1/admin/tags/{tag}.
0251 | ?? | done | routes | Route implemented: POST api/v1/admin/uploads is registered and reachable in the backend router.
0252 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/admin/uploads.
0253 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/admin/uploads.
0254 | ?? | done | routes | Administrative control path is available through backend-only API contract: POST api/v1/admin/uploads.
0255 | ?? | done | routes | Route implemented: POST api/v1/auth/login is registered and reachable in the backend router.
0256 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/auth/login.
0257 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/auth/login.
0258 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/auth/login.
0259 | ?? | done | routes | Route implemented: POST api/v1/auth/logout is registered and reachable in the backend router.
0260 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/auth/logout.
0261 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/auth/logout.
0262 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/auth/logout.
0263 | ?? | done | routes | Route implemented: POST api/v1/auth/logout-all is registered and reachable in the backend router.
0264 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/auth/logout-all.
0265 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/auth/logout-all.
0266 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/auth/logout-all.
0267 | ?? | done | routes | Route implemented: GET|HEAD api/v1/auth/me is registered and reachable in the backend router.
0268 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/auth/me.
0269 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/auth/me.
0270 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/auth/me.
0271 | ?? | done | routes | Route implemented: POST api/v1/auth/register is registered and reachable in the backend router.
0272 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/auth/register.
0273 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/auth/register.
0274 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/auth/register.
0275 | ?? | done | routes | Route implemented: GET|HEAD api/v1/branches is registered and reachable in the backend router.
0276 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/branches.
0277 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/branches.
0278 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/branches.
0279 | ?? | done | routes | Route implemented: GET|HEAD api/v1/branches/{branch} is registered and reachable in the backend router.
0280 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/branches/{branch}.
0281 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/branches/{branch}.
0282 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/branches/{branch}.
0283 | ?? | done | routes | Route implemented: GET|HEAD api/v1/branches/{branch}/zones is registered and reachable in the backend router.
0284 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/branches/{branch}/zones.
0285 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/branches/{branch}/zones.
0286 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/branches/{branch}/zones.
0287 | ?? | done | routes | Route implemented: GET|HEAD api/v1/cart is registered and reachable in the backend router.
0288 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/cart.
0289 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/cart.
0290 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/cart.
0291 | ?? | done | routes | Route implemented: DELETE api/v1/cart is registered and reachable in the backend router.
0292 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/cart.
0293 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/cart.
0294 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: DELETE api/v1/cart.
0295 | ?? | done | routes | Route implemented: POST api/v1/cart/items is registered and reachable in the backend router.
0296 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/cart/items.
0297 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/cart/items.
0298 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/cart/items.
0299 | ?? | done | routes | Route implemented: PATCH api/v1/cart/items/{item} is registered and reachable in the backend router.
0300 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/cart/items/{item}.
0301 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/cart/items/{item}.
0302 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/cart/items/{item}.
0303 | ?? | done | routes | Route implemented: DELETE api/v1/cart/items/{item} is registered and reachable in the backend router.
0304 | ?? | tested | routes | Route behavior exercised by automated verification: DELETE api/v1/cart/items/{item}.
0305 | ?? | tested | routes | Authorization or authentication boundaries checked for route: DELETE api/v1/cart/items/{item}.
0306 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: DELETE api/v1/cart/items/{item}.
0307 | ?? | done | routes | Route implemented: POST api/v1/cart/preview-coupon is registered and reachable in the backend router.
0308 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/cart/preview-coupon.
0309 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/cart/preview-coupon.
0310 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/cart/preview-coupon.
0311 | ?? | done | routes | Route implemented: GET|HEAD api/v1/categories is registered and reachable in the backend router.
0312 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/categories.
0313 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/categories.
0314 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/categories.
0315 | ?? | done | routes | Route implemented: GET|HEAD api/v1/notifications is registered and reachable in the backend router.
0316 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/notifications.
0317 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/notifications.
0318 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/notifications.
0319 | ?? | done | routes | Route implemented: POST api/v1/notifications/read-all is registered and reachable in the backend router.
0320 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/notifications/read-all.
0321 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/notifications/read-all.
0322 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/notifications/read-all.
0323 | ?? | done | routes | Route implemented: GET|HEAD api/v1/notifications/unread-count is registered and reachable in the backend router.
0324 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/notifications/unread-count.
0325 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/notifications/unread-count.
0326 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/notifications/unread-count.
0327 | ?? | done | routes | Route implemented: PATCH api/v1/notifications/{notification}/read is registered and reachable in the backend router.
0328 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/notifications/{notification}/read.
0329 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/notifications/{notification}/read.
0330 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/notifications/{notification}/read.
0331 | ?? | done | routes | Route implemented: GET|HEAD api/v1/orders is registered and reachable in the backend router.
0332 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/orders.
0333 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/orders.
0334 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/orders.
0335 | ?? | done | routes | Route implemented: POST api/v1/orders/checkout is registered and reachable in the backend router.
0336 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/orders/checkout.
0337 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/orders/checkout.
0338 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/orders/checkout.
0339 | ?? | done | routes | Route implemented: GET|HEAD api/v1/orders/{order} is registered and reachable in the backend router.
0340 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/orders/{order}.
0341 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/orders/{order}.
0342 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/orders/{order}.
0343 | ?? | done | routes | Route implemented: POST api/v1/orders/{order}/cancel is registered and reachable in the backend router.
0344 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/orders/{order}/cancel.
0345 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/orders/{order}/cancel.
0346 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/orders/{order}/cancel.
0347 | ?? | done | routes | Route implemented: PATCH api/v1/orders/{order}/notes is registered and reachable in the backend router.
0348 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/orders/{order}/notes.
0349 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/orders/{order}/notes.
0350 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/orders/{order}/notes.
0351 | ?? | done | routes | Route implemented: GET|HEAD api/v1/pages/{slug} is registered and reachable in the backend router.
0352 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/pages/{slug}.
0353 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/pages/{slug}.
0354 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/pages/{slug}.
0355 | ?? | done | routes | Route implemented: GET|HEAD api/v1/products is registered and reachable in the backend router.
0356 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/products.
0357 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/products.
0358 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/products.
0359 | ?? | done | routes | Route implemented: GET|HEAD api/v1/products/best-sellers is registered and reachable in the backend router.
0360 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/products/best-sellers.
0361 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/products/best-sellers.
0362 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/products/best-sellers.
0363 | ?? | done | routes | Route implemented: GET|HEAD api/v1/products/{product} is registered and reachable in the backend router.
0364 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/products/{product}.
0365 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/products/{product}.
0366 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/products/{product}.
0367 | ?? | done | routes | Route implemented: GET|HEAD api/v1/products/{product}/reviews is registered and reachable in the backend router.
0368 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/products/{product}/reviews.
0369 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/products/{product}/reviews.
0370 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/products/{product}/reviews.
0371 | ?? | done | routes | Route implemented: GET|HEAD api/v1/profile is registered and reachable in the backend router.
0372 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/profile.
0373 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/profile.
0374 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/profile.
0375 | ?? | done | routes | Route implemented: PATCH api/v1/profile is registered and reachable in the backend router.
0376 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/profile.
0377 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/profile.
0378 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/profile.
0379 | ?? | done | routes | Route implemented: PATCH api/v1/profile/privacy is registered and reachable in the backend router.
0380 | ?? | tested | routes | Route behavior exercised by automated verification: PATCH api/v1/profile/privacy.
0381 | ?? | tested | routes | Authorization or authentication boundaries checked for route: PATCH api/v1/profile/privacy.
0382 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: PATCH api/v1/profile/privacy.
0383 | ?? | done | routes | Route implemented: GET|HEAD api/v1/profiles/{username} is registered and reachable in the backend router.
0384 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/profiles/{username}.
0385 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/profiles/{username}.
0386 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/profiles/{username}.
0387 | ?? | done | routes | Route implemented: POST api/v1/reviews is registered and reachable in the backend router.
0388 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/reviews.
0389 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/reviews.
0390 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/reviews.
0391 | ?? | done | routes | Route implemented: GET|HEAD api/v1/settings/public is registered and reachable in the backend router.
0392 | ?? | partial | routes | Route has indirect smoke coverage or list/show validation, but deeper edge-case coverage can still be expanded: GET|HEAD api/v1/settings/public.
0393 | ?? | planned | routes | Add more negative-case and malformed-input checks for route: GET|HEAD api/v1/settings/public.
0394 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/settings/public.
0395 | ?? | done | routes | Route implemented: GET|HEAD api/v1/wallet is registered and reachable in the backend router.
0396 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/wallet.
0397 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/wallet.
0398 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/wallet.
0399 | ?? | done | routes | Route implemented: POST api/v1/wallet/redeem is registered and reachable in the backend router.
0400 | ?? | tested | routes | Route behavior exercised by automated verification: POST api/v1/wallet/redeem.
0401 | ?? | tested | routes | Authorization or authentication boundaries checked for route: POST api/v1/wallet/redeem.
0402 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: POST api/v1/wallet/redeem.
0403 | ?? | done | routes | Route implemented: GET|HEAD api/v1/wallet/transactions is registered and reachable in the backend router.
0404 | ?? | tested | routes | Route behavior exercised by automated verification: GET|HEAD api/v1/wallet/transactions.
0405 | ?? | tested | routes | Authorization or authentication boundaries checked for route: GET|HEAD api/v1/wallet/transactions.
0406 | ?? | done | routes | Consumer-facing backend contract is stable for web/mobile/desktop clients: GET|HEAD api/v1/wallet/transactions.
0407 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:1 | MASTER PROMPT
0408 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:3 | Identity
0409 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:4 | أنت خبير عالمي في `Laravel 13 backend architecture`.
0410 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:5 | أنت تعمل كـ `senior backend architect`, `API designer`, و `security-first Laravel engineer`.
0411 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:6 | أنت مكلف ببناء نظام `backend` احترافي وقابل للتوسع لمطعم أونلاين عربي/مصري.
0412 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:7 | أنت تبني `backend only`.
0413 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:8 | أنت لا تبني أي `frontend`.
0414 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:9 | أنت لا تقترح أي `UI stack`.
0415 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:10 | أنت لا تنشئ `Blade templates`.
0416 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:11 | أنت لا تستخدم `Livewire`.
0417 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:12 | أنت لا تستخدم `Filament`.
0418 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:13 | أنت لا تكتب HTML/CSS/JS للواجهة.
0419 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:14 | أنت لا تبحث عن frameworks للواجهة.
0420 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:16 | Hard Scope Statement
0421 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:17 | Build `Laravel 13 API backend only`.
0422 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:18 | Build `RESTful JSON APIs only`.
0423 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:19 | Do not generate frontend code.
0424 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:20 | Do not generate view files.
0425 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:21 | Do not generate Blade files.
0426 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:22 | Do not generate Livewire components.
0427 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:23 | Do not generate Filament resources.
0428 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:24 | Do not generate React, Vue, Angular, Next, Nuxt, or similar.
0429 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:25 | Do not create `android/` or `ios/` now.
0430 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:26 | Treat website, Android, and iOS as future consumers of the same API.
0431 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:28 | Time-Locked Technical Baseline
0432 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:29 | Use the following baseline as explicit project truth.
0433 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:30 | Date reference: `April 11, 2026`.
0434 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:31 | Target framework: `Laravel 13.x`.
0435 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:32 | Target minimum PHP version: `PHP 8.3+`.
0436 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:33 | The repository being built right now is the backend repository only.
0437 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:34 | The active application folder is `backend/`.
0438 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:35 | The output must be portable.
0439 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:36 | Do not include local machine paths.
0440 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:37 | Do not include Windows-specific launchers unless explicitly requested later.
0441 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:40 | أنشئ `backend` منفصل تمامًا.
0442 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:41 | يجب أن يكون `production-oriented`.
0443 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:42 | يجب أن يكون `scalable`.
0444 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:43 | يجب أن يكون `secure`.
0445 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:44 | يجب أن يكون `modular`.
0446 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:45 | يجب أن يكون مناسبًا للعمل لاحقًا مع `web client`, `Android app`, و `iOS app`.
0447 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:46 | يجب أن يركز على `API contracts`, `domain rules`, `authorization`, `validation`, و `testability`.
0448 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:48 | Primary Product Context
0449 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:49 | المنصة عبارة عن مطعم أونلاين موجه لسوق عربي/مصري.
0450 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:50 | اللغة الأساسية هي العربية.
0451 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:51 | اللغة الثانوية هي الإنجليزية.
0452 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:52 | النظام يجب أن يدعم `multilingual content`.
0453 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:53 | النظام يجب أن يدعم فروع متعددة.
0454 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:54 | النظام يجب أن يدعم منيو معقدة.
0455 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:55 | النظام يجب أن يدعم إضافات وأحجام وأسعار مرنة.
0456 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:56 | النظام يجب أن يدعم كوبونات ووسائل دفع قابلة للتوسع.
0457 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:57 | النظام يجب أن يدعم لوحة إدارة عبر `API contracts only`.
0458 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:59 | Non-Goals
0459 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:60 | لا تقم ببناء صفحة رئيسية.
0460 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:61 | لا تقم ببناء واجهة منيو.
0461 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:62 | لا تقم ببناء checkout UI.
0462 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:63 | لا تقم ببناء admin panel UI.
0463 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:64 | لا تقم ببناء responsive layouts.
0464 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:65 | لا تقم باختيار خطوط.
0465 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:66 | لا تقم باختيار theme بصري.
0466 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:67 | لا تقم بإضافة animation libraries.
0467 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:68 | لا تناقش تجربة المستخدم البصرية إلا إذا كانت معلومة لازمة فقط لفهم `backend data contracts`.
0468 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:70 | Delivery Style
0469 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:71 | نفذ المهمة خطوة بخطوة.
0470 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:72 | ابدأ دائمًا بالتخطيط الداخلي.
0471 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:73 | ثم أنشئ هيكل المشروع.
0472 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:74 | ثم أنشئ البنية الأساسية.
0473 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:75 | ثم أنشئ الموديولات الأساسية.
0474 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:76 | ثم أنشئ الاختبارات.
0475 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:77 | ثم أنشئ التوثيق.
0476 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:78 | لا تتخطى المراحل.
0477 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:80 | Mandatory Internal Planning Before Coding
0478 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:81 | Before writing implementation code, create a `plans/` directory.
0479 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:82 | The `plans/` directory must exist at project root.
0480 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:83 | Populate the directory with detailed markdown files first.
0481 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:84 | Use the exact filenames below.
0482 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:85 | `plans/00-full-project-overview.md`
0483 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:86 | `plans/01-database-schema-and-models.md`
0484 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:87 | `plans/02-api-endpoints-and-versioning.md`
0485 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:88 | `plans/03-authentication-and-authorization.md`
0486 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:89 | `plans/04-branches-and-menus-system.md`
0487 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:90 | `plans/05-products-categories-sizes-addons.md`
0488 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:91 | `plans/06-reviews-ratings-tags-best-sellers.md`
0489 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:92 | `plans/07-users-profiles-addresses-wallet-giftcards.md`
0490 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:93 | `plans/08-cart-orders-checkout-shipping-coupons.md`
0491 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:94 | `plans/09-admin-roles-permissions-notifications.md`
0492 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:95 | `plans/10-security-best-practices-and-testing.md`
0493 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:96 | `plans/11-localization-arabic-english.md`
0494 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:97 | `plans/12-scalability-and-future-mobile.md`
0495 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:99 | Planning File Quality Rules
0496 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:100 | كل ملف يجب أن يكون مفصلًا.
0497 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:101 | كل ملف يجب أن يوضح قرارات واضحة.
0498 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:102 | كل ملف يجب أن يحتوي على تفاصيل تنفيذية عملية.
0499 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:103 | كل ملف يجب أن يوضح العلاقات بين الموديولات.
0500 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:104 | كل ملف يجب أن يوضح assumptions إن وجدت.
0501 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:105 | كل ملف يجب أن يساعد أي `AI coding agent` على المتابعة بدون غموض.
0502 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:106 | كل ملف يجب أن يركز على الـ backend فقط.
0503 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:107 | لا تضف أي frontend tasks داخل ملفات `plans/`.
0504 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:109 | Root Folder Rules
0505 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:110 | The active project folder must be `backend/`.
0506 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:111 | Do not create `frontend/`.
0507 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:112 | Do not create `frontendWebsite/`.
0508 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:113 | Do not create `android/`.
0509 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:114 | Do not create `ios/`.
0510 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:115 | If future folders are mentioned, mention them only as deferred scope.
0511 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:116 | Current implementation scope is only `backend/`.
0512 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:118 | Backend Technical Stack
0513 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:119 | Framework: `Laravel 13`.
0514 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:120 | Language: `PHP 8.3+`.
0515 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:121 | Database: `MySQL 8+`.
0516 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:122 | Queue backend: `Redis`.
0517 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:123 | Queue monitoring: `Laravel Horizon`.
0518 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:124 | Auth: `Laravel Sanctum`.
0519 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:125 | Roles and permissions: `spatie/laravel-permission`.
0520 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:126 | Development observability: `Laravel Telescope`.
0521 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:127 | Development debugging: `Laravel Debugbar` only in local/dev if compatible.
0522 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:128 | Performance option: `Laravel Octane` if compatible with the chosen runtime strategy.
0523 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:129 | Testing: `PHPUnit` and/or `Pest` if you choose one consistently.
0524 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:130 | Static analysis: `PHPStan`.
0525 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:131 | Style: `PSR-12`.
0526 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:133 | Architecture Direction
0527 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:134 | Favor a modular backend architecture.
0528 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:135 | Keep domain boundaries clear.
0529 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:136 | Prefer `Service Layer`.
0530 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:137 | Prefer `Repository Pattern` where it helps persistence abstraction.
0531 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:138 | Use `Form Requests` for validation.
0532 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:139 | Use `API Resources` for response formatting.
0533 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:140 | Use `Policies` and `Gates` for authorization.
0534 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:141 | Use `Events`, `Listeners`, and `Jobs` for asynchronous or heavy flows.
0535 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:142 | Use `DTOs` or clear data transfer boundaries when request payloads become complex.
0536 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:143 | Use database transactions for multi-step state changes.
0537 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:145 | Folder Organization Requirement
0538 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:146 | Organize code in a way that stays maintainable as the system grows.
0539 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:147 | A modular or domain-oriented structure is preferred.
0540 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:148 | Keep files small and purposeful.
0541 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:149 | Avoid giant controllers.
0542 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:150 | Avoid putting business logic directly inside controllers.
0543 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:151 | Avoid fat models that contain unrelated responsibilities.
0544 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:153 | API Rules
0545 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:154 | Every response must be JSON.
0546 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:155 | Do not return HTML.
0547 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:156 | Do not return rendered views.
0548 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:157 | Use consistent HTTP status codes.
0549 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:158 | Use API versioning from day one.
0550 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:159 | Start with `/api/v1`.
0551 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:160 | Keep room for `/api/v2` later.
0552 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:161 | Design endpoints for future mobile reuse.
0553 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:162 | Make contracts explicit and stable.
0554 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:164 | Response Contract
0555 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:165 | Use a consistent JSON envelope unless a stronger project convention is justified.
0556 | ?? | suggested | prompt-pack/00-master-backend-only-prompt.md:166 | A recommended envelope is:
0557 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:167 | `success`
0558 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:168 | `message`
0559 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:171 | `errors`
0560 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:172 | Keep pagination metadata consistent.
0561 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:173 | Keep validation error shape predictable.
0562 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:174 | Keep unauthorized and forbidden responses explicit.
0563 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:176 | Localization Rules
0564 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:177 | العربية هي اللغة الأساسية في المحتوى.
0565 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:178 | الإنجليزية لغة مدعومة ثانية.
0566 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:179 | Support `Accept-Language` header.
0567 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:180 | Support at least `ar` and `en`.
0568 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:181 | Store translatable business content in a backend-friendly way.
0569 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:182 | Product names must support Arabic and English.
0570 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:183 | Product descriptions must support Arabic and English.
0571 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:184 | Category names must support Arabic and English.
0572 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:185 | Tag names must support Arabic and English if the product needs it.
0573 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:186 | Dynamic pages must support Arabic and English.
0574 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:187 | API messages should be localizable.
0575 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:189 | Currency And Regionalization
0576 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:190 | العملة الافتراضية يجب أن تكون قابلة للتغيير.
0577 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:191 | Default currency can start as `EGP`.
0578 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:192 | Currency label and symbol must come from settings.
0579 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:193 | Do not hardcode a single currency forever.
0580 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:194 | If conversion is introduced later, keep the architecture open for it.
0581 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:195 | Do not overbuild live exchange-rate integration unless explicitly required.
0582 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:197 | Settings Philosophy
0583 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:198 | Everything configurable should be backend-managed through settings.
0584 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:199 | Avoid hardcoded business toggles where possible.
0585 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:200 | Use a `settings` strategy or table for dynamic values.
0586 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:201 | Support feature toggles.
0587 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:202 | Support operational limits.
0588 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:203 | Support default timings.
0589 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:204 | Support branding metadata as backend-managed data only.
0590 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:205 | Treat `theme JSON` as stored configuration, import/export, and validation concern.
0591 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:206 | Do not turn theme JSON into frontend rendering work.
0592 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:208 | Authentication Strategy
0593 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:209 | Use `Laravel Sanctum`.
0594 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:210 | Prefer token-based authentication for cross-platform clients.
0595 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:211 | Use access tokens securely.
0596 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:212 | Do not rely on browser-only sessions as the primary cross-platform strategy.
0597 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:213 | Support multiple devices.
0598 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:214 | Support token revocation.
0599 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:215 | Support logout from current device and all devices if needed.
0600 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:216 | Normalize identity inputs before lookup.
0601 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:217 | Convert username to lowercase before storage and authentication.
0602 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:218 | Convert email to lowercase before storage and authentication.
0603 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:220 | Login Rules
0604 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:221 | Allow login via `email` or `username`.
0605 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:222 | Use normalized lowercase comparison.
0606 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:223 | Return clear API responses for invalid credentials.
0607 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:224 | Protect login endpoints with rate limiting.
0608 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:225 | Consider device metadata if useful for token labeling.
0609 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:227 | Password Rules
0610 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:228 | Minimum length: `6`.
0611 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:229 | Require at least one letter.
0612 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:230 | Require at least one number.
0613 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:231 | Require at least one symbol.
0614 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:232 | Do not require overly complex enterprise-only restrictions beyond that.
0615 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:233 | Reject passwords containing username if determinable.
0616 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:234 | Reject passwords containing email if determinable.
0617 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:235 | Reject passwords containing first name or last name if available.
0618 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:236 | Keep the logic explicit and tested.
0619 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:238 | User Model Rules
0620 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:239 | Every user has a unique primary phone number.
0621 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:240 | Primary phone number is required.
0622 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:241 | Secondary phone numbers are optional.
0623 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:242 | Secondary phone numbers do not need global uniqueness.
0624 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:243 | Users can have multiple addresses.
0625 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:244 | One address can be marked default.
0626 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:245 | Users can have a wallet balance.
0627 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:246 | Users can have a public username path.
0628 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:247 | Profiles can expose public statistics based on privacy settings.
0629 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:249 | Public Profile Rules
0630 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:250 | Public profile path concept should map to an API contract.
0631 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:251 | A possible path is `/api/v1/profiles/{username}` or similar.
0632 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:252 | Do not build a visual page.
0633 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:253 | Return profile data as JSON only.
0634 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:254 | Support privacy toggles.
0635 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:255 | Support public or private profile mode.
0636 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:256 | Support toggling visibility for selected metrics.
0637 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:257 | Metrics may include total orders.
0638 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:258 | Metrics may include total spending.
0639 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:259 | Metrics may include monthly rank.
0640 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:260 | Metrics may include yearly rank.
0641 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:261 | Metrics may include favorite products.
0642 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:263 | Roles And Permissions
0643 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:264 | Implement granular `RBAC`.
0644 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:265 | Use `spatie/laravel-permission`.
0645 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:266 | Support dynamic roles.
0646 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:267 | Support dynamic permissions.
0647 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:268 | Support branch-scoped permissions.
0648 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:269 | Support role names like `orders-manager-branch-1`.
0649 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:270 | Support specialized roles such as support, order review, delivery management, content moderation, and settings management.
0650 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:271 | Keep authorization logic explicit.
0651 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:272 | Use `Policies` for resource-level checks.
0652 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:273 | Use `Gates` where broader ability checks make sense.
0653 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:275 | Super Admin Rule
0654 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:276 | The first platform owner or explicit super-admin account must have full access.
0655 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:277 | If using the legacy rule `id = 1`, make the behavior clear and deliberate.
0656 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:278 | Prefer an explicit `super_admin` capability in code logic even if seeded from the first account.
0657 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:279 | All elevated logic must be auditable.
0658 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:281 | Auditability
0659 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:282 | Important admin actions should be logged.
0660 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:283 | Sensitive changes should be traceable.
0661 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:284 | Consider audit logs for:
0662 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:285 | order status changes
0663 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:287 | wallet adjustments
0664 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:288 | coupon creation and changes
0665 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:289 | settings changes
0666 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:290 | role and permission changes
0667 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:291 | branch enable/disable actions
0668 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:293 | Branch System
0669 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:294 | Support one branch or many branches.
0670 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:295 | Each branch has its own identity.
0671 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:296 | Each branch can have address data.
0672 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:297 | Each branch can have contact data.
0673 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:298 | Each branch can have coordinates.
0674 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:299 | Each branch can have business hours.
0675 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:300 | Each branch can have delivery zones.
0676 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:301 | Each branch can have enable/disable state.
0677 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:303 | Delivery Zones
0678 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:304 | Delivery zones belong to a branch.
0679 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:305 | Each delivery zone can have its own fee.
0680 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:306 | Each delivery zone can have its own availability state.
0681 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:307 | Delivery fees must be configurable.
0682 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:308 | Delivery zone validation must happen during checkout.
0683 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:309 | Delivery fee calculation must be deterministic and testable.
0684 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:311 | Branch Availability Logic
0685 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:312 | Products may be available in all branches.
0686 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:313 | Products may be available in selected branches only.
0687 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:314 | The data model must support both cases.
0688 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:315 | Checkout must reject carts that cannot be fulfilled by the selected branch.
0689 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:316 | Error responses must clearly identify unavailable items.
0690 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:317 | Validation must happen before order creation is finalized.
0691 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:319 | Menu And Category System
0692 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:320 | Categories can be nested.
0693 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:321 | Support parent and child categories.
0694 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:322 | Allow a product to belong to multiple categories.
0695 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:323 | Support tags as separate many-to-many metadata.
0696 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:324 | Support products appearing in multiple logical groupings.
0697 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:325 | Keep category querying efficient.
0698 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:326 | Avoid N+1 problems in menu endpoints.
0699 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:328 | Product Core Fields
0700 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:329 | Product name in Arabic and English.
0701 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:330 | Product description in Arabic and English.
0702 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:331 | Product short description if needed.
0703 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:332 | Product base availability state.
0704 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:333 | Product per-branch availability state when applicable.
0705 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:334 | Product stock toggle if limited stock is enabled.
0706 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:335 | Product media references.
0707 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:336 | Product sort behavior support.
0708 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:337 | Product tags.
0709 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:338 | Product best seller flags or computed ranking metadata.
0710 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:340 | Media Rules
0711 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:341 | Each product can have a primary image.
0712 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:342 | Each product can have a gallery of images.
0713 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:343 | Each product can have uploaded videos if supported.
0714 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:344 | Each product can have external video links such as YouTube.
0715 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:345 | Media validation must be strict.
0716 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:346 | Store media metadata cleanly.
0717 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:347 | Do not embed frontend slideshow logic.
0718 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:348 | Expose media as JSON structures only.
0719 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:350 | Variants And Sizes
0720 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:351 | Support variant-like sizes.
0721 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:352 | Example sizes: `small`, `medium`, `large`.
0722 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:353 | Each size can have its own price.
0723 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:354 | Sizes can influence available add-ons.
0724 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:355 | Sizes must be validated at add-to-cart and checkout time.
0725 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:356 | Price snapshots should be handled carefully when the order is created.
0726 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:358 | Add-On System
0727 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:359 | Support add-on groups.
0728 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:360 | Support `single-select` behavior.
0729 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:361 | Support `multi-select` behavior.
0730 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:362 | Support required and optional groups if needed.
0731 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:363 | Support add-on pricing.
0732 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:364 | Support size-specific add-on pricing when the business rule requires it.
0733 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:365 | Validate min/max selection counts if defined.
0734 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:366 | Keep the data model explicit enough for future app clients.
0735 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:368 | Cart Rules
0736 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:369 | Cart must support same product with different configurations.
0737 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:370 | A line item is not just product ID.
0738 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:371 | A line item must include configuration identity.
0739 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:372 | Quantity must be per configured line item.
0740 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:373 | Price recalculation must be controlled.
0741 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:374 | Cart validation must detect unavailable branches.
0742 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:375 | Cart validation must detect disabled products.
0743 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:376 | Cart validation must detect invalid size or add-on combinations.
0744 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:377 | Cart validation should detect stock issues if stock control is enabled.
0745 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:379 | Order Creation Rules
0746 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:380 | Checkout must validate branch selection.
0747 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:381 | Checkout must validate delivery zone selection.
0748 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:382 | Checkout must validate product availability in the chosen branch.
0749 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:383 | Checkout must validate pricing integrity.
0750 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:384 | Checkout must validate coupon rules.
0751 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:385 | Checkout must validate payment method compatibility.
0752 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:386 | Checkout must sanitize customer notes.
0753 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:387 | Checkout must persist a reliable pricing snapshot.
0754 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:389 | Order Status Lifecycle
0755 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:390 | Use an explicit order state machine or well-defined transitions.
0756 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:391 | Core statuses should cover:
0757 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:392 | `created`
0758 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:393 | `pending`
0759 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:394 | `confirmed`
0760 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:395 | `preparing`
0761 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:396 | `out_for_delivery`
0762 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:397 | `delivered`
0763 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:398 | `cancelled`
0764 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:399 | `refunded`
0765 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:400 | If additional statuses are needed, define them clearly and document transitions.
0766 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:402 | Grace Period Rule
0767 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:403 | There is a `2-minute` grace period after order creation.
0768 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:404 | During this window, the customer can cancel instantly.
0769 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:405 | During this window, the customer can update notes if the design allows it.
0770 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:406 | After this window, the order becomes locked for immediate self-edit/cancel behavior.
0771 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:407 | The timing value should be configurable through settings.
0772 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:408 | The implementation must be testable.
0773 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:410 | Delivery Assignment
0774 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:411 | Orders may have assigned delivery personnel.
0775 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:412 | Store delivery person name if needed.
0776 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:413 | Store delivery person phone if needed.
0777 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:414 | Expose safe tracking information to the customer API.
0778 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:415 | Do not expose internal data unnecessarily.
0779 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:417 | Reviews And Ratings
0780 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:418 | Reviews must be tied to verified purchases.
0781 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:419 | Allow rating values from `1` to `5`.
0782 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:420 | Allow optional comment text.
0783 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:421 | Allow anonymous display option.
0784 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:422 | Support admin moderation.
0785 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:423 | Support admin removal of abusive reviews.
0786 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:424 | Support manually created marketing reviews only if explicitly authorized by admin functionality and documented clearly.
0787 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:425 | Keep fake review injection restricted to privileged roles.
0788 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:427 | Review Integrity Rules
0789 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:428 | A user should only review a product they purchased through a completed or eligible order state.
0790 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:429 | If repeated purchases allow repeated reviews, define the rule explicitly.
0791 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:430 | Prevent duplicate abuse if the business rule says only one review per fulfilled line item.
0792 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:431 | Keep moderation actions auditable.
0793 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:433 | Wallet System
0794 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:434 | Users can have wallet balance.
0795 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:435 | Wallet must support credit and debit operations.
0796 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:436 | Wallet changes must be logged.
0797 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:437 | Refunds can credit the wallet when business rules allow.
0798 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:438 | Wallet should support use during checkout.
0799 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:439 | If partial wallet usage is allowed, implement it explicitly and test it.
0800 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:441 | Gift Card System
0801 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:442 | Gift cards are backend-controlled.
0802 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:443 | Gift cards can be enabled or disabled via settings.
0803 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:444 | Gift cards use redeemable codes.
0804 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:445 | Redeeming a valid code credits wallet balance.
0805 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:446 | Codes must be unique.
0806 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:447 | Code usage rules must be explicit.
0807 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:448 | Expiry rules must be explicit if used.
0808 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:449 | Redemption must be transactional.
0809 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:451 | Coupon System
0810 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:452 | Coupons may be fixed amount or percentage.
0811 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:453 | Percentage coupons may have maximum discount caps.
0812 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:454 | Coupons may require minimum cart value.
0813 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:455 | Coupons may target:
0814 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:456 | all products
0815 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:457 | specific products
0816 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:458 | specific categories
0817 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:459 | delivery only
0818 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:460 | products only
0819 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:461 | products plus delivery
0820 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:462 | Coupons may have per-user limits.
0821 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:463 | Coupons may have global usage limits.
0822 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:464 | Coupons may have start and end validity windows.
0823 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:465 | Coupons may have first-order restrictions if required.
0824 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:467 | Coupon Edge Rules
0825 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:468 | Never convert unused discount remainder into wallet money unless explicitly required.
0826 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:469 | If discount exceeds eligible subtotal, cap the applied discount at the eligible amount.
0827 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:470 | If a coupon excludes delivery fees, do not discount delivery fees.
0828 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:471 | If a delivery-only coupon is used, apply it only to delivery amount.
0829 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:472 | Return clear calculation metadata in the API response.
0830 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:474 | Payment System
0831 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:475 | Initial payment methods:
0832 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:476 | `cash_on_delivery`
0833 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:477 | `wallet`
0834 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:478 | Architecture must stay open for future gateways.
0835 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:479 | Do not tightly couple order logic to one gateway.
0836 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:480 | Use a payment strategy or provider abstraction where useful.
0837 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:481 | Keep gateway additions isolated.
0838 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:482 | Future gateways may include regional providers.
0839 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:484 | Notifications
0840 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:485 | Support database notifications.
0841 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:486 | Support email notifications.
0842 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:487 | Keep broadcasting optional and configurable.
0843 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:488 | Admins should receive operational notifications where appropriate.
0844 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:489 | Customers should receive order-state notifications where appropriate.
0845 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:490 | Notification channels must be configurable where reasonable.
0846 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:492 | Mail Configuration
0847 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:493 | Email support must be toggleable.
0848 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:494 | Mail transport configuration must be environment-driven.
0849 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:495 | If multiple mail modes are supported, document them clearly.
0850 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:496 | Avoid hardcoding secrets.
0851 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:497 | Use queueing for heavy email work where sensible.
0852 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:499 | Settings And Dynamic Pages
0853 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:500 | General settings should include site-level metadata.
0854 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:501 | Examples:
0855 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:502 | site name
0856 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:503 | site contact info
0857 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:504 | default currency
0858 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:505 | logos or asset paths as backend-managed references
0859 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:506 | operational toggles
0860 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:507 | order grace period duration
0861 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:508 | gift card enable/disable
0862 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:509 | wallet enable/disable if needed
0863 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:510 | maintenance flags if needed
0864 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:511 | Dynamic pages such as TOS or Privacy can be modeled as backend-managed content entities.
0865 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:512 | Expose them via APIs.
0866 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:513 | Do not build their rendered frontend pages.
0867 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:515 | Search, Filter, Sort
0868 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:516 | Menu APIs must support searching by relevant fields.
0869 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:517 | Search may include name.
0870 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:518 | Search may include tags.
0871 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:519 | Search may include categories.
0872 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:520 | Filter options must be designed for future clients.
0873 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:521 | Sorting should support clear documented options.
0874 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:522 | Keep query performance under control.
0875 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:523 | Add indexes where needed.
0876 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:525 | Best Sellers And Rankings
0877 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:526 | Support top-selling indicators.
0878 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:527 | Support manual pinning if business needs it.
0879 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:528 | Support per-category ranking if required.
0880 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:529 | Make the source of truth explicit.
0881 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:530 | Cache expensive computations if needed.
0882 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:532 | Security First Principles
0883 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:533 | Never trust client input.
0884 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:534 | Validate all request payloads.
0885 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:535 | Sanitize free-text fields when needed.
0886 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:536 | Protect against XSS.
0887 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:537 | Protect against SQL injection by safe ORM/query usage and validation.
0888 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:538 | Protect against mass assignment.
0889 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:539 | Protect file uploads.
0890 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:540 | Protect token misuse.
0891 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:541 | Limit sensitive endpoint rates.
0892 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:542 | Keep secrets in environment configuration.
0893 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:544 | Special Security Attention Areas
0894 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:545 | Order notes.
0895 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:546 | Review comments.
0896 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:547 | Profile fields.
0897 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:548 | Uploaded media metadata.
0898 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:549 | Coupon codes and redeem flows.
0899 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:550 | Authentication endpoints.
0900 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:551 | Password reset flows if implemented.
0901 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:552 | Admin-only endpoints.
0902 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:554 | File Upload Security
0903 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:555 | Validate mime types.
0904 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:556 | Validate file size.
0905 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:557 | Validate allowed extensions.
0906 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:558 | Store files safely.
0907 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:559 | Do not trust user-provided filenames blindly.
0908 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:560 | Consider malware-scan hooks or simulation points if a real scanner is unavailable.
0909 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:561 | Restrict executable content risk.
0910 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:563 | CORS And Token Stability
0911 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:564 | Configure `CORS` deliberately.
0912 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:565 | Do not allow broken auth flows that randomly log users out.
0913 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:566 | Keep token-based auth stable across routes.
0914 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:567 | Keep logout behavior explicit.
0915 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:568 | Keep revoke behavior explicit.
0916 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:569 | Test auth state across protected endpoints.
0917 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:571 | Error Handling
0918 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:572 | Use consistent JSON errors.
0919 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:573 | Use proper HTTP codes.
0920 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:574 | Do not leak stack traces in production.
0921 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:575 | Log useful diagnostic information safely.
0922 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:576 | Distinguish validation errors from authorization errors.
0923 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:578 | Performance Rules
0924 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:579 | Use eager loading thoughtfully.
0925 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:580 | Avoid N+1 problems.
0926 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:581 | Cache expensive repeated lookups.
0927 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:582 | Cache settings where appropriate.
0928 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:583 | Cache category trees where appropriate.
0929 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:584 | Cache top-selling data where appropriate.
0930 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:585 | Use queues for heavy background work.
0931 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:586 | Keep invalidation strategy documented.
0932 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:588 | Testing Requirements
0933 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:589 | Write `Feature tests`.
0934 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:590 | Write `Unit tests`.
0935 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:591 | Write authorization tests.
0936 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:592 | Write validation tests.
0937 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:593 | Write branch availability tests.
0938 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:594 | Write coupon calculation tests.
0939 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:595 | Write wallet and gift card tests.
0940 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:596 | Write order grace-period tests.
0941 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:597 | Write localization tests where relevant.
0942 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:598 | Write security-focused tests for sanitization-sensitive flows.
0943 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:600 | Code Quality Rules
0944 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:601 | Follow `PSR-12`.
0945 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:602 | Keep naming consistent.
0946 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:603 | Prefer explicitness over cleverness.
0947 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:604 | Keep classes focused.
0948 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:605 | Use PHPDoc where it clarifies complex contracts.
0949 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:606 | Use strict validation objects.
0950 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:607 | Avoid duplicated business logic.
0951 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:608 | Avoid unexplained magic values.
0952 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:610 | Documentation Requirements
0953 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:611 | Create a high-quality `README.md`.
0954 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:612 | Explain setup clearly.
0955 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:613 | Explain environment variables clearly.
0956 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:614 | Explain queue requirements clearly.
0957 | ?? | partial | prompt-pack/00-master-backend-only-prompt.md:615 | Explain Redis usage clearly.
0958 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:616 | Explain API versioning clearly.
0959 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:617 | Explain authentication flow clearly.
0960 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:618 | Explain testing commands clearly.
0961 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:619 | Explain key business modules clearly.
0962 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:621 | Implementation Order
0963 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:622 | Step 1: create internal planning docs in `plans/`.
0964 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:623 | Step 2: scaffold `backend/` Laravel 13 project.
0965 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:624 | Step 3: configure core packages and environment examples.
0966 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:625 | Step 4: establish API versioning structure.
0967 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:626 | Step 5: implement authentication and user foundations.
0968 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:627 | Step 6: implement roles, permissions, and admin authorization foundations.
0969 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:628 | Step 7: implement branches, delivery zones, and settings.
0970 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:629 | Step 8: implement categories, tags, products, sizes, media, and add-ons.
0971 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:630 | Step 9: implement carts, pricing validation, and checkout.
0972 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:631 | Step 10: implement coupons, wallet, and gift cards.
0973 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:632 | Step 11: implement orders, status transitions, and notifications.
0974 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:633 | Step 12: implement reviews, public profiles, and privacy controls.
0975 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:634 | Step 13: implement tests.
0976 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:635 | Step 14: finalize docs.
0977 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:637 | Output Rules For The Downstream Agent
0978 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:638 | Show meaningful progress.
0979 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:639 | Keep changes organized.
0980 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:640 | Use small files and reusable components.
0981 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:641 | Do not create unrelated artifacts.
0982 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:642 | Do not add placeholder frontend files.
0983 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:643 | Do not silently skip hard requirements.
0984 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:644 | If a requirement is unclear, choose the safest backend-compatible default and document it.
0985 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:646 | Explicit Frontend Exclusion Reminder
0986 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:647 | Ignore all frontend parts from the original brief.
0987 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:648 | Ignore all requests about website design.
0988 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:649 | Ignore all requests about CSS frameworks.
0989 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:650 | Ignore all requests about JavaScript frameworks.
0990 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:651 | Ignore all requests about animations.
0991 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:652 | Ignore all requests about UI themes except storing backend-managed theme configuration data.
0992 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:653 | Ignore all requests about rendering pages.
0993 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:655 | Deferred Scope Reminder
0994 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:656 | `Android` is future scope only.
0995 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:657 | `iOS` is future scope only.
0996 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:658 | Any website client is future scope only.
0997 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:659 | Current mission is to make the backend ready for those future clients.
0998 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:661 | Definition Of Done
0999 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:662 | A Laravel 13 backend exists under `backend/`.
1000 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:663 | The codebase is API-only.
1001 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:664 | The codebase exposes versioned JSON APIs.
1002 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:665 | The codebase includes modular domain logic.
1003 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:666 | The codebase includes secure authentication and authorization.
1004 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:667 | The codebase includes the required business modules.
1005 | ?? | tested | prompt-pack/00-master-backend-only-prompt.md:668 | The codebase includes tests.
1006 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:669 | The codebase includes documentation.
1007 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:670 | The codebase includes internal `plans/*.md`.
1008 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:671 | The codebase contains no frontend implementation artifacts.
1009 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:673 | Final Self-Check
1010 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:674 | Did you stay backend-only from start to finish.
1011 | ? | out_of_scope_backend_only | prompt-pack/00-master-backend-only-prompt.md:675 | Did you avoid frontend generation entirely.
1012 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:676 | Did you create `plans/00` through `plans/12` before coding.
1013 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:677 | Did you keep `backend/` as the only active project folder.
1014 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:678 | Did you keep all responses and contracts JSON-only.
1015 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:679 | Did you normalize username and email to lowercase.
1016 | ?? | planned | prompt-pack/00-master-backend-only-prompt.md:680 | Did you protect notes and other free text from unsafe handling.
1017 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:681 | Did you define order status rules clearly.
1018 | ?? | done | prompt-pack/00-master-backend-only-prompt.md:682 | Did you implement or document coupon edge cases correctly.
1019 | ? | backlog_future | prompt-pack/00-master-backend-only-prompt.md:683 | Did you keep the architecture open for future mobile clients.
1020 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:1 | Architecture And Spec Companion
1021 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:4 | هذا الملف ليس prompt بديلًا.
1022 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:5 | هذا الملف companion spec.
1023 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:6 | يستخدم مع الملف الأساسي.
1024 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:7 | يوضح architecture boundaries.
1025 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:8 | يوضح module responsibilities.
1026 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:9 | يوضح data ownership.
1027 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:10 | يوضح backend contracts المطلوبة.
1028 | ?? | done | prompt-pack/01-architecture-spec-companion.md:12 | Product Intent
1029 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:13 | النظام هو منصة مطعم أونلاين عربية/مصرية.
1030 | ?? | done | prompt-pack/01-architecture-spec-companion.md:14 | الهدف هو backend API متقدم.
1031 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:15 | العملاء المستقبلية قد تكون:
1032 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:16 | `web client`
1033 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:17 | `Android app`
1034 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:18 | `iOS app`
1035 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:19 | التطبيق الحالي المطلوب الآن:
1036 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:20 | `backend only`
1037 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:22 | Architectural Principles
1038 | ?? | done | prompt-pack/01-architecture-spec-companion.md:23 | API-first.
1039 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:24 | Domain-oriented design.
1040 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:25 | Clear separation of concerns.
1041 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:26 | Business logic outside controllers.
1042 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:27 | Authorization explicit and testable.
1043 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:28 | Validation centralized in request objects and domain services.
1044 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:29 | Pricing logic isolated from transport logic.
1045 | ?? | done | prompt-pack/01-architecture-spec-companion.md:30 | State transitions explicit and auditable.
1046 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:32 | Suggested Top-Level Structure
1047 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:33 | `backend/app/Modules`
1048 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:34 | `backend/app/Shared`
1049 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:35 | `backend/app/Providers`
1050 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:36 | `backend/config`
1051 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:37 | `backend/database`
1052 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:38 | `backend/routes`
1053 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:39 | `backend/tests`
1054 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:41 | Suggested Module List
1055 | ?? | done | prompt-pack/01-architecture-spec-companion.md:44 | `Profiles`
1056 | ?? | done | prompt-pack/01-architecture-spec-companion.md:45 | `Addresses`
1057 | ?? | done | prompt-pack/01-architecture-spec-companion.md:46 | `Wallet`
1058 | ?? | done | prompt-pack/01-architecture-spec-companion.md:47 | `GiftCards`
1059 | ?? | done | prompt-pack/01-architecture-spec-companion.md:48 | `Branches`
1060 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:49 | `DeliveryZones`
1061 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:50 | `Categories`
1062 | ?? | done | prompt-pack/01-architecture-spec-companion.md:52 | `Products`
1063 | ?? | done | prompt-pack/01-architecture-spec-companion.md:53 | `ProductMedia`
1064 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:54 | `Variants`
1065 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:55 | `Addons`
1066 | ?? | done | prompt-pack/01-architecture-spec-companion.md:57 | `Orders`
1067 | ?? | done | prompt-pack/01-architecture-spec-companion.md:58 | `Coupons`
1068 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:59 | `Payments`
1069 | ?? | done | prompt-pack/01-architecture-spec-companion.md:60 | `Reviews`
1070 | ?? | done | prompt-pack/01-architecture-spec-companion.md:61 | `Notifications`
1071 | ?? | done | prompt-pack/01-architecture-spec-companion.md:62 | `Settings`
1072 | ?? | done | prompt-pack/01-architecture-spec-companion.md:63 | `DynamicPages`
1073 | ?? | done | prompt-pack/01-architecture-spec-companion.md:65 | `AuditLogs`
1074 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:67 | Suggested Internal Module Layout
1075 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:68 | `Controllers`
1076 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:69 | `Requests`
1077 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:70 | `Resources`
1078 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:71 | `Services`
1079 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:72 | `Repositories`
1080 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:74 | `Policies`
1081 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:75 | `Actions`
1082 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:77 | `Exceptions`
1083 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:78 | `Support`
1084 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:80 | Shared Layer Suggestions
1085 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:81 | `Shared/Http`
1086 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:82 | `Shared/Responses`
1087 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:83 | `Shared/Concerns`
1088 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:84 | `Shared/Enums`
1089 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:85 | `Shared/Traits`
1090 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:86 | `Shared/Services`
1091 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:87 | `Shared/Support`
1092 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:88 | `Shared/Exceptions`
1093 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:89 | `Shared/ValueObjects`
1094 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:91 | Why Modular Laravel Here
1095 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:92 | كثافة المتطلبات كبيرة.
1096 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:93 | الموديولات كثيرة.
1097 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:94 | قواعد التسعير معقدة.
1098 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:95 | الـ authorization granular.
1099 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:96 | الإدارة متعددة الفروع تحتاج boundaries واضحة.
1100 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:97 | فصل الدومينات يجعل التطوير والاختبار أسهل.
1101 | ?? | partial | prompt-pack/01-architecture-spec-companion.md:99 | Request Flow
1102 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:100 | Client sends HTTP request.
1103 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:101 | Route resolves versioned endpoint.
1104 | ?? | done | prompt-pack/01-architecture-spec-companion.md:102 | Middleware authenticates and normalizes request context.
1105 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:103 | `FormRequest` validates structure and primitive rules.
1106 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:104 | Controller delegates to `Service` or `Action`.
1107 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:105 | Service calls repositories and domain helpers.
1108 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:106 | Domain rules run.
1109 | ?? | partial | prompt-pack/01-architecture-spec-companion.md:107 | Database transactions protect multi-write flows.
1110 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:108 | Events fire for side effects.
1111 | ?? | done | prompt-pack/01-architecture-spec-companion.md:109 | API Resource formats final JSON response.
1112 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:111 | Response Philosophy
1113 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:112 | Keep response contracts stable.
1114 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:113 | Keep successful payloads predictable.
1115 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:114 | Keep metadata consistent.
1116 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:115 | Keep pagination schema consistent.
1117 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:116 | Keep business calculation fields explicit.
1118 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:117 | Return human-safe localized messages.
1119 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:118 | Return machine-safe structured errors.
1120 | ?? | done | prompt-pack/01-architecture-spec-companion.md:120 | API Versioning Strategy
1121 | ?? | done | prompt-pack/01-architecture-spec-companion.md:121 | All routes begin with `/api/v1`.
1122 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:122 | Version is grouped at route file and namespace level.
1123 | ?? | done | prompt-pack/01-architecture-spec-companion.md:123 | New major behavioral changes go to `/api/v2`.
1124 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:124 | Minor additions should be backward-compatible.
1125 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:125 | Deprecation must be documented.
1126 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:127 | Route Group Strategy
1127 | ?? | done | prompt-pack/01-architecture-spec-companion.md:128 | `/api/v1/auth/*`
1128 | ?? | done | prompt-pack/01-architecture-spec-companion.md:129 | `/api/v1/profile/*`
1129 | ?? | done | prompt-pack/01-architecture-spec-companion.md:130 | `/api/v1/branches/*`
1130 | ?? | done | prompt-pack/01-architecture-spec-companion.md:131 | `/api/v1/menu/*`
1131 | ?? | done | prompt-pack/01-architecture-spec-companion.md:132 | `/api/v1/products/*`
1132 | ?? | done | prompt-pack/01-architecture-spec-companion.md:133 | `/api/v1/cart/*`
1133 | ?? | done | prompt-pack/01-architecture-spec-companion.md:134 | `/api/v1/orders/*`
1134 | ?? | done | prompt-pack/01-architecture-spec-companion.md:135 | `/api/v1/coupons/*`
1135 | ?? | done | prompt-pack/01-architecture-spec-companion.md:136 | `/api/v1/wallet/*`
1136 | ?? | done | prompt-pack/01-architecture-spec-companion.md:137 | `/api/v1/gift-cards/*`
1137 | ?? | done | prompt-pack/01-architecture-spec-companion.md:138 | `/api/v1/reviews/*`
1138 | ?? | done | prompt-pack/01-architecture-spec-companion.md:139 | `/api/v1/settings/*`
1139 | ?? | done | prompt-pack/01-architecture-spec-companion.md:140 | `/api/v1/pages/*`
1140 | ?? | done | prompt-pack/01-architecture-spec-companion.md:141 | `/api/v1/admin/*`
1141 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:143 | Suggested Data Model Domains
1142 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:144 | Identity domain.
1143 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:145 | Catalog domain.
1144 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:146 | Ordering domain.
1145 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:147 | Fulfillment domain.
1146 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:148 | Billing domain.
1147 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:149 | Administration domain.
1148 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:150 | Configuration domain.
1149 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:151 | Communication domain.
1150 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:153 | Identity Domain
1151 | ?? | done | prompt-pack/01-architecture-spec-companion.md:155 | Admin accounts if same user model, differentiated by roles.
1152 | ?? | done | prompt-pack/01-architecture-spec-companion.md:156 | Access tokens.
1153 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:157 | Password resets if implemented.
1154 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:158 | Email verification if needed.
1155 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:159 | Phone verification if needed.
1156 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:160 | Device sessions metadata if tracked.
1157 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:162 | Catalog Domain
1158 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:163 | Categories.
1159 | ?? | done | prompt-pack/01-architecture-spec-companion.md:165 | Products.
1160 | ?? | done | prompt-pack/01-architecture-spec-companion.md:166 | Product translations if not using JSON columns.
1161 | ?? | done | prompt-pack/01-architecture-spec-companion.md:167 | Product media.
1162 | ?? | done | prompt-pack/01-architecture-spec-companion.md:168 | Product variants or sizes.
1163 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:169 | Add-on groups.
1164 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:170 | Add-on options.
1165 | ?? | done | prompt-pack/01-architecture-spec-companion.md:171 | Branch availability pivots.
1166 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:172 | Best-seller ranking metadata.
1167 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:174 | Ordering Domain
1168 | ?? | done | prompt-pack/01-architecture-spec-companion.md:176 | Cart items.
1169 | ?? | done | prompt-pack/01-architecture-spec-companion.md:178 | Order items.
1170 | ?? | done | prompt-pack/01-architecture-spec-companion.md:179 | Order item add-ons.
1171 | ?? | done | prompt-pack/01-architecture-spec-companion.md:180 | Order status transitions.
1172 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:181 | Checkout calculations.
1173 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:182 | Grace-period edit/cancel rules.
1174 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:184 | Fulfillment Domain
1175 | ?? | done | prompt-pack/01-architecture-spec-companion.md:185 | Branches.
1176 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:186 | Delivery zones.
1177 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:187 | Delivery assignments.
1178 | ?? | done | prompt-pack/01-architecture-spec-companion.md:188 | Branch hours.
1179 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:189 | Availability windows if needed later.
1180 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:191 | Billing Domain
1181 | ?? | done | prompt-pack/01-architecture-spec-companion.md:192 | Coupon definitions.
1182 | ?? | done | prompt-pack/01-architecture-spec-companion.md:193 | Coupon usage records.
1183 | ?? | done | prompt-pack/01-architecture-spec-companion.md:194 | Wallet balances.
1184 | ?? | done | prompt-pack/01-architecture-spec-companion.md:195 | Wallet transactions.
1185 | ?? | done | prompt-pack/01-architecture-spec-companion.md:196 | Gift cards.
1186 | ?? | done | prompt-pack/01-architecture-spec-companion.md:197 | Gift card redemptions.
1187 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:198 | Payment attempts.
1188 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:199 | Payment method adapters.
1189 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:201 | Configuration Domain
1190 | ?? | done | prompt-pack/01-architecture-spec-companion.md:202 | Settings.
1191 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:203 | Feature toggles.
1192 | ?? | done | prompt-pack/01-architecture-spec-companion.md:204 | Currency settings.
1193 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:205 | Theme JSON storage.
1194 | ?? | done | prompt-pack/01-architecture-spec-companion.md:206 | Localization settings.
1195 | ?? | done | prompt-pack/01-architecture-spec-companion.md:207 | Mail settings references.
1196 | ?? | done | prompt-pack/01-architecture-spec-companion.md:208 | Notification channel settings.
1197 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:210 | Communication Domain
1198 | ?? | done | prompt-pack/01-architecture-spec-companion.md:211 | Notifications.
1199 | ?? | partial | prompt-pack/01-architecture-spec-companion.md:212 | Broadcast events if enabled.
1200 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:213 | Email jobs.
1201 | ?? | done | prompt-pack/01-architecture-spec-companion.md:214 | Audit events.
1202 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:216 | Admin Domain
1203 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:218 | Permissions.
1204 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:219 | Admin-only reports.
1205 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:220 | Moderation actions.
1206 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:221 | Content management endpoints.
1207 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:223 | Core Entity Notes
1208 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:224 | `User` is central but should not own every concern directly.
1209 | ?? | done | prompt-pack/01-architecture-spec-companion.md:225 | `Branch` is central to ordering constraints.
1210 | ?? | done | prompt-pack/01-architecture-spec-companion.md:226 | `Product` is central to catalog and checkout calculations.
1211 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:227 | `Order` is central to financial and operational workflows.
1212 | ?? | done | prompt-pack/01-architecture-spec-companion.md:228 | `Coupon` logic must remain isolated because it has many edge cases.
1213 | ?? | done | prompt-pack/01-architecture-spec-companion.md:229 | `WalletTransaction` should be append-only friendly.
1214 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:231 | Suggested Relationship Overview
1215 | ?? | done | prompt-pack/01-architecture-spec-companion.md:234 | ├─ hasMany Addresses
1216 | ?? | done | prompt-pack/01-architecture-spec-companion.md:235 | ├─ hasOne Wallet
1217 | ?? | done | prompt-pack/01-architecture-spec-companion.md:236 | ├─ hasMany Orders
1218 | ?? | done | prompt-pack/01-architecture-spec-companion.md:237 | ├─ hasMany Reviews
1219 | ?? | done | prompt-pack/01-architecture-spec-companion.md:238 | ├─ hasMany WalletTransactions
1220 | ?? | done | prompt-pack/01-architecture-spec-companion.md:239 | └─ belongsToMany Roles
1221 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:242 | ├─ hasMany DeliveryZones
1222 | ?? | done | prompt-pack/01-architecture-spec-companion.md:243 | ├─ belongsToMany Products
1223 | ?? | done | prompt-pack/01-architecture-spec-companion.md:244 | └─ hasMany Orders
1224 | ?? | done | prompt-pack/01-architecture-spec-companion.md:246 | Category
1225 | ?? | done | prompt-pack/01-architecture-spec-companion.md:247 | ├─ belongsTo Category (parent)
1226 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:248 | ├─ hasMany Categories (children)
1227 | ?? | done | prompt-pack/01-architecture-spec-companion.md:249 | └─ belongsToMany Products
1228 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:252 | ├─ belongsToMany Categories
1229 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:253 | ├─ belongsToMany Tags
1230 | ?? | done | prompt-pack/01-architecture-spec-companion.md:254 | ├─ belongsToMany Branches
1231 | ?? | done | prompt-pack/01-architecture-spec-companion.md:255 | ├─ hasMany ProductMedia
1232 | ?? | done | prompt-pack/01-architecture-spec-companion.md:256 | ├─ hasMany ProductSizes
1233 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:257 | ├─ hasMany AddonGroups
1234 | ?? | done | prompt-pack/01-architecture-spec-companion.md:258 | ├─ hasMany Reviews
1235 | ?? | done | prompt-pack/01-architecture-spec-companion.md:259 | └─ hasMany OrderItems
1236 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:262 | ├─ belongsTo User
1237 | ?? | done | prompt-pack/01-architecture-spec-companion.md:263 | ├─ belongsTo Branch
1238 | ?? | done | prompt-pack/01-architecture-spec-companion.md:264 | ├─ belongsTo Address
1239 | ?? | done | prompt-pack/01-architecture-spec-companion.md:265 | ├─ hasMany OrderItems
1240 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:266 | ├─ hasMany StatusLogs
1241 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:267 | ├─ mayHave PaymentRecord
1242 | ?? | done | prompt-pack/01-architecture-spec-companion.md:268 | └─ mayUse Coupon
1243 | ?? | done | prompt-pack/01-architecture-spec-companion.md:271 | Product Modeling Decision
1244 | ?? | done | prompt-pack/01-architecture-spec-companion.md:272 | Do not keep product pricing in one flat field only.
1245 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:273 | Keep a `base_price` only if it has meaning.
1246 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:274 | If sizes are required for many products, create explicit size entities.
1247 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:275 | Add-on pricing should support overrides per size.
1248 | ?? | done | prompt-pack/01-architecture-spec-companion.md:276 | Snapshot final order item pricing at checkout.
1249 | ?? | done | prompt-pack/01-architecture-spec-companion.md:278 | Product Availability Decision
1250 | ?? | done | prompt-pack/01-architecture-spec-companion.md:279 | Global product enable state is not enough.
1251 | ?? | done | prompt-pack/01-architecture-spec-companion.md:280 | Add per-branch availability support.
1252 | ?? | done | prompt-pack/01-architecture-spec-companion.md:281 | Support an `all_branches` mode.
1253 | ?? | done | prompt-pack/01-architecture-spec-companion.md:282 | Support explicit branch whitelist mode.
1254 | ?? | done | prompt-pack/01-architecture-spec-companion.md:283 | Validate at cart update and checkout.
1255 | ?? | done | prompt-pack/01-architecture-spec-companion.md:285 | Category Strategy
1256 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:286 | Use adjacency list first unless nested sets become necessary.
1257 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:287 | Add `parent_id`.
1258 | ?? | done | prompt-pack/01-architecture-spec-companion.md:288 | Add sort/order field if needed.
1259 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:289 | Add slug if clients need stable category URLs later.
1260 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:290 | Keep translatable names.
1261 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:292 | Tag Strategy
1262 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:293 | Tags are lightweight metadata.
1263 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:294 | Keep them many-to-many.
1264 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:295 | Allow search/filter indexing if needed.
1265 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:297 | Media Strategy
1266 | ?? | done | prompt-pack/01-architecture-spec-companion.md:298 | Use a dedicated product media table.
1267 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:299 | Separate primary image from gallery logic if simpler.
1268 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:300 | Track media type.
1269 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:301 | Track storage disk/path.
1270 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:302 | Track external URL.
1271 | ?? | done | prompt-pack/01-architecture-spec-companion.md:303 | Track sort order.
1272 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:304 | Keep `is_primary` explicit.
1273 | ?? | done | prompt-pack/01-architecture-spec-companion.md:306 | Review Strategy
1274 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:307 | Keep verified purchase status derivable or snapshotted.
1275 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:308 | Keep anonymity flag explicit.
1276 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:309 | Keep moderation fields explicit.
1277 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:310 | Optionally keep approval state if moderation flow requires it.
1278 | ?? | done | prompt-pack/01-architecture-spec-companion.md:312 | Profile Strategy
1279 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:313 | Public profile is API data, not a frontend page.
1280 | ?? | suggested | prompt-pack/01-architecture-spec-companion.md:314 | Suggested fields:
1281 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:315 | `username`
1282 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:316 | `avatar_path`
1283 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:317 | `bio` if desired
1284 | ?? | done | prompt-pack/01-architecture-spec-companion.md:318 | `is_public_profile`
1285 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:319 | per-metric visibility flags
1286 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:320 | monthly/yearly ranking may be computed or cached
1287 | ?? | done | prompt-pack/01-architecture-spec-companion.md:322 | Address Strategy
1288 | ?? | done | prompt-pack/01-architecture-spec-companion.md:323 | Separate addresses from users.
1289 | ?? | done | prompt-pack/01-architecture-spec-companion.md:324 | Support multiple saved addresses.
1290 | ?? | done | prompt-pack/01-architecture-spec-companion.md:325 | Support one default address.
1291 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:326 | Keep structured location fields.
1292 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:327 | Allow optional landmarks and notes.
1293 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:328 | Sanitize notes.
1294 | ?? | done | prompt-pack/01-architecture-spec-companion.md:330 | Wallet Strategy
1295 | ?? | done | prompt-pack/01-architecture-spec-companion.md:331 | Keep a wallet table for current balance.
1296 | ?? | done | prompt-pack/01-architecture-spec-companion.md:332 | Keep a wallet transaction ledger for history.
1297 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:333 | Never rely on balance-only writes without history.
1298 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:334 | Use transactions and row locking where needed.
1299 | ?? | done | prompt-pack/01-architecture-spec-companion.md:336 | Coupon Strategy
1300 | ?? | done | prompt-pack/01-architecture-spec-companion.md:337 | Keep coupon definition separate from usage tracking.
1301 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:338 | Track per-user uses.
1302 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:339 | Track global uses.
1303 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:340 | Track eligible scopes.
1304 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:341 | Track delivery applicability.
1305 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:342 | Track amount vs percentage mode.
1306 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:343 | Track cap.
1307 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:344 | Track validity windows.
1308 | ?? | done | prompt-pack/01-architecture-spec-companion.md:346 | Order Strategy
1309 | ?? | done | prompt-pack/01-architecture-spec-companion.md:347 | Orders need immutable pricing snapshots.
1310 | ?? | done | prompt-pack/01-architecture-spec-companion.md:348 | Order item names should be snapshotted.
1311 | ?? | done | prompt-pack/01-architecture-spec-companion.md:349 | Order item prices should be snapshotted.
1312 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:350 | Selected size and add-ons should be snapshotted.
1313 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:351 | Delivery fee should be snapshotted.
1314 | ?? | done | prompt-pack/01-architecture-spec-companion.md:352 | Coupon result should be snapshotted.
1315 | ?? | done | prompt-pack/01-architecture-spec-companion.md:353 | Wallet deduction should be snapshotted.
1316 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:355 | Status Transition Strategy
1317 | ?? | done | prompt-pack/01-architecture-spec-companion.md:356 | Keep current order status on the order.
1318 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:357 | Keep a separate transition log.
1319 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:358 | Log actor where possible.
1320 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:359 | Log reason where useful.
1321 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:360 | Log timestamps.
1322 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:361 | Prevent invalid transitions.
1323 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:363 | Grace Period Implementation Notes
1324 | ?? | done | prompt-pack/01-architecture-spec-companion.md:364 | Store `grace_period_ends_at` on the order.
1325 | ?? | done | prompt-pack/01-architecture-spec-companion.md:365 | Use settings-driven default duration.
1326 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:366 | Check this value in cancel/edit policies and services.
1327 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:367 | Do not depend only on frontend timing assumptions.
1328 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:369 | Branch-Specific Permissions
1329 | ?? | done | prompt-pack/01-architecture-spec-companion.md:370 | Branch managers should not see everything by default.
1330 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:371 | Support scoped abilities.
1331 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:372 | Examples:
1332 | ?? | done | prompt-pack/01-architecture-spec-companion.md:373 | `orders.view.any`
1333 | ?? | done | prompt-pack/01-architecture-spec-companion.md:374 | `orders.view.branch`
1334 | ?? | done | prompt-pack/01-architecture-spec-companion.md:375 | `orders.update.branch`
1335 | ?? | done | prompt-pack/01-architecture-spec-companion.md:376 | `branches.manage`
1336 | ?? | done | prompt-pack/01-architecture-spec-companion.md:377 | `products.manage.branch`
1337 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:378 | Represent branch scope either through permission conventions or policy context checks.
1338 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:380 | Configuration Storage Strategy
1339 | ?? | done | prompt-pack/01-architecture-spec-companion.md:381 | Key-value settings table is acceptable.
1340 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:382 | Add typed casting support at service layer.
1341 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:383 | Group settings by domain:
1342 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:384 | `general`
1343 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:385 | `currency`
1344 | ?? | done | prompt-pack/01-architecture-spec-companion.md:387 | `orders`
1345 | ?? | done | prompt-pack/01-architecture-spec-companion.md:388 | `wallet`
1346 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:389 | `gift_cards`
1347 | ?? | done | prompt-pack/01-architecture-spec-companion.md:391 | `notifications`
1348 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:393 | `features`
1349 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:395 | Theme JSON Rule
1350 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:396 | Treat theme JSON as raw configuration payload.
1351 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:397 | Validate schema if possible.
1352 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:398 | Store versions.
1353 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:399 | Support import/export.
1354 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:400 | Do not render UI from it here.
1355 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:402 | Search And Filtering Strategy
1356 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:403 | Keep filter logic close to query builders.
1357 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:404 | Whitelist sortable fields.
1358 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:405 | Whitelist filterable fields.
1359 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:406 | Avoid unsafe dynamic column sorting.
1360 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:407 | Add indexes for heavy filters.
1361 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:409 | Performance Baseline
1362 | ?? | partial | prompt-pack/01-architecture-spec-companion.md:410 | Redis for caching and queues.
1363 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:411 | Eager loading on menu/catalog endpoints.
1364 | ?? | done | prompt-pack/01-architecture-spec-companion.md:412 | Cached settings resolution.
1365 | ?? | done | prompt-pack/01-architecture-spec-companion.md:413 | Cached branch-category-product aggregates where appropriate.
1366 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:414 | Query profiling in development only.
1367 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:416 | Event-Driven Candidates
1368 | ?? | done | prompt-pack/01-architecture-spec-companion.md:417 | Order created.
1369 | ?? | done | prompt-pack/01-architecture-spec-companion.md:418 | Order status changed.
1370 | ?? | done | prompt-pack/01-architecture-spec-companion.md:419 | Wallet credited.
1371 | ?? | done | prompt-pack/01-architecture-spec-companion.md:420 | Wallet debited.
1372 | ?? | done | prompt-pack/01-architecture-spec-companion.md:421 | Gift card redeemed.
1373 | ?? | done | prompt-pack/01-architecture-spec-companion.md:422 | Coupon consumed.
1374 | ?? | done | prompt-pack/01-architecture-spec-companion.md:423 | Review created.
1375 | ?? | done | prompt-pack/01-architecture-spec-companion.md:424 | Review moderated.
1376 | ?? | done | prompt-pack/01-architecture-spec-companion.md:425 | Settings changed.
1377 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:427 | Job Candidates
1378 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:428 | Send emails.
1379 | ?? | done | prompt-pack/01-architecture-spec-companion.md:429 | Dispatch push notifications.
1380 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:430 | Rebuild best-seller caches.
1381 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:431 | Generate reports.
1382 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:432 | Process slow media tasks.
1383 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:434 | Documentation Mapping
1384 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:435 | `plans/00` covers high-level overview.
1385 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:436 | `plans/01` covers schema and Eloquent relationships.
1386 | ?? | done | prompt-pack/01-architecture-spec-companion.md:437 | `plans/02` covers API routes and versioning.
1387 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:438 | `plans/03` covers auth and authorization.
1388 | ?? | done | prompt-pack/01-architecture-spec-companion.md:439 | `plans/04` covers branches and menus.
1389 | ?? | done | prompt-pack/01-architecture-spec-companion.md:440 | `plans/05` covers products, sizes, and add-ons.
1390 | ?? | done | prompt-pack/01-architecture-spec-companion.md:441 | `plans/06` covers reviews, ratings, tags, and best sellers.
1391 | ?? | done | prompt-pack/01-architecture-spec-companion.md:442 | `plans/07` covers users, profiles, addresses, wallet, and gift cards.
1392 | ?? | done | prompt-pack/01-architecture-spec-companion.md:443 | `plans/08` covers cart, orders, checkout, shipping, and coupons.
1393 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:444 | `plans/09` covers admin, roles, permissions, and notifications.
1394 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:445 | `plans/10` covers security and testing.
1395 | ?? | done | prompt-pack/01-architecture-spec-companion.md:446 | `plans/11` covers localization.
1396 | ? | backlog_future | prompt-pack/01-architecture-spec-companion.md:447 | `plans/12` covers scalability and future mobile readiness.
1397 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:449 | Anti-Pattern Warnings
1398 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:450 | Do not place pricing math in controllers.
1399 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:451 | Do not place authorization decisions in JavaScript.
1400 | ?? | done | prompt-pack/01-architecture-spec-companion.md:452 | Do not expose internal admin fields to public APIs.
1401 | ? | out_of_scope_backend_only | prompt-pack/01-architecture-spec-companion.md:453 | Do not rely on frontend to enforce business rules.
1402 | ?? | tested | prompt-pack/01-architecture-spec-companion.md:454 | Do not mix branch validation with presentation logic.
1403 | ?? | done | prompt-pack/01-architecture-spec-companion.md:455 | Do not silently auto-fix invalid cart states at order time without clear response messaging.
1404 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:457 | Success Shape
1405 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:458 | A downstream coding agent can implement from this spec without inventing major architecture decisions.
1406 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:459 | Module boundaries stay understandable.
1407 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:460 | Data contracts stay stable.
1408 | ?? | planned | prompt-pack/01-architecture-spec-companion.md:461 | Backend-only scope remains enforced.
1409 | ?? | tested | prompt-pack/02-security-auth-companion.md:1 | Security And Auth Companion
1410 | ?? | partial | prompt-pack/02-security-auth-companion.md:4 | هذا الملف يحدد hard security defaults.
1411 | ?? | done | prompt-pack/02-security-auth-companion.md:5 | هذا الملف يحدد auth strategy بوضوح.
1412 | ?? | planned | prompt-pack/02-security-auth-companion.md:6 | هذا الملف يمنع الـ agent من ترك فراغات أمنية بسبب التفسير الحر.
1413 | ?? | planned | prompt-pack/02-security-auth-companion.md:7 | استخدمه مع `00-master-backend-only-prompt.md`.
1414 | ?? | partial | prompt-pack/02-security-auth-companion.md:9 | Security Mindset
1415 | ?? | planned | prompt-pack/02-security-auth-companion.md:10 | Assume hostile input by default.
1416 | ?? | done | prompt-pack/02-security-auth-companion.md:11 | Assume public APIs will be probed.
1417 | ?? | planned | prompt-pack/02-security-auth-companion.md:12 | Assume free-text fields can contain malicious payloads.
1418 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:13 | Assume admin dashboards may later display unsafe content unless the backend constrains it.
1419 | ?? | done | prompt-pack/02-security-auth-companion.md:14 | Assume tokens can be leaked if handled poorly.
1420 | ?? | tested | prompt-pack/02-security-auth-companion.md:15 | Assume coupon and wallet flows are attractive abuse targets.
1421 | ?? | partial | prompt-pack/02-security-auth-companion.md:17 | Primary Security Goals
1422 | ?? | planned | prompt-pack/02-security-auth-companion.md:18 | Preserve confidentiality.
1423 | ?? | planned | prompt-pack/02-security-auth-companion.md:19 | Preserve integrity.
1424 | ?? | planned | prompt-pack/02-security-auth-companion.md:20 | Preserve availability.
1425 | ?? | done | prompt-pack/02-security-auth-companion.md:21 | Preserve auditability.
1426 | ?? | planned | prompt-pack/02-security-auth-companion.md:22 | Preserve pricing correctness.
1427 | ?? | tested | prompt-pack/02-security-auth-companion.md:23 | Preserve authorization boundaries.
1428 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:25 | Required Threat Areas
1429 | ?? | tested | prompt-pack/02-security-auth-companion.md:26 | Authentication brute force.
1430 | ?? | done | prompt-pack/02-security-auth-companion.md:27 | Token leakage.
1431 | ?? | planned | prompt-pack/02-security-auth-companion.md:28 | Broken access control.
1432 | ?? | planned | prompt-pack/02-security-auth-companion.md:29 | Insecure direct object references.
1433 | ?? | tested | prompt-pack/02-security-auth-companion.md:30 | XSS through notes and reviews.
1434 | ?? | planned | prompt-pack/02-security-auth-companion.md:31 | Mass assignment.
1435 | ?? | tested | prompt-pack/02-security-auth-companion.md:32 | File upload abuse.
1436 | ?? | done | prompt-pack/02-security-auth-companion.md:33 | Coupon abuse.
1437 | ?? | done | prompt-pack/02-security-auth-companion.md:34 | Wallet race conditions.
1438 | ?? | done | prompt-pack/02-security-auth-companion.md:35 | Order status tampering.
1439 | ?? | done | prompt-pack/02-security-auth-companion.md:36 | Branch-scope privilege escalation.
1440 | ?? | tested | prompt-pack/02-security-auth-companion.md:38 | Authentication Baseline
1441 | ?? | done | prompt-pack/02-security-auth-companion.md:39 | Use `Laravel Sanctum`.
1442 | ?? | tested | prompt-pack/02-security-auth-companion.md:40 | Prefer access-token flow as the main cross-platform mechanism.
1443 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:41 | Do not build the system around session-only auth.
1444 | ?? | done | prompt-pack/02-security-auth-companion.md:42 | Support multi-device tokens.
1445 | ?? | done | prompt-pack/02-security-auth-companion.md:43 | Store tokens using Sanctum’s secure hashing behavior.
1446 | ?? | done | prompt-pack/02-security-auth-companion.md:44 | Label tokens meaningfully when possible.
1447 | ?? | done | prompt-pack/02-security-auth-companion.md:45 | Revoke tokens explicitly on logout.
1448 | ?? | done | prompt-pack/02-security-auth-companion.md:46 | Support logout current device.
1449 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:47 | Support logout all devices if required.
1450 | ?? | planned | prompt-pack/02-security-auth-companion.md:49 | Identity Normalization
1451 | ?? | planned | prompt-pack/02-security-auth-companion.md:50 | Normalize `email` to lowercase before save.
1452 | ?? | planned | prompt-pack/02-security-auth-companion.md:51 | Normalize `username` to lowercase before save.
1453 | ?? | done | prompt-pack/02-security-auth-companion.md:52 | Normalize on login lookup as well.
1454 | ?? | planned | prompt-pack/02-security-auth-companion.md:53 | Keep uniqueness checks aligned with normalized values.
1455 | ?? | tested | prompt-pack/02-security-auth-companion.md:54 | Add tests for case-insensitive identity behavior.
1456 | ?? | tested | prompt-pack/02-security-auth-companion.md:56 | Login Flow Rules
1457 | ?? | done | prompt-pack/02-security-auth-companion.md:57 | Login endpoint accepts `email_or_username`.
1458 | ?? | planned | prompt-pack/02-security-auth-companion.md:58 | Resolve which identity type is being used safely.
1459 | ?? | partial | prompt-pack/02-security-auth-companion.md:59 | Apply rate limiting.
1460 | ?? | planned | prompt-pack/02-security-auth-companion.md:60 | Return generic invalid-credentials messages.
1461 | ?? | planned | prompt-pack/02-security-auth-companion.md:61 | Avoid username enumeration leaks.
1462 | ?? | done | prompt-pack/02-security-auth-companion.md:62 | Optionally include device name in token creation.
1463 | ?? | partial | prompt-pack/02-security-auth-companion.md:64 | Registration Flow Rules
1464 | ?? | planned | prompt-pack/02-security-auth-companion.md:65 | Validate normalized uniqueness before persist.
1465 | ?? | partial | prompt-pack/02-security-auth-companion.md:66 | Enforce password policy.
1466 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:67 | Enforce required primary phone.
1467 | ?? | done | prompt-pack/02-security-auth-companion.md:68 | Sanitize optional profile fields.
1468 | ?? | planned | prompt-pack/02-security-auth-companion.md:69 | Keep registration response minimal.
1469 | ?? | partial | prompt-pack/02-security-auth-companion.md:71 | Password Policy
1470 | ?? | planned | prompt-pack/02-security-auth-companion.md:72 | Minimum length `6`.
1471 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:73 | Require one letter.
1472 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:74 | Require one number.
1473 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:75 | Require one symbol.
1474 | ?? | planned | prompt-pack/02-security-auth-companion.md:76 | Reject passwords containing the user’s username if present.
1475 | ?? | planned | prompt-pack/02-security-auth-companion.md:77 | Reject passwords containing the user’s email if present.
1476 | ?? | planned | prompt-pack/02-security-auth-companion.md:78 | Reject passwords containing known first or last name if present.
1477 | ?? | planned | prompt-pack/02-security-auth-companion.md:79 | Keep the implementation deterministic.
1478 | ?? | tested | prompt-pack/02-security-auth-companion.md:80 | Cover with tests.
1479 | ?? | tested | prompt-pack/02-security-auth-companion.md:82 | Authorization Baseline
1480 | ?? | planned | prompt-pack/02-security-auth-companion.md:83 | Use `Policies` for resource access.
1481 | ?? | planned | prompt-pack/02-security-auth-companion.md:84 | Use `Gates` for coarse-grained abilities.
1482 | ?? | done | prompt-pack/02-security-auth-companion.md:85 | Use `spatie/laravel-permission` for role and permission assignment.
1483 | ?? | done | prompt-pack/02-security-auth-companion.md:86 | Keep role names descriptive.
1484 | ?? | done | prompt-pack/02-security-auth-companion.md:87 | Keep permission names explicit.
1485 | ?? | planned | prompt-pack/02-security-auth-companion.md:88 | Never assume admin rights just because a route starts with `/admin`.
1486 | ?? | partial | prompt-pack/02-security-auth-companion.md:89 | Always enforce policy checks in controllers/services.
1487 | ?? | planned | prompt-pack/02-security-auth-companion.md:91 | Super Admin Rule
1488 | ?? | planned | prompt-pack/02-security-auth-companion.md:92 | If using `id = 1` bootstrap logic, document it clearly.
1489 | ?? | planned | prompt-pack/02-security-auth-companion.md:93 | Prefer also mapping that actor to a clear `super_admin` capability.
1490 | ?? | planned | prompt-pack/02-security-auth-companion.md:94 | Keep bypass logic centralized.
1491 | ?? | planned | prompt-pack/02-security-auth-companion.md:95 | Do not scatter super-admin bypass logic across controllers.
1492 | ?? | tested | prompt-pack/02-security-auth-companion.md:97 | Branch-Scoped Authorization
1493 | ?? | done | prompt-pack/02-security-auth-companion.md:98 | Branch managers must only access allowed branches.
1494 | ?? | done | prompt-pack/02-security-auth-companion.md:99 | Order viewers must not see orders outside authorized scope.
1495 | ?? | done | prompt-pack/02-security-auth-companion.md:100 | Product editors may be scoped by branch or by general catalog permission.
1496 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:101 | Delivery assignment should require explicit operational permissions.
1497 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:102 | Review moderation should require moderation-specific permissions.
1498 | ?? | planned | prompt-pack/02-security-auth-companion.md:104 | Object Access Rules
1499 | ?? | done | prompt-pack/02-security-auth-companion.md:105 | Users can only access their own tokens.
1500 | ?? | done | prompt-pack/02-security-auth-companion.md:106 | Users can only access their own addresses unless privileged.
1501 | ?? | done | prompt-pack/02-security-auth-companion.md:107 | Users can only access their own wallet history unless privileged.
1502 | ?? | done | prompt-pack/02-security-auth-companion.md:108 | Users can only access their own orders unless privileged.
1503 | ?? | done | prompt-pack/02-security-auth-companion.md:109 | Users can only review eligible purchased items.
1504 | ?? | done | prompt-pack/02-security-auth-companion.md:110 | Public profiles expose only public fields.
1505 | ?? | done | prompt-pack/02-security-auth-companion.md:112 | API Transport Rules
1506 | ?? | planned | prompt-pack/02-security-auth-companion.md:113 | JSON only.
1507 | ?? | planned | prompt-pack/02-security-auth-companion.md:114 | Reject unsupported content types where appropriate.
1508 | ?? | planned | prompt-pack/02-security-auth-companion.md:115 | Use `application/json`.
1509 | ?? | planned | prompt-pack/02-security-auth-companion.md:116 | Keep exception rendering JSON-safe.
1510 | ?? | done | prompt-pack/02-security-auth-companion.md:117 | Never return HTML error pages in the API context.
1511 | ?? | partial | prompt-pack/02-security-auth-companion.md:119 | Rate Limiting
1512 | ?? | done | prompt-pack/02-security-auth-companion.md:120 | Rate-limit login.
1513 | ?? | planned | prompt-pack/02-security-auth-companion.md:121 | Rate-limit registration if exposed publicly.
1514 | ?? | planned | prompt-pack/02-security-auth-companion.md:122 | Rate-limit password reset endpoints.
1515 | ?? | planned | prompt-pack/02-security-auth-companion.md:123 | Rate-limit gift-card redeem endpoint.
1516 | ?? | done | prompt-pack/02-security-auth-companion.md:124 | Rate-limit coupon apply endpoint if abuse risk is high.
1517 | ?? | done | prompt-pack/02-security-auth-companion.md:125 | Rate-limit review creation.
1518 | ?? | done | prompt-pack/02-security-auth-companion.md:126 | Rate-limit admin login separately if needed.
1519 | ?? | planned | prompt-pack/02-security-auth-companion.md:128 | Brute Force Protection
1520 | ?? | done | prompt-pack/02-security-auth-companion.md:129 | Combine rate limits with audit logging.
1521 | ?? | planned | prompt-pack/02-security-auth-companion.md:130 | Consider lockout windows for repeated failures.
1522 | ?? | planned | prompt-pack/02-security-auth-companion.md:131 | Keep user-facing error generic.
1523 | ?? | planned | prompt-pack/02-security-auth-companion.md:132 | Monitor suspicious patterns.
1524 | ?? | done | prompt-pack/02-security-auth-companion.md:134 | Token Handling
1525 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:135 | Do not expose plaintext tokens after initial issuance except where the auth flow requires the first reveal.
1526 | ?? | done | prompt-pack/02-security-auth-companion.md:136 | Never log plaintext access tokens.
1527 | ?? | done | prompt-pack/02-security-auth-companion.md:137 | Never store tokens in custom plain DB tables when Sanctum handles them.
1528 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:138 | Design APIs so mobile and web consumers can manage token revocation clearly.
1529 | ?? | done | prompt-pack/02-security-auth-companion.md:140 | Cookies Versus Tokens
1530 | ?? | done | prompt-pack/02-security-auth-companion.md:141 | Primary backend brief prefers access tokens for cross-platform readiness.
1531 | ?? | planned | prompt-pack/02-security-auth-companion.md:142 | If cookies are ever used for some web context, keep them secure:
1532 | ?? | planned | prompt-pack/02-security-auth-companion.md:143 | `HttpOnly`
1533 | ?? | planned | prompt-pack/02-security-auth-companion.md:144 | `Secure`
1534 | ?? | planned | prompt-pack/02-security-auth-companion.md:145 | `SameSite` configured intentionally
1535 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:146 | Do not make cookies the main mobile-ready contract.
1536 | ?? | planned | prompt-pack/02-security-auth-companion.md:148 | CORS Strategy
1537 | ?? | planned | prompt-pack/02-security-auth-companion.md:149 | Explicitly configure allowed origins.
1538 | ?? | planned | prompt-pack/02-security-auth-companion.md:150 | Avoid wildcard origins with credentials.
1539 | ?? | done | prompt-pack/02-security-auth-companion.md:151 | Document dev and production origin behavior.
1540 | ?? | planned | prompt-pack/02-security-auth-companion.md:152 | Keep preflight behavior predictable.
1541 | ?? | tested | prompt-pack/02-security-auth-companion.md:153 | Test protected endpoints from allowed consumers.
1542 | ?? | planned | prompt-pack/02-security-auth-companion.md:155 | CSRF Notes
1543 | ?? | tested | prompt-pack/02-security-auth-companion.md:156 | For pure token APIs, CSRF concerns differ from stateful cookie flows.
1544 | ?? | planned | prompt-pack/02-security-auth-companion.md:157 | Do not claim CSRF is solved magically.
1545 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:158 | If any stateful cookie endpoints are introduced later, document and protect them separately.
1546 | ?? | done | prompt-pack/02-security-auth-companion.md:159 | Keep current scope centered on token-authenticated APIs.
1547 | ?? | partial | prompt-pack/02-security-auth-companion.md:161 | XSS Defense
1548 | ?? | planned | prompt-pack/02-security-auth-companion.md:162 | Free-text fields are dangerous.
1549 | ?? | planned | prompt-pack/02-security-auth-companion.md:163 | Notes are dangerous.
1550 | ?? | done | prompt-pack/02-security-auth-companion.md:164 | Reviews are dangerous.
1551 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:165 | Profile bios are dangerous.
1552 | ?? | done | prompt-pack/02-security-auth-companion.md:166 | Dynamic page content can be dangerous.
1553 | ?? | planned | prompt-pack/02-security-auth-companion.md:167 | Sanitize or strictly validate according to field intent.
1554 | ?? | planned | prompt-pack/02-security-auth-companion.md:168 | Prefer plain-text storage for fields that do not need rich HTML.
1555 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:169 | If rich text is ever allowed later, use a real allowlist sanitizer.
1556 | ?? | partial | prompt-pack/02-security-auth-companion.md:171 | SQL Injection Defense
1557 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:172 | Use Eloquent or parameterized query builder usage.
1558 | ?? | planned | prompt-pack/02-security-auth-companion.md:173 | Never concatenate raw unsafe SQL from request parameters.
1559 | ?? | planned | prompt-pack/02-security-auth-companion.md:174 | Whitelist sortable fields.
1560 | ?? | planned | prompt-pack/02-security-auth-companion.md:175 | Whitelist filterable fields.
1561 | ?? | planned | prompt-pack/02-security-auth-companion.md:176 | Whitelist searchable relations where dynamic behavior exists.
1562 | ?? | planned | prompt-pack/02-security-auth-companion.md:178 | Mass Assignment Defense
1563 | ?? | planned | prompt-pack/02-security-auth-companion.md:179 | Guard models carefully.
1564 | ?? | planned | prompt-pack/02-security-auth-companion.md:180 | Prefer DTO/action/service boundaries for sensitive writes.
1565 | ?? | planned | prompt-pack/02-security-auth-companion.md:181 | Never trust raw `$request->all()` for privileged updates.
1566 | ?? | planned | prompt-pack/02-security-auth-companion.md:182 | Restrict fillable attributes or use explicit assignment patterns.
1567 | ?? | partial | prompt-pack/02-security-auth-companion.md:184 | Input Validation Strategy
1568 | ?? | partial | prompt-pack/02-security-auth-companion.md:185 | Use `FormRequest` objects for endpoint validation.
1569 | ?? | done | prompt-pack/02-security-auth-companion.md:186 | Use nested rules for complex cart/configuration payloads.
1570 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:187 | Use domain services for cross-entity validation.
1571 | ?? | partial | prompt-pack/02-security-auth-companion.md:188 | Return structured validation errors.
1572 | ?? | partial | prompt-pack/02-security-auth-companion.md:189 | Keep business-rule validation separate from primitive type validation when possible.
1573 | ?? | partial | prompt-pack/02-security-auth-companion.md:191 | Free-Text Sanitization Rules
1574 | ?? | done | prompt-pack/02-security-auth-companion.md:192 | Order notes must be sanitized.
1575 | ?? | done | prompt-pack/02-security-auth-companion.md:193 | Review comments must be sanitized.
1576 | ?? | done | prompt-pack/02-security-auth-companion.md:194 | Profile text fields must be sanitized.
1577 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:195 | Dynamic page content requires special care.
1578 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:196 | Audit any field that may later be displayed in admin or client apps.
1579 | ?? | tested | prompt-pack/02-security-auth-companion.md:198 | File Upload Security
1580 | ?? | planned | prompt-pack/02-security-auth-companion.md:199 | Validate mime type.
1581 | ?? | planned | prompt-pack/02-security-auth-companion.md:200 | Validate extension.
1582 | ?? | planned | prompt-pack/02-security-auth-companion.md:201 | Validate max file size.
1583 | ?? | planned | prompt-pack/02-security-auth-companion.md:202 | Restrict accepted types tightly.
1584 | ?? | planned | prompt-pack/02-security-auth-companion.md:203 | Reject executable or suspicious content.
1585 | ?? | planned | prompt-pack/02-security-auth-companion.md:204 | Store outside dangerous public execution paths where applicable.
1586 | ?? | planned | prompt-pack/02-security-auth-companion.md:205 | Generate safe filenames.
1587 | ?? | planned | prompt-pack/02-security-auth-companion.md:206 | Record original filename separately only if needed.
1588 | ?? | planned | prompt-pack/02-security-auth-companion.md:207 | Consider image dimension checks if relevant.
1589 | ?? | partial | prompt-pack/02-security-auth-companion.md:209 | Media Type Policy
1590 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:215 | Videos only if required and storage policy is clear.
1591 | ?? | planned | prompt-pack/02-security-auth-companion.md:216 | External video URLs must be validated against allowed providers if such restriction is needed.
1592 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:218 | Virus Scan Simulation Requirement
1593 | ?? | planned | prompt-pack/02-security-auth-companion.md:219 | If real malware scanning is unavailable, include a clear integration point or simulation abstraction.
1594 | ?? | planned | prompt-pack/02-security-auth-companion.md:220 | Do not pretend a fake scanner is real protection.
1595 | ?? | planned | prompt-pack/02-security-auth-companion.md:221 | Document it as a placeholder hook.
1596 | ?? | planned | prompt-pack/02-security-auth-companion.md:223 | Notes Safety Example
1597 | ?? | done | prompt-pack/02-security-auth-companion.md:224 | A customer may submit `<script>` in order notes.
1598 | ?? | planned | prompt-pack/02-security-auth-companion.md:225 | The backend must not trust or preserve executable behavior blindly for display contexts.
1599 | ?? | partial | prompt-pack/02-security-auth-companion.md:226 | Store safe text or sanitize before persistence/display based on field policy.
1600 | ?? | tested | prompt-pack/02-security-auth-companion.md:227 | Cover this with automated tests.
1601 | ?? | done | prompt-pack/02-security-auth-companion.md:229 | Coupon Abuse Risks
1602 | ?? | planned | prompt-pack/02-security-auth-companion.md:230 | Reuse beyond per-user limits.
1603 | ?? | planned | prompt-pack/02-security-auth-companion.md:231 | Reuse after expiry.
1604 | ?? | done | prompt-pack/02-security-auth-companion.md:232 | Circumventing minimum cart totals.
1605 | ?? | done | prompt-pack/02-security-auth-companion.md:233 | Applying coupons to ineligible items.
1606 | ?? | done | prompt-pack/02-security-auth-companion.md:234 | Using delivery-only coupons on product totals.
1607 | ?? | planned | prompt-pack/02-security-auth-companion.md:235 | Repeated retry attacks on redeem/apply endpoints.
1608 | ?? | tested | prompt-pack/02-security-auth-companion.md:237 | Coupon Security Controls
1609 | ?? | planned | prompt-pack/02-security-auth-companion.md:238 | Validate eligibility server-side at every apply and checkout step.
1610 | ?? | done | prompt-pack/02-security-auth-companion.md:239 | Snapshot applied coupon result into the order.
1611 | ?? | planned | prompt-pack/02-security-auth-companion.md:240 | Recheck validity in checkout finalization.
1612 | ?? | done | prompt-pack/02-security-auth-companion.md:241 | Use transactions around final coupon usage increments.
1613 | ?? | tested | prompt-pack/02-security-auth-companion.md:243 | Wallet Security Risks
1614 | ?? | planned | prompt-pack/02-security-auth-companion.md:244 | Double-spend attempts.
1615 | ?? | planned | prompt-pack/02-security-auth-companion.md:245 | Race conditions during concurrent checkout.
1616 | ?? | planned | prompt-pack/02-security-auth-companion.md:246 | Replay on redeem endpoints.
1617 | ?? | planned | prompt-pack/02-security-auth-companion.md:247 | Manual admin balance abuse.
1618 | ?? | tested | prompt-pack/02-security-auth-companion.md:249 | Wallet Security Controls
1619 | ?? | planned | prompt-pack/02-security-auth-companion.md:250 | Use DB transactions.
1620 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:251 | Use row-level locking or equivalent consistency control when needed.
1621 | ?? | planned | prompt-pack/02-security-auth-companion.md:252 | Keep append-only transaction history.
1622 | ?? | done | prompt-pack/02-security-auth-companion.md:253 | Audit admin adjustments.
1623 | ?? | planned | prompt-pack/02-security-auth-companion.md:254 | Validate non-negative balance outcomes.
1624 | ?? | tested | prompt-pack/02-security-auth-companion.md:256 | Gift Card Security Risks
1625 | ?? | planned | prompt-pack/02-security-auth-companion.md:257 | Code guessing.
1626 | ?? | planned | prompt-pack/02-security-auth-companion.md:258 | Replay redemption.
1627 | ?? | planned | prompt-pack/02-security-auth-companion.md:259 | Predictable code generation.
1628 | ?? | tested | prompt-pack/02-security-auth-companion.md:260 | Unauthorized admin generation.
1629 | ?? | tested | prompt-pack/02-security-auth-companion.md:262 | Gift Card Security Controls
1630 | ?? | planned | prompt-pack/02-security-auth-companion.md:263 | Use high-entropy codes.
1631 | ?? | partial | prompt-pack/02-security-auth-companion.md:264 | Enforce single-use or explicit usage policy.
1632 | ?? | planned | prompt-pack/02-security-auth-companion.md:265 | Store redemption metadata.
1633 | ?? | tested | prompt-pack/02-security-auth-companion.md:266 | Protect generation endpoints with strong permissions.
1634 | ?? | partial | prompt-pack/02-security-auth-companion.md:267 | Protect redemption endpoints with rate limiting.
1635 | ?? | done | prompt-pack/02-security-auth-companion.md:269 | Order Integrity Controls
1636 | ?? | done | prompt-pack/02-security-auth-companion.md:270 | Snapshot prices at order creation.
1637 | ?? | planned | prompt-pack/02-security-auth-companion.md:271 | Snapshot selected size and add-ons.
1638 | ?? | planned | prompt-pack/02-security-auth-companion.md:272 | Snapshot delivery fee.
1639 | ?? | done | prompt-pack/02-security-auth-companion.md:273 | Snapshot coupon result.
1640 | ?? | done | prompt-pack/02-security-auth-companion.md:274 | Snapshot wallet deduction.
1641 | ? | backlog_future | prompt-pack/02-security-auth-companion.md:275 | Prevent later product edits from mutating historical orders.
1642 | ?? | partial | prompt-pack/02-security-auth-companion.md:277 | Status Transition Security
1643 | ?? | planned | prompt-pack/02-security-auth-companion.md:278 | Do not let arbitrary clients set any status.
1644 | ?? | planned | prompt-pack/02-security-auth-companion.md:279 | Define allowed transitions.
1645 | ?? | planned | prompt-pack/02-security-auth-companion.md:280 | Different actors can trigger different transitions.
1646 | ?? | planned | prompt-pack/02-security-auth-companion.md:281 | Customers may cancel only within grace period and only under allowed status.
1647 | ?? | done | prompt-pack/02-security-auth-companion.md:282 | Admin/staff transitions must be authorized and logged.
1648 | ?? | done | prompt-pack/02-security-auth-companion.md:284 | Sensitive Settings Controls
1649 | ?? | done | prompt-pack/02-security-auth-companion.md:285 | Mail settings are sensitive.
1650 | ?? | partial | prompt-pack/02-security-auth-companion.md:286 | OAuth provider settings are sensitive.
1651 | ?? | done | prompt-pack/02-security-auth-companion.md:287 | Token-related settings are sensitive.
1652 | ?? | planned | prompt-pack/02-security-auth-companion.md:288 | Currency and feature toggles affect business behavior.
1653 | ?? | tested | prompt-pack/02-security-auth-companion.md:289 | Restrict update permissions tightly.
1654 | ?? | done | prompt-pack/02-security-auth-companion.md:290 | Audit changes.
1655 | ?? | planned | prompt-pack/02-security-auth-companion.md:292 | Logging Rules
1656 | ?? | partial | prompt-pack/02-security-auth-companion.md:293 | Log security-relevant events.
1657 | ?? | planned | prompt-pack/02-security-auth-companion.md:294 | Do not log secrets.
1658 | ?? | planned | prompt-pack/02-security-auth-companion.md:295 | Do not log plaintext passwords.
1659 | ?? | done | prompt-pack/02-security-auth-companion.md:296 | Do not log plaintext tokens.
1660 | ?? | planned | prompt-pack/02-security-auth-companion.md:297 | Mask sensitive headers if request logging exists.
1661 | ?? | done | prompt-pack/02-security-auth-companion.md:299 | Production Error Handling
1662 | ?? | done | prompt-pack/02-security-auth-companion.md:300 | Never expose stack traces in production JSON.
1663 | ?? | planned | prompt-pack/02-security-auth-companion.md:301 | Use safe generic messages for unknown exceptions.
1664 | ?? | planned | prompt-pack/02-security-auth-companion.md:302 | Log detailed context server-side.
1665 | ?? | planned | prompt-pack/02-security-auth-companion.md:303 | Separate user-safe message from internal diagnostics.
1666 | ?? | tested | prompt-pack/02-security-auth-companion.md:305 | Testing Matrix
1667 | ?? | tested | prompt-pack/02-security-auth-companion.md:306 | Test login throttling.
1668 | ?? | tested | prompt-pack/02-security-auth-companion.md:307 | Test lowercase normalization.
1669 | ?? | tested | prompt-pack/02-security-auth-companion.md:308 | Test password validation.
1670 | ?? | tested | prompt-pack/02-security-auth-companion.md:309 | Test unauthorized access across user boundaries.
1671 | ?? | tested | prompt-pack/02-security-auth-companion.md:310 | Test branch-scope authorization.
1672 | ?? | tested | prompt-pack/02-security-auth-companion.md:311 | Test order note sanitization.
1673 | ?? | tested | prompt-pack/02-security-auth-companion.md:312 | Test coupon over-discount rules.
1674 | ?? | tested | prompt-pack/02-security-auth-companion.md:313 | Test wallet concurrency-sensitive operations where feasible.
1675 | ?? | tested | prompt-pack/02-security-auth-companion.md:314 | Test gift-card single-use behavior.
1676 | ?? | tested | prompt-pack/02-security-auth-companion.md:315 | Test invalid status transition rejection.
1677 | ?? | tested | prompt-pack/02-security-auth-companion.md:317 | Security Review Checklist For The Downstream Agent
1678 | ?? | done | prompt-pack/02-security-auth-companion.md:318 | Are all auth endpoints rate-limited.
1679 | ?? | done | prompt-pack/02-security-auth-companion.md:319 | Are tokens created and revoked safely.
1680 | ?? | planned | prompt-pack/02-security-auth-companion.md:320 | Are emails and usernames normalized.
1681 | ?? | planned | prompt-pack/02-security-auth-companion.md:321 | Are free-text fields sanitized or constrained.
1682 | ?? | tested | prompt-pack/02-security-auth-companion.md:322 | Are uploads strictly validated.
1683 | ?? | partial | prompt-pack/02-security-auth-companion.md:323 | Are policy checks enforced on every protected resource.
1684 | ?? | done | prompt-pack/02-security-auth-companion.md:324 | Are coupon and wallet writes transactional.
1685 | ?? | done | prompt-pack/02-security-auth-companion.md:325 | Are order status transitions restricted.
1686 | ?? | done | prompt-pack/02-security-auth-companion.md:326 | Are sensitive settings protected and audited.
1687 | ?? | planned | prompt-pack/02-security-auth-companion.md:328 | Final Guardrail
1688 | ? | out_of_scope_backend_only | prompt-pack/02-security-auth-companion.md:329 | If a requirement is ambiguous, choose the more secure backend behavior.
1689 | ?? | planned | prompt-pack/02-security-auth-companion.md:330 | Document the assumption.
1690 | ?? | tested | prompt-pack/02-security-auth-companion.md:331 | Do not leave silent auth or security gaps.
1691 | ?? | planned | prompt-pack/03-execution-checklist.md:1 | Execution Checklist
1692 | ?? | planned | prompt-pack/03-execution-checklist.md:4 | This file is an execution control layer.
1693 | ?? | planned | prompt-pack/03-execution-checklist.md:5 | It tells the downstream coding agent what to do first.
1694 | ?? | planned | prompt-pack/03-execution-checklist.md:6 | It minimizes skipped steps.
1695 | ?? | planned | prompt-pack/03-execution-checklist.md:7 | It keeps the run backend-only.
1696 | ?? | planned | prompt-pack/03-execution-checklist.md:9 | Global Execution Rules
1697 | ?? | planned | prompt-pack/03-execution-checklist.md:10 | Stay strictly inside backend scope.
1698 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:11 | Do not create frontend artifacts.
1699 | ? | backlog_future | prompt-pack/03-execution-checklist.md:12 | Do not create mobile app artifacts.
1700 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:13 | Do not switch to UI work.
1701 | ?? | planned | prompt-pack/03-execution-checklist.md:14 | Do not skip planning documents.
1702 | ?? | tested | prompt-pack/03-execution-checklist.md:15 | Do not skip tests.
1703 | ?? | planned | prompt-pack/03-execution-checklist.md:16 | Do not skip documentation.
1704 | ?? | planned | prompt-pack/03-execution-checklist.md:17 | Do not hide assumptions.
1705 | ?? | planned | prompt-pack/03-execution-checklist.md:19 | Phase 1: Repository Grounding
1706 | ?? | planned | prompt-pack/03-execution-checklist.md:20 | Inspect the workspace.
1707 | ?? | planned | prompt-pack/03-execution-checklist.md:21 | Confirm whether the root is empty or already contains files.
1708 | ?? | planned | prompt-pack/03-execution-checklist.md:22 | Confirm whether Git is initialized.
1709 | ?? | planned | prompt-pack/03-execution-checklist.md:23 | Confirm PHP availability if command execution is allowed.
1710 | ?? | planned | prompt-pack/03-execution-checklist.md:24 | Confirm Composer availability if command execution is allowed.
1711 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:25 | Confirm there is no conflicting frontend scaffold.
1712 | ?? | planned | prompt-pack/03-execution-checklist.md:26 | Keep notes of any unexpected files.
1713 | ?? | planned | prompt-pack/03-execution-checklist.md:28 | Phase 2: Internal Planning Docs First
1714 | ?? | planned | prompt-pack/03-execution-checklist.md:29 | Create `plans/`.
1715 | ?? | planned | prompt-pack/03-execution-checklist.md:30 | Create `plans/00-full-project-overview.md`.
1716 | ?? | planned | prompt-pack/03-execution-checklist.md:31 | Create `plans/01-database-schema-and-models.md`.
1717 | ?? | done | prompt-pack/03-execution-checklist.md:32 | Create `plans/02-api-endpoints-and-versioning.md`.
1718 | ?? | tested | prompt-pack/03-execution-checklist.md:33 | Create `plans/03-authentication-and-authorization.md`.
1719 | ?? | done | prompt-pack/03-execution-checklist.md:34 | Create `plans/04-branches-and-menus-system.md`.
1720 | ?? | done | prompt-pack/03-execution-checklist.md:35 | Create `plans/05-products-categories-sizes-addons.md`.
1721 | ?? | done | prompt-pack/03-execution-checklist.md:36 | Create `plans/06-reviews-ratings-tags-best-sellers.md`.
1722 | ?? | done | prompt-pack/03-execution-checklist.md:37 | Create `plans/07-users-profiles-addresses-wallet-giftcards.md`.
1723 | ?? | done | prompt-pack/03-execution-checklist.md:38 | Create `plans/08-cart-orders-checkout-shipping-coupons.md`.
1724 | ?? | tested | prompt-pack/03-execution-checklist.md:39 | Create `plans/09-admin-roles-permissions-notifications.md`.
1725 | ?? | tested | prompt-pack/03-execution-checklist.md:40 | Create `plans/10-security-best-practices-and-testing.md`.
1726 | ?? | done | prompt-pack/03-execution-checklist.md:41 | Create `plans/11-localization-arabic-english.md`.
1727 | ? | backlog_future | prompt-pack/03-execution-checklist.md:42 | Create `plans/12-scalability-and-future-mobile.md`.
1728 | ?? | planned | prompt-pack/03-execution-checklist.md:43 | Ensure total planning documentation exceeds 1000 useful lines.
1729 | ?? | planned | prompt-pack/03-execution-checklist.md:44 | Keep every planning file backend-only.
1730 | ?? | planned | prompt-pack/03-execution-checklist.md:46 | Phase 3: Scaffold Laravel Backend
1731 | ?? | planned | prompt-pack/03-execution-checklist.md:47 | Create `backend/` Laravel project using Laravel 13.
1732 | ?? | planned | prompt-pack/03-execution-checklist.md:48 | Confirm generated clean Laravel structure.
1733 | ?? | planned | prompt-pack/03-execution-checklist.md:49 | Initialize Git if needed.
1734 | ?? | planned | prompt-pack/03-execution-checklist.md:50 | Verify `.gitignore`.
1735 | ?? | planned | prompt-pack/03-execution-checklist.md:51 | Keep project portable.
1736 | ?? | planned | prompt-pack/03-execution-checklist.md:52 | Do not add machine-specific path assumptions.
1737 | ?? | planned | prompt-pack/03-execution-checklist.md:54 | Phase 4: Install Core Packages
1738 | ?? | done | prompt-pack/03-execution-checklist.md:55 | Install `laravel/sanctum`.
1739 | ?? | done | prompt-pack/03-execution-checklist.md:56 | Install `spatie/laravel-permission`.
1740 | ?? | partial | prompt-pack/03-execution-checklist.md:57 | Install `laravel/horizon`.
1741 | ?? | partial | prompt-pack/03-execution-checklist.md:58 | Install `laravel/telescope` for development.
1742 | ?? | done | prompt-pack/03-execution-checklist.md:59 | Install debug tooling only for non-production if compatible.
1743 | ?? | partial | prompt-pack/03-execution-checklist.md:60 | Install `laravel/octane` only if aligned with runtime strategy.
1744 | ?? | planned | prompt-pack/03-execution-checklist.md:61 | Add static analysis tooling.
1745 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:62 | Add formatter/lint tooling if required by the project standard.
1746 | ?? | planned | prompt-pack/03-execution-checklist.md:64 | Phase 5: Configure Environment Example
1747 | ?? | planned | prompt-pack/03-execution-checklist.md:65 | Prepare `.env.example`.
1748 | ?? | done | prompt-pack/03-execution-checklist.md:66 | Add app settings.
1749 | ?? | done | prompt-pack/03-execution-checklist.md:67 | Add database settings.
1750 | ?? | partial | prompt-pack/03-execution-checklist.md:68 | Add Redis settings.
1751 | ?? | done | prompt-pack/03-execution-checklist.md:69 | Add queue settings.
1752 | ?? | done | prompt-pack/03-execution-checklist.md:70 | Add Sanctum-related settings if needed.
1753 | ?? | done | prompt-pack/03-execution-checklist.md:71 | Add mail settings.
1754 | ?? | partial | prompt-pack/03-execution-checklist.md:72 | Add broadcasting settings.
1755 | ?? | done | prompt-pack/03-execution-checklist.md:73 | Add feature-toggle settings.
1756 | ?? | planned | prompt-pack/03-execution-checklist.md:74 | Add any operational defaults.
1757 | ?? | done | prompt-pack/03-execution-checklist.md:76 | Phase 6: Establish API Foundations
1758 | ?? | done | prompt-pack/03-execution-checklist.md:77 | Create API version namespace strategy.
1759 | ?? | done | prompt-pack/03-execution-checklist.md:78 | Group routes under `/api/v1`.
1760 | ?? | done | prompt-pack/03-execution-checklist.md:79 | Create common API response helpers or patterns.
1761 | ?? | planned | prompt-pack/03-execution-checklist.md:80 | Ensure exception rendering is JSON-friendly.
1762 | ?? | done | prompt-pack/03-execution-checklist.md:81 | Add localization middleware or request-resolution strategy.
1763 | ?? | done | prompt-pack/03-execution-checklist.md:82 | Add auth middleware strategy for protected endpoints.
1764 | ?? | planned | prompt-pack/03-execution-checklist.md:84 | Phase 7: Database Foundation
1765 | ?? | planned | prompt-pack/03-execution-checklist.md:85 | Design migrations before coding models.
1766 | ?? | planned | prompt-pack/03-execution-checklist.md:86 | Create base user-related migrations.
1767 | ?? | done | prompt-pack/03-execution-checklist.md:87 | Create branches and delivery zones migrations.
1768 | ?? | planned | prompt-pack/03-execution-checklist.md:88 | Create categories and tags migrations.
1769 | ?? | done | prompt-pack/03-execution-checklist.md:89 | Create products and media migrations.
1770 | ?? | planned | prompt-pack/03-execution-checklist.md:90 | Create sizes and add-on migrations.
1771 | ?? | done | prompt-pack/03-execution-checklist.md:91 | Create carts and cart items migrations if persistent cart storage is used.
1772 | ?? | done | prompt-pack/03-execution-checklist.md:92 | Create orders and order items migrations.
1773 | ?? | done | prompt-pack/03-execution-checklist.md:93 | Create order status history migrations.
1774 | ?? | done | prompt-pack/03-execution-checklist.md:94 | Create coupon and usage tracking migrations.
1775 | ?? | done | prompt-pack/03-execution-checklist.md:95 | Create wallet and wallet transaction migrations.
1776 | ?? | done | prompt-pack/03-execution-checklist.md:96 | Create gift card and redemption migrations.
1777 | ?? | done | prompt-pack/03-execution-checklist.md:97 | Create settings migrations.
1778 | ?? | done | prompt-pack/03-execution-checklist.md:98 | Create dynamic pages migrations.
1779 | ?? | done | prompt-pack/03-execution-checklist.md:99 | Create review migrations.
1780 | ?? | done | prompt-pack/03-execution-checklist.md:100 | Create audit log migrations if included.
1781 | ?? | planned | prompt-pack/03-execution-checklist.md:102 | Phase 8: Eloquent Model Layer
1782 | ? | backlog_future | prompt-pack/03-execution-checklist.md:103 | Create models per domain.
1783 | ?? | planned | prompt-pack/03-execution-checklist.md:104 | Define relationships explicitly.
1784 | ?? | planned | prompt-pack/03-execution-checklist.md:105 | Define casts explicitly.
1785 | ?? | planned | prompt-pack/03-execution-checklist.md:106 | Add accessors/mutators only where justified.
1786 | ?? | planned | prompt-pack/03-execution-checklist.md:107 | Normalize lowercase fields safely.
1787 | ?? | planned | prompt-pack/03-execution-checklist.md:108 | Keep models concise.
1788 | ?? | planned | prompt-pack/03-execution-checklist.md:109 | Avoid large business methods inside models.
1789 | ?? | tested | prompt-pack/03-execution-checklist.md:111 | Phase 9: Authorization Layer
1790 | ?? | tested | prompt-pack/03-execution-checklist.md:112 | Configure Spatie roles and permissions.
1791 | ?? | done | prompt-pack/03-execution-checklist.md:113 | Create seed strategy for super admin and baseline roles.
1792 | ?? | planned | prompt-pack/03-execution-checklist.md:114 | Add policies for protected resources.
1793 | ?? | planned | prompt-pack/03-execution-checklist.md:115 | Add gates for broader abilities.
1794 | ?? | tested | prompt-pack/03-execution-checklist.md:116 | Implement branch-aware authorization checks.
1795 | ?? | tested | prompt-pack/03-execution-checklist.md:117 | Add tests for authorization boundaries.
1796 | ?? | done | prompt-pack/03-execution-checklist.md:119 | Phase 10: Auth Module
1797 | ?? | planned | prompt-pack/03-execution-checklist.md:120 | Create registration endpoint.
1798 | ?? | done | prompt-pack/03-execution-checklist.md:121 | Create login endpoint.
1799 | ?? | done | prompt-pack/03-execution-checklist.md:122 | Create logout endpoint.
1800 | ?? | tested | prompt-pack/03-execution-checklist.md:123 | Create token revocation flows.
1801 | ?? | planned | prompt-pack/03-execution-checklist.md:124 | Implement lowercase normalization.
1802 | ?? | planned | prompt-pack/03-execution-checklist.md:125 | Implement password rules.
1803 | ?? | tested | prompt-pack/03-execution-checklist.md:126 | Implement auth tests.
1804 | ?? | done | prompt-pack/03-execution-checklist.md:128 | Phase 11: Users, Profiles, And Addresses
1805 | ?? | done | prompt-pack/03-execution-checklist.md:129 | Create user profile endpoints.
1806 | ?? | done | prompt-pack/03-execution-checklist.md:130 | Create address CRUD endpoints.
1807 | ?? | done | prompt-pack/03-execution-checklist.md:131 | Create default address handling.
1808 | ?? | done | prompt-pack/03-execution-checklist.md:132 | Create public profile read endpoint.
1809 | ?? | planned | prompt-pack/03-execution-checklist.md:133 | Add privacy controls.
1810 | ?? | done | prompt-pack/03-execution-checklist.md:134 | Add profile statistics service.
1811 | ?? | done | prompt-pack/03-execution-checklist.md:136 | Phase 12: Branches And Delivery Zones
1812 | ?? | done | prompt-pack/03-execution-checklist.md:137 | Create branch CRUD endpoints.
1813 | ?? | planned | prompt-pack/03-execution-checklist.md:138 | Create delivery zone CRUD endpoints.
1814 | ?? | done | prompt-pack/03-execution-checklist.md:139 | Add branch availability rules.
1815 | ?? | planned | prompt-pack/03-execution-checklist.md:140 | Add shipping calculation strategy.
1816 | ?? | tested | prompt-pack/03-execution-checklist.md:141 | Add tests for branch-product compatibility.
1817 | ?? | planned | prompt-pack/03-execution-checklist.md:143 | Phase 13: Catalog Module
1818 | ?? | done | prompt-pack/03-execution-checklist.md:144 | Create category CRUD endpoints.
1819 | ?? | planned | prompt-pack/03-execution-checklist.md:145 | Create tag CRUD endpoints.
1820 | ?? | done | prompt-pack/03-execution-checklist.md:146 | Create product CRUD endpoints.
1821 | ?? | done | prompt-pack/03-execution-checklist.md:147 | Create product media handling endpoints.
1822 | ?? | planned | prompt-pack/03-execution-checklist.md:148 | Create size/variant endpoints.
1823 | ?? | planned | prompt-pack/03-execution-checklist.md:149 | Create add-on group and option endpoints.
1824 | ?? | done | prompt-pack/03-execution-checklist.md:150 | Add branch availability attachment logic.
1825 | ?? | planned | prompt-pack/03-execution-checklist.md:151 | Add search/filter/sort strategy.
1826 | ?? | done | prompt-pack/03-execution-checklist.md:153 | Phase 14: Cart Module
1827 | ?? | done | prompt-pack/03-execution-checklist.md:154 | Create cart fetch endpoint.
1828 | ?? | planned | prompt-pack/03-execution-checklist.md:155 | Create add item endpoint.
1829 | ?? | planned | prompt-pack/03-execution-checklist.md:156 | Create update item endpoint.
1830 | ?? | planned | prompt-pack/03-execution-checklist.md:157 | Create remove item endpoint.
1831 | ?? | done | prompt-pack/03-execution-checklist.md:158 | Create clear cart endpoint.
1832 | ?? | planned | prompt-pack/03-execution-checklist.md:159 | Compute line identity by configuration.
1833 | ?? | planned | prompt-pack/03-execution-checklist.md:160 | Validate size/add-on compatibility.
1834 | ?? | done | prompt-pack/03-execution-checklist.md:161 | Validate branch compatibility.
1835 | ?? | planned | prompt-pack/03-execution-checklist.md:162 | Validate stock if enabled.
1836 | ?? | done | prompt-pack/03-execution-checklist.md:164 | Phase 15: Coupon Module
1837 | ?? | done | prompt-pack/03-execution-checklist.md:165 | Create coupon CRUD endpoints for admin.
1838 | ?? | done | prompt-pack/03-execution-checklist.md:166 | Create coupon apply/preview logic.
1839 | ?? | planned | prompt-pack/03-execution-checklist.md:167 | Create eligibility evaluation service.
1840 | ?? | planned | prompt-pack/03-execution-checklist.md:168 | Enforce max discount caps.
1841 | ?? | planned | prompt-pack/03-execution-checklist.md:169 | Enforce per-user usage limits.
1842 | ?? | planned | prompt-pack/03-execution-checklist.md:170 | Enforce global usage limits.
1843 | ?? | done | prompt-pack/03-execution-checklist.md:171 | Enforce product/category scope logic.
1844 | ?? | planned | prompt-pack/03-execution-checklist.md:172 | Enforce delivery inclusion rules.
1845 | ?? | done | prompt-pack/03-execution-checklist.md:174 | Phase 16: Wallet And Gift Cards
1846 | ?? | done | prompt-pack/03-execution-checklist.md:175 | Create wallet balance endpoint.
1847 | ?? | done | prompt-pack/03-execution-checklist.md:176 | Create wallet history endpoint.
1848 | ?? | done | prompt-pack/03-execution-checklist.md:177 | Create gift card generation endpoints for admins.
1849 | ?? | done | prompt-pack/03-execution-checklist.md:178 | Create gift card redeem endpoint.
1850 | ?? | partial | prompt-pack/03-execution-checklist.md:179 | Add transactional credit/debit flows.
1851 | ?? | tested | prompt-pack/03-execution-checklist.md:180 | Add tests for single-use and balance updates.
1852 | ?? | done | prompt-pack/03-execution-checklist.md:182 | Phase 17: Orders And Checkout
1853 | ?? | planned | prompt-pack/03-execution-checklist.md:183 | Create checkout endpoint.
1854 | ?? | done | prompt-pack/03-execution-checklist.md:184 | Validate cart state at checkout.
1855 | ?? | planned | prompt-pack/03-execution-checklist.md:185 | Snapshot final pricing.
1856 | ?? | done | prompt-pack/03-execution-checklist.md:186 | Snapshot selected branch and zone.
1857 | ?? | done | prompt-pack/03-execution-checklist.md:187 | Snapshot coupon result.
1858 | ?? | done | prompt-pack/03-execution-checklist.md:188 | Snapshot wallet usage.
1859 | ?? | done | prompt-pack/03-execution-checklist.md:189 | Create order detail endpoint.
1860 | ?? | done | prompt-pack/03-execution-checklist.md:190 | Create order list endpoint.
1861 | ?? | partial | prompt-pack/03-execution-checklist.md:191 | Create cancel-within-grace-period flow.
1862 | ?? | partial | prompt-pack/03-execution-checklist.md:192 | Create note-update-within-grace-period flow if kept in scope.
1863 | ?? | done | prompt-pack/03-execution-checklist.md:194 | Phase 18: Order Operations
1864 | ?? | done | prompt-pack/03-execution-checklist.md:195 | Create staff/admin order review endpoints.
1865 | ?? | done | prompt-pack/03-execution-checklist.md:196 | Create order status transition actions.
1866 | ?? | planned | prompt-pack/03-execution-checklist.md:197 | Create delivery assignment action.
1867 | ?? | planned | prompt-pack/03-execution-checklist.md:198 | Create status history output.
1868 | ?? | partial | prompt-pack/03-execution-checklist.md:199 | Add transition policy checks.
1869 | ?? | tested | prompt-pack/03-execution-checklist.md:200 | Add transition tests.
1870 | ?? | done | prompt-pack/03-execution-checklist.md:202 | Phase 19: Reviews
1871 | ?? | done | prompt-pack/03-execution-checklist.md:203 | Create review creation endpoint.
1872 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:204 | Require verified purchase eligibility.
1873 | ?? | planned | prompt-pack/03-execution-checklist.md:205 | Allow anonymous flag.
1874 | ?? | planned | prompt-pack/03-execution-checklist.md:206 | Create moderation endpoints.
1875 | ?? | tested | prompt-pack/03-execution-checklist.md:207 | Add tests for eligibility and moderation.
1876 | ?? | done | prompt-pack/03-execution-checklist.md:209 | Phase 20: Settings And Dynamic Pages
1877 | ?? | done | prompt-pack/03-execution-checklist.md:210 | Create settings read/update endpoints.
1878 | ? | backlog_future | prompt-pack/03-execution-checklist.md:211 | Separate settings by group or domain.
1879 | ?? | done | prompt-pack/03-execution-checklist.md:212 | Create dynamic pages CRUD endpoints.
1880 | ?? | planned | prompt-pack/03-execution-checklist.md:213 | Create theme JSON import/export endpoints or service logic.
1881 | ?? | planned | prompt-pack/03-execution-checklist.md:214 | Validate payloads carefully.
1882 | ?? | done | prompt-pack/03-execution-checklist.md:216 | Phase 21: Notifications
1883 | ?? | done | prompt-pack/03-execution-checklist.md:217 | Configure database notifications.
1884 | ?? | done | prompt-pack/03-execution-checklist.md:218 | Configure mail notification channels.
1885 | ?? | done | prompt-pack/03-execution-checklist.md:219 | Add queued notifications where useful.
1886 | ?? | partial | prompt-pack/03-execution-checklist.md:220 | Add optional broadcasting hooks if kept in scope.
1887 | ?? | partial | prompt-pack/03-execution-checklist.md:222 | Phase 22: Security Hardening Pass
1888 | ?? | done | prompt-pack/03-execution-checklist.md:223 | Review rate limits.
1889 | ?? | tested | prompt-pack/03-execution-checklist.md:224 | Review policy coverage.
1890 | ?? | tested | prompt-pack/03-execution-checklist.md:225 | Review free-text sanitization.
1891 | ?? | tested | prompt-pack/03-execution-checklist.md:226 | Review upload validation.
1892 | ?? | tested | prompt-pack/03-execution-checklist.md:227 | Review token flows.
1893 | ?? | done | prompt-pack/03-execution-checklist.md:228 | Review exception JSON shape.
1894 | ?? | done | prompt-pack/03-execution-checklist.md:229 | Review sensitive settings protection.
1895 | ?? | done | prompt-pack/03-execution-checklist.md:230 | Review audit logging for privileged actions.
1896 | ?? | tested | prompt-pack/03-execution-checklist.md:232 | Phase 23: Testing Pass
1897 | ?? | tested | prompt-pack/03-execution-checklist.md:233 | Run unit tests.
1898 | ?? | tested | prompt-pack/03-execution-checklist.md:234 | Run feature tests.
1899 | ?? | tested | prompt-pack/03-execution-checklist.md:235 | Add missing regression tests.
1900 | ?? | tested | prompt-pack/03-execution-checklist.md:236 | Test auth normalization.
1901 | ?? | tested | prompt-pack/03-execution-checklist.md:237 | Test branch restrictions.
1902 | ?? | tested | prompt-pack/03-execution-checklist.md:238 | Test coupon edge cases.
1903 | ?? | tested | prompt-pack/03-execution-checklist.md:239 | Test wallet/gift-card flows.
1904 | ?? | tested | prompt-pack/03-execution-checklist.md:240 | Test order grace period.
1905 | ?? | tested | prompt-pack/03-execution-checklist.md:241 | Test review eligibility.
1906 | ?? | tested | prompt-pack/03-execution-checklist.md:242 | Test localization-sensitive responses if implemented.
1907 | ?? | planned | prompt-pack/03-execution-checklist.md:244 | Phase 24: Documentation Pass
1908 | ?? | planned | prompt-pack/03-execution-checklist.md:245 | Create project `README.md`.
1909 | ?? | planned | prompt-pack/03-execution-checklist.md:246 | Document setup steps.
1910 | ?? | planned | prompt-pack/03-execution-checklist.md:247 | Document env variables.
1911 | ?? | partial | prompt-pack/03-execution-checklist.md:248 | Document queue and Redis usage.
1912 | ?? | tested | prompt-pack/03-execution-checklist.md:249 | Document authentication flow.
1913 | ?? | done | prompt-pack/03-execution-checklist.md:250 | Document API versioning.
1914 | ?? | planned | prompt-pack/03-execution-checklist.md:251 | Document key endpoints.
1915 | ?? | tested | prompt-pack/03-execution-checklist.md:252 | Document testing commands.
1916 | ?? | planned | prompt-pack/03-execution-checklist.md:253 | Document assumptions.
1917 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:255 | Required Output Behavior
1918 | ?? | planned | prompt-pack/03-execution-checklist.md:256 | Show terminal commands when the user explicitly asks for them.
1919 | ?? | planned | prompt-pack/03-execution-checklist.md:257 | Keep file changes organized.
1920 | ?? | planned | prompt-pack/03-execution-checklist.md:258 | Avoid giant undifferentiated files.
1921 | ?? | planned | prompt-pack/03-execution-checklist.md:259 | Prefer reusable services.
1922 | ?? | planned | prompt-pack/03-execution-checklist.md:260 | Prefer explicit comments only where necessary.
1923 | ?? | planned | prompt-pack/03-execution-checklist.md:261 | Prefer backend-safe defaults over speculative convenience.
1924 | ?? | planned | prompt-pack/03-execution-checklist.md:263 | Things The Downstream Agent Must Not Do
1925 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:264 | Must not create frontend code.
1926 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:265 | Must not create Blade files.
1927 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:266 | Must not create Livewire files.
1928 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:267 | Must not create Filament resources.
1929 | ? | backlog_future | prompt-pack/03-execution-checklist.md:268 | Must not create `android/` now.
1930 | ? | backlog_future | prompt-pack/03-execution-checklist.md:269 | Must not create `ios/` now.
1931 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:270 | Must not discuss CSS/JS framework selection.
1932 | ? | out_of_scope_backend_only | prompt-pack/03-execution-checklist.md:271 | Must not rely on frontend validation as security.
1933 | ?? | planned | prompt-pack/03-execution-checklist.md:273 | Completion Gate
1934 | ?? | planned | prompt-pack/03-execution-checklist.md:274 | `plans/` exists with files `00` through `12`.
1935 | ?? | planned | prompt-pack/03-execution-checklist.md:275 | `backend/` exists.
1936 | ?? | planned | prompt-pack/03-execution-checklist.md:276 | Core packages are configured.
1937 | ? | backlog_future | prompt-pack/03-execution-checklist.md:277 | Main domains are implemented.
1938 | ?? | tested | prompt-pack/03-execution-checklist.md:278 | Tests exist.
1939 | ?? | planned | prompt-pack/03-execution-checklist.md:279 | Documentation exists.
1940 | ?? | planned | prompt-pack/03-execution-checklist.md:280 | Backend-only scope is preserved.
1941 | ?? | planned | prompt-pack/04-acceptance-checklist.md:1 | Acceptance Checklist
1942 | ?? | planned | prompt-pack/04-acceptance-checklist.md:4 | هذا الملف يعرّف النجاح والفشل بشكل موضوعي.
1943 | ?? | planned | prompt-pack/04-acceptance-checklist.md:5 | استخدمه لمراجعة prompt أو implementation ناتج من الـ prompt.
1944 | ?? | planned | prompt-pack/04-acceptance-checklist.md:6 | إذا فشل أي بند حرج، اعتبر النتيجة غير مكتملة.
1945 | ?? | planned | prompt-pack/04-acceptance-checklist.md:8 | A. Scope Integrity
1946 | ?? | planned | prompt-pack/04-acceptance-checklist.md:9 | Does the prompt state `backend only` clearly at the top.
1947 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:10 | Does it explicitly ban frontend implementation.
1948 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:11 | Does it explicitly ban Blade.
1949 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:12 | Does it explicitly ban Livewire.
1950 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:13 | Does it explicitly ban Filament.
1951 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:14 | Does it explicitly ban UI design discussion.
1952 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:15 | Does it explicitly ban CSS/JS framework selection.
1953 | ? | backlog_future | prompt-pack/04-acceptance-checklist.md:16 | Does it keep Android and iOS as future consumers only.
1954 | ?? | planned | prompt-pack/04-acceptance-checklist.md:17 | Does it keep `backend/` as the current active project folder.
1955 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:18 | Does it avoid creating `frontend/`, `android/`, or `ios/` now.
1956 | ?? | planned | prompt-pack/04-acceptance-checklist.md:20 | Fail Conditions For Scope
1957 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:21 | Any generated frontend code exists.
1958 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:22 | Any generated Blade template exists.
1959 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:23 | Any generated UI component exists.
1960 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:24 | Any section instructs selecting a frontend framework.
1961 | ?? | done | prompt-pack/04-acceptance-checklist.md:25 | Any section instructs designing pages visually.
1962 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:26 | Any section mixes backend tasks with frontend delivery.
1963 | ?? | planned | prompt-pack/04-acceptance-checklist.md:28 | B. Technical Baseline Integrity
1964 | ?? | planned | prompt-pack/04-acceptance-checklist.md:29 | Does the pack explicitly target `Laravel 13`.
1965 | ?? | planned | prompt-pack/04-acceptance-checklist.md:30 | Does the pack explicitly target `PHP 8.3+`.
1966 | ?? | tested | prompt-pack/04-acceptance-checklist.md:31 | Does it avoid vague wording like `latest maybe v12 or v13`.
1967 | ?? | planned | prompt-pack/04-acceptance-checklist.md:32 | Does it avoid hardcoded local Windows executable paths.
1968 | ?? | planned | prompt-pack/04-acceptance-checklist.md:33 | Does it stay portable across environments.
1969 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:35 | C. Planning Requirement Integrity
1970 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:36 | Does the prompt require `plans/` before implementation.
1971 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:37 | Does it list all required planning files.
1972 | ?? | planned | prompt-pack/04-acceptance-checklist.md:38 | Does it include files `00` through `12`.
1973 | ?? | planned | prompt-pack/04-acceptance-checklist.md:39 | Does it preserve exact planning file names.
1974 | ?? | planned | prompt-pack/04-acceptance-checklist.md:40 | Does it instruct the downstream agent to keep those files backend-only.
1975 | ?? | done | prompt-pack/04-acceptance-checklist.md:42 | D. API Contract Integrity
1976 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:43 | Are APIs required to be `RESTful` or REST-compatible.
1977 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:44 | Are responses required to be JSON only.
1978 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:45 | Is API versioning required from day one.
1979 | ?? | done | prompt-pack/04-acceptance-checklist.md:46 | Is `/api/v1` specified clearly.
1980 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:47 | Is a consistent response envelope suggested or required.
1981 | ?? | planned | prompt-pack/04-acceptance-checklist.md:48 | Are HTTP status codes mentioned.
1982 | ?? | partial | prompt-pack/04-acceptance-checklist.md:49 | Are validation errors expected in structured JSON.
1983 | ?? | tested | prompt-pack/04-acceptance-checklist.md:51 | E. Authentication Integrity
1984 | ?? | done | prompt-pack/04-acceptance-checklist.md:52 | Is `Laravel Sanctum` the default auth choice.
1985 | ?? | done | prompt-pack/04-acceptance-checklist.md:53 | Does the pack prefer access tokens for cross-platform consumers.
1986 | ? | backlog_future | prompt-pack/04-acceptance-checklist.md:54 | Does it avoid session-only architecture as the primary mobile-ready approach.
1987 | ?? | done | prompt-pack/04-acceptance-checklist.md:55 | Does it mention multi-device token support.
1988 | ?? | done | prompt-pack/04-acceptance-checklist.md:56 | Does it mention logout and revocation behavior.
1989 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:57 | Does it require lowercase normalization for username and email.
1990 | ?? | planned | prompt-pack/04-acceptance-checklist.md:58 | Does it define password rules clearly.
1991 | ?? | tested | prompt-pack/04-acceptance-checklist.md:60 | F. Authorization Integrity
1992 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:61 | Are `Policies` required.
1993 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:62 | Are `Gates` required where needed.
1994 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:63 | Is `spatie/laravel-permission` required.
1995 | ?? | tested | prompt-pack/04-acceptance-checklist.md:64 | Are granular roles and permissions described.
1996 | ?? | tested | prompt-pack/04-acceptance-checklist.md:65 | Is branch-scoped authorization described.
1997 | ?? | planned | prompt-pack/04-acceptance-checklist.md:66 | Is super-admin behavior documented.
1998 | ?? | done | prompt-pack/04-acceptance-checklist.md:68 | G. Branch And Catalog Integrity
1999 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:69 | Does the prompt require single-branch and multi-branch support.
2000 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:70 | Does it require delivery zones with fees.
2001 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:71 | Does it require per-branch product availability.
2002 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:72 | Does it require category nesting.
2003 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:73 | Does it require products in multiple categories.
2004 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:74 | Does it require tags.
2005 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:75 | Does it require sizes/variants.
2006 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:76 | Does it require add-on groups with single and multi select support.
2007 | ?? | done | prompt-pack/04-acceptance-checklist.md:78 | H. Order And Checkout Integrity
2008 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:79 | Does the prompt require cart support for same product with different configurations.
2009 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:80 | Does it require branch compatibility validation at checkout.
2010 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:81 | Does it require pricing validation.
2011 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:82 | Does it require shipping calculation.
2012 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:83 | Does it require snapshotting final pricing into the order.
2013 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:84 | Does it require order status workflow.
2014 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:85 | Does it require the 2-minute grace period.
2015 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:86 | Does it require customer cancellation/edit constraints.
2016 | ?? | done | prompt-pack/04-acceptance-checklist.md:88 | I. Coupon And Wallet Integrity
2017 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:89 | Does the prompt require fixed and percentage coupons.
2018 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:90 | Does it require max discount caps.
2019 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:91 | Does it require minimum cart conditions.
2020 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:92 | Does it require specific product/category targeting.
2021 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:93 | Does it require per-user and global usage limits.
2022 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:94 | Does it require delivery-only or delivery-inclusive logic.
2023 | ?? | done | prompt-pack/04-acceptance-checklist.md:95 | Does it forbid converting extra discount remainder into wallet money by default.
2024 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:96 | Does it require wallet support.
2025 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:97 | Does it require gift-card support.
2026 | ?? | done | prompt-pack/04-acceptance-checklist.md:99 | J. Profile And Review Integrity
2027 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:100 | Does it require public profile API support.
2028 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:101 | Does it require privacy settings.
2029 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:102 | Does it require profile statistics.
2030 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:103 | Does it require verified-purchase reviews.
2031 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:104 | Does it require anonymous review option.
2032 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:105 | Does it require moderation capability.
2033 | ?? | done | prompt-pack/04-acceptance-checklist.md:107 | K. Settings And Dynamic Content Integrity
2034 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:108 | Does it require global settings.
2035 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:109 | Does it require feature toggles.
2036 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:110 | Does it require currency configurability.
2037 | ?? | planned | prompt-pack/04-acceptance-checklist.md:111 | Does it treat theme JSON as backend-managed data.
2038 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:112 | Does it avoid turning theme JSON into frontend rendering work.
2039 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:113 | Does it require dynamic page entities via API.
2040 | ?? | partial | prompt-pack/04-acceptance-checklist.md:115 | L. Security Integrity
2041 | ?? | partial | prompt-pack/04-acceptance-checklist.md:116 | Does the pack explicitly mention XSS defense.
2042 | ?? | partial | prompt-pack/04-acceptance-checklist.md:117 | Does the pack explicitly mention SQL injection defense.
2043 | ?? | planned | prompt-pack/04-acceptance-checklist.md:118 | Does the pack explicitly mention mass assignment defense.
2044 | ?? | tested | prompt-pack/04-acceptance-checklist.md:119 | Does the pack explicitly mention file upload validation.
2045 | ?? | partial | prompt-pack/04-acceptance-checklist.md:120 | Does the pack explicitly mention rate limiting.
2046 | ?? | partial | prompt-pack/04-acceptance-checklist.md:121 | Does the pack explicitly mention free-text sanitization.
2047 | ?? | done | prompt-pack/04-acceptance-checklist.md:122 | Does the pack explicitly mention token handling safety.
2048 | ?? | tested | prompt-pack/04-acceptance-checklist.md:123 | Does the pack explicitly mention branch/order authorization safety.
2049 | ?? | done | prompt-pack/04-acceptance-checklist.md:124 | Does it mention auditability for sensitive actions.
2050 | ?? | tested | prompt-pack/04-acceptance-checklist.md:126 | M. Testing Integrity
2051 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:127 | Does the prompt require feature tests.
2052 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:128 | Does the prompt require unit tests.
2053 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:129 | Does the prompt require security-sensitive tests.
2054 | ?? | tested | prompt-pack/04-acceptance-checklist.md:130 | Does it mention auth tests.
2055 | ?? | tested | prompt-pack/04-acceptance-checklist.md:131 | Does it mention authorization tests.
2056 | ?? | tested | prompt-pack/04-acceptance-checklist.md:132 | Does it mention coupon edge-case tests.
2057 | ?? | tested | prompt-pack/04-acceptance-checklist.md:133 | Does it mention order grace-period tests.
2058 | ?? | tested | prompt-pack/04-acceptance-checklist.md:134 | Does it mention review eligibility tests.
2059 | ?? | planned | prompt-pack/04-acceptance-checklist.md:136 | N. Documentation Integrity
2060 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:137 | Does it require a project `README.md`.
2061 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:138 | Does it require setup documentation.
2062 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:139 | Does it require environment variable documentation.
2063 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:140 | Does it require authentication flow documentation.
2064 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:141 | Does it require API/versioning documentation.
2065 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:142 | Does it require internal plan docs.
2066 | ?? | planned | prompt-pack/04-acceptance-checklist.md:144 | O. Prompt-Pack Quality Integrity
2067 | ?? | done | prompt-pack/04-acceptance-checklist.md:145 | Is Arabic the primary narrative language.
2068 | ?? | done | prompt-pack/04-acceptance-checklist.md:146 | Is English used mainly for technical precision.
2069 | ?? | planned | prompt-pack/04-acceptance-checklist.md:147 | Is the content organized rather than duplicated blindly.
2070 | ?? | planned | prompt-pack/04-acceptance-checklist.md:148 | Is the combined pack larger than 1000 meaningful lines.
2071 | ?? | planned | prompt-pack/04-acceptance-checklist.md:149 | Is the content free from obvious padding lines.
2072 | ?? | planned | prompt-pack/04-acceptance-checklist.md:150 | Is the content reusable across `Codex`, `Claude`, and `Gemini Pro`.
2073 | ?? | planned | prompt-pack/04-acceptance-checklist.md:151 | Does it avoid vendor-exclusive syntax dependencies.
2074 | ?? | planned | prompt-pack/04-acceptance-checklist.md:153 | P. Portable Prompt Integrity
2075 | ?? | planned | prompt-pack/04-acceptance-checklist.md:154 | No hardcoded local `php.exe` path.
2076 | ?? | planned | prompt-pack/04-acceptance-checklist.md:155 | No local username path assumptions.
2077 | ?? | planned | prompt-pack/04-acceptance-checklist.md:156 | No OS-locked launcher commands unless clearly optional.
2078 | ?? | planned | prompt-pack/04-acceptance-checklist.md:157 | No editor-specific dependency.
2079 | ?? | planned | prompt-pack/04-acceptance-checklist.md:159 | Q. Implementation Acceptance For A Downstream Run
2080 | ?? | planned | prompt-pack/04-acceptance-checklist.md:160 | `plans/00` through `plans/12` exist.
2081 | ?? | planned | prompt-pack/04-acceptance-checklist.md:161 | `backend/` exists as Laravel 13 project.
2082 | ?? | planned | prompt-pack/04-acceptance-checklist.md:162 | Core packages are installed and configured.
2083 | ?? | done | prompt-pack/04-acceptance-checklist.md:163 | API versioning exists.
2084 | ?? | done | prompt-pack/04-acceptance-checklist.md:164 | Auth works with Sanctum.
2085 | ?? | tested | prompt-pack/04-acceptance-checklist.md:165 | Permissions work with Spatie.
2086 | ?? | done | prompt-pack/04-acceptance-checklist.md:166 | Branches and delivery zones exist.
2087 | ?? | planned | prompt-pack/04-acceptance-checklist.md:167 | Catalog entities exist.
2088 | ?? | done | prompt-pack/04-acceptance-checklist.md:168 | Cart and checkout logic exist.
2089 | ?? | done | prompt-pack/04-acceptance-checklist.md:169 | Orders and status transitions exist.
2090 | ?? | done | prompt-pack/04-acceptance-checklist.md:170 | Coupons, wallet, and gift cards exist.
2091 | ?? | done | prompt-pack/04-acceptance-checklist.md:171 | Reviews and profiles exist.
2092 | ?? | done | prompt-pack/04-acceptance-checklist.md:172 | Settings and dynamic pages exist.
2093 | ?? | tested | prompt-pack/04-acceptance-checklist.md:173 | Tests exist.
2094 | ?? | planned | prompt-pack/04-acceptance-checklist.md:174 | Documentation exists.
2095 | ?? | planned | prompt-pack/04-acceptance-checklist.md:176 | R. Red Flags
2096 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:177 | The agent says “frontend later” and still creates frontend code now.
2097 | ?? | planned | prompt-pack/04-acceptance-checklist.md:178 | The agent chooses a JS framework.
2098 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:179 | The agent generates Blade templates “just for testing”.
2099 | ?? | partial | prompt-pack/04-acceptance-checklist.md:180 | The agent stores unsafe raw HTML without policy.
2100 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:181 | The agent uses sessions as the only auth strategy despite the cross-platform token requirement.
2101 | ?? | planned | prompt-pack/04-acceptance-checklist.md:182 | The agent skips plan files.
2102 | ?? | done | prompt-pack/04-acceptance-checklist.md:183 | The agent leaves coupon edge-case behavior undocumented.
2103 | ?? | tested | prompt-pack/04-acceptance-checklist.md:184 | The agent ignores branch availability validation.
2104 | ?? | partial | prompt-pack/04-acceptance-checklist.md:185 | The agent leaves free-text sanitization unspecified.
2105 | ?? | planned | prompt-pack/04-acceptance-checklist.md:187 | S. Pass Definition
2106 | ?? | tested | prompt-pack/04-acceptance-checklist.md:188 | All critical scope, security, API, auth, branch, order, and testing checks pass.
2107 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:189 | No frontend artifacts are present.
2108 | ?? | planned | prompt-pack/04-acceptance-checklist.md:190 | No critical business rule is missing.
2109 | ?? | planned | prompt-pack/04-acceptance-checklist.md:191 | No machine-specific path assumption remains.
2110 | ?? | planned | prompt-pack/04-acceptance-checklist.md:192 | The result is implementation-ready.
2111 | ?? | done | prompt-pack/04-acceptance-checklist.md:194 | T. Reviewer Decision Template
2112 | ?? | planned | prompt-pack/04-acceptance-checklist.md:195 | `PASS` if all critical items are satisfied and no red flag is present.
2113 | ?? | partial | prompt-pack/04-acceptance-checklist.md:196 | `PASS WITH MINOR GAPS` only if gaps are documentation-level and do not change scope or security.
2114 | ?? | planned | prompt-pack/04-acceptance-checklist.md:197 | `FAIL` if backend-only scope is broken.
2115 | ?? | tested | prompt-pack/04-acceptance-checklist.md:198 | `FAIL` if auth/security rules are materially incomplete.
2116 | ?? | planned | prompt-pack/04-acceptance-checklist.md:199 | `FAIL` if planning docs are missing.
2117 | ? | out_of_scope_backend_only | prompt-pack/04-acceptance-checklist.md:200 | `FAIL` if the prompt still mixes frontend implementation into the build request.
2118 | ?? | planned | prompt-pack/README.md:1 | Backend-Only Prompt Pack
2119 | ?? | planned | prompt-pack/README.md:4 | This folder contains a reusable bilingual prompt pack.
2120 | ?? | planned | prompt-pack/README.md:5 | The pack is optimized for `Codex`, `Claude`, and `Gemini Pro`.
2121 | ?? | planned | prompt-pack/README.md:6 | The pack is intentionally `backend only`.
2122 | ? | out_of_scope_backend_only | prompt-pack/README.md:7 | It removes all frontend implementation scope from the original brief.
2123 | ? | backlog_future | prompt-pack/README.md:8 | It keeps mobile and website clients only as future `API consumers`.
2124 | ?? | planned | prompt-pack/README.md:10 | Verified Baseline
2125 | ?? | planned | prompt-pack/README.md:11 | Date lock for this pack: `April 11, 2026`.
2126 | ?? | planned | prompt-pack/README.md:12 | Verified assumption used in the pack: `Laravel 13.x` exists in official documentation.
2127 | ? | out_of_scope_backend_only | prompt-pack/README.md:13 | Verified baseline used in the pack: `PHP 8.3+` is required for the Laravel 13 generation being targeted here.
2128 | ?? | planned | prompt-pack/README.md:14 | This pack uses portable wording.
2129 | ?? | planned | prompt-pack/README.md:15 | This pack does not include local Windows launcher paths.
2130 | ?? | done | prompt-pack/README.md:16 | This pack does not assume one machine, one shell profile, or one editor.
2131 | ?? | planned | prompt-pack/README.md:18 | Main Goal
2132 | ?? | planned | prompt-pack/README.md:19 | Rewrite the user brief into a high-control prompt pack.
2133 | ?? | done | prompt-pack/README.md:20 | Keep the narrative primarily Arabic.
2134 | ?? | done | prompt-pack/README.md:21 | Keep English for technical terms and backend contracts.
2135 | ? | out_of_scope_backend_only | prompt-pack/README.md:22 | Convert vague wishes into enforceable backend requirements.
2136 | ?? | planned | prompt-pack/README.md:23 | Make the output safer for code-generation agents.
2137 | ?? | planned | prompt-pack/README.md:25 | Hard Scope
2138 | ?? | done | prompt-pack/README.md:26 | `Laravel 13 API backend only`
2139 | ? | out_of_scope_backend_only | prompt-pack/README.md:27 | `No frontend`
2140 | ? | out_of_scope_backend_only | prompt-pack/README.md:28 | `No Blade`
2141 | ? | out_of_scope_backend_only | prompt-pack/README.md:29 | `No Livewire`
2142 | ? | out_of_scope_backend_only | prompt-pack/README.md:30 | `No Filament`
2143 | ? | out_of_scope_backend_only | prompt-pack/README.md:31 | `No UI design`
2144 | ? | out_of_scope_backend_only | prompt-pack/README.md:32 | `No CSS frameworks`
2145 | ? | out_of_scope_backend_only | prompt-pack/README.md:33 | `No JavaScript frameworks`
2146 | ? | backlog_future | prompt-pack/README.md:34 | `No mobile app code`
2147 | ? | backlog_future | prompt-pack/README.md:35 | `No Android project`
2148 | ? | backlog_future | prompt-pack/README.md:36 | `No iOS project`
2149 | ?? | planned | prompt-pack/README.md:38 | Folder Contents
2150 | ?? | planned | prompt-pack/README.md:39 | `00-master-backend-only-prompt.md`
2151 | ?? | planned | prompt-pack/README.md:40 | `01-architecture-spec-companion.md`
2152 | ?? | tested | prompt-pack/README.md:41 | `02-security-auth-companion.md`
2153 | ?? | planned | prompt-pack/README.md:42 | `03-execution-checklist.md`
2154 | ?? | planned | prompt-pack/README.md:43 | `04-acceptance-checklist.md`
2155 | ?? | planned | prompt-pack/README.md:45 | How To Use
2156 | ?? | planned | prompt-pack/README.md:46 | Start with `00-master-backend-only-prompt.md`.
2157 | ?? | planned | prompt-pack/README.md:47 | Paste it into your target coding agent.
2158 | ?? | planned | prompt-pack/README.md:48 | Attach the companion files if the agent can consume multiple docs.
2159 | ?? | planned | prompt-pack/README.md:49 | If the agent handles only one prompt, merge the master prompt with the checklists.
2160 | ? | out_of_scope_backend_only | prompt-pack/README.md:50 | If the agent tends to drift into frontend work, attach `04-acceptance-checklist.md` as a guardrail.
2161 | ?? | suggested | prompt-pack/README.md:52 | Recommended Usage By Agent Type
2162 | ?? | planned | prompt-pack/README.md:54 | Use the master prompt as the system or task body.
2163 | ?? | done | prompt-pack/README.md:55 | Attach the execution checklist when you want strict ordering.
2164 | ?? | done | prompt-pack/README.md:56 | Attach the acceptance checklist when you want hard review gates.
2165 | ?? | planned | prompt-pack/README.md:59 | Use the master prompt first.
2166 | ?? | planned | prompt-pack/README.md:60 | Add the architecture companion if you want better planning depth.
2167 | ?? | partial | prompt-pack/README.md:61 | Add the security companion if the run is security-sensitive.
2168 | ?? | planned | prompt-pack/README.md:63 | Gemini Pro
2169 | ?? | planned | prompt-pack/README.md:64 | Use the master prompt plus the acceptance checklist.
2170 | ?? | planned | prompt-pack/README.md:65 | Keep the execution checklist nearby to reduce scope drift.
2171 | ?? | planned | prompt-pack/README.md:66 | Prefer the shorter section headers when pasting into constrained contexts.
2172 | ?? | planned | prompt-pack/README.md:68 | Why The Pack Is Split
2173 | ?? | done | prompt-pack/README.md:69 | One giant prompt becomes hard to audit.
2174 | ?? | planned | prompt-pack/README.md:70 | Splitting improves reuse.
2175 | ?? | planned | prompt-pack/README.md:71 | Splitting makes backend constraints easier to enforce.
2176 | ?? | planned | prompt-pack/README.md:72 | Splitting allows one file to act as the canonical prompt and the others as control layers.
2177 | ? | backlog_future | prompt-pack/README.md:73 | Splitting makes future edits safer.
2178 | ?? | planned | prompt-pack/README.md:75 | What The Pack Intentionally Preserves
2179 | ?? | done | prompt-pack/README.md:76 | Arabic-first product context.
2180 | ?? | done | prompt-pack/README.md:77 | Egyptian and Arabic restaurant business needs.
2181 | ?? | done | prompt-pack/README.md:78 | Multi-branch support.
2182 | ?? | done | prompt-pack/README.md:79 | Wallet, coupons, gift cards, and delivery logic.
2183 | ?? | planned | prompt-pack/README.md:80 | Admin-driven configurability.
2184 | ? | backlog_future | prompt-pack/README.md:81 | Future mobile compatibility.
2185 | ?? | planned | prompt-pack/README.md:83 | What The Pack Intentionally Removes
2186 | ? | out_of_scope_backend_only | prompt-pack/README.md:84 | Frontend stack research.
2187 | ?? | planned | prompt-pack/README.md:85 | Website visual design discussion.
2188 | ?? | planned | prompt-pack/README.md:86 | Animation libraries.
2189 | ? | out_of_scope_backend_only | prompt-pack/README.md:87 | Blade or server-rendered pages.
2190 | ? | out_of_scope_backend_only | prompt-pack/README.md:88 | Frontend validation implementation details.
2191 | ? | out_of_scope_backend_only | prompt-pack/README.md:89 | Any instruction to generate HTML, CSS, Tailwind, React, Vue, Angular, or similar.
2192 | ?? | planned | prompt-pack/README.md:91 | Backend Philosophy
2193 | ?? | done | prompt-pack/README.md:92 | API-first.
2194 | ?? | planned | prompt-pack/README.md:93 | Modular.
2195 | ?? | planned | prompt-pack/README.md:94 | Secure by default.
2196 | ? | backlog_future | prompt-pack/README.md:95 | Future-proof for mobile consumption.
2197 | ?? | done | prompt-pack/README.md:96 | Configurable via backend-managed settings.
2198 | ?? | planned | prompt-pack/README.md:97 | Clear contracts before code generation.
2199 | ?? | planned | prompt-pack/README.md:99 | Important Reminder
2200 | ? | out_of_scope_backend_only | prompt-pack/README.md:100 | The master prompt requires the implementing agent to create internal project planning documents first.
2201 | ?? | planned | prompt-pack/README.md:101 | Those documents live under `plans/`.
2202 | ?? | planned | prompt-pack/README.md:102 | The internal planning sequence remains:
2203 | ?? | planned | prompt-pack/README.md:103 | `plans/00-full-project-overview.md`
2204 | ?? | planned | prompt-pack/README.md:104 | `plans/01-database-schema-and-models.md`
2205 | ?? | done | prompt-pack/README.md:105 | `plans/02-api-endpoints-and-versioning.md`
2206 | ?? | tested | prompt-pack/README.md:106 | `plans/03-authentication-and-authorization.md`
2207 | ?? | done | prompt-pack/README.md:107 | `plans/04-branches-and-menus-system.md`
2208 | ?? | done | prompt-pack/README.md:108 | `plans/05-products-categories-sizes-addons.md`
2209 | ?? | done | prompt-pack/README.md:109 | `plans/06-reviews-ratings-tags-best-sellers.md`
2210 | ?? | done | prompt-pack/README.md:110 | `plans/07-users-profiles-addresses-wallet-giftcards.md`
2211 | ?? | done | prompt-pack/README.md:111 | `plans/08-cart-orders-checkout-shipping-coupons.md`
2212 | ?? | tested | prompt-pack/README.md:112 | `plans/09-admin-roles-permissions-notifications.md`
2213 | ?? | tested | prompt-pack/README.md:113 | `plans/10-security-best-practices-and-testing.md`
2214 | ?? | done | prompt-pack/README.md:114 | `plans/11-localization-arabic-english.md`
2215 | ? | backlog_future | prompt-pack/README.md:115 | `plans/12-scalability-and-future-mobile.md`
2216 | ?? | planned | prompt-pack/README.md:117 | Output Expectations From The Downstream Agent
2217 | ?? | planned | prompt-pack/README.md:118 | It must stay backend-only.
2218 | ? | out_of_scope_backend_only | prompt-pack/README.md:119 | It must not create frontend folders.
2219 | ? | out_of_scope_backend_only | prompt-pack/README.md:120 | It must not invent UI implementation work.
2220 | ?? | done | prompt-pack/README.md:121 | It must produce JSON APIs only.
2221 | ?? | planned | prompt-pack/README.md:122 | It must use secure defaults.
2222 | ?? | tested | prompt-pack/README.md:123 | It must include tests.
2223 | ?? | planned | prompt-pack/README.md:125 | Maintenance Notes
2224 | ? | backlog_future | prompt-pack/README.md:126 | If Laravel major-version facts change later, update the baseline section first.
2225 | ?? | planned | prompt-pack/README.md:127 | If your business rules change, update the master prompt and the acceptance checklist together.
2226 | ? | backlog_future | prompt-pack/README.md:128 | If you add payment providers later, update the architecture and security companions together.
2227 | ?? | planned | plans/00-full-project-overview.md:1 | Full Project Overview
2228 | ?? | planned | plans/00-full-project-overview.md:3 | Objective
2229 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:4 | Build a `Laravel 13` backend-only platform for an Egyptian/Arabic online restaurant.
2230 | ?? | planned | plans/00-full-project-overview.md:5 | Keep the current scope strictly inside `backend/`.
2231 | ? | backlog_future | plans/00-full-project-overview.md:6 | Serve future clients through versioned JSON APIs.
2232 | ? | backlog_future | plans/00-full-project-overview.md:7 | Prioritize security, modularity, testability, and future mobile reuse.
2233 | ?? | planned | plans/00-full-project-overview.md:9 | Hard Scope
2234 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:10 | Build `RESTful JSON APIs`.
2235 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:11 | Build backend services and business rules.
2236 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:12 | Build admin-facing API capabilities only.
2237 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:13 | Build no frontend, no Blade, no Filament, no Livewire.
2238 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:14 | Build no Android and no iOS projects now.
2239 | ?? | planned | plans/00-full-project-overview.md:16 | Business Goals
2240 | ?? | done | plans/00-full-project-overview.md:17 | Support Arabic as the primary language.
2241 | ?? | done | plans/00-full-project-overview.md:18 | Support English as the secondary language.
2242 | ?? | done | plans/00-full-project-overview.md:19 | Support one branch or multiple branches.
2243 | ?? | done | plans/00-full-project-overview.md:20 | Support advanced product options and pricing rules.
2244 | ?? | done | plans/00-full-project-overview.md:21 | Support complex checkout, coupons, wallet, gift cards, and order tracking.
2245 | ?? | done | plans/00-full-project-overview.md:22 | Support configurable settings and dynamic content through backend APIs.
2246 | ?? | planned | plans/00-full-project-overview.md:24 | Technical Baseline
2247 | ?? | planned | plans/00-full-project-overview.md:25 | | Item | Decision |
2248 | ?? | planned | plans/00-full-project-overview.md:26 | | --- | --- |
2249 | ?? | planned | plans/00-full-project-overview.md:27 | | Framework | Laravel 13 |
2250 | ?? | planned | plans/00-full-project-overview.md:28 | | PHP | 8.3+ |
2251 | ?? | done | plans/00-full-project-overview.md:29 | | DB | SQLite by default for local simplicity |
2252 | ?? | partial | plans/00-full-project-overview.md:30 | | Queue | Redis-ready, DB fallback for local |
2253 | ?? | partial | plans/00-full-project-overview.md:31 | | Cache | Redis-ready, file/database fallback locally |
2254 | ?? | done | plans/00-full-project-overview.md:32 | | Auth | Laravel Sanctum access tokens |
2255 | ?? | tested | plans/00-full-project-overview.md:33 | | Permissions | Spatie Laravel Permission |
2256 | ?? | done | plans/00-full-project-overview.md:34 | | API Style | `/api/v1/*` JSON only |
2257 | ?? | tested | plans/00-full-project-overview.md:35 | | Testing | PHPUnit/Pest compatible, feature-first |
2258 | ?? | planned | plans/00-full-project-overview.md:37 | Target Consumers
2259 | ? | backlog_future | plans/00-full-project-overview.md:38 | Website client in the future.
2260 | ? | backlog_future | plans/00-full-project-overview.md:39 | Android app in the future.
2261 | ? | backlog_future | plans/00-full-project-overview.md:40 | iOS app in the future.
2262 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:41 | Internal admin panel UI in the future.
2263 | ? | backlog_future | plans/00-full-project-overview.md:42 | Customer support tools in the future.
2264 | ? | backlog_future | plans/00-full-project-overview.md:44 | Domain Map
2265 | ?? | planned | plans/00-full-project-overview.md:46 | Identity
2266 | ?? | planned | plans/00-full-project-overview.md:48 | ├─ Users
2267 | ?? | done | plans/00-full-project-overview.md:49 | ├─ Profiles
2268 | ?? | done | plans/00-full-project-overview.md:50 | └─ Addresses
2269 | ?? | planned | plans/00-full-project-overview.md:52 | Commerce
2270 | ?? | done | plans/00-full-project-overview.md:53 | ├─ Branches
2271 | ?? | planned | plans/00-full-project-overview.md:54 | ├─ Delivery Zones
2272 | ?? | planned | plans/00-full-project-overview.md:55 | ├─ Categories
2273 | ?? | done | plans/00-full-project-overview.md:57 | ├─ Products
2274 | ?? | planned | plans/00-full-project-overview.md:58 | ├─ Variants / Sizes
2275 | ?? | planned | plans/00-full-project-overview.md:59 | ├─ Addon Groups
2276 | ?? | done | plans/00-full-project-overview.md:61 | ├─ Orders
2277 | ?? | done | plans/00-full-project-overview.md:62 | ├─ Coupons
2278 | ?? | done | plans/00-full-project-overview.md:63 | ├─ Wallet
2279 | ?? | done | plans/00-full-project-overview.md:64 | └─ Gift Cards
2280 | ?? | planned | plans/00-full-project-overview.md:66 | Platform
2281 | ?? | done | plans/00-full-project-overview.md:67 | ├─ Settings
2282 | ?? | done | plans/00-full-project-overview.md:68 | ├─ Dynamic Pages
2283 | ?? | done | plans/00-full-project-overview.md:69 | ├─ Notifications
2284 | ?? | tested | plans/00-full-project-overview.md:70 | ├─ Roles / Permissions
2285 | ?? | done | plans/00-full-project-overview.md:71 | └─ Audit Logs
2286 | ?? | done | plans/00-full-project-overview.md:74 | Main User Roles
2287 | ?? | planned | plans/00-full-project-overview.md:75 | Customer.
2288 | ?? | planned | plans/00-full-project-overview.md:76 | Super Admin.
2289 | ?? | done | plans/00-full-project-overview.md:77 | Branch Manager.
2290 | ?? | done | plans/00-full-project-overview.md:78 | Orders Manager.
2291 | ?? | planned | plans/00-full-project-overview.md:79 | Support Agent.
2292 | ?? | planned | plans/00-full-project-overview.md:80 | Content Moderator.
2293 | ?? | planned | plans/00-full-project-overview.md:81 | Delivery Coordinator.
2294 | ?? | partial | plans/00-full-project-overview.md:83 | Main Customer Flows
2295 | ?? | done | plans/00-full-project-overview.md:84 | Register or login.
2296 | ?? | done | plans/00-full-project-overview.md:85 | Browse branches and menu.
2297 | ?? | done | plans/00-full-project-overview.md:86 | Add configured products to cart.
2298 | ?? | done | plans/00-full-project-overview.md:87 | Select branch and delivery zone.
2299 | ?? | done | plans/00-full-project-overview.md:88 | Apply coupon if eligible.
2300 | ?? | done | plans/00-full-project-overview.md:89 | Use wallet if desired.
2301 | ?? | done | plans/00-full-project-overview.md:90 | Checkout and create order.
2302 | ?? | done | plans/00-full-project-overview.md:91 | Track order status.
2303 | ?? | done | plans/00-full-project-overview.md:92 | Submit verified review after fulfillment.
2304 | ?? | partial | plans/00-full-project-overview.md:94 | Main Admin Flows
2305 | ?? | done | plans/00-full-project-overview.md:95 | Create/manage branches.
2306 | ?? | done | plans/00-full-project-overview.md:96 | Create/manage categories, tags, products, sizes, and add-ons.
2307 | ?? | done | plans/00-full-project-overview.md:97 | Control product branch availability.
2308 | ?? | done | plans/00-full-project-overview.md:98 | Create/manage coupons and gift cards.
2309 | ?? | done | plans/00-full-project-overview.md:99 | Control general settings and feature toggles.
2310 | ?? | done | plans/00-full-project-overview.md:100 | Review and update order statuses.
2311 | ?? | planned | plans/00-full-project-overview.md:101 | Assign delivery person details.
2312 | ?? | done | plans/00-full-project-overview.md:102 | Moderate reviews.
2313 | ?? | tested | plans/00-full-project-overview.md:103 | Manage roles and permissions.
2314 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:105 | Core Non-Functional Requirements
2315 | ?? | planned | plans/00-full-project-overview.md:106 | Secure by default.
2316 | ?? | planned | plans/00-full-project-overview.md:107 | Scalable code organization.
2317 | ?? | planned | plans/00-full-project-overview.md:108 | Small reusable classes.
2318 | ?? | tested | plans/00-full-project-overview.md:109 | Test coverage for critical flows.
2319 | ?? | planned | plans/00-full-project-overview.md:110 | JSON-only error handling.
2320 | ?? | done | plans/00-full-project-overview.md:111 | Stable API contracts.
2321 | ?? | planned | plans/00-full-project-overview.md:112 | Localizable content.
2322 | ?? | planned | plans/00-full-project-overview.md:113 | Consistent monetary calculations.
2323 | ?? | planned | plans/00-full-project-overview.md:115 | Delivery Decisions
2324 | ?? | planned | plans/00-full-project-overview.md:116 | Use `backend/` as the Laravel root.
2325 | ?? | planned | plans/00-full-project-overview.md:117 | Use `plans/` in repo root as implementation documentation.
2326 | ?? | done | plans/00-full-project-overview.md:118 | Use SQLite for local development to reduce setup friction.
2327 | ?? | partial | plans/00-full-project-overview.md:119 | Keep database design MySQL-compatible where possible.
2328 | ?? | tested | plans/00-full-project-overview.md:120 | Prepare storage/CDN abstraction for uploaded files.
2329 | ?? | planned | plans/00-full-project-overview.md:122 | Module Strategy
2330 | ?? | planned | plans/00-full-project-overview.md:123 | Start with shared foundations.
2331 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:124 | Build auth and user modules first.
2332 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:125 | Build branch, settings, and catalog foundations next.
2333 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:126 | Build cart and order logic after catalog validation exists.
2334 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:127 | Build wallet, coupons, and gift cards after order pricing services exist.
2335 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:128 | Build reviews, notifications, and dynamic pages after core commerce flows.
2336 | ?? | planned | plans/00-full-project-overview.md:130 | Shared Conventions
2337 | ?? | planned | plans/00-full-project-overview.md:131 | `snake_case` database columns.
2338 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:132 | UUIDs optional later, numeric IDs acceptable for v1 unless otherwise required.
2339 | ?? | planned | plans/00-full-project-overview.md:133 | Lowercase normalization for email and username.
2340 | ?? | done | plans/00-full-project-overview.md:134 | API resources for response formatting.
2341 | ?? | partial | plans/00-full-project-overview.md:135 | Form requests for request validation.
2342 | ?? | planned | plans/00-full-project-overview.md:136 | Services for business rules.
2343 | ?? | tested | plans/00-full-project-overview.md:137 | Policies for authorization.
2344 | ?? | planned | plans/00-full-project-overview.md:138 | Enums for statuses and important types.
2345 | ?? | done | plans/00-full-project-overview.md:140 | Order Lifecycle Overview
2346 | ?? | planned | plans/00-full-project-overview.md:144 | confirmed
2347 | ?? | planned | plans/00-full-project-overview.md:145 | preparing
2348 | ?? | planned | plans/00-full-project-overview.md:146 | out_for_delivery
2349 | ?? | planned | plans/00-full-project-overview.md:147 | delivered
2350 | ?? | planned | plans/00-full-project-overview.md:148 | cancelled
2351 | ?? | planned | plans/00-full-project-overview.md:149 | refunded
2352 | ?? | planned | plans/00-full-project-overview.md:152 | Grace Period Rule
2353 | ?? | done | plans/00-full-project-overview.md:153 | Orders remain customer-editable/cancelable for `2 minutes`.
2354 | ?? | planned | plans/00-full-project-overview.md:154 | This value should be configurable.
2355 | ?? | planned | plans/00-full-project-overview.md:155 | After grace-period expiry, customer direct cancellation is blocked.
2356 | ?? | partial | plans/00-full-project-overview.md:156 | Staff transitions remain policy-controlled.
2357 | ?? | planned | plans/00-full-project-overview.md:158 | Pricing Overview
2358 | ?? | done | plans/00-full-project-overview.md:159 | Product may have a base price.
2359 | ?? | planned | plans/00-full-project-overview.md:160 | Size may override effective price.
2360 | ?? | planned | plans/00-full-project-overview.md:161 | Add-ons may add extra amounts.
2361 | ?? | done | plans/00-full-project-overview.md:162 | Coupons may affect products and/or delivery depending on rules.
2362 | ?? | done | plans/00-full-project-overview.md:163 | Wallet may partially or fully reduce payable amount.
2363 | ?? | done | plans/00-full-project-overview.md:164 | Delivery fee depends on selected branch and delivery zone.
2364 | ?? | partial | plans/00-full-project-overview.md:166 | Security Overview
2365 | ?? | done | plans/00-full-project-overview.md:167 | Sanctum token-based auth.
2366 | ?? | planned | plans/00-full-project-overview.md:168 | Rate limits on sensitive endpoints.
2367 | ?? | partial | plans/00-full-project-overview.md:169 | Sanitization for free-text fields.
2368 | ?? | tested | plans/00-full-project-overview.md:170 | Strict upload validation.
2369 | ?? | tested | plans/00-full-project-overview.md:171 | Spatie permissions for RBAC.
2370 | ?? | done | plans/00-full-project-overview.md:172 | Audit logs for privileged actions.
2371 | ?? | done | plans/00-full-project-overview.md:174 | Localization Overview
2372 | ?? | planned | plans/00-full-project-overview.md:175 | `Accept-Language: ar|en`.
2373 | ?? | planned | plans/00-full-project-overview.md:176 | Content fields stored in translation-friendly format.
2374 | ?? | tested | plans/00-full-project-overview.md:177 | Validation and API messages localizable.
2375 | ?? | done | plans/00-full-project-overview.md:178 | Arabic-first business copy.
2376 | ?? | planned | plans/00-full-project-overview.md:180 | Storage Overview
2377 | ?? | planned | plans/00-full-project-overview.md:181 | Use Laravel storage abstraction.
2378 | ?? | tested | plans/00-full-project-overview.md:182 | Keep a dedicated upload disk and URL prefix.
2379 | ? | backlog_future | plans/00-full-project-overview.md:183 | Allow future CDN swap without changing domain logic.
2380 | ?? | planned | plans/00-full-project-overview.md:184 | Save only references/paths in DB.
2381 | ?? | planned | plans/00-full-project-overview.md:186 | Initial Milestones
2382 | ?? | planned | plans/00-full-project-overview.md:187 | Plans documentation.
2383 | ?? | planned | plans/00-full-project-overview.md:188 | Laravel project scaffold.
2384 | ?? | done | plans/00-full-project-overview.md:189 | Core packages and settings.
2385 | ?? | done | plans/00-full-project-overview.md:190 | Auth and roles.
2386 | ?? | done | plans/00-full-project-overview.md:191 | Branches and catalog.
2387 | ?? | done | plans/00-full-project-overview.md:192 | Cart, orders, coupons, wallet.
2388 | ?? | tested | plans/00-full-project-overview.md:193 | Reviews, notifications, docs, tests.
2389 | ?? | planned | plans/00-full-project-overview.md:195 | Definition Of Done
2390 | ?? | planned | plans/00-full-project-overview.md:196 | Repo contains `plans/00` through `plans/12`.
2391 | ?? | planned | plans/00-full-project-overview.md:197 | Repo contains working `backend/` Laravel 13 project.
2392 | ?? | done | plans/00-full-project-overview.md:198 | Core APIs exist and return JSON.
2393 | ?? | tested | plans/00-full-project-overview.md:199 | Critical flows have tests.
2394 | ?? | tested | plans/00-full-project-overview.md:200 | Local server can be exercised with `curl`.
2395 | ? | out_of_scope_backend_only | plans/00-full-project-overview.md:201 | No frontend artifacts exist in the implementation.
2396 | ?? | planned | plans/01-database-schema-and-models.md:1 | Database Schema And Models
2397 | ?? | planned | plans/01-database-schema-and-models.md:4 | Keep schema normalized enough for maintainability.
2398 | ?? | planned | plans/01-database-schema-and-models.md:5 | Keep schema practical for Laravel development.
2399 | ?? | partial | plans/01-database-schema-and-models.md:6 | Preserve MySQL compatibility while using SQLite locally.
2400 | ?? | done | plans/01-database-schema-and-models.md:7 | Support branch-aware catalog and checkout rules.
2401 | ?? | planned | plans/01-database-schema-and-models.md:9 | Key Tables
2402 | ? | backlog_future | plans/01-database-schema-and-models.md:10 | | Domain | Tables |
2403 | ?? | planned | plans/01-database-schema-and-models.md:11 | | --- | --- |
2404 | ?? | done | plans/01-database-schema-and-models.md:12 | | Identity | users, personal_access_tokens, password_reset_tokens |
2405 | ?? | done | plans/01-database-schema-and-models.md:13 | | Profiles | user_profiles, user_addresses, user_secondary_phones |
2406 | ?? | done | plans/01-database-schema-and-models.md:14 | | Branches | branches, delivery_zones |
2407 | ?? | done | plans/01-database-schema-and-models.md:15 | | Catalog | categories, tags, products, product_media, product_sizes, addon_groups, addon_options |
2408 | ?? | done | plans/01-database-schema-and-models.md:16 | | Pivots | category_product, product_tag, branch_product, addon_group_product_size, addon_option_product_size |
2409 | ?? | done | plans/01-database-schema-and-models.md:17 | | Cart | carts, cart_items, cart_item_addons |
2410 | ?? | done | plans/01-database-schema-and-models.md:18 | | Orders | orders, order_items, order_item_addons, order_status_logs |
2411 | ?? | done | plans/01-database-schema-and-models.md:19 | | Billing | coupons, coupon_usages, wallets, wallet_transactions, gift_cards, gift_card_redemptions |
2412 | ?? | done | plans/01-database-schema-and-models.md:20 | | Platform | settings, dynamic_pages, audit_logs |
2413 | ?? | done | plans/01-database-schema-and-models.md:21 | | Reviews | reviews |
2414 | ?? | tested | plans/01-database-schema-and-models.md:22 | | Authz | roles, permissions, model_has_roles, model_has_permissions, role_has_permissions |
2415 | ?? | planned | plans/01-database-schema-and-models.md:25 | | Column | Type | Notes |
2416 | ?? | planned | plans/01-database-schema-and-models.md:26 | | --- | --- | --- |
2417 | ?? | planned | plans/01-database-schema-and-models.md:27 | | id | big integer | PK |
2418 | ?? | planned | plans/01-database-schema-and-models.md:28 | | name | string | display name |
2419 | ?? | planned | plans/01-database-schema-and-models.md:29 | | username | string unique | lowercase normalized |
2420 | ?? | planned | plans/01-database-schema-and-models.md:30 | | email | string unique nullable | lowercase normalized |
2421 | ? | out_of_scope_backend_only | plans/01-database-schema-and-models.md:31 | | primary_phone | string unique | required |
2422 | ?? | planned | plans/01-database-schema-and-models.md:32 | | password | string | hashed |
2423 | ?? | planned | plans/01-database-schema-and-models.md:33 | | email_verified_at | timestamp nullable | optional |
2424 | ?? | planned | plans/01-database-schema-and-models.md:34 | | is_active | boolean | access control |
2425 | ?? | done | plans/01-database-schema-and-models.md:35 | | last_login_at | timestamp nullable | auditing |
2426 | ?? | done | plans/01-database-schema-and-models.md:36 | | remember_token | nullable | Laravel default, not primary auth |
2427 | ?? | planned | plans/01-database-schema-and-models.md:37 | | timestamps | timestamps | standard |
2428 | ?? | done | plans/01-database-schema-and-models.md:39 | User Profiles
2429 | ?? | planned | plans/01-database-schema-and-models.md:40 | | Column | Type | Notes |
2430 | ?? | planned | plans/01-database-schema-and-models.md:41 | | --- | --- | --- |
2431 | ?? | planned | plans/01-database-schema-and-models.md:42 | | id | big integer | PK |
2432 | ?? | planned | plans/01-database-schema-and-models.md:43 | | user_id | foreign key | unique |
2433 | ?? | planned | plans/01-database-schema-and-models.md:44 | | avatar_path | string nullable | storage path |
2434 | ?? | planned | plans/01-database-schema-and-models.md:45 | | bio | text nullable | sanitized |
2435 | ?? | done | plans/01-database-schema-and-models.md:46 | | is_public_profile | boolean | public toggle |
2436 | ?? | done | plans/01-database-schema-and-models.md:47 | | show_total_orders | boolean | privacy |
2437 | ?? | planned | plans/01-database-schema-and-models.md:48 | | show_total_spent | boolean | privacy |
2438 | ?? | planned | plans/01-database-schema-and-models.md:49 | | show_monthly_rank | boolean | privacy |
2439 | ?? | planned | plans/01-database-schema-and-models.md:50 | | show_yearly_rank | boolean | privacy |
2440 | ?? | done | plans/01-database-schema-and-models.md:51 | | show_favorite_products | boolean | privacy |
2441 | ?? | planned | plans/01-database-schema-and-models.md:52 | | timestamps | timestamps | standard |
2442 | ?? | done | plans/01-database-schema-and-models.md:54 | User Addresses
2443 | ?? | planned | plans/01-database-schema-and-models.md:55 | | Column | Type | Notes |
2444 | ?? | planned | plans/01-database-schema-and-models.md:56 | | --- | --- | --- |
2445 | ?? | planned | plans/01-database-schema-and-models.md:57 | | id | big integer | PK |
2446 | ?? | planned | plans/01-database-schema-and-models.md:58 | | user_id | foreign key | owner |
2447 | ?? | planned | plans/01-database-schema-and-models.md:59 | | label | string | home/work |
2448 | ?? | planned | plans/01-database-schema-and-models.md:60 | | recipient_name | string | delivery |
2449 | ?? | planned | plans/01-database-schema-and-models.md:61 | | phone | string | contact override |
2450 | ?? | planned | plans/01-database-schema-and-models.md:62 | | country | string nullable | optional |
2451 | ?? | suggested | suggestions | Add production-ready mail, SMS, and push provider abstraction layers with failover handling.
2452 | ?? | suggested | suggestions | Add redis-backed cache invalidation strategy for product visibility, settings, and best-seller lists.
2453 | ?? | suggested | suggestions | Add domain onboarding checklist for future multi-brand or multi-tenant restaurant deployments.
2454 | ?? | suggested | suggestions | Add business metrics pipeline for conversion funnel, abandoned carts, average basket size, and delivery SLAs.
2455 | ?? | suggested | suggestions | Add database indexes review for heavy order lookup, cart refresh, notifications, and audit queries.
2456 | ?? | suggested | suggestions | Add security regression pack for hostile payloads in notes, reviews, dynamic pages, and uploaded filenames.
2457 | ?? | suggested | suggestions | Add blue/green or rolling deployment procedure for zero-downtime backend releases.
2458 | ?? | suggested | suggestions | Add secret rotation policy for APP_KEY, mail credentials, webhooks, and third-party providers.
2459 | ?? | suggested | suggestions | Add staging environment parity checks before production deployment or schema changes.
2460 | ?? | suggested | suggestions | Add API consumer contract tests to guarantee frontend rewrites do not break mobile/web integrations.
2461 | ?? | suggested | suggestions | Add branch-specific analytics and authorization audit reporting for delegated operations teams.
2462 | ?? | suggested | suggestions | Add k6 or Locust load profiles for peak lunch-hour order throughput and coupon contention.
2463 | ?? | suggested | suggestions | Add CI workflow to run artisan test, PHPStan, Pint, and flow smoke tests on every push.
2464 | ?? | suggested | suggestions | Add production queue worker supervision and restart strategy for Horizon and long-running jobs.
2465 | ?? | suggested | suggestions | Add nginx multi-site template with future domain/server_name expansion and strict security headers.
2466 | ?? | suggested | suggestions | Add server-side image optimization and background media processing pipeline for uploads.
2467 | ?? | suggested | suggestions | Add incident runbook for failed checkout, queue backlog, disk saturation, and token revocation events.
2468 | ?? | suggested | suggestions | Add database backup, restore rehearsal, retention policy, and encrypted offsite storage strategy.
2469 | ?? | suggested | suggestions | Add API rate-limit dashboards and anomaly detection for brute-force or coupon abuse patterns.
2470 | ?? | suggested | suggestions | Add OpenAPI or Postman export generated directly from route/request/resource contracts.
2471 | ?? | suggested | suggestions | Add production-ready mail, SMS, and push provider abstraction layers with failover handling.
2472 | ?? | suggested | suggestions | Add redis-backed cache invalidation strategy for product visibility, settings, and best-seller lists.
2473 | ?? | suggested | suggestions | Add domain onboarding checklist for future multi-brand or multi-tenant restaurant deployments.
2474 | ?? | suggested | suggestions | Add business metrics pipeline for conversion funnel, abandoned carts, average basket size, and delivery SLAs.
2475 | ?? | suggested | suggestions | Add database indexes review for heavy order lookup, cart refresh, notifications, and audit queries.
2476 | ?? | suggested | suggestions | Add security regression pack for hostile payloads in notes, reviews, dynamic pages, and uploaded filenames.
2477 | ?? | suggested | suggestions | Add blue/green or rolling deployment procedure for zero-downtime backend releases.
2478 | ?? | suggested | suggestions | Add secret rotation policy for APP_KEY, mail credentials, webhooks, and third-party providers.
2479 | ?? | suggested | suggestions | Add staging environment parity checks before production deployment or schema changes.
2480 | ?? | suggested | suggestions | Add API consumer contract tests to guarantee frontend rewrites do not break mobile/web integrations.
2481 | ?? | suggested | suggestions | Add branch-specific analytics and authorization audit reporting for delegated operations teams.
2482 | ?? | suggested | suggestions | Add k6 or Locust load profiles for peak lunch-hour order throughput and coupon contention.
2483 | ?? | suggested | suggestions | Add CI workflow to run artisan test, PHPStan, Pint, and flow smoke tests on every push.
2484 | ?? | suggested | suggestions | Add production queue worker supervision and restart strategy for Horizon and long-running jobs.
2485 | ?? | suggested | suggestions | Add nginx multi-site template with future domain/server_name expansion and strict security headers.
2486 | ?? | suggested | suggestions | Add server-side image optimization and background media processing pipeline for uploads.
2487 | ?? | suggested | suggestions | Add incident runbook for failed checkout, queue backlog, disk saturation, and token revocation events.
2488 | ?? | suggested | suggestions | Add database backup, restore rehearsal, retention policy, and encrypted offsite storage strategy.
2489 | ?? | suggested | suggestions | Add API rate-limit dashboards and anomaly detection for brute-force or coupon abuse patterns.
2490 | ?? | suggested | suggestions | Add OpenAPI or Postman export generated directly from route/request/resource contracts.
2491 | ?? | suggested | suggestions | Add production-ready mail, SMS, and push provider abstraction layers with failover handling.
2492 | ?? | suggested | suggestions | Add redis-backed cache invalidation strategy for product visibility, settings, and best-seller lists.
2493 | ?? | suggested | suggestions | Add domain onboarding checklist for future multi-brand or multi-tenant restaurant deployments.
2494 | ?? | suggested | suggestions | Add business metrics pipeline for conversion funnel, abandoned carts, average basket size, and delivery SLAs.
2495 | ?? | suggested | suggestions | Add database indexes review for heavy order lookup, cart refresh, notifications, and audit queries.
2496 | ?? | suggested | suggestions | Add security regression pack for hostile payloads in notes, reviews, dynamic pages, and uploaded filenames.
2497 | ?? | suggested | suggestions | Add blue/green or rolling deployment procedure for zero-downtime backend releases.
2498 | ?? | suggested | suggestions | Add secret rotation policy for APP_KEY, mail credentials, webhooks, and third-party providers.
2499 | ?? | suggested | suggestions | Add staging environment parity checks before production deployment or schema changes.
2500 | ?? | suggested | suggestions | Add API consumer contract tests to guarantee frontend rewrites do not break mobile/web integrations.
2501 | ?? | suggested | suggestions | Add branch-specific analytics and authorization audit reporting for delegated operations teams.
2502 | ?? | suggested | suggestions | Add k6 or Locust load profiles for peak lunch-hour order throughput and coupon contention.
2503 | ?? | suggested | suggestions | Add CI workflow to run artisan test, PHPStan, Pint, and flow smoke tests on every push.
2504 | ?? | suggested | suggestions | Add production queue worker supervision and restart strategy for Horizon and long-running jobs.
2505 | ?? | suggested | suggestions | Add nginx multi-site template with future domain/server_name expansion and strict security headers.
2506 | ?? | suggested | suggestions | Add server-side image optimization and background media processing pipeline for uploads.
2507 | ?? | suggested | suggestions | Add incident runbook for failed checkout, queue backlog, disk saturation, and token revocation events.
2508 | ?? | suggested | suggestions | Add database backup, restore rehearsal, retention policy, and encrypted offsite storage strategy.
2509 | ?? | suggested | suggestions | Add API rate-limit dashboards and anomaly detection for brute-force or coupon abuse patterns.
2510 | ?? | suggested | suggestions | Add OpenAPI or Postman export generated directly from route/request/resource contracts.
2511 | ?? | suggested | suggestions | Add production-ready mail, SMS, and push provider abstraction layers with failover handling.
2512 | ?? | suggested | suggestions | Add redis-backed cache invalidation strategy for product visibility, settings, and best-seller lists.
2513 | ?? | suggested | suggestions | Add domain onboarding checklist for future multi-brand or multi-tenant restaurant deployments.
2514 | ?? | suggested | suggestions | Add business metrics pipeline for conversion funnel, abandoned carts, average basket size, and delivery SLAs.
2515 | ?? | suggested | suggestions | Add database indexes review for heavy order lookup, cart refresh, notifications, and audit queries.
2516 | ?? | suggested | suggestions | Add security regression pack for hostile payloads in notes, reviews, dynamic pages, and uploaded filenames.
2517 | ?? | suggested | suggestions | Add blue/green or rolling deployment procedure for zero-downtime backend releases.
2518 | ?? | suggested | suggestions | Add secret rotation policy for APP_KEY, mail credentials, webhooks, and third-party providers.
2519 | ?? | suggested | suggestions | Add staging environment parity checks before production deployment or schema changes.
2520 | ?? | suggested | suggestions | Add API consumer contract tests to guarantee frontend rewrites do not break mobile/web integrations.
2521 | ?? | suggested | suggestions | Add branch-specific analytics and authorization audit reporting for delegated operations teams.
2522 | ?? | suggested | suggestions | Add k6 or Locust load profiles for peak lunch-hour order throughput and coupon contention.
2523 | ?? | suggested | suggestions | Add CI workflow to run artisan test, PHPStan, Pint, and flow smoke tests on every push.
2524 | ?? | suggested | suggestions | Add production queue worker supervision and restart strategy for Horizon and long-running jobs.
2525 | ?? | suggested | suggestions | Add nginx multi-site template with future domain/server_name expansion and strict security headers.
2526 | ?? | suggested | suggestions | Add server-side image optimization and background media processing pipeline for uploads.
2527 | ?? | suggested | suggestions | Add incident runbook for failed checkout, queue backlog, disk saturation, and token revocation events.
2528 | ?? | suggested | suggestions | Add database backup, restore rehearsal, retention policy, and encrypted offsite storage strategy.
2529 | ?? | suggested | suggestions | Add API rate-limit dashboards and anomaly detection for brute-force or coupon abuse patterns.
2530 | ?? | suggested | suggestions | Add OpenAPI or Postman export generated directly from route/request/resource contracts.
2531 | ?? | suggested | suggestions | Add production-ready mail, SMS, and push provider abstraction layers with failover handling.
2532 | ?? | suggested | suggestions | Add redis-backed cache invalidation strategy for product visibility, settings, and best-seller lists.
2533 | ?? | suggested | suggestions | Add domain onboarding checklist for future multi-brand or multi-tenant restaurant deployments.
2534 | ?? | suggested | suggestions | Add business metrics pipeline for conversion funnel, abandoned carts, average basket size, and delivery SLAs.
2535 | ?? | suggested | suggestions | Add database indexes review for heavy order lookup, cart refresh, notifications, and audit queries.
2536 | ?? | suggested | suggestions | Add security regression pack for hostile payloads in notes, reviews, dynamic pages, and uploaded filenames.
2537 | ?? | suggested | suggestions | Add blue/green or rolling deployment procedure for zero-downtime backend releases.
2538 | ?? | suggested | suggestions | Add secret rotation policy for APP_KEY, mail credentials, webhooks, and third-party providers.
2539 | ?? | suggested | suggestions | Add staging environment parity checks before production deployment or schema changes.
2540 | ?? | suggested | suggestions | Add API consumer contract tests to guarantee frontend rewrites do not break mobile/web integrations.
2541 | ?? | suggested | suggestions | Add branch-specific analytics and authorization audit reporting for delegated operations teams.
2542 | ?? | suggested | suggestions | Add k6 or Locust load profiles for peak lunch-hour order throughput and coupon contention.
2543 | ?? | suggested | suggestions | Add CI workflow to run artisan test, PHPStan, Pint, and flow smoke tests on every push.
2544 | ?? | suggested | suggestions | Add production queue worker supervision and restart strategy for Horizon and long-running jobs.
2545 | ?? | suggested | suggestions | Add nginx multi-site template with future domain/server_name expansion and strict security headers.
2546 | ?? | suggested | suggestions | Add server-side image optimization and background media processing pipeline for uploads.
2547 | ?? | suggested | suggestions | Add incident runbook for failed checkout, queue backlog, disk saturation, and token revocation events.
2548 | ?? | suggested | suggestions | Add database backup, restore rehearsal, retention policy, and encrypted offsite storage strategy.
2549 | ?? | suggested | suggestions | Add API rate-limit dashboards and anomaly detection for brute-force or coupon abuse patterns.
2550 | ?? | suggested | suggestions | Add OpenAPI or Postman export generated directly from route/request/resource contracts.
