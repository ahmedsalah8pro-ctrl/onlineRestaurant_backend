<?php

namespace App\Support;

class Translatable
{
    public static function get(array|string|null $value, ?string $locale = null, ?string $fallback = null): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $locale ??= app()->getLocale();
        $fallback ??= config('app.fallback_locale', 'en');

        return $value[$locale]
            ?? $value[$fallback]
            ?? collect($value)->filter()->first()
            ?? null;
    }
}
