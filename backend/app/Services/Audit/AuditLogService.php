<?php

namespace App\Services\Audit;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AuditLogService
{
    /**
     * @param  array<string, mixed>  $metadata
     */
    public function record(?User $actor, string $action, ?Model $target = null, array $metadata = [], ?Request $request = null): AuditLog
    {
        if ($request) {
            $metadata = array_merge([
                'request' => array_filter([
                    'ip' => $request->ip(),
                    'method' => $request->method(),
                    'path' => $request->path(),
                    'user_agent' => $request->userAgent(),
                ]),
            ], $metadata);
        }

        $payload = [
            'actor_id' => $actor?->id,
            'action' => $action,
            'metadata' => $metadata,
        ];

        if ($target) {
            $payload['target_type'] = $target->getMorphClass();
            $payload['target_id'] = $target->getKey();
        }

        return AuditLog::query()->create($payload);
    }
}
