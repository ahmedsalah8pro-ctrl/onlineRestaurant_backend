<?php

$allowedOrigins = array_values(array_filter(array_map(
    static fn (string $origin): string => trim($origin),
    explode(',', (string) env(
        'CORS_ALLOWED_ORIGINS',
        implode(',', array_filter([
            env('FRONTEND_URL'),
            'http://localhost:4200',
            'http://127.0.0.1:4200',
            'http://localhost:8000',
            'http://127.0.0.1:8000',
        ])),
    )),
)));

return [
    'paths' => ['api/*', 'v1/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $allowedOrigins,
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [
        'X-Request-Id',
        'X-Api-Version',
        'X-App-Locale',
    ],
    'max_age' => 0,
    'supports_credentials' => false,
];
