<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\Branch\StoreBranchRequest;
use App\Http\Requests\Api\V1\Admin\Branch\UpdateBranchRequest;
use App\Http\Resources\Api\V1\BranchResource;
use App\Models\Branch;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class BranchController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(BranchResource::collection(Branch::with('deliveryZones')->latest()->get()));
    }

    public function store(StoreBranchRequest $request): JsonResponse
    {
        $branch = Branch::create($request->validated());

        return $this->successResponse(new BranchResource($branch), 'Branch created.', 201);
    }

    public function show(Branch $branch): JsonResponse
    {
        return $this->successResponse(new BranchResource($branch->load('deliveryZones')), 'Branch loaded.');
    }

    public function update(UpdateBranchRequest $request, Branch $branch): JsonResponse
    {
        $branch->update($request->validated());

        return $this->successResponse(new BranchResource($branch->fresh()->load('deliveryZones')), 'Branch updated.');
    }

    public function destroy(Branch $branch): JsonResponse
    {
        $branch->delete();

        return $this->successResponse(null, 'Branch deleted.');
    }
}
