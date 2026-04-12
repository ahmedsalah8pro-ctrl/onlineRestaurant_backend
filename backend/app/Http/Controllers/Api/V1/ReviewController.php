<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Review\StoreReviewRequest;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Models\Product;
use App\Models\Review;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    use ApiResponse;

    public function store(StoreReviewRequest $request): JsonResponse
    {
        $user = $request->user();
        $eligible = $user->orders()
            ->where('status', 'delivered')
            ->whereHas('items', fn ($query) => $query->where('product_id', $request->integer('product_id')))
            ->exists();

        if (! $eligible) {
            return $this->errorResponse('You can review only products you have purchased and received.', 422);
        }

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $request->integer('product_id'),
            'order_item_id' => $request->validated('order_item_id'),
            'rating' => $request->integer('rating'),
            'comment' => $request->filled('comment') ? strip_tags($request->string('comment')) : null,
            'is_anonymous' => $request->boolean('is_anonymous'),
        ]);

        return $this->successResponse(new ReviewResource($review->load('user')), 'Review created.', 201);
    }

    public function productReviews(Product $product): JsonResponse
    {
        $reviews = $product->reviews()->visible()->with('user')->latest()->paginate(15);

        return $this->paginatedResponse($reviews, ReviewResource::collection($reviews));
    }
}
