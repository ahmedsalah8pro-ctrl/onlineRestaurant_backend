<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Support\ApiResponse;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    use ApiResponse;

    public function show(): JsonResponse
    {
        $checks = [
            'database' => $this->databaseCheck(),
            'cache' => [
                'status' => 'ok',
                'store' => $this->stringConfig('cache.default'),
            ],
            'queue' => [
                'status' => 'ok',
                'connection' => $this->stringConfig('queue.default'),
            ],
            'storage' => $this->storageCheck(),
        ];

        $isHealthy = collect($checks)->every(fn (array $check): bool => ($check['status'] ?? 'error') === 'ok');

        return $this->successResponse([
            'status' => $isHealthy ? 'ok' : 'degraded',
            'timestamp' => now()->toIso8601String(),
            'app' => [
                'name' => $this->stringConfig('app.name'),
                'env' => $this->stringConfig('app.env'),
                'url' => $this->stringConfig('app.url'),
                'laravel_version' => Application::VERSION,
                'php_version' => PHP_VERSION,
                'api_version' => 'v1',
                'locale' => app()->getLocale(),
            ],
            'checks' => $checks,
        ], $isHealthy ? 'Health check passed.' : 'Health check degraded.', $isHealthy ? 200 : 503);
    }

    /**
     * @return array<string, mixed>
     */
    protected function databaseCheck(): array
    {
        try {
            DB::connection()->getPdo();
            DB::select('SELECT 1');

            return [
                'status' => 'ok',
                'connection' => $this->stringConfig('database.default'),
            ];
        } catch (\Throwable $exception) {
            return [
                'status' => 'error',
                'connection' => $this->stringConfig('database.default'),
                'message' => config('app.debug')
                    ? $exception->getMessage()
                    : 'Database connection failed.',
            ];
        }
    }

    /**
     * @return array<string, mixed>
     */
    protected function storageCheck(): array
    {
        $disk = $this->stringConfig('filesystems.default');
        $root = $this->stringConfig("filesystems.disks.{$disk}.root", storage_path('app'));

        if (! is_dir($root)) {
            @mkdir($root, 0755, true);
        }

        $isWritable = is_dir($root) && is_writable($root);

        return [
            'status' => $isWritable ? 'ok' : 'error',
            'disk' => $disk,
            'root' => $root,
            'cdn_url' => $this->stringConfig("filesystems.disks.{$disk}.cdn_url"),
        ];
    }

    protected function stringConfig(string $key, string $default = ''): string
    {
        $value = config($key, $default);

        return is_scalar($value) ? (string) $value : $default;
    }
}
