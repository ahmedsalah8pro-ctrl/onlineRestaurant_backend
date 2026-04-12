<?php

namespace App\Services\Cart;

use App\Models\AddonOption;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\User;
use App\Services\Pricing\ProductPricingService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CartService
{
    public function __construct(protected ProductPricingService $pricingService)
    {
    }

    public function getOrCreate(User $user): Cart
    {
        return $user->loadMissing('wallet')->cart()->firstOrCreate();
    }

    public function addItem(User $user, array $payload): Cart
    {
        return DB::transaction(function () use ($user, $payload) {
            $cart = $user->cart()->firstOrCreate();
            $product = Product::with(['sizes', 'addonGroups.options', 'categories', 'branches'])->findOrFail($payload['product_id']);
            $branchId = $payload['branch_id'] ?? $cart->branch_id;

            if ($branchId) {
                $isAvailable = $product->is_available_in_all_branches
                    || $product->branches->contains(fn ($branch) => $branch->id === (int) $branchId && (bool) $branch->pivot->is_active);

                if (! $isAvailable) {
                    throw ValidationException::withMessages([
                        'branch_id' => ['The selected product is not available in the requested branch.'],
                    ]);
                }
            }

            $size = isset($payload['product_size_id'])
                ? ProductSize::where('product_id', $product->id)->findOrFail($payload['product_size_id'])
                : null;

            $addonOptions = AddonOption::whereIn('id', $payload['addon_option_ids'] ?? [])->get();
            $priceData = $this->pricingService->calculate($product, $size, $addonOptions);
            $configurationHash = $this->configurationHash($product->id, $size?->id, $addonOptions);

            $existing = $cart->items()->where('configuration_hash', $configurationHash)->first();

            if ($existing) {
                $existing->increment('quantity', (int) $payload['quantity']);
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'product_size_id' => $size?->id,
                    'quantity' => (int) $payload['quantity'],
                    'price_snapshot' => $priceData['unit_price'],
                    'selected_addon_option_ids' => $addonOptions->pluck('id')->values()->all(),
                    'selected_addons_snapshot' => $priceData['addon_snapshots'],
                    'configuration_hash' => $configurationHash,
                ]);
            }

            if ($branchId) {
                $cart->update(['branch_id' => (int) $branchId]);
            }

            return $cart->fresh(['items.product.categories', 'items.productSize']);
        });
    }

    public function updateItem(User $user, int $itemId, array $payload): Cart
    {
        $cart = $user->cart()->firstOrFail();
        $item = $cart->items()->findOrFail($itemId);

        $item->update([
            'quantity' => max(1, (int) $payload['quantity']),
        ]);

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function removeItem(User $user, int $itemId): Cart
    {
        $cart = $user->cart()->firstOrFail();
        $cart->items()->findOrFail($itemId)->delete();

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function clear(User $user): void
    {
        $user->cart?->items()->delete();
    }

    public function setBranch(User $user, int $branchId): Cart
    {
        $cart = $user->cart()->firstOrCreate();
        $cart->update(['branch_id' => $branchId]);

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function ensureBranchAvailability(Cart $cart, int $branchId): void
    {
        $cart->loadMissing('items.product.branches');

        foreach ($cart->items as $item) {
            $product = $item->product;
            $isAvailable = $product->is_available_in_all_branches
                || $product->branches->contains(fn ($branch) => $branch->id === $branchId && (bool) $branch->pivot->is_active);

            if (! $isAvailable) {
                throw ValidationException::withMessages([
                    'branch_id' => ["Product {$product->id} is not available in the selected branch."],
                ]);
            }
        }
    }

    protected function configurationHash(int $productId, ?int $sizeId, Collection $addonOptions): string
    {
        return hash('sha256', implode('|', [
            $productId,
            $sizeId ?? 'no-size',
            $addonOptions->pluck('id')->sort()->implode(','),
        ]));
    }
}
