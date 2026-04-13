<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AttachApiMetadataHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->is('api/*')) {
            return $next($request);
        }

        $requestId = trim((string) $request->header('X-Request-Id'));
        $requestId = $requestId !== '' ? $requestId : (string) Str::uuid();

        $request->attributes->set('request_id', $requestId);

        $startedAt = microtime(true);
        $response = $next($request);

        $segments = explode('/', trim($request->path(), '/'));
        $apiVersion = $segments[1] ?? 'unknown';

        $response->headers->set('X-Request-Id', $requestId);
        $response->headers->set('X-API-Version', $apiVersion);
        $response->headers->set('X-Response-Time-Ms', (string) max(0, (int) round((microtime(true) - $startedAt) * 1000)));
        $response->headers->set('Content-Language', app()->getLocale());

        return $response;
    }
}
