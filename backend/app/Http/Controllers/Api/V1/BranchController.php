<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\BranchResource;
use App\Models\Branch;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class BranchController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(
            BranchResource::collection(Branch::active()->with('deliveryZones')->orderBy('id')->get()),
            'Branches loaded.'
        );
    }

    public function show(Branch $branch): JsonResponse
    {
        abort_unless($branch->is_active, 404);

        return $this->successResponse(new BranchResource($branch->load('deliveryZones')), 'Branch loaded.');
    }

    public function zones(Branch $branch): JsonResponse
    {
        abort_unless($branch->is_active, 404);

        return $this->successResponse(
            $branch->deliveryZones()->active()->get()->map(fn ($zone) => [
                'id' => $zone->id,
                'name' => $zone->name,
                'delivery_fee' => (float) $zone->delivery_fee,
            ]),
            'Delivery zones loaded.'
        );
    }
}
