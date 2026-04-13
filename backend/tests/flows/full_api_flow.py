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
        extra_headers: dict[str, str] | None = None,
        expected_headers: dict[str, str | None] | None = None,
        expected_status: int = 200,
    ) -> dict[str, Any]:
        headers = {"Accept": "application/json"}

        if token:
            headers["Authorization"] = f"Bearer {token}"

        if extra_headers:
            headers.update(extra_headers)

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

        if expected_headers:
            for header_name, expected_value in expected_headers.items():
                actual_value = response.headers.get(header_name)
                if expected_value is None:
                    assert_true(actual_value is not None, f"{method} {path} missing expected header {header_name}.")
                else:
                    assert_true(
                        actual_value == expected_value,
                        f"{method} {path} expected header {header_name}={expected_value}, got {actual_value}.",
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

    health = client.request(
        "GET",
        "/api/v1/health",
        extra_headers={
            "Accept-Language": "en",
            "X-Request-Id": "flow-health-001",
        },
        expected_headers={
            "X-Request-Id": "flow-health-001",
            "X-API-Version": "v1",
            "Content-Language": "en",
            "X-Response-Time-Ms": None,
        },
    )
    assert_true(health["data"]["status"] == "ok", "Health endpoint reported a degraded state.")
    assert_true(health["data"]["app"]["api_version"] == "v1", "Health endpoint API version mismatch.")

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

    print("FULL_API_FLOW_OK")
    print(f"customer_username={customer_username}")
    print(f"order_id={order_id}")
    print("audit_total=partial-sync")


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
