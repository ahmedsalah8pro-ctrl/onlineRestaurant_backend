# Backend Master Tasks Matrix

Generated at: 2026-04-12T06:05:00
Workspace: c:/Users/PC/Desktop/onlineRestaurant2
Total task lines: 4423

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
- done: 1227
- tested: 867
- partial: 453
- pending: 9
- blocked_or_risk: 2
- planned: 534
- suggested: 553
- out_of_scope_backend_only: 223
- backlog_future: 555

Tasks:
?? 0001 | done | implementation | Laravel 13 API-only backend exists under backend/ with strict backend-only scope.
?? 0002 | done | implementation | Sanctum access tokens are used as the primary cross-platform authentication mechanism.
?? 0003 | done | implementation | SQLite is configured for simplified local and test-server execution.
?? 0004 | done | implementation | Uploads are exposed through a CDN-style public symlink at /cdn backed by storage/app/uploads.
?? 0005 | tested | verification | PHPUnit suite currently passes with 22 tests and 218 assertions.
?? 0006 | tested | verification | Python full_api_flow runner passes locally against http://127.0.0.1:8000.
?? 0007 | tested | verification | Python full_api_flow runner passes against the deployed server at http://165.245.163.125.
?? 0008 | tested | verification | Route coverage audit reports 98 covered route-method combinations and no uncovered API route methods.
?? 0009 | tested | verification | PHPStan analyze passes with the current configuration and baseline.
?? 0010 | tested | security | Security-oriented automated checks cover authentication, authorization, rate limiting, upload mime validation, sanitization, and customer/admin boundaries.
?? 0011 | done | deployment | Ubuntu 24.04 server bootstrap completed with nginx, php8.3-fpm, supervisor, composer, sqlite3, and required PHP extensions.
?? 0012 | tested | deployment | Nginx, php8.3-fpm, and the queue worker are active on the remote server.
?? 0013 | tested | deployment | Remote curl verification succeeded for public settings and products endpoints.
?? 0014 | blocked_or_risk | git | GitHub push remains blocked because the local credential is authenticated as bastetcheat and receives HTTP 403 for ahmedsalah8pro-ctrl/onlineRestaurant_backend.git.
? 0015 | backlog_future | deployment | Cloudflare, production TLS, real domain mapping, and multi-domain server blocks remain future deployment work.
? 0016 | out_of_scope_backend_only | scope | Frontend implementation, Blade, Livewire, Filament, CSS framework selection, and UI design remain intentionally excluded.
?? 0017 | done | docs | prompt-pack markdown set exists and remains available for downstream AI agents.
?? 0018 | done | docs | plans markdown set exists and remains available for deeper implementation planning.
?? 0019 | done | docs | README documents local setup, seeded accounts, endpoint groups, and testing commands.
?? 0020 | suggested | quality | Add OpenAPI generation and contract snapshots if the API will be consumed by multiple frontend teams later.
?? 0021 | suggested | quality | Add CI workflows for phpunit, phpstan, and flow smoke testing on every push when repository credentials are available.
?? 0022 | suggested | deployment | Add environment-specific deploy scripts and release directories before moving from test server to production.
?? 0023 | done | routes | Route implemented: GET /api/v1/addresses is registered in the backend router.
?? 0024 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/addresses.
?? 0025 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/addresses.
?? 0026 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/addresses.
?? 0027 | done | routes | Route implemented: POST /api/v1/addresses is registered in the backend router.
?? 0028 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/addresses.
?? 0029 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/addresses.
?? 0030 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/addresses.
?? 0031 | done | routes | Route implemented: PATCH /api/v1/addresses/{address} is registered in the backend router.
?? 0032 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/addresses/{address}.
?? 0033 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/addresses/{address}.
?? 0034 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/addresses/{address}.
?? 0035 | done | routes | Route implemented: DELETE /api/v1/addresses/{address} is registered in the backend router.
?? 0036 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/addresses/{address}.
?? 0037 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/addresses/{address}.
?? 0038 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via DELETE /api/v1/addresses/{address}.
?? 0039 | done | routes | Route implemented: PATCH /api/v1/addresses/{address}/default is registered in the backend router.
?? 0040 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/addresses/{address}/default.
?? 0041 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/addresses/{address}/default.
?? 0042 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/addresses/{address}/default.
?? 0043 | done | routes | Route implemented: GET /api/v1/admin/audit-logs is registered in the backend router.
?? 0044 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/audit-logs.
?? 0045 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/audit-logs.
?? 0046 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/audit-logs.
?? 0047 | done | routes | Route implemented: GET /api/v1/admin/branches is registered in the backend router.
?? 0048 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/branches.
?? 0049 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/branches.
?? 0050 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/branches.
?? 0051 | done | routes | Route implemented: POST /api/v1/admin/branches is registered in the backend router.
?? 0052 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/branches.
?? 0053 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/branches.
?? 0054 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/branches.
?? 0055 | done | routes | Route implemented: GET /api/v1/admin/branches/{branch} is registered in the backend router.
?? 0056 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/branches/{branch}.
?? 0057 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/branches/{branch}.
?? 0058 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/branches/{branch}.
?? 0059 | done | routes | Route implemented: PATCH /api/v1/admin/branches/{branch} is registered in the backend router.
?? 0060 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/branches/{branch}.
?? 0061 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/branches/{branch}.
?? 0062 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/branches/{branch}.
?? 0063 | done | routes | Route implemented: DELETE /api/v1/admin/branches/{branch} is registered in the backend router.
?? 0064 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/branches/{branch}.
?? 0065 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/branches/{branch}.
?? 0066 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/branches/{branch}.
?? 0067 | done | routes | Route implemented: GET /api/v1/admin/categories is registered in the backend router.
?? 0068 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/categories.
?? 0069 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/categories.
?? 0070 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/categories.
?? 0071 | done | routes | Route implemented: POST /api/v1/admin/categories is registered in the backend router.
?? 0072 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/categories.
?? 0073 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/categories.
?? 0074 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/categories.
?? 0075 | done | routes | Route implemented: GET /api/v1/admin/categories/{category} is registered in the backend router.
?? 0076 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/categories/{category}.
?? 0077 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/categories/{category}.
?? 0078 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/categories/{category}.
?? 0079 | done | routes | Route implemented: PATCH /api/v1/admin/categories/{category} is registered in the backend router.
?? 0080 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/categories/{category}.
?? 0081 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/categories/{category}.
?? 0082 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/categories/{category}.
?? 0083 | done | routes | Route implemented: DELETE /api/v1/admin/categories/{category} is registered in the backend router.
?? 0084 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/categories/{category}.
?? 0085 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/categories/{category}.
?? 0086 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/categories/{category}.
?? 0087 | done | routes | Route implemented: GET /api/v1/admin/coupons is registered in the backend router.
?? 0088 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/coupons.
?? 0089 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/coupons.
?? 0090 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/coupons.
?? 0091 | done | routes | Route implemented: POST /api/v1/admin/coupons is registered in the backend router.
?? 0092 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/coupons.
?? 0093 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/coupons.
?? 0094 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/coupons.
?? 0095 | done | routes | Route implemented: GET /api/v1/admin/coupons/{coupon} is registered in the backend router.
?? 0096 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/coupons/{coupon}.
?? 0097 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/coupons/{coupon}.
?? 0098 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/coupons/{coupon}.
?? 0099 | done | routes | Route implemented: PATCH /api/v1/admin/coupons/{coupon} is registered in the backend router.
?? 0100 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/coupons/{coupon}.
?? 0101 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/coupons/{coupon}.
?? 0102 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/coupons/{coupon}.
?? 0103 | done | routes | Route implemented: DELETE /api/v1/admin/coupons/{coupon} is registered in the backend router.
?? 0104 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/coupons/{coupon}.
?? 0105 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/coupons/{coupon}.
?? 0106 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/coupons/{coupon}.
?? 0107 | done | routes | Route implemented: GET /api/v1/admin/delivery-zones is registered in the backend router.
?? 0108 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/delivery-zones.
?? 0109 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/delivery-zones.
?? 0110 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/delivery-zones.
?? 0111 | done | routes | Route implemented: POST /api/v1/admin/delivery-zones is registered in the backend router.
?? 0112 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/delivery-zones.
?? 0113 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/delivery-zones.
?? 0114 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/delivery-zones.
?? 0115 | done | routes | Route implemented: GET /api/v1/admin/delivery-zones/{deliveryZone} is registered in the backend router.
?? 0116 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0117 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0118 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0119 | done | routes | Route implemented: PATCH /api/v1/admin/delivery-zones/{deliveryZone} is registered in the backend router.
?? 0120 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0121 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0122 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0123 | done | routes | Route implemented: DELETE /api/v1/admin/delivery-zones/{deliveryZone} is registered in the backend router.
?? 0124 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0125 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0126 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/delivery-zones/{deliveryZone}.
?? 0127 | done | routes | Route implemented: GET /api/v1/admin/gift-cards is registered in the backend router.
?? 0128 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/gift-cards.
?? 0129 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/gift-cards.
?? 0130 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/gift-cards.
?? 0131 | done | routes | Route implemented: POST /api/v1/admin/gift-cards is registered in the backend router.
?? 0132 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/gift-cards.
?? 0133 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/gift-cards.
?? 0134 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/gift-cards.
?? 0135 | done | routes | Route implemented: GET /api/v1/admin/gift-cards/{giftCard} is registered in the backend router.
?? 0136 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/gift-cards/{giftCard}.
?? 0137 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/gift-cards/{giftCard}.
?? 0138 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/gift-cards/{giftCard}.
?? 0139 | done | routes | Route implemented: PATCH /api/v1/admin/gift-cards/{giftCard} is registered in the backend router.
?? 0140 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/gift-cards/{giftCard}.
?? 0141 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/gift-cards/{giftCard}.
?? 0142 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/gift-cards/{giftCard}.
?? 0143 | done | routes | Route implemented: DELETE /api/v1/admin/gift-cards/{giftCard} is registered in the backend router.
?? 0144 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/gift-cards/{giftCard}.
?? 0145 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/gift-cards/{giftCard}.
?? 0146 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/gift-cards/{giftCard}.
?? 0147 | done | routes | Route implemented: GET /api/v1/admin/orders is registered in the backend router.
?? 0148 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/orders.
?? 0149 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/orders.
?? 0150 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/orders.
?? 0151 | done | routes | Route implemented: GET /api/v1/admin/orders/{order} is registered in the backend router.
?? 0152 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/orders/{order}.
?? 0153 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/orders/{order}.
?? 0154 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/orders/{order}.
?? 0155 | done | routes | Route implemented: PATCH /api/v1/admin/orders/{order}/delivery is registered in the backend router.
?? 0156 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/orders/{order}/delivery.
?? 0157 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/orders/{order}/delivery.
?? 0158 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/orders/{order}/delivery.
?? 0159 | done | routes | Route implemented: PATCH /api/v1/admin/orders/{order}/status is registered in the backend router.
?? 0160 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/orders/{order}/status.
?? 0161 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/orders/{order}/status.
?? 0162 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/orders/{order}/status.
?? 0163 | done | routes | Route implemented: GET /api/v1/admin/pages is registered in the backend router.
?? 0164 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/pages.
?? 0165 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/pages.
?? 0166 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/pages.
?? 0167 | done | routes | Route implemented: POST /api/v1/admin/pages is registered in the backend router.
?? 0168 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/pages.
?? 0169 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/pages.
?? 0170 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/pages.
?? 0171 | done | routes | Route implemented: GET /api/v1/admin/pages/{page} is registered in the backend router.
?? 0172 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/pages/{page}.
?? 0173 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/pages/{page}.
?? 0174 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/pages/{page}.
?? 0175 | done | routes | Route implemented: PATCH /api/v1/admin/pages/{page} is registered in the backend router.
?? 0176 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/pages/{page}.
?? 0177 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/pages/{page}.
?? 0178 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/pages/{page}.
?? 0179 | done | routes | Route implemented: DELETE /api/v1/admin/pages/{page} is registered in the backend router.
?? 0180 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/pages/{page}.
?? 0181 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/pages/{page}.
?? 0182 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/pages/{page}.
?? 0183 | done | routes | Route implemented: GET /api/v1/admin/products is registered in the backend router.
?? 0184 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/products.
?? 0185 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/products.
?? 0186 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/products.
?? 0187 | done | routes | Route implemented: POST /api/v1/admin/products is registered in the backend router.
?? 0188 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/products.
?? 0189 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/products.
?? 0190 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/products.
?? 0191 | done | routes | Route implemented: GET /api/v1/admin/products/{product} is registered in the backend router.
?? 0192 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/products/{product}.
?? 0193 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/products/{product}.
?? 0194 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/products/{product}.
?? 0195 | done | routes | Route implemented: PATCH /api/v1/admin/products/{product} is registered in the backend router.
?? 0196 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/products/{product}.
?? 0197 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/products/{product}.
?? 0198 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/products/{product}.
?? 0199 | done | routes | Route implemented: DELETE /api/v1/admin/products/{product} is registered in the backend router.
?? 0200 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/products/{product}.
?? 0201 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/products/{product}.
?? 0202 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/products/{product}.
?? 0203 | done | routes | Route implemented: GET /api/v1/admin/reviews is registered in the backend router.
?? 0204 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/reviews.
?? 0205 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/reviews.
?? 0206 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/reviews.
?? 0207 | done | routes | Route implemented: PATCH /api/v1/admin/reviews/{review} is registered in the backend router.
?? 0208 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/reviews/{review}.
?? 0209 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/reviews/{review}.
?? 0210 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/reviews/{review}.
?? 0211 | done | routes | Route implemented: DELETE /api/v1/admin/reviews/{review} is registered in the backend router.
?? 0212 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/reviews/{review}.
?? 0213 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/reviews/{review}.
?? 0214 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/reviews/{review}.
?? 0215 | done | routes | Route implemented: GET /api/v1/admin/roles is registered in the backend router.
?? 0216 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/roles.
?? 0217 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/roles.
?? 0218 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/roles.
?? 0219 | done | routes | Route implemented: POST /api/v1/admin/roles is registered in the backend router.
?? 0220 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/roles.
?? 0221 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/roles.
?? 0222 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/roles.
?? 0223 | done | routes | Route implemented: PATCH /api/v1/admin/roles/{role} is registered in the backend router.
?? 0224 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/roles/{role}.
?? 0225 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/roles/{role}.
?? 0226 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/roles/{role}.
?? 0227 | done | routes | Route implemented: DELETE /api/v1/admin/roles/{role} is registered in the backend router.
?? 0228 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/roles/{role}.
?? 0229 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/roles/{role}.
?? 0230 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/roles/{role}.
?? 0231 | done | routes | Route implemented: GET /api/v1/admin/settings is registered in the backend router.
?? 0232 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/settings.
?? 0233 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/settings.
?? 0234 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/settings.
?? 0235 | done | routes | Route implemented: PATCH /api/v1/admin/settings/{group} is registered in the backend router.
?? 0236 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/settings/{group}.
?? 0237 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/settings/{group}.
?? 0238 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/settings/{group}.
?? 0239 | done | routes | Route implemented: GET /api/v1/admin/tags is registered in the backend router.
?? 0240 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/tags.
?? 0241 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/tags.
?? 0242 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/tags.
?? 0243 | done | routes | Route implemented: POST /api/v1/admin/tags is registered in the backend router.
?? 0244 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/tags.
?? 0245 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/tags.
?? 0246 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/tags.
?? 0247 | done | routes | Route implemented: GET /api/v1/admin/tags/{tag} is registered in the backend router.
?? 0248 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/admin/tags/{tag}.
?? 0249 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/admin/tags/{tag}.
?? 0250 | done | admin_control | Administrative backend control path is exposed through GET /api/v1/admin/tags/{tag}.
?? 0251 | done | routes | Route implemented: PATCH /api/v1/admin/tags/{tag} is registered in the backend router.
?? 0252 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/admin/tags/{tag}.
?? 0253 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/admin/tags/{tag}.
?? 0254 | done | admin_control | Administrative backend control path is exposed through PATCH /api/v1/admin/tags/{tag}.
?? 0255 | done | routes | Route implemented: DELETE /api/v1/admin/tags/{tag} is registered in the backend router.
?? 0256 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/admin/tags/{tag}.
?? 0257 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/admin/tags/{tag}.
?? 0258 | done | admin_control | Administrative backend control path is exposed through DELETE /api/v1/admin/tags/{tag}.
?? 0259 | done | routes | Route implemented: POST /api/v1/admin/uploads is registered in the backend router.
?? 0260 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/admin/uploads.
?? 0261 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/admin/uploads.
?? 0262 | done | admin_control | Administrative backend control path is exposed through POST /api/v1/admin/uploads.
?? 0263 | done | routes | Route implemented: POST /api/v1/auth/login is registered in the backend router.
?? 0264 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/auth/login.
?? 0265 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/auth/login.
?? 0266 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/auth/login.
?? 0267 | done | routes | Route implemented: POST /api/v1/auth/logout is registered in the backend router.
?? 0268 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/auth/logout.
?? 0269 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/auth/logout.
?? 0270 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/auth/logout.
?? 0271 | done | routes | Route implemented: POST /api/v1/auth/logout-all is registered in the backend router.
?? 0272 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/auth/logout-all.
?? 0273 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/auth/logout-all.
?? 0274 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/auth/logout-all.
?? 0275 | done | routes | Route implemented: GET /api/v1/auth/me is registered in the backend router.
?? 0276 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/auth/me.
?? 0277 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/auth/me.
?? 0278 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/auth/me.
?? 0279 | done | routes | Route implemented: POST /api/v1/auth/register is registered in the backend router.
?? 0280 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/auth/register.
?? 0281 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/auth/register.
?? 0282 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/auth/register.
?? 0283 | done | routes | Route implemented: GET /api/v1/branches is registered in the backend router.
?? 0284 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/branches.
?? 0285 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/branches.
?? 0286 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/branches.
?? 0287 | done | routes | Route implemented: GET /api/v1/branches/{branch} is registered in the backend router.
?? 0288 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/branches/{branch}.
?? 0289 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/branches/{branch}.
?? 0290 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/branches/{branch}.
?? 0291 | done | routes | Route implemented: GET /api/v1/branches/{branch}/zones is registered in the backend router.
?? 0292 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/branches/{branch}/zones.
?? 0293 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/branches/{branch}/zones.
?? 0294 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/branches/{branch}/zones.
?? 0295 | done | routes | Route implemented: GET /api/v1/cart is registered in the backend router.
?? 0296 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/cart.
?? 0297 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/cart.
?? 0298 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/cart.
?? 0299 | done | routes | Route implemented: DELETE /api/v1/cart is registered in the backend router.
?? 0300 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/cart.
?? 0301 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/cart.
?? 0302 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via DELETE /api/v1/cart.
?? 0303 | done | routes | Route implemented: POST /api/v1/cart/items is registered in the backend router.
?? 0304 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/cart/items.
?? 0305 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/cart/items.
?? 0306 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/cart/items.
?? 0307 | done | routes | Route implemented: PATCH /api/v1/cart/items/{item} is registered in the backend router.
?? 0308 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/cart/items/{item}.
?? 0309 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/cart/items/{item}.
?? 0310 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/cart/items/{item}.
?? 0311 | done | routes | Route implemented: DELETE /api/v1/cart/items/{item} is registered in the backend router.
?? 0312 | tested | routes | Route verified by automated route coverage audit: DELETE /api/v1/cart/items/{item}.
?? 0313 | tested | security | Authentication or authorization boundaries have automated coverage for DELETE /api/v1/cart/items/{item}.
?? 0314 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via DELETE /api/v1/cart/items/{item}.
?? 0315 | done | routes | Route implemented: POST /api/v1/cart/preview-coupon is registered in the backend router.
?? 0316 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/cart/preview-coupon.
?? 0317 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/cart/preview-coupon.
?? 0318 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/cart/preview-coupon.
?? 0319 | done | routes | Route implemented: GET /api/v1/categories is registered in the backend router.
?? 0320 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/categories.
?? 0321 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/categories.
?? 0322 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/categories.
?? 0323 | done | routes | Route implemented: GET /api/v1/notifications is registered in the backend router.
?? 0324 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/notifications.
?? 0325 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/notifications.
?? 0326 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/notifications.
?? 0327 | done | routes | Route implemented: POST /api/v1/notifications/read-all is registered in the backend router.
?? 0328 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/notifications/read-all.
?? 0329 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/notifications/read-all.
?? 0330 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/notifications/read-all.
?? 0331 | done | routes | Route implemented: GET /api/v1/notifications/unread-count is registered in the backend router.
?? 0332 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/notifications/unread-count.
?? 0333 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/notifications/unread-count.
?? 0334 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/notifications/unread-count.
?? 0335 | done | routes | Route implemented: PATCH /api/v1/notifications/{notification}/read is registered in the backend router.
?? 0336 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/notifications/{notification}/read.
?? 0337 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/notifications/{notification}/read.
?? 0338 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/notifications/{notification}/read.
?? 0339 | done | routes | Route implemented: GET /api/v1/orders is registered in the backend router.
?? 0340 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/orders.
?? 0341 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/orders.
?? 0342 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/orders.
?? 0343 | done | routes | Route implemented: POST /api/v1/orders/checkout is registered in the backend router.
?? 0344 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/orders/checkout.
?? 0345 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/orders/checkout.
?? 0346 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/orders/checkout.
?? 0347 | done | routes | Route implemented: GET /api/v1/orders/{order} is registered in the backend router.
?? 0348 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/orders/{order}.
?? 0349 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/orders/{order}.
?? 0350 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/orders/{order}.
?? 0351 | done | routes | Route implemented: POST /api/v1/orders/{order}/cancel is registered in the backend router.
?? 0352 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/orders/{order}/cancel.
?? 0353 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/orders/{order}/cancel.
?? 0354 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/orders/{order}/cancel.
?? 0355 | done | routes | Route implemented: PATCH /api/v1/orders/{order}/notes is registered in the backend router.
?? 0356 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/orders/{order}/notes.
?? 0357 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/orders/{order}/notes.
?? 0358 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/orders/{order}/notes.
?? 0359 | done | routes | Route implemented: GET /api/v1/pages/{slug} is registered in the backend router.
?? 0360 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/pages/{slug}.
?? 0361 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/pages/{slug}.
?? 0362 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/pages/{slug}.
?? 0363 | done | routes | Route implemented: GET /api/v1/products is registered in the backend router.
?? 0364 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/products.
?? 0365 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/products.
?? 0366 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/products.
?? 0367 | done | routes | Route implemented: GET /api/v1/products/best-sellers is registered in the backend router.
?? 0368 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/products/best-sellers.
?? 0369 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/products/best-sellers.
?? 0370 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/products/best-sellers.
?? 0371 | done | routes | Route implemented: GET /api/v1/products/{product} is registered in the backend router.
?? 0372 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/products/{product}.
?? 0373 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/products/{product}.
?? 0374 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/products/{product}.
?? 0375 | done | routes | Route implemented: GET /api/v1/products/{product}/reviews is registered in the backend router.
?? 0376 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/products/{product}/reviews.
?? 0377 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/products/{product}/reviews.
?? 0378 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/products/{product}/reviews.
?? 0379 | done | routes | Route implemented: GET /api/v1/profile is registered in the backend router.
?? 0380 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/profile.
?? 0381 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/profile.
?? 0382 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/profile.
?? 0383 | done | routes | Route implemented: PATCH /api/v1/profile is registered in the backend router.
?? 0384 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/profile.
?? 0385 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/profile.
?? 0386 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/profile.
?? 0387 | done | routes | Route implemented: PATCH /api/v1/profile/privacy is registered in the backend router.
?? 0388 | tested | routes | Route verified by automated route coverage audit: PATCH /api/v1/profile/privacy.
?? 0389 | tested | security | Authentication or authorization boundaries have automated coverage for PATCH /api/v1/profile/privacy.
?? 0390 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via PATCH /api/v1/profile/privacy.
?? 0391 | done | routes | Route implemented: GET /api/v1/profiles/{username} is registered in the backend router.
?? 0392 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/profiles/{username}.
?? 0393 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/profiles/{username}.
?? 0394 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/profiles/{username}.
?? 0395 | done | routes | Route implemented: POST /api/v1/reviews is registered in the backend router.
?? 0396 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/reviews.
?? 0397 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/reviews.
?? 0398 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/reviews.
?? 0399 | done | routes | Route implemented: GET /api/v1/settings/public is registered in the backend router.
?? 0400 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/settings/public.
?? 0401 | tested | verification | Public contract response shape has automated coverage for GET /api/v1/settings/public.
?? 0402 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/settings/public.
?? 0403 | done | routes | Route implemented: GET /api/v1/wallet is registered in the backend router.
?? 0404 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/wallet.
?? 0405 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/wallet.
?? 0406 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/wallet.
?? 0407 | done | routes | Route implemented: POST /api/v1/wallet/redeem is registered in the backend router.
?? 0408 | tested | routes | Route verified by automated route coverage audit: POST /api/v1/wallet/redeem.
?? 0409 | tested | security | Authentication or authorization boundaries have automated coverage for POST /api/v1/wallet/redeem.
?? 0410 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via POST /api/v1/wallet/redeem.
?? 0411 | done | routes | Route implemented: GET /api/v1/wallet/transactions is registered in the backend router.
?? 0412 | tested | routes | Route verified by automated route coverage audit: GET /api/v1/wallet/transactions.
?? 0413 | tested | security | Authentication or authorization boundaries have automated coverage for GET /api/v1/wallet/transactions.
?? 0414 | done | api_contract | Client-facing backend contract is stable for web/mobile/desktop consumers via GET /api/v1/wallet/transactions.
?? 0415 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 1: # MASTER PROMPT
? 0416 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 3: ## Identity
?? 0417 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 4: - أنت خبير عالمي في `Laravel 13 backend architecture`.
?? 0418 | done | security | prompt-pack/00-master-backend-only-prompt.md line 5: - أنت تعمل كـ `senior backend architect`, `API designer`, و `security-first Laravel engineer`.
?? 0419 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 6: - أنت مكلف ببناء نظام `backend` احترافي وقابل للتوسع لمطعم أونلاين عربي/مصري.
?? 0420 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 7: - أنت تبني `backend only`.
? 0421 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 8: - أنت لا تبني أي `frontend`.
? 0422 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 9: - أنت لا تقترح أي `UI stack`.
? 0423 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 10: - أنت لا تنشئ `Blade templates`.
? 0424 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 11: - أنت لا تستخدم `Livewire`.
? 0425 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 12: - أنت لا تستخدم `Filament`.
?? 0426 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 13: - أنت لا تكتب HTML/CSS/JS للواجهة.
?? 0427 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 14: - أنت لا تبحث عن frameworks للواجهة.
?? 0428 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 16: ## Hard Scope Statement
? 0429 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 17: - Build `Laravel 13 API backend only`.
? 0430 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 18: - Build `RESTful JSON APIs only`.
? 0431 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 19: - Do not generate frontend code.
?? 0432 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 20: - Do not generate view files.
? 0433 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 21: - Do not generate Blade files.
? 0434 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 22: - Do not generate Livewire components.
? 0435 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 23: - Do not generate Filament resources.
?? 0436 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 24: - Do not generate React, Vue, Angular, Next, Nuxt, or similar.
? 0437 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 25: - Do not create `android/` or `ios/` now.
? 0438 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 26: - Treat website, Android, and iOS as future consumers of the same API.
?? 0439 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 28: ## Time-Locked Technical Baseline
?? 0440 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 29: - Use the following baseline as explicit project truth.
?? 0441 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 30: - Date reference: `April 11, 2026`.
?? 0442 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 31: - Target framework: `Laravel 13.x`.
?? 0443 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 32: - Target minimum PHP version: `PHP 8.3+`.
? 0444 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 33: - The repository being built right now is the backend repository only.
?? 0445 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 34: - The active application folder is `backend/`.
?? 0446 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 35: - The output must be portable.
?? 0447 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 36: - Do not include local machine paths.
?? 0448 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 37: - Do not include Windows-specific launchers unless explicitly requested later.
? 0449 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 39: ## Mission
?? 0450 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 40: - أنشئ `backend` منفصل تمامًا.
?? 0451 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 41: - يجب أن يكون `production-oriented`.
?? 0452 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 42: - يجب أن يكون `scalable`.
?? 0453 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 43: - يجب أن يكون `secure`.
?? 0454 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 44: - يجب أن يكون `modular`.
? 0455 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 45: - يجب أن يكون مناسبًا للعمل لاحقًا مع `web client`, `Android app`, و `iOS app`.
?? 0456 | tested | security | prompt-pack/00-master-backend-only-prompt.md line 46: - يجب أن يركز على `API contracts`, `domain rules`, `authorization`, `validation`, و `testability`.
?? 0457 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 48: ## Primary Product Context
?? 0458 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 49: - المنصة عبارة عن مطعم أونلاين موجه لسوق عربي/مصري.
?? 0459 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 50: - اللغة الأساسية هي العربية.
? 0460 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 51: - اللغة الثانوية هي الإنجليزية.
?? 0461 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 52: - النظام يجب أن يدعم `multilingual content`.
?? 0462 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 53: - النظام يجب أن يدعم فروع متعددة.
?? 0463 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 54: - النظام يجب أن يدعم منيو معقدة.
?? 0464 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 55: - النظام يجب أن يدعم إضافات وأحجام وأسعار مرنة.
?? 0465 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 56: - النظام يجب أن يدعم كوبونات ووسائل دفع قابلة للتوسع.
?? 0466 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 57: - النظام يجب أن يدعم لوحة إدارة عبر `API contracts only`.
?? 0467 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 59: ## Non-Goals
?? 0468 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 60: - لا تقم ببناء صفحة رئيسية.
?? 0469 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 61: - لا تقم ببناء واجهة منيو.
? 0470 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 62: - لا تقم ببناء checkout UI.
? 0471 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 63: - لا تقم ببناء admin panel UI.
?? 0472 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 64: - لا تقم ببناء responsive layouts.
?? 0473 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 65: - لا تقم باختيار خطوط.
?? 0474 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 66: - لا تقم باختيار theme بصري.
?? 0475 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 67: - لا تقم بإضافة animation libraries.
?? 0476 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 68: - لا تناقش تجربة المستخدم البصرية إلا إذا كانت معلومة لازمة فقط لفهم `backend data contracts`.
?? 0477 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 70: ## Delivery Style
?? 0478 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 71: - نفذ المهمة خطوة بخطوة.
?? 0479 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 72: - ابدأ دائمًا بالتخطيط الداخلي.
?? 0480 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 73: - ثم أنشئ هيكل المشروع.
?? 0481 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 74: - ثم أنشئ البنية الأساسية.
? 0482 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 75: - ثم أنشئ الموديولات الأساسية.
?? 0483 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 76: - ثم أنشئ الاختبارات.
?? 0484 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 77: - ثم أنشئ التوثيق.
?? 0485 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 78: - لا تتخطى المراحل.
?? 0486 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 80: ## Mandatory Internal Planning Before Coding
?? 0487 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 81: - Before writing implementation code, create a `plans/` directory.
?? 0488 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 82: - The `plans/` directory must exist at project root.
?? 0489 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 83: - Populate the directory with detailed markdown files first.
?? 0490 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 84: - Use the exact filenames below.
?? 0491 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 85: - `plans/00-full-project-overview.md`
?? 0492 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 86: - `plans/01-database-schema-and-models.md`
?? 0493 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 87: - `plans/02-api-endpoints-and-versioning.md`
?? 0494 | done | security | prompt-pack/00-master-backend-only-prompt.md line 88: - `plans/03-authentication-and-authorization.md`
?? 0495 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 89: - `plans/04-branches-and-menus-system.md`
?? 0496 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 90: - `plans/05-products-categories-sizes-addons.md`
?? 0497 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 91: - `plans/06-reviews-ratings-tags-best-sellers.md`
?? 0498 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 92: - `plans/07-users-profiles-addresses-wallet-giftcards.md`
?? 0499 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 93: - `plans/08-cart-orders-checkout-shipping-coupons.md`
?? 0500 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 94: - `plans/09-admin-roles-permissions-notifications.md`
?? 0501 | tested | security | prompt-pack/00-master-backend-only-prompt.md line 95: - `plans/10-security-best-practices-and-testing.md`
?? 0502 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 96: - `plans/11-localization-arabic-english.md`
? 0503 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 97: - `plans/12-scalability-and-future-mobile.md`
?? 0504 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 99: ## Planning File Quality Rules
?? 0505 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 100: - كل ملف يجب أن يكون مفصلًا.
?? 0506 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 101: - كل ملف يجب أن يوضح قرارات واضحة.
?? 0507 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 102: - كل ملف يجب أن يحتوي على تفاصيل تنفيذية عملية.
?? 0508 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 103: - كل ملف يجب أن يوضح العلاقات بين الموديولات.
?? 0509 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 104: - كل ملف يجب أن يوضح assumptions إن وجدت.
? 0510 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 105: - كل ملف يجب أن يساعد أي `AI coding agent` على المتابعة بدون غموض.
?? 0511 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 106: - كل ملف يجب أن يركز على الـ backend فقط.
? 0512 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 107: - لا تضف أي frontend tasks داخل ملفات `plans/`.
?? 0513 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 109: ## Root Folder Rules
?? 0514 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 110: - The active project folder must be `backend/`.
? 0515 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 111: - Do not create `frontend/`.
? 0516 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 112: - Do not create `frontendWebsite/`.
? 0517 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 113: - Do not create `android/`.
? 0518 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 114: - Do not create `ios/`.
? 0519 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 115: - If future folders are mentioned, mention them only as deferred scope.
?? 0520 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 116: - Current implementation scope is only `backend/`.
?? 0521 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 118: ## Backend Technical Stack
?? 0522 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 119: - Framework: `Laravel 13`.
?? 0523 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 120: - Language: `PHP 8.3+`.
?? 0524 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 121: - Database: `MySQL 8+`.
?? 0525 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 122: - Queue backend: `Redis`.
? 0526 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 123: - Queue monitoring: `Laravel Horizon`.
?? 0527 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 124: - Auth: `Laravel Sanctum`.
?? 0528 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 125: - Roles and permissions: `spatie/laravel-permission`.
?? 0529 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 126: - Development observability: `Laravel Telescope`.
?? 0530 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 127: - Development debugging: `Laravel Debugbar` only in local/dev if compatible.
?? 0531 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 128: - Performance option: `Laravel Octane` if compatible with the chosen runtime strategy.
?? 0532 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 129: - Testing: `PHPUnit` and/or `Pest` if you choose one consistently.
?? 0533 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 130: - Static analysis: `PHPStan`.
?? 0534 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 131: - Style: `PSR-12`.
?? 0535 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 133: ## Architecture Direction
?? 0536 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 134: - Favor a modular backend architecture.
? 0537 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 135: - Keep domain boundaries clear.
?? 0538 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 136: - Prefer `Service Layer`.
?? 0539 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 137: - Prefer `Repository Pattern` where it helps persistence abstraction.
?? 0540 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 138: - Use `Form Requests` for validation.
?? 0541 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 139: - Use `API Resources` for response formatting.
?? 0542 | done | security | prompt-pack/00-master-backend-only-prompt.md line 140: - Use `Policies` and `Gates` for authorization.
? 0543 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 141: - Use `Events`, `Listeners`, and `Jobs` for asynchronous or heavy flows.
?? 0544 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 142: - Use `DTOs` or clear data transfer boundaries when request payloads become complex.
?? 0545 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 143: - Use database transactions for multi-step state changes.
? 0546 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 145: ## Folder Organization Requirement
?? 0547 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 146: - Organize code in a way that stays maintainable as the system grows.
? 0548 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 147: - A modular or domain-oriented structure is preferred.
?? 0549 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 148: - Keep files small and purposeful.
?? 0550 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 149: - Avoid giant controllers.
?? 0551 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 150: - Avoid putting business logic directly inside controllers.
?? 0552 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 151: - Avoid fat models that contain unrelated responsibilities.
?? 0553 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 153: ## API Rules
?? 0554 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 154: - Every response must be JSON.
?? 0555 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 155: - Do not return HTML.
?? 0556 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 156: - Do not return rendered views.
?? 0557 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 157: - Use consistent HTTP status codes.
?? 0558 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 158: - Use API versioning from day one.
?? 0559 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 159: - Start with `/api/v1`.
?? 0560 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 160: - Keep room for `/api/v2` later.
? 0561 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 161: - Design endpoints for future mobile reuse.
?? 0562 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 162: - Make contracts explicit and stable.
?? 0563 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 164: ## Response Contract
?? 0564 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 165: - Use a consistent JSON envelope unless a stronger project convention is justified.
?? 0565 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 166: - A recommended envelope is:
?? 0566 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 167: - `success`
?? 0567 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 168: - `message`
?? 0568 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 169: - `data`
?? 0569 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 170: - `meta`
? 0570 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 171: - `errors`
?? 0571 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 172: - Keep pagination metadata consistent.
?? 0572 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 173: - Keep validation error shape predictable.
?? 0573 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 174: - Keep unauthorized and forbidden responses explicit.
?? 0574 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 176: ## Localization Rules
? 0575 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 177: - العربية هي اللغة الأساسية في المحتوى.
?? 0576 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 178: - الإنجليزية لغة مدعومة ثانية.
?? 0577 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 179: - Support `Accept-Language` header.
?? 0578 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 180: - Support at least `ar` and `en`.
?? 0579 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 181: - Store translatable business content in a backend-friendly way.
?? 0580 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 182: - Product names must support Arabic and English.
? 0581 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 183: - Product descriptions must support Arabic and English.
?? 0582 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 184: - Category names must support Arabic and English.
?? 0583 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 185: - Tag names must support Arabic and English if the product needs it.
?? 0584 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 186: - Dynamic pages must support Arabic and English.
?? 0585 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 187: - API messages should be localizable.
? 0586 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 189: ## Currency And Regionalization
?? 0587 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 190: - العملة الافتراضية يجب أن تكون قابلة للتغيير.
?? 0588 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 191: - Default currency can start as `EGP`.
?? 0589 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 192: - Currency label and symbol must come from settings.
?? 0590 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 193: - Do not hardcode a single currency forever.
?? 0591 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 194: - If conversion is introduced later, keep the architecture open for it.
? 0592 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 195: - Do not overbuild live exchange-rate integration unless explicitly required.
?? 0593 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 197: ## Settings Philosophy
?? 0594 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 198: - Everything configurable should be backend-managed through settings.
?? 0595 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 199: - Avoid hardcoded business toggles where possible.
?? 0596 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 200: - Use a `settings` strategy or table for dynamic values.
? 0597 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 201: - Support feature toggles.
?? 0598 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 202: - Support operational limits.
?? 0599 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 203: - Support default timings.
?? 0600 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 204: - Support branding metadata as backend-managed data only.
?? 0601 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 205: - Treat `theme JSON` as stored configuration, import/export, and validation concern.
? 0602 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 206: - Do not turn theme JSON into frontend rendering work.
?? 0603 | done | security | prompt-pack/00-master-backend-only-prompt.md line 208: ## Authentication Strategy
?? 0604 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 209: - Use `Laravel Sanctum`.
?? 0605 | done | security | prompt-pack/00-master-backend-only-prompt.md line 210: - Prefer token-based authentication for cross-platform clients.
?? 0606 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 211: - Use access tokens securely.
?? 0607 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 212: - Do not rely on browser-only sessions as the primary cross-platform strategy.
? 0608 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 213: - Support multiple devices.
?? 0609 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 214: - Support token revocation.
?? 0610 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 215: - Support logout from current device and all devices if needed.
?? 0611 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 216: - Normalize identity inputs before lookup.
?? 0612 | done | security | prompt-pack/00-master-backend-only-prompt.md line 217: - Convert username to lowercase before storage and authentication.
?? 0613 | done | security | prompt-pack/00-master-backend-only-prompt.md line 218: - Convert email to lowercase before storage and authentication.
?? 0614 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 220: ## Login Rules
?? 0615 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 221: - Allow login via `email` or `username`.
?? 0616 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 222: - Use normalized lowercase comparison.
?? 0617 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 223: - Return clear API responses for invalid credentials.
?? 0618 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 224: - Protect login endpoints with rate limiting.
? 0619 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 225: - Consider device metadata if useful for token labeling.
?? 0620 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 227: ## Password Rules
?? 0621 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 228: - Minimum length: `6`.
? 0622 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 229: - Require at least one letter.
? 0623 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 230: - Require at least one number.
? 0624 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 231: - Require at least one symbol.
? 0625 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 232: - Do not require overly complex enterprise-only restrictions beyond that.
?? 0626 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 233: - Reject passwords containing username if determinable.
?? 0627 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 234: - Reject passwords containing email if determinable.
?? 0628 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 235: - Reject passwords containing first name or last name if available.
?? 0629 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 236: - Keep the logic explicit and tested.
?? 0630 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 238: ## User Model Rules
?? 0631 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 239: - Every user has a unique primary phone number.
? 0632 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 240: - Primary phone number is required.
?? 0633 | suggested | suggestion | prompt-pack/00-master-backend-only-prompt.md line 241: - Secondary phone numbers are optional.
?? 0634 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 242: - Secondary phone numbers do not need global uniqueness.
? 0635 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 243: - Users can have multiple addresses.
?? 0636 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 244: - One address can be marked default.
?? 0637 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 245: - Users can have a wallet balance.
?? 0638 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 246: - Users can have a public username path.
?? 0639 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 247: - Profiles can expose public statistics based on privacy settings.
? 0640 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 249: ## Public Profile Rules
?? 0641 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 250: - Public profile path concept should map to an API contract.
?? 0642 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 251: - A possible path is `/api/v1/profiles/{username}` or similar.
? 0643 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 252: - Do not build a visual page.
?? 0644 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 253: - Return profile data as JSON only.
?? 0645 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 254: - Support privacy toggles.
? 0646 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 255: - Support public or private profile mode.
?? 0647 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 256: - Support toggling visibility for selected metrics.
?? 0648 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 257: - Metrics may include total orders.
?? 0649 | pending | todo | prompt-pack/00-master-backend-only-prompt.md line 258: - Metrics may include total spending.
?? 0650 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 259: - Metrics may include monthly rank.
?? 0651 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 260: - Metrics may include yearly rank.
? 0652 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 261: - Metrics may include favorite products.
?? 0653 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 263: ## Roles And Permissions
?? 0654 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 264: - Implement granular `RBAC`.
?? 0655 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 265: - Use `spatie/laravel-permission`.
?? 0656 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 266: - Support dynamic roles.
? 0657 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 267: - Support dynamic permissions.
?? 0658 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 268: - Support branch-scoped permissions.
?? 0659 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 269: - Support role names like `orders-manager-branch-1`.
?? 0660 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 270: - Support specialized roles such as support, order review, delivery management, content moderation, and settings management.
?? 0661 | done | security | prompt-pack/00-master-backend-only-prompt.md line 271: - Keep authorization logic explicit.
?? 0662 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 272: - Use `Policies` for resource-level checks.
? 0663 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 273: - Use `Gates` where broader ability checks make sense.
?? 0664 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 275: ## Super Admin Rule
?? 0665 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 276: - The first platform owner or explicit super-admin account must have full access.
?? 0666 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 277: - If using the legacy rule `id = 1`, make the behavior clear and deliberate.
?? 0667 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 278: - Prefer an explicit `super_admin` capability in code logic even if seeded from the first account.
? 0668 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 279: - All elevated logic must be auditable.
?? 0669 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 281: ## Auditability
?? 0670 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 282: - Important admin actions should be logged.
?? 0671 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 283: - Sensitive changes should be traceable.
?? 0672 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 284: - Consider audit logs for:
? 0673 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 285: - order status changes
?? 0674 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 286: - refunds
?? 0675 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 287: - wallet adjustments
?? 0676 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 288: - coupon creation and changes
?? 0677 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 289: - settings changes
?? 0678 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 290: - role and permission changes
? 0679 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 291: - branch enable/disable actions
?? 0680 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 293: ## Branch System
?? 0681 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 294: - Support one branch or many branches.
?? 0682 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 295: - Each branch has its own identity.
?? 0683 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 296: - Each branch can have address data.
? 0684 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 297: - Each branch can have contact data.
?? 0685 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 298: - Each branch can have coordinates.
?? 0686 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 299: - Each branch can have business hours.
?? 0687 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 300: - Each branch can have delivery zones.
?? 0688 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 301: - Each branch can have enable/disable state.
? 0689 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 303: ## Delivery Zones
?? 0690 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 304: - Delivery zones belong to a branch.
?? 0691 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 305: - Each delivery zone can have its own fee.
?? 0692 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 306: - Each delivery zone can have its own availability state.
?? 0693 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 307: - Delivery fees must be configurable.
?? 0694 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 308: - Delivery zone validation must happen during checkout.
?? 0695 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 309: - Delivery fee calculation must be deterministic and testable.
?? 0696 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 311: ## Branch Availability Logic
?? 0697 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 312: - Products may be available in all branches.
?? 0698 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 313: - Products may be available in selected branches only.
?? 0699 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 314: - The data model must support both cases.
? 0700 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 315: - Checkout must reject carts that cannot be fulfilled by the selected branch.
?? 0701 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 316: - Error responses must clearly identify unavailable items.
?? 0702 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 317: - Validation must happen before order creation is finalized.
?? 0703 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 319: ## Menu And Category System
?? 0704 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 320: - Categories can be nested.
? 0705 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 321: - Support parent and child categories.
?? 0706 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 322: - Allow a product to belong to multiple categories.
?? 0707 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 323: - Support tags as separate many-to-many metadata.
?? 0708 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 324: - Support products appearing in multiple logical groupings.
?? 0709 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 325: - Keep category querying efficient.
?? 0710 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 326: - Avoid N+1 problems in menu endpoints.
?? 0711 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 328: ## Product Core Fields
?? 0712 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 329: - Product name in Arabic and English.
?? 0713 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 330: - Product description in Arabic and English.
?? 0714 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 331: - Product short description if needed.
?? 0715 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 332: - Product base availability state.
? 0716 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 333: - Product per-branch availability state when applicable.
?? 0717 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 334: - Product stock toggle if limited stock is enabled.
?? 0718 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 335: - Product media references.
?? 0719 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 336: - Product sort behavior support.
?? 0720 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 337: - Product tags.
?? 0721 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 338: - Product best seller flags or computed ranking metadata.
?? 0722 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 340: ## Media Rules
?? 0723 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 341: - Each product can have a primary image.
?? 0724 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 342: - Each product can have a gallery of images.
?? 0725 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 343: - Each product can have uploaded videos if supported.
?? 0726 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 344: - Each product can have external video links such as YouTube.
? 0727 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 345: - Media validation must be strict.
?? 0728 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 346: - Store media metadata cleanly.
? 0729 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 347: - Do not embed frontend slideshow logic.
?? 0730 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 348: - Expose media as JSON structures only.
?? 0731 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 350: ## Variants And Sizes
? 0732 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 351: - Support variant-like sizes.
?? 0733 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 352: - Example sizes: `small`, `medium`, `large`.
?? 0734 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 353: - Each size can have its own price.
?? 0735 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 354: - Sizes can influence available add-ons.
?? 0736 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 355: - Sizes must be validated at add-to-cart and checkout time.
?? 0737 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 356: - Price snapshots should be handled carefully when the order is created.
?? 0738 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 358: ## Add-On System
?? 0739 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 359: - Support add-on groups.
?? 0740 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 360: - Support `single-select` behavior.
?? 0741 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 361: - Support `multi-select` behavior.
? 0742 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 362: - Support required and optional groups if needed.
? 0743 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 363: - Support add-on pricing.
? 0744 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 364: - Support size-specific add-on pricing when the business rule requires it.
?? 0745 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 365: - Validate min/max selection counts if defined.
? 0746 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 366: - Keep the data model explicit enough for future app clients.
?? 0747 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 368: ## Cart Rules
? 0748 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 369: - Cart must support same product with different configurations.
?? 0749 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 370: - A line item is not just product ID.
?? 0750 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 371: - A line item must include configuration identity.
?? 0751 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 372: - Quantity must be per configured line item.
?? 0752 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 373: - Price recalculation must be controlled.
?? 0753 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 374: - Cart validation must detect unavailable branches.
? 0754 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 375: - Cart validation must detect disabled products.
?? 0755 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 376: - Cart validation must detect invalid size or add-on combinations.
?? 0756 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 377: - Cart validation should detect stock issues if stock control is enabled.
?? 0757 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 379: ## Order Creation Rules
?? 0758 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 380: - Checkout must validate branch selection.
? 0759 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 381: - Checkout must validate delivery zone selection.
?? 0760 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 382: - Checkout must validate product availability in the chosen branch.
?? 0761 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 383: - Checkout must validate pricing integrity.
?? 0762 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 384: - Checkout must validate coupon rules.
?? 0763 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 385: - Checkout must validate payment method compatibility.
?? 0764 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 386: - Checkout must sanitize customer notes.
? 0765 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 387: - Checkout must persist a reliable pricing snapshot.
?? 0766 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 389: ## Order Status Lifecycle
?? 0767 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 390: - Use an explicit order state machine or well-defined transitions.
?? 0768 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 391: - Core statuses should cover:
?? 0769 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 392: - `created`
?? 0770 | pending | todo | prompt-pack/00-master-backend-only-prompt.md line 393: - `pending`
?? 0771 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 394: - `confirmed`
?? 0772 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 395: - `preparing`
?? 0773 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 396: - `out_for_delivery`
?? 0774 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 397: - `delivered`
?? 0775 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 398: - `cancelled`
? 0776 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 399: - `refunded`
?? 0777 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 400: - If additional statuses are needed, define them clearly and document transitions.
?? 0778 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 402: ## Grace Period Rule
?? 0779 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 403: - There is a `2-minute` grace period after order creation.
?? 0780 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 404: - During this window, the customer can cancel instantly.
? 0781 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 405: - During this window, the customer can update notes if the design allows it.
?? 0782 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 406: - After this window, the order becomes locked for immediate self-edit/cancel behavior.
?? 0783 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 407: - The timing value should be configurable through settings.
?? 0784 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 408: - The implementation must be testable.
?? 0785 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 410: ## Delivery Assignment
? 0786 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 411: - Orders may have assigned delivery personnel.
?? 0787 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 412: - Store delivery person name if needed.
?? 0788 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 413: - Store delivery person phone if needed.
?? 0789 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 414: - Expose safe tracking information to the customer API.
?? 0790 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 415: - Do not expose internal data unnecessarily.
? 0791 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 417: ## Reviews And Ratings
?? 0792 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 418: - Reviews must be tied to verified purchases.
?? 0793 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 419: - Allow rating values from `1` to `5`.
?? 0794 | suggested | suggestion | prompt-pack/00-master-backend-only-prompt.md line 420: - Allow optional comment text.
?? 0795 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 421: - Allow anonymous display option.
?? 0796 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 422: - Support admin moderation.
? 0797 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 423: - Support admin removal of abusive reviews.
?? 0798 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 424: - Support manually created marketing reviews only if explicitly authorized by admin functionality and documented clearly.
?? 0799 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 425: - Keep fake review injection restricted to privileged roles.
?? 0800 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 427: ## Review Integrity Rules
?? 0801 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 428: - A user should only review a product they purchased through a completed or eligible order state.
? 0802 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 429: - If repeated purchases allow repeated reviews, define the rule explicitly.
?? 0803 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 430: - Prevent duplicate abuse if the business rule says only one review per fulfilled line item.
?? 0804 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 431: - Keep moderation actions auditable.
?? 0805 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 433: ## Wallet System
?? 0806 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 434: - Users can have wallet balance.
? 0807 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 435: - Wallet must support credit and debit operations.
?? 0808 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 436: - Wallet changes must be logged.
?? 0809 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 437: - Refunds can credit the wallet when business rules allow.
?? 0810 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 438: - Wallet should support use during checkout.
?? 0811 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 439: - If partial wallet usage is allowed, implement it explicitly and test it.
? 0812 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 441: ## Gift Card System
?? 0813 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 442: - Gift cards are backend-controlled.
?? 0814 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 443: - Gift cards can be enabled or disabled via settings.
?? 0815 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 444: - Gift cards use redeemable codes.
?? 0816 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 445: - Redeeming a valid code credits wallet balance.
?? 0817 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 446: - Codes must be unique.
? 0818 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 447: - Code usage rules must be explicit.
?? 0819 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 448: - Expiry rules must be explicit if used.
?? 0820 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 449: - Redemption must be transactional.
?? 0821 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 451: ## Coupon System
?? 0822 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 452: - Coupons may be fixed amount or percentage.
? 0823 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 453: - Percentage coupons may have maximum discount caps.
? 0824 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 454: - Coupons may require minimum cart value.
?? 0825 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 455: - Coupons may target:
?? 0826 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 456: - all products
?? 0827 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 457: - specific products
?? 0828 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 458: - specific categories
? 0829 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 459: - delivery only
?? 0830 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 460: - products only
?? 0831 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 461: - products plus delivery
?? 0832 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 462: - Coupons may have per-user limits.
?? 0833 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 463: - Coupons may have global usage limits.
?? 0834 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 464: - Coupons may have start and end validity windows.
? 0835 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 465: - Coupons may have first-order restrictions if required.
?? 0836 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 467: ## Coupon Edge Rules
? 0837 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 468: - Never convert unused discount remainder into wallet money unless explicitly required.
?? 0838 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 469: - If discount exceeds eligible subtotal, cap the applied discount at the eligible amount.
?? 0839 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 470: - If a coupon excludes delivery fees, do not discount delivery fees.
? 0840 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 471: - If a delivery-only coupon is used, apply it only to delivery amount.
?? 0841 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 472: - Return clear calculation metadata in the API response.
?? 0842 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 474: ## Payment System
?? 0843 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 475: - Initial payment methods:
?? 0844 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 476: - `cash_on_delivery`
? 0845 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 477: - `wallet`
? 0846 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 478: - Architecture must stay open for future gateways.
?? 0847 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 479: - Do not tightly couple order logic to one gateway.
?? 0848 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 480: - Use a payment strategy or provider abstraction where useful.
?? 0849 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 481: - Keep gateway additions isolated.
? 0850 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 482: - Future gateways may include regional providers.
?? 0851 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 484: ## Notifications
?? 0852 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 485: - Support database notifications.
?? 0853 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 486: - Support email notifications.
?? 0854 | suggested | suggestion | prompt-pack/00-master-backend-only-prompt.md line 487: - Keep broadcasting optional and configurable.
?? 0855 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 488: - Admins should receive operational notifications where appropriate.
? 0856 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 489: - Customers should receive order-state notifications where appropriate.
?? 0857 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 490: - Notification channels must be configurable where reasonable.
?? 0858 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 492: ## Mail Configuration
?? 0859 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 493: - Email support must be toggleable.
?? 0860 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 494: - Mail transport configuration must be environment-driven.
? 0861 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 495: - If multiple mail modes are supported, document them clearly.
?? 0862 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 496: - Avoid hardcoding secrets.
?? 0863 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 497: - Use queueing for heavy email work where sensible.
?? 0864 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 499: ## Settings And Dynamic Pages
?? 0865 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 500: - General settings should include site-level metadata.
? 0866 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 501: - Examples:
?? 0867 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 502: - site name
?? 0868 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 503: - site contact info
?? 0869 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 504: - default currency
?? 0870 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 505: - logos or asset paths as backend-managed references
?? 0871 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 506: - operational toggles
? 0872 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 507: - order grace period duration
?? 0873 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 508: - gift card enable/disable
?? 0874 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 509: - wallet enable/disable if needed
?? 0875 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 510: - maintenance flags if needed
?? 0876 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 511: - Dynamic pages such as TOS or Privacy can be modeled as backend-managed content entities.
?? 0877 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 512: - Expose them via APIs.
? 0878 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 513: - Do not build their rendered frontend pages.
?? 0879 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 515: ## Search, Filter, Sort
?? 0880 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 516: - Menu APIs must support searching by relevant fields.
?? 0881 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 517: - Search may include name.
?? 0882 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 518: - Search may include tags.
? 0883 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 519: - Search may include categories.
? 0884 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 520: - Filter options must be designed for future clients.
?? 0885 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 521: - Sorting should support clear documented options.
?? 0886 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 522: - Keep query performance under control.
?? 0887 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 523: - Add indexes where needed.
? 0888 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 525: ## Best Sellers And Rankings
?? 0889 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 526: - Support top-selling indicators.
?? 0890 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 527: - Support manual pinning if business needs it.
? 0891 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 528: - Support per-category ranking if required.
?? 0892 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 529: - Make the source of truth explicit.
?? 0893 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 530: - Cache expensive computations if needed.
?? 0894 | done | security | prompt-pack/00-master-backend-only-prompt.md line 532: ## Security First Principles
?? 0895 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 533: - Never trust client input.
?? 0896 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 534: - Validate all request payloads.
?? 0897 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 535: - Sanitize free-text fields when needed.
?? 0898 | done | security | prompt-pack/00-master-backend-only-prompt.md line 536: - Protect against XSS.
?? 0899 | done | security | prompt-pack/00-master-backend-only-prompt.md line 537: - Protect against SQL injection by safe ORM/query usage and validation.
?? 0900 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 538: - Protect against mass assignment.
?? 0901 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 539: - Protect file uploads.
?? 0902 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 540: - Protect token misuse.
?? 0903 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 541: - Limit sensitive endpoint rates.
?? 0904 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 542: - Keep secrets in environment configuration.
?? 0905 | done | security | prompt-pack/00-master-backend-only-prompt.md line 544: ## Special Security Attention Areas
?? 0906 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 545: - Order notes.
?? 0907 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 546: - Review comments.
?? 0908 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 547: - Profile fields.
?? 0909 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 548: - Uploaded media metadata.
? 0910 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 549: - Coupon codes and redeem flows.
?? 0911 | done | security | prompt-pack/00-master-backend-only-prompt.md line 550: - Authentication endpoints.
?? 0912 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 551: - Password reset flows if implemented.
?? 0913 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 552: - Admin-only endpoints.
?? 0914 | done | security | prompt-pack/00-master-backend-only-prompt.md line 554: ## File Upload Security
? 0915 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 555: - Validate mime types.
?? 0916 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 556: - Validate file size.
?? 0917 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 557: - Validate allowed extensions.
?? 0918 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 558: - Store files safely.
?? 0919 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 559: - Do not trust user-provided filenames blindly.
?? 0920 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 560: - Consider malware-scan hooks or simulation points if a real scanner is unavailable.
? 0921 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 561: - Restrict executable content risk.
?? 0922 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 563: ## CORS And Token Stability
?? 0923 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 564: - Configure `CORS` deliberately.
?? 0924 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 565: - Do not allow broken auth flows that randomly log users out.
?? 0925 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 566: - Keep token-based auth stable across routes.
? 0926 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 567: - Keep logout behavior explicit.
?? 0927 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 568: - Keep revoke behavior explicit.
?? 0928 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 569: - Test auth state across protected endpoints.
?? 0929 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 571: ## Error Handling
?? 0930 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 572: - Use consistent JSON errors.
? 0931 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 573: - Use proper HTTP codes.
?? 0932 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 574: - Do not leak stack traces in production.
?? 0933 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 575: - Log useful diagnostic information safely.
? 0934 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 576: - Distinguish validation errors from authorization errors.
?? 0935 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 578: ## Performance Rules
? 0936 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 579: - Use eager loading thoughtfully.
?? 0937 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 580: - Avoid N+1 problems.
?? 0938 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 581: - Cache expensive repeated lookups.
?? 0939 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 582: - Cache settings where appropriate.
?? 0940 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 583: - Cache category trees where appropriate.
?? 0941 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 584: - Cache top-selling data where appropriate.
? 0942 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 585: - Use queues for heavy background work.
?? 0943 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 586: - Keep invalidation strategy documented.
? 0944 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 588: ## Testing Requirements
?? 0945 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 589: - Write `Feature tests`.
?? 0946 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 590: - Write `Unit tests`.
?? 0947 | tested | security | prompt-pack/00-master-backend-only-prompt.md line 591: - Write authorization tests.
?? 0948 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 592: - Write validation tests.
?? 0949 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 593: - Write branch availability tests.
?? 0950 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 594: - Write coupon calculation tests.
?? 0951 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 595: - Write wallet and gift card tests.
?? 0952 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 596: - Write order grace-period tests.
?? 0953 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 597: - Write localization tests where relevant.
?? 0954 | tested | security | prompt-pack/00-master-backend-only-prompt.md line 598: - Write security-focused tests for sanitization-sensitive flows.
?? 0955 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 600: ## Code Quality Rules
?? 0956 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 601: - Follow `PSR-12`.
?? 0957 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 602: - Keep naming consistent.
? 0958 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 603: - Prefer explicitness over cleverness.
?? 0959 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 604: - Keep classes focused.
?? 0960 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 605: - Use PHPDoc where it clarifies complex contracts.
?? 0961 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 606: - Use strict validation objects.
?? 0962 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 607: - Avoid duplicated business logic.
?? 0963 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 608: - Avoid unexplained magic values.
? 0964 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 610: ## Documentation Requirements
?? 0965 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 611: - Create a high-quality `README.md`.
?? 0966 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 612: - Explain setup clearly.
?? 0967 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 613: - Explain environment variables clearly.
? 0968 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 614: - Explain queue requirements clearly.
? 0969 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 615: - Explain Redis usage clearly.
?? 0970 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 616: - Explain API versioning clearly.
?? 0971 | done | security | prompt-pack/00-master-backend-only-prompt.md line 617: - Explain authentication flow clearly.
?? 0972 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 618: - Explain testing commands clearly.
?? 0973 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 619: - Explain key business modules clearly.
? 0974 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 621: ## Implementation Order
?? 0975 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 622: - Step 1: create internal planning docs in `plans/`.
?? 0976 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 623: - Step 2: scaffold `backend/` Laravel 13 project.
?? 0977 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 624: - Step 3: configure core packages and environment examples.
?? 0978 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 625: - Step 4: establish API versioning structure.
?? 0979 | done | security | prompt-pack/00-master-backend-only-prompt.md line 626: - Step 5: implement authentication and user foundations.
?? 0980 | done | security | prompt-pack/00-master-backend-only-prompt.md line 627: - Step 6: implement roles, permissions, and admin authorization foundations.
?? 0981 | done | customization | prompt-pack/00-master-backend-only-prompt.md line 628: - Step 7: implement branches, delivery zones, and settings.
?? 0982 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 629: - Step 8: implement categories, tags, products, sizes, media, and add-ons.
?? 0983 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 630: - Step 9: implement carts, pricing validation, and checkout.
?? 0984 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 631: - Step 10: implement coupons, wallet, and gift cards.
?? 0985 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 632: - Step 11: implement orders, status transitions, and notifications.
? 0986 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 633: - Step 12: implement reviews, public profiles, and privacy controls.
?? 0987 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 634: - Step 13: implement tests.
?? 0988 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 635: - Step 14: finalize docs.
?? 0989 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 637: ## Output Rules For The Downstream Agent
?? 0990 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 638: - Show meaningful progress.
? 0991 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 639: - Keep changes organized.
?? 0992 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 640: - Use small files and reusable components.
?? 0993 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 641: - Do not create unrelated artifacts.
? 0994 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 642: - Do not add placeholder frontend files.
? 0995 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 643: - Do not silently skip hard requirements.
? 0996 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 644: - If a requirement is unclear, choose the safest backend-compatible default and document it.
? 0997 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 646: ## Explicit Frontend Exclusion Reminder
? 0998 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 647: - Ignore all frontend parts from the original brief.
?? 0999 | partial | spec | prompt-pack/00-master-backend-only-prompt.md line 648: - Ignore all requests about website design.
?? 1000 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 649: - Ignore all requests about CSS frameworks.
?? 1001 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 650: - Ignore all requests about JavaScript frameworks.
? 1002 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 651: - Ignore all requests about animations.
? 1003 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 652: - Ignore all requests about UI themes except storing backend-managed theme configuration data.
?? 1004 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 653: - Ignore all requests about rendering pages.
?? 1005 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 655: ## Deferred Scope Reminder
? 1006 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 656: - `Android` is future scope only.
? 1007 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 657: - `iOS` is future scope only.
? 1008 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 658: - Any website client is future scope only.
? 1009 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 659: - Current mission is to make the backend ready for those future clients.
?? 1010 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 661: ## Definition Of Done
?? 1011 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 662: - A Laravel 13 backend exists under `backend/`.
?? 1012 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 663: - The codebase is API-only.
?? 1013 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 664: - The codebase exposes versioned JSON APIs.
? 1014 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 665: - The codebase includes modular domain logic.
?? 1015 | done | security | prompt-pack/00-master-backend-only-prompt.md line 666: - The codebase includes secure authentication and authorization.
? 1016 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 667: - The codebase includes the required business modules.
?? 1017 | tested | verification | prompt-pack/00-master-backend-only-prompt.md line 668: - The codebase includes tests.
? 1018 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 669: - The codebase includes documentation.
?? 1019 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 670: - The codebase includes internal `plans/*.md`.
? 1020 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 671: - The codebase contains no frontend implementation artifacts.
?? 1021 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 673: ## Final Self-Check
?? 1022 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 674: - Did you stay backend-only from start to finish.
? 1023 | out_of_scope_backend_only | scope | prompt-pack/00-master-backend-only-prompt.md line 675: - Did you avoid frontend generation entirely.
?? 1024 | planned | planning | prompt-pack/00-master-backend-only-prompt.md line 676: - Did you create `plans/00` through `plans/12` before coding.
?? 1025 | tested | spec | prompt-pack/00-master-backend-only-prompt.md line 677: - Did you keep `backend/` as the only active project folder.
?? 1026 | done | api_contract | prompt-pack/00-master-backend-only-prompt.md line 678: - Did you keep all responses and contracts JSON-only.
?? 1027 | planned | spec | prompt-pack/00-master-backend-only-prompt.md line 679: - Did you normalize username and email to lowercase.
?? 1028 | suggested | spec | prompt-pack/00-master-backend-only-prompt.md line 680: - Did you protect notes and other free text from unsafe handling.
? 1029 | backlog_future | spec | prompt-pack/00-master-backend-only-prompt.md line 681: - Did you define order status rules clearly.
?? 1030 | done | spec | prompt-pack/00-master-backend-only-prompt.md line 682: - Did you implement or document coupon edge cases correctly.
? 1031 | backlog_future | future | prompt-pack/00-master-backend-only-prompt.md line 683: - Did you keep the architecture open for future mobile clients.
?? 1032 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 1: # Architecture And Spec Companion
?? 1033 | done | spec | prompt-pack/01-architecture-spec-companion.md line 3: ## Purpose
?? 1034 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 4: - هذا الملف ليس prompt بديلًا.
?? 1035 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 5: - هذا الملف companion spec.
?? 1036 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 6: - يستخدم مع الملف الأساسي.
?? 1037 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 7: - يوضح architecture boundaries.
? 1038 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 8: - يوضح module responsibilities.
?? 1039 | done | spec | prompt-pack/01-architecture-spec-companion.md line 9: - يوضح data ownership.
?? 1040 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 10: - يوضح backend contracts المطلوبة.
?? 1041 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 12: ## Product Intent
?? 1042 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 13: - النظام هو منصة مطعم أونلاين عربية/مصرية.
?? 1043 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 14: - الهدف هو backend API متقدم.
?? 1044 | done | spec | prompt-pack/01-architecture-spec-companion.md line 15: - العملاء المستقبلية قد تكون:
?? 1045 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 16: - `web client`
? 1046 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 17: - `Android app`
? 1047 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 18: - `iOS app`
?? 1048 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 19: - التطبيق الحالي المطلوب الآن:
? 1049 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 20: - `backend only`
?? 1050 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 22: ## Architectural Principles
?? 1051 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 23: - API-first.
? 1052 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 24: - Domain-oriented design.
?? 1053 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 25: - Clear separation of concerns.
? 1054 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 26: - Business logic outside controllers.
?? 1055 | tested | security | prompt-pack/01-architecture-spec-companion.md line 27: - Authorization explicit and testable.
? 1056 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 28: - Validation centralized in request objects and domain services.
?? 1057 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 29: - Pricing logic isolated from transport logic.
?? 1058 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 30: - State transitions explicit and auditable.
?? 1059 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 32: ## Suggested Top-Level Structure
?? 1060 | done | spec | prompt-pack/01-architecture-spec-companion.md line 33: - `backend/app/Modules`
?? 1061 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 34: - `backend/app/Shared`
?? 1062 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 35: - `backend/app/Providers`
?? 1063 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 36: - `backend/config`
?? 1064 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 37: - `backend/database`
?? 1065 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 38: - `backend/routes`
?? 1066 | tested | verification | prompt-pack/01-architecture-spec-companion.md line 39: - `backend/tests`
?? 1067 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 41: ## Suggested Module List
?? 1068 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 42: - `Auth`
?? 1069 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 43: - `Users`
? 1070 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 44: - `Profiles`
?? 1071 | done | spec | prompt-pack/01-architecture-spec-companion.md line 45: - `Addresses`
?? 1072 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 46: - `Wallet`
?? 1073 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 47: - `GiftCards`
?? 1074 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 48: - `Branches`
?? 1075 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 49: - `DeliveryZones`
? 1076 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 50: - `Categories`
?? 1077 | done | spec | prompt-pack/01-architecture-spec-companion.md line 51: - `Tags`
?? 1078 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 52: - `Products`
?? 1079 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 53: - `ProductMedia`
?? 1080 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 54: - `Variants`
?? 1081 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 55: - `Addons`
? 1082 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 56: - `Cart`
?? 1083 | done | spec | prompt-pack/01-architecture-spec-companion.md line 57: - `Orders`
?? 1084 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 58: - `Coupons`
?? 1085 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 59: - `Payments`
?? 1086 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 60: - `Reviews`
?? 1087 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 61: - `Notifications`
?? 1088 | done | customization | prompt-pack/01-architecture-spec-companion.md line 62: - `Settings`
?? 1089 | done | spec | prompt-pack/01-architecture-spec-companion.md line 63: - `DynamicPages`
?? 1090 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 64: - `Admin`
?? 1091 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 65: - `AuditLogs`
?? 1092 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 67: ## Suggested Internal Module Layout
? 1093 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 68: - `Controllers`
?? 1094 | done | spec | prompt-pack/01-architecture-spec-companion.md line 69: - `Requests`
?? 1095 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 70: - `Resources`
?? 1096 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 71: - `Services`
?? 1097 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 72: - `Repositories`
?? 1098 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 73: - `DTOs`
? 1099 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 74: - `Policies`
?? 1100 | done | spec | prompt-pack/01-architecture-spec-companion.md line 75: - `Actions`
?? 1101 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 76: - `Enums`
?? 1102 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 77: - `Exceptions`
?? 1103 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 78: - `Support`
?? 1104 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 80: ## Shared Layer Suggestions
?? 1105 | done | spec | prompt-pack/01-architecture-spec-companion.md line 81: - `Shared/Http`
?? 1106 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 82: - `Shared/Responses`
?? 1107 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 83: - `Shared/Concerns`
?? 1108 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 84: - `Shared/Enums`
?? 1109 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 85: - `Shared/Traits`
? 1110 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 86: - `Shared/Services`
?? 1111 | done | spec | prompt-pack/01-architecture-spec-companion.md line 87: - `Shared/Support`
?? 1112 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 88: - `Shared/Exceptions`
?? 1113 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 89: - `Shared/ValueObjects`
?? 1114 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 91: ## Why Modular Laravel Here
? 1115 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 92: - كثافة المتطلبات كبيرة.
?? 1116 | done | spec | prompt-pack/01-architecture-spec-companion.md line 93: - الموديولات كثيرة.
?? 1117 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 94: - قواعد التسعير معقدة.
?? 1118 | done | security | prompt-pack/01-architecture-spec-companion.md line 95: - الـ authorization granular.
?? 1119 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 96: - الإدارة متعددة الفروع تحتاج boundaries واضحة.
?? 1120 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 97: - فصل الدومينات يجعل التطوير والاختبار أسهل.
?? 1121 | done | spec | prompt-pack/01-architecture-spec-companion.md line 99: ## Request Flow
?? 1122 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 100: 1. Client sends HTTP request.
?? 1123 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 101: 2. Route resolves versioned endpoint.
?? 1124 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 102: 3. Middleware authenticates and normalizes request context.
?? 1125 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 103: 4. `FormRequest` validates structure and primitive rules.
? 1126 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 104: 5. Controller delegates to `Service` or `Action`.
? 1127 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 105: 6. Service calls repositories and domain helpers.
? 1128 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 106: 7. Domain rules run.
?? 1129 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 107: 8. Database transactions protect multi-write flows.
?? 1130 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 108: 9. Events fire for side effects.
?? 1131 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 109: 10. API Resource formats final JSON response.
?? 1132 | done | spec | prompt-pack/01-architecture-spec-companion.md line 111: ## Response Philosophy
?? 1133 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 112: - Keep response contracts stable.
?? 1134 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 113: - Keep successful payloads predictable.
?? 1135 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 114: - Keep metadata consistent.
?? 1136 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 115: - Keep pagination schema consistent.
? 1137 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 116: - Keep business calculation fields explicit.
?? 1138 | done | spec | prompt-pack/01-architecture-spec-companion.md line 117: - Return human-safe localized messages.
?? 1139 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 118: - Return machine-safe structured errors.
?? 1140 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 120: ## API Versioning Strategy
?? 1141 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 121: - All routes begin with `/api/v1`.
?? 1142 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 122: - Version is grouped at route file and namespace level.
?? 1143 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 123: - New major behavioral changes go to `/api/v2`.
?? 1144 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 124: - Minor additions should be backward-compatible.
?? 1145 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 125: - Deprecation must be documented.
?? 1146 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 127: ## Route Group Strategy
?? 1147 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 128: - `/api/v1/auth/*`
?? 1148 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 129: - `/api/v1/profile/*`
?? 1149 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 130: - `/api/v1/branches/*`
?? 1150 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 131: - `/api/v1/menu/*`
?? 1151 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 132: - `/api/v1/products/*`
?? 1152 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 133: - `/api/v1/cart/*`
?? 1153 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 134: - `/api/v1/orders/*`
?? 1154 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 135: - `/api/v1/coupons/*`
?? 1155 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 136: - `/api/v1/wallet/*`
?? 1156 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 137: - `/api/v1/gift-cards/*`
?? 1157 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 138: - `/api/v1/reviews/*`
?? 1158 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 139: - `/api/v1/settings/*`
?? 1159 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 140: - `/api/v1/pages/*`
?? 1160 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 141: - `/api/v1/admin/*`
? 1161 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 143: ## Suggested Data Model Domains
? 1162 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 144: - Identity domain.
? 1163 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 145: - Catalog domain.
? 1164 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 146: - Ordering domain.
? 1165 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 147: - Fulfillment domain.
? 1166 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 148: - Billing domain.
? 1167 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 149: - Administration domain.
? 1168 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 150: - Configuration domain.
? 1169 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 151: - Communication domain.
? 1170 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 153: ## Identity Domain
?? 1171 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 154: - Users.
?? 1172 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 155: - Admin accounts if same user model, differentiated by roles.
?? 1173 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 156: - Access tokens.
?? 1174 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 157: - Password resets if implemented.
? 1175 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 158: - Email verification if needed.
?? 1176 | done | spec | prompt-pack/01-architecture-spec-companion.md line 159: - Phone verification if needed.
?? 1177 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 160: - Device sessions metadata if tracked.
? 1178 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 162: ## Catalog Domain
?? 1179 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 163: - Categories.
? 1180 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 164: - Tags.
?? 1181 | done | spec | prompt-pack/01-architecture-spec-companion.md line 165: - Products.
?? 1182 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 166: - Product translations if not using JSON columns.
?? 1183 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 167: - Product media.
?? 1184 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 168: - Product variants or sizes.
?? 1185 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 169: - Add-on groups.
? 1186 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 170: - Add-on options.
?? 1187 | done | spec | prompt-pack/01-architecture-spec-companion.md line 171: - Branch availability pivots.
?? 1188 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 172: - Best-seller ranking metadata.
? 1189 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 174: ## Ordering Domain
?? 1190 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 175: - Cart.
? 1191 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 176: - Cart items.
?? 1192 | done | spec | prompt-pack/01-architecture-spec-companion.md line 177: - Order.
?? 1193 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 178: - Order items.
?? 1194 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 179: - Order item add-ons.
?? 1195 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 180: - Order status transitions.
?? 1196 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 181: - Checkout calculations.
? 1197 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 182: - Grace-period edit/cancel rules.
? 1198 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 184: ## Fulfillment Domain
?? 1199 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 185: - Branches.
?? 1200 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 186: - Delivery zones.
?? 1201 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 187: - Delivery assignments.
? 1202 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 188: - Branch hours.
?? 1203 | done | spec | prompt-pack/01-architecture-spec-companion.md line 189: - Availability windows if needed later.
? 1204 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 191: ## Billing Domain
?? 1205 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 192: - Coupon definitions.
?? 1206 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 193: - Coupon usage records.
? 1207 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 194: - Wallet balances.
?? 1208 | done | spec | prompt-pack/01-architecture-spec-companion.md line 195: - Wallet transactions.
?? 1209 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 196: - Gift cards.
?? 1210 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 197: - Gift card redemptions.
?? 1211 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 198: - Payment attempts.
?? 1212 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 199: - Payment method adapters.
? 1213 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 201: ## Configuration Domain
?? 1214 | done | customization | prompt-pack/01-architecture-spec-companion.md line 202: - Settings.
?? 1215 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 203: - Feature toggles.
?? 1216 | done | customization | prompt-pack/01-architecture-spec-companion.md line 204: - Currency settings.
?? 1217 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 205: - Theme JSON storage.
?? 1218 | done | customization | prompt-pack/01-architecture-spec-companion.md line 206: - Localization settings.
?? 1219 | done | customization | prompt-pack/01-architecture-spec-companion.md line 207: - Mail settings references.
?? 1220 | done | customization | prompt-pack/01-architecture-spec-companion.md line 208: - Notification channel settings.
? 1221 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 210: ## Communication Domain
?? 1222 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 211: - Notifications.
? 1223 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 212: - Broadcast events if enabled.
?? 1224 | done | spec | prompt-pack/01-architecture-spec-companion.md line 213: - Email jobs.
?? 1225 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 214: - Audit events.
? 1226 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 216: ## Admin Domain
?? 1227 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 217: - Roles.
? 1228 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 218: - Permissions.
?? 1229 | done | spec | prompt-pack/01-architecture-spec-companion.md line 219: - Admin-only reports.
?? 1230 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 220: - Moderation actions.
?? 1231 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 221: - Content management endpoints.
?? 1232 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 223: ## Core Entity Notes
? 1233 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 224: - `User` is central but should not own every concern directly.
?? 1234 | done | spec | prompt-pack/01-architecture-spec-companion.md line 225: - `Branch` is central to ordering constraints.
?? 1235 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 226: - `Product` is central to catalog and checkout calculations.
?? 1236 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 227: - `Order` is central to financial and operational workflows.
?? 1237 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 228: - `Coupon` logic must remain isolated because it has many edge cases.
?? 1238 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 229: - `WalletTransaction` should be append-only friendly.
?? 1239 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 231: ## Suggested Relationship Overview
?? 1240 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 232: ```text
?? 1241 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 233: User
?? 1242 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 234: ├─ hasMany Addresses
?? 1243 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 235: ├─ hasOne Wallet
? 1244 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 236: ├─ hasMany Orders
?? 1245 | done | spec | prompt-pack/01-architecture-spec-companion.md line 237: ├─ hasMany Reviews
?? 1246 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 238: ├─ hasMany WalletTransactions
?? 1247 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 239: └─ belongsToMany Roles
?? 1248 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 241: Branch
? 1249 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 242: ├─ hasMany DeliveryZones
?? 1250 | done | spec | prompt-pack/01-architecture-spec-companion.md line 243: ├─ belongsToMany Products
?? 1251 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 244: └─ hasMany Orders
?? 1252 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 246: Category
?? 1253 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 247: ├─ belongsTo Category (parent)
? 1254 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 248: ├─ hasMany Categories (children)
?? 1255 | done | spec | prompt-pack/01-architecture-spec-companion.md line 249: └─ belongsToMany Products
?? 1256 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 251: Product
?? 1257 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 252: ├─ belongsToMany Categories
?? 1258 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 253: ├─ belongsToMany Tags
? 1259 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 254: ├─ belongsToMany Branches
?? 1260 | done | spec | prompt-pack/01-architecture-spec-companion.md line 255: ├─ hasMany ProductMedia
?? 1261 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 256: ├─ hasMany ProductSizes
?? 1262 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 257: ├─ hasMany AddonGroups
?? 1263 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 258: ├─ hasMany Reviews
?? 1264 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 259: └─ hasMany OrderItems
?? 1265 | done | spec | prompt-pack/01-architecture-spec-companion.md line 261: Order
?? 1266 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 262: ├─ belongsTo User
?? 1267 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 263: ├─ belongsTo Branch
?? 1268 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 264: ├─ belongsTo Address
?? 1269 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 265: ├─ hasMany OrderItems
? 1270 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 266: ├─ hasMany StatusLogs
?? 1271 | done | spec | prompt-pack/01-architecture-spec-companion.md line 267: ├─ mayHave PaymentRecord
?? 1272 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 268: └─ mayUse Coupon
?? 1273 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 269: ```
?? 1274 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 271: ## Product Modeling Decision
? 1275 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 272: - Do not keep product pricing in one flat field only.
?? 1276 | done | spec | prompt-pack/01-architecture-spec-companion.md line 273: - Keep a `base_price` only if it has meaning.
? 1277 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 274: - If sizes are required for many products, create explicit size entities.
?? 1278 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 275: - Add-on pricing should support overrides per size.
?? 1279 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 276: - Snapshot final order item pricing at checkout.
? 1280 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 278: ## Product Availability Decision
?? 1281 | done | spec | prompt-pack/01-architecture-spec-companion.md line 279: - Global product enable state is not enough.
?? 1282 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 280: - Add per-branch availability support.
?? 1283 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 281: - Support an `all_branches` mode.
?? 1284 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 282: - Support explicit branch whitelist mode.
?? 1285 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 283: - Validate at cart update and checkout.
?? 1286 | done | spec | prompt-pack/01-architecture-spec-companion.md line 285: ## Category Strategy
?? 1287 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 286: - Use adjacency list first unless nested sets become necessary.
?? 1288 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 287: - Add `parent_id`.
?? 1289 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 288: - Add sort/order field if needed.
?? 1290 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 289: - Add slug if clients need stable category URLs later.
? 1291 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 290: - Keep translatable names.
?? 1292 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 292: ## Tag Strategy
?? 1293 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 293: - Tags are lightweight metadata.
?? 1294 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 294: - Keep them many-to-many.
?? 1295 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 295: - Allow search/filter indexing if needed.
?? 1296 | done | spec | prompt-pack/01-architecture-spec-companion.md line 297: ## Media Strategy
?? 1297 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 298: - Use a dedicated product media table.
?? 1298 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 299: - Separate primary image from gallery logic if simpler.
?? 1299 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 300: - Track media type.
?? 1300 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 301: - Track storage disk/path.
? 1301 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 302: - Track external URL.
?? 1302 | done | spec | prompt-pack/01-architecture-spec-companion.md line 303: - Track sort order.
?? 1303 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 304: - Keep `is_primary` explicit.
?? 1304 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 306: ## Review Strategy
?? 1305 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 307: - Keep verified purchase status derivable or snapshotted.
? 1306 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 308: - Keep anonymity flag explicit.
?? 1307 | done | spec | prompt-pack/01-architecture-spec-companion.md line 309: - Keep moderation fields explicit.
? 1308 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 310: - Optionally keep approval state if moderation flow requires it.
?? 1309 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 312: ## Profile Strategy
? 1310 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 313: - Public profile is API data, not a frontend page.
?? 1311 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 314: - Suggested fields:
?? 1312 | done | spec | prompt-pack/01-architecture-spec-companion.md line 315: - `username`
?? 1313 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 316: - `avatar_path`
?? 1314 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 317: - `bio` if desired
?? 1315 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 318: - `is_public_profile`
?? 1316 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 319: - per-metric visibility flags
? 1317 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 320: - monthly/yearly ranking may be computed or cached
?? 1318 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 322: ## Address Strategy
?? 1319 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 323: - Separate addresses from users.
?? 1320 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 324: - Support multiple saved addresses.
?? 1321 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 325: - Support one default address.
? 1322 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 326: - Keep structured location fields.
?? 1323 | suggested | suggestion | prompt-pack/01-architecture-spec-companion.md line 327: - Allow optional landmarks and notes.
?? 1324 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 328: - Sanitize notes.
?? 1325 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 330: ## Wallet Strategy
?? 1326 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 331: - Keep a wallet table for current balance.
? 1327 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 332: - Keep a wallet transaction ledger for history.
?? 1328 | done | spec | prompt-pack/01-architecture-spec-companion.md line 333: - Never rely on balance-only writes without history.
?? 1329 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 334: - Use transactions and row locking where needed.
?? 1330 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 336: ## Coupon Strategy
?? 1331 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 337: - Keep coupon definition separate from usage tracking.
? 1332 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 338: - Track per-user uses.
?? 1333 | done | spec | prompt-pack/01-architecture-spec-companion.md line 339: - Track global uses.
?? 1334 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 340: - Track eligible scopes.
?? 1335 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 341: - Track delivery applicability.
?? 1336 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 342: - Track amount vs percentage mode.
?? 1337 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 343: - Track cap.
? 1338 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 344: - Track validity windows.
?? 1339 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 346: ## Order Strategy
?? 1340 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 347: - Orders need immutable pricing snapshots.
?? 1341 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 348: - Order item names should be snapshotted.
?? 1342 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 349: - Order item prices should be snapshotted.
? 1343 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 350: - Selected size and add-ons should be snapshotted.
?? 1344 | done | spec | prompt-pack/01-architecture-spec-companion.md line 351: - Delivery fee should be snapshotted.
?? 1345 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 352: - Coupon result should be snapshotted.
?? 1346 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 353: - Wallet deduction should be snapshotted.
?? 1347 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 355: ## Status Transition Strategy
? 1348 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 356: - Keep current order status on the order.
?? 1349 | done | spec | prompt-pack/01-architecture-spec-companion.md line 357: - Keep a separate transition log.
?? 1350 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 358: - Log actor where possible.
?? 1351 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 359: - Log reason where useful.
?? 1352 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 360: - Log timestamps.
?? 1353 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 361: - Prevent invalid transitions.
?? 1354 | done | spec | prompt-pack/01-architecture-spec-companion.md line 363: ## Grace Period Implementation Notes
?? 1355 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 364: - Store `grace_period_ends_at` on the order.
?? 1356 | done | customization | prompt-pack/01-architecture-spec-companion.md line 365: - Use settings-driven default duration.
?? 1357 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 366: - Check this value in cancel/edit policies and services.
? 1358 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 367: - Do not depend only on frontend timing assumptions.
?? 1359 | done | spec | prompt-pack/01-architecture-spec-companion.md line 369: ## Branch-Specific Permissions
?? 1360 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 370: - Branch managers should not see everything by default.
?? 1361 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 371: - Support scoped abilities.
?? 1362 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 372: - Examples:
?? 1363 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 373: - `orders.view.any`
? 1364 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 374: - `orders.view.branch`
?? 1365 | done | spec | prompt-pack/01-architecture-spec-companion.md line 375: - `orders.update.branch`
?? 1366 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 376: - `branches.manage`
?? 1367 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 377: - `products.manage.branch`
?? 1368 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 378: - Represent branch scope either through permission conventions or policy context checks.
? 1369 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 380: ## Configuration Storage Strategy
?? 1370 | done | customization | prompt-pack/01-architecture-spec-companion.md line 381: - Key-value settings table is acceptable.
?? 1371 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 382: - Add typed casting support at service layer.
? 1372 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 383: - Group settings by domain:
?? 1373 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 384: - `general`
?? 1374 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 385: - `currency`
? 1375 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 386: - `auth`
?? 1376 | done | spec | prompt-pack/01-architecture-spec-companion.md line 387: - `orders`
?? 1377 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 388: - `wallet`
?? 1378 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 389: - `gift_cards`
?? 1379 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 390: - `mail`
?? 1380 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 391: - `notifications`
?? 1381 | done | customization | prompt-pack/01-architecture-spec-companion.md line 392: - `theme`
?? 1382 | done | spec | prompt-pack/01-architecture-spec-companion.md line 393: - `features`
?? 1383 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 395: ## Theme JSON Rule
?? 1384 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 396: - Treat theme JSON as raw configuration payload.
?? 1385 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 397: - Validate schema if possible.
? 1386 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 398: - Store versions.
?? 1387 | done | spec | prompt-pack/01-architecture-spec-companion.md line 399: - Support import/export.
? 1388 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 400: - Do not render UI from it here.
?? 1389 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 402: ## Search And Filtering Strategy
? 1390 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 403: - Keep filter logic close to query builders.
? 1391 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 404: - Whitelist sortable fields.
?? 1392 | done | spec | prompt-pack/01-architecture-spec-companion.md line 405: - Whitelist filterable fields.
?? 1393 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 406: - Avoid unsafe dynamic column sorting.
?? 1394 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 407: - Add indexes for heavy filters.
?? 1395 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 409: ## Performance Baseline
? 1396 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 410: - Redis for caching and queues.
?? 1397 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 411: - Eager loading on menu/catalog endpoints.
?? 1398 | done | customization | prompt-pack/01-architecture-spec-companion.md line 412: - Cached settings resolution.
?? 1399 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 413: - Cached branch-category-product aggregates where appropriate.
?? 1400 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 414: - Query profiling in development only.
? 1401 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 416: ## Event-Driven Candidates
?? 1402 | done | spec | prompt-pack/01-architecture-spec-companion.md line 417: - Order created.
?? 1403 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 418: - Order status changed.
?? 1404 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 419: - Wallet credited.
?? 1405 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 420: - Wallet debited.
?? 1406 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 421: - Gift card redeemed.
? 1407 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 422: - Coupon consumed.
?? 1408 | done | spec | prompt-pack/01-architecture-spec-companion.md line 423: - Review created.
?? 1409 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 424: - Review moderated.
?? 1410 | done | customization | prompt-pack/01-architecture-spec-companion.md line 425: - Settings changed.
?? 1411 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 427: ## Job Candidates
? 1412 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 428: - Send emails.
?? 1413 | done | spec | prompt-pack/01-architecture-spec-companion.md line 429: - Dispatch push notifications.
? 1414 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 430: - Rebuild best-seller caches.
?? 1415 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 431: - Generate reports.
?? 1416 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 432: - Process slow media tasks.
? 1417 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 434: ## Documentation Mapping
?? 1418 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 435: - `plans/00` covers high-level overview.
?? 1419 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 436: - `plans/01` covers schema and Eloquent relationships.
?? 1420 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 437: - `plans/02` covers API routes and versioning.
?? 1421 | done | security | prompt-pack/01-architecture-spec-companion.md line 438: - `plans/03` covers auth and authorization.
?? 1422 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 439: - `plans/04` covers branches and menus.
?? 1423 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 440: - `plans/05` covers products, sizes, and add-ons.
?? 1424 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 441: - `plans/06` covers reviews, ratings, tags, and best sellers.
?? 1425 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 442: - `plans/07` covers users, profiles, addresses, wallet, and gift cards.
?? 1426 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 443: - `plans/08` covers cart, orders, checkout, shipping, and coupons.
?? 1427 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 444: - `plans/09` covers admin, roles, permissions, and notifications.
?? 1428 | tested | security | prompt-pack/01-architecture-spec-companion.md line 445: - `plans/10` covers security and testing.
?? 1429 | planned | planning | prompt-pack/01-architecture-spec-companion.md line 446: - `plans/11` covers localization.
? 1430 | backlog_future | future | prompt-pack/01-architecture-spec-companion.md line 447: - `plans/12` covers scalability and future mobile readiness.
?? 1431 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 449: ## Anti-Pattern Warnings
?? 1432 | planned | spec | prompt-pack/01-architecture-spec-companion.md line 450: - Do not place pricing math in controllers.
?? 1433 | done | security | prompt-pack/01-architecture-spec-companion.md line 451: - Do not place authorization decisions in JavaScript.
?? 1434 | done | api_contract | prompt-pack/01-architecture-spec-companion.md line 452: - Do not expose internal admin fields to public APIs.
? 1435 | out_of_scope_backend_only | scope | prompt-pack/01-architecture-spec-companion.md line 453: - Do not rely on frontend to enforce business rules.
?? 1436 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 454: - Do not mix branch validation with presentation logic.
?? 1437 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 455: - Do not silently auto-fix invalid cart states at order time without clear response messaging.
?? 1438 | suggested | spec | prompt-pack/01-architecture-spec-companion.md line 457: ## Success Shape
? 1439 | backlog_future | spec | prompt-pack/01-architecture-spec-companion.md line 458: - A downstream coding agent can implement from this spec without inventing major architecture decisions.
?? 1440 | done | spec | prompt-pack/01-architecture-spec-companion.md line 459: - Module boundaries stay understandable.
?? 1441 | tested | spec | prompt-pack/01-architecture-spec-companion.md line 460: - Data contracts stay stable.
?? 1442 | partial | spec | prompt-pack/01-architecture-spec-companion.md line 461: - Backend-only scope remains enforced.
?? 1443 | done | security | prompt-pack/02-security-auth-companion.md line 1: # Security And Auth Companion
?? 1444 | partial | spec | prompt-pack/02-security-auth-companion.md line 3: ## Purpose
?? 1445 | done | security | prompt-pack/02-security-auth-companion.md line 4: - هذا الملف يحدد hard security defaults.
?? 1446 | suggested | spec | prompt-pack/02-security-auth-companion.md line 5: - هذا الملف يحدد auth strategy بوضوح.
? 1447 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 6: - هذا الملف يمنع الـ agent من ترك فراغات أمنية بسبب التفسير الحر.
?? 1448 | done | spec | prompt-pack/02-security-auth-companion.md line 7: - استخدمه مع `00-master-backend-only-prompt.md`.
?? 1449 | done | security | prompt-pack/02-security-auth-companion.md line 9: ## Security Mindset
?? 1450 | planned | spec | prompt-pack/02-security-auth-companion.md line 10: - Assume hostile input by default.
?? 1451 | done | api_contract | prompt-pack/02-security-auth-companion.md line 11: - Assume public APIs will be probed.
? 1452 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 12: - Assume free-text fields can contain malicious payloads.
?? 1453 | done | spec | prompt-pack/02-security-auth-companion.md line 13: - Assume admin dashboards may later display unsafe content unless the backend constrains it.
?? 1454 | tested | spec | prompt-pack/02-security-auth-companion.md line 14: - Assume tokens can be leaked if handled poorly.
?? 1455 | partial | spec | prompt-pack/02-security-auth-companion.md line 15: - Assume coupon and wallet flows are attractive abuse targets.
?? 1456 | done | security | prompt-pack/02-security-auth-companion.md line 17: ## Primary Security Goals
? 1457 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 18: - Preserve confidentiality.
?? 1458 | done | spec | prompt-pack/02-security-auth-companion.md line 19: - Preserve integrity.
?? 1459 | tested | spec | prompt-pack/02-security-auth-companion.md line 20: - Preserve availability.
?? 1460 | partial | spec | prompt-pack/02-security-auth-companion.md line 21: - Preserve auditability.
?? 1461 | planned | spec | prompt-pack/02-security-auth-companion.md line 22: - Preserve pricing correctness.
?? 1462 | done | security | prompt-pack/02-security-auth-companion.md line 23: - Preserve authorization boundaries.
? 1463 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 25: ## Required Threat Areas
?? 1464 | done | security | prompt-pack/02-security-auth-companion.md line 26: - Authentication brute force.
?? 1465 | partial | spec | prompt-pack/02-security-auth-companion.md line 27: - Token leakage.
?? 1466 | planned | spec | prompt-pack/02-security-auth-companion.md line 28: - Broken access control.
?? 1467 | suggested | spec | prompt-pack/02-security-auth-companion.md line 29: - Insecure direct object references.
?? 1468 | done | security | prompt-pack/02-security-auth-companion.md line 30: - XSS through notes and reviews.
?? 1469 | done | spec | prompt-pack/02-security-auth-companion.md line 31: - Mass assignment.
?? 1470 | tested | spec | prompt-pack/02-security-auth-companion.md line 32: - File upload abuse.
?? 1471 | partial | spec | prompt-pack/02-security-auth-companion.md line 33: - Coupon abuse.
?? 1472 | planned | spec | prompt-pack/02-security-auth-companion.md line 34: - Wallet race conditions.
?? 1473 | suggested | spec | prompt-pack/02-security-auth-companion.md line 35: - Order status tampering.
? 1474 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 36: - Branch-scope privilege escalation.
?? 1475 | done | security | prompt-pack/02-security-auth-companion.md line 38: ## Authentication Baseline
?? 1476 | partial | spec | prompt-pack/02-security-auth-companion.md line 39: - Use `Laravel Sanctum`.
?? 1477 | planned | spec | prompt-pack/02-security-auth-companion.md line 40: - Prefer access-token flow as the main cross-platform mechanism.
? 1478 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 41: - Do not build the system around session-only auth.
? 1479 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 42: - Support multi-device tokens.
?? 1480 | done | spec | prompt-pack/02-security-auth-companion.md line 43: - Store tokens using Sanctum’s secure hashing behavior.
?? 1481 | tested | spec | prompt-pack/02-security-auth-companion.md line 44: - Label tokens meaningfully when possible.
?? 1482 | partial | spec | prompt-pack/02-security-auth-companion.md line 45: - Revoke tokens explicitly on logout.
?? 1483 | planned | spec | prompt-pack/02-security-auth-companion.md line 46: - Support logout current device.
? 1484 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 47: - Support logout all devices if required.
?? 1485 | done | spec | prompt-pack/02-security-auth-companion.md line 49: ## Identity Normalization
?? 1486 | tested | spec | prompt-pack/02-security-auth-companion.md line 50: - Normalize `email` to lowercase before save.
?? 1487 | partial | spec | prompt-pack/02-security-auth-companion.md line 51: - Normalize `username` to lowercase before save.
?? 1488 | planned | spec | prompt-pack/02-security-auth-companion.md line 52: - Normalize on login lookup as well.
?? 1489 | suggested | spec | prompt-pack/02-security-auth-companion.md line 53: - Keep uniqueness checks aligned with normalized values.
?? 1490 | tested | verification | prompt-pack/02-security-auth-companion.md line 54: - Add tests for case-insensitive identity behavior.
?? 1491 | tested | spec | prompt-pack/02-security-auth-companion.md line 56: ## Login Flow Rules
?? 1492 | done | api_contract | prompt-pack/02-security-auth-companion.md line 57: - Login endpoint accepts `email_or_username`.
?? 1493 | planned | spec | prompt-pack/02-security-auth-companion.md line 58: - Resolve which identity type is being used safely.
?? 1494 | suggested | spec | prompt-pack/02-security-auth-companion.md line 59: - Apply rate limiting.
? 1495 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 60: - Return generic invalid-credentials messages.
?? 1496 | done | spec | prompt-pack/02-security-auth-companion.md line 61: - Avoid username enumeration leaks.
?? 1497 | suggested | suggestion | prompt-pack/02-security-auth-companion.md line 62: - Optionally include device name in token creation.
?? 1498 | planned | spec | prompt-pack/02-security-auth-companion.md line 64: ## Registration Flow Rules
?? 1499 | suggested | spec | prompt-pack/02-security-auth-companion.md line 65: - Validate normalized uniqueness before persist.
? 1500 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 66: - Enforce password policy.
? 1501 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 67: - Enforce required primary phone.
?? 1502 | suggested | suggestion | prompt-pack/02-security-auth-companion.md line 68: - Sanitize optional profile fields.
?? 1503 | partial | spec | prompt-pack/02-security-auth-companion.md line 69: - Keep registration response minimal.
?? 1504 | suggested | spec | prompt-pack/02-security-auth-companion.md line 71: ## Password Policy
? 1505 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 72: - Minimum length `6`.
? 1506 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 73: - Require one letter.
? 1507 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 74: - Require one number.
? 1508 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 75: - Require one symbol.
?? 1509 | planned | spec | prompt-pack/02-security-auth-companion.md line 76: - Reject passwords containing the user’s username if present.
?? 1510 | suggested | spec | prompt-pack/02-security-auth-companion.md line 77: - Reject passwords containing the user’s email if present.
? 1511 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 78: - Reject passwords containing known first or last name if present.
?? 1512 | done | spec | prompt-pack/02-security-auth-companion.md line 79: - Keep the implementation deterministic.
?? 1513 | tested | verification | prompt-pack/02-security-auth-companion.md line 80: - Cover with tests.
?? 1514 | done | security | prompt-pack/02-security-auth-companion.md line 82: ## Authorization Baseline
?? 1515 | suggested | spec | prompt-pack/02-security-auth-companion.md line 83: - Use `Policies` for resource access.
? 1516 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 84: - Use `Gates` for coarse-grained abilities.
?? 1517 | done | spec | prompt-pack/02-security-auth-companion.md line 85: - Use `spatie/laravel-permission` for role and permission assignment.
?? 1518 | tested | spec | prompt-pack/02-security-auth-companion.md line 86: - Keep role names descriptive.
?? 1519 | partial | spec | prompt-pack/02-security-auth-companion.md line 87: - Keep permission names explicit.
?? 1520 | done | api_contract | prompt-pack/02-security-auth-companion.md line 88: - Never assume admin rights just because a route starts with `/admin`.
?? 1521 | suggested | spec | prompt-pack/02-security-auth-companion.md line 89: - Always enforce policy checks in controllers/services.
?? 1522 | done | spec | prompt-pack/02-security-auth-companion.md line 91: ## Super Admin Rule
?? 1523 | tested | spec | prompt-pack/02-security-auth-companion.md line 92: - If using `id = 1` bootstrap logic, document it clearly.
?? 1524 | partial | spec | prompt-pack/02-security-auth-companion.md line 93: - Prefer also mapping that actor to a clear `super_admin` capability.
?? 1525 | planned | spec | prompt-pack/02-security-auth-companion.md line 94: - Keep bypass logic centralized.
?? 1526 | suggested | spec | prompt-pack/02-security-auth-companion.md line 95: - Do not scatter super-admin bypass logic across controllers.
?? 1527 | done | security | prompt-pack/02-security-auth-companion.md line 97: ## Branch-Scoped Authorization
?? 1528 | tested | spec | prompt-pack/02-security-auth-companion.md line 98: - Branch managers must only access allowed branches.
?? 1529 | partial | spec | prompt-pack/02-security-auth-companion.md line 99: - Order viewers must not see orders outside authorized scope.
?? 1530 | planned | spec | prompt-pack/02-security-auth-companion.md line 100: - Product editors may be scoped by branch or by general catalog permission.
? 1531 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 101: - Delivery assignment should require explicit operational permissions.
? 1532 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 102: - Review moderation should require moderation-specific permissions.
?? 1533 | tested | spec | prompt-pack/02-security-auth-companion.md line 104: ## Object Access Rules
?? 1534 | partial | spec | prompt-pack/02-security-auth-companion.md line 105: - Users can only access their own tokens.
?? 1535 | planned | spec | prompt-pack/02-security-auth-companion.md line 106: - Users can only access their own addresses unless privileged.
?? 1536 | suggested | spec | prompt-pack/02-security-auth-companion.md line 107: - Users can only access their own wallet history unless privileged.
? 1537 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 108: - Users can only access their own orders unless privileged.
?? 1538 | done | spec | prompt-pack/02-security-auth-companion.md line 109: - Users can only review eligible purchased items.
?? 1539 | tested | spec | prompt-pack/02-security-auth-companion.md line 110: - Public profiles expose only public fields.
?? 1540 | done | api_contract | prompt-pack/02-security-auth-companion.md line 112: ## API Transport Rules
?? 1541 | done | api_contract | prompt-pack/02-security-auth-companion.md line 113: - JSON only.
? 1542 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 114: - Reject unsupported content types where appropriate.
?? 1543 | done | api_contract | prompt-pack/02-security-auth-companion.md line 115: - Use `application/json`.
?? 1544 | done | api_contract | prompt-pack/02-security-auth-companion.md line 116: - Keep exception rendering JSON-safe.
?? 1545 | done | api_contract | prompt-pack/02-security-auth-companion.md line 117: - Never return HTML error pages in the API context.
?? 1546 | suggested | spec | prompt-pack/02-security-auth-companion.md line 119: ## Rate Limiting
? 1547 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 120: - Rate-limit login.
?? 1548 | done | spec | prompt-pack/02-security-auth-companion.md line 121: - Rate-limit registration if exposed publicly.
?? 1549 | done | api_contract | prompt-pack/02-security-auth-companion.md line 122: - Rate-limit password reset endpoints.
?? 1550 | done | api_contract | prompt-pack/02-security-auth-companion.md line 123: - Rate-limit gift-card redeem endpoint.
?? 1551 | done | api_contract | prompt-pack/02-security-auth-companion.md line 124: - Rate-limit coupon apply endpoint if abuse risk is high.
?? 1552 | suggested | spec | prompt-pack/02-security-auth-companion.md line 125: - Rate-limit review creation.
? 1553 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 126: - Rate-limit admin login separately if needed.
?? 1554 | tested | spec | prompt-pack/02-security-auth-companion.md line 128: ## Brute Force Protection
?? 1555 | partial | spec | prompt-pack/02-security-auth-companion.md line 129: - Combine rate limits with audit logging.
?? 1556 | planned | spec | prompt-pack/02-security-auth-companion.md line 130: - Consider lockout windows for repeated failures.
?? 1557 | suggested | spec | prompt-pack/02-security-auth-companion.md line 131: - Keep user-facing error generic.
? 1558 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 132: - Monitor suspicious patterns.
?? 1559 | tested | spec | prompt-pack/02-security-auth-companion.md line 134: ## Token Handling
? 1560 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 135: - Do not expose plaintext tokens after initial issuance except where the auth flow requires the first reveal.
?? 1561 | planned | spec | prompt-pack/02-security-auth-companion.md line 136: - Never log plaintext access tokens.
?? 1562 | suggested | spec | prompt-pack/02-security-auth-companion.md line 137: - Never store tokens in custom plain DB tables when Sanctum handles them.
? 1563 | backlog_future | future | prompt-pack/02-security-auth-companion.md line 138: - Design APIs so mobile and web consumers can manage token revocation clearly.
?? 1564 | tested | spec | prompt-pack/02-security-auth-companion.md line 140: ## Cookies Versus Tokens
?? 1565 | partial | spec | prompt-pack/02-security-auth-companion.md line 141: - Primary backend brief prefers access tokens for cross-platform readiness.
?? 1566 | planned | spec | prompt-pack/02-security-auth-companion.md line 142: - If cookies are ever used for some web context, keep them secure:
?? 1567 | suggested | spec | prompt-pack/02-security-auth-companion.md line 143: - `HttpOnly`
? 1568 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 144: - `Secure`
?? 1569 | done | spec | prompt-pack/02-security-auth-companion.md line 145: - `SameSite` configured intentionally
? 1570 | backlog_future | future | prompt-pack/02-security-auth-companion.md line 146: - Do not make cookies the main mobile-ready contract.
?? 1571 | planned | spec | prompt-pack/02-security-auth-companion.md line 148: ## CORS Strategy
?? 1572 | suggested | spec | prompt-pack/02-security-auth-companion.md line 149: - Explicitly configure allowed origins.
? 1573 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 150: - Avoid wildcard origins with credentials.
?? 1574 | done | spec | prompt-pack/02-security-auth-companion.md line 151: - Document dev and production origin behavior.
?? 1575 | tested | spec | prompt-pack/02-security-auth-companion.md line 152: - Keep preflight behavior predictable.
?? 1576 | tested | verification | prompt-pack/02-security-auth-companion.md line 153: - Test protected endpoints from allowed consumers.
?? 1577 | suggested | spec | prompt-pack/02-security-auth-companion.md line 155: ## CSRF Notes
?? 1578 | done | api_contract | prompt-pack/02-security-auth-companion.md line 156: - For pure token APIs, CSRF concerns differ from stateful cookie flows.
?? 1579 | done | spec | prompt-pack/02-security-auth-companion.md line 157: - Do not claim CSRF is solved magically.
?? 1580 | done | api_contract | prompt-pack/02-security-auth-companion.md line 158: - If any stateful cookie endpoints are introduced later, document and protect them separately.
?? 1581 | done | api_contract | prompt-pack/02-security-auth-companion.md line 159: - Keep current scope centered on token-authenticated APIs.
?? 1582 | done | security | prompt-pack/02-security-auth-companion.md line 161: ## XSS Defense
? 1583 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 162: - Free-text fields are dangerous.
?? 1584 | done | spec | prompt-pack/02-security-auth-companion.md line 163: - Notes are dangerous.
?? 1585 | tested | spec | prompt-pack/02-security-auth-companion.md line 164: - Reviews are dangerous.
? 1586 | backlog_future | future | prompt-pack/02-security-auth-companion.md line 165: - Profile bios are dangerous.
?? 1587 | planned | spec | prompt-pack/02-security-auth-companion.md line 166: - Dynamic page content can be dangerous.
?? 1588 | suggested | spec | prompt-pack/02-security-auth-companion.md line 167: - Sanitize or strictly validate according to field intent.
? 1589 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 168: - Prefer plain-text storage for fields that do not need rich HTML.
?? 1590 | done | spec | prompt-pack/02-security-auth-companion.md line 169: - If rich text is ever allowed later, use a real allowlist sanitizer.
?? 1591 | done | security | prompt-pack/02-security-auth-companion.md line 171: ## SQL Injection Defense
? 1592 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 172: - Use Eloquent or parameterized query builder usage.
?? 1593 | suggested | spec | prompt-pack/02-security-auth-companion.md line 173: - Never concatenate raw unsafe SQL from request parameters.
? 1594 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 174: - Whitelist sortable fields.
?? 1595 | done | spec | prompt-pack/02-security-auth-companion.md line 175: - Whitelist filterable fields.
?? 1596 | tested | spec | prompt-pack/02-security-auth-companion.md line 176: - Whitelist searchable relations where dynamic behavior exists.
?? 1597 | planned | spec | prompt-pack/02-security-auth-companion.md line 178: ## Mass Assignment Defense
?? 1598 | suggested | spec | prompt-pack/02-security-auth-companion.md line 179: - Guard models carefully.
? 1599 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 180: - Prefer DTO/action/service boundaries for sensitive writes.
?? 1600 | done | spec | prompt-pack/02-security-auth-companion.md line 181: - Never trust raw `$request->all()` for privileged updates.
?? 1601 | tested | spec | prompt-pack/02-security-auth-companion.md line 182: - Restrict fillable attributes or use explicit assignment patterns.
?? 1602 | planned | spec | prompt-pack/02-security-auth-companion.md line 184: ## Input Validation Strategy
?? 1603 | done | api_contract | prompt-pack/02-security-auth-companion.md line 185: - Use `FormRequest` objects for endpoint validation.
? 1604 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 186: - Use nested rules for complex cart/configuration payloads.
? 1605 | backlog_future | future | prompt-pack/02-security-auth-companion.md line 187: - Use domain services for cross-entity validation.
?? 1606 | tested | spec | prompt-pack/02-security-auth-companion.md line 188: - Return structured validation errors.
?? 1607 | partial | spec | prompt-pack/02-security-auth-companion.md line 189: - Keep business-rule validation separate from primitive type validation when possible.
?? 1608 | suggested | spec | prompt-pack/02-security-auth-companion.md line 191: ## Free-Text Sanitization Rules
? 1609 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 192: - Order notes must be sanitized.
?? 1610 | done | spec | prompt-pack/02-security-auth-companion.md line 193: - Review comments must be sanitized.
?? 1611 | tested | spec | prompt-pack/02-security-auth-companion.md line 194: - Profile text fields must be sanitized.
? 1612 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 195: - Dynamic page content requires special care.
?? 1613 | planned | spec | prompt-pack/02-security-auth-companion.md line 196: - Audit any field that may later be displayed in admin or client apps.
?? 1614 | done | security | prompt-pack/02-security-auth-companion.md line 198: ## File Upload Security
?? 1615 | done | spec | prompt-pack/02-security-auth-companion.md line 199: - Validate mime type.
?? 1616 | tested | spec | prompt-pack/02-security-auth-companion.md line 200: - Validate extension.
?? 1617 | partial | spec | prompt-pack/02-security-auth-companion.md line 201: - Validate max file size.
?? 1618 | planned | spec | prompt-pack/02-security-auth-companion.md line 202: - Restrict accepted types tightly.
?? 1619 | suggested | spec | prompt-pack/02-security-auth-companion.md line 203: - Reject executable or suspicious content.
? 1620 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 204: - Store outside dangerous public execution paths where applicable.
?? 1621 | done | spec | prompt-pack/02-security-auth-companion.md line 205: - Generate safe filenames.
?? 1622 | tested | spec | prompt-pack/02-security-auth-companion.md line 206: - Record original filename separately only if needed.
?? 1623 | partial | spec | prompt-pack/02-security-auth-companion.md line 207: - Consider image dimension checks if relevant.
?? 1624 | suggested | spec | prompt-pack/02-security-auth-companion.md line 209: ## Media Type Policy
? 1625 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 210: - Images:
?? 1626 | done | spec | prompt-pack/02-security-auth-companion.md line 211: - `jpeg`
?? 1627 | tested | spec | prompt-pack/02-security-auth-companion.md line 212: - `jpg`
?? 1628 | partial | spec | prompt-pack/02-security-auth-companion.md line 213: - `png`
?? 1629 | planned | spec | prompt-pack/02-security-auth-companion.md line 214: - `webp`
? 1630 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 215: - Videos only if required and storage policy is clear.
? 1631 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 216: - External video URLs must be validated against allowed providers if such restriction is needed.
? 1632 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 218: ## Virus Scan Simulation Requirement
?? 1633 | partial | spec | prompt-pack/02-security-auth-companion.md line 219: - If real malware scanning is unavailable, include a clear integration point or simulation abstraction.
?? 1634 | planned | spec | prompt-pack/02-security-auth-companion.md line 220: - Do not pretend a fake scanner is real protection.
?? 1635 | suggested | spec | prompt-pack/02-security-auth-companion.md line 221: - Document it as a placeholder hook.
?? 1636 | done | spec | prompt-pack/02-security-auth-companion.md line 223: ## Notes Safety Example
?? 1637 | tested | spec | prompt-pack/02-security-auth-companion.md line 224: - A customer may submit `<script>` in order notes.
?? 1638 | partial | spec | prompt-pack/02-security-auth-companion.md line 225: - The backend must not trust or preserve executable behavior blindly for display contexts.
?? 1639 | planned | spec | prompt-pack/02-security-auth-companion.md line 226: - Store safe text or sanitize before persistence/display based on field policy.
?? 1640 | tested | verification | prompt-pack/02-security-auth-companion.md line 227: - Cover this with automated tests.
?? 1641 | done | spec | prompt-pack/02-security-auth-companion.md line 229: ## Coupon Abuse Risks
?? 1642 | tested | spec | prompt-pack/02-security-auth-companion.md line 230: - Reuse beyond per-user limits.
?? 1643 | partial | spec | prompt-pack/02-security-auth-companion.md line 231: - Reuse after expiry.
?? 1644 | planned | spec | prompt-pack/02-security-auth-companion.md line 232: - Circumventing minimum cart totals.
?? 1645 | suggested | spec | prompt-pack/02-security-auth-companion.md line 233: - Applying coupons to ineligible items.
? 1646 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 234: - Using delivery-only coupons on product totals.
?? 1647 | done | api_contract | prompt-pack/02-security-auth-companion.md line 235: - Repeated retry attacks on redeem/apply endpoints.
?? 1648 | done | security | prompt-pack/02-security-auth-companion.md line 237: ## Coupon Security Controls
?? 1649 | tested | deployment | prompt-pack/02-security-auth-companion.md line 238: - Validate eligibility server-side at every apply and checkout step.
?? 1650 | suggested | spec | prompt-pack/02-security-auth-companion.md line 239: - Snapshot applied coupon result into the order.
? 1651 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 240: - Recheck validity in checkout finalization.
?? 1652 | done | spec | prompt-pack/02-security-auth-companion.md line 241: - Use transactions around final coupon usage increments.
?? 1653 | done | security | prompt-pack/02-security-auth-companion.md line 243: ## Wallet Security Risks
?? 1654 | planned | spec | prompt-pack/02-security-auth-companion.md line 244: - Double-spend attempts.
?? 1655 | suggested | spec | prompt-pack/02-security-auth-companion.md line 245: - Race conditions during concurrent checkout.
?? 1656 | done | api_contract | prompt-pack/02-security-auth-companion.md line 246: - Replay on redeem endpoints.
?? 1657 | done | spec | prompt-pack/02-security-auth-companion.md line 247: - Manual admin balance abuse.
?? 1658 | done | security | prompt-pack/02-security-auth-companion.md line 249: ## Wallet Security Controls
?? 1659 | planned | spec | prompt-pack/02-security-auth-companion.md line 250: - Use DB transactions.
? 1660 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 251: - Use row-level locking or equivalent consistency control when needed.
? 1661 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 252: - Keep append-only transaction history.
?? 1662 | done | spec | prompt-pack/02-security-auth-companion.md line 253: - Audit admin adjustments.
?? 1663 | tested | spec | prompt-pack/02-security-auth-companion.md line 254: - Validate non-negative balance outcomes.
?? 1664 | done | security | prompt-pack/02-security-auth-companion.md line 256: ## Gift Card Security Risks
?? 1665 | suggested | spec | prompt-pack/02-security-auth-companion.md line 257: - Code guessing.
? 1666 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 258: - Replay redemption.
?? 1667 | done | spec | prompt-pack/02-security-auth-companion.md line 259: - Predictable code generation.
?? 1668 | tested | spec | prompt-pack/02-security-auth-companion.md line 260: - Unauthorized admin generation.
?? 1669 | done | security | prompt-pack/02-security-auth-companion.md line 262: ## Gift Card Security Controls
?? 1670 | suggested | spec | prompt-pack/02-security-auth-companion.md line 263: - Use high-entropy codes.
? 1671 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 264: - Enforce single-use or explicit usage policy.
?? 1672 | done | spec | prompt-pack/02-security-auth-companion.md line 265: - Store redemption metadata.
?? 1673 | done | api_contract | prompt-pack/02-security-auth-companion.md line 266: - Protect generation endpoints with strong permissions.
?? 1674 | done | api_contract | prompt-pack/02-security-auth-companion.md line 267: - Protect redemption endpoints with rate limiting.
?? 1675 | suggested | spec | prompt-pack/02-security-auth-companion.md line 269: ## Order Integrity Controls
? 1676 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 270: - Snapshot prices at order creation.
?? 1677 | done | spec | prompt-pack/02-security-auth-companion.md line 271: - Snapshot selected size and add-ons.
?? 1678 | tested | spec | prompt-pack/02-security-auth-companion.md line 272: - Snapshot delivery fee.
?? 1679 | partial | spec | prompt-pack/02-security-auth-companion.md line 273: - Snapshot coupon result.
?? 1680 | planned | spec | prompt-pack/02-security-auth-companion.md line 274: - Snapshot wallet deduction.
?? 1681 | suggested | spec | prompt-pack/02-security-auth-companion.md line 275: - Prevent later product edits from mutating historical orders.
?? 1682 | done | security | prompt-pack/02-security-auth-companion.md line 277: ## Status Transition Security
?? 1683 | tested | spec | prompt-pack/02-security-auth-companion.md line 278: - Do not let arbitrary clients set any status.
?? 1684 | partial | spec | prompt-pack/02-security-auth-companion.md line 279: - Define allowed transitions.
?? 1685 | planned | spec | prompt-pack/02-security-auth-companion.md line 280: - Different actors can trigger different transitions.
?? 1686 | suggested | spec | prompt-pack/02-security-auth-companion.md line 281: - Customers may cancel only within grace period and only under allowed status.
? 1687 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 282: - Admin/staff transitions must be authorized and logged.
?? 1688 | done | customization | prompt-pack/02-security-auth-companion.md line 284: ## Sensitive Settings Controls
?? 1689 | done | customization | prompt-pack/02-security-auth-companion.md line 285: - Mail settings are sensitive.
?? 1690 | done | customization | prompt-pack/02-security-auth-companion.md line 286: - OAuth provider settings are sensitive.
?? 1691 | done | customization | prompt-pack/02-security-auth-companion.md line 287: - Token-related settings are sensitive.
? 1692 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 288: - Currency and feature toggles affect business behavior.
?? 1693 | done | spec | prompt-pack/02-security-auth-companion.md line 289: - Restrict update permissions tightly.
?? 1694 | tested | spec | prompt-pack/02-security-auth-companion.md line 290: - Audit changes.
?? 1695 | planned | spec | prompt-pack/02-security-auth-companion.md line 292: ## Logging Rules
?? 1696 | done | security | prompt-pack/02-security-auth-companion.md line 293: - Log security-relevant events.
? 1697 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 294: - Do not log secrets.
?? 1698 | done | spec | prompt-pack/02-security-auth-companion.md line 295: - Do not log plaintext passwords.
?? 1699 | tested | spec | prompt-pack/02-security-auth-companion.md line 296: - Do not log plaintext tokens.
?? 1700 | partial | spec | prompt-pack/02-security-auth-companion.md line 297: - Mask sensitive headers if request logging exists.
?? 1701 | suggested | spec | prompt-pack/02-security-auth-companion.md line 299: ## Production Error Handling
?? 1702 | done | api_contract | prompt-pack/02-security-auth-companion.md line 300: - Never expose stack traces in production JSON.
?? 1703 | done | spec | prompt-pack/02-security-auth-companion.md line 301: - Use safe generic messages for unknown exceptions.
?? 1704 | tested | deployment | prompt-pack/02-security-auth-companion.md line 302: - Log detailed context server-side.
?? 1705 | partial | spec | prompt-pack/02-security-auth-companion.md line 303: - Separate user-safe message from internal diagnostics.
?? 1706 | tested | verification | prompt-pack/02-security-auth-companion.md line 305: ## Testing Matrix
?? 1707 | tested | verification | prompt-pack/02-security-auth-companion.md line 306: - Test login throttling.
?? 1708 | tested | verification | prompt-pack/02-security-auth-companion.md line 307: - Test lowercase normalization.
?? 1709 | tested | verification | prompt-pack/02-security-auth-companion.md line 308: - Test password validation.
?? 1710 | tested | verification | prompt-pack/02-security-auth-companion.md line 309: - Test unauthorized access across user boundaries.
?? 1711 | tested | security | prompt-pack/02-security-auth-companion.md line 310: - Test branch-scope authorization.
?? 1712 | tested | verification | prompt-pack/02-security-auth-companion.md line 311: - Test order note sanitization.
?? 1713 | tested | verification | prompt-pack/02-security-auth-companion.md line 312: - Test coupon over-discount rules.
?? 1714 | tested | verification | prompt-pack/02-security-auth-companion.md line 313: - Test wallet concurrency-sensitive operations where feasible.
?? 1715 | tested | verification | prompt-pack/02-security-auth-companion.md line 314: - Test gift-card single-use behavior.
?? 1716 | tested | verification | prompt-pack/02-security-auth-companion.md line 315: - Test invalid status transition rejection.
?? 1717 | done | security | prompt-pack/02-security-auth-companion.md line 317: ## Security Review Checklist For The Downstream Agent
?? 1718 | done | api_contract | prompt-pack/02-security-auth-companion.md line 318: - Are all auth endpoints rate-limited.
?? 1719 | done | spec | prompt-pack/02-security-auth-companion.md line 319: - Are tokens created and revoked safely.
?? 1720 | tested | spec | prompt-pack/02-security-auth-companion.md line 320: - Are emails and usernames normalized.
?? 1721 | partial | spec | prompt-pack/02-security-auth-companion.md line 321: - Are free-text fields sanitized or constrained.
?? 1722 | planned | spec | prompt-pack/02-security-auth-companion.md line 322: - Are uploads strictly validated.
?? 1723 | suggested | spec | prompt-pack/02-security-auth-companion.md line 323: - Are policy checks enforced on every protected resource.
? 1724 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 324: - Are coupon and wallet writes transactional.
?? 1725 | done | spec | prompt-pack/02-security-auth-companion.md line 325: - Are order status transitions restricted.
?? 1726 | done | customization | prompt-pack/02-security-auth-companion.md line 326: - Are sensitive settings protected and audited.
?? 1727 | planned | spec | prompt-pack/02-security-auth-companion.md line 328: ## Final Guardrail
? 1728 | out_of_scope_backend_only | scope | prompt-pack/02-security-auth-companion.md line 329: - If a requirement is ambiguous, choose the more secure backend behavior.
? 1729 | backlog_future | spec | prompt-pack/02-security-auth-companion.md line 330: - Document the assumption.
?? 1730 | done | security | prompt-pack/02-security-auth-companion.md line 331: - Do not leave silent auth or security gaps.
?? 1731 | partial | spec | prompt-pack/03-execution-checklist.md line 1: # Execution Checklist
?? 1732 | suggested | spec | prompt-pack/03-execution-checklist.md line 3: ## Purpose
? 1733 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 4: - This file is an execution control layer.
?? 1734 | done | spec | prompt-pack/03-execution-checklist.md line 5: - It tells the downstream coding agent what to do first.
?? 1735 | tested | spec | prompt-pack/03-execution-checklist.md line 6: - It minimizes skipped steps.
?? 1736 | partial | spec | prompt-pack/03-execution-checklist.md line 7: - It keeps the run backend-only.
?? 1737 | suggested | spec | prompt-pack/03-execution-checklist.md line 9: ## Global Execution Rules
? 1738 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 10: 1. Stay strictly inside backend scope.
? 1739 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 11: 2. Do not create frontend artifacts.
? 1740 | backlog_future | future | prompt-pack/03-execution-checklist.md line 12: 3. Do not create mobile app artifacts.
? 1741 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 13: 4. Do not switch to UI work.
?? 1742 | planned | planning | prompt-pack/03-execution-checklist.md line 14: 5. Do not skip planning documents.
?? 1743 | tested | verification | prompt-pack/03-execution-checklist.md line 15: 6. Do not skip tests.
? 1744 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 16: 7. Do not skip documentation.
?? 1745 | done | spec | prompt-pack/03-execution-checklist.md line 17: 8. Do not hide assumptions.
?? 1746 | planned | planning | prompt-pack/03-execution-checklist.md line 19: ## Phase 1: Repository Grounding
?? 1747 | planned | spec | prompt-pack/03-execution-checklist.md line 20: 1. Inspect the workspace.
?? 1748 | suggested | spec | prompt-pack/03-execution-checklist.md line 21: 2. Confirm whether the root is empty or already contains files.
? 1749 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 22: 3. Confirm whether Git is initialized.
?? 1750 | done | spec | prompt-pack/03-execution-checklist.md line 23: 4. Confirm PHP availability if command execution is allowed.
?? 1751 | tested | spec | prompt-pack/03-execution-checklist.md line 24: 5. Confirm Composer availability if command execution is allowed.
? 1752 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 25: 6. Confirm there is no conflicting frontend scaffold.
?? 1753 | planned | spec | prompt-pack/03-execution-checklist.md line 26: 7. Keep notes of any unexpected files.
?? 1754 | planned | planning | prompt-pack/03-execution-checklist.md line 28: ## Phase 2: Internal Planning Docs First
?? 1755 | planned | planning | prompt-pack/03-execution-checklist.md line 29: 1. Create `plans/`.
?? 1756 | planned | planning | prompt-pack/03-execution-checklist.md line 30: 2. Create `plans/00-full-project-overview.md`.
?? 1757 | planned | planning | prompt-pack/03-execution-checklist.md line 31: 3. Create `plans/01-database-schema-and-models.md`.
?? 1758 | planned | planning | prompt-pack/03-execution-checklist.md line 32: 4. Create `plans/02-api-endpoints-and-versioning.md`.
?? 1759 | done | security | prompt-pack/03-execution-checklist.md line 33: 5. Create `plans/03-authentication-and-authorization.md`.
?? 1760 | planned | planning | prompt-pack/03-execution-checklist.md line 34: 6. Create `plans/04-branches-and-menus-system.md`.
?? 1761 | planned | planning | prompt-pack/03-execution-checklist.md line 35: 7. Create `plans/05-products-categories-sizes-addons.md`.
?? 1762 | planned | planning | prompt-pack/03-execution-checklist.md line 36: 8. Create `plans/06-reviews-ratings-tags-best-sellers.md`.
?? 1763 | planned | planning | prompt-pack/03-execution-checklist.md line 37: 9. Create `plans/07-users-profiles-addresses-wallet-giftcards.md`.
?? 1764 | planned | planning | prompt-pack/03-execution-checklist.md line 38: 10. Create `plans/08-cart-orders-checkout-shipping-coupons.md`.
?? 1765 | planned | planning | prompt-pack/03-execution-checklist.md line 39: 11. Create `plans/09-admin-roles-permissions-notifications.md`.
?? 1766 | tested | security | prompt-pack/03-execution-checklist.md line 40: 12. Create `plans/10-security-best-practices-and-testing.md`.
?? 1767 | planned | planning | prompt-pack/03-execution-checklist.md line 41: 13. Create `plans/11-localization-arabic-english.md`.
? 1768 | backlog_future | future | prompt-pack/03-execution-checklist.md line 42: 14. Create `plans/12-scalability-and-future-mobile.md`.
?? 1769 | planned | planning | prompt-pack/03-execution-checklist.md line 43: 15. Ensure total planning documentation exceeds 1000 useful lines.
?? 1770 | planned | planning | prompt-pack/03-execution-checklist.md line 44: 16. Keep every planning file backend-only.
?? 1771 | planned | planning | prompt-pack/03-execution-checklist.md line 46: ## Phase 3: Scaffold Laravel Backend
?? 1772 | done | spec | prompt-pack/03-execution-checklist.md line 47: 1. Create `backend/` Laravel project using Laravel 13.
?? 1773 | tested | spec | prompt-pack/03-execution-checklist.md line 48: 2. Confirm generated clean Laravel structure.
?? 1774 | partial | spec | prompt-pack/03-execution-checklist.md line 49: 3. Initialize Git if needed.
?? 1775 | tested | verification | prompt-pack/03-execution-checklist.md line 50: 4. Verify `.gitignore`.
?? 1776 | suggested | spec | prompt-pack/03-execution-checklist.md line 51: 5. Keep project portable.
? 1777 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 52: 6. Do not add machine-specific path assumptions.
?? 1778 | planned | planning | prompt-pack/03-execution-checklist.md line 54: ## Phase 4: Install Core Packages
?? 1779 | partial | spec | prompt-pack/03-execution-checklist.md line 55: 1. Install `laravel/sanctum`.
?? 1780 | planned | spec | prompt-pack/03-execution-checklist.md line 56: 2. Install `spatie/laravel-permission`.
?? 1781 | suggested | spec | prompt-pack/03-execution-checklist.md line 57: 3. Install `laravel/horizon`.
? 1782 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 58: 4. Install `laravel/telescope` for development.
?? 1783 | done | spec | prompt-pack/03-execution-checklist.md line 59: 5. Install debug tooling only for non-production if compatible.
?? 1784 | tested | spec | prompt-pack/03-execution-checklist.md line 60: 6. Install `laravel/octane` only if aligned with runtime strategy.
?? 1785 | partial | spec | prompt-pack/03-execution-checklist.md line 61: 7. Add static analysis tooling.
? 1786 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 62: 8. Add formatter/lint tooling if required by the project standard.
?? 1787 | planned | planning | prompt-pack/03-execution-checklist.md line 64: ## Phase 5: Configure Environment Example
?? 1788 | done | spec | prompt-pack/03-execution-checklist.md line 65: 1. Prepare `.env.example`.
?? 1789 | done | customization | prompt-pack/03-execution-checklist.md line 66: 2. Add app settings.
?? 1790 | done | customization | prompt-pack/03-execution-checklist.md line 67: 3. Add database settings.
?? 1791 | done | customization | prompt-pack/03-execution-checklist.md line 68: 4. Add Redis settings.
?? 1792 | done | customization | prompt-pack/03-execution-checklist.md line 69: 5. Add queue settings.
?? 1793 | done | customization | prompt-pack/03-execution-checklist.md line 70: 6. Add Sanctum-related settings if needed.
?? 1794 | done | customization | prompt-pack/03-execution-checklist.md line 71: 7. Add mail settings.
?? 1795 | done | customization | prompt-pack/03-execution-checklist.md line 72: 8. Add broadcasting settings.
?? 1796 | done | customization | prompt-pack/03-execution-checklist.md line 73: 9. Add feature-toggle settings.
?? 1797 | planned | spec | prompt-pack/03-execution-checklist.md line 74: 10. Add any operational defaults.
?? 1798 | planned | planning | prompt-pack/03-execution-checklist.md line 76: ## Phase 6: Establish API Foundations
?? 1799 | done | api_contract | prompt-pack/03-execution-checklist.md line 77: 1. Create API version namespace strategy.
?? 1800 | done | api_contract | prompt-pack/03-execution-checklist.md line 78: 2. Group routes under `/api/v1`.
?? 1801 | done | api_contract | prompt-pack/03-execution-checklist.md line 79: 3. Create common API response helpers or patterns.
?? 1802 | done | api_contract | prompt-pack/03-execution-checklist.md line 80: 4. Ensure exception rendering is JSON-friendly.
?? 1803 | suggested | spec | prompt-pack/03-execution-checklist.md line 81: 5. Add localization middleware or request-resolution strategy.
?? 1804 | done | api_contract | prompt-pack/03-execution-checklist.md line 82: 6. Add auth middleware strategy for protected endpoints.
?? 1805 | planned | planning | prompt-pack/03-execution-checklist.md line 84: ## Phase 7: Database Foundation
?? 1806 | partial | spec | prompt-pack/03-execution-checklist.md line 85: 1. Design migrations before coding models.
?? 1807 | planned | spec | prompt-pack/03-execution-checklist.md line 86: 2. Create base user-related migrations.
?? 1808 | suggested | spec | prompt-pack/03-execution-checklist.md line 87: 3. Create branches and delivery zones migrations.
? 1809 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 88: 4. Create categories and tags migrations.
?? 1810 | done | spec | prompt-pack/03-execution-checklist.md line 89: 5. Create products and media migrations.
?? 1811 | tested | spec | prompt-pack/03-execution-checklist.md line 90: 6. Create sizes and add-on migrations.
?? 1812 | partial | spec | prompt-pack/03-execution-checklist.md line 91: 7. Create carts and cart items migrations if persistent cart storage is used.
?? 1813 | planned | spec | prompt-pack/03-execution-checklist.md line 92: 8. Create orders and order items migrations.
?? 1814 | suggested | spec | prompt-pack/03-execution-checklist.md line 93: 9. Create order status history migrations.
? 1815 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 94: 10. Create coupon and usage tracking migrations.
?? 1816 | done | spec | prompt-pack/03-execution-checklist.md line 95: 11. Create wallet and wallet transaction migrations.
?? 1817 | tested | spec | prompt-pack/03-execution-checklist.md line 96: 12. Create gift card and redemption migrations.
?? 1818 | done | customization | prompt-pack/03-execution-checklist.md line 97: 13. Create settings migrations.
?? 1819 | planned | spec | prompt-pack/03-execution-checklist.md line 98: 14. Create dynamic pages migrations.
?? 1820 | suggested | spec | prompt-pack/03-execution-checklist.md line 99: 15. Create review migrations.
? 1821 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 100: 16. Create audit log migrations if included.
?? 1822 | planned | planning | prompt-pack/03-execution-checklist.md line 102: ## Phase 8: Eloquent Model Layer
? 1823 | backlog_future | future | prompt-pack/03-execution-checklist.md line 103: 1. Create models per domain.
?? 1824 | planned | spec | prompt-pack/03-execution-checklist.md line 104: 2. Define relationships explicitly.
?? 1825 | suggested | spec | prompt-pack/03-execution-checklist.md line 105: 3. Define casts explicitly.
? 1826 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 106: 4. Add accessors/mutators only where justified.
?? 1827 | done | spec | prompt-pack/03-execution-checklist.md line 107: 5. Normalize lowercase fields safely.
?? 1828 | tested | spec | prompt-pack/03-execution-checklist.md line 108: 6. Keep models concise.
?? 1829 | partial | spec | prompt-pack/03-execution-checklist.md line 109: 7. Avoid large business methods inside models.
?? 1830 | done | security | prompt-pack/03-execution-checklist.md line 111: ## Phase 9: Authorization Layer
? 1831 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 112: 1. Configure Spatie roles and permissions.
?? 1832 | done | spec | prompt-pack/03-execution-checklist.md line 113: 2. Create seed strategy for super admin and baseline roles.
?? 1833 | tested | spec | prompt-pack/03-execution-checklist.md line 114: 3. Add policies for protected resources.
?? 1834 | partial | spec | prompt-pack/03-execution-checklist.md line 115: 4. Add gates for broader abilities.
?? 1835 | done | security | prompt-pack/03-execution-checklist.md line 116: 5. Implement branch-aware authorization checks.
?? 1836 | tested | security | prompt-pack/03-execution-checklist.md line 117: 6. Add tests for authorization boundaries.
?? 1837 | planned | planning | prompt-pack/03-execution-checklist.md line 119: ## Phase 10: Auth Module
?? 1838 | done | api_contract | prompt-pack/03-execution-checklist.md line 120: 1. Create registration endpoint.
?? 1839 | done | api_contract | prompt-pack/03-execution-checklist.md line 121: 2. Create login endpoint.
?? 1840 | done | api_contract | prompt-pack/03-execution-checklist.md line 122: 3. Create logout endpoint.
?? 1841 | suggested | spec | prompt-pack/03-execution-checklist.md line 123: 4. Create token revocation flows.
? 1842 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 124: 5. Implement lowercase normalization.
?? 1843 | done | spec | prompt-pack/03-execution-checklist.md line 125: 6. Implement password rules.
?? 1844 | tested | verification | prompt-pack/03-execution-checklist.md line 126: 7. Implement auth tests.
?? 1845 | planned | planning | prompt-pack/03-execution-checklist.md line 128: ## Phase 11: Users, Profiles, And Addresses
?? 1846 | done | api_contract | prompt-pack/03-execution-checklist.md line 129: 1. Create user profile endpoints.
?? 1847 | done | api_contract | prompt-pack/03-execution-checklist.md line 130: 2. Create address CRUD endpoints.
?? 1848 | done | spec | prompt-pack/03-execution-checklist.md line 131: 3. Create default address handling.
?? 1849 | done | api_contract | prompt-pack/03-execution-checklist.md line 132: 4. Create public profile read endpoint.
?? 1850 | partial | spec | prompt-pack/03-execution-checklist.md line 133: 5. Add privacy controls.
?? 1851 | planned | spec | prompt-pack/03-execution-checklist.md line 134: 6. Add profile statistics service.
?? 1852 | planned | planning | prompt-pack/03-execution-checklist.md line 136: ## Phase 12: Branches And Delivery Zones
?? 1853 | done | api_contract | prompt-pack/03-execution-checklist.md line 137: 1. Create branch CRUD endpoints.
?? 1854 | done | api_contract | prompt-pack/03-execution-checklist.md line 138: 2. Create delivery zone CRUD endpoints.
?? 1855 | partial | spec | prompt-pack/03-execution-checklist.md line 139: 3. Add branch availability rules.
?? 1856 | planned | spec | prompt-pack/03-execution-checklist.md line 140: 4. Add shipping calculation strategy.
?? 1857 | tested | verification | prompt-pack/03-execution-checklist.md line 141: 5. Add tests for branch-product compatibility.
?? 1858 | planned | planning | prompt-pack/03-execution-checklist.md line 143: ## Phase 13: Catalog Module
?? 1859 | done | api_contract | prompt-pack/03-execution-checklist.md line 144: 1. Create category CRUD endpoints.
?? 1860 | done | api_contract | prompt-pack/03-execution-checklist.md line 145: 2. Create tag CRUD endpoints.
?? 1861 | done | api_contract | prompt-pack/03-execution-checklist.md line 146: 3. Create product CRUD endpoints.
?? 1862 | done | api_contract | prompt-pack/03-execution-checklist.md line 147: 4. Create product media handling endpoints.
?? 1863 | done | api_contract | prompt-pack/03-execution-checklist.md line 148: 5. Create size/variant endpoints.
?? 1864 | done | api_contract | prompt-pack/03-execution-checklist.md line 149: 6. Create add-on group and option endpoints.
?? 1865 | tested | spec | prompt-pack/03-execution-checklist.md line 150: 7. Add branch availability attachment logic.
?? 1866 | partial | spec | prompt-pack/03-execution-checklist.md line 151: 8. Add search/filter/sort strategy.
?? 1867 | planned | planning | prompt-pack/03-execution-checklist.md line 153: ## Phase 14: Cart Module
?? 1868 | done | api_contract | prompt-pack/03-execution-checklist.md line 154: 1. Create cart fetch endpoint.
?? 1869 | done | api_contract | prompt-pack/03-execution-checklist.md line 155: 2. Create add item endpoint.
?? 1870 | done | api_contract | prompt-pack/03-execution-checklist.md line 156: 3. Create update item endpoint.
?? 1871 | done | api_contract | prompt-pack/03-execution-checklist.md line 157: 4. Create remove item endpoint.
?? 1872 | done | api_contract | prompt-pack/03-execution-checklist.md line 158: 5. Create clear cart endpoint.
?? 1873 | suggested | spec | prompt-pack/03-execution-checklist.md line 159: 6. Compute line identity by configuration.
? 1874 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 160: 7. Validate size/add-on compatibility.
?? 1875 | done | spec | prompt-pack/03-execution-checklist.md line 161: 8. Validate branch compatibility.
?? 1876 | tested | spec | prompt-pack/03-execution-checklist.md line 162: 9. Validate stock if enabled.
?? 1877 | planned | planning | prompt-pack/03-execution-checklist.md line 164: ## Phase 15: Coupon Module
?? 1878 | done | api_contract | prompt-pack/03-execution-checklist.md line 165: 1. Create coupon CRUD endpoints for admin.
? 1879 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 166: 2. Create coupon apply/preview logic.
?? 1880 | done | spec | prompt-pack/03-execution-checklist.md line 167: 3. Create eligibility evaluation service.
?? 1881 | tested | spec | prompt-pack/03-execution-checklist.md line 168: 4. Enforce max discount caps.
?? 1882 | partial | spec | prompt-pack/03-execution-checklist.md line 169: 5. Enforce per-user usage limits.
?? 1883 | planned | spec | prompt-pack/03-execution-checklist.md line 170: 6. Enforce global usage limits.
?? 1884 | suggested | spec | prompt-pack/03-execution-checklist.md line 171: 7. Enforce product/category scope logic.
? 1885 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 172: 8. Enforce delivery inclusion rules.
?? 1886 | planned | planning | prompt-pack/03-execution-checklist.md line 174: ## Phase 16: Wallet And Gift Cards
?? 1887 | done | api_contract | prompt-pack/03-execution-checklist.md line 175: 1. Create wallet balance endpoint.
?? 1888 | done | api_contract | prompt-pack/03-execution-checklist.md line 176: 2. Create wallet history endpoint.
?? 1889 | done | api_contract | prompt-pack/03-execution-checklist.md line 177: 3. Create gift card generation endpoints for admins.
?? 1890 | done | api_contract | prompt-pack/03-execution-checklist.md line 178: 4. Create gift card redeem endpoint.
?? 1891 | done | spec | prompt-pack/03-execution-checklist.md line 179: 5. Add transactional credit/debit flows.
?? 1892 | tested | verification | prompt-pack/03-execution-checklist.md line 180: 6. Add tests for single-use and balance updates.
?? 1893 | planned | planning | prompt-pack/03-execution-checklist.md line 182: ## Phase 17: Orders And Checkout
?? 1894 | done | api_contract | prompt-pack/03-execution-checklist.md line 183: 1. Create checkout endpoint.
? 1895 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 184: 2. Validate cart state at checkout.
?? 1896 | done | spec | prompt-pack/03-execution-checklist.md line 185: 3. Snapshot final pricing.
?? 1897 | tested | spec | prompt-pack/03-execution-checklist.md line 186: 4. Snapshot selected branch and zone.
?? 1898 | partial | spec | prompt-pack/03-execution-checklist.md line 187: 5. Snapshot coupon result.
?? 1899 | planned | spec | prompt-pack/03-execution-checklist.md line 188: 6. Snapshot wallet usage.
?? 1900 | done | api_contract | prompt-pack/03-execution-checklist.md line 189: 7. Create order detail endpoint.
?? 1901 | done | api_contract | prompt-pack/03-execution-checklist.md line 190: 8. Create order list endpoint.
?? 1902 | done | spec | prompt-pack/03-execution-checklist.md line 191: 9. Create cancel-within-grace-period flow.
?? 1903 | tested | spec | prompt-pack/03-execution-checklist.md line 192: 10. Create note-update-within-grace-period flow if kept in scope.
?? 1904 | planned | planning | prompt-pack/03-execution-checklist.md line 194: ## Phase 18: Order Operations
?? 1905 | done | api_contract | prompt-pack/03-execution-checklist.md line 195: 1. Create staff/admin order review endpoints.
? 1906 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 196: 2. Create order status transition actions.
?? 1907 | done | spec | prompt-pack/03-execution-checklist.md line 197: 3. Create delivery assignment action.
?? 1908 | tested | spec | prompt-pack/03-execution-checklist.md line 198: 4. Create status history output.
?? 1909 | partial | spec | prompt-pack/03-execution-checklist.md line 199: 5. Add transition policy checks.
?? 1910 | tested | verification | prompt-pack/03-execution-checklist.md line 200: 6. Add transition tests.
?? 1911 | planned | planning | prompt-pack/03-execution-checklist.md line 202: ## Phase 19: Reviews
?? 1912 | done | api_contract | prompt-pack/03-execution-checklist.md line 203: 1. Create review creation endpoint.
? 1913 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 204: 2. Require verified purchase eligibility.
?? 1914 | partial | spec | prompt-pack/03-execution-checklist.md line 205: 3. Allow anonymous flag.
?? 1915 | done | api_contract | prompt-pack/03-execution-checklist.md line 206: 4. Create moderation endpoints.
?? 1916 | tested | verification | prompt-pack/03-execution-checklist.md line 207: 5. Add tests for eligibility and moderation.
?? 1917 | planned | planning | prompt-pack/03-execution-checklist.md line 209: ## Phase 20: Settings And Dynamic Pages
?? 1918 | done | api_contract | prompt-pack/03-execution-checklist.md line 210: 1. Create settings read/update endpoints.
? 1919 | backlog_future | future | prompt-pack/03-execution-checklist.md line 211: 2. Separate settings by group or domain.
?? 1920 | done | api_contract | prompt-pack/03-execution-checklist.md line 212: 3. Create dynamic pages CRUD endpoints.
?? 1921 | done | api_contract | prompt-pack/03-execution-checklist.md line 213: 4. Create theme JSON import/export endpoints or service logic.
? 1922 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 214: 5. Validate payloads carefully.
?? 1923 | planned | planning | prompt-pack/03-execution-checklist.md line 216: ## Phase 21: Notifications
?? 1924 | partial | spec | prompt-pack/03-execution-checklist.md line 217: 1. Configure database notifications.
?? 1925 | planned | spec | prompt-pack/03-execution-checklist.md line 218: 2. Configure mail notification channels.
?? 1926 | suggested | spec | prompt-pack/03-execution-checklist.md line 219: 3. Add queued notifications where useful.
?? 1927 | suggested | suggestion | prompt-pack/03-execution-checklist.md line 220: 4. Add optional broadcasting hooks if kept in scope.
?? 1928 | done | security | prompt-pack/03-execution-checklist.md line 222: ## Phase 22: Security Hardening Pass
?? 1929 | partial | spec | prompt-pack/03-execution-checklist.md line 223: 1. Review rate limits.
?? 1930 | planned | spec | prompt-pack/03-execution-checklist.md line 224: 2. Review policy coverage.
?? 1931 | suggested | spec | prompt-pack/03-execution-checklist.md line 225: 3. Review free-text sanitization.
? 1932 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 226: 4. Review upload validation.
?? 1933 | done | spec | prompt-pack/03-execution-checklist.md line 227: 5. Review token flows.
?? 1934 | done | api_contract | prompt-pack/03-execution-checklist.md line 228: 6. Review exception JSON shape.
?? 1935 | done | customization | prompt-pack/03-execution-checklist.md line 229: 7. Review sensitive settings protection.
?? 1936 | planned | spec | prompt-pack/03-execution-checklist.md line 230: 8. Review audit logging for privileged actions.
?? 1937 | tested | verification | prompt-pack/03-execution-checklist.md line 232: ## Phase 23: Testing Pass
?? 1938 | tested | verification | prompt-pack/03-execution-checklist.md line 233: 1. Run unit tests.
?? 1939 | tested | verification | prompt-pack/03-execution-checklist.md line 234: 2. Run feature tests.
?? 1940 | tested | verification | prompt-pack/03-execution-checklist.md line 235: 3. Add missing regression tests.
?? 1941 | tested | verification | prompt-pack/03-execution-checklist.md line 236: 4. Test auth normalization.
?? 1942 | tested | verification | prompt-pack/03-execution-checklist.md line 237: 5. Test branch restrictions.
?? 1943 | tested | verification | prompt-pack/03-execution-checklist.md line 238: 6. Test coupon edge cases.
?? 1944 | tested | verification | prompt-pack/03-execution-checklist.md line 239: 7. Test wallet/gift-card flows.
?? 1945 | tested | verification | prompt-pack/03-execution-checklist.md line 240: 8. Test order grace period.
?? 1946 | tested | verification | prompt-pack/03-execution-checklist.md line 241: 9. Test review eligibility.
?? 1947 | tested | verification | prompt-pack/03-execution-checklist.md line 242: 10. Test localization-sensitive responses if implemented.
?? 1948 | planned | planning | prompt-pack/03-execution-checklist.md line 244: ## Phase 24: Documentation Pass
?? 1949 | done | spec | prompt-pack/03-execution-checklist.md line 245: 1. Create project `README.md`.
?? 1950 | tested | spec | prompt-pack/03-execution-checklist.md line 246: 2. Document setup steps.
?? 1951 | partial | spec | prompt-pack/03-execution-checklist.md line 247: 3. Document env variables.
?? 1952 | planned | spec | prompt-pack/03-execution-checklist.md line 248: 4. Document queue and Redis usage.
?? 1953 | done | security | prompt-pack/03-execution-checklist.md line 249: 5. Document authentication flow.
?? 1954 | done | api_contract | prompt-pack/03-execution-checklist.md line 250: 6. Document API versioning.
?? 1955 | done | api_contract | prompt-pack/03-execution-checklist.md line 251: 7. Document key endpoints.
?? 1956 | tested | verification | prompt-pack/03-execution-checklist.md line 252: 8. Document testing commands.
?? 1957 | partial | spec | prompt-pack/03-execution-checklist.md line 253: 9. Document assumptions.
? 1958 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 255: ## Required Output Behavior
? 1959 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 256: 1. Show terminal commands when the user explicitly asks for them.
?? 1960 | done | spec | prompt-pack/03-execution-checklist.md line 257: 2. Keep file changes organized.
?? 1961 | tested | spec | prompt-pack/03-execution-checklist.md line 258: 3. Avoid giant undifferentiated files.
?? 1962 | partial | spec | prompt-pack/03-execution-checklist.md line 259: 4. Prefer reusable services.
?? 1963 | planned | spec | prompt-pack/03-execution-checklist.md line 260: 5. Prefer explicit comments only where necessary.
?? 1964 | suggested | spec | prompt-pack/03-execution-checklist.md line 261: 6. Prefer backend-safe defaults over speculative convenience.
?? 1965 | done | spec | prompt-pack/03-execution-checklist.md line 263: ## Things The Downstream Agent Must Not Do
? 1966 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 264: 1. Must not create frontend code.
? 1967 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 265: 2. Must not create Blade files.
? 1968 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 266: 3. Must not create Livewire files.
? 1969 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 267: 4. Must not create Filament resources.
? 1970 | backlog_future | future | prompt-pack/03-execution-checklist.md line 268: 5. Must not create `android/` now.
? 1971 | backlog_future | future | prompt-pack/03-execution-checklist.md line 269: 6. Must not create `ios/` now.
?? 1972 | tested | spec | prompt-pack/03-execution-checklist.md line 270: 7. Must not discuss CSS/JS framework selection.
? 1973 | out_of_scope_backend_only | scope | prompt-pack/03-execution-checklist.md line 271: 8. Must not rely on frontend validation as security.
?? 1974 | suggested | spec | prompt-pack/03-execution-checklist.md line 273: ## Completion Gate
?? 1975 | planned | planning | prompt-pack/03-execution-checklist.md line 274: 1. `plans/` exists with files `00` through `12`.
?? 1976 | done | spec | prompt-pack/03-execution-checklist.md line 275: 2. `backend/` exists.
?? 1977 | tested | spec | prompt-pack/03-execution-checklist.md line 276: 3. Core packages are configured.
? 1978 | backlog_future | future | prompt-pack/03-execution-checklist.md line 277: 4. Main domains are implemented.
?? 1979 | tested | verification | prompt-pack/03-execution-checklist.md line 278: 5. Tests exist.
?? 1980 | suggested | spec | prompt-pack/03-execution-checklist.md line 279: 6. Documentation exists.
? 1981 | backlog_future | spec | prompt-pack/03-execution-checklist.md line 280: 7. Backend-only scope is preserved.
?? 1982 | planned | spec | prompt-pack/04-acceptance-checklist.md line 1: # Acceptance Checklist
? 1983 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 3: ## Purpose
?? 1984 | done | spec | prompt-pack/04-acceptance-checklist.md line 4: - هذا الملف يعرّف النجاح والفشل بشكل موضوعي.
?? 1985 | tested | spec | prompt-pack/04-acceptance-checklist.md line 5: - استخدمه لمراجعة prompt أو implementation ناتج من الـ prompt.
?? 1986 | partial | spec | prompt-pack/04-acceptance-checklist.md line 6: - إذا فشل أي بند حرج، اعتبر النتيجة غير مكتملة.
?? 1987 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 8: ## A. Scope Integrity
? 1988 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 9: - Does the prompt state `backend only` clearly at the top.
? 1989 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 10: - Does it explicitly ban frontend implementation.
? 1990 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 11: - Does it explicitly ban Blade.
? 1991 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 12: - Does it explicitly ban Livewire.
? 1992 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 13: - Does it explicitly ban Filament.
? 1993 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 14: - Does it explicitly ban UI design discussion.
? 1994 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 15: - Does it explicitly ban CSS/JS framework selection.
? 1995 | backlog_future | future | prompt-pack/04-acceptance-checklist.md line 16: - Does it keep Android and iOS as future consumers only.
?? 1996 | tested | spec | prompt-pack/04-acceptance-checklist.md line 17: - Does it keep `backend/` as the current active project folder.
? 1997 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 18: - Does it avoid creating `frontend/`, `android/`, or `ios/` now.
?? 1998 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 20: ## Fail Conditions For Scope
? 1999 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 21: - Any generated frontend code exists.
? 2000 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 22: - Any generated Blade template exists.
? 2001 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 23: - Any generated UI component exists.
? 2002 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 24: - Any section instructs selecting a frontend framework.
?? 2003 | planned | spec | prompt-pack/04-acceptance-checklist.md line 25: - Any section instructs designing pages visually.
? 2004 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 26: - Any section mixes backend tasks with frontend delivery.
?? 2005 | done | spec | prompt-pack/04-acceptance-checklist.md line 28: ## B. Technical Baseline Integrity
?? 2006 | tested | spec | prompt-pack/04-acceptance-checklist.md line 29: - Does the pack explicitly target `Laravel 13`.
?? 2007 | partial | spec | prompt-pack/04-acceptance-checklist.md line 30: - Does the pack explicitly target `PHP 8.3+`.
?? 2008 | tested | verification | prompt-pack/04-acceptance-checklist.md line 31: - Does it avoid vague wording like `latest maybe v12 or v13`.
?? 2009 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 32: - Does it avoid hardcoded local Windows executable paths.
? 2010 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 33: - Does it stay portable across environments.
? 2011 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 35: ## C. Planning Requirement Integrity
? 2012 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 36: - Does the prompt require `plans/` before implementation.
? 2013 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 37: - Does it list all required planning files.
?? 2014 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 38: - Does it include files `00` through `12`.
?? 2015 | planned | planning | prompt-pack/04-acceptance-checklist.md line 39: - Does it preserve exact planning file names.
?? 2016 | done | spec | prompt-pack/04-acceptance-checklist.md line 40: - Does it instruct the downstream agent to keep those files backend-only.
?? 2017 | done | api_contract | prompt-pack/04-acceptance-checklist.md line 42: ## D. API Contract Integrity
? 2018 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 43: - Are APIs required to be `RESTful` or REST-compatible.
? 2019 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 44: - Are responses required to be JSON only.
? 2020 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 45: - Is API versioning required from day one.
?? 2021 | done | api_contract | prompt-pack/04-acceptance-checklist.md line 46: - Is `/api/v1` specified clearly.
? 2022 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 47: - Is a consistent response envelope suggested or required.
?? 2023 | partial | spec | prompt-pack/04-acceptance-checklist.md line 48: - Are HTTP status codes mentioned.
?? 2024 | done | api_contract | prompt-pack/04-acceptance-checklist.md line 49: - Are validation errors expected in structured JSON.
?? 2025 | done | security | prompt-pack/04-acceptance-checklist.md line 51: ## E. Authentication Integrity
?? 2026 | done | spec | prompt-pack/04-acceptance-checklist.md line 52: - Is `Laravel Sanctum` the default auth choice.
?? 2027 | tested | spec | prompt-pack/04-acceptance-checklist.md line 53: - Does the pack prefer access tokens for cross-platform consumers.
? 2028 | backlog_future | future | prompt-pack/04-acceptance-checklist.md line 54: - Does it avoid session-only architecture as the primary mobile-ready approach.
?? 2029 | planned | spec | prompt-pack/04-acceptance-checklist.md line 55: - Does it mention multi-device token support.
?? 2030 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 56: - Does it mention logout and revocation behavior.
? 2031 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 57: - Does it require lowercase normalization for username and email.
?? 2032 | done | spec | prompt-pack/04-acceptance-checklist.md line 58: - Does it define password rules clearly.
?? 2033 | done | security | prompt-pack/04-acceptance-checklist.md line 60: ## F. Authorization Integrity
? 2034 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 61: - Are `Policies` required.
? 2035 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 62: - Are `Gates` required where needed.
? 2036 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 63: - Is `spatie/laravel-permission` required.
?? 2037 | done | spec | prompt-pack/04-acceptance-checklist.md line 64: - Are granular roles and permissions described.
?? 2038 | done | security | prompt-pack/04-acceptance-checklist.md line 65: - Is branch-scoped authorization described.
?? 2039 | partial | spec | prompt-pack/04-acceptance-checklist.md line 66: - Is super-admin behavior documented.
?? 2040 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 68: ## G. Branch And Catalog Integrity
? 2041 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 69: - Does the prompt require single-branch and multi-branch support.
? 2042 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 70: - Does it require delivery zones with fees.
? 2043 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 71: - Does it require per-branch product availability.
? 2044 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 72: - Does it require category nesting.
? 2045 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 73: - Does it require products in multiple categories.
? 2046 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 74: - Does it require tags.
? 2047 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 75: - Does it require sizes/variants.
? 2048 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 76: - Does it require add-on groups with single and multi select support.
?? 2049 | partial | spec | prompt-pack/04-acceptance-checklist.md line 78: ## H. Order And Checkout Integrity
? 2050 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 79: - Does the prompt require cart support for same product with different configurations.
? 2051 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 80: - Does it require branch compatibility validation at checkout.
? 2052 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 81: - Does it require pricing validation.
? 2053 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 82: - Does it require shipping calculation.
? 2054 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 83: - Does it require snapshotting final pricing into the order.
? 2055 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 84: - Does it require order status workflow.
? 2056 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 85: - Does it require the 2-minute grace period.
? 2057 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 86: - Does it require customer cancellation/edit constraints.
?? 2058 | done | spec | prompt-pack/04-acceptance-checklist.md line 88: ## I. Coupon And Wallet Integrity
? 2059 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 89: - Does the prompt require fixed and percentage coupons.
? 2060 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 90: - Does it require max discount caps.
? 2061 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 91: - Does it require minimum cart conditions.
? 2062 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 92: - Does it require specific product/category targeting.
? 2063 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 93: - Does it require per-user and global usage limits.
? 2064 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 94: - Does it require delivery-only or delivery-inclusive logic.
?? 2065 | tested | spec | prompt-pack/04-acceptance-checklist.md line 95: - Does it forbid converting extra discount remainder into wallet money by default.
? 2066 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 96: - Does it require wallet support.
? 2067 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 97: - Does it require gift-card support.
? 2068 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 99: ## J. Profile And Review Integrity
? 2069 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 100: - Does it require public profile API support.
? 2070 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 101: - Does it require privacy settings.
? 2071 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 102: - Does it require profile statistics.
? 2072 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 103: - Does it require verified-purchase reviews.
? 2073 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 104: - Does it require anonymous review option.
? 2074 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 105: - Does it require moderation capability.
?? 2075 | done | customization | prompt-pack/04-acceptance-checklist.md line 107: ## K. Settings And Dynamic Content Integrity
? 2076 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 108: - Does it require global settings.
? 2077 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 109: - Does it require feature toggles.
? 2078 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 110: - Does it require currency configurability.
?? 2079 | done | api_contract | prompt-pack/04-acceptance-checklist.md line 111: - Does it treat theme JSON as backend-managed data.
? 2080 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 112: - Does it avoid turning theme JSON into frontend rendering work.
? 2081 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 113: - Does it require dynamic page entities via API.
?? 2082 | done | security | prompt-pack/04-acceptance-checklist.md line 115: ## L. Security Integrity
?? 2083 | done | security | prompt-pack/04-acceptance-checklist.md line 116: - Does the pack explicitly mention XSS defense.
?? 2084 | done | security | prompt-pack/04-acceptance-checklist.md line 117: - Does the pack explicitly mention SQL injection defense.
?? 2085 | done | spec | prompt-pack/04-acceptance-checklist.md line 118: - Does the pack explicitly mention mass assignment defense.
?? 2086 | tested | spec | prompt-pack/04-acceptance-checklist.md line 119: - Does the pack explicitly mention file upload validation.
?? 2087 | partial | spec | prompt-pack/04-acceptance-checklist.md line 120: - Does the pack explicitly mention rate limiting.
?? 2088 | planned | spec | prompt-pack/04-acceptance-checklist.md line 121: - Does the pack explicitly mention free-text sanitization.
?? 2089 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 122: - Does the pack explicitly mention token handling safety.
?? 2090 | done | security | prompt-pack/04-acceptance-checklist.md line 123: - Does the pack explicitly mention branch/order authorization safety.
?? 2091 | done | spec | prompt-pack/04-acceptance-checklist.md line 124: - Does it mention auditability for sensitive actions.
?? 2092 | tested | verification | prompt-pack/04-acceptance-checklist.md line 126: ## M. Testing Integrity
? 2093 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 127: - Does the prompt require feature tests.
? 2094 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 128: - Does the prompt require unit tests.
? 2095 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 129: - Does the prompt require security-sensitive tests.
?? 2096 | tested | verification | prompt-pack/04-acceptance-checklist.md line 130: - Does it mention auth tests.
?? 2097 | tested | security | prompt-pack/04-acceptance-checklist.md line 131: - Does it mention authorization tests.
?? 2098 | tested | verification | prompt-pack/04-acceptance-checklist.md line 132: - Does it mention coupon edge-case tests.
?? 2099 | tested | verification | prompt-pack/04-acceptance-checklist.md line 133: - Does it mention order grace-period tests.
?? 2100 | tested | verification | prompt-pack/04-acceptance-checklist.md line 134: - Does it mention review eligibility tests.
?? 2101 | done | spec | prompt-pack/04-acceptance-checklist.md line 136: ## N. Documentation Integrity
? 2102 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 137: - Does it require a project `README.md`.
? 2103 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 138: - Does it require setup documentation.
? 2104 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 139: - Does it require environment variable documentation.
? 2105 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 140: - Does it require authentication flow documentation.
? 2106 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 141: - Does it require API/versioning documentation.
? 2107 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 142: - Does it require internal plan docs.
?? 2108 | partial | spec | prompt-pack/04-acceptance-checklist.md line 144: ## O. Prompt-Pack Quality Integrity
?? 2109 | planned | spec | prompt-pack/04-acceptance-checklist.md line 145: - Is Arabic the primary narrative language.
?? 2110 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 146: - Is English used mainly for technical precision.
? 2111 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 147: - Is the content organized rather than duplicated blindly.
?? 2112 | done | spec | prompt-pack/04-acceptance-checklist.md line 148: - Is the combined pack larger than 1000 meaningful lines.
?? 2113 | tested | spec | prompt-pack/04-acceptance-checklist.md line 149: - Is the content free from obvious padding lines.
?? 2114 | partial | spec | prompt-pack/04-acceptance-checklist.md line 150: - Is the content reusable across `Codex`, `Claude`, and `Gemini Pro`.
?? 2115 | planned | spec | prompt-pack/04-acceptance-checklist.md line 151: - Does it avoid vendor-exclusive syntax dependencies.
? 2116 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 153: ## P. Portable Prompt Integrity
?? 2117 | done | spec | prompt-pack/04-acceptance-checklist.md line 154: - No hardcoded local `php.exe` path.
?? 2118 | tested | spec | prompt-pack/04-acceptance-checklist.md line 155: - No local username path assumptions.
?? 2119 | suggested | suggestion | prompt-pack/04-acceptance-checklist.md line 156: - No OS-locked launcher commands unless clearly optional.
?? 2120 | planned | spec | prompt-pack/04-acceptance-checklist.md line 157: - No editor-specific dependency.
? 2121 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 159: ## Q. Implementation Acceptance For A Downstream Run
?? 2122 | planned | planning | prompt-pack/04-acceptance-checklist.md line 160: - `plans/00` through `plans/12` exist.
?? 2123 | tested | spec | prompt-pack/04-acceptance-checklist.md line 161: - `backend/` exists as Laravel 13 project.
?? 2124 | partial | spec | prompt-pack/04-acceptance-checklist.md line 162: - Core packages are installed and configured.
?? 2125 | done | api_contract | prompt-pack/04-acceptance-checklist.md line 163: - API versioning exists.
?? 2126 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 164: - Auth works with Sanctum.
? 2127 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 165: - Permissions work with Spatie.
?? 2128 | done | spec | prompt-pack/04-acceptance-checklist.md line 166: - Branches and delivery zones exist.
?? 2129 | tested | spec | prompt-pack/04-acceptance-checklist.md line 167: - Catalog entities exist.
?? 2130 | partial | spec | prompt-pack/04-acceptance-checklist.md line 168: - Cart and checkout logic exist.
?? 2131 | planned | spec | prompt-pack/04-acceptance-checklist.md line 169: - Orders and status transitions exist.
?? 2132 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 170: - Coupons, wallet, and gift cards exist.
? 2133 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 171: - Reviews and profiles exist.
?? 2134 | done | customization | prompt-pack/04-acceptance-checklist.md line 172: - Settings and dynamic pages exist.
?? 2135 | tested | verification | prompt-pack/04-acceptance-checklist.md line 173: - Tests exist.
?? 2136 | partial | spec | prompt-pack/04-acceptance-checklist.md line 174: - Documentation exists.
?? 2137 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 176: ## R. Red Flags
? 2138 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 177: - The agent says “frontend later” and still creates frontend code now.
?? 2139 | done | spec | prompt-pack/04-acceptance-checklist.md line 178: - The agent chooses a JS framework.
? 2140 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 179: - The agent generates Blade templates “just for testing”.
?? 2141 | partial | spec | prompt-pack/04-acceptance-checklist.md line 180: - The agent stores unsafe raw HTML without policy.
? 2142 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 181: - The agent uses sessions as the only auth strategy despite the cross-platform token requirement.
?? 2143 | planned | planning | prompt-pack/04-acceptance-checklist.md line 182: - The agent skips plan files.
? 2144 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 183: - The agent leaves coupon edge-case behavior undocumented.
?? 2145 | done | spec | prompt-pack/04-acceptance-checklist.md line 184: - The agent ignores branch availability validation.
?? 2146 | tested | spec | prompt-pack/04-acceptance-checklist.md line 185: - The agent leaves free-text sanitization unspecified.
?? 2147 | planned | spec | prompt-pack/04-acceptance-checklist.md line 187: ## S. Pass Definition
?? 2148 | tested | security | prompt-pack/04-acceptance-checklist.md line 188: - All critical scope, security, API, auth, branch, order, and testing checks pass.
? 2149 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 189: - No frontend artifacts are present.
?? 2150 | done | spec | prompt-pack/04-acceptance-checklist.md line 190: - No critical business rule is missing.
?? 2151 | tested | spec | prompt-pack/04-acceptance-checklist.md line 191: - No machine-specific path assumption remains.
?? 2152 | partial | spec | prompt-pack/04-acceptance-checklist.md line 192: - The result is implementation-ready.
?? 2153 | suggested | spec | prompt-pack/04-acceptance-checklist.md line 194: ## T. Reviewer Decision Template
? 2154 | backlog_future | spec | prompt-pack/04-acceptance-checklist.md line 195: - `PASS` if all critical items are satisfied and no red flag is present.
?? 2155 | done | security | prompt-pack/04-acceptance-checklist.md line 196: - `PASS WITH MINOR GAPS` only if gaps are documentation-level and do not change scope or security.
?? 2156 | tested | spec | prompt-pack/04-acceptance-checklist.md line 197: - `FAIL` if backend-only scope is broken.
?? 2157 | done | security | prompt-pack/04-acceptance-checklist.md line 198: - `FAIL` if auth/security rules are materially incomplete.
?? 2158 | planned | planning | prompt-pack/04-acceptance-checklist.md line 199: - `FAIL` if planning docs are missing.
? 2159 | out_of_scope_backend_only | scope | prompt-pack/04-acceptance-checklist.md line 200: - `FAIL` if the prompt still mixes frontend implementation into the build request.
?? 2160 | suggested | spec | prompt-pack/README.md line 1: # Backend-Only Prompt Pack
?? 2161 | done | spec | prompt-pack/README.md line 3: ## Purpose
?? 2162 | tested | spec | prompt-pack/README.md line 4: - This folder contains a reusable bilingual prompt pack.
?? 2163 | partial | spec | prompt-pack/README.md line 5: - The pack is optimized for `Codex`, `Claude`, and `Gemini Pro`.
?? 2164 | planned | spec | prompt-pack/README.md line 6: - The pack is intentionally `backend only`.
? 2165 | out_of_scope_backend_only | scope | prompt-pack/README.md line 7: - It removes all frontend implementation scope from the original brief.
? 2166 | backlog_future | future | prompt-pack/README.md line 8: - It keeps mobile and website clients only as future `API consumers`.
?? 2167 | tested | spec | prompt-pack/README.md line 10: ## Verified Baseline
?? 2168 | partial | spec | prompt-pack/README.md line 11: - Date lock for this pack: `April 11, 2026`.
?? 2169 | planned | spec | prompt-pack/README.md line 12: - Verified assumption used in the pack: `Laravel 13.x` exists in official documentation.
? 2170 | out_of_scope_backend_only | scope | prompt-pack/README.md line 13: - Verified baseline used in the pack: `PHP 8.3+` is required for the Laravel 13 generation being targeted here.
? 2171 | backlog_future | spec | prompt-pack/README.md line 14: - This pack uses portable wording.
?? 2172 | done | spec | prompt-pack/README.md line 15: - This pack does not include local Windows launcher paths.
?? 2173 | tested | spec | prompt-pack/README.md line 16: - This pack does not assume one machine, one shell profile, or one editor.
?? 2174 | planned | spec | prompt-pack/README.md line 18: ## Main Goal
?? 2175 | suggested | spec | prompt-pack/README.md line 19: - Rewrite the user brief into a high-control prompt pack.
? 2176 | backlog_future | spec | prompt-pack/README.md line 20: - Keep the narrative primarily Arabic.
?? 2177 | done | spec | prompt-pack/README.md line 21: - Keep English for technical terms and backend contracts.
? 2178 | out_of_scope_backend_only | scope | prompt-pack/README.md line 22: - Convert vague wishes into enforceable backend requirements.
?? 2179 | partial | spec | prompt-pack/README.md line 23: - Make the output safer for code-generation agents.
?? 2180 | suggested | spec | prompt-pack/README.md line 25: ## Hard Scope
?? 2181 | done | api_contract | prompt-pack/README.md line 26: - `Laravel 13 API backend only`
? 2182 | out_of_scope_backend_only | scope | prompt-pack/README.md line 27: - `No frontend`
? 2183 | out_of_scope_backend_only | scope | prompt-pack/README.md line 28: - `No Blade`
? 2184 | out_of_scope_backend_only | scope | prompt-pack/README.md line 29: - `No Livewire`
? 2185 | out_of_scope_backend_only | scope | prompt-pack/README.md line 30: - `No Filament`
? 2186 | out_of_scope_backend_only | scope | prompt-pack/README.md line 31: - `No UI design`
? 2187 | backlog_future | spec | prompt-pack/README.md line 32: - `No CSS frameworks`
?? 2188 | done | spec | prompt-pack/README.md line 33: - `No JavaScript frameworks`
? 2189 | backlog_future | future | prompt-pack/README.md line 34: - `No mobile app code`
? 2190 | backlog_future | future | prompt-pack/README.md line 35: - `No Android project`
? 2191 | backlog_future | future | prompt-pack/README.md line 36: - `No iOS project`
? 2192 | backlog_future | spec | prompt-pack/README.md line 38: ## Folder Contents
?? 2193 | done | spec | prompt-pack/README.md line 39: - `00-master-backend-only-prompt.md`
?? 2194 | tested | spec | prompt-pack/README.md line 40: - `01-architecture-spec-companion.md`
?? 2195 | done | security | prompt-pack/README.md line 41: - `02-security-auth-companion.md`
?? 2196 | planned | spec | prompt-pack/README.md line 42: - `03-execution-checklist.md`
?? 2197 | suggested | spec | prompt-pack/README.md line 43: - `04-acceptance-checklist.md`
?? 2198 | done | spec | prompt-pack/README.md line 45: ## How To Use
?? 2199 | tested | spec | prompt-pack/README.md line 46: 1. Start with `00-master-backend-only-prompt.md`.
?? 2200 | partial | spec | prompt-pack/README.md line 47: 2. Paste it into your target coding agent.
?? 2201 | planned | spec | prompt-pack/README.md line 48: 3. Attach the companion files if the agent can consume multiple docs.
?? 2202 | suggested | spec | prompt-pack/README.md line 49: 4. If the agent handles only one prompt, merge the master prompt with the checklists.
? 2203 | out_of_scope_backend_only | scope | prompt-pack/README.md line 50: 5. If the agent tends to drift into frontend work, attach `04-acceptance-checklist.md` as a guardrail.
?? 2204 | tested | spec | prompt-pack/README.md line 52: ## Recommended Usage By Agent Type
?? 2205 | partial | spec | prompt-pack/README.md line 53: ### Codex
?? 2206 | planned | spec | prompt-pack/README.md line 54: - Use the master prompt as the system or task body.
?? 2207 | suggested | spec | prompt-pack/README.md line 55: - Attach the execution checklist when you want strict ordering.
? 2208 | backlog_future | spec | prompt-pack/README.md line 56: - Attach the acceptance checklist when you want hard review gates.
?? 2209 | tested | spec | prompt-pack/README.md line 58: ### Claude
?? 2210 | partial | spec | prompt-pack/README.md line 59: - Use the master prompt first.
?? 2211 | planned | planning | prompt-pack/README.md line 60: - Add the architecture companion if you want better planning depth.
?? 2212 | done | security | prompt-pack/README.md line 61: - Add the security companion if the run is security-sensitive.
?? 2213 | done | spec | prompt-pack/README.md line 63: ### Gemini Pro
?? 2214 | tested | spec | prompt-pack/README.md line 64: - Use the master prompt plus the acceptance checklist.
?? 2215 | partial | spec | prompt-pack/README.md line 65: - Keep the execution checklist nearby to reduce scope drift.
?? 2216 | planned | spec | prompt-pack/README.md line 66: - Prefer the shorter section headers when pasting into constrained contexts.
? 2217 | backlog_future | spec | prompt-pack/README.md line 68: ## Why The Pack Is Split
?? 2218 | done | spec | prompt-pack/README.md line 69: - One giant prompt becomes hard to audit.
?? 2219 | tested | spec | prompt-pack/README.md line 70: - Splitting improves reuse.
?? 2220 | partial | spec | prompt-pack/README.md line 71: - Splitting makes backend constraints easier to enforce.
?? 2221 | planned | spec | prompt-pack/README.md line 72: - Splitting allows one file to act as the canonical prompt and the others as control layers.
? 2222 | backlog_future | future | prompt-pack/README.md line 73: - Splitting makes future edits safer.
?? 2223 | done | spec | prompt-pack/README.md line 75: ## What The Pack Intentionally Preserves
?? 2224 | tested | spec | prompt-pack/README.md line 76: - Arabic-first product context.
?? 2225 | partial | spec | prompt-pack/README.md line 77: - Egyptian and Arabic restaurant business needs.
?? 2226 | planned | spec | prompt-pack/README.md line 78: - Multi-branch support.
?? 2227 | suggested | spec | prompt-pack/README.md line 79: - Wallet, coupons, gift cards, and delivery logic.
? 2228 | backlog_future | spec | prompt-pack/README.md line 80: - Admin-driven configurability.
? 2229 | backlog_future | future | prompt-pack/README.md line 81: - Future mobile compatibility.
?? 2230 | partial | spec | prompt-pack/README.md line 83: ## What The Pack Intentionally Removes
? 2231 | out_of_scope_backend_only | scope | prompt-pack/README.md line 84: - Frontend stack research.
?? 2232 | suggested | spec | prompt-pack/README.md line 85: - Website visual design discussion.
? 2233 | backlog_future | spec | prompt-pack/README.md line 86: - Animation libraries.
? 2234 | out_of_scope_backend_only | scope | prompt-pack/README.md line 87: - Blade or server-rendered pages.
? 2235 | out_of_scope_backend_only | scope | prompt-pack/README.md line 88: - Frontend validation implementation details.
?? 2236 | partial | spec | prompt-pack/README.md line 89: - Any instruction to generate HTML, CSS, Tailwind, React, Vue, Angular, or similar.
?? 2237 | suggested | spec | prompt-pack/README.md line 91: ## Backend Philosophy
?? 2238 | done | api_contract | prompt-pack/README.md line 92: - API-first.
?? 2239 | done | spec | prompt-pack/README.md line 93: - Modular.
?? 2240 | tested | spec | prompt-pack/README.md line 94: - Secure by default.
? 2241 | backlog_future | future | prompt-pack/README.md line 95: - Future-proof for mobile consumption.
?? 2242 | done | customization | prompt-pack/README.md line 96: - Configurable via backend-managed settings.
?? 2243 | suggested | spec | prompt-pack/README.md line 97: - Clear contracts before code generation.
?? 2244 | done | spec | prompt-pack/README.md line 99: ## Important Reminder
? 2245 | out_of_scope_backend_only | scope | prompt-pack/README.md line 100: - The master prompt requires the implementing agent to create internal project planning documents first.
?? 2246 | planned | planning | prompt-pack/README.md line 101: - Those documents live under `plans/`.
?? 2247 | planned | planning | prompt-pack/README.md line 102: - The internal planning sequence remains:
?? 2248 | planned | planning | prompt-pack/README.md line 103: - `plans/00-full-project-overview.md`
?? 2249 | planned | planning | prompt-pack/README.md line 104: - `plans/01-database-schema-and-models.md`
?? 2250 | planned | planning | prompt-pack/README.md line 105: - `plans/02-api-endpoints-and-versioning.md`
?? 2251 | done | security | prompt-pack/README.md line 106: - `plans/03-authentication-and-authorization.md`
?? 2252 | planned | planning | prompt-pack/README.md line 107: - `plans/04-branches-and-menus-system.md`
?? 2253 | planned | planning | prompt-pack/README.md line 108: - `plans/05-products-categories-sizes-addons.md`
?? 2254 | planned | planning | prompt-pack/README.md line 109: - `plans/06-reviews-ratings-tags-best-sellers.md`
?? 2255 | planned | planning | prompt-pack/README.md line 110: - `plans/07-users-profiles-addresses-wallet-giftcards.md`
?? 2256 | planned | planning | prompt-pack/README.md line 111: - `plans/08-cart-orders-checkout-shipping-coupons.md`
?? 2257 | planned | planning | prompt-pack/README.md line 112: - `plans/09-admin-roles-permissions-notifications.md`
?? 2258 | tested | security | prompt-pack/README.md line 113: - `plans/10-security-best-practices-and-testing.md`
?? 2259 | planned | planning | prompt-pack/README.md line 114: - `plans/11-localization-arabic-english.md`
? 2260 | backlog_future | future | prompt-pack/README.md line 115: - `plans/12-scalability-and-future-mobile.md`
?? 2261 | done | spec | prompt-pack/README.md line 117: ## Output Expectations From The Downstream Agent
?? 2262 | tested | spec | prompt-pack/README.md line 118: - It must stay backend-only.
? 2263 | out_of_scope_backend_only | scope | prompt-pack/README.md line 119: - It must not create frontend folders.
? 2264 | out_of_scope_backend_only | scope | prompt-pack/README.md line 120: - It must not invent UI implementation work.
?? 2265 | done | api_contract | prompt-pack/README.md line 121: - It must produce JSON APIs only.
? 2266 | backlog_future | spec | prompt-pack/README.md line 122: - It must use secure defaults.
?? 2267 | tested | verification | prompt-pack/README.md line 123: - It must include tests.
?? 2268 | partial | spec | prompt-pack/README.md line 125: ## Maintenance Notes
?? 2269 | planned | spec | prompt-pack/README.md line 126: - If Laravel major-version facts change later, update the baseline section first.
?? 2270 | suggested | spec | prompt-pack/README.md line 127: - If your business rules change, update the master prompt and the acceptance checklist together.
?? 2271 | done | security | prompt-pack/README.md line 128: - If you add payment providers later, update the architecture and security companions together.
?? 2272 | suggested | spec | plans/00-full-project-overview.md line 1: # Full Project Overview
?? 2273 | done | spec | plans/00-full-project-overview.md line 3: ## Objective
? 2274 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 4: - Build a `Laravel 13` backend-only platform for an Egyptian/Arabic online restaurant.
?? 2275 | partial | spec | plans/00-full-project-overview.md line 5: - Keep the current scope strictly inside `backend/`.
? 2276 | backlog_future | future | plans/00-full-project-overview.md line 6: - Serve future clients through versioned JSON APIs.
?? 2277 | tested | security | plans/00-full-project-overview.md line 7: - Prioritize security, modularity, testability, and future mobile reuse.
?? 2278 | done | spec | plans/00-full-project-overview.md line 9: ## Hard Scope
? 2279 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 10: - Build `RESTful JSON APIs`.
? 2280 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 11: - Build backend services and business rules.
? 2281 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 12: - Build admin-facing API capabilities only.
? 2282 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 13: - Build no frontend, no Blade, no Filament, no Livewire.
? 2283 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 14: - Build no Android and no iOS projects now.
?? 2284 | tested | spec | plans/00-full-project-overview.md line 16: ## Business Goals
?? 2285 | partial | spec | plans/00-full-project-overview.md line 17: - Support Arabic as the primary language.
?? 2286 | planned | spec | plans/00-full-project-overview.md line 18: - Support English as the secondary language.
?? 2287 | suggested | spec | plans/00-full-project-overview.md line 19: - Support one branch or multiple branches.
? 2288 | backlog_future | spec | plans/00-full-project-overview.md line 20: - Support advanced product options and pricing rules.
?? 2289 | done | spec | plans/00-full-project-overview.md line 21: - Support complex checkout, coupons, wallet, gift cards, and order tracking.
?? 2290 | done | api_contract | plans/00-full-project-overview.md line 22: - Support configurable settings and dynamic content through backend APIs.
?? 2291 | planned | spec | plans/00-full-project-overview.md line 24: ## Technical Baseline
?? 2292 | suggested | spec | plans/00-full-project-overview.md line 25: | Item | Decision |
? 2293 | backlog_future | spec | plans/00-full-project-overview.md line 26: | --- | --- |
?? 2294 | done | spec | plans/00-full-project-overview.md line 27: | Framework | Laravel 13 |
?? 2295 | tested | spec | plans/00-full-project-overview.md line 28: | PHP | 8.3+ |
?? 2296 | partial | spec | plans/00-full-project-overview.md line 29: | DB | SQLite by default for local simplicity |
?? 2297 | planned | spec | plans/00-full-project-overview.md line 30: | Queue | Redis-ready, DB fallback for local |
?? 2298 | suggested | spec | plans/00-full-project-overview.md line 31: | Cache | Redis-ready, file/database fallback locally |
? 2299 | backlog_future | spec | plans/00-full-project-overview.md line 32: | Auth | Laravel Sanctum access tokens |
?? 2300 | done | spec | plans/00-full-project-overview.md line 33: | Permissions | Spatie Laravel Permission |
?? 2301 | done | api_contract | plans/00-full-project-overview.md line 34: | API Style | `/api/v1/*` JSON only |
?? 2302 | tested | verification | plans/00-full-project-overview.md line 35: | Testing | PHPUnit/Pest compatible, feature-first |
?? 2303 | suggested | spec | plans/00-full-project-overview.md line 37: ## Target Consumers
? 2304 | backlog_future | future | plans/00-full-project-overview.md line 38: - Website client in the future.
? 2305 | backlog_future | future | plans/00-full-project-overview.md line 39: - Android app in the future.
? 2306 | backlog_future | future | plans/00-full-project-overview.md line 40: - iOS app in the future.
? 2307 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 41: - Internal admin panel UI in the future.
? 2308 | backlog_future | future | plans/00-full-project-overview.md line 42: - Customer support tools in the future.
? 2309 | backlog_future | future | plans/00-full-project-overview.md line 44: ## Domain Map
?? 2310 | done | spec | plans/00-full-project-overview.md line 45: ```text
?? 2311 | tested | spec | plans/00-full-project-overview.md line 46: Identity
?? 2312 | partial | spec | plans/00-full-project-overview.md line 47: ├─ Auth
?? 2313 | planned | spec | plans/00-full-project-overview.md line 48: ├─ Users
?? 2314 | suggested | spec | plans/00-full-project-overview.md line 49: ├─ Profiles
? 2315 | backlog_future | spec | plans/00-full-project-overview.md line 50: └─ Addresses
?? 2316 | tested | spec | plans/00-full-project-overview.md line 52: Commerce
?? 2317 | partial | spec | plans/00-full-project-overview.md line 53: ├─ Branches
?? 2318 | planned | spec | plans/00-full-project-overview.md line 54: ├─ Delivery Zones
?? 2319 | suggested | spec | plans/00-full-project-overview.md line 55: ├─ Categories
? 2320 | backlog_future | spec | plans/00-full-project-overview.md line 56: ├─ Tags
?? 2321 | done | spec | plans/00-full-project-overview.md line 57: ├─ Products
?? 2322 | tested | spec | plans/00-full-project-overview.md line 58: ├─ Variants / Sizes
?? 2323 | partial | spec | plans/00-full-project-overview.md line 59: ├─ Addon Groups
?? 2324 | planned | spec | plans/00-full-project-overview.md line 60: ├─ Cart
?? 2325 | suggested | spec | plans/00-full-project-overview.md line 61: ├─ Orders
? 2326 | backlog_future | spec | plans/00-full-project-overview.md line 62: ├─ Coupons
?? 2327 | done | spec | plans/00-full-project-overview.md line 63: ├─ Wallet
?? 2328 | tested | spec | plans/00-full-project-overview.md line 64: └─ Gift Cards
?? 2329 | planned | spec | plans/00-full-project-overview.md line 66: Platform
?? 2330 | done | customization | plans/00-full-project-overview.md line 67: ├─ Settings
? 2331 | backlog_future | spec | plans/00-full-project-overview.md line 68: ├─ Dynamic Pages
?? 2332 | done | spec | plans/00-full-project-overview.md line 69: ├─ Notifications
?? 2333 | tested | spec | plans/00-full-project-overview.md line 70: ├─ Roles / Permissions
?? 2334 | partial | spec | plans/00-full-project-overview.md line 71: └─ Audit Logs
?? 2335 | planned | spec | plans/00-full-project-overview.md line 72: ```
? 2336 | backlog_future | spec | plans/00-full-project-overview.md line 74: ## Main User Roles
?? 2337 | done | spec | plans/00-full-project-overview.md line 75: - Customer.
?? 2338 | tested | spec | plans/00-full-project-overview.md line 76: - Super Admin.
?? 2339 | partial | spec | plans/00-full-project-overview.md line 77: - Branch Manager.
?? 2340 | planned | spec | plans/00-full-project-overview.md line 78: - Orders Manager.
?? 2341 | suggested | spec | plans/00-full-project-overview.md line 79: - Support Agent.
? 2342 | backlog_future | spec | plans/00-full-project-overview.md line 80: - Content Moderator.
?? 2343 | done | spec | plans/00-full-project-overview.md line 81: - Delivery Coordinator.
?? 2344 | partial | spec | plans/00-full-project-overview.md line 83: ## Main Customer Flows
?? 2345 | planned | spec | plans/00-full-project-overview.md line 84: 1. Register or login.
?? 2346 | suggested | spec | plans/00-full-project-overview.md line 85: 2. Browse branches and menu.
? 2347 | backlog_future | spec | plans/00-full-project-overview.md line 86: 3. Add configured products to cart.
?? 2348 | done | spec | plans/00-full-project-overview.md line 87: 4. Select branch and delivery zone.
?? 2349 | tested | spec | plans/00-full-project-overview.md line 88: 5. Apply coupon if eligible.
?? 2350 | partial | spec | plans/00-full-project-overview.md line 89: 6. Use wallet if desired.
?? 2351 | planned | spec | plans/00-full-project-overview.md line 90: 7. Checkout and create order.
?? 2352 | suggested | spec | plans/00-full-project-overview.md line 91: 8. Track order status.
? 2353 | backlog_future | spec | plans/00-full-project-overview.md line 92: 9. Submit verified review after fulfillment.
?? 2354 | tested | spec | plans/00-full-project-overview.md line 94: ## Main Admin Flows
?? 2355 | partial | spec | plans/00-full-project-overview.md line 95: 1. Create/manage branches.
?? 2356 | planned | spec | plans/00-full-project-overview.md line 96: 2. Create/manage categories, tags, products, sizes, and add-ons.
?? 2357 | suggested | spec | plans/00-full-project-overview.md line 97: 3. Control product branch availability.
? 2358 | backlog_future | spec | plans/00-full-project-overview.md line 98: 4. Create/manage coupons and gift cards.
?? 2359 | done | customization | plans/00-full-project-overview.md line 99: 5. Control general settings and feature toggles.
?? 2360 | tested | spec | plans/00-full-project-overview.md line 100: 6. Review and update order statuses.
?? 2361 | partial | spec | plans/00-full-project-overview.md line 101: 7. Assign delivery person details.
?? 2362 | planned | spec | plans/00-full-project-overview.md line 102: 8. Moderate reviews.
?? 2363 | suggested | spec | plans/00-full-project-overview.md line 103: 9. Manage roles and permissions.
? 2364 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 105: ## Core Non-Functional Requirements
?? 2365 | tested | spec | plans/00-full-project-overview.md line 106: - Secure by default.
?? 2366 | partial | spec | plans/00-full-project-overview.md line 107: - Scalable code organization.
?? 2367 | planned | spec | plans/00-full-project-overview.md line 108: - Small reusable classes.
?? 2368 | tested | verification | plans/00-full-project-overview.md line 109: - Test coverage for critical flows.
?? 2369 | done | api_contract | plans/00-full-project-overview.md line 110: - JSON-only error handling.
?? 2370 | done | api_contract | plans/00-full-project-overview.md line 111: - Stable API contracts.
?? 2371 | tested | spec | plans/00-full-project-overview.md line 112: - Localizable content.
?? 2372 | partial | spec | plans/00-full-project-overview.md line 113: - Consistent monetary calculations.
?? 2373 | suggested | spec | plans/00-full-project-overview.md line 115: ## Delivery Decisions
? 2374 | backlog_future | spec | plans/00-full-project-overview.md line 116: - Use `backend/` as the Laravel root.
?? 2375 | planned | planning | plans/00-full-project-overview.md line 117: - Use `plans/` in repo root as implementation documentation.
?? 2376 | tested | spec | plans/00-full-project-overview.md line 118: - Use SQLite for local development to reduce setup friction.
?? 2377 | partial | spec | plans/00-full-project-overview.md line 119: - Keep database design MySQL-compatible where possible.
?? 2378 | planned | spec | plans/00-full-project-overview.md line 120: - Prepare storage/CDN abstraction for uploaded files.
? 2379 | backlog_future | spec | plans/00-full-project-overview.md line 122: ## Module Strategy
?? 2380 | done | spec | plans/00-full-project-overview.md line 123: - Start with shared foundations.
? 2381 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 124: - Build auth and user modules first.
? 2382 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 125: - Build branch, settings, and catalog foundations next.
? 2383 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 126: - Build cart and order logic after catalog validation exists.
? 2384 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 127: - Build wallet, coupons, and gift cards after order pricing services exist.
? 2385 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 128: - Build reviews, notifications, and dynamic pages after core commerce flows.
?? 2386 | tested | spec | plans/00-full-project-overview.md line 130: ## Shared Conventions
?? 2387 | partial | spec | plans/00-full-project-overview.md line 131: - `snake_case` database columns.
? 2388 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 132: - UUIDs optional later, numeric IDs acceptable for v1 unless otherwise required.
?? 2389 | suggested | spec | plans/00-full-project-overview.md line 133: - Lowercase normalization for email and username.
?? 2390 | done | api_contract | plans/00-full-project-overview.md line 134: - API resources for response formatting.
?? 2391 | done | spec | plans/00-full-project-overview.md line 135: - Form requests for request validation.
?? 2392 | tested | spec | plans/00-full-project-overview.md line 136: - Services for business rules.
?? 2393 | done | security | plans/00-full-project-overview.md line 137: - Policies for authorization.
?? 2394 | planned | spec | plans/00-full-project-overview.md line 138: - Enums for statuses and important types.
? 2395 | backlog_future | spec | plans/00-full-project-overview.md line 140: ## Order Lifecycle Overview
?? 2396 | done | spec | plans/00-full-project-overview.md line 141: ```text
?? 2397 | tested | spec | plans/00-full-project-overview.md line 142: created
?? 2398 | pending | todo | plans/00-full-project-overview.md line 143: -> pending
?? 2399 | planned | spec | plans/00-full-project-overview.md line 144: -> confirmed
?? 2400 | suggested | spec | plans/00-full-project-overview.md line 145: -> preparing
? 2401 | backlog_future | spec | plans/00-full-project-overview.md line 146: -> out_for_delivery
?? 2402 | done | spec | plans/00-full-project-overview.md line 147: -> delivered
?? 2403 | tested | spec | plans/00-full-project-overview.md line 148: -> cancelled
?? 2404 | partial | spec | plans/00-full-project-overview.md line 149: -> refunded
?? 2405 | planned | spec | plans/00-full-project-overview.md line 150: ```
? 2406 | backlog_future | spec | plans/00-full-project-overview.md line 152: ## Grace Period Rule
?? 2407 | done | spec | plans/00-full-project-overview.md line 153: - Orders remain customer-editable/cancelable for `2 minutes`.
?? 2408 | tested | spec | plans/00-full-project-overview.md line 154: - This value should be configurable.
?? 2409 | partial | spec | plans/00-full-project-overview.md line 155: - After grace-period expiry, customer direct cancellation is blocked.
?? 2410 | planned | spec | plans/00-full-project-overview.md line 156: - Staff transitions remain policy-controlled.
? 2411 | backlog_future | spec | plans/00-full-project-overview.md line 158: ## Pricing Overview
?? 2412 | done | spec | plans/00-full-project-overview.md line 159: - Product may have a base price.
?? 2413 | tested | spec | plans/00-full-project-overview.md line 160: - Size may override effective price.
?? 2414 | partial | spec | plans/00-full-project-overview.md line 161: - Add-ons may add extra amounts.
?? 2415 | pending | todo | plans/00-full-project-overview.md line 162: - Coupons may affect products and/or delivery depending on rules.
?? 2416 | suggested | spec | plans/00-full-project-overview.md line 163: - Wallet may partially or fully reduce payable amount.
? 2417 | backlog_future | spec | plans/00-full-project-overview.md line 164: - Delivery fee depends on selected branch and delivery zone.
?? 2418 | done | security | plans/00-full-project-overview.md line 166: ## Security Overview
?? 2419 | partial | spec | plans/00-full-project-overview.md line 167: - Sanctum token-based auth.
?? 2420 | done | api_contract | plans/00-full-project-overview.md line 168: - Rate limits on sensitive endpoints.
?? 2421 | suggested | spec | plans/00-full-project-overview.md line 169: - Sanitization for free-text fields.
? 2422 | backlog_future | spec | plans/00-full-project-overview.md line 170: - Strict upload validation.
?? 2423 | done | spec | plans/00-full-project-overview.md line 171: - Spatie permissions for RBAC.
?? 2424 | tested | spec | plans/00-full-project-overview.md line 172: - Audit logs for privileged actions.
?? 2425 | planned | spec | plans/00-full-project-overview.md line 174: ## Localization Overview
?? 2426 | suggested | spec | plans/00-full-project-overview.md line 175: - `Accept-Language: ar|en`.
? 2427 | backlog_future | spec | plans/00-full-project-overview.md line 176: - Content fields stored in translation-friendly format.
?? 2428 | done | api_contract | plans/00-full-project-overview.md line 177: - Validation and API messages localizable.
?? 2429 | tested | spec | plans/00-full-project-overview.md line 178: - Arabic-first business copy.
?? 2430 | planned | spec | plans/00-full-project-overview.md line 180: ## Storage Overview
?? 2431 | suggested | spec | plans/00-full-project-overview.md line 181: - Use Laravel storage abstraction.
? 2432 | backlog_future | spec | plans/00-full-project-overview.md line 182: - Keep a dedicated upload disk and URL prefix.
? 2433 | backlog_future | future | plans/00-full-project-overview.md line 183: - Allow future CDN swap without changing domain logic.
?? 2434 | tested | spec | plans/00-full-project-overview.md line 184: - Save only references/paths in DB.
?? 2435 | planned | spec | plans/00-full-project-overview.md line 186: ## Initial Milestones
?? 2436 | planned | planning | plans/00-full-project-overview.md line 187: 1. Plans documentation.
? 2437 | backlog_future | spec | plans/00-full-project-overview.md line 188: 2. Laravel project scaffold.
?? 2438 | done | customization | plans/00-full-project-overview.md line 189: 3. Core packages and settings.
?? 2439 | tested | spec | plans/00-full-project-overview.md line 190: 4. Auth and roles.
?? 2440 | partial | spec | plans/00-full-project-overview.md line 191: 5. Branches and catalog.
?? 2441 | planned | spec | plans/00-full-project-overview.md line 192: 6. Cart, orders, coupons, wallet.
?? 2442 | tested | verification | plans/00-full-project-overview.md line 193: 7. Reviews, notifications, docs, tests.
?? 2443 | done | spec | plans/00-full-project-overview.md line 195: ## Definition Of Done
?? 2444 | planned | planning | plans/00-full-project-overview.md line 196: - Repo contains `plans/00` through `plans/12`.
?? 2445 | partial | spec | plans/00-full-project-overview.md line 197: - Repo contains working `backend/` Laravel 13 project.
?? 2446 | done | api_contract | plans/00-full-project-overview.md line 198: - Core APIs exist and return JSON.
?? 2447 | tested | verification | plans/00-full-project-overview.md line 199: - Critical flows have tests.
?? 2448 | tested | verification | plans/00-full-project-overview.md line 200: - Local server can be exercised with `curl`.
? 2449 | out_of_scope_backend_only | scope | plans/00-full-project-overview.md line 201: - No frontend artifacts exist in the implementation.
?? 2450 | planned | spec | plans/01-database-schema-and-models.md line 1: # Database Schema And Models
? 2451 | backlog_future | spec | plans/01-database-schema-and-models.md line 3: ## Goals
?? 2452 | done | spec | plans/01-database-schema-and-models.md line 4: - Keep schema normalized enough for maintainability.
?? 2453 | tested | spec | plans/01-database-schema-and-models.md line 5: - Keep schema practical for Laravel development.
?? 2454 | partial | spec | plans/01-database-schema-and-models.md line 6: - Preserve MySQL compatibility while using SQLite locally.
?? 2455 | planned | spec | plans/01-database-schema-and-models.md line 7: - Support branch-aware catalog and checkout rules.
? 2456 | backlog_future | spec | plans/01-database-schema-and-models.md line 9: ## Key Tables
? 2457 | backlog_future | future | plans/01-database-schema-and-models.md line 10: | Domain | Tables |
?? 2458 | tested | spec | plans/01-database-schema-and-models.md line 11: | --- | --- |
?? 2459 | partial | spec | plans/01-database-schema-and-models.md line 12: | Identity | users, personal_access_tokens, password_reset_tokens |
?? 2460 | planned | spec | plans/01-database-schema-and-models.md line 13: | Profiles | user_profiles, user_addresses, user_secondary_phones |
?? 2461 | suggested | spec | plans/01-database-schema-and-models.md line 14: | Branches | branches, delivery_zones |
? 2462 | backlog_future | spec | plans/01-database-schema-and-models.md line 15: | Catalog | categories, tags, products, product_media, product_sizes, addon_groups, addon_options |
?? 2463 | done | spec | plans/01-database-schema-and-models.md line 16: | Pivots | category_product, product_tag, branch_product, addon_group_product_size, addon_option_product_size |
?? 2464 | tested | spec | plans/01-database-schema-and-models.md line 17: | Cart | carts, cart_items, cart_item_addons |
?? 2465 | partial | spec | plans/01-database-schema-and-models.md line 18: | Orders | orders, order_items, order_item_addons, order_status_logs |
?? 2466 | planned | spec | plans/01-database-schema-and-models.md line 19: | Billing | coupons, coupon_usages, wallets, wallet_transactions, gift_cards, gift_card_redemptions |
?? 2467 | done | customization | plans/01-database-schema-and-models.md line 20: | Platform | settings, dynamic_pages, audit_logs |
? 2468 | backlog_future | spec | plans/01-database-schema-and-models.md line 21: | Reviews | reviews |
?? 2469 | done | spec | plans/01-database-schema-and-models.md line 22: | Authz | roles, permissions, model_has_roles, model_has_permissions, role_has_permissions |
?? 2470 | partial | spec | plans/01-database-schema-and-models.md line 24: ## Users
?? 2471 | planned | spec | plans/01-database-schema-and-models.md line 25: | Column | Type | Notes |
?? 2472 | suggested | spec | plans/01-database-schema-and-models.md line 26: | --- | --- | --- |
? 2473 | backlog_future | spec | plans/01-database-schema-and-models.md line 27: | id | big integer | PK |
?? 2474 | done | spec | plans/01-database-schema-and-models.md line 28: | name | string | display name |
?? 2475 | tested | spec | plans/01-database-schema-and-models.md line 29: | username | string unique | lowercase normalized |
?? 2476 | partial | spec | plans/01-database-schema-and-models.md line 30: | email | string unique nullable | lowercase normalized |
? 2477 | out_of_scope_backend_only | scope | plans/01-database-schema-and-models.md line 31: | primary_phone | string unique | required |
?? 2478 | suggested | spec | plans/01-database-schema-and-models.md line 32: | password | string | hashed |
?? 2479 | suggested | suggestion | plans/01-database-schema-and-models.md line 33: | email_verified_at | timestamp nullable | optional |
?? 2480 | done | spec | plans/01-database-schema-and-models.md line 34: | is_active | boolean | access control |
?? 2481 | tested | spec | plans/01-database-schema-and-models.md line 35: | last_login_at | timestamp nullable | auditing |
?? 2482 | partial | spec | plans/01-database-schema-and-models.md line 36: | remember_token | nullable | Laravel default, not primary auth |
?? 2483 | planned | spec | plans/01-database-schema-and-models.md line 37: | timestamps | timestamps | standard |
? 2484 | backlog_future | spec | plans/01-database-schema-and-models.md line 39: ## User Profiles
?? 2485 | done | spec | plans/01-database-schema-and-models.md line 40: | Column | Type | Notes |
?? 2486 | tested | spec | plans/01-database-schema-and-models.md line 41: | --- | --- | --- |
?? 2487 | partial | spec | plans/01-database-schema-and-models.md line 42: | id | big integer | PK |
?? 2488 | planned | spec | plans/01-database-schema-and-models.md line 43: | user_id | foreign key | unique |
?? 2489 | suggested | spec | plans/01-database-schema-and-models.md line 44: | avatar_path | string nullable | storage path |
? 2490 | backlog_future | spec | plans/01-database-schema-and-models.md line 45: | bio | text nullable | sanitized |
?? 2491 | done | spec | plans/01-database-schema-and-models.md line 46: | is_public_profile | boolean | public toggle |
?? 2492 | tested | spec | plans/01-database-schema-and-models.md line 47: | show_total_orders | boolean | privacy |
?? 2493 | partial | spec | plans/01-database-schema-and-models.md line 48: | show_total_spent | boolean | privacy |
?? 2494 | planned | spec | plans/01-database-schema-and-models.md line 49: | show_monthly_rank | boolean | privacy |
?? 2495 | suggested | spec | plans/01-database-schema-and-models.md line 50: | show_yearly_rank | boolean | privacy |
? 2496 | backlog_future | spec | plans/01-database-schema-and-models.md line 51: | show_favorite_products | boolean | privacy |
?? 2497 | done | spec | plans/01-database-schema-and-models.md line 52: | timestamps | timestamps | standard |
?? 2498 | partial | spec | plans/01-database-schema-and-models.md line 54: ## User Addresses
?? 2499 | planned | spec | plans/01-database-schema-and-models.md line 55: | Column | Type | Notes |
?? 2500 | suggested | spec | plans/01-database-schema-and-models.md line 56: | --- | --- | --- |
? 2501 | backlog_future | spec | plans/01-database-schema-and-models.md line 57: | id | big integer | PK |
?? 2502 | done | spec | plans/01-database-schema-and-models.md line 58: | user_id | foreign key | owner |
?? 2503 | tested | spec | plans/01-database-schema-and-models.md line 59: | label | string | home/work |
?? 2504 | partial | spec | plans/01-database-schema-and-models.md line 60: | recipient_name | string | delivery |
?? 2505 | planned | spec | plans/01-database-schema-and-models.md line 61: | phone | string | contact override |
?? 2506 | suggested | suggestion | plans/01-database-schema-and-models.md line 62: | country | string nullable | optional |
? 2507 | out_of_scope_backend_only | scope | plans/01-database-schema-and-models.md line 63: | city | string | required |
?? 2508 | done | spec | plans/01-database-schema-and-models.md line 64: | area | string | area/zone text |
? 2509 | out_of_scope_backend_only | scope | plans/01-database-schema-and-models.md line 65: | street | string | required |
? 2510 | out_of_scope_backend_only | scope | plans/01-database-schema-and-models.md line 66: | building | string nullable | optional |
?? 2511 | suggested | suggestion | plans/01-database-schema-and-models.md line 67: | floor | string nullable | optional |
?? 2512 | suggested | suggestion | plans/01-database-schema-and-models.md line 68: | apartment | string nullable | optional |
? 2513 | backlog_future | spec | plans/01-database-schema-and-models.md line 69: | landmark | string nullable | sanitized |
?? 2514 | done | spec | plans/01-database-schema-and-models.md line 70: | notes | text nullable | sanitized |
?? 2515 | tested | spec | plans/01-database-schema-and-models.md line 71: | is_default | boolean | one per user |
?? 2516 | partial | spec | plans/01-database-schema-and-models.md line 72: | timestamps | timestamps | standard |
?? 2517 | suggested | spec | plans/01-database-schema-and-models.md line 74: ## User Secondary Phones
?? 2518 | done | api_contract | plans/01-database-schema-and-models.md line 75: - Simple table preferred over JSON for searchability and validation.
?? 2519 | done | spec | plans/01-database-schema-and-models.md line 76: - Fields: `id`, `user_id`, `phone`, `label`, timestamps.
?? 2520 | partial | spec | plans/01-database-schema-and-models.md line 78: ## Branches
?? 2521 | planned | spec | plans/01-database-schema-and-models.md line 79: | Column | Type | Notes |
?? 2522 | suggested | spec | plans/01-database-schema-and-models.md line 80: | --- | --- | --- |
? 2523 | backlog_future | spec | plans/01-database-schema-and-models.md line 81: | id | big integer | PK |
?? 2524 | done | api_contract | plans/01-database-schema-and-models.md line 82: | name | json/text | ar/en |
?? 2525 | tested | spec | plans/01-database-schema-and-models.md line 83: | slug | string unique | stable key |
?? 2526 | partial | spec | plans/01-database-schema-and-models.md line 84: | phone | string nullable | branch contact |
?? 2527 | suggested | suggestion | plans/01-database-schema-and-models.md line 85: | email | string nullable | optional |
?? 2528 | suggested | spec | plans/01-database-schema-and-models.md line 86: | address | text nullable | localized or plain |
? 2529 | backlog_future | spec | plans/01-database-schema-and-models.md line 87: | latitude | decimal nullable | geodata |
?? 2530 | done | spec | plans/01-database-schema-and-models.md line 88: | longitude | decimal nullable | geodata |
?? 2531 | done | api_contract | plans/01-database-schema-and-models.md line 89: | working_hours_json | text nullable | structured hours |
?? 2532 | partial | spec | plans/01-database-schema-and-models.md line 90: | is_active | boolean | enabled state |
?? 2533 | planned | spec | plans/01-database-schema-and-models.md line 91: | timestamps | timestamps | standard |
? 2534 | backlog_future | spec | plans/01-database-schema-and-models.md line 93: ## Delivery Zones
?? 2535 | done | spec | plans/01-database-schema-and-models.md line 94: | Column | Type | Notes |
?? 2536 | tested | spec | plans/01-database-schema-and-models.md line 95: | --- | --- | --- |
?? 2537 | partial | spec | plans/01-database-schema-and-models.md line 96: | id | big integer | PK |
?? 2538 | planned | spec | plans/01-database-schema-and-models.md line 97: | branch_id | foreign key | owner |
?? 2539 | done | api_contract | plans/01-database-schema-and-models.md line 98: | name | json/text | ar/en |
?? 2540 | suggested | suggestion | plans/01-database-schema-and-models.md line 99: | code | string nullable | optional key |
?? 2541 | done | spec | plans/01-database-schema-and-models.md line 100: | delivery_fee | decimal(10,2) | money |
?? 2542 | tested | spec | plans/01-database-schema-and-models.md line 101: | min_delivery_time_minutes | integer nullable | ETA |
?? 2543 | partial | spec | plans/01-database-schema-and-models.md line 102: | max_delivery_time_minutes | integer nullable | ETA |
?? 2544 | planned | spec | plans/01-database-schema-and-models.md line 103: | is_active | boolean | enabled |
?? 2545 | suggested | spec | plans/01-database-schema-and-models.md line 104: | timestamps | timestamps | standard |
?? 2546 | done | spec | plans/01-database-schema-and-models.md line 106: ## Categories
?? 2547 | tested | spec | plans/01-database-schema-and-models.md line 107: | Column | Type | Notes |
?? 2548 | partial | spec | plans/01-database-schema-and-models.md line 108: | --- | --- | --- |
?? 2549 | planned | spec | plans/01-database-schema-and-models.md line 109: | id | big integer | PK |
?? 2550 | suggested | spec | plans/01-database-schema-and-models.md line 110: | parent_id | foreign key nullable | nested categories |
?? 2551 | done | api_contract | plans/01-database-schema-and-models.md line 111: | name | json/text | ar/en |
? 2552 | backlog_future | future | plans/01-database-schema-and-models.md line 112: | slug | string unique | future friendly |
?? 2553 | suggested | suggestion | plans/01-database-schema-and-models.md line 113: | description | json/text nullable | optional |
?? 2554 | partial | spec | plans/01-database-schema-and-models.md line 114: | sort_order | integer default 0 | ordering |
?? 2555 | planned | spec | plans/01-database-schema-and-models.md line 115: | is_active | boolean | enabled |
?? 2556 | suggested | spec | plans/01-database-schema-and-models.md line 116: | timestamps | timestamps | standard |
?? 2557 | done | spec | plans/01-database-schema-and-models.md line 118: ## Tags
?? 2558 | tested | spec | plans/01-database-schema-and-models.md line 119: - Fields: `id`, `name`, `slug`, `is_active`, timestamps.
?? 2559 | partial | spec | plans/01-database-schema-and-models.md line 120: - `name` can also be translatable.
?? 2560 | suggested | spec | plans/01-database-schema-and-models.md line 122: ## Products
? 2561 | backlog_future | spec | plans/01-database-schema-and-models.md line 123: | Column | Type | Notes |
?? 2562 | done | spec | plans/01-database-schema-and-models.md line 124: | --- | --- | --- |
?? 2563 | tested | spec | plans/01-database-schema-and-models.md line 125: | id | big integer | PK |
?? 2564 | done | api_contract | plans/01-database-schema-and-models.md line 126: | name | json/text | ar/en |
?? 2565 | done | api_contract | plans/01-database-schema-and-models.md line 127: | slug | string unique | API-friendly |
?? 2566 | done | api_contract | plans/01-database-schema-and-models.md line 128: | description | json/text nullable | ar/en |
?? 2567 | done | api_contract | plans/01-database-schema-and-models.md line 129: | short_description | json/text nullable | ar/en |
?? 2568 | suggested | suggestion | plans/01-database-schema-and-models.md line 130: | base_price | decimal(10,2) nullable | optional when sizes define price |
?? 2569 | tested | spec | plans/01-database-schema-and-models.md line 131: | main_image_path | string nullable | storage path |
?? 2570 | partial | spec | plans/01-database-schema-and-models.md line 132: | is_active | boolean | product enabled |
?? 2571 | planned | spec | plans/01-database-schema-and-models.md line 133: | is_limited_stock | boolean | stock toggle |
?? 2572 | suggested | spec | plans/01-database-schema-and-models.md line 134: | stock_quantity | integer nullable | if tracked |
? 2573 | backlog_future | spec | plans/01-database-schema-and-models.md line 135: | is_available_in_all_branches | boolean | availability mode |
?? 2574 | done | spec | plans/01-database-schema-and-models.md line 136: | is_best_seller_pinned | boolean | admin override |
?? 2575 | suggested | suggestion | plans/01-database-schema-and-models.md line 137: | best_seller_rank | integer nullable | optional |
?? 2576 | partial | spec | plans/01-database-schema-and-models.md line 138: | sort_order | integer default 0 | listing |
?? 2577 | planned | spec | plans/01-database-schema-and-models.md line 139: | timestamps | timestamps | standard |
? 2578 | backlog_future | spec | plans/01-database-schema-and-models.md line 141: ## Branch Product Pivot
?? 2579 | done | spec | plans/01-database-schema-and-models.md line 142: | Column | Type | Notes |
?? 2580 | tested | spec | plans/01-database-schema-and-models.md line 143: | --- | --- | --- |
?? 2581 | partial | spec | plans/01-database-schema-and-models.md line 144: | branch_id | FK | branch |
?? 2582 | planned | spec | plans/01-database-schema-and-models.md line 145: | product_id | FK | product |
?? 2583 | suggested | spec | plans/01-database-schema-and-models.md line 146: | is_active | boolean | branch override |
?? 2584 | suggested | suggestion | plans/01-database-schema-and-models.md line 147: | custom_stock_quantity | integer nullable | optional override |
?? 2585 | done | spec | plans/01-database-schema-and-models.md line 148: | timestamps | timestamps | audit |
?? 2586 | partial | spec | plans/01-database-schema-and-models.md line 150: ## Product Media
?? 2587 | planned | spec | plans/01-database-schema-and-models.md line 151: | Column | Type | Notes |
?? 2588 | suggested | spec | plans/01-database-schema-and-models.md line 152: | --- | --- | --- |
? 2589 | backlog_future | spec | plans/01-database-schema-and-models.md line 153: | id | big integer | PK |
?? 2590 | done | spec | plans/01-database-schema-and-models.md line 154: | product_id | foreign key | owner |
?? 2591 | tested | spec | plans/01-database-schema-and-models.md line 155: | media_type | string | image/video/external_video |
?? 2592 | partial | spec | plans/01-database-schema-and-models.md line 156: | disk | string nullable | storage disk |
?? 2593 | planned | spec | plans/01-database-schema-and-models.md line 157: | path | string nullable | local path |
?? 2594 | suggested | spec | plans/01-database-schema-and-models.md line 158: | external_url | string nullable | e.g. YouTube |
?? 2595 | done | api_contract | plans/01-database-schema-and-models.md line 159: | title | json/text nullable | localized |
?? 2596 | done | spec | plans/01-database-schema-and-models.md line 160: | sort_order | integer default 0 | ordering |
?? 2597 | tested | spec | plans/01-database-schema-and-models.md line 161: | is_primary | boolean | primary media |
?? 2598 | partial | spec | plans/01-database-schema-and-models.md line 162: | timestamps | timestamps | standard |
?? 2599 | suggested | spec | plans/01-database-schema-and-models.md line 164: ## Product Sizes
? 2600 | backlog_future | spec | plans/01-database-schema-and-models.md line 165: | Column | Type | Notes |
?? 2601 | done | spec | plans/01-database-schema-and-models.md line 166: | --- | --- | --- |
?? 2602 | tested | spec | plans/01-database-schema-and-models.md line 167: | id | big integer | PK |
?? 2603 | partial | spec | plans/01-database-schema-and-models.md line 168: | product_id | foreign key | owner |
?? 2604 | planned | spec | plans/01-database-schema-and-models.md line 169: | code | string | small/medium/large |
?? 2605 | done | api_contract | plans/01-database-schema-and-models.md line 170: | name | json/text | ar/en |
? 2606 | backlog_future | spec | plans/01-database-schema-and-models.md line 171: | price | decimal(10,2) | actual price |
?? 2607 | done | spec | plans/01-database-schema-and-models.md line 172: | is_default | boolean | default size |
?? 2608 | tested | spec | plans/01-database-schema-and-models.md line 173: | sort_order | integer | ordering |
?? 2609 | partial | spec | plans/01-database-schema-and-models.md line 174: | is_active | boolean | enabled |
?? 2610 | planned | spec | plans/01-database-schema-and-models.md line 175: | timestamps | timestamps | standard |
? 2611 | backlog_future | spec | plans/01-database-schema-and-models.md line 177: ## Addon Groups
?? 2612 | done | spec | plans/01-database-schema-and-models.md line 178: | Column | Type | Notes |
?? 2613 | tested | spec | plans/01-database-schema-and-models.md line 179: | --- | --- | --- |
?? 2614 | partial | spec | plans/01-database-schema-and-models.md line 180: | id | big integer | PK |
?? 2615 | planned | spec | plans/01-database-schema-and-models.md line 181: | product_id | foreign key | owner product |
?? 2616 | done | api_contract | plans/01-database-schema-and-models.md line 182: | name | json/text | ar/en |
? 2617 | backlog_future | spec | plans/01-database-schema-and-models.md line 183: | selection_type | string | single/multiple |
?? 2618 | done | spec | plans/01-database-schema-and-models.md line 184: | min_select | integer default 0 | validation |
?? 2619 | tested | spec | plans/01-database-schema-and-models.md line 185: | max_select | integer nullable | validation |
? 2620 | out_of_scope_backend_only | scope | plans/01-database-schema-and-models.md line 186: | is_required | boolean | validation |
?? 2621 | planned | spec | plans/01-database-schema-and-models.md line 187: | sort_order | integer | listing |
?? 2622 | suggested | spec | plans/01-database-schema-and-models.md line 188: | is_active | boolean | enabled |
? 2623 | backlog_future | spec | plans/01-database-schema-and-models.md line 189: | timestamps | timestamps | standard |
?? 2624 | tested | spec | plans/01-database-schema-and-models.md line 191: ## Addon Options
?? 2625 | partial | spec | plans/01-database-schema-and-models.md line 192: | Column | Type | Notes |
?? 2626 | planned | spec | plans/01-database-schema-and-models.md line 193: | --- | --- | --- |
?? 2627 | suggested | spec | plans/01-database-schema-and-models.md line 194: | id | big integer | PK |
? 2628 | backlog_future | spec | plans/01-database-schema-and-models.md line 195: | addon_group_id | foreign key | owner group |
?? 2629 | done | api_contract | plans/01-database-schema-and-models.md line 196: | name | json/text | ar/en |
?? 2630 | tested | spec | plans/01-database-schema-and-models.md line 197: | base_price | decimal(10,2) default 0 | fallback |
?? 2631 | partial | spec | plans/01-database-schema-and-models.md line 198: | sort_order | integer | listing |
?? 2632 | planned | spec | plans/01-database-schema-and-models.md line 199: | is_active | boolean | enabled |
?? 2633 | suggested | spec | plans/01-database-schema-and-models.md line 200: | timestamps | timestamps | standard |
?? 2634 | done | spec | plans/01-database-schema-and-models.md line 202: ## Addon Option Size Overrides
?? 2635 | tested | spec | plans/01-database-schema-and-models.md line 203: - Needed because add-on prices can differ by size.
?? 2636 | suggested | suggestion | plans/01-database-schema-and-models.md line 204: - Suggested columns: `id`, `addon_option_id`, `product_size_id`, `price`, timestamps.
?? 2637 | suggested | spec | plans/01-database-schema-and-models.md line 206: ## Cart Tables
? 2638 | backlog_future | spec | plans/01-database-schema-and-models.md line 207: - `carts`: `id`, `user_id`, `branch_id nullable`, timestamps.
?? 2639 | done | spec | plans/01-database-schema-and-models.md line 208: - `cart_items`: `id`, `cart_id`, `product_id`, `product_size_id nullable`, `quantity`, `price_snapshot`, `configuration_hash`, timestamps.
?? 2640 | tested | spec | plans/01-database-schema-and-models.md line 209: - `cart_item_addons`: `id`, `cart_item_id`, `addon_option_id`, `price_snapshot`, timestamps.
?? 2641 | planned | spec | plans/01-database-schema-and-models.md line 211: ## Orders
?? 2642 | suggested | spec | plans/01-database-schema-and-models.md line 212: | Column | Type | Notes |
? 2643 | backlog_future | spec | plans/01-database-schema-and-models.md line 213: | --- | --- | --- |
?? 2644 | done | spec | plans/01-database-schema-and-models.md line 214: | id | big integer | PK |
?? 2645 | tested | spec | plans/01-database-schema-and-models.md line 215: | user_id | foreign key | owner |
?? 2646 | partial | spec | plans/01-database-schema-and-models.md line 216: | branch_id | foreign key | selected branch |
?? 2647 | planned | spec | plans/01-database-schema-and-models.md line 217: | delivery_zone_id | foreign key nullable | delivery area |
?? 2648 | suggested | spec | plans/01-database-schema-and-models.md line 218: | address_id | foreign key nullable | shipping address |
? 2649 | backlog_future | spec | plans/01-database-schema-and-models.md line 219: | status | string | enum-like |
?? 2650 | done | spec | plans/01-database-schema-and-models.md line 220: | currency_code | string | e.g. EGP |
?? 2651 | tested | spec | plans/01-database-schema-and-models.md line 221: | subtotal | decimal(10,2) | products total |
?? 2652 | partial | spec | plans/01-database-schema-and-models.md line 222: | addons_total | decimal(10,2) | extras |
?? 2653 | planned | spec | plans/01-database-schema-and-models.md line 223: | delivery_fee | decimal(10,2) | shipping |
?? 2654 | suggested | spec | plans/01-database-schema-and-models.md line 224: | discount_total | decimal(10,2) | all discounts |
? 2655 | backlog_future | spec | plans/01-database-schema-and-models.md line 225: | wallet_amount | decimal(10,2) | wallet deduction |
?? 2656 | done | spec | plans/01-database-schema-and-models.md line 226: | total | decimal(10,2) | final total |
?? 2657 | tested | spec | plans/01-database-schema-and-models.md line 227: | coupon_code | string nullable | snapshot |
?? 2658 | partial | spec | plans/01-database-schema-and-models.md line 228: | coupon_snapshot | text nullable | applied rule summary |
?? 2659 | planned | spec | plans/01-database-schema-and-models.md line 229: | notes | text nullable | sanitized |
?? 2660 | suggested | spec | plans/01-database-schema-and-models.md line 230: | grace_period_ends_at | timestamp | cancel/edit cutoff |
? 2661 | backlog_future | spec | plans/01-database-schema-and-models.md line 231: | delivery_person_name | string nullable | tracking |
?? 2662 | done | spec | plans/01-database-schema-and-models.md line 232: | delivery_person_phone | string nullable | tracking |
?? 2663 | tested | spec | plans/01-database-schema-and-models.md line 233: | placed_at | timestamp nullable | lifecycle |
?? 2664 | partial | spec | plans/01-database-schema-and-models.md line 234: | timestamps | timestamps | standard |
?? 2665 | suggested | spec | plans/01-database-schema-and-models.md line 236: ## Order Items
? 2666 | backlog_future | spec | plans/01-database-schema-and-models.md line 237: - Snapshot product fields to protect history.
?? 2667 | suggested | suggestion | plans/01-database-schema-and-models.md line 238: - Suggested columns:
?? 2668 | tested | spec | plans/01-database-schema-and-models.md line 239: - `id`
?? 2669 | partial | spec | plans/01-database-schema-and-models.md line 240: - `order_id`
?? 2670 | planned | spec | plans/01-database-schema-and-models.md line 241: - `product_id nullable`
?? 2671 | suggested | spec | plans/01-database-schema-and-models.md line 242: - `product_name_snapshot`
? 2672 | backlog_future | spec | plans/01-database-schema-and-models.md line 243: - `product_size_name_snapshot nullable`
?? 2673 | done | spec | plans/01-database-schema-and-models.md line 244: - `product_size_code nullable`
?? 2674 | tested | spec | plans/01-database-schema-and-models.md line 245: - `unit_price`
?? 2675 | partial | spec | plans/01-database-schema-and-models.md line 246: - `quantity`
?? 2676 | planned | spec | plans/01-database-schema-and-models.md line 247: - `line_subtotal`
?? 2677 | done | api_contract | plans/01-database-schema-and-models.md line 248: - `metadata_json nullable`
? 2678 | backlog_future | spec | plans/01-database-schema-and-models.md line 249: - timestamps
?? 2679 | tested | spec | plans/01-database-schema-and-models.md line 251: ## Order Item Addons
?? 2680 | partial | spec | plans/01-database-schema-and-models.md line 252: - `id`, `order_item_id`, `addon_option_id nullable`, `addon_name_snapshot`, `price`, timestamps.
?? 2681 | suggested | spec | plans/01-database-schema-and-models.md line 254: ## Order Status Logs
? 2682 | backlog_future | spec | plans/01-database-schema-and-models.md line 255: - `id`, `order_id`, `from_status nullable`, `to_status`, `actor_id nullable`, `actor_type nullable`, `notes nullable`, timestamps.
?? 2683 | tested | spec | plans/01-database-schema-and-models.md line 257: ## Coupons
?? 2684 | partial | spec | plans/01-database-schema-and-models.md line 258: | Column | Type | Notes |
?? 2685 | planned | spec | plans/01-database-schema-and-models.md line 259: | --- | --- | --- |
?? 2686 | suggested | spec | plans/01-database-schema-and-models.md line 260: | id | big integer | PK |
? 2687 | backlog_future | spec | plans/01-database-schema-and-models.md line 261: | code | string unique | uppercase or normalized |
?? 2688 | done | spec | plans/01-database-schema-and-models.md line 262: | type | string | fixed/percentage |
?? 2689 | tested | spec | plans/01-database-schema-and-models.md line 263: | value | decimal(10,2) | amount or percent |
?? 2690 | partial | spec | plans/01-database-schema-and-models.md line 264: | max_discount_amount | decimal(10,2) nullable | percent cap |
?? 2691 | planned | spec | plans/01-database-schema-and-models.md line 265: | min_cart_value | decimal(10,2) nullable | threshold |
?? 2692 | suggested | spec | plans/01-database-schema-and-models.md line 266: | applies_to | string | products/delivery/both |
? 2693 | backlog_future | spec | plans/01-database-schema-and-models.md line 267: | usage_limit_total | integer nullable | global |
?? 2694 | done | spec | plans/01-database-schema-and-models.md line 268: | usage_limit_per_user | integer nullable | user |
?? 2695 | tested | spec | plans/01-database-schema-and-models.md line 269: | starts_at | timestamp nullable | validity |
?? 2696 | partial | spec | plans/01-database-schema-and-models.md line 270: | expires_at | timestamp nullable | validity |
?? 2697 | planned | spec | plans/01-database-schema-and-models.md line 271: | is_active | boolean | enabled |
?? 2698 | done | api_contract | plans/01-database-schema-and-models.md line 272: | conditions_json | text nullable | category/product rules |
? 2699 | backlog_future | spec | plans/01-database-schema-and-models.md line 273: | timestamps | timestamps | standard |
?? 2700 | tested | spec | plans/01-database-schema-and-models.md line 275: ## Coupon Usages
?? 2701 | partial | spec | plans/01-database-schema-and-models.md line 276: - `id`, `coupon_id`, `user_id`, `order_id nullable`, `used_at`, timestamps.
?? 2702 | suggested | spec | plans/01-database-schema-and-models.md line 278: ## Wallets
? 2703 | backlog_future | spec | plans/01-database-schema-and-models.md line 279: - `id`, `user_id unique`, `balance decimal(10,2)`, timestamps.
?? 2704 | tested | spec | plans/01-database-schema-and-models.md line 281: ## Wallet Transactions
?? 2705 | partial | spec | plans/01-database-schema-and-models.md line 282: - `id`, `wallet_id`, `type`, `amount`, `balance_before`, `balance_after`, `reference_type`, `reference_id`, `notes nullable`, `actor_id nullable`, timestamps.
?? 2706 | suggested | spec | plans/01-database-schema-and-models.md line 284: ## Gift Cards
? 2707 | backlog_future | spec | plans/01-database-schema-and-models.md line 285: - `id`, `code unique`, `amount`, `currency_code`, `is_active`, `expires_at nullable`, `redeemed_at nullable`, `redeemed_by_user_id nullable`, timestamps.
?? 2708 | tested | spec | plans/01-database-schema-and-models.md line 287: ## Gift Card Redemptions
?? 2709 | partial | spec | plans/01-database-schema-and-models.md line 288: - `id`, `gift_card_id`, `user_id`, `wallet_transaction_id nullable`, `redeemed_amount`, timestamps.
?? 2710 | suggested | spec | plans/01-database-schema-and-models.md line 290: ## Reviews
? 2711 | backlog_future | spec | plans/01-database-schema-and-models.md line 291: - `id`, `user_id`, `product_id`, `order_item_id nullable`, `rating`, `comment nullable`, `is_anonymous`, `is_visible`, `is_admin_generated`, timestamps.
?? 2712 | done | customization | plans/01-database-schema-and-models.md line 293: ## Settings
?? 2713 | partial | spec | plans/01-database-schema-and-models.md line 294: - `id`, `group`, `key`, `value`, `value_type`, timestamps.
?? 2714 | suggested | spec | plans/01-database-schema-and-models.md line 296: ## Dynamic Pages
? 2715 | backlog_future | spec | plans/01-database-schema-and-models.md line 297: - `id`, `slug unique`, `title`, `content`, `is_active`, timestamps.
?? 2716 | tested | spec | plans/01-database-schema-and-models.md line 299: ## Audit Logs
?? 2717 | done | api_contract | plans/01-database-schema-and-models.md line 300: - `id`, `actor_id nullable`, `action`, `target_type`, `target_id`, `metadata_json nullable`, timestamps.
?? 2718 | suggested | spec | plans/01-database-schema-and-models.md line 302: ## Eloquent Relationship Summary
? 2719 | backlog_future | spec | plans/01-database-schema-and-models.md line 303: ```text
?? 2720 | done | spec | plans/01-database-schema-and-models.md line 304: User hasOne UserProfile
?? 2721 | tested | spec | plans/01-database-schema-and-models.md line 305: User hasMany UserAddress
?? 2722 | partial | spec | plans/01-database-schema-and-models.md line 306: User hasMany UserSecondaryPhone
?? 2723 | planned | spec | plans/01-database-schema-and-models.md line 307: User hasOne Wallet
?? 2724 | suggested | spec | plans/01-database-schema-and-models.md line 308: User hasMany Order
? 2725 | backlog_future | spec | plans/01-database-schema-and-models.md line 309: User hasMany Review
?? 2726 | tested | spec | plans/01-database-schema-and-models.md line 311: Branch hasMany DeliveryZone
?? 2727 | partial | spec | plans/01-database-schema-and-models.md line 312: Branch belongsToMany Product
?? 2728 | planned | spec | plans/01-database-schema-and-models.md line 313: Branch hasMany Order
? 2729 | backlog_future | spec | plans/01-database-schema-and-models.md line 315: Product belongsToMany Category
?? 2730 | done | spec | plans/01-database-schema-and-models.md line 316: Product belongsToMany Tag
?? 2731 | tested | spec | plans/01-database-schema-and-models.md line 317: Product belongsToMany Branch
?? 2732 | partial | spec | plans/01-database-schema-and-models.md line 318: Product hasMany ProductMedia
?? 2733 | planned | spec | plans/01-database-schema-and-models.md line 319: Product hasMany ProductSize
?? 2734 | suggested | spec | plans/01-database-schema-and-models.md line 320: Product hasMany AddonGroup
? 2735 | backlog_future | spec | plans/01-database-schema-and-models.md line 321: Product hasMany Review
?? 2736 | tested | spec | plans/01-database-schema-and-models.md line 323: Order belongsTo User
?? 2737 | partial | spec | plans/01-database-schema-and-models.md line 324: Order belongsTo Branch
?? 2738 | planned | spec | plans/01-database-schema-and-models.md line 325: Order belongsTo DeliveryZone
?? 2739 | suggested | spec | plans/01-database-schema-and-models.md line 326: Order hasMany OrderItem
? 2740 | backlog_future | spec | plans/01-database-schema-and-models.md line 327: Order hasMany OrderStatusLog
?? 2741 | done | spec | plans/01-database-schema-and-models.md line 328: ```
?? 2742 | partial | spec | plans/01-database-schema-and-models.md line 330: ## Migration Order
?? 2743 | planned | spec | plans/01-database-schema-and-models.md line 331: 1. users and auth tables.
?? 2744 | suggested | spec | plans/01-database-schema-and-models.md line 332: 2. branches and delivery zones.
? 2745 | backlog_future | spec | plans/01-database-schema-and-models.md line 333: 3. categories and tags.
?? 2746 | done | spec | plans/01-database-schema-and-models.md line 334: 4. products and pivots.
?? 2747 | tested | spec | plans/01-database-schema-and-models.md line 335: 5. product sizes and add-ons.
?? 2748 | partial | spec | plans/01-database-schema-and-models.md line 336: 6. profiles and addresses.
?? 2749 | planned | spec | plans/01-database-schema-and-models.md line 337: 7. carts.
?? 2750 | suggested | spec | plans/01-database-schema-and-models.md line 338: 8. orders.
? 2751 | backlog_future | spec | plans/01-database-schema-and-models.md line 339: 9. coupons.
?? 2752 | done | spec | plans/01-database-schema-and-models.md line 340: 10. wallets and gift cards.
?? 2753 | tested | spec | plans/01-database-schema-and-models.md line 341: 11. reviews.
?? 2754 | done | customization | plans/01-database-schema-and-models.md line 342: 12. settings, pages, logs.
?? 2755 | suggested | spec | plans/01-database-schema-and-models.md line 344: ## Notes
? 2756 | backlog_future | spec | plans/01-database-schema-and-models.md line 345: - Keep money columns decimal, not float.
?? 2757 | done | api_contract | plans/01-database-schema-and-models.md line 346: - Keep JSON/text columns SQLite-safe.
?? 2758 | tested | spec | plans/01-database-schema-and-models.md line 347: - Keep enums as strings if SQLite compatibility matters.
?? 2759 | partial | spec | plans/01-database-schema-and-models.md line 348: - Add indexes on common lookup fields.
?? 2760 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 1: # API Endpoints And Versioning
?? 2761 | tested | spec | plans/02-api-endpoints-and-versioning.md line 3: ## Versioning Rules
?? 2762 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 4: - All public endpoints start with `/api/v1`.
? 2763 | backlog_future | future | plans/02-api-endpoints-and-versioning.md line 5: - Future breaking changes go to `/api/v2`.
?? 2764 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 6: - Do not mix versionless public APIs with versioned APIs.
?? 2765 | done | spec | plans/02-api-endpoints-and-versioning.md line 8: ## Response Envelope
?? 2766 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 9: ```json
?? 2767 | partial | spec | plans/02-api-endpoints-and-versioning.md line 10: {
?? 2768 | planned | spec | plans/02-api-endpoints-and-versioning.md line 11: "success": true,
?? 2769 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 12: "message": "Localized message",
? 2770 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 13: "data": {},
?? 2771 | done | spec | plans/02-api-endpoints-and-versioning.md line 14: "meta": {}
?? 2772 | tested | spec | plans/02-api-endpoints-and-versioning.md line 15: }
?? 2773 | partial | spec | plans/02-api-endpoints-and-versioning.md line 16: ```
?? 2774 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 18: ## Error Shape
?? 2775 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 19: ```json
?? 2776 | done | spec | plans/02-api-endpoints-and-versioning.md line 20: {
?? 2777 | tested | spec | plans/02-api-endpoints-and-versioning.md line 21: "success": false,
?? 2778 | partial | spec | plans/02-api-endpoints-and-versioning.md line 22: "message": "Validation failed",
?? 2779 | planned | spec | plans/02-api-endpoints-and-versioning.md line 23: "errors": {
? 2780 | out_of_scope_backend_only | scope | plans/02-api-endpoints-and-versioning.md line 24: "field": ["The field is required."]
? 2781 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 25: }
?? 2782 | done | spec | plans/02-api-endpoints-and-versioning.md line 26: }
?? 2783 | tested | spec | plans/02-api-endpoints-and-versioning.md line 27: ```
?? 2784 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 29: ## Auth Endpoints
?? 2785 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 30: | Method | URI | Purpose |
? 2786 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 31: | --- | --- | --- |
?? 2787 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 32: | POST | /api/v1/auth/register | Create customer account |
?? 2788 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 33: | POST | /api/v1/auth/login | Login by email or username |
?? 2789 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 34: | POST | /api/v1/auth/logout | Revoke current token |
?? 2790 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 35: | POST | /api/v1/auth/logout-all | Revoke all tokens |
?? 2791 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 36: | GET | /api/v1/auth/me | Current user profile summary |
?? 2792 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 38: ## Profile Endpoints
?? 2793 | tested | spec | plans/02-api-endpoints-and-versioning.md line 39: | Method | URI | Purpose |
?? 2794 | partial | spec | plans/02-api-endpoints-and-versioning.md line 40: | --- | --- | --- |
?? 2795 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 41: | GET | /api/v1/profile | Authenticated profile |
?? 2796 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 42: | PUT | /api/v1/profile | Update authenticated profile |
?? 2797 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 43: | GET | /api/v1/profiles/{username} | Public profile |
?? 2798 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 44: | PUT | /api/v1/profile/privacy | Update privacy settings |
?? 2799 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 46: ## Address Endpoints
?? 2800 | planned | spec | plans/02-api-endpoints-and-versioning.md line 47: | Method | URI | Purpose |
?? 2801 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 48: | --- | --- | --- |
?? 2802 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 49: | GET | /api/v1/addresses | List addresses |
?? 2803 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 50: | POST | /api/v1/addresses | Create address |
?? 2804 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 51: | PUT | /api/v1/addresses/{id} | Update address |
?? 2805 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 52: | DELETE | /api/v1/addresses/{id} | Delete address |
?? 2806 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 53: | POST | /api/v1/addresses/{id}/default | Set default |
?? 2807 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 55: ## Branch Endpoints
?? 2808 | done | spec | plans/02-api-endpoints-and-versioning.md line 56: | Method | URI | Purpose |
?? 2809 | tested | spec | plans/02-api-endpoints-and-versioning.md line 57: | --- | --- | --- |
?? 2810 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 58: | GET | /api/v1/branches | Public branch list |
?? 2811 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 59: | GET | /api/v1/branches/{id} | Public branch detail |
?? 2812 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 60: | GET | /api/v1/branches/{id}/delivery-zones | Delivery zone list |
?? 2813 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 62: ## Menu Endpoints
?? 2814 | tested | spec | plans/02-api-endpoints-and-versioning.md line 63: | Method | URI | Purpose |
?? 2815 | partial | spec | plans/02-api-endpoints-and-versioning.md line 64: | --- | --- | --- |
?? 2816 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 65: | GET | /api/v1/categories | Public categories tree |
?? 2817 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 66: | GET | /api/v1/tags | Public tags list |
?? 2818 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 67: | GET | /api/v1/products | Public product listing |
?? 2819 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 68: | GET | /api/v1/products/{id} | Public product detail |
?? 2820 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 69: | GET | /api/v1/products/best-sellers | Best sellers listing |
?? 2821 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 71: ## Cart Endpoints
?? 2822 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 72: | Method | URI | Purpose |
? 2823 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 73: | --- | --- | --- |
?? 2824 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 74: | GET | /api/v1/cart | Get current cart |
?? 2825 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 75: | POST | /api/v1/cart/items | Add item |
?? 2826 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 76: | PUT | /api/v1/cart/items/{id} | Update item |
?? 2827 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 77: | DELETE | /api/v1/cart/items/{id} | Remove item |
?? 2828 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 78: | DELETE | /api/v1/cart | Clear cart |
?? 2829 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 79: | POST | /api/v1/cart/coupon | Preview/apply coupon |
?? 2830 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 81: ## Order Endpoints
?? 2831 | partial | spec | plans/02-api-endpoints-and-versioning.md line 82: | Method | URI | Purpose |
?? 2832 | planned | spec | plans/02-api-endpoints-and-versioning.md line 83: | --- | --- | --- |
?? 2833 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 84: | POST | /api/v1/orders/checkout | Create order from cart |
?? 2834 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 85: | GET | /api/v1/orders | List customer orders |
?? 2835 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 86: | GET | /api/v1/orders/{id} | Order detail |
?? 2836 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 87: | POST | /api/v1/orders/{id}/cancel | Customer cancel during grace period |
?? 2837 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 88: | PUT | /api/v1/orders/{id}/notes | Customer update notes during grace period |
?? 2838 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 90: ## Review Endpoints
? 2839 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 91: | Method | URI | Purpose |
?? 2840 | done | spec | plans/02-api-endpoints-and-versioning.md line 92: | --- | --- | --- |
?? 2841 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 93: | POST | /api/v1/reviews | Create review |
?? 2842 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 94: | GET | /api/v1/products/{id}/reviews | Public review list |
?? 2843 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 96: ## Wallet Endpoints
? 2844 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 97: | Method | URI | Purpose |
?? 2845 | done | spec | plans/02-api-endpoints-and-versioning.md line 98: | --- | --- | --- |
?? 2846 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 99: | GET | /api/v1/wallet | Balance summary |
?? 2847 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 100: | GET | /api/v1/wallet/transactions | Wallet ledger |
?? 2848 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 101: | POST | /api/v1/wallet/redeem | Redeem gift card |
?? 2849 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 103: ## Settings/Public Content Endpoints
?? 2850 | done | spec | plans/02-api-endpoints-and-versioning.md line 104: | Method | URI | Purpose |
?? 2851 | tested | spec | plans/02-api-endpoints-and-versioning.md line 105: | --- | --- | --- |
?? 2852 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 106: | GET | /api/v1/settings/public | Public settings bundle |
?? 2853 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 107: | GET | /api/v1/pages/{slug} | Public dynamic page |
?? 2854 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 109: ## Admin Auth Endpoints
?? 2855 | done | spec | plans/02-api-endpoints-and-versioning.md line 110: | Method | URI | Purpose |
?? 2856 | tested | spec | plans/02-api-endpoints-and-versioning.md line 111: | --- | --- | --- |
?? 2857 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 112: | POST | /api/v1/admin/auth/login | Admin login |
?? 2858 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 113: | POST | /api/v1/admin/auth/logout | Admin logout |
?? 2859 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 115: ## Admin Branch Endpoints
?? 2860 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 116: - `GET /api/v1/admin/branches`
?? 2861 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 117: - `POST /api/v1/admin/branches`
?? 2862 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 118: - `GET /api/v1/admin/branches/{id}`
?? 2863 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 119: - `PUT /api/v1/admin/branches/{id}`
?? 2864 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 120: - `DELETE /api/v1/admin/branches/{id}`
?? 2865 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 121: - `GET /api/v1/admin/branches/{id}/delivery-zones`
?? 2866 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 122: - `POST /api/v1/admin/delivery-zones`
?? 2867 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 123: - `PUT /api/v1/admin/delivery-zones/{id}`
?? 2868 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 124: - `DELETE /api/v1/admin/delivery-zones/{id}`
?? 2869 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 126: ## Admin Catalog Endpoints
?? 2870 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 127: - `GET /api/v1/admin/categories`
?? 2871 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 128: - `POST /api/v1/admin/categories`
?? 2872 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 129: - `PUT /api/v1/admin/categories/{id}`
?? 2873 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 130: - `DELETE /api/v1/admin/categories/{id}`
?? 2874 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 131: - `GET /api/v1/admin/tags`
?? 2875 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 132: - `POST /api/v1/admin/tags`
?? 2876 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 133: - `PUT /api/v1/admin/tags/{id}`
?? 2877 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 134: - `DELETE /api/v1/admin/tags/{id}`
?? 2878 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 135: - `GET /api/v1/admin/products`
?? 2879 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 136: - `POST /api/v1/admin/products`
?? 2880 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 137: - `GET /api/v1/admin/products/{id}`
?? 2881 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 138: - `PUT /api/v1/admin/products/{id}`
?? 2882 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 139: - `DELETE /api/v1/admin/products/{id}`
?? 2883 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 141: ## Admin Product Option Endpoints
?? 2884 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 142: - `POST /api/v1/admin/products/{id}/sizes`
?? 2885 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 143: - `PUT /api/v1/admin/sizes/{id}`
?? 2886 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 144: - `DELETE /api/v1/admin/sizes/{id}`
?? 2887 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 145: - `POST /api/v1/admin/products/{id}/addon-groups`
?? 2888 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 146: - `PUT /api/v1/admin/addon-groups/{id}`
?? 2889 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 147: - `DELETE /api/v1/admin/addon-groups/{id}`
?? 2890 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 148: - `POST /api/v1/admin/addon-groups/{id}/options`
?? 2891 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 149: - `PUT /api/v1/admin/addon-options/{id}`
?? 2892 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 150: - `DELETE /api/v1/admin/addon-options/{id}`
?? 2893 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 152: ## Admin Order Endpoints
?? 2894 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 153: - `GET /api/v1/admin/orders`
?? 2895 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 154: - `GET /api/v1/admin/orders/{id}`
?? 2896 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 155: - `POST /api/v1/admin/orders/{id}/status`
?? 2897 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 156: - `POST /api/v1/admin/orders/{id}/assign-delivery`
?? 2898 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 157: - `POST /api/v1/admin/orders/{id}/refund`
?? 2899 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 159: ## Admin Coupon Endpoints
?? 2900 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 160: - `GET /api/v1/admin/coupons`
?? 2901 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 161: - `POST /api/v1/admin/coupons`
?? 2902 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 162: - `GET /api/v1/admin/coupons/{id}`
?? 2903 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 163: - `PUT /api/v1/admin/coupons/{id}`
?? 2904 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 164: - `DELETE /api/v1/admin/coupons/{id}`
?? 2905 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 166: ## Admin Gift Card Endpoints
?? 2906 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 167: - `GET /api/v1/admin/gift-cards`
?? 2907 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 168: - `POST /api/v1/admin/gift-cards`
?? 2908 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 169: - `GET /api/v1/admin/gift-cards/{id}`
?? 2909 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 170: - `PUT /api/v1/admin/gift-cards/{id}`
?? 2910 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 171: - `DELETE /api/v1/admin/gift-cards/{id}`
?? 2911 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 173: ## Admin Review Endpoints
?? 2912 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 174: - `GET /api/v1/admin/reviews`
?? 2913 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 175: - `PUT /api/v1/admin/reviews/{id}`
?? 2914 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 176: - `DELETE /api/v1/admin/reviews/{id}`
?? 2915 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 177: - `POST /api/v1/admin/reviews/manual`
?? 2916 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 179: ## Admin Settings Endpoints
?? 2917 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 180: - `GET /api/v1/admin/settings`
?? 2918 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 181: - `PUT /api/v1/admin/settings/{group}`
?? 2919 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 182: - `POST /api/v1/admin/settings/theme/import`
?? 2920 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 183: - `GET /api/v1/admin/settings/theme/export`
?? 2921 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 185: ## Admin Dynamic Pages Endpoints
?? 2922 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 186: - `GET /api/v1/admin/pages`
?? 2923 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 187: - `POST /api/v1/admin/pages`
?? 2924 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 188: - `GET /api/v1/admin/pages/{id}`
?? 2925 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 189: - `PUT /api/v1/admin/pages/{id}`
?? 2926 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 190: - `DELETE /api/v1/admin/pages/{id}`
?? 2927 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 192: ## Admin Roles And Permissions Endpoints
?? 2928 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 193: - `GET /api/v1/admin/roles`
?? 2929 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 194: - `POST /api/v1/admin/roles`
?? 2930 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 195: - `PUT /api/v1/admin/roles/{id}`
?? 2931 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 196: - `DELETE /api/v1/admin/roles/{id}`
?? 2932 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 197: - `GET /api/v1/admin/permissions`
?? 2933 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 198: - `POST /api/v1/admin/admin-users`
?? 2934 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 199: - `PUT /api/v1/admin/admin-users/{id}/roles`
?? 2935 | tested | spec | plans/02-api-endpoints-and-versioning.md line 201: ## Query Parameters For Product List
?? 2936 | partial | spec | plans/02-api-endpoints-and-versioning.md line 202: - `branch_id`
?? 2937 | planned | spec | plans/02-api-endpoints-and-versioning.md line 203: - `category_id`
?? 2938 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 204: - `tag`
? 2939 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 205: - `search`
?? 2940 | done | spec | plans/02-api-endpoints-and-versioning.md line 206: - `sort=price_asc|price_desc|best_seller|rating_desc`
?? 2941 | tested | spec | plans/02-api-endpoints-and-versioning.md line 207: - `min_price`
?? 2942 | partial | spec | plans/02-api-endpoints-and-versioning.md line 208: - `max_price`
?? 2943 | planned | spec | plans/02-api-endpoints-and-versioning.md line 209: - `page`
?? 2944 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 210: - `per_page`
?? 2945 | done | spec | plans/02-api-endpoints-and-versioning.md line 212: ## Headers
?? 2946 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 213: - `Accept: application/json`
?? 2947 | partial | spec | plans/02-api-endpoints-and-versioning.md line 214: - `Accept-Language: ar` or `en`
?? 2948 | done | security | plans/02-api-endpoints-and-versioning.md line 215: - `Authorization: Bearer {token}`
?? 2949 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 217: ## Authz Strategy By Route Type
?? 2950 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 218: - Public routes: no auth.
?? 2951 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 219: - Customer routes: auth token.
?? 2952 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 220: - Admin routes: auth token + role/permission checks.
?? 2953 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 221: - Branch-scoped admin routes: auth token + permission + branch scope.
? 2954 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 223: ## Versioning File Layout
?? 2955 | done | spec | plans/02-api-endpoints-and-versioning.md line 224: ```text
?? 2956 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 225: routes/
?? 2957 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 226: ├─ api.php
?? 2958 | planned | spec | plans/02-api-endpoints-and-versioning.md line 227: app/
?? 2959 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 228: └─ Modules/
? 2960 | backlog_future | spec | plans/02-api-endpoints-and-versioning.md line 229: └─ Shared/
?? 2961 | done | spec | plans/02-api-endpoints-and-versioning.md line 230: └─ Http/
?? 2962 | tested | spec | plans/02-api-endpoints-and-versioning.md line 231: └─ Controllers/
?? 2963 | partial | spec | plans/02-api-endpoints-and-versioning.md line 232: ```
?? 2964 | suggested | spec | plans/02-api-endpoints-and-versioning.md line 234: ## Documentation Notes
?? 2965 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 235: - Each endpoint should document request body.
?? 2966 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 236: - Each endpoint should document validation rules.
?? 2967 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 237: - Each endpoint should document success response.
?? 2968 | done | api_contract | plans/02-api-endpoints-and-versioning.md line 238: - Each endpoint should document common failure responses.
?? 2969 | done | security | plans/03-authentication-and-authorization.md line 1: # Authentication And Authorization
?? 2970 | done | security | plans/03-authentication-and-authorization.md line 3: ## Authentication Goals
? 2971 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 4: - Use token-based authentication suitable for cross-platform clients.
? 2972 | backlog_future | future | plans/03-authentication-and-authorization.md line 5: - Keep auth flows consistent across website/mobile consumers.
?? 2973 | done | api_contract | plans/03-authentication-and-authorization.md line 6: - Avoid route-to-route auth instability.
?? 2974 | suggested | spec | plans/03-authentication-and-authorization.md line 8: ## Primary Auth Choice
? 2975 | backlog_future | spec | plans/03-authentication-and-authorization.md line 9: - `Laravel Sanctum` with access tokens.
?? 2976 | done | api_contract | plans/03-authentication-and-authorization.md line 10: - Use Bearer tokens for protected API routes.
?? 2977 | pending | todo | plans/03-authentication-and-authorization.md line 11: - Avoid depending on session auth for the main public API contract.
?? 2978 | planned | spec | plans/03-authentication-and-authorization.md line 13: ## Registration Rules
?? 2979 | suggested | spec | plans/03-authentication-and-authorization.md line 14: - Accept `name`, `username`, `email`, `primary_phone`, `password`.
? 2980 | backlog_future | spec | plans/03-authentication-and-authorization.md line 15: - Normalize `username` and `email` to lowercase.
?? 2981 | done | spec | plans/03-authentication-and-authorization.md line 16: - Enforce uniqueness on normalized values.
?? 2982 | tested | spec | plans/03-authentication-and-authorization.md line 17: - Hash passwords using Laravel defaults.
?? 2983 | planned | spec | plans/03-authentication-and-authorization.md line 19: ## Password Policy
?? 2984 | suggested | spec | plans/03-authentication-and-authorization.md line 20: - Minimum `6` characters.
? 2985 | backlog_future | spec | plans/03-authentication-and-authorization.md line 21: - At least `1` English letter.
?? 2986 | done | spec | plans/03-authentication-and-authorization.md line 22: - At least `1` number.
?? 2987 | tested | spec | plans/03-authentication-and-authorization.md line 23: - At least `1` symbol.
?? 2988 | partial | spec | plans/03-authentication-and-authorization.md line 24: - Must not include username.
?? 2989 | planned | spec | plans/03-authentication-and-authorization.md line 25: - Must not include email.
?? 2990 | suggested | spec | plans/03-authentication-and-authorization.md line 26: - Must not include first/last name when known.
?? 2991 | done | spec | plans/03-authentication-and-authorization.md line 28: ## Login Rules
?? 2992 | tested | spec | plans/03-authentication-and-authorization.md line 29: - One field for `email_or_username`.
?? 2993 | partial | spec | plans/03-authentication-and-authorization.md line 30: - Normalize to lowercase before lookup.
?? 2994 | planned | spec | plans/03-authentication-and-authorization.md line 31: - Support login by `email` or `username`.
?? 2995 | suggested | spec | plans/03-authentication-and-authorization.md line 32: - Return sanitized generic failure messages.
? 2996 | backlog_future | spec | plans/03-authentication-and-authorization.md line 33: - Rate-limit login attempts.
?? 2997 | tested | spec | plans/03-authentication-and-authorization.md line 35: ## Logout Rules
?? 2998 | partial | spec | plans/03-authentication-and-authorization.md line 36: - Logout current token.
?? 2999 | planned | spec | plans/03-authentication-and-authorization.md line 37: - Support logout all tokens.
?? 3000 | done | api_contract | plans/03-authentication-and-authorization.md line 38: - Return JSON only.
?? 3001 | done | api_contract | plans/03-authentication-and-authorization.md line 40: ## Current User Endpoint
?? 3002 | tested | spec | plans/03-authentication-and-authorization.md line 41: - Return user summary.
?? 3003 | partial | spec | plans/03-authentication-and-authorization.md line 42: - Return profile summary.
?? 3004 | planned | spec | plans/03-authentication-and-authorization.md line 43: - Return role names if helpful.
?? 3005 | suggested | spec | plans/03-authentication-and-authorization.md line 44: - Return permissions only if needed by the client.
?? 3006 | done | spec | plans/03-authentication-and-authorization.md line 46: ## Token Metadata
?? 3007 | suggested | suggestion | plans/03-authentication-and-authorization.md line 47: - Token name can optionally include device/client hint.
?? 3008 | partial | spec | plans/03-authentication-and-authorization.md line 48: - Store only hashed tokens through Sanctum.
?? 3009 | planned | spec | plans/03-authentication-and-authorization.md line 49: - Do not log plaintext tokens.
?? 3010 | done | security | plans/03-authentication-and-authorization.md line 51: ## Authorization Goals
?? 3011 | done | spec | plans/03-authentication-and-authorization.md line 52: - Granular RBAC.
?? 3012 | tested | spec | plans/03-authentication-and-authorization.md line 53: - Branch-scoped operations.
?? 3013 | partial | spec | plans/03-authentication-and-authorization.md line 54: - Resource-level policy checks.
?? 3014 | planned | spec | plans/03-authentication-and-authorization.md line 55: - Clear super-admin behavior.
? 3015 | backlog_future | spec | plans/03-authentication-and-authorization.md line 57: ## Role Examples
?? 3016 | done | spec | plans/03-authentication-and-authorization.md line 58: - `super-admin`
?? 3017 | tested | spec | plans/03-authentication-and-authorization.md line 59: - `branch-manager`
?? 3018 | partial | spec | plans/03-authentication-and-authorization.md line 60: - `orders-manager`
?? 3019 | planned | spec | plans/03-authentication-and-authorization.md line 61: - `support-agent`
?? 3020 | suggested | spec | plans/03-authentication-and-authorization.md line 62: - `content-moderator`
? 3021 | backlog_future | spec | plans/03-authentication-and-authorization.md line 63: - `catalog-manager`
?? 3022 | done | customization | plans/03-authentication-and-authorization.md line 64: - `settings-manager`
?? 3023 | partial | spec | plans/03-authentication-and-authorization.md line 66: ## Permission Examples
?? 3024 | planned | spec | plans/03-authentication-and-authorization.md line 67: - `branches.view`
?? 3025 | suggested | spec | plans/03-authentication-and-authorization.md line 68: - `branches.create`
? 3026 | backlog_future | spec | plans/03-authentication-and-authorization.md line 69: - `branches.update`
?? 3027 | done | spec | plans/03-authentication-and-authorization.md line 70: - `branches.delete`
?? 3028 | tested | spec | plans/03-authentication-and-authorization.md line 71: - `delivery-zones.manage`
?? 3029 | partial | spec | plans/03-authentication-and-authorization.md line 72: - `products.view`
?? 3030 | planned | spec | plans/03-authentication-and-authorization.md line 73: - `products.create`
?? 3031 | suggested | spec | plans/03-authentication-and-authorization.md line 74: - `products.update`
? 3032 | backlog_future | spec | plans/03-authentication-and-authorization.md line 75: - `products.delete`
?? 3033 | done | spec | plans/03-authentication-and-authorization.md line 76: - `orders.view`
?? 3034 | tested | spec | plans/03-authentication-and-authorization.md line 77: - `orders.update-status`
?? 3035 | partial | spec | plans/03-authentication-and-authorization.md line 78: - `orders.assign-delivery`
?? 3036 | planned | spec | plans/03-authentication-and-authorization.md line 79: - `orders.refund`
?? 3037 | suggested | spec | plans/03-authentication-and-authorization.md line 80: - `reviews.moderate`
?? 3038 | done | customization | plans/03-authentication-and-authorization.md line 81: - `settings.manage`
?? 3039 | done | spec | plans/03-authentication-and-authorization.md line 82: - `roles.manage`
?? 3040 | partial | spec | plans/03-authentication-and-authorization.md line 84: ## Branch-Scoped Permission Strategy
?? 3041 | planned | spec | plans/03-authentication-and-authorization.md line 85: - Permission names stay generic.
?? 3042 | suggested | spec | plans/03-authentication-and-authorization.md line 86: - Branch scope is enforced by policy context and assigned branch mapping.
? 3043 | backlog_future | spec | plans/03-authentication-and-authorization.md line 87: - A branch manager may have generic `orders.view` but only for branch IDs assigned to them.
?? 3044 | suggested | suggestion | plans/03-authentication-and-authorization.md line 89: ## Suggested Admin-Branch Mapping
?? 3045 | partial | spec | plans/03-authentication-and-authorization.md line 90: - `admin_branch_user` pivot or similar.
?? 3046 | planned | spec | plans/03-authentication-and-authorization.md line 91: - Fields: `user_id`, `branch_id`, timestamps.
?? 3047 | suggested | spec | plans/03-authentication-and-authorization.md line 92: - Used by policies and services.
?? 3048 | done | spec | plans/03-authentication-and-authorization.md line 94: ## Super Admin Behavior
?? 3049 | tested | spec | plans/03-authentication-and-authorization.md line 95: - Initial seeded super admin may be first admin account.
?? 3050 | partial | spec | plans/03-authentication-and-authorization.md line 96: - Super admin bypass should be centralized.
?? 3051 | planned | spec | plans/03-authentication-and-authorization.md line 97: - Prefer role/capability over raw `id == 1` alone, even if bootstrap starts with ID 1.
? 3052 | backlog_future | spec | plans/03-authentication-and-authorization.md line 99: ## Policy Targets
?? 3053 | done | spec | plans/03-authentication-and-authorization.md line 100: - AddressPolicy.
?? 3054 | tested | spec | plans/03-authentication-and-authorization.md line 101: - BranchPolicy.
?? 3055 | partial | spec | plans/03-authentication-and-authorization.md line 102: - DeliveryZonePolicy.
?? 3056 | planned | spec | plans/03-authentication-and-authorization.md line 103: - ProductPolicy.
?? 3057 | suggested | spec | plans/03-authentication-and-authorization.md line 104: - CategoryPolicy.
? 3058 | backlog_future | spec | plans/03-authentication-and-authorization.md line 105: - TagPolicy.
?? 3059 | done | spec | plans/03-authentication-and-authorization.md line 106: - OrderPolicy.
?? 3060 | tested | spec | plans/03-authentication-and-authorization.md line 107: - CouponPolicy.
?? 3061 | partial | spec | plans/03-authentication-and-authorization.md line 108: - GiftCardPolicy.
?? 3062 | planned | spec | plans/03-authentication-and-authorization.md line 109: - ReviewPolicy.
?? 3063 | done | customization | plans/03-authentication-and-authorization.md line 110: - SettingsPolicy.
? 3064 | backlog_future | spec | plans/03-authentication-and-authorization.md line 111: - DynamicPagePolicy.
?? 3065 | tested | spec | plans/03-authentication-and-authorization.md line 113: ## Customer Access Rules
?? 3066 | partial | spec | plans/03-authentication-and-authorization.md line 114: - Customer can view/update only own profile.
?? 3067 | planned | spec | plans/03-authentication-and-authorization.md line 115: - Customer can manage only own addresses.
?? 3068 | suggested | spec | plans/03-authentication-and-authorization.md line 116: - Customer can view only own wallet.
? 3069 | backlog_future | spec | plans/03-authentication-and-authorization.md line 117: - Customer can view only own orders.
?? 3070 | done | spec | plans/03-authentication-and-authorization.md line 118: - Customer can create reviews only for eligible purchases.
?? 3071 | done | api_contract | plans/03-authentication-and-authorization.md line 119: - Customer cannot access admin routes.
?? 3072 | planned | spec | plans/03-authentication-and-authorization.md line 121: ## Admin Access Rules
?? 3073 | suggested | spec | plans/03-authentication-and-authorization.md line 122: - Admin must authenticate.
? 3074 | backlog_future | spec | plans/03-authentication-and-authorization.md line 123: - Admin must carry proper role/permissions.
? 3075 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 124: - Sensitive actions require explicit permission, not only broad role.
?? 3076 | tested | spec | plans/03-authentication-and-authorization.md line 125: - Branch-restricted staff cannot access unrelated branches.
?? 3077 | done | security | plans/03-authentication-and-authorization.md line 127: ## Order Authorization Rules
?? 3078 | suggested | spec | plans/03-authentication-and-authorization.md line 128: - Customer can view own order.
? 3079 | backlog_future | spec | plans/03-authentication-and-authorization.md line 129: - Customer can cancel only own order and only before grace-period expiry.
?? 3080 | done | spec | plans/03-authentication-and-authorization.md line 130: - Orders manager can view orders in assigned branches.
?? 3081 | tested | spec | plans/03-authentication-and-authorization.md line 131: - Orders manager can transition only allowed states.
? 3082 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 132: - Refund flow should require higher privilege.
?? 3083 | done | security | plans/03-authentication-and-authorization.md line 134: ## Catalog Authorization Rules
? 3084 | backlog_future | spec | plans/03-authentication-and-authorization.md line 135: - Public can read active products/categories.
? 3085 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 136: - Admin CRUD requires permissions.
? 3086 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 137: - Branch-specific availability changes require product management rights.
?? 3087 | done | security | plans/03-authentication-and-authorization.md line 139: ## Settings Authorization Rules
?? 3088 | done | customization | plans/03-authentication-and-authorization.md line 140: - Settings updates should be tightly restricted.
?? 3089 | done | api_contract | plans/03-authentication-and-authorization.md line 141: - Theme JSON import/export should be restricted.
? 3090 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 142: - Auth/mail/oauth settings require top-level admin permissions.
?? 3091 | done | security | plans/03-authentication-and-authorization.md line 144: ## Review Authorization Rules
?? 3092 | planned | spec | plans/03-authentication-and-authorization.md line 145: - Public can read visible reviews.
?? 3093 | suggested | spec | plans/03-authentication-and-authorization.md line 146: - Customer can create only eligible review.
? 3094 | backlog_future | spec | plans/03-authentication-and-authorization.md line 147: - Customer can edit/delete own review only if policy allows.
?? 3095 | done | spec | plans/03-authentication-and-authorization.md line 148: - Admin can hide/delete any review with moderation permission.
? 3096 | out_of_scope_backend_only | scope | plans/03-authentication-and-authorization.md line 150: ## Audit Requirements
?? 3097 | planned | spec | plans/03-authentication-and-authorization.md line 151: - Log admin login events if feasible.
?? 3098 | suggested | spec | plans/03-authentication-and-authorization.md line 152: - Log role assignment changes.
? 3099 | backlog_future | spec | plans/03-authentication-and-authorization.md line 153: - Log permission-sensitive updates.
?? 3100 | done | spec | plans/03-authentication-and-authorization.md line 154: - Log wallet manual adjustments.
?? 3101 | tested | spec | plans/03-authentication-and-authorization.md line 155: - Log refunds and coupon edits.
?? 3102 | planned | spec | plans/03-authentication-and-authorization.md line 157: ## Middleware Stack
?? 3103 | suggested | spec | plans/03-authentication-and-authorization.md line 158: - `auth:sanctum`
?? 3104 | done | api_contract | plans/03-authentication-and-authorization.md line 159: - API locale resolver
?? 3105 | done | spec | plans/03-authentication-and-authorization.md line 160: - rate limiter
?? 3106 | tested | spec | plans/03-authentication-and-authorization.md line 161: - admin access or permission middleware where needed
?? 3107 | planned | spec | plans/03-authentication-and-authorization.md line 163: ## Auth Error Responses
?? 3108 | suggested | spec | plans/03-authentication-and-authorization.md line 164: | Scenario | Status |
? 3109 | backlog_future | spec | plans/03-authentication-and-authorization.md line 165: | --- | --- |
?? 3110 | done | spec | plans/03-authentication-and-authorization.md line 166: | Invalid credentials | 422 or 401 |
?? 3111 | tested | spec | plans/03-authentication-and-authorization.md line 167: | Missing token | 401 |
?? 3112 | partial | spec | plans/03-authentication-and-authorization.md line 168: | Invalid token | 401 |
?? 3113 | planned | spec | plans/03-authentication-and-authorization.md line 169: | Authenticated but forbidden | 403 |
?? 3114 | done | security | plans/03-authentication-and-authorization.md line 171: ## Security Notes
?? 3115 | done | spec | plans/03-authentication-and-authorization.md line 172: - Never expose whether email or username exists during login failure.
?? 3116 | tested | spec | plans/03-authentication-and-authorization.md line 173: - Normalize identity before validation and lookup.
?? 3117 | done | api_contract | plans/03-authentication-and-authorization.md line 174: - Rate-limit login and redemption endpoints.
?? 3118 | planned | spec | plans/03-authentication-and-authorization.md line 175: - Keep free-text fields sanitized separately from auth logic.
?? 3119 | tested | verification | plans/03-authentication-and-authorization.md line 177: ## Test Cases
?? 3120 | done | spec | plans/03-authentication-and-authorization.md line 178: 1. Register with uppercase email -> stored lowercase.
?? 3121 | tested | spec | plans/03-authentication-and-authorization.md line 179: 2. Register with uppercase username -> stored lowercase.
?? 3122 | partial | spec | plans/03-authentication-and-authorization.md line 180: 3. Login with uppercase email -> succeeds.
?? 3123 | planned | spec | plans/03-authentication-and-authorization.md line 181: 4. Login with uppercase username -> succeeds.
?? 3124 | suggested | spec | plans/03-authentication-and-authorization.md line 182: 5. Invalid password rejected by policy.
? 3125 | backlog_future | spec | plans/03-authentication-and-authorization.md line 183: 6. Customer cannot view another customer order.
?? 3126 | done | spec | plans/03-authentication-and-authorization.md line 184: 7. Branch manager cannot view unassigned branch orders.
?? 3127 | done | api_contract | plans/03-authentication-and-authorization.md line 185: 8. Super admin can access restricted admin routes.
?? 3128 | planned | spec | plans/03-authentication-and-authorization.md line 187: ## Implementation Notes
?? 3129 | suggested | spec | plans/03-authentication-and-authorization.md line 188: - Keep auth controllers thin.
? 3130 | backlog_future | spec | plans/03-authentication-and-authorization.md line 189: - Use dedicated actions/services for registration and login.
?? 3131 | done | spec | plans/03-authentication-and-authorization.md line 190: - Keep role seeding separate from business seed data.
?? 3132 | partial | spec | plans/04-branches-and-menus-system.md line 1: # Branches And Menus System
?? 3133 | suggested | spec | plans/04-branches-and-menus-system.md line 3: ## Goal
? 3134 | backlog_future | spec | plans/04-branches-and-menus-system.md line 4: - Support single-branch and multi-branch businesses with one codebase.
?? 3135 | done | spec | plans/04-branches-and-menus-system.md line 5: - Keep branch-specific availability and delivery pricing first-class concerns.
?? 3136 | partial | spec | plans/04-branches-and-menus-system.md line 7: ## Branch Business Rules
?? 3137 | planned | spec | plans/04-branches-and-menus-system.md line 8: - A business can have one branch or many.
?? 3138 | suggested | spec | plans/04-branches-and-menus-system.md line 9: - Each branch can be enabled or disabled.
? 3139 | backlog_future | spec | plans/04-branches-and-menus-system.md line 10: - Each branch has localized name fields.
?? 3140 | done | spec | plans/04-branches-and-menus-system.md line 11: - Each branch may have its own phone and address.
?? 3141 | tested | spec | plans/04-branches-and-menus-system.md line 12: - Each branch may have its own coordinates.
?? 3142 | partial | spec | plans/04-branches-and-menus-system.md line 13: - Each branch may have its own working hours.
?? 3143 | suggested | spec | plans/04-branches-and-menus-system.md line 15: ## Delivery Zone Rules
? 3144 | backlog_future | spec | plans/04-branches-and-menus-system.md line 16: - Delivery zones belong to branches.
?? 3145 | done | spec | plans/04-branches-and-menus-system.md line 17: - Delivery zones have delivery fees.
?? 3146 | tested | spec | plans/04-branches-and-menus-system.md line 18: - Delivery zones can be enabled or disabled.
?? 3147 | tested | verification | plans/04-branches-and-menus-system.md line 19: - Checkout must verify selected zone belongs to selected branch.
?? 3148 | suggested | spec | plans/04-branches-and-menus-system.md line 21: ## Branch Data Contract
? 3149 | backlog_future | spec | plans/04-branches-and-menus-system.md line 22: | Field | Type | Purpose |
?? 3150 | done | spec | plans/04-branches-and-menus-system.md line 23: | --- | --- | --- |
?? 3151 | tested | spec | plans/04-branches-and-menus-system.md line 24: | id | integer | primary key |
?? 3152 | partial | spec | plans/04-branches-and-menus-system.md line 25: | name | translatable | branch display |
?? 3153 | planned | spec | plans/04-branches-and-menus-system.md line 26: | slug | string | stable identifier |
?? 3154 | suggested | spec | plans/04-branches-and-menus-system.md line 27: | phone | string | contact |
? 3155 | backlog_future | spec | plans/04-branches-and-menus-system.md line 28: | address | text | display/admin |
?? 3156 | suggested | suggestion | plans/04-branches-and-menus-system.md line 29: | latitude | decimal | optional map use |
?? 3157 | suggested | suggestion | plans/04-branches-and-menus-system.md line 30: | longitude | decimal | optional map use |
?? 3158 | done | api_contract | plans/04-branches-and-menus-system.md line 31: | working_hours_json | json/text | structured schedule |
?? 3159 | planned | spec | plans/04-branches-and-menus-system.md line 32: | is_active | bool | availability |
? 3160 | backlog_future | spec | plans/04-branches-and-menus-system.md line 34: ## Delivery Zone Data Contract
?? 3161 | done | spec | plans/04-branches-and-menus-system.md line 35: | Field | Type | Purpose |
?? 3162 | tested | spec | plans/04-branches-and-menus-system.md line 36: | --- | --- | --- |
?? 3163 | partial | spec | plans/04-branches-and-menus-system.md line 37: | id | integer | primary key |
?? 3164 | planned | spec | plans/04-branches-and-menus-system.md line 38: | branch_id | integer | owner |
?? 3165 | suggested | spec | plans/04-branches-and-menus-system.md line 39: | name | translatable | zone name |
? 3166 | backlog_future | spec | plans/04-branches-and-menus-system.md line 40: | delivery_fee | decimal | shipping |
?? 3167 | done | spec | plans/04-branches-and-menus-system.md line 41: | min_delivery_time_minutes | int | ETA |
?? 3168 | tested | spec | plans/04-branches-and-menus-system.md line 42: | max_delivery_time_minutes | int | ETA |
?? 3169 | partial | spec | plans/04-branches-and-menus-system.md line 43: | is_active | bool | availability |
?? 3170 | suggested | spec | plans/04-branches-and-menus-system.md line 45: ## Menu Exposure Rules
? 3171 | backlog_future | spec | plans/04-branches-and-menus-system.md line 46: - Public clients fetch active branches only.
?? 3172 | done | spec | plans/04-branches-and-menus-system.md line 47: - Public clients fetch only active zones for active branches.
?? 3173 | suggested | suggestion | plans/04-branches-and-menus-system.md line 48: - Public menu queries should optionally filter by branch.
?? 3174 | partial | spec | plans/04-branches-and-menus-system.md line 49: - Product visibility should respect branch selection.
?? 3175 | suggested | spec | plans/04-branches-and-menus-system.md line 51: ## Menu Query Flow
? 3176 | backlog_future | spec | plans/04-branches-and-menus-system.md line 52: 1. Client selects a branch or receives default branch context.
?? 3177 | done | api_contract | plans/04-branches-and-menus-system.md line 53: 2. API resolves active products for that branch.
?? 3178 | done | api_contract | plans/04-branches-and-menus-system.md line 54: 3. API resolves categories relevant to active products.
?? 3179 | done | api_contract | plans/04-branches-and-menus-system.md line 55: 4. API returns best-seller and tag metadata where requested.
?? 3180 | done | api_contract | plans/04-branches-and-menus-system.md line 56: 5. API includes branch availability indicators if helpful.
? 3181 | backlog_future | spec | plans/04-branches-and-menus-system.md line 58: ## Single-Branch Behavior
?? 3182 | done | spec | plans/04-branches-and-menus-system.md line 59: - If only one active branch exists, the client can treat it as default.
?? 3183 | tested | spec | plans/04-branches-and-menus-system.md line 60: - Checkout still records branch explicitly.
?? 3184 | partial | spec | plans/04-branches-and-menus-system.md line 61: - Delivery zone selection still applies where relevant.
?? 3185 | suggested | spec | plans/04-branches-and-menus-system.md line 63: ## Multi-Branch Behavior
? 3186 | backlog_future | spec | plans/04-branches-and-menus-system.md line 64: - Branch must be explicit in cart/checkout context.
?? 3187 | done | spec | plans/04-branches-and-menus-system.md line 65: - Product validation must use selected branch.
?? 3188 | tested | spec | plans/04-branches-and-menus-system.md line 66: - Delivery zone fees come from selected branch only.
?? 3189 | planned | spec | plans/04-branches-and-menus-system.md line 68: ## Product Availability Modes
?? 3190 | suggested | spec | plans/04-branches-and-menus-system.md line 69: - Available in all branches.
? 3191 | backlog_future | spec | plans/04-branches-and-menus-system.md line 70: - Available only in selected branches.
?? 3192 | done | spec | plans/04-branches-and-menus-system.md line 71: - Temporarily disabled globally.
?? 3193 | tested | spec | plans/04-branches-and-menus-system.md line 72: - Temporarily disabled for one branch via pivot.
?? 3194 | planned | spec | plans/04-branches-and-menus-system.md line 74: ## Recommended Pivot Strategy
?? 3195 | suggested | spec | plans/04-branches-and-menus-system.md line 75: | Table | Meaning |
? 3196 | backlog_future | spec | plans/04-branches-and-menus-system.md line 76: | --- | --- |
?? 3197 | suggested | suggestion | plans/04-branches-and-menus-system.md line 77: | branch_product | branch-specific availability and optional stock override |
?? 3198 | partial | spec | plans/04-branches-and-menus-system.md line 79: ## Menu Categories Rules
?? 3199 | planned | spec | plans/04-branches-and-menus-system.md line 80: - Categories can be nested.
?? 3200 | suggested | spec | plans/04-branches-and-menus-system.md line 81: - Categories are global, not per branch by default.
? 3201 | backlog_future | spec | plans/04-branches-and-menus-system.md line 82: - Product visibility under a category depends on branch availability.
?? 3202 | done | spec | plans/04-branches-and-menus-system.md line 83: - Empty categories can be hidden from public branch-filtered responses if desired.
?? 3203 | partial | spec | plans/04-branches-and-menus-system.md line 85: ## Tags Rules
?? 3204 | planned | spec | plans/04-branches-and-menus-system.md line 86: - Tags are global.
?? 3205 | suggested | spec | plans/04-branches-and-menus-system.md line 87: - Tags help search and filtering.
? 3206 | backlog_future | spec | plans/04-branches-and-menus-system.md line 88: - Tags can overlap with category concepts but do not replace them.
?? 3207 | tested | spec | plans/04-branches-and-menus-system.md line 90: ## Best Seller Rules
?? 3208 | partial | spec | plans/04-branches-and-menus-system.md line 91: - Best sellers can be auto-calculated.
?? 3209 | planned | spec | plans/04-branches-and-menus-system.md line 92: - Admin may pin manual best sellers.
?? 3210 | suggested | spec | plans/04-branches-and-menus-system.md line 93: - Per-category best sellers may be supported.
? 3211 | backlog_future | spec | plans/04-branches-and-menus-system.md line 94: - Per-branch best sellers can be derived later if needed.
?? 3212 | tested | spec | plans/04-branches-and-menus-system.md line 96: ## Search Rules
?? 3213 | partial | spec | plans/04-branches-and-menus-system.md line 97: - Search by product name in current locale and secondary locale.
?? 3214 | planned | spec | plans/04-branches-and-menus-system.md line 98: - Search by tag names.
?? 3215 | suggested | spec | plans/04-branches-and-menus-system.md line 99: - Search by category names where practical.
? 3216 | backlog_future | spec | plans/04-branches-and-menus-system.md line 100: - Search must not expose inactive/unavailable products.
?? 3217 | tested | spec | plans/04-branches-and-menus-system.md line 102: ## Sort Rules
?? 3218 | partial | spec | plans/04-branches-and-menus-system.md line 103: - `price_asc`
?? 3219 | planned | spec | plans/04-branches-and-menus-system.md line 104: - `price_desc`
?? 3220 | suggested | spec | plans/04-branches-and-menus-system.md line 105: - `best_seller`
? 3221 | backlog_future | spec | plans/04-branches-and-menus-system.md line 106: - `rating_desc`
?? 3222 | tested | verification | plans/04-branches-and-menus-system.md line 107: - `latest`
?? 3223 | partial | spec | plans/04-branches-and-menus-system.md line 109: ## Branch Filter Rules
?? 3224 | planned | spec | plans/04-branches-and-menus-system.md line 110: - `branch_id` should be an explicit filter on product listing.
?? 3225 | done | api_contract | plans/04-branches-and-menus-system.md line 111: - If absent, API may use default active branch behavior or return general active items.
? 3226 | out_of_scope_backend_only | scope | plans/04-branches-and-menus-system.md line 112: - Checkout requires explicit branch decision.
?? 3227 | tested | spec | plans/04-branches-and-menus-system.md line 114: ## Delivery Validation Example
?? 3228 | partial | spec | plans/04-branches-and-menus-system.md line 115: ```text
?? 3229 | planned | spec | plans/04-branches-and-menus-system.md line 116: Customer selects branch 3
?? 3230 | suggested | spec | plans/04-branches-and-menus-system.md line 117: Cart contains product A available in branches 1 and 2 only
? 3231 | backlog_future | spec | plans/04-branches-and-menus-system.md line 118: Checkout must fail
?? 3232 | done | spec | plans/04-branches-and-menus-system.md line 119: Reason: product A unavailable in selected branch
?? 3233 | tested | spec | plans/04-branches-and-menus-system.md line 120: ```
?? 3234 | planned | spec | plans/04-branches-and-menus-system.md line 122: ## Admin Branch CRUD
?? 3235 | suggested | spec | plans/04-branches-and-menus-system.md line 123: - Create branch.
? 3236 | backlog_future | spec | plans/04-branches-and-menus-system.md line 124: - Update branch.
?? 3237 | done | spec | plans/04-branches-and-menus-system.md line 125: - Enable/disable branch.
?? 3238 | tested | spec | plans/04-branches-and-menus-system.md line 126: - Delete branch if safe or soft-delete if desired.
?? 3239 | partial | spec | plans/04-branches-and-menus-system.md line 127: - Manage zone list per branch.
?? 3240 | suggested | spec | plans/04-branches-and-menus-system.md line 129: ## Admin Zone CRUD
? 3241 | backlog_future | spec | plans/04-branches-and-menus-system.md line 130: - Create zone under branch.
?? 3242 | done | spec | plans/04-branches-and-menus-system.md line 131: - Update delivery fee.
?? 3243 | tested | spec | plans/04-branches-and-menus-system.md line 132: - Update ETA values.
?? 3244 | partial | spec | plans/04-branches-and-menus-system.md line 133: - Enable/disable zone.
?? 3245 | planned | spec | plans/04-branches-and-menus-system.md line 134: - Remove zone if not referenced or handle safely.
?? 3246 | suggested | suggestion | plans/04-branches-and-menus-system.md line 136: ## Suggested Services
?? 3247 | done | spec | plans/04-branches-and-menus-system.md line 137: - `BranchResolverService`
?? 3248 | tested | spec | plans/04-branches-and-menus-system.md line 138: - `BranchAvailabilityService`
?? 3249 | partial | spec | plans/04-branches-and-menus-system.md line 139: - `DeliveryFeeCalculator`
?? 3250 | planned | spec | plans/04-branches-and-menus-system.md line 140: - `BranchMenuQueryService`
?? 3251 | suggested | suggestion | plans/04-branches-and-menus-system.md line 142: ## Suggested Policies
?? 3252 | done | spec | plans/04-branches-and-menus-system.md line 143: - `BranchPolicy`
?? 3253 | tested | spec | plans/04-branches-and-menus-system.md line 144: - `DeliveryZonePolicy`
?? 3254 | partial | spec | plans/04-branches-and-menus-system.md line 145: - `ProductBranchAvailabilityPolicy` or product policy method
?? 3255 | suggested | suggestion | plans/04-branches-and-menus-system.md line 147: ## Suggested Endpoints
?? 3256 | done | api_contract | plans/04-branches-and-menus-system.md line 148: - `GET /api/v1/branches`
?? 3257 | done | api_contract | plans/04-branches-and-menus-system.md line 149: - `GET /api/v1/branches/{id}`
?? 3258 | done | api_contract | plans/04-branches-and-menus-system.md line 150: - `GET /api/v1/branches/{id}/delivery-zones`
?? 3259 | done | api_contract | plans/04-branches-and-menus-system.md line 151: - `GET /api/v1/products?branch_id=1`
?? 3260 | done | api_contract | plans/04-branches-and-menus-system.md line 152: - `GET /api/v1/categories?branch_id=1`
?? 3261 | done | api_contract | plans/04-branches-and-menus-system.md line 154: ## Admin Endpoint Notes
?? 3262 | done | api_contract | plans/04-branches-and-menus-system.md line 155: - Branch list endpoints should support filters.
?? 3263 | done | api_contract | plans/04-branches-and-menus-system.md line 156: - Branch create/update endpoints should accept localized names.
?? 3264 | done | api_contract | plans/04-branches-and-menus-system.md line 157: - Zone endpoints should validate positive delivery fees.
?? 3265 | suggested | spec | plans/04-branches-and-menus-system.md line 159: ## Caching Notes
? 3266 | backlog_future | spec | plans/04-branches-and-menus-system.md line 160: - Branch list can be cached.
?? 3267 | done | spec | plans/04-branches-and-menus-system.md line 161: - Delivery zones per branch can be cached.
?? 3268 | tested | spec | plans/04-branches-and-menus-system.md line 162: - Branch-aware category tree can be cached carefully.
? 3269 | out_of_scope_backend_only | scope | plans/04-branches-and-menus-system.md line 163: - Cache invalidation required on branch, zone, product availability changes.
?? 3270 | tested | verification | plans/04-branches-and-menus-system.md line 165: ## Testing Scenarios
? 3271 | backlog_future | spec | plans/04-branches-and-menus-system.md line 166: 1. Product available in all branches appears everywhere.
?? 3272 | done | spec | plans/04-branches-and-menus-system.md line 167: 2. Product limited to branch 1 does not appear for branch 2 listing.
?? 3273 | tested | spec | plans/04-branches-and-menus-system.md line 168: 3. Disabled branch is absent from public list.
?? 3274 | partial | spec | plans/04-branches-and-menus-system.md line 169: 4. Disabled zone cannot be selected at checkout.
?? 3275 | planned | spec | plans/04-branches-and-menus-system.md line 170: 5. Checkout fails when branch-product mismatch exists.
? 3276 | backlog_future | spec | plans/04-branches-and-menus-system.md line 172: ## Data Integrity Notes
?? 3277 | done | spec | plans/04-branches-and-menus-system.md line 173: - Use foreign keys when supported.
?? 3278 | tested | spec | plans/04-branches-and-menus-system.md line 174: - Prevent orphaned zones.
?? 3279 | partial | spec | plans/04-branches-and-menus-system.md line 175: - Validate branch IDs in all admin/product assignment flows.
?? 3280 | planned | spec | plans/04-branches-and-menus-system.md line 176: - Keep delivery fee non-negative.
? 3281 | backlog_future | future | plans/04-branches-and-menus-system.md line 178: ## Future Extensions
?? 3282 | done | spec | plans/04-branches-and-menus-system.md line 179: - Branch-specific schedules per product.
?? 3283 | tested | spec | plans/04-branches-and-menus-system.md line 180: - Pickup-only branches.
?? 3284 | partial | spec | plans/04-branches-and-menus-system.md line 181: - Zone polygons/GIS support.
?? 3285 | planned | spec | plans/04-branches-and-menus-system.md line 182: - Branch-specific taxes.
?? 3286 | planned | spec | plans/05-products-categories-sizes-addons.md line 1: # Products Categories Sizes Addons
? 3287 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 3: ## Goal
?? 3288 | done | spec | plans/05-products-categories-sizes-addons.md line 4: - Model restaurant catalog data with enough flexibility for real menu complexity.
?? 3289 | tested | spec | plans/05-products-categories-sizes-addons.md line 5: - Support multiple categories, tags, sizes, and add-ons with pricing logic.
? 3290 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 7: ## Product Core Requirements
?? 3291 | suggested | spec | plans/05-products-categories-sizes-addons.md line 8: - Multilingual names.
? 3292 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 9: - Multilingual descriptions.
?? 3293 | suggested | suggestion | plans/05-products-categories-sizes-addons.md line 10: - Base price optional.
?? 3294 | tested | spec | plans/05-products-categories-sizes-addons.md line 11: - Main image and gallery.
?? 3295 | partial | spec | plans/05-products-categories-sizes-addons.md line 12: - External or uploaded video references.
?? 3296 | planned | spec | plans/05-products-categories-sizes-addons.md line 13: - Active/inactive toggle.
?? 3297 | suggested | spec | plans/05-products-categories-sizes-addons.md line 14: - Limited stock toggle and quantity.
? 3298 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 15: - Best-seller metadata.
?? 3299 | tested | spec | plans/05-products-categories-sizes-addons.md line 17: ## Category Rules
?? 3300 | partial | spec | plans/05-products-categories-sizes-addons.md line 18: - Categories support parent-child nesting.
?? 3301 | planned | spec | plans/05-products-categories-sizes-addons.md line 19: - Products may belong to multiple categories.
?? 3302 | suggested | spec | plans/05-products-categories-sizes-addons.md line 20: - Category names are translatable.
? 3303 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 21: - Categories have sort order and active state.
?? 3304 | tested | spec | plans/05-products-categories-sizes-addons.md line 23: ## Tag Rules
?? 3305 | partial | spec | plans/05-products-categories-sizes-addons.md line 24: - Products may belong to many tags.
?? 3306 | planned | spec | plans/05-products-categories-sizes-addons.md line 25: - Tags support search/filter experiences.
?? 3307 | suggested | spec | plans/05-products-categories-sizes-addons.md line 26: - Tags are not branch-specific by default.
?? 3308 | done | spec | plans/05-products-categories-sizes-addons.md line 28: ## Product Media Rules
?? 3309 | tested | spec | plans/05-products-categories-sizes-addons.md line 29: - One main image path on product.
?? 3310 | partial | spec | plans/05-products-categories-sizes-addons.md line 30: - Additional media records in `product_media`.
?? 3311 | planned | spec | plans/05-products-categories-sizes-addons.md line 31: - Media types: image, uploaded video, external video.
?? 3312 | suggested | spec | plans/05-products-categories-sizes-addons.md line 32: - Product detail response includes ordered media array.
?? 3313 | done | spec | plans/05-products-categories-sizes-addons.md line 34: ## Size Rules
?? 3314 | tested | spec | plans/05-products-categories-sizes-addons.md line 35: - Product can have zero or many sizes.
?? 3315 | partial | spec | plans/05-products-categories-sizes-addons.md line 36: - If a product has sizes, price resolution prefers selected size price.
?? 3316 | planned | spec | plans/05-products-categories-sizes-addons.md line 37: - One size may be default.
?? 3317 | suggested | spec | plans/05-products-categories-sizes-addons.md line 38: - Size names are translatable.
? 3318 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 39: - Size code should be stable, such as `small`, `medium`, `large`.
?? 3319 | tested | spec | plans/05-products-categories-sizes-addons.md line 41: ## Add-On Group Rules
?? 3320 | partial | spec | plans/05-products-categories-sizes-addons.md line 42: - Add-on groups belong to product.
?? 3321 | planned | spec | plans/05-products-categories-sizes-addons.md line 43: - Group can be `single` or `multiple`.
? 3322 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 44: - Group can be required or optional.
? 3323 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 45: - Group can define minimum and maximum selections.
?? 3324 | done | spec | plans/05-products-categories-sizes-addons.md line 46: - Group order should be controllable.
?? 3325 | partial | spec | plans/05-products-categories-sizes-addons.md line 48: ## Add-On Option Rules
?? 3326 | planned | spec | plans/05-products-categories-sizes-addons.md line 49: - Options belong to add-on group.
?? 3327 | suggested | spec | plans/05-products-categories-sizes-addons.md line 50: - Options have localized names.
? 3328 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 51: - Options have base price.
?? 3329 | done | spec | plans/05-products-categories-sizes-addons.md line 52: - Options may have size-specific price overrides.
?? 3330 | tested | spec | plans/05-products-categories-sizes-addons.md line 53: - Options can be enabled or disabled.
?? 3331 | planned | spec | plans/05-products-categories-sizes-addons.md line 55: ## Price Calculation Priority
?? 3332 | suggested | spec | plans/05-products-categories-sizes-addons.md line 56: 1. Base product price or selected size price.
? 3333 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 57: 2. Add selected add-on option prices.
?? 3334 | done | spec | plans/05-products-categories-sizes-addons.md line 58: 3. Multiply by quantity.
?? 3335 | tested | spec | plans/05-products-categories-sizes-addons.md line 59: 4. Apply coupon logic later in cart/order services.
?? 3336 | planned | spec | plans/05-products-categories-sizes-addons.md line 61: ## Example Product Model
?? 3337 | suggested | spec | plans/05-products-categories-sizes-addons.md line 62: ```text
? 3338 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 63: Product: Pizza Margherita
?? 3339 | done | spec | plans/05-products-categories-sizes-addons.md line 64: Base price: null
?? 3340 | tested | spec | plans/05-products-categories-sizes-addons.md line 65: Sizes:
?? 3341 | partial | spec | plans/05-products-categories-sizes-addons.md line 66: - Small: 100
?? 3342 | planned | spec | plans/05-products-categories-sizes-addons.md line 67: - Medium: 150
?? 3343 | suggested | spec | plans/05-products-categories-sizes-addons.md line 68: - Large: 210
? 3344 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 69: Addon Group 1: Crust Stuffing (single)
?? 3345 | done | spec | plans/05-products-categories-sizes-addons.md line 70: - Cheese: +20 small / +25 medium / +30 large
?? 3346 | tested | spec | plans/05-products-categories-sizes-addons.md line 71: - Sausage: +25 small / +30 medium / +35 large
?? 3347 | suggested | suggestion | plans/05-products-categories-sizes-addons.md line 72: Addon Group 2: Extra Cheese (multiple, optional)
?? 3348 | planned | spec | plans/05-products-categories-sizes-addons.md line 73: - Mozzarella: +15 / +20 / +25
?? 3349 | suggested | spec | plans/05-products-categories-sizes-addons.md line 74: - Roumy: +12 / +17 / +22
? 3350 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 75: ```
?? 3351 | tested | spec | plans/05-products-categories-sizes-addons.md line 77: ## Listing Behavior
?? 3352 | partial | spec | plans/05-products-categories-sizes-addons.md line 78: - Product list returns summary only.
?? 3353 | planned | spec | plans/05-products-categories-sizes-addons.md line 79: - Product detail returns sizes, add-on groups, tags, categories, media.
?? 3354 | suggested | spec | plans/05-products-categories-sizes-addons.md line 80: - Only active and available items appear publicly.
?? 3355 | done | spec | plans/05-products-categories-sizes-addons.md line 82: ## Search Fields
?? 3356 | tested | spec | plans/05-products-categories-sizes-addons.md line 83: - Product name current locale.
?? 3357 | partial | spec | plans/05-products-categories-sizes-addons.md line 84: - Product name alternate locale.
?? 3358 | suggested | suggestion | plans/05-products-categories-sizes-addons.md line 85: - Description optionally.
?? 3359 | suggested | spec | plans/05-products-categories-sizes-addons.md line 86: - Tags.
? 3360 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 87: - Categories.
?? 3361 | tested | spec | plans/05-products-categories-sizes-addons.md line 89: ## Sort Fields
?? 3362 | partial | spec | plans/05-products-categories-sizes-addons.md line 90: - Effective minimum price.
?? 3363 | planned | spec | plans/05-products-categories-sizes-addons.md line 91: - Rating average.
?? 3364 | suggested | spec | plans/05-products-categories-sizes-addons.md line 92: - Best-seller rank.
? 3365 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 93: - Custom sort order.
?? 3366 | tested | spec | plans/05-products-categories-sizes-addons.md line 95: ## Recommended Services
?? 3367 | partial | spec | plans/05-products-categories-sizes-addons.md line 96: - `ProductCatalogService`
?? 3368 | planned | spec | plans/05-products-categories-sizes-addons.md line 97: - `ProductAvailabilityService`
?? 3369 | suggested | spec | plans/05-products-categories-sizes-addons.md line 98: - `ProductPriceResolver`
? 3370 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 99: - `AddonSelectionValidator`
?? 3371 | done | spec | plans/05-products-categories-sizes-addons.md line 100: - `ProductSearchService`
?? 3372 | partial | spec | plans/05-products-categories-sizes-addons.md line 102: ## Recommended Resource Structure
?? 3373 | done | api_contract | plans/05-products-categories-sizes-addons.md line 103: ```json
?? 3374 | suggested | spec | plans/05-products-categories-sizes-addons.md line 104: {
? 3375 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 105: "id": 10,
?? 3376 | done | spec | plans/05-products-categories-sizes-addons.md line 106: "name": {"ar": "بيتزا", "en": "Pizza"},
?? 3377 | tested | spec | plans/05-products-categories-sizes-addons.md line 107: "base_price": null,
?? 3378 | partial | spec | plans/05-products-categories-sizes-addons.md line 108: "sizes": [],
?? 3379 | planned | spec | plans/05-products-categories-sizes-addons.md line 109: "addon_groups": [],
?? 3380 | suggested | spec | plans/05-products-categories-sizes-addons.md line 110: "categories": [],
? 3381 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 111: "tags": [],
?? 3382 | done | spec | plans/05-products-categories-sizes-addons.md line 112: "media": []
?? 3383 | tested | spec | plans/05-products-categories-sizes-addons.md line 113: }
?? 3384 | partial | spec | plans/05-products-categories-sizes-addons.md line 114: ```
?? 3385 | suggested | spec | plans/05-products-categories-sizes-addons.md line 116: ## Admin Product CRUD Notes
? 3386 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 117: - Create product core fields.
?? 3387 | done | spec | plans/05-products-categories-sizes-addons.md line 118: - Attach categories.
?? 3388 | tested | spec | plans/05-products-categories-sizes-addons.md line 119: - Attach tags.
?? 3389 | partial | spec | plans/05-products-categories-sizes-addons.md line 120: - Attach branches or mark all branches.
?? 3390 | planned | spec | plans/05-products-categories-sizes-addons.md line 121: - Create sizes.
?? 3391 | suggested | spec | plans/05-products-categories-sizes-addons.md line 122: - Create add-on groups.
? 3392 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 123: - Create add-on options.
?? 3393 | done | spec | plans/05-products-categories-sizes-addons.md line 124: - Upload or assign media.
?? 3394 | partial | spec | plans/05-products-categories-sizes-addons.md line 126: ## Validation Rules
? 3395 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 127: - Name required in Arabic at minimum.
?? 3396 | suggested | spec | plans/05-products-categories-sizes-addons.md line 128: - Slug unique.
? 3397 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 129: - Base price required only if no sizes exist.
? 3398 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 130: - Stock quantity required if limited stock is enabled.
?? 3399 | tested | spec | plans/05-products-categories-sizes-addons.md line 131: - Add-on min/max must be coherent.
?? 3400 | partial | spec | plans/05-products-categories-sizes-addons.md line 132: - Size override prices must be non-negative.
?? 3401 | planned | spec | plans/05-products-categories-sizes-addons.md line 133: - Media URLs must be valid when external.
? 3402 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 135: ## Branch Availability Notes
?? 3403 | done | spec | plans/05-products-categories-sizes-addons.md line 136: - Product global activity and branch activity are separate.
?? 3404 | tested | spec | plans/05-products-categories-sizes-addons.md line 137: - A globally disabled product is hidden everywhere.
?? 3405 | partial | spec | plans/05-products-categories-sizes-addons.md line 138: - A globally active product with branch restrictions appears only where allowed.
?? 3406 | suggested | spec | plans/05-products-categories-sizes-addons.md line 140: ## Best Seller Notes
? 3407 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 141: - `is_best_seller_pinned` indicates admin choice.
?? 3408 | done | spec | plans/05-products-categories-sizes-addons.md line 142: - Calculated top sellers can be derived from fulfilled order items.
?? 3409 | done | api_contract | plans/05-products-categories-sizes-addons.md line 143: - API may expose `is_best_seller` after merge of pinned and calculated logic.
?? 3410 | planned | spec | plans/05-products-categories-sizes-addons.md line 145: ## Eloquent Relationship Notes
?? 3411 | suggested | spec | plans/05-products-categories-sizes-addons.md line 146: - `Product belongsToMany Category`
? 3412 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 147: - `Product belongsToMany Tag`
?? 3413 | done | spec | plans/05-products-categories-sizes-addons.md line 148: - `Product belongsToMany Branch`
?? 3414 | tested | spec | plans/05-products-categories-sizes-addons.md line 149: - `Product hasMany ProductSize`
?? 3415 | partial | spec | plans/05-products-categories-sizes-addons.md line 150: - `Product hasMany AddonGroup`
?? 3416 | planned | spec | plans/05-products-categories-sizes-addons.md line 151: - `AddonGroup hasMany AddonOption`
?? 3417 | suggested | spec | plans/05-products-categories-sizes-addons.md line 152: - `AddonOption hasMany AddonOptionSizeOverride`
?? 3418 | done | spec | plans/05-products-categories-sizes-addons.md line 154: ## Cart Validation Inputs
?? 3419 | tested | spec | plans/05-products-categories-sizes-addons.md line 155: - `product_id`
?? 3420 | partial | spec | plans/05-products-categories-sizes-addons.md line 156: - `product_size_id nullable`
?? 3421 | planned | spec | plans/05-products-categories-sizes-addons.md line 157: - `quantity`
?? 3422 | suggested | spec | plans/05-products-categories-sizes-addons.md line 158: - `addon_option_ids[]`
?? 3423 | done | spec | plans/05-products-categories-sizes-addons.md line 160: ## Cart Validation Rules
?? 3424 | tested | spec | plans/05-products-categories-sizes-addons.md line 161: - Selected size must belong to product.
?? 3425 | partial | spec | plans/05-products-categories-sizes-addons.md line 162: - Selected add-ons must belong to the product via groups.
? 3426 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 163: - Required group must be satisfied.
?? 3427 | suggested | spec | plans/05-products-categories-sizes-addons.md line 164: - Single-select group must have max one option.
? 3428 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 165: - Multiple group max must be respected.
?? 3429 | done | spec | plans/05-products-categories-sizes-addons.md line 166: - Branch availability must pass before add/update.
?? 3430 | done | api_contract | plans/05-products-categories-sizes-addons.md line 168: ## Product Detail API Example Sections
?? 3431 | planned | spec | plans/05-products-categories-sizes-addons.md line 169: - `pricing`
?? 3432 | suggested | spec | plans/05-products-categories-sizes-addons.md line 170: - `availability`
? 3433 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 171: - `sizes`
?? 3434 | done | spec | plans/05-products-categories-sizes-addons.md line 172: - `addons`
?? 3435 | tested | spec | plans/05-products-categories-sizes-addons.md line 173: - `media`
?? 3436 | partial | spec | plans/05-products-categories-sizes-addons.md line 174: - `categories`
?? 3437 | planned | spec | plans/05-products-categories-sizes-addons.md line 175: - `tags`
?? 3438 | suggested | spec | plans/05-products-categories-sizes-addons.md line 176: - `rating_summary`
?? 3439 | done | spec | plans/05-products-categories-sizes-addons.md line 178: ## Media Storage Notes
?? 3440 | tested | spec | plans/05-products-categories-sizes-addons.md line 179: - Use storage disk abstraction.
?? 3441 | partial | spec | plans/05-products-categories-sizes-addons.md line 180: - Public URL can be derived from configured upload base URL.
?? 3442 | planned | spec | plans/05-products-categories-sizes-addons.md line 181: - This enables later CDN swap.
?? 3443 | suggested | spec | plans/05-products-categories-sizes-addons.md line 182: - Do not hardcode public filesystem paths inside business logic.
?? 3444 | done | spec | plans/05-products-categories-sizes-addons.md line 184: ## Upload Rules
?? 3445 | tested | spec | plans/05-products-categories-sizes-addons.md line 185: - Only allow safe image/video formats.
?? 3446 | partial | spec | plans/05-products-categories-sizes-addons.md line 186: - Validate max file size.
?? 3447 | planned | spec | plans/05-products-categories-sizes-addons.md line 187: - Sanitize filenames.
?? 3448 | suggested | spec | plans/05-products-categories-sizes-addons.md line 188: - Keep metadata stored separately from actual URL generation.
?? 3449 | tested | verification | plans/05-products-categories-sizes-addons.md line 190: ## Testing Scenarios
? 3450 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 191: 1. Product with sizes requires valid size at add-to-cart if configured that way.
? 3451 | out_of_scope_backend_only | scope | plans/05-products-categories-sizes-addons.md line 192: 2. Required add-on group blocks invalid add-to-cart.
?? 3452 | planned | spec | plans/05-products-categories-sizes-addons.md line 193: 3. Single-select add-on group rejects multiple choices.
?? 3453 | suggested | spec | plans/05-products-categories-sizes-addons.md line 194: 4. Size-specific addon pricing resolves correctly.
? 3454 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 195: 5. Inactive product does not appear in public listing.
?? 3455 | done | spec | plans/05-products-categories-sizes-addons.md line 196: 6. Branch-restricted product does not appear in unauthorized branch context.
? 3456 | backlog_future | future | plans/05-products-categories-sizes-addons.md line 198: ## Future Extensions
?? 3457 | planned | spec | plans/05-products-categories-sizes-addons.md line 199: - Product bundles.
?? 3458 | suggested | spec | plans/05-products-categories-sizes-addons.md line 200: - Time-window availability.
? 3459 | backlog_future | spec | plans/05-products-categories-sizes-addons.md line 201: - Branch-specific prices.
?? 3460 | done | spec | plans/05-products-categories-sizes-addons.md line 202: - Nutritional metadata.
?? 3461 | tested | spec | plans/05-products-categories-sizes-addons.md line 203: - SEO fields for website client later.
?? 3462 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 1: # Reviews Ratings Tags Best Sellers
?? 3463 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 3: ## Goal
?? 3464 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 4: - Support trustworthy customer reviews and useful discovery metadata.
?? 3465 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 6: ## Review Rules
?? 3466 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 7: - Only verified buyers can review.
? 3467 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 8: - Reviews rate from `1` to `5`.
?? 3468 | suggested | suggestion | plans/06-reviews-ratings-tags-best-sellers.md line 9: - Review comment is optional.
?? 3469 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 10: - Review can be anonymous.
? 3470 | out_of_scope_backend_only | scope | plans/06-reviews-ratings-tags-best-sellers.md line 11: - Review moderation is required.
?? 3471 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 13: ## Verified Purchase Rule
? 3472 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 14: - User must have purchased the product in an eligible fulfilled order state.
?? 3473 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 15: - Recommended eligible order state: `delivered`.
?? 3474 | tested | verification | plans/06-reviews-ratings-tags-best-sellers.md line 16: - Review creation should verify the relationship through order items.
?? 3475 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 18: ## Repeat Review Rule
?? 3476 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 19: - A user may review again only after another eligible purchase if business wants repeated reviews.
? 3477 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 20: - Simpler v1 rule: one review per order item or per fulfilled purchase event.
?? 3478 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 22: ## Review Fields
?? 3479 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 23: | Field | Type | Notes |
?? 3480 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 24: | --- | --- | --- |
?? 3481 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 25: | user_id | FK | reviewer |
? 3482 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 26: | product_id | FK | product |
?? 3483 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 27: | order_item_id | FK nullable | verification link |
?? 3484 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 28: | rating | integer | 1-5 |
?? 3485 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 29: | comment | text nullable | sanitized |
?? 3486 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 30: | is_anonymous | boolean | display choice |
?? 3487 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 31: | is_visible | boolean | moderation |
? 3488 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 32: | is_admin_generated | boolean | marketing/manual seed |
?? 3489 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 34: ## Display Rules
?? 3490 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 35: - Public API returns only visible reviews.
?? 3491 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 36: - Anonymous reviews hide customer identity.
?? 3492 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 37: - Review summary includes count and average rating.
?? 3493 | suggested | suggestion | plans/06-reviews-ratings-tags-best-sellers.md line 38: - Optional metadata may include verified purchase flag.
?? 3494 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 40: ## Admin Moderation Rules
?? 3495 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 41: - Admin can hide review.
?? 3496 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 42: - Admin can delete review.
?? 3497 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 43: - Admin can create manual promotional review only with explicit permission.
? 3498 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 44: - Manual reviews should be marked internally.
?? 3499 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 46: ## Abuse Prevention
?? 3500 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 47: - Sanitize comments.
?? 3501 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 48: - Rate-limit review submission.
? 3502 | out_of_scope_backend_only | scope | plans/06-reviews-ratings-tags-best-sellers.md line 49: - Require verified purchase.
?? 3503 | suggested | suggestion | plans/06-reviews-ratings-tags-best-sellers.md line 50: - Optionally disallow editing after a time window.
?? 3504 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 52: ## Rating Aggregation
?? 3505 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 53: - Product average rating should be computed or cached from visible reviews.
?? 3506 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 54: - Product rating count should be included.
?? 3507 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 55: - Recalculation should happen after create/update/delete/hide actions.
?? 3508 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 57: ## Tags Rules
?? 3509 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 58: - Tags support discovery.
?? 3510 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 59: - Tags can be managed by admin.
?? 3511 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 60: - Tags can be attached/detached from products.
?? 3512 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 61: - Public product APIs can return tags for filtering and search.
?? 3513 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 63: ## Best Seller Strategy
?? 3514 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 64: - Best sellers should be based on fulfilled order item quantities.
?? 3515 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 65: - Pinned best sellers override or augment computed ranking.
?? 3516 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 66: - Best sellers can be global and per category.
?? 3517 | suggested | suggestion | plans/06-reviews-ratings-tags-best-sellers.md line 68: ## Suggested Best Seller Calculation
?? 3518 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 69: 1. Consider eligible order states.
?? 3519 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 70: 2. Aggregate order item quantities by product.
?? 3520 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 71: 3. Apply time window if desired later.
?? 3521 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 72: 4. Merge with pinned metadata.
?? 3522 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 73: 5. Cache output.
?? 3523 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 75: ## Best Seller API Output
?? 3524 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 76: - `product_id`
?? 3525 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 77: - `sales_count`
?? 3526 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 78: - `is_pinned`
?? 3527 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 79: - `rank`
?? 3528 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 81: ## Review API Endpoints
?? 3529 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 82: - `POST /api/v1/reviews`
?? 3530 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 83: - `GET /api/v1/products/{id}/reviews`
?? 3531 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 84: - `GET /api/v1/admin/reviews`
?? 3532 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 85: - `DELETE /api/v1/admin/reviews/{id}`
?? 3533 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 86: - `PUT /api/v1/admin/reviews/{id}`
?? 3534 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 88: ## Validation Rules
? 3535 | out_of_scope_backend_only | scope | plans/06-reviews-ratings-tags-best-sellers.md line 89: - Rating required and between 1 and 5.
?? 3536 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 90: - Comment max length controlled.
?? 3537 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 91: - Product must exist.
? 3538 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 92: - Reviewer must own eligible purchase.
?? 3539 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 94: ## Eloquent Notes
?? 3540 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 95: - `Review belongsTo User`
?? 3541 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 96: - `Review belongsTo Product`
?? 3542 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 97: - `Review belongsTo OrderItem`
? 3543 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 98: - `Product hasMany Review`
?? 3544 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 100: ## Response Design
?? 3545 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 101: ```json
?? 3546 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 102: {
?? 3547 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 103: "id": 12,
? 3548 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 104: "rating": 5,
?? 3549 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 105: "comment": "Excellent",
?? 3550 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 106: "is_anonymous": false,
?? 3551 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 107: "reviewer_name": "Ali",
?? 3552 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 108: "created_at": "2026-04-11T12:00:00Z"
?? 3553 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 109: }
? 3554 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 110: ```
?? 3555 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 112: ## Privacy Notes
?? 3556 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 113: - Anonymous reviews should not expose username.
?? 3557 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 114: - Public display may show masked identity if needed.
?? 3558 | done | api_contract | plans/06-reviews-ratings-tags-best-sellers.md line 115: - Admin APIs can still see real owner if authorized.
?? 3559 | tested | verification | plans/06-reviews-ratings-tags-best-sellers.md line 117: ## Testing Scenarios
?? 3560 | tested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 118: 1. Non-buyer cannot review.
?? 3561 | partial | spec | plans/06-reviews-ratings-tags-best-sellers.md line 119: 2. Buyer with delivered order can review.
?? 3562 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 120: 3. Anonymous review hides identity publicly.
?? 3563 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 121: 4. Hidden review is absent from public listing.
? 3564 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 122: 5. Product rating average updates after moderation change.
?? 3565 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 123: 6. Admin-generated review is flagged internally.
? 3566 | backlog_future | future | plans/06-reviews-ratings-tags-best-sellers.md line 125: ## Future Extensions
?? 3567 | planned | spec | plans/06-reviews-ratings-tags-best-sellers.md line 126: - Review images.
?? 3568 | suggested | spec | plans/06-reviews-ratings-tags-best-sellers.md line 127: - Helpfulness votes.
? 3569 | backlog_future | spec | plans/06-reviews-ratings-tags-best-sellers.md line 128: - Merchant replies.
?? 3570 | done | spec | plans/06-reviews-ratings-tags-best-sellers.md line 129: - Review edit history.
?? 3571 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 1: # Users Profiles Addresses Wallet Gift Cards
?? 3572 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 3: ## Goal
?? 3573 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 4: - Provide a secure customer identity and value-storage system.
? 3574 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 6: ## User Rules
?? 3575 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 7: - Unique lowercase username.
?? 3576 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 8: - Unique lowercase email when present.
? 3577 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 9: - Required unique primary phone.
?? 3578 | suggested | suggestion | plans/07-users-profiles-addresses-wallet-giftcards.md line 10: - Optional secondary phones.
?? 3579 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 11: - Secure password rules.
? 3580 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 12: - Active/inactive state.
?? 3581 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 14: ## Profile Rules
?? 3582 | suggested | suggestion | plans/07-users-profiles-addresses-wallet-giftcards.md line 15: - Public profile optional.
?? 3583 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 16: - Public profile identified by username.
?? 3584 | done | customization | plans/07-users-profiles-addresses-wallet-giftcards.md line 17: - Privacy settings control exposed stats.
? 3585 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 18: - Avatar path stored in profile record.
?? 3586 | suggested | suggestion | plans/07-users-profiles-addresses-wallet-giftcards.md line 19: - Bio optional and sanitized.
?? 3587 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 21: ## Public Profile Stats
?? 3588 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 22: - Total orders.
?? 3589 | pending | todo | plans/07-users-profiles-addresses-wallet-giftcards.md line 23: - Total spending.
? 3590 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 24: - Monthly rank.
?? 3591 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 25: - Yearly rank.
?? 3592 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 26: - Favorite products.
?? 3593 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 28: ## Privacy Flags
?? 3594 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 29: - `is_public_profile`
? 3595 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 30: - `show_total_orders`
?? 3596 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 31: - `show_total_spent`
?? 3597 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 32: - `show_monthly_rank`
?? 3598 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 33: - `show_yearly_rank`
?? 3599 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 34: - `show_favorite_products`
? 3600 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 36: ## Addresses
?? 3601 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 37: - User can have multiple addresses.
?? 3602 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 38: - One address can be default.
?? 3603 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 39: - Setting a new default should clear previous default.
?? 3604 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 40: - Address notes and landmarks should be sanitized.
? 3605 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 42: ## Secondary Phones
?? 3606 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 43: - Useful for delivery backup contact.
?? 3607 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 44: - Non-unique globally.
?? 3608 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 45: - Belong to user.
?? 3609 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 47: ## Wallet Rules
? 3610 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 48: - Every user should have one wallet.
?? 3611 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 49: - Wallet balance is numeric and non-negative.
?? 3612 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 50: - Wallet operations must be transactional.
?? 3613 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 51: - Wallet history must be persisted.
?? 3614 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 53: ## Wallet Transaction Types
? 3615 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 54: - `credit`
?? 3616 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 55: - `debit`
?? 3617 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 56: - `refund`
?? 3618 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 57: - `gift_card_redeem`
?? 3619 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 58: - `manual_adjustment`
?? 3620 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 59: - `order_payment`
?? 3621 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 61: ## Wallet Use Cases
?? 3622 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 62: - Refund to wallet.
?? 3623 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 63: - Partial payment during checkout.
?? 3624 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 64: - Full wallet payment.
?? 3625 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 65: - Gift card redemption.
? 3626 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 66: - Manual admin credit/debit.
?? 3627 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 68: ## Gift Card Rules
?? 3628 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 69: - Gift cards created by admin.
?? 3629 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 70: - Gift cards have unique code.
?? 3630 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 71: - Gift cards have amount.
? 3631 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 72: - Gift cards may expire.
?? 3632 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 73: - Gift cards may be disabled.
?? 3633 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 74: - Gift cards redeem into wallet.
?? 3634 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 75: - Redeem should be single-use unless explicitly designed otherwise.
?? 3635 | done | customization | plans/07-users-profiles-addresses-wallet-giftcards.md line 77: ## Gift Card Settings
? 3636 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 78: - Feature toggle: enable/disable.
?? 3637 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 79: - Default currency code.
?? 3638 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 80: - Code length and format if configurable later.
?? 3639 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 82: ## Profile Endpoints
?? 3640 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 83: - `GET /api/v1/profile`
?? 3641 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 84: - `PUT /api/v1/profile`
?? 3642 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 85: - `GET /api/v1/profiles/{username}`
?? 3643 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 86: - `PUT /api/v1/profile/privacy`
?? 3644 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 88: ## Address Endpoints
?? 3645 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 89: - `GET /api/v1/addresses`
?? 3646 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 90: - `POST /api/v1/addresses`
?? 3647 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 91: - `PUT /api/v1/addresses/{id}`
?? 3648 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 92: - `DELETE /api/v1/addresses/{id}`
?? 3649 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 93: - `POST /api/v1/addresses/{id}/default`
?? 3650 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 95: ## Wallet Endpoints
?? 3651 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 96: - `GET /api/v1/wallet`
?? 3652 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 97: - `GET /api/v1/wallet/transactions`
?? 3653 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 98: - `POST /api/v1/wallet/redeem`
?? 3654 | suggested | suggestion | plans/07-users-profiles-addresses-wallet-giftcards.md line 100: ## Suggested Services
?? 3655 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 101: - `ProfileService`
? 3656 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 102: - `AddressService`
?? 3657 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 103: - `WalletService`
?? 3658 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 104: - `GiftCardService`
?? 3659 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 105: - `WalletLedgerService`
?? 3660 | suggested | suggestion | plans/07-users-profiles-addresses-wallet-giftcards.md line 107: ## Suggested Policies
? 3661 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 108: - `ProfilePolicy`
?? 3662 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 109: - `AddressPolicy`
?? 3663 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 110: - `WalletPolicy`
?? 3664 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 111: - `GiftCardPolicy`
?? 3665 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 113: ## Stats Computation Strategy
? 3666 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 114: - Aggregate orders in delivered/eligible states.
?? 3667 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 115: - Use date range boundaries by calendar month/year.
?? 3668 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 116: - Prefer service/query objects.
?? 3669 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 117: - Cache if needed for hot endpoints.
?? 3670 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 119: ## Calendar Ranking Notes
? 3671 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 120: - Monthly ranking uses actual month boundaries.
?? 3672 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 121: - Yearly ranking uses actual year boundaries.
? 3673 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 122: - Do not use rolling 30-day windows when requirement says calendar period.
?? 3674 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 124: ## Avatar Upload Notes
?? 3675 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 125: - Use storage disk abstraction.
? 3676 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 126: - Validate uploads strictly.
?? 3677 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 127: - Keep path only in DB.
?? 3678 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 128: - URL should be derived from storage/CDN config.
?? 3679 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 130: ## Validation Rules
?? 3680 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 131: - Username alphanumeric/dash/underscore policy if desired.
? 3681 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 132: - Username unique ignoring case.
?? 3682 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 133: - Primary phone unique.
? 3683 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 134: - Address city/street required.
? 3684 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 135: - Gift card code required and normalized.
?? 3685 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 137: ## Eloquent Relationship Notes
? 3686 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 138: - `User hasOne UserProfile`
?? 3687 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 139: - `User hasMany UserAddress`
?? 3688 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 140: - `User hasMany UserSecondaryPhone`
?? 3689 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 141: - `User hasOne Wallet`
?? 3690 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 142: - `Wallet hasMany WalletTransaction`
?? 3691 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 143: - `GiftCard hasMany GiftCardRedemption`
?? 3692 | done | security | plans/07-users-profiles-addresses-wallet-giftcards.md line 145: ## Security Notes
?? 3693 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 146: - Wallet balance must not be modified by client payloads directly.
?? 3694 | done | api_contract | plans/07-users-profiles-addresses-wallet-giftcards.md line 147: - Gift card redeem endpoint should be rate-limited.
? 3695 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 148: - Manual wallet adjustments require explicit admin permission.
?? 3696 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 149: - Sensitive profile fields remain private unless explicitly public.
?? 3697 | tested | verification | plans/07-users-profiles-addresses-wallet-giftcards.md line 151: ## Testing Scenarios
?? 3698 | tested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 152: 1. Username/email stored lowercase.
?? 3699 | partial | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 153: 2. Default address uniqueness per user holds.
?? 3700 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 154: 3. Public profile respects privacy flags.
?? 3701 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 155: 4. Gift card redeem increases wallet balance exactly once.
? 3702 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 156: 5. Duplicate redeem is rejected.
? 3703 | out_of_scope_backend_only | scope | plans/07-users-profiles-addresses-wallet-giftcards.md line 157: 6. Wallet debit cannot exceed balance when full prepayment is required.
? 3704 | backlog_future | future | plans/07-users-profiles-addresses-wallet-giftcards.md line 159: ## Future Extensions
?? 3705 | planned | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 160: - Phone verification.
?? 3706 | suggested | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 161: - Wallet expiration or loyalty points.
? 3707 | backlog_future | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 162: - Referral codes.
?? 3708 | done | spec | plans/07-users-profiles-addresses-wallet-giftcards.md line 163: - Customer tiers.
?? 3709 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 1: # Cart Orders Checkout Shipping Coupons
?? 3710 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 3: ## Goal
? 3711 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 4: - Convert configurable product selections into reliable, auditable orders.
?? 3712 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 6: ## Cart Design Rules
?? 3713 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 7: - Cart is per authenticated user in v1.
?? 3714 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 8: - Cart can hold same product multiple times with different configurations.
?? 3715 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 9: - Cart item uniqueness is based on configuration hash, not only product ID.
?? 3716 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 11: ## Cart Item Configuration Inputs
?? 3717 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 12: - `product_id`
?? 3718 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 13: - `product_size_id nullable`
?? 3719 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 14: - `addon_option_ids[]`
?? 3720 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 15: - `quantity`
?? 3721 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 17: ## Cart Validation Rules
?? 3722 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 18: - Product exists and is active.
?? 3723 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 19: - Product is available for selected branch context if branch already chosen.
?? 3724 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 20: - Selected size belongs to product.
?? 3725 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 21: - Selected add-ons belong to product.
? 3726 | out_of_scope_backend_only | scope | plans/08-cart-orders-checkout-shipping-coupons.md line 22: - Required add-on groups are satisfied.
?? 3727 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 23: - Quantity is positive.
?? 3728 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 24: - Limited stock is respected when enabled.
?? 3729 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 26: ## Cart Storage Strategy
?? 3730 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 27: - Persistent DB-backed cart for authenticated users.
? 3731 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 28: - Branch can be associated with cart when selected.
?? 3732 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 29: - Coupon preview/application can be cart-scoped, but final validation occurs again at checkout.
?? 3733 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 31: ## Shipping Rules
?? 3734 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 32: - Delivery fee depends on selected branch and zone.
?? 3735 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 33: - Zone must belong to selected branch.
? 3736 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 34: - Disabled zone cannot be used.
?? 3737 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 35: - Single-branch businesses still record zone when delivery is needed.
?? 3738 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 37: ## Checkout Inputs
?? 3739 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 38: - `branch_id`
?? 3740 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 39: - `delivery_zone_id`
? 3741 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 40: - `address_id`
?? 3742 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 41: - `notes nullable`
?? 3743 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 42: - `payment_method`
?? 3744 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 43: - `coupon_code nullable`
?? 3745 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 44: - `use_wallet_amount nullable`
? 3746 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 46: ## Checkout Validation Steps
?? 3747 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 47: 1. Load current cart.
?? 3748 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 48: 2. Ensure cart is not empty.
?? 3749 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 49: 3. Ensure branch exists and active.
?? 3750 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 50: 4. Ensure delivery zone belongs to branch and active.
?? 3751 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 51: 5. Revalidate every cart item against branch availability.
? 3752 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 52: 6. Revalidate sizes/add-ons.
?? 3753 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 53: 7. Recalculate subtotal/addons.
?? 3754 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 54: 8. Evaluate coupon.
?? 3755 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 55: 9. Evaluate wallet usage.
?? 3756 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 56: 10. Persist order in transaction.
?? 3757 | done | security | plans/08-cart-orders-checkout-shipping-coupons.md line 58: ## Notes Field Security
?? 3758 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 59: - Notes are sanitized.
?? 3759 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 60: - Notes are plain text oriented.
?? 3760 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 61: - Notes should not preserve executable scripts.
?? 3761 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 63: ## Payment Methods In V1
? 3762 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 64: - `cash_on_delivery`
?? 3763 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 65: - `wallet`
?? 3764 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 66: - `wallet_plus_cash_on_delivery` if partial wallet use is allowed
?? 3765 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 68: ## Coupon Rule Matrix
?? 3766 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 69: | Rule | Support |
? 3767 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 70: | --- | --- |
?? 3768 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 71: | Fixed amount | Yes |
?? 3769 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 72: | Percentage | Yes |
?? 3770 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 73: | Max discount cap | Yes |
?? 3771 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 74: | Min cart value | Yes |
?? 3772 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 75: | Product/category conditions | Yes |
? 3773 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 76: | Per-user usage limit | Yes |
?? 3774 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 77: | Global usage limit | Yes |
?? 3775 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 78: | Expiration window | Yes |
?? 3776 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 79: | Delivery only | Yes |
?? 3777 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 80: | Products only | Yes |
?? 3778 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 81: | Products + delivery | Yes |
?? 3779 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 83: ## Coupon Application Rules
?? 3780 | tested | deployment | plans/08-cart-orders-checkout-shipping-coupons.md line 84: - Coupon eligibility is server-side only.
?? 3781 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 85: - Coupon may apply to eligible products subtotal only.
?? 3782 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 86: - Coupon may apply to delivery only.
?? 3783 | pending | todo | plans/08-cart-orders-checkout-shipping-coupons.md line 87: - Coupon may apply to both depending on config.
? 3784 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 88: - Extra unused discount is discarded.
?? 3785 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 89: - Extra unused discount is never converted into wallet credit by default.
?? 3786 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 91: ## Coupon Example 1
?? 3787 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 92: ```text
?? 3788 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 93: Coupon: 50 EGP off products only
? 3789 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 94: Products subtotal: 20
?? 3790 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 95: Delivery: 5
?? 3791 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 96: Applied discount: 20
?? 3792 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 97: Final total: 5
?? 3793 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 98: Unused 30 is discarded
?? 3794 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 99: ```
?? 3795 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 101: ## Coupon Example 2
?? 3796 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 102: ```text
?? 3797 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 103: Coupon: 50 EGP off both products and delivery
?? 3798 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 104: Products subtotal: 20
?? 3799 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 105: Delivery: 5
? 3800 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 106: Applied discount: 25
?? 3801 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 107: Final total: 0
?? 3802 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 108: Unused 25 is discarded
?? 3803 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 109: ```
?? 3804 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 111: ## Order Snapshot Rules
? 3805 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 112: - Copy customer-safe item names.
?? 3806 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 113: - Copy selected size names/codes.
?? 3807 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 114: - Copy add-on names and prices.
?? 3808 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 115: - Copy pricing breakdown.
?? 3809 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 116: - Copy coupon summary.
?? 3810 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 117: - Copy wallet deduction amount.
? 3811 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 118: - Copy currency code.
?? 3812 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 120: ## Order Statuses
?? 3813 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 121: - `created`
?? 3814 | pending | todo | plans/08-cart-orders-checkout-shipping-coupons.md line 122: - `pending`
?? 3815 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 123: - `confirmed`
? 3816 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 124: - `preparing`
?? 3817 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 125: - `out_for_delivery`
?? 3818 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 126: - `delivered`
?? 3819 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 127: - `cancelled`
?? 3820 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 128: - `refunded`
? 3821 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 130: ## Grace Period
?? 3822 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 131: - Store `grace_period_ends_at`.
?? 3823 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 132: - Default duration `2 minutes`.
?? 3824 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 133: - Customer can cancel own order within window.
?? 3825 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 134: - Customer may edit notes within window if enabled.
?? 3826 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 135: - After expiry, customer direct changes are blocked.
?? 3827 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 137: ## Staff Order Flow
?? 3828 | pending | todo | plans/08-cart-orders-checkout-shipping-coupons.md line 138: 1. Staff sees newly eligible pending order.
?? 3829 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 139: 2. Staff confirms after review.
?? 3830 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 140: 3. Staff moves order to preparing.
?? 3831 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 141: 4. Staff assigns delivery info.
? 3832 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 142: 5. Staff moves order to out_for_delivery.
?? 3833 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 143: 6. Staff marks delivered.
?? 3834 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 144: 7. Refund/cancel handled through controlled transitions.
?? 3835 | suggested | suggestion | plans/08-cart-orders-checkout-shipping-coupons.md line 146: ## Suggested Services
?? 3836 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 147: - `CartService`
? 3837 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 148: - `CartValidationService`
?? 3838 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 149: - `CheckoutService`
?? 3839 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 150: - `CouponEvaluator`
?? 3840 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 151: - `ShippingCalculator`
?? 3841 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 152: - `OrderStatusTransitionService`
?? 3842 | suggested | suggestion | plans/08-cart-orders-checkout-shipping-coupons.md line 154: ## Suggested Policies
?? 3843 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 155: - `CartPolicy`
?? 3844 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 156: - `OrderPolicy`
?? 3845 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 157: - `CouponPolicy`
?? 3846 | done | api_contract | plans/08-cart-orders-checkout-shipping-coupons.md line 159: ## Order API Notes
? 3847 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 160: - Order detail response includes item snapshots.
?? 3848 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 161: - Order detail response includes status history.
?? 3849 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 162: - Order detail response includes delivery assignment if available.
?? 3850 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 164: ## Cancel Rules
?? 3851 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 165: - Customer can cancel only own order.
? 3852 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 166: - Only within grace period.
?? 3853 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 167: - Only when status is still cancelable.
?? 3854 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 168: - Cancel event should be logged.
?? 3855 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 170: ## Refund Notes
?? 3856 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 171: - Refund may return to wallet or other method later.
? 3857 | out_of_scope_backend_only | scope | plans/08-cart-orders-checkout-shipping-coupons.md line 172: - Refund action requires admin privilege.
?? 3858 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 173: - Refund should create wallet transaction when refunded to balance.
?? 3859 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 175: ## Stock Handling Notes
?? 3860 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 176: - If stock tracking enabled, decrement safely during order creation or confirmation based on business decision.
?? 3861 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 177: - V1 simpler decision: reserve/decrement at order creation.
? 3862 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 178: - Compensate on cancellation/refund if reservation policy uses stock.
?? 3863 | tested | verification | plans/08-cart-orders-checkout-shipping-coupons.md line 180: ## Curl Test Targets
?? 3864 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 181: - login
?? 3865 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 182: - fetch cart
?? 3866 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 183: - add item
? 3867 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 184: - checkout
?? 3868 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 185: - list orders
?? 3869 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 186: - cancel order
?? 3870 | tested | verification | plans/08-cart-orders-checkout-shipping-coupons.md line 188: ## Testing Scenarios
?? 3871 | suggested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 189: 1. Same product with different configurations creates separate cart lines.
? 3872 | backlog_future | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 190: 2. Checkout fails when one item unavailable in selected branch.
?? 3873 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 191: 3. Coupon delivery-only logic works.
?? 3874 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 192: 4. Unused discount remainder is discarded.
?? 3875 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 193: 5. Grace-period cancel works before cutoff.
?? 3876 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 194: 6. Grace-period cancel fails after cutoff.
? 3877 | backlog_future | future | plans/08-cart-orders-checkout-shipping-coupons.md line 196: ## Future Extensions
?? 3878 | done | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 197: - Saved carts.
?? 3879 | tested | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 198: - Guest cart merge.
?? 3880 | partial | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 199: - Multiple addresses per order type.
?? 3881 | planned | spec | plans/08-cart-orders-checkout-shipping-coupons.md line 200: - Scheduled orders.
?? 3882 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 1: # Admin Roles Permissions Notifications
?? 3883 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 3: ## Goal
? 3884 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 4: - Provide strong operational control without overexposing privileges.
?? 3885 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 6: ## Admin Core Capabilities
?? 3886 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 7: - Manage branches and zones.
?? 3887 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 8: - Manage products, categories, tags, sizes, add-ons.
?? 3888 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 9: - Manage orders and delivery assignments.
? 3889 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 10: - Manage coupons and gift cards.
?? 3890 | done | customization | plans/09-admin-roles-permissions-notifications.md line 11: - Manage settings and dynamic pages.
?? 3891 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 12: - Manage roles, permissions, and admin users.
?? 3892 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 13: - Moderate reviews.
?? 3893 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 15: ## Role Model
? 3894 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 16: - Use Spatie roles and permissions.
?? 3895 | done | spec | plans/09-admin-roles-permissions-notifications.md line 17: - Roles are human-friendly bundles.
?? 3896 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 18: - Permissions are atomic operations.
?? 3897 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 19: - Policies enforce object-level rules.
?? 3898 | suggested | suggestion | plans/09-admin-roles-permissions-notifications.md line 21: ## Suggested Roles
? 3899 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 22: - `super-admin`
?? 3900 | done | spec | plans/09-admin-roles-permissions-notifications.md line 23: - `catalog-manager`
?? 3901 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 24: - `orders-manager`
?? 3902 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 25: - `branch-manager`
?? 3903 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 26: - `support-agent`
?? 3904 | done | customization | plans/09-admin-roles-permissions-notifications.md line 27: - `settings-manager`
? 3905 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 28: - `marketing-manager`
?? 3906 | suggested | suggestion | plans/09-admin-roles-permissions-notifications.md line 30: ## Suggested Permission Groups
?? 3907 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 31: | Group | Example Permissions |
?? 3908 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 32: | --- | --- |
?? 3909 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 33: | Branches | branches.view, branches.create, branches.update |
? 3910 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 34: | Delivery | delivery-zones.manage, orders.assign-delivery |
?? 3911 | done | spec | plans/09-admin-roles-permissions-notifications.md line 35: | Catalog | products.create, products.update, categories.manage |
?? 3912 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 36: | Orders | orders.view, orders.update-status, orders.refund |
?? 3913 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 37: | Reviews | reviews.moderate |
?? 3914 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 38: | Coupons | coupons.manage |
?? 3915 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 39: | Wallet | wallet.adjust |
?? 3916 | done | customization | plans/09-admin-roles-permissions-notifications.md line 40: | Settings | settings.manage |
?? 3917 | done | spec | plans/09-admin-roles-permissions-notifications.md line 41: | Admins | roles.manage, admin-users.manage |
?? 3918 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 43: ## Branch Scope Strategy
?? 3919 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 44: - Permissions stay generic.
?? 3920 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 45: - Branch assignments determine effective scope.
? 3921 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 46: - Policies check user assigned branches against target branch.
?? 3922 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 48: ## Super Admin Notes
?? 3923 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 49: - Super admin bypass is centralized.
?? 3924 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 50: - Super admin sees all logs and all branches.
?? 3925 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 51: - Super admin can manage roles/permissions.
?? 3926 | done | spec | plans/09-admin-roles-permissions-notifications.md line 53: ## Admin User Strategy
?? 3927 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 54: - Reuse main `users` table.
?? 3928 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 55: - Admin is any user with elevated role(s).
?? 3929 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 56: - Avoid separate admin table unless operationally needed.
? 3930 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 58: ## Notifications Goals
?? 3931 | done | spec | plans/09-admin-roles-permissions-notifications.md line 59: - Notify customers about order changes.
?? 3932 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 60: - Notify admins/staff about new orders or operational events.
?? 3933 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 61: - Support database notifications in v1.
?? 3934 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 62: - Support email notifications where configured.
? 3935 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 64: ## Notification Channels
?? 3936 | done | spec | plans/09-admin-roles-permissions-notifications.md line 65: - Database.
?? 3937 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 66: - Mail.
?? 3938 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 67: - Broadcast later if enabled.
?? 3939 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 69: ## Notification Candidates
? 3940 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 70: - New order created.
?? 3941 | done | spec | plans/09-admin-roles-permissions-notifications.md line 71: - Order confirmed.
?? 3942 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 72: - Order out for delivery.
?? 3943 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 73: - Order delivered.
?? 3944 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 74: - Order cancelled.
?? 3945 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 75: - Refund completed.
? 3946 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 76: - Gift card redeemed.
?? 3947 | done | customization | plans/09-admin-roles-permissions-notifications.md line 77: - Sensitive settings changed.
?? 3948 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 79: ## Notification Storage
?? 3949 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 80: - Use Laravel notifications table.
?? 3950 | done | api_contract | plans/09-admin-roles-permissions-notifications.md line 81: - Keep notification payloads JSON-friendly.
? 3951 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 82: - Include translation-ready message keys where possible.
?? 3952 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 84: ## Admin Audit Events
?? 3953 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 85: - Role assigned.
?? 3954 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 86: - Permission set changed.
?? 3955 | done | customization | plans/09-admin-roles-permissions-notifications.md line 87: - Settings updated.
? 3956 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 88: - Wallet adjusted.
?? 3957 | done | spec | plans/09-admin-roles-permissions-notifications.md line 89: - Coupon created/updated/deleted.
?? 3958 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 90: - Gift card generated.
?? 3959 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 91: - Order refunded.
?? 3960 | suggested | suggestion | plans/09-admin-roles-permissions-notifications.md line 93: ## Suggested Services
? 3961 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 94: - `AdminRoleService`
?? 3962 | done | spec | plans/09-admin-roles-permissions-notifications.md line 95: - `PermissionSyncService`
?? 3963 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 96: - `OrderNotificationService`
?? 3964 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 97: - `AuditLogService`
?? 3965 | suggested | suggestion | plans/09-admin-roles-permissions-notifications.md line 99: ## Suggested Policies
? 3966 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 100: - `RolePolicy`
?? 3967 | done | spec | plans/09-admin-roles-permissions-notifications.md line 101: - `PermissionPolicy`
?? 3968 | done | customization | plans/09-admin-roles-permissions-notifications.md line 102: - `SettingsPolicy`
?? 3969 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 103: - `AdminUserPolicy`
?? 3970 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 105: ## Dynamic Pages Notes
? 3971 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 106: - Admin can CRUD pages like TOS and Privacy.
?? 3972 | done | spec | plans/09-admin-roles-permissions-notifications.md line 107: - These are backend content entities only.
?? 3973 | done | api_contract | plans/09-admin-roles-permissions-notifications.md line 108: - Public API can expose active page by slug.
?? 3974 | done | api_contract | plans/09-admin-roles-permissions-notifications.md line 110: ## Theme JSON Notes
?? 3975 | done | api_contract | plans/09-admin-roles-permissions-notifications.md line 111: - Admin can upload/update/export theme settings JSON.
? 3976 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 112: - Treat this as stored configuration only.
?? 3977 | done | api_contract | plans/09-admin-roles-permissions-notifications.md line 113: - Validate JSON structure.
?? 3978 | tested | deployment | plans/09-admin-roles-permissions-notifications.md line 114: - Do not render anything server-side.
?? 3979 | done | customization | plans/09-admin-roles-permissions-notifications.md line 116: ## Settings Groups
?? 3980 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 117: - `general`
? 3981 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 118: - `currency`
?? 3982 | done | spec | plans/09-admin-roles-permissions-notifications.md line 119: - `auth`
?? 3983 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 120: - `orders`
?? 3984 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 121: - `wallet`
?? 3985 | planned | spec | plans/09-admin-roles-permissions-notifications.md line 122: - `gift_cards`
?? 3986 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 123: - `notifications`
? 3987 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 124: - `mail`
?? 3988 | done | customization | plans/09-admin-roles-permissions-notifications.md line 125: - `theme`
?? 3989 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 126: - `features`
?? 3990 | done | security | plans/09-admin-roles-permissions-notifications.md line 128: ## Admin Endpoint Security
? 3991 | out_of_scope_backend_only | scope | plans/09-admin-roles-permissions-notifications.md line 129: - Require auth.
? 3992 | out_of_scope_backend_only | scope | plans/09-admin-roles-permissions-notifications.md line 130: - Require explicit permissions.
?? 3993 | done | spec | plans/09-admin-roles-permissions-notifications.md line 131: - Apply stricter rate limits on admin auth.
?? 3994 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 132: - Audit privileged actions.
?? 3995 | tested | verification | plans/09-admin-roles-permissions-notifications.md line 134: ## Testing Scenarios
?? 3996 | suggested | spec | plans/09-admin-roles-permissions-notifications.md line 135: 1. Branch manager sees only assigned branch orders.
?? 3997 | done | customization | plans/09-admin-roles-permissions-notifications.md line 136: 2. Support agent cannot edit settings.
?? 3998 | done | spec | plans/09-admin-roles-permissions-notifications.md line 137: 3. Super admin can assign roles.
?? 3999 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 138: 4. Review moderator can hide review but not change wallet.
?? 4000 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 139: 5. New order creates notification to appropriate staff.
? 4001 | backlog_future | future | plans/09-admin-roles-permissions-notifications.md line 141: ## Future Extensions
? 4002 | backlog_future | spec | plans/09-admin-roles-permissions-notifications.md line 142: - In-app admin dashboard widgets.
?? 4003 | done | spec | plans/09-admin-roles-permissions-notifications.md line 143: - Escalation rules.
?? 4004 | tested | spec | plans/09-admin-roles-permissions-notifications.md line 144: - Notification templates editor.
?? 4005 | partial | spec | plans/09-admin-roles-permissions-notifications.md line 145: - Webhook notifications.
?? 4006 | tested | security | plans/10-security-best-practices-and-testing.md line 1: # Security Best Practices And Testing
?? 4007 | partial | spec | plans/10-security-best-practices-and-testing.md line 3: ## Goal
?? 4008 | tested | verification | plans/10-security-best-practices-and-testing.md line 4: - Reduce common web/API vulnerabilities and keep critical flows testable.
?? 4009 | done | security | plans/10-security-best-practices-and-testing.md line 6: ## Core Security Controls
?? 4010 | done | spec | plans/10-security-best-practices-and-testing.md line 7: - Sanctum token auth.
?? 4011 | tested | spec | plans/10-security-best-practices-and-testing.md line 8: - Lowercase identity normalization.
?? 4012 | partial | spec | plans/10-security-best-practices-and-testing.md line 9: - Rate limiting.
?? 4013 | done | security | plans/10-security-best-practices-and-testing.md line 10: - Policy-based authorization.
?? 4014 | suggested | spec | plans/10-security-best-practices-and-testing.md line 11: - Free-text sanitization.
? 4015 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 12: - Strict upload validation.
?? 4016 | done | spec | plans/10-security-best-practices-and-testing.md line 13: - Transactional wallet/coupon/order writes.
?? 4017 | partial | spec | plans/10-security-best-practices-and-testing.md line 15: ## Threat Checklist
?? 4018 | done | security | plans/10-security-best-practices-and-testing.md line 16: - XSS in notes and reviews.
?? 4019 | done | security | plans/10-security-best-practices-and-testing.md line 17: - SQL injection in filtering/sorting.
? 4020 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 18: - Mass assignment in admin CRUD.
?? 4021 | done | spec | plans/10-security-best-practices-and-testing.md line 19: - Broken access control.
?? 4022 | tested | spec | plans/10-security-best-practices-and-testing.md line 20: - Token leakage.
?? 4023 | partial | spec | plans/10-security-best-practices-and-testing.md line 21: - Coupon abuse.
?? 4024 | planned | spec | plans/10-security-best-practices-and-testing.md line 22: - Gift card replay.
?? 4025 | suggested | spec | plans/10-security-best-practices-and-testing.md line 23: - Wallet race conditions.
?? 4026 | done | spec | plans/10-security-best-practices-and-testing.md line 25: ## Input Validation Rules
?? 4027 | done | api_contract | plans/10-security-best-practices-and-testing.md line 26: - Use `FormRequest` on all write endpoints.
?? 4028 | partial | spec | plans/10-security-best-practices-and-testing.md line 27: - Use nested validation for cart and product options.
?? 4029 | planned | spec | plans/10-security-best-practices-and-testing.md line 28: - Use whitelist-based sorting and filtering.
?? 4030 | suggested | spec | plans/10-security-best-practices-and-testing.md line 29: - Reject unsupported enum/status values.
?? 4031 | done | spec | plans/10-security-best-practices-and-testing.md line 31: ## Sanitization Rules
?? 4032 | tested | spec | plans/10-security-best-practices-and-testing.md line 32: - Notes: sanitize as plain text.
?? 4033 | partial | spec | plans/10-security-best-practices-and-testing.md line 33: - Reviews: sanitize as plain text.
?? 4034 | planned | spec | plans/10-security-best-practices-and-testing.md line 34: - Profile bio: sanitize.
?? 4035 | suggested | spec | plans/10-security-best-practices-and-testing.md line 35: - Dynamic pages: if rich text allowed later, sanitize with allowlist.
?? 4036 | done | security | plans/10-security-best-practices-and-testing.md line 37: ## Upload Security
?? 4037 | tested | spec | plans/10-security-best-practices-and-testing.md line 38: - Restrict mime types.
?? 4038 | partial | spec | plans/10-security-best-practices-and-testing.md line 39: - Restrict file size.
?? 4039 | planned | spec | plans/10-security-best-practices-and-testing.md line 40: - Restrict extensions.
?? 4040 | suggested | spec | plans/10-security-best-practices-and-testing.md line 41: - Generate safe filenames.
? 4041 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 42: - Avoid executing uploaded files.
?? 4042 | done | spec | plans/10-security-best-practices-and-testing.md line 43: - Use configured disk and URL prefix.
?? 4043 | partial | spec | plans/10-security-best-practices-and-testing.md line 45: ## Access Control Rules
?? 4044 | done | api_contract | plans/10-security-best-practices-and-testing.md line 46: - Every protected route uses auth middleware.
?? 4045 | suggested | spec | plans/10-security-best-practices-and-testing.md line 47: - Every sensitive action checks policy or permission.
?? 4046 | done | api_contract | plans/10-security-best-practices-and-testing.md line 48: - Never rely on hidden routes.
?? 4047 | done | spec | plans/10-security-best-practices-and-testing.md line 49: - Never trust client-sent role flags.
? 4048 | out_of_scope_backend_only | scope | plans/10-security-best-practices-and-testing.md line 51: ## Sensitive Operations Requiring Transaction
?? 4049 | planned | spec | plans/10-security-best-practices-and-testing.md line 52: - Checkout.
?? 4050 | suggested | spec | plans/10-security-best-practices-and-testing.md line 53: - Wallet redemption.
? 4051 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 54: - Refund.
?? 4052 | done | spec | plans/10-security-best-practices-and-testing.md line 55: - Coupon usage finalization.
?? 4053 | tested | spec | plans/10-security-best-practices-and-testing.md line 56: - Manual wallet adjustment.
?? 4054 | planned | spec | plans/10-security-best-practices-and-testing.md line 58: ## Logging Rules
?? 4055 | done | security | plans/10-security-best-practices-and-testing.md line 59: - Log security-relevant actions.
? 4056 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 60: - Do not log passwords.
?? 4057 | done | spec | plans/10-security-best-practices-and-testing.md line 61: - Do not log plaintext tokens.
?? 4058 | tested | spec | plans/10-security-best-practices-and-testing.md line 62: - Mask sensitive headers when needed.
?? 4059 | planned | spec | plans/10-security-best-practices-and-testing.md line 64: ## Error Handling Rules
?? 4060 | done | api_contract | plans/10-security-best-practices-and-testing.md line 65: - JSON errors only.
? 4061 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 66: - Safe production messages.
?? 4062 | done | spec | plans/10-security-best-practices-and-testing.md line 67: - Detailed internal logs only.
?? 4063 | partial | spec | plans/10-security-best-practices-and-testing.md line 69: ## Rate Limit Targets
?? 4064 | planned | spec | plans/10-security-best-practices-and-testing.md line 70: - Register.
?? 4065 | suggested | spec | plans/10-security-best-practices-and-testing.md line 71: - Login.
? 4066 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 72: - Admin login.
?? 4067 | done | spec | plans/10-security-best-practices-and-testing.md line 73: - Gift card redeem.
?? 4068 | tested | spec | plans/10-security-best-practices-and-testing.md line 74: - Coupon apply.
?? 4069 | partial | spec | plans/10-security-best-practices-and-testing.md line 75: - Review create.
?? 4070 | planned | spec | plans/10-security-best-practices-and-testing.md line 76: - Password reset if implemented.
?? 4071 | tested | verification | plans/10-security-best-practices-and-testing.md line 78: ## Testing Pyramid
?? 4072 | tested | verification | plans/10-security-best-practices-and-testing.md line 79: - Unit tests for calculation services.
?? 4073 | tested | verification | plans/10-security-best-practices-and-testing.md line 80: - Feature tests for API flows.
?? 4074 | tested | verification | plans/10-security-best-practices-and-testing.md line 81: - Integration-like tests for auth and permissions.
?? 4075 | tested | verification | plans/10-security-best-practices-and-testing.md line 83: ## Priority Test Matrix
?? 4076 | tested | verification | plans/10-security-best-practices-and-testing.md line 84: | Area | Test Type |
?? 4077 | done | spec | plans/10-security-best-practices-and-testing.md line 85: | --- | --- |
?? 4078 | tested | spec | plans/10-security-best-practices-and-testing.md line 86: | Auth normalization | Feature |
?? 4079 | partial | spec | plans/10-security-best-practices-and-testing.md line 87: | Password rules | Unit/Feature |
?? 4080 | planned | spec | plans/10-security-best-practices-and-testing.md line 88: | Branch availability | Feature |
?? 4081 | suggested | spec | plans/10-security-best-practices-and-testing.md line 89: | Cart validation | Feature |
? 4082 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 90: | Coupon calculations | Unit |
?? 4083 | done | spec | plans/10-security-best-practices-and-testing.md line 91: | Wallet redemption | Feature |
?? 4084 | tested | spec | plans/10-security-best-practices-and-testing.md line 92: | Order grace period | Feature |
?? 4085 | partial | spec | plans/10-security-best-practices-and-testing.md line 93: | Review eligibility | Feature |
?? 4086 | planned | spec | plans/10-security-best-practices-and-testing.md line 94: | Role scope | Feature |
?? 4087 | tested | security | plans/10-security-best-practices-and-testing.md line 96: ## Security Test Cases
?? 4088 | done | spec | plans/10-security-best-practices-and-testing.md line 97: 1. Uppercase email login works after normalization.
?? 4089 | tested | spec | plans/10-security-best-practices-and-testing.md line 98: 2. User cannot access another user order.
?? 4090 | partial | spec | plans/10-security-best-practices-and-testing.md line 99: 3. Branch manager blocked from unrelated branch.
?? 4091 | done | security | plans/10-security-best-practices-and-testing.md line 100: 4. XSS script in notes does not persist dangerously.
?? 4092 | suggested | spec | plans/10-security-best-practices-and-testing.md line 101: 5. Unsupported upload type rejected.
? 4093 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 102: 6. Coupon over-discount remainder discarded.
?? 4094 | done | spec | plans/10-security-best-practices-and-testing.md line 103: 7. Gift card cannot redeem twice.
?? 4095 | tested | spec | plans/10-security-best-practices-and-testing.md line 104: 8. Wallet cannot overdraw incorrectly.
?? 4096 | tested | verification | plans/10-security-best-practices-and-testing.md line 106: ## Curl Verification Targets
?? 4097 | suggested | spec | plans/10-security-best-practices-and-testing.md line 107: - Register.
? 4098 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 108: - Login.
?? 4099 | done | spec | plans/10-security-best-practices-and-testing.md line 109: - Authenticated profile.
?? 4100 | tested | spec | plans/10-security-best-practices-and-testing.md line 110: - Add cart item.
?? 4101 | partial | spec | plans/10-security-best-practices-and-testing.md line 111: - Checkout.
?? 4102 | planned | spec | plans/10-security-best-practices-and-testing.md line 112: - Cancel within grace period.
?? 4103 | suggested | spec | plans/10-security-best-practices-and-testing.md line 113: - Redeem gift card.
?? 4104 | tested | verification | plans/10-security-best-practices-and-testing.md line 115: ## Performance Test Targets
?? 4105 | tested | spec | plans/10-security-best-practices-and-testing.md line 116: - Product list with filters.
?? 4106 | partial | spec | plans/10-security-best-practices-and-testing.md line 117: - Category tree response.
?? 4107 | planned | spec | plans/10-security-best-practices-and-testing.md line 118: - Order listing with eager loading.
?? 4108 | suggested | spec | plans/10-security-best-practices-and-testing.md line 119: - Notification creation not blocking request unnecessarily.
?? 4109 | done | spec | plans/10-security-best-practices-and-testing.md line 121: ## Static Analysis
?? 4110 | tested | spec | plans/10-security-best-practices-and-testing.md line 122: - Run `phpstan`.
?? 4111 | partial | spec | plans/10-security-best-practices-and-testing.md line 123: - Keep strict types where practical.
?? 4112 | planned | spec | plans/10-security-best-practices-and-testing.md line 124: - Fix high-risk issues first.
? 4113 | backlog_future | spec | plans/10-security-best-practices-and-testing.md line 126: ## Code Style
?? 4114 | done | spec | plans/10-security-best-practices-and-testing.md line 127: - PSR-12.
?? 4115 | tested | spec | plans/10-security-best-practices-and-testing.md line 128: - Small service classes.
?? 4116 | partial | spec | plans/10-security-best-practices-and-testing.md line 129: - No fat controllers.
?? 4117 | planned | spec | plans/10-security-best-practices-and-testing.md line 130: - No raw unsafe SQL from request parameters.
?? 4118 | done | security | plans/10-security-best-practices-and-testing.md line 132: ## Future Security Extensions
?? 4119 | done | spec | plans/10-security-best-practices-and-testing.md line 133: - 2FA for admins.
? 4120 | out_of_scope_backend_only | scope | plans/10-security-best-practices-and-testing.md line 134: - Device management UI later.
?? 4121 | partial | spec | plans/10-security-best-practices-and-testing.md line 135: - Webhook signing.
?? 4122 | planned | spec | plans/10-security-best-practices-and-testing.md line 136: - Dedicated audit viewer.
?? 4123 | suggested | spec | plans/11-localization-arabic-english.md line 1: # Localization Arabic English
?? 4124 | done | spec | plans/11-localization-arabic-english.md line 3: ## Goal
?? 4125 | tested | spec | plans/11-localization-arabic-english.md line 4: - Make the backend language-aware from day one.
?? 4126 | planned | spec | plans/11-localization-arabic-english.md line 6: ## Supported Languages
?? 4127 | suggested | spec | plans/11-localization-arabic-english.md line 7: - Arabic `ar`.
? 4128 | backlog_future | spec | plans/11-localization-arabic-english.md line 8: - English `en`.
?? 4129 | tested | spec | plans/11-localization-arabic-english.md line 10: ## Locale Resolution
?? 4130 | partial | spec | plans/11-localization-arabic-english.md line 11: - Use `Accept-Language` header.
?? 4131 | planned | spec | plans/11-localization-arabic-english.md line 12: - Default locale can be `ar`.
?? 4132 | suggested | spec | plans/11-localization-arabic-english.md line 13: - Fallback locale can be `en`.
?? 4133 | done | spec | plans/11-localization-arabic-english.md line 15: ## Content Translation Strategy
?? 4134 | tested | spec | plans/11-localization-arabic-english.md line 16: - Store product/category/page names in translation-friendly columns.
?? 4135 | done | api_contract | plans/11-localization-arabic-english.md line 17: - JSON/text columns are acceptable.
?? 4136 | suggested | suggestion | plans/11-localization-arabic-english.md line 18: - API resources return current locale value and optionally full translations when needed by admin endpoints.
? 4137 | backlog_future | spec | plans/11-localization-arabic-english.md line 20: ## Localized Entities
?? 4138 | done | spec | plans/11-localization-arabic-english.md line 21: - Branch name.
?? 4139 | tested | spec | plans/11-localization-arabic-english.md line 22: - Delivery zone name.
?? 4140 | partial | spec | plans/11-localization-arabic-english.md line 23: - Category name.
?? 4141 | planned | spec | plans/11-localization-arabic-english.md line 24: - Tag name.
?? 4142 | suggested | spec | plans/11-localization-arabic-english.md line 25: - Product name.
? 4143 | backlog_future | spec | plans/11-localization-arabic-english.md line 26: - Product description.
?? 4144 | done | spec | plans/11-localization-arabic-english.md line 27: - Size name.
?? 4145 | tested | spec | plans/11-localization-arabic-english.md line 28: - Add-on group name.
?? 4146 | partial | spec | plans/11-localization-arabic-english.md line 29: - Add-on option name.
?? 4147 | planned | spec | plans/11-localization-arabic-english.md line 30: - Dynamic page title/content.
?? 4148 | done | api_contract | plans/11-localization-arabic-english.md line 32: ## API Message Localization
?? 4149 | done | spec | plans/11-localization-arabic-english.md line 33: - Validation messages localizable.
?? 4150 | tested | spec | plans/11-localization-arabic-english.md line 34: - Common success messages localizable.
?? 4151 | partial | spec | plans/11-localization-arabic-english.md line 35: - Error messages localizable.
?? 4152 | suggested | spec | plans/11-localization-arabic-english.md line 37: ## Admin Localization Rules
?? 4153 | done | api_contract | plans/11-localization-arabic-english.md line 38: - Admin write endpoints can accept both `ar` and `en` values.
?? 4154 | done | spec | plans/11-localization-arabic-english.md line 39: - Missing secondary translation may be allowed in v1 if primary exists.
?? 4155 | partial | spec | plans/11-localization-arabic-english.md line 41: ## Public Read Rules
?? 4156 | done | api_contract | plans/11-localization-arabic-english.md line 42: - Public APIs return localized content according to request header.
?? 4157 | suggested | suggestion | plans/11-localization-arabic-english.md line 43: - Optionally include fallback if requested locale missing.
?? 4158 | done | spec | plans/11-localization-arabic-english.md line 45: ## Example Translation Payload
?? 4159 | done | api_contract | plans/11-localization-arabic-english.md line 46: ```json
?? 4160 | partial | spec | plans/11-localization-arabic-english.md line 47: {
?? 4161 | planned | spec | plans/11-localization-arabic-english.md line 48: "name": {
?? 4162 | suggested | spec | plans/11-localization-arabic-english.md line 49: "ar": "بيتزا مارجريتا",
? 4163 | backlog_future | spec | plans/11-localization-arabic-english.md line 50: "en": "Margherita Pizza"
?? 4164 | done | spec | plans/11-localization-arabic-english.md line 51: }
?? 4165 | tested | spec | plans/11-localization-arabic-english.md line 52: }
?? 4166 | partial | spec | plans/11-localization-arabic-english.md line 53: ```
?? 4167 | suggested | spec | plans/11-localization-arabic-english.md line 55: ## Example Response Strategy
?? 4168 | done | api_contract | plans/11-localization-arabic-english.md line 56: ```json
?? 4169 | done | spec | plans/11-localization-arabic-english.md line 57: {
?? 4170 | tested | spec | plans/11-localization-arabic-english.md line 58: "id": 1,
?? 4171 | partial | spec | plans/11-localization-arabic-english.md line 59: "name": "بيتزا مارجريتا",
?? 4172 | planned | spec | plans/11-localization-arabic-english.md line 60: "translations": {
?? 4173 | suggested | spec | plans/11-localization-arabic-english.md line 61: "ar": "بيتزا مارجريتا",
? 4174 | backlog_future | spec | plans/11-localization-arabic-english.md line 62: "en": "Margherita Pizza"
?? 4175 | done | spec | plans/11-localization-arabic-english.md line 63: }
?? 4176 | tested | spec | plans/11-localization-arabic-english.md line 64: }
?? 4177 | partial | spec | plans/11-localization-arabic-english.md line 65: ```
?? 4178 | suggested | spec | plans/11-localization-arabic-english.md line 67: ## Currency Localization Notes
?? 4179 | done | customization | plans/11-localization-arabic-english.md line 68: - Currency code and symbol come from settings.
?? 4180 | done | spec | plans/11-localization-arabic-english.md line 69: - Formatting may be left to clients, but backend should return raw amounts and currency metadata.
?? 4181 | partial | spec | plans/11-localization-arabic-english.md line 71: ## Validation Notes
? 4182 | out_of_scope_backend_only | scope | plans/11-localization-arabic-english.md line 72: - Require Arabic translation for core catalog entities.
?? 4183 | suggested | suggestion | plans/11-localization-arabic-english.md line 73: - English translation optional but strongly recommended.
? 4184 | backlog_future | spec | plans/11-localization-arabic-english.md line 74: - Slugs remain non-translated stable identifiers.
?? 4185 | tested | verification | plans/11-localization-arabic-english.md line 76: ## Testing Scenarios
?? 4186 | partial | spec | plans/11-localization-arabic-english.md line 77: 1. `Accept-Language: ar` returns Arabic name.
?? 4187 | planned | spec | plans/11-localization-arabic-english.md line 78: 2. `Accept-Language: en` returns English name.
?? 4188 | suggested | spec | plans/11-localization-arabic-english.md line 79: 3. Missing locale falls back safely.
? 4189 | backlog_future | spec | plans/11-localization-arabic-english.md line 80: 4. Admin can write both translations.
? 4190 | backlog_future | future | plans/11-localization-arabic-english.md line 82: ## Future Extensions
?? 4191 | partial | spec | plans/11-localization-arabic-english.md line 83: - More languages.
?? 4192 | planned | spec | plans/11-localization-arabic-english.md line 84: - Localized notification templates.
? 4193 | backlog_future | future | plans/11-localization-arabic-english.md line 85: - Localized SEO metadata for future web client.
? 4194 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 1: # Scalability And Future Mobile
?? 4195 | partial | spec | plans/12-scalability-and-future-mobile.md line 3: ## Goal
? 4196 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 4: - Keep the backend ready for future clients and higher traffic.
? 4197 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 6: ## Scalability Principles
?? 4198 | done | api_contract | plans/12-scalability-and-future-mobile.md line 7: - Stable API contracts.
?? 4199 | tested | spec | plans/12-scalability-and-future-mobile.md line 8: - Token-based auth.
? 4200 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 9: - Clear domain services.
?? 4201 | planned | spec | plans/12-scalability-and-future-mobile.md line 10: - Queue heavy tasks.
?? 4202 | suggested | spec | plans/12-scalability-and-future-mobile.md line 11: - Cache hot data.
? 4203 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 12: - Keep storage abstraction flexible.
? 4204 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 14: ## Mobile Readiness
? 4205 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 15: - Bearer token auth fits mobile.
? 4206 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 16: - JSON-only responses fit mobile.
?? 4207 | done | api_contract | plans/12-scalability-and-future-mobile.md line 17: - Versioned endpoints fit long-lived app releases.
? 4208 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 18: - Snapshot-based orders keep historical consistency.
? 4209 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 20: ## Future Client Compatibility
?? 4210 | done | api_contract | plans/12-scalability-and-future-mobile.md line 21: - Avoid web-specific assumptions in API responses.
?? 4211 | planned | spec | plans/12-scalability-and-future-mobile.md line 22: - Avoid session-only logic.
? 4212 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 23: - Return explicit data needed by mobile apps.
? 4213 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 24: - Keep enums/status names stable and documented.
?? 4214 | tested | spec | plans/12-scalability-and-future-mobile.md line 26: ## Caching Candidates
?? 4215 | done | customization | plans/12-scalability-and-future-mobile.md line 27: - Public settings.
?? 4216 | planned | spec | plans/12-scalability-and-future-mobile.md line 28: - Branch list.
?? 4217 | suggested | spec | plans/12-scalability-and-future-mobile.md line 29: - Delivery zones by branch.
? 4218 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 30: - Category tree.
?? 4219 | done | spec | plans/12-scalability-and-future-mobile.md line 31: - Best-seller products.
?? 4220 | tested | spec | plans/12-scalability-and-future-mobile.md line 32: - Product detail if traffic warrants.
?? 4221 | planned | spec | plans/12-scalability-and-future-mobile.md line 34: ## Queue Candidates
?? 4222 | suggested | spec | plans/12-scalability-and-future-mobile.md line 35: - Notifications.
? 4223 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 36: - Mail.
?? 4224 | done | spec | plans/12-scalability-and-future-mobile.md line 37: - Best-seller recomputation.
?? 4225 | tested | spec | plans/12-scalability-and-future-mobile.md line 38: - Media post-processing.
?? 4226 | partial | spec | plans/12-scalability-and-future-mobile.md line 39: - Audit fan-out tasks if added.
?? 4227 | suggested | spec | plans/12-scalability-and-future-mobile.md line 41: ## Storage/CDN Strategy
? 4228 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 42: - Use Laravel disk abstraction.
?? 4229 | done | spec | plans/12-scalability-and-future-mobile.md line 43: - Dedicated uploads disk.
?? 4230 | tested | spec | plans/12-scalability-and-future-mobile.md line 44: - Public URL base configurable.
?? 4231 | partial | spec | plans/12-scalability-and-future-mobile.md line 45: - CDN migration should be configuration-driven.
?? 4232 | suggested | spec | plans/12-scalability-and-future-mobile.md line 47: ## Database Strategy
? 4233 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 48: - Use SQLite locally.
?? 4234 | done | spec | plans/12-scalability-and-future-mobile.md line 49: - Keep migrations MySQL-friendly.
?? 4235 | tested | spec | plans/12-scalability-and-future-mobile.md line 50: - Use indexes for hot queries.
?? 4236 | partial | spec | plans/12-scalability-and-future-mobile.md line 51: - Keep decimal money values.
? 4237 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 53: ## Future MySQL Notes
? 4238 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 54: - Move to MySQL 8 in staging/production if needed.
?? 4239 | tested | verification | plans/12-scalability-and-future-mobile.md line 55: - Re-test JSON/text behavior.
?? 4240 | tested | verification | plans/12-scalability-and-future-mobile.md line 56: - Re-test indexes and constraints.
?? 4241 | planned | spec | plans/12-scalability-and-future-mobile.md line 58: ## Octane / Horizon / Redis Notes
?? 4242 | suggested | spec | plans/12-scalability-and-future-mobile.md line 59: - Keep code Octane-safe if Octane used later.
? 4243 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 60: - Horizon useful once Redis queues are active.
?? 4244 | done | spec | plans/12-scalability-and-future-mobile.md line 61: - Local dev can defer some of these if environment is lighter.
?? 4245 | partial | spec | plans/12-scalability-and-future-mobile.md line 63: ## Scaling Risks
?? 4246 | planned | spec | plans/12-scalability-and-future-mobile.md line 64: - Product list query complexity.
?? 4247 | suggested | spec | plans/12-scalability-and-future-mobile.md line 65: - Coupon evaluation complexity.
? 4248 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 66: - Wallet/order race conditions.
?? 4249 | done | spec | plans/12-scalability-and-future-mobile.md line 67: - Notification fan-out.
?? 4250 | tested | spec | plans/12-scalability-and-future-mobile.md line 68: - Best-seller recalculation cost.
?? 4251 | planned | spec | plans/12-scalability-and-future-mobile.md line 70: ## Mitigation Strategies
?? 4252 | suggested | spec | plans/12-scalability-and-future-mobile.md line 71: - Query objects.
? 4253 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 72: - Indexing.
?? 4254 | done | spec | plans/12-scalability-and-future-mobile.md line 73: - Eager loading.
?? 4255 | tested | spec | plans/12-scalability-and-future-mobile.md line 74: - Cache with invalidation points.
?? 4256 | partial | spec | plans/12-scalability-and-future-mobile.md line 75: - Transactions for financial writes.
?? 4257 | planned | spec | plans/12-scalability-and-future-mobile.md line 76: - Background jobs for heavy side effects.
? 4258 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 78: ## Future Mobile API Considerations
?? 4259 | done | spec | plans/12-scalability-and-future-mobile.md line 79: - Return compact but sufficient payloads.
?? 4260 | tested | spec | plans/12-scalability-and-future-mobile.md line 80: - Provide pagination metadata.
?? 4261 | partial | spec | plans/12-scalability-and-future-mobile.md line 81: - Provide structured error codes if needed later.
?? 4262 | planned | spec | plans/12-scalability-and-future-mobile.md line 82: - Avoid response shapes that depend on HTML rendering concepts.
? 4263 | backlog_future | future | plans/12-scalability-and-future-mobile.md line 84: ## Future Features
?? 4264 | done | spec | plans/12-scalability-and-future-mobile.md line 85: - Push notifications.
?? 4265 | tested | spec | plans/12-scalability-and-future-mobile.md line 86: - Scheduled orders.
?? 4266 | partial | spec | plans/12-scalability-and-future-mobile.md line 87: - Loyalty points.
?? 4267 | planned | spec | plans/12-scalability-and-future-mobile.md line 88: - Driver accounts and tracking.
?? 4268 | suggested | spec | plans/12-scalability-and-future-mobile.md line 89: - Region-based taxation.
? 4269 | backlog_future | spec | plans/12-scalability-and-future-mobile.md line 90: - Multi-brand tenancy.
?? 4270 | tested | verification | plans/12-scalability-and-future-mobile.md line 92: ## Testing Readiness
?? 4271 | tested | verification | plans/12-scalability-and-future-mobile.md line 93: - Keep curl-based local checks for dev.
?? 4272 | tested | verification | plans/12-scalability-and-future-mobile.md line 94: - Keep feature tests around auth, cart, checkout, orders.
?? 4273 | tested | verification | plans/12-scalability-and-future-mobile.md line 95: - Add load/perf tests later for hot endpoints.
?? 4274 | done | spec | plans/12-scalability-and-future-mobile.md line 97: ## Final Notes
?? 4275 | tested | spec | plans/12-scalability-and-future-mobile.md line 98: - Design v1 for correctness first.
?? 4276 | partial | spec | plans/12-scalability-and-future-mobile.md line 99: - Keep extension points in services and configuration.
?? 4277 | planned | spec | plans/12-scalability-and-future-mobile.md line 100: - Do not over-engineer beyond current backend scope.
?? 4278 | suggested | deployment | Create a second nginx server block template for future domain onboarding without disturbing the current default server.
?? 4279 | suggested | deployment | Add HTTPS, LetsEncrypt or Cloudflare origin cert workflow before public launch.
?? 4280 | suggested | quality | Add per-branch API fixtures and smoke packs for regression testing complex branch availability logic.
?? 4281 | suggested | quality | Add contract snapshots for representative JSON payloads consumed by website, admin SPA, Android, and iOS clients later.
?? 4282 | suggested | security | Add dedicated fuzzing for malformed nested add-ons payloads and file upload edge cases.
? 4283 | backlog_future | infra | Switch to MySQL or PostgreSQL when higher write concurrency or relational reporting needs outgrow SQLite.
? 4284 | backlog_future | infra | Introduce Redis-backed cache and queue execution in production-grade infrastructure.
? 4285 | backlog_future | infra | Enable Horizon dashboard only behind protected operator access in non-public environments.
? 4286 | backlog_future | ops | Add centralized log shipping and alerting for failed queue jobs and auth abuse signals.
?? 4287 | blocked_or_risk | git | Remote repository push cannot complete until credentials with write permission to ahmedsalah8pro-ctrl/onlineRestaurant_backend.git are configured.
?? 4288 | done | matrix | Implementation present for branches.
?? 4289 | tested | matrix | Automated verification present for branches.
?? 4290 | tested | matrix | Authorization boundaries checked for branches.
?? 4291 | suggested | matrix | Future enhancement candidate for branches.
?? 4292 | done | matrix | Implementation present for delivery_zones.
?? 4293 | tested | matrix | Automated verification present for delivery_zones.
?? 4294 | tested | matrix | Authorization boundaries checked for delivery_zones.
?? 4295 | suggested | matrix | Future enhancement candidate for delivery_zones.
?? 4296 | done | matrix | Implementation present for categories.
?? 4297 | tested | matrix | Automated verification present for categories.
?? 4298 | tested | matrix | Authorization boundaries checked for categories.
?? 4299 | suggested | matrix | Future enhancement candidate for categories.
?? 4300 | done | matrix | Implementation present for tags.
?? 4301 | tested | matrix | Automated verification present for tags.
?? 4302 | tested | matrix | Authorization boundaries checked for tags.
?? 4303 | suggested | matrix | Future enhancement candidate for tags.
?? 4304 | done | matrix | Implementation present for products.
?? 4305 | tested | matrix | Automated verification present for products.
?? 4306 | tested | matrix | Authorization boundaries checked for products.
?? 4307 | suggested | matrix | Future enhancement candidate for products.
?? 4308 | done | matrix | Implementation present for sizes.
?? 4309 | tested | matrix | Automated verification present for sizes.
?? 4310 | tested | matrix | Authorization boundaries checked for sizes.
?? 4311 | suggested | matrix | Future enhancement candidate for sizes.
?? 4312 | done | matrix | Implementation present for addons.
?? 4313 | tested | matrix | Automated verification present for addons.
?? 4314 | tested | matrix | Authorization boundaries checked for addons.
?? 4315 | suggested | matrix | Future enhancement candidate for addons.
?? 4316 | done | matrix | Implementation present for media.
?? 4317 | tested | matrix | Automated verification present for media.
?? 4318 | tested | matrix | Authorization boundaries checked for media.
?? 4319 | suggested | matrix | Future enhancement candidate for media.
?? 4320 | done | matrix | Implementation present for cart.
?? 4321 | tested | matrix | Automated verification present for cart.
?? 4322 | tested | matrix | Authorization boundaries checked for cart.
?? 4323 | suggested | matrix | Future enhancement candidate for cart.
?? 4324 | done | matrix | Implementation present for checkout.
?? 4325 | tested | matrix | Automated verification present for checkout.
?? 4326 | tested | matrix | Authorization boundaries checked for checkout.
?? 4327 | suggested | matrix | Future enhancement candidate for checkout.
?? 4328 | done | matrix | Implementation present for coupons.
?? 4329 | tested | matrix | Automated verification present for coupons.
?? 4330 | tested | matrix | Authorization boundaries checked for coupons.
?? 4331 | suggested | matrix | Future enhancement candidate for coupons.
?? 4332 | done | matrix | Implementation present for wallet.
?? 4333 | tested | matrix | Automated verification present for wallet.
?? 4334 | tested | matrix | Authorization boundaries checked for wallet.
?? 4335 | suggested | matrix | Future enhancement candidate for wallet.
?? 4336 | done | matrix | Implementation present for gift_cards.
?? 4337 | tested | matrix | Automated verification present for gift_cards.
?? 4338 | tested | matrix | Authorization boundaries checked for gift_cards.
?? 4339 | suggested | matrix | Future enhancement candidate for gift_cards.
?? 4340 | done | matrix | Implementation present for orders.
?? 4341 | tested | matrix | Automated verification present for orders.
?? 4342 | tested | matrix | Authorization boundaries checked for orders.
?? 4343 | suggested | matrix | Future enhancement candidate for orders.
?? 4344 | done | matrix | Implementation present for order_status.
?? 4345 | tested | matrix | Automated verification present for order_status.
?? 4346 | tested | matrix | Authorization boundaries checked for order_status.
?? 4347 | suggested | matrix | Future enhancement candidate for order_status.
?? 4348 | done | matrix | Implementation present for reviews.
?? 4349 | tested | matrix | Automated verification present for reviews.
?? 4350 | tested | matrix | Authorization boundaries checked for reviews.
?? 4351 | suggested | matrix | Future enhancement candidate for reviews.
?? 4352 | done | matrix | Implementation present for profiles.
?? 4353 | tested | matrix | Automated verification present for profiles.
?? 4354 | tested | matrix | Authorization boundaries checked for profiles.
?? 4355 | suggested | matrix | Future enhancement candidate for profiles.
?? 4356 | done | matrix | Implementation present for addresses.
?? 4357 | tested | matrix | Automated verification present for addresses.
?? 4358 | tested | matrix | Authorization boundaries checked for addresses.
?? 4359 | suggested | matrix | Future enhancement candidate for addresses.
?? 4360 | done | matrix | Implementation present for settings.
?? 4361 | tested | matrix | Automated verification present for settings.
?? 4362 | tested | matrix | Authorization boundaries checked for settings.
?? 4363 | suggested | matrix | Future enhancement candidate for settings.
?? 4364 | done | matrix | Implementation present for dynamic_pages.
?? 4365 | tested | matrix | Automated verification present for dynamic_pages.
?? 4366 | tested | matrix | Authorization boundaries checked for dynamic_pages.
?? 4367 | suggested | matrix | Future enhancement candidate for dynamic_pages.
?? 4368 | done | matrix | Implementation present for notifications.
?? 4369 | tested | matrix | Automated verification present for notifications.
?? 4370 | tested | matrix | Authorization boundaries checked for notifications.
?? 4371 | suggested | matrix | Future enhancement candidate for notifications.
?? 4372 | done | matrix | Implementation present for audit_logs.
?? 4373 | tested | matrix | Automated verification present for audit_logs.
?? 4374 | tested | matrix | Authorization boundaries checked for audit_logs.
?? 4375 | suggested | matrix | Future enhancement candidate for audit_logs.
?? 4376 | done | matrix | Implementation present for roles.
?? 4377 | tested | matrix | Automated verification present for roles.
?? 4378 | tested | matrix | Authorization boundaries checked for roles.
?? 4379 | suggested | matrix | Future enhancement candidate for roles.
?? 4380 | done | matrix | Implementation present for permissions.
?? 4381 | tested | matrix | Automated verification present for permissions.
?? 4382 | tested | matrix | Authorization boundaries checked for permissions.
?? 4383 | suggested | matrix | Future enhancement candidate for permissions.
?? 4384 | done | matrix | Implementation present for uploads.
?? 4385 | tested | matrix | Automated verification present for uploads.
?? 4386 | tested | matrix | Authorization boundaries checked for uploads.
?? 4387 | suggested | matrix | Future enhancement candidate for uploads.
?? 4388 | done | matrix | Implementation present for sanitization.
?? 4389 | tested | matrix | Automated verification present for sanitization.
?? 4390 | tested | matrix | Authorization boundaries checked for sanitization.
?? 4391 | suggested | matrix | Future enhancement candidate for sanitization.
?? 4392 | done | matrix | Implementation present for rate_limits.
?? 4393 | tested | matrix | Automated verification present for rate_limits.
?? 4394 | tested | matrix | Authorization boundaries checked for rate_limits.
?? 4395 | suggested | matrix | Future enhancement candidate for rate_limits.
?? 4396 | done | matrix | Implementation present for route_cache.
?? 4397 | tested | matrix | Automated verification present for route_cache.
?? 4398 | tested | matrix | Authorization boundaries checked for route_cache.
?? 4399 | suggested | matrix | Future enhancement candidate for route_cache.
?? 4400 | done | matrix | Implementation present for config_cache.
?? 4401 | tested | matrix | Automated verification present for config_cache.
?? 4402 | tested | matrix | Authorization boundaries checked for config_cache.
?? 4403 | suggested | matrix | Future enhancement candidate for config_cache.
?? 4404 | done | matrix | Implementation present for queue_worker.
?? 4405 | tested | matrix | Automated verification present for queue_worker.
?? 4406 | tested | matrix | Authorization boundaries checked for queue_worker.
?? 4407 | suggested | matrix | Future enhancement candidate for queue_worker.
?? 4408 | done | matrix | Implementation present for remote_deploy.
?? 4409 | tested | matrix | Automated verification present for remote_deploy.
?? 4410 | tested | matrix | Authorization boundaries checked for remote_deploy.
?? 4411 | suggested | matrix | Future enhancement candidate for remote_deploy.
?? 4412 | done | matrix | Implementation present for sqlite.
?? 4413 | tested | matrix | Automated verification present for sqlite.
?? 4414 | tested | matrix | Authorization boundaries checked for sqlite.
?? 4415 | suggested | matrix | Future enhancement candidate for sqlite.
?? 4416 | done | matrix | Implementation present for local_flow.
?? 4417 | tested | matrix | Automated verification present for local_flow.
?? 4418 | tested | matrix | Authorization boundaries checked for local_flow.
?? 4419 | suggested | matrix | Future enhancement candidate for local_flow.
?? 4420 | done | matrix | Implementation present for remote_flow.
?? 4421 | tested | matrix | Automated verification present for remote_flow.
?? 4422 | tested | matrix | Authorization boundaries checked for remote_flow.
?? 4423 | suggested | matrix | Future enhancement candidate for remote_flow.
