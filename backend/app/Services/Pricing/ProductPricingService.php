<?php

namespace App\Services\Pricing;

use App\Enums\SelectionType;
use App\Models\AddonOption;
use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

class ProductPricingService
{
    public function calculate(Product $product, ?ProductSize $size, Collection $addonOptions): array
    {
        $basePrice = $size?->price ?? $product->base_price;

        if ($basePrice === null) {
            throw ValidationException::withMessages([
                'product_size_id' => ['A valid size is required for this product.'],
            ]);
        }

        $groups = $product->addonGroups()->with('options')->where('is_active', true)->get();
        $groupedSelections = $addonOptions->groupBy('addon_group_id');
        $addonsTotal = 0.0;
        $snapshots = [];

        foreach ($groups as $group) {
            $selected = $groupedSelections->get($group->id, collect());
            $count = $selected->count();

            if ($group->is_required && $count < max(1, (int) $group->min_select)) {
                throw ValidationException::withMessages([
                    'addon_option_ids' => ["The group {$group->id} requires at least one option."],
                ]);
            }

            if ($group->selection_type === SelectionType::Single->value && $count > 1) {
                throw ValidationException::withMessages([
                    'addon_option_ids' => ["The group {$group->id} accepts only one option."],
                ]);
            }

            if ($group->max_select !== null && $count > $group->max_select) {
                throw ValidationException::withMessages([
                    'addon_option_ids' => ["The group {$group->id} exceeds the maximum number of selections."],
                ]);
            }

            foreach ($selected as $option) {
                $price = $this->resolveAddonPrice($option, $size);
                $addonsTotal += $price;
                $snapshots[] = [
                    'id' => $option->id,
                    'group_id' => $group->id,
                    'name' => $option->name,
                    'price' => round($price, 2),
                ];
            }
        }

        $unitPrice = round((float) $basePrice + $addonsTotal, 2);

        return [
            'base_price' => round((float) $basePrice, 2),
            'addons_total' => round($addonsTotal, 2),
            'unit_price' => $unitPrice,
            'addon_snapshots' => $snapshots,
        ];
    }

    public function resolveAddonPrice(AddonOption $option, ?ProductSize $size): float
    {
        $overrides = $option->size_price_overrides ?? [];

        if ($size && array_key_exists((string) $size->id, $overrides)) {
            return round((float) $overrides[$size->id], 2);
        }

        return round((float) $option->base_price, 2);
    }
}
