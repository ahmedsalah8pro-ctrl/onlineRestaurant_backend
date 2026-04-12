<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\DeliveryZone\StoreDeliveryZoneRequest;
use App\Http\Requests\Api\V1\Admin\DeliveryZone\UpdateDeliveryZoneRequest;
use App\Http\Resources\Api\V1\DeliveryZoneResource;
use App\Models\DeliveryZone;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeliveryZoneController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = DeliveryZone::query()->with('branch')->latest();

        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->integer('branch_id'));
        }

        return $this->successResponse(DeliveryZoneResource::collection($query->get()), 'Delivery zones loaded.');
    }

    public function store(StoreDeliveryZoneRequest $request): JsonResponse
    {
        $zone = DeliveryZone::create($request->validated());

        return $this->successResponse(new DeliveryZoneResource($zone), 'Delivery zone created.', 201);
    }

    public function show(DeliveryZone $deliveryZone): JsonResponse
    {
        return $this->successResponse(new DeliveryZoneResource($deliveryZone), 'Delivery zone loaded.');
    }

    public function update(UpdateDeliveryZoneRequest $request, DeliveryZone $deliveryZone): JsonResponse
    {
        $deliveryZone->update($request->validated());

        return $this->successResponse(new DeliveryZoneResource($deliveryZone->fresh() ?? $deliveryZone), 'Delivery zone updated.');
    }

    public function destroy(DeliveryZone $deliveryZone): JsonResponse
    {
        $deliveryZone->delete();

        return $this->successResponse(null, 'Delivery zone deleted.');
    }
}
