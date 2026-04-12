<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Address\StoreAddressRequest;
use App\Http\Requests\Api\V1\Address\UpdateAddressRequest;
use App\Http\Resources\Api\V1\AddressResource;
use App\Models\UserAddress;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class AddressController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(AddressResource::collection($this->authUser()->addresses()->latest()->get()));
    }

    public function store(StoreAddressRequest $request): JsonResponse
    {
        $user = $this->authUser($request);

        if ($request->boolean('is_default')) {
            $user->addresses()->update(['is_default' => false]);
        }

        $address = $user->addresses()->create($this->sanitizeStrings($request->validated()));

        return $this->successResponse(new AddressResource($address), 'Address created.', 201);
    }

    public function update(UpdateAddressRequest $request, UserAddress $address): JsonResponse
    {
        $user = $this->authUser($request);

        abort_unless($address->user_id === $user->id, 403);

        if ($request->boolean('is_default')) {
            $user->addresses()->update(['is_default' => false]);
        }

        $address->update($this->sanitizeStrings($request->validated()));

        return $this->successResponse(new AddressResource($address->fresh() ?? $address), 'Address updated.');
    }

    public function destroy(UserAddress $address): JsonResponse
    {
        abort_unless($address->user_id === $this->authUser()->id, 403);

        $address->delete();

        return $this->successResponse(null, 'Address deleted.');
    }

    public function setDefault(UserAddress $address): JsonResponse
    {
        $user = $this->authUser();

        abort_unless($address->user_id === $user->id, 403);

        $user->addresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return $this->successResponse(new AddressResource($address->fresh() ?? $address), 'Default address updated.');
    }
}
