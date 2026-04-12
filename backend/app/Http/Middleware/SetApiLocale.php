<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetApiLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = strtolower((string) $request->header('Accept-Language', config('app.locale', 'ar')));
        $locale = in_array($locale, ['ar', 'en'], true) ? $locale : config('app.locale', 'ar');

        App::setLocale($locale);

        return $next($request);
    }
}
