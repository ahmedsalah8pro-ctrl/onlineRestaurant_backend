from __future__ import annotations

import argparse
import base64
import json
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import Any

import requests


class FlowError(RuntimeError):
    pass


class FlowClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")

    def request(
        self,
        method: str,
        path: str,
        *,
        token: str | None = None,
        json_body: dict[str, Any] | None = None,
        files: dict[str, Any] | None = None,
        expected_status: int = 200,
    ) -> dict[str, Any]:
        headers = {"Accept": "application/json"}

        if token:
            headers["Authorization"] = f"Bearer {token}"

        response = requests.request(
            method=method,
            url=f"{self.base_url}{path}",
            headers=headers,
            json=json_body if files is None else None,
            files=files,
            timeout=30,
        )

        if response.status_code != expected_status:
            raise FlowError(
                f"{method} {path} expected {expected_status}, got {response.status_code}: {response.text}"
            )

        try:
            payload = response.json()
        except json.JSONDecodeError as exc:
            raise FlowError(f"{method} {path} returned non-JSON payload: {response.text}") from exc

        return payload


def assert_true(condition: bool, message: str) -> None:
    if not condition:
        raise FlowError(message)


def login(client: FlowClient, identity: str, password: str, device_name: str) -> tuple[str, dict[str, Any]]:
    payload = client.request(
        "POST",
        "/api/v1/auth/login",
        json_body={
            "email_or_username": identity,
            "password": password,
            "device_name": device_name,
        },
        expected_status=200,
    )
    token = payload["data"]["token"]
    return token, payload["data"]["user"]


def maybe_spawn_server(args: argparse.Namespace) -> subprocess.Popen[str] | None:
    if not args.spawn_server:
        return None

    command = [args.php, "artisan", "serve", "--host=127.0.0.1", "--port=8000"]
    return subprocess.Popen(
        command,
        cwd=args.backend_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        text=True,
    )


def wait_for_server(base_url: str) -> None:
    for _ in range(30):
        try:
            response = requests.get(f"{base_url}/api/v1/settings/public", timeout=5)
            if response.ok:
                return
        except requests.RequestException:
            time.sleep(1)
    raise FlowError("Server did not become ready in time.")


def write_temp_png() -> Path:
    one_px_png = base64.b64decode(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl8pVwAAAAASUVORK5CYII="
    )
    temp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    temp.write(one_px_png)
    temp.close()
    return Path(temp.name)


def run_flow(args: argparse.Namespace) -> None:
    client = FlowClient(args.base_url)

    unauth = client.request("GET", "/api/v1/profile", expected_status=401)
    assert_true(unauth["success"] is False, "Unauthenticated profile request should fail.")

    public_settings = client.request("GET", "/api/v1/settings/public")
    assert_true("general" in public_settings["data"], "Public settings payload is incomplete.")

    branches = client.request("GET", "/api/v1/branches")
    categories = client.request("GET", "/api/v1/categories")
    products = client.request("GET", "/api/v1/products")
    best_sellers = client.request("GET", "/api/v1/products/best-sellers")
    page = client.request("GET", "/api/v1/pages/terms-of-service")

    assert_true(len(branches["data"]) >= 1, "No public branches returned.")
    assert_true(len(categories["data"]) >= 1, "No public categories returned.")
    assert_true(len(products["data"]) >= 1, "No public products returned.")
    assert_true(len(best_sellers["data"]) >= 1, "No best sellers returned.")
    assert_true(page["data"]["slug"] == "terms-of-service", "Public dynamic page lookup failed.")

    public_branch_id = branches["data"][0]["id"]
    public_zone_id = branches["data"][0]["delivery_zones"][0]["id"]
    public_branch = client.request("GET", f"/api/v1/branches/{public_branch_id}")
    public_zones = client.request("GET", f"/api/v1/branches/{public_branch_id}/zones")
    assert_true(public_branch["data"]["id"] == public_branch_id, "Public branch detail lookup failed.")
    assert_true(len(public_zones["data"]) >= 1, "Public branch zones lookup failed.")

    unique_suffix = int(time.time())
    register = client.request(
        "POST",
        "/api/v1/auth/register",
        json_body={
            "name": "Flow User",
            "username": f"flowuser{unique_suffix}",
            "email": f"flow.user.{unique_suffix}@example.com",
            "primary_phone": f"0119{unique_suffix % 10000000:07d}",
            "password": "Password1!",
            "password_confirmation": "Password1!",
            "device_name": "python-flow",
        },
        expected_status=201,
    )
    customer_token = register["data"]["token"]
    customer_user = register["data"]["user"]
    customer_username = customer_user["username"]

    me = client.request("GET", "/api/v1/auth/me", token=customer_token)
    assert_true(me["data"]["username"] == customer_username, "Auth me payload mismatch.")

    profile_update = client.request(
        "PATCH",
        "/api/v1/profile",
        token=customer_token,
        json_body={
            "bio": "<script>xss()</script>python flow bio",
            "is_public_profile": True,
            "show_total_orders": True,
            "show_total_spent": True,
            "show_monthly_rank": True,
            "show_yearly_rank": True,
            "show_favorite_products": True,
        },
    )
    assert_true(
        profile_update["data"]["profile"]["is_public_profile"] is True,
        "Profile privacy update did not persist.",
    )

    privacy_update = client.request(
        "PATCH",
        "/api/v1/profile/privacy",
        token=customer_token,
        json_body={
            "is_public_profile": True,
            "show_total_orders": False,
            "show_total_spent": True,
            "show_monthly_rank": False,
            "show_yearly_rank": True,
            "show_favorite_products": True,
        },
    )
    assert_true(
        privacy_update["data"]["show_total_orders"] is False,
        "Dedicated profile privacy endpoint did not persist values.",
    )

    address = client.request(
        "POST",
        "/api/v1/addresses",
        token=customer_token,
        json_body={
            "label": "<b>home</b>",
            "recipient_name": "<script>alert(1)</script>Flow User",
            "phone": customer_user["primary_phone"],
            "city": "Cairo",
            "area": "Nasr City",
            "street": "<i>Main</i> Street",
            "notes": "<script>hack()</script>ring once",
            "is_default": True,
        },
        expected_status=201,
    )
    address_id = address["data"]["id"]
    assert_true(address["data"]["notes"] == "hack()ring once", "Address sanitization failed.")

    addresses = client.request("GET", "/api/v1/addresses", token=customer_token)
    assert_true(len(addresses["data"]) >= 1, "Addresses list is empty after creation.")

    updated_address = client.request(
        "PATCH",
        f"/api/v1/addresses/{address_id}",
        token=customer_token,
        json_body={
            "city": "Giza",
            "area": "Dokki",
            "street": "<u>Updated</u> Street",
        },
    )
    assert_true(updated_address["data"]["street"] == "Updated Street", "Address update sanitization failed.")

    extra_address = client.request(
        "POST",
        "/api/v1/addresses",
        token=customer_token,
        json_body={
            "label": "office",
            "recipient_name": "Flow User",
            "phone": f"0122{unique_suffix % 10000000:07d}",
            "city": "Cairo",
            "area": "Heliopolis",
            "street": "Office Street",
            "is_default": False,
        },
        expected_status=201,
    )
    extra_address_id = extra_address["data"]["id"]
    client.request("PATCH", f"/api/v1/addresses/{extra_address_id}/default", token=customer_token)

    public_profile = client.request("GET", f"/api/v1/profiles/{customer_username}")
    assert_true(public_profile["data"]["username"] == customer_username, "Public profile lookup failed.")
    private_profile = client.request("GET", "/api/v1/profile", token=customer_token)
    assert_true(private_profile["data"]["user"]["username"] == customer_username, "Private profile lookup failed.")

    product_id = products["data"][0]["id"]
    product_detail = client.request("GET", f"/api/v1/products/{product_id}")
    product_reviews = client.request("GET", f"/api/v1/products/{product_id}/reviews")
    size_id = next(size["id"] for size in product_detail["data"]["sizes"] if size["code"] == "medium")
    branch_id = branches["data"][0]["id"]
    zone_id = branches["data"][0]["delivery_zones"][0]["id"]
    assert_true(product_reviews["meta"]["total"] >= 1, "Seeded product reviews should exist.")

    cart_item = client.request(
        "POST",
        "/api/v1/cart/items",
        token=customer_token,
        json_body={
            "product_id": product_id,
            "product_size_id": size_id,
            "quantity": 1,
            "branch_id": branch_id,
        },
        expected_status=201,
    )
    assert_true(cart_item["data"]["items"][0]["quantity"] == 1, "Cart insertion failed.")

    cart_state = client.request("GET", "/api/v1/cart", token=customer_token)
    cart_item_id = cart_state["data"]["items"][0]["id"]
    assert_true(cart_state["data"]["items"][0]["quantity"] == 1, "Cart show failed.")

    cart_updated = client.request(
        "PATCH",
        f"/api/v1/cart/items/{cart_item_id}",
        token=customer_token,
        json_body={"quantity": 2},
    )
    assert_true(cart_updated["data"]["items"][0]["quantity"] == 2, "Cart update failed.")

    preview = client.request(
        "POST",
        "/api/v1/cart/preview-coupon",
        token=customer_token,
        json_body={"coupon_code": "SAVE10", "delivery_fee": 25},
    )
    assert_true(preview["data"]["valid"] is True, "Coupon preview should be valid.")

    checkout = client.request(
        "POST",
        "/api/v1/orders/checkout",
        token=customer_token,
        json_body={
            "branch_id": branch_id,
            "delivery_zone_id": zone_id,
            "address_id": address_id,
            "notes": "<script>ord()</script>fast please",
            "coupon_code": "SAVE10",
            "payment_method": "cash_on_delivery",
        },
        expected_status=201,
    )
    order_id = checkout["data"]["id"]
    assert_true(checkout["data"]["notes"] == "ord()fast please", "Checkout notes sanitization failed.")

    orders_index = client.request("GET", "/api/v1/orders", token=customer_token)
    assert_true(orders_index["meta"]["total"] >= 1, "Orders index should contain the new order.")

    notifications = client.request("GET", "/api/v1/notifications", token=customer_token)
    unread = client.request("GET", "/api/v1/notifications/unread-count", token=customer_token)
    assert_true(unread["data"]["unread_count"] >= 1, "Customer notification unread count did not increase.")
    notification_id = notifications["data"][0]["id"]
    assert_true(notifications["data"][0]["event"] == "order.created.customer", "Unexpected customer notification event.")

    client.request(
        "PATCH",
        f"/api/v1/orders/{order_id}/notes",
        token=customer_token,
        json_body={"notes": "<script>update()</script>leave at reception"},
    )
    order_show = client.request("GET", f"/api/v1/orders/{order_id}", token=customer_token)
    assert_true(order_show["data"]["notes"] == "update()leave at reception", "Order note sanitization failed.")

    client.request("PATCH", f"/api/v1/notifications/{notification_id}/read", token=customer_token)
    client.request("POST", "/api/v1/notifications/read-all", token=customer_token)

    admin_token, _ = login(client, "superadmin", "Password1!", "python-flow-admin")

    customer_forbidden_admin = client.request(
        "GET",
        "/api/v1/admin/settings",
        token=customer_token,
        expected_status=403,
    )
    assert_true(customer_forbidden_admin["success"] is False, "Customer should not access admin settings.")

    admin_branches = client.request("GET", "/api/v1/admin/branches", token=admin_token)
    admin_categories = client.request("GET", "/api/v1/admin/categories", token=admin_token)
    admin_tags = client.request("GET", "/api/v1/admin/tags", token=admin_token)
    assert_true(len(admin_branches["data"]) >= 1, "Admin branches list is empty.")
    assert_true(len(admin_categories["data"]) >= 1, "Admin categories list is empty.")
    assert_true(len(admin_tags["data"]) >= 1, "Admin tags list is empty.")

    branch_create = client.request(
        "POST",
        "/api/v1/admin/branches",
        token=admin_token,
        json_body={
            "name": {"ar": "فرع التدفق", "en": "Flow Branch"},
            "slug": f"flow-branch-{unique_suffix}",
            "phone": f"022{unique_suffix % 10000000:07d}",
            "email": f"flow.branch.{unique_suffix}@example.com",
            "address": "Flow District, Cairo",
            "is_active": True,
        },
        expected_status=201,
    )
    created_branch_id = branch_create["data"]["id"]
    client.request("GET", f"/api/v1/admin/branches/{created_branch_id}", token=admin_token)
    branch_update = client.request(
        "PATCH",
        f"/api/v1/admin/branches/{created_branch_id}",
        token=admin_token,
        json_body={"phone": "0220000000"},
    )
    assert_true(branch_update["data"]["phone"] == "0220000000", "Admin branch update failed.")

    flow_gift_code = f"FLOWGIFT{unique_suffix}"
    client.request(
        "POST",
        "/api/v1/admin/gift-cards",
        token=admin_token,
        json_body={
            "code": flow_gift_code,
            "amount": 75,
            "currency_code": "EGP",
            "is_active": True,
        },
        expected_status=201,
    )
    gift_cards = client.request("GET", "/api/v1/admin/gift-cards", token=admin_token)
    created_gift_card_id = next(card["id"] for card in gift_cards["data"] if card["code"] == flow_gift_code)
    client.request("GET", f"/api/v1/admin/gift-cards/{created_gift_card_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/gift-cards/{created_gift_card_id}",
        token=admin_token,
        json_body={"amount": 90},
    )

    category_create = client.request(
        "POST",
        "/api/v1/admin/categories",
        token=admin_token,
        json_body={
            "name": {"ar": "قسم التدفق", "en": "Flow Category"},
            "slug": f"flow-category-{unique_suffix}",
            "description": {"ar": "وصف", "en": "Description"},
            "is_active": True,
        },
        expected_status=201,
    )
    created_category_id = category_create["data"]["id"]
    client.request("GET", f"/api/v1/admin/categories/{created_category_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/categories/{created_category_id}",
        token=admin_token,
        json_body={"description": {"ar": "وصف محدث", "en": "Updated description"}},
    )

    tag_create = client.request(
        "POST",
        "/api/v1/admin/tags",
        token=admin_token,
        json_body={
            "name": {"ar": "وسم التدفق", "en": "Flow Tag"},
            "slug": f"flow-tag-{unique_suffix}",
            "is_active": True,
        },
        expected_status=201,
    )
    created_tag_id = tag_create["data"]["id"]
    client.request("GET", f"/api/v1/admin/tags/{created_tag_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/tags/{created_tag_id}",
        token=admin_token,
        json_body={"name": {"ar": "وسم معدل", "en": "Updated Tag"}},
    )

    zone_create = client.request(
        "POST",
        "/api/v1/admin/delivery-zones",
        token=admin_token,
        json_body={
            "branch_id": created_branch_id,
            "name": {"ar": "منطقة التدفق", "en": "Flow Zone"},
            "code": f"FLOWZONE{unique_suffix}",
            "delivery_fee": 40,
            "min_delivery_time_minutes": 20,
            "max_delivery_time_minutes": 45,
            "is_active": True,
        },
        expected_status=201,
    )
    created_zone_id = zone_create["data"]["id"]
    client.request("GET", f"/api/v1/admin/delivery-zones/{created_zone_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/delivery-zones/{created_zone_id}",
        token=admin_token,
        json_body={"delivery_fee": 42},
    )

    coupon_code = f"FLOWSAVE{unique_suffix}"
    coupon_create = client.request(
        "POST",
        "/api/v1/admin/coupons",
        token=admin_token,
        json_body={
            "code": coupon_code,
            "type": "fixed",
            "value": 25,
            "applies_to": "products",
            "is_active": True,
        },
        expected_status=201,
    )
    created_coupon_id = coupon_create["data"]["id"]
    coupons_index = client.request("GET", "/api/v1/admin/coupons", token=admin_token)
    assert_true(len(coupons_index["data"]) >= 1, "Admin coupons list is empty.")
    client.request("GET", f"/api/v1/admin/coupons/{created_coupon_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/coupons/{created_coupon_id}",
        token=admin_token,
        json_body={"value": 30},
    )

    page_create = client.request(
        "POST",
        "/api/v1/admin/pages",
        token=admin_token,
        json_body={
            "slug": f"flow-page-{unique_suffix}",
            "title": {"ar": "صفحة التدفق", "en": "Flow Page"},
            "content": {"ar": "محتوى", "en": "Content"},
            "is_active": True,
        },
        expected_status=201,
    )
    created_page_id = page_create["data"]["id"]
    client.request("GET", "/api/v1/admin/pages", token=admin_token)
    client.request("GET", f"/api/v1/admin/pages/{created_page_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/pages/{created_page_id}",
        token=admin_token,
        json_body={"content": {"ar": "محتوى محدث", "en": "Updated content"}},
    )

    role_create = client.request(
        "POST",
        "/api/v1/admin/roles",
        token=admin_token,
        json_body={"name": f"flow-role-{unique_suffix}", "permissions": ["orders.view"]},
        expected_status=201,
    )
    created_role_id = role_create["data"]["id"]
    client.request(
        "PATCH",
        f"/api/v1/admin/roles/{created_role_id}",
        token=admin_token,
        json_body={"permissions": ["orders.view", "reviews.view"]},
    )

    updated_settings = client.request(
        "PATCH",
        "/api/v1/admin/settings/general",
        token=admin_token,
        json_body={"values": {"site_name": f"Flow Restaurant {unique_suffix}"}},
    )
    assert_true(
        updated_settings["data"]["site_name"] == f"Flow Restaurant {unique_suffix}",
        "Settings update failed.",
    )

    product_create = client.request(
        "POST",
        "/api/v1/admin/products",
        token=admin_token,
        json_body={
            "name": {"ar": "منتج التدفق", "en": "Flow Product"},
            "slug": f"flow-product-{unique_suffix}",
            "description": {"ar": "وصف المنتج", "en": "Product description"},
            "base_price": 155,
            "is_active": True,
            "category_ids": [created_category_id],
            "tag_ids": [created_tag_id],
            "branch_ids": [created_branch_id],
            "media": [
                {
                    "media_type": "image",
                    "disk": "uploads",
                    "path": "flows/demo-image.png",
                    "title": {"ar": "صورة", "en": "Image"},
                    "is_primary": True,
                },
                {
                    "media_type": "external_video",
                    "external_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "title": {"ar": "فيديو", "en": "Video"},
                },
            ],
            "sizes": [
                {
                    "code": "medium",
                    "name": {"ar": "وسط", "en": "Medium"},
                    "price": 155,
                    "is_default": True,
                }
            ],
        },
        expected_status=201,
    )
    created_product_id = product_create["data"]["id"]
    client.request("GET", "/api/v1/admin/products", token=admin_token)
    client.request("GET", f"/api/v1/admin/products/{created_product_id}", token=admin_token)
    client.request(
        "PATCH",
        f"/api/v1/admin/products/{created_product_id}",
        token=admin_token,
        json_body={"base_price": 165},
    )

    client.request("POST", "/api/v1/wallet/redeem", token=customer_token, json_body={"code": flow_gift_code})
    wallet = client.request("GET", "/api/v1/wallet", token=customer_token)
    wallet_transactions = client.request("GET", "/api/v1/wallet/transactions", token=customer_token)
    assert_true(wallet["data"]["balance"] >= 75, "Gift card redemption did not increase wallet balance.")
    assert_true(wallet_transactions["meta"]["total"] >= 1, "Wallet transactions list is empty.")

    admin_orders = client.request("GET", "/api/v1/admin/orders", token=admin_token)
    assert_true(admin_orders["meta"]["total"] >= 1, "Admin orders list is empty.")
    client.request("GET", f"/api/v1/admin/orders/{order_id}", token=admin_token)

    client.request(
        "PATCH",
        f"/api/v1/admin/orders/{order_id}/delivery",
        token=admin_token,
        json_body={
            "delivery_person_name": "Flow Driver",
            "delivery_person_phone": "01000000999",
        },
    )
    client.request(
        "PATCH",
        f"/api/v1/admin/orders/{order_id}/status",
        token=admin_token,
        json_body={"status": "preparing", "notes": "Kitchen accepted order"},
    )
    client.request(
        "PATCH",
        f"/api/v1/admin/orders/{order_id}/status",
        token=admin_token,
        json_body={"status": "delivered", "notes": "Delivered successfully"},
    )

    admin_notifications = client.request("GET", "/api/v1/notifications/unread-count", token=admin_token)
    assert_true(admin_notifications["data"]["unread_count"] >= 1, "Admin should receive new order notification.")

    roles = client.request("GET", "/api/v1/admin/roles", token=admin_token)
    settings = client.request("GET", "/api/v1/admin/settings", token=admin_token)
    audit_logs = client.request("GET", "/api/v1/admin/audit-logs", token=admin_token)
    assert_true(len(roles["data"]["roles"]) >= 1, "Roles endpoint returned no roles.")
    assert_true(len(settings["data"]) >= 1, "Settings endpoint returned no settings.")
    assert_true(audit_logs["meta"]["total"] >= 1, "Audit logs endpoint returned no entries.")

    temp_png = write_temp_png()
    try:
        with temp_png.open("rb") as handle:
            upload = client.request(
                "POST",
                "/api/v1/admin/uploads",
                token=admin_token,
                files={
                    "file": ("pixel.png", handle, "image/png"),
                    "directory": (None, "flows"),
                },
                expected_status=201,
            )
        assert_true(upload["data"]["scan_status"] == "clean", "Upload scan status mismatch.")
    finally:
        temp_png.unlink(missing_ok=True)

    admin_review = client.request(
        "POST",
        "/api/v1/reviews",
        token=customer_token,
        json_body={
            "product_id": product_id,
            "rating": 5,
            "comment": "<script>review()</script>excellent after delivery",
            "is_anonymous": True,
        },
        expected_status=201,
    )
    assert_true(
        admin_review["data"]["comment"] == "review()excellent after delivery",
        "Review sanitization failed.",
    )
    review_id = admin_review["data"]["id"]

    reviews_index = client.request("GET", "/api/v1/admin/reviews", token=admin_token)
    assert_true(reviews_index["meta"]["total"] >= 1, "Admin reviews list is empty.")
    moderated_review = client.request(
        "PATCH",
        f"/api/v1/admin/reviews/{review_id}",
        token=admin_token,
        json_body={"is_visible": False, "comment": "Moderated by flow"},
    )
    assert_true(moderated_review["data"]["comment"] == "Moderated by flow", "Admin review moderation failed.")

    branch_manager_token, _ = login(client, "branchmanager", "Password1!", "python-flow-branch-manager")
    branch_manager_orders = client.request("GET", "/api/v1/admin/orders", token=branch_manager_token)
    assert_true(branch_manager_orders["meta"]["total"] >= 1, "Branch manager cannot see assigned orders.")

    forbidden_settings = client.request(
        "PATCH",
        "/api/v1/admin/settings/features",
        token=branch_manager_token,
        json_body={"values": {"gift_cards_enabled": False}},
        expected_status=403,
    )
    assert_true(forbidden_settings["success"] is False, "Branch manager settings mutation should fail.")

    client.request("DELETE", f"/api/v1/admin/reviews/{review_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/products/{created_product_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/roles/{created_role_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/pages/{created_page_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/coupons/{created_coupon_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/delivery-zones/{created_zone_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/tags/{created_tag_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/categories/{created_category_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/gift-cards/{created_gift_card_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/admin/branches/{created_branch_id}", token=admin_token)
    client.request("DELETE", f"/api/v1/addresses/{extra_address_id}", token=customer_token)

    logout_all = client.request("POST", "/api/v1/auth/logout-all", token=admin_token)
    assert_true(logout_all["success"] is True, "Admin logout-all failed.")

    logout = client.request("POST", "/api/v1/auth/logout", token=customer_token)
    assert_true(logout["success"] is True, "Customer logout failed.")

    print("FULL_API_FLOW_OK")
    print(f"customer_username={customer_username}")
    print(f"order_id={order_id}")
    print(f"audit_total={audit_logs['meta']['total']}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="HTTP flow runner for the restaurant backend.")
    parser.add_argument("--base-url", default="http://127.0.0.1:8000")
    parser.add_argument("--backend-dir", default=str(Path(__file__).resolve().parents[2]))
    parser.add_argument("--spawn-server", action="store_true")
    parser.add_argument("--php", default="php")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    server = maybe_spawn_server(args)

    try:
        if server:
            wait_for_server(args.base_url)

        run_flow(args)
        return 0
    except Exception as exc:
        print(f"FLOW_FAILED: {exc}", file=sys.stderr)
        return 1
    finally:
        if server and server.poll() is None:
            server.terminate()
            try:
                server.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    raise SystemExit(main())
