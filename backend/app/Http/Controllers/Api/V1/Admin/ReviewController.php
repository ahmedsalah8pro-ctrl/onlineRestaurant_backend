<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Models\Review;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $reviews = Review::with(['user', 'product'])->latest()->paginate(20);

        return $this->paginatedResponse($reviews, ReviewResource::collection($reviews));
    }

    public function update(Request $request, Review $review): JsonResponse
    {
        $review->update($request->validate([
            'is_visible' => ['sometimes', 'boolean'],
            'comment' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ]));

        return $this->successResponse(new ReviewResource($review->fresh()->load('user')), 'Review updated.');
    }

    public function destroy(Review $review): JsonResponse
    {
        $review->delete();

        return $this->successResponse(null, 'Review deleted.');
    }
}
