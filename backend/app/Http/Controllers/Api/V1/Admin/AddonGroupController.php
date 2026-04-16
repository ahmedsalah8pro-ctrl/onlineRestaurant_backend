<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AddonGroupResource;
use App\Models\AddonGroup;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddonGroupController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->successResponse(AddonGroupResource::collection(AddonGroup::with('options')->latest()->get()));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'name' => ['required', 'array'],
            'selection_type' => ['required', 'string', 'in:single,multiple'],
            'min_select' => ['required', 'integer', 'min:0'],
            'max_select' => ['nullable', 'integer', 'min:1'],
            'is_required' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'options' => ['nullable', 'array'],
            'options.*.name' => ['required_with:options', 'array'],
            'options.*.base_price' => ['required_with:options', 'numeric', 'min:0'],
        ]);

        $group = DB::transaction(function () use ($data) {
            $group = AddonGroup::create(\Illuminate\Support\Arr::except($data, ['options']));
            
            if (!empty($data['options'])) {
                foreach ($data['options'] as $opt) {
                    $group->options()->create($opt);
                }
            }

            return $group;
        });

        return $this->successResponse(new AddonGroupResource($group->load('options')), 'Addon group created.', 201);
    }

    public function show(AddonGroup $addonGroup): JsonResponse
    {
        return $this->successResponse(new AddonGroupResource($addonGroup->load('options')), 'Addon group loaded.');
    }

    public function update(Request $request, AddonGroup $addonGroup): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'array'],
            'selection_type' => ['sometimes', 'string', 'in:single,multiple'],
            'min_select' => ['sometimes', 'integer', 'min:0'],
            'max_select' => ['nullable', 'integer', 'min:1'],
            'is_required' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'options' => ['nullable', 'array'],
            'options.*.id' => ['nullable', 'exists:addon_options,id'],
            'options.*.name' => ['required_with:options', 'array'],
            'options.*.base_price' => ['required_with:options', 'numeric', 'min:0'],
        ]);

        DB::transaction(function () use ($addonGroup, $data) {
            $addonGroup->update(\Illuminate\Support\Arr::except($data, ['options']));

            if (array_key_exists('options', $data)) {
                $optionIds = collect($data['options'])->pluck('id')->filter()->toArray();
                $addonGroup->options()->whereNotIn('id', $optionIds)->delete();

                foreach ($data['options'] as $opt) {
                    if (!empty($opt['id'])) {
                        $addonGroup->options()->where('id', $opt['id'])->update(\Illuminate\Support\Arr::except($opt, ['id']));
                    } else {
                        $addonGroup->options()->create($opt);
                    }
                }
            }
        });

        return $this->successResponse(new AddonGroupResource($addonGroup->fresh()->load('options')), 'Addon group updated.');
    }

    public function destroy(AddonGroup $addonGroup): JsonResponse
    {
        $addonGroup->delete();

        return $this->successResponse(null, 'Addon group deleted.');
    }
}
