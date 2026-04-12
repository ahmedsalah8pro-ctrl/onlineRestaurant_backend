<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

abstract class Controller
{
    protected function authUser(?Request $request = null): User
    {
        $user = ($request ?? request())->user();

        if (! $user instanceof User) {
            throw new AuthenticationException();
        }

        return $user;
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    protected function sanitizeStrings(array $payload): array
    {
        return collect($payload)
            ->map(function (mixed $value): mixed {
                if (is_array($value)) {
                    /** @var array<string, mixed> $value */
                    return $this->sanitizeStrings($value);
                }

                return is_string($value) ? trim(strip_tags($value)) : $value;
            })
            ->toArray();
    }
}
