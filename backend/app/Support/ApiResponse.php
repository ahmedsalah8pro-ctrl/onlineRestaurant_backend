<?php

namespace App\Support;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * @param  array<string, mixed>  $meta
     */
    protected function successResponse(mixed $data = null, string $message = null, int $status = 200, array $meta = []): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message ?: __('OK'),
            'data' => $data,
            'meta' => $meta,
        ], $status);
    }

    /**
     * @param  LengthAwarePaginator<int, mixed>  $paginator
     * @param  array<string, mixed>  $meta
     */
    protected function paginatedResponse(LengthAwarePaginator $paginator, mixed $data, string $message = null, array $meta = []): JsonResponse
    {
        return $this->successResponse($data, $message ?: __('OK'), 200, array_merge([
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
        ], $meta));
    }

    /**
     * @param  array<string, mixed>  $errors
     */
    protected function errorResponse(string $message = null, int $status = 422, array $errors = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message ?: __('Error occurred'),
            'errors' => $errors,
        ], $status);
    }
}
