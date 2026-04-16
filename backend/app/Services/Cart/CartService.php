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

    public function getOrCreate(?User $user, ?string $sessionId = null): Cart
    {
        if ($user) {
            return $user->loadMissing('wallet')->cart()->firstOrCreate();
        }
        
        if (!$sessionId) {
            throw ValidationException::withMessages(['session_id' => 'Guest cart requires a session ID.']);
        }

        return Cart::firstOrCreate(['session_id' => $sessionId, 'user_id' => null]);
    }

    public function addItem(?User $user, ?string $sessionId, array $payload): Cart
    {
        return DB::transaction(function () use ($user, $sessionId, $payload) {
            $cart = $this->getOrCreate($user, $sessionId);
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

    public function updateItem(?User $user, ?string $sessionId, int $itemId, array $payload): Cart
    {
        $cart = $this->getOrCreate($user, $sessionId);
        $item = $cart->items()->with(['product.sizes', 'product.addonGroups.options'])->findOrFail($itemId);

        $size = array_key_exists('product_size_id', $payload)
            ? ($payload['product_size_id']
                ? ProductSize::where('product_id', $item->product_id)->findOrFail($payload['product_size_id'])
                : null)
            : $item->productSize;

        $addonOptionIds = array_key_exists('addon_option_ids', $payload)
            ? ($payload['addon_option_ids'] ?? [])
            : ($item->selected_addon_option_ids ?? []);
        $addonOptions = AddonOption::whereIn('id', $addonOptionIds)->get();
        $priceData = $this->pricingService->calculate($item->product, $size, $addonOptions);

        $item->update([
            'product_size_id' => $size?->id,
            'quantity' => max(1, (int) $payload['quantity']),
            'price_snapshot' => $priceData['unit_price'],
            'selected_addon_option_ids' => $addonOptions->pluck('id')->values()->all(),
            'selected_addons_snapshot' => $priceData['addon_snapshots'],
            'configuration_hash' => $this->configurationHash($item->product_id, $size?->id, $addonOptions),
        ]);

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function removeItem(?User $user, ?string $sessionId, int $itemId): Cart
    {
        $cart = $this->getOrCreate($user, $sessionId);
        $cart->items()->findOrFail($itemId)->delete();

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function clear(?User $user, ?string $sessionId = null): void
    {
        if ($user) {
            $user->cart?->items()->delete();
        } elseif ($sessionId) {
            Cart::where('session_id', $sessionId)->whereNull('user_id')->first()?->items()->delete();
        }
    }

    public function setBranch(?User $user, ?string $sessionId, int $branchId): Cart
    {
        $cart = $this->getOrCreate($user, $sessionId);
        $cart->update(['branch_id' => $branchId]);

        return $cart->fresh(['items.product.categories', 'items.productSize']);
    }

    public function mergeGuestCart(User $user, string $sessionId): void
    {
        $guestCart = Cart::with(['items.product.addonGroups.options'])->where('session_id', $sessionId)->whereNull('user_id')->first();
        if (!$guestCart || $guestCart->items->isEmpty()) {
            return;
        }

        $userCart = $this->getOrCreate($user);

        foreach ($guestCart->items as $item) {
            $existing = $userCart->items()->where('configuration_hash', $item->configuration_hash)->first();

            if ($existing) {
                $existing->increment('quantity', $item->quantity);
            } else {
                $newItem = $item->replicate(['cart_id']);
                $newItem->cart_id = $userCart->id;
                $newItem->save();
            }
        }

        $guestCart->delete();
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
