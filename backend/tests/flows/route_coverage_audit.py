from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def normalize_path(path: str) -> str:
    path = re.sub(r"\{\$[^}]+\}", "{param}", path)
    path = re.sub(r"\{[A-Za-z0-9_]+\}", "{param}", path)
    path = re.sub(r"/\d+(?=/|$)", "/{param}", path)
    path = re.sub(r"/[A-Za-z0-9._-]+@example\.com(?=/|$)", "/{param}", path)
    path = re.sub(r"/democustomer(?=/|$)", "/{param}", path)
    path = re.sub(r"/terms-of-service(?=/|$)", "/{param}", path)
    path = re.sub(r"/general(?=/|$)", "/{param}", path)
    path = re.sub(r"/features(?=/|$)", "/{param}", path)
    path = re.sub(r"\?.*$", "", path)

    return path


def collect_coverage() -> set[tuple[str, str]]:
    coverage: set[tuple[str, str]] = set()

    for file in (ROOT / "tests").rglob("*.php"):
        text = file.read_text(encoding="utf-8")
        patterns = {
            "GET": r"->getJson\((?:f)?['\"](/api/v1[^'\"]+)['\"]",
            "POST": r"->postJson\((?:f)?['\"](/api/v1[^'\"]+)['\"]",
            "PATCH": r"->patchJson\((?:f)?['\"](/api/v1[^'\"]+)['\"]",
            "DELETE": r"->deleteJson\((?:f)?['\"](/api/v1[^'\"]+)['\"]",
        }

        for method, pattern in patterns.items():
            for match in re.finditer(pattern, text):
                coverage.add((method, normalize_path(match.group(1))))

    for file in (ROOT / "tests").rglob("*.py"):
        text = file.read_text(encoding="utf-8")
        for match in re.finditer(
            r'client\.request\(\s*"(GET|POST|PATCH|DELETE)"\s*,\s*(?:f)?"(/api/v1[^"]+)"',
            text,
        ):
            coverage.add((match.group(1), normalize_path(match.group(2))))

    return coverage


def load_routes(php: str) -> list[dict[str, str]]:
    process = subprocess.run(
        [php, "artisan", "route:list", "--path=api/v1", "--json"],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=True,
    )

    return json.loads(process.stdout)


def main() -> int:
    php = sys.argv[1] if len(sys.argv) > 1 else "php"
    coverage = collect_coverage()
    routes = load_routes(php)
    missing: list[tuple[str, str]] = []

    for route in routes:
        uri = "/" + route["uri"].lstrip("/")
        normalized_uri = normalize_path(uri)

        for method in (m for m in route["method"].split("|") if m != "HEAD"):
            if (method, normalized_uri) not in coverage:
                missing.append((method, uri))

    if missing:
        print("ROUTE_COVERAGE_AUDIT_FAILED")
        for method, uri in missing:
            print(f"{method} {uri}")
        return 1

    print("ROUTE_COVERAGE_AUDIT_OK")
    print(f"covered_route_methods={len(coverage)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
