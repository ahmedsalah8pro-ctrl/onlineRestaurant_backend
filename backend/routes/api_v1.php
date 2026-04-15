<?php

use App\Http\Controllers\Api\V1\AddressController;
use App\Http\Controllers\Api\V1\Admin\AuditLogController as AdminAuditLogController;
use App\Http\Controllers\Api\V1\Admin\BranchController as AdminBranchController;
use App\Http\Controllers\Api\V1\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\V1\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Api\V1\Admin\DeliveryZoneController as AdminDeliveryZoneController;
use App\Http\Controllers\Api\V1\Admin\DynamicPageController as AdminDynamicPageController;
use App\Http\Controllers\Api\V1\Admin\GiftCardController as AdminGiftCardController;
use App\Http\Controllers\Api\V1\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\V1\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\V1\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Api\V1\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Api\V1\Admin\SettingsController as AdminSettingsController;
use App\Http\Controllers\Api\V1\Admin\TagController as AdminTagController;
use App\Http\Controllers\Api\V1\Admin\UploadController as AdminUploadController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BranchController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\DynamicPageController;
use App\Http\Controllers\Api\V1\HealthController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\PublicSettingsController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\WalletController;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\DynamicPage;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:10,1');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:15,1');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('logout-all', [AuthController::class, 'logoutAll']);
    });
});

Route::get('settings/public', [PublicSettingsController::class, 'show']);
Route::get('health', [HealthController::class, 'show']);
Route::get('pages/{slug}', [DynamicPageController::class, 'show']);
Route::get('profiles/{username}', [ProfileController::class, 'publicShow']);

Route::get('branches', [BranchController::class, 'index']);
Route::get('branches/{branch}', [BranchController::class, 'show']);
Route::get('branches/{branch}/zones', [BranchController::class, 'zones']);

Route::get('categories', [CategoryController::class, 'index']);

Route::get('products', [ProductController::class, 'index']);
Route::get('products/best-sellers', [ProductController::class, 'bestSellers']);
Route::get('products/{product}', [ProductController::class, 'show']);
Route::get('products/{product}/reviews', [ReviewController::class, 'productReviews']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('profile', [ProfileController::class, 'show']);
    Route::patch('profile', [ProfileController::class, 'update']);
    Route::patch('profile/privacy', [ProfileController::class, 'updatePrivacy']);

    Route::get('addresses', [AddressController::class, 'index']);
    Route::post('addresses', [AddressController::class, 'store']);
    Route::patch('addresses/{address}', [AddressController::class, 'update'])->middleware('can:update,address');
    Route::delete('addresses/{address}', [AddressController::class, 'destroy'])->middleware('can:delete,address');
    Route::patch('addresses/{address}/default', [AddressController::class, 'setDefault'])->middleware('can:update,address');

    Route::get('cart', [CartController::class, 'show']);
    Route::post('cart/items', [CartController::class, 'store']);
    Route::patch('cart/items/{item}', [CartController::class, 'update']);
    Route::delete('cart/items/{item}', [CartController::class, 'destroy']);
    Route::delete('cart', [CartController::class, 'clear']);
    Route::post('cart/preview-coupon', [CartController::class, 'previewCoupon']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders/checkout', [OrderController::class, 'checkout']);
    Route::get('orders/{order}', [OrderController::class, 'show'])->middleware('can:view,order');
    Route::patch('orders/{order}/notes', [OrderController::class, 'updateNotes'])->middleware('can:update,order');
    Route::post('orders/{order}/cancel', [OrderController::class, 'cancel'])->middleware('can:update,order');

    Route::post('reviews', [ReviewController::class, 'store']);

    Route::get('notifications', [NotificationController::class, 'index']);
    Route::get('notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('notifications/{notification}/read', [NotificationController::class, 'markRead']);
    Route::post('notifications/read-all', [NotificationController::class, 'markAllRead']);

    Route::get('wallet', [WalletController::class, 'show']);
    Route::get('wallet/transactions', [WalletController::class, 'transactions']);
    Route::post('wallet/redeem', [WalletController::class, 'redeem'])->middleware('throttle:10,1');
});

Route::prefix('admin')
    ->middleware(['auth:sanctum'])
    ->group(function (): void {
        Route::get('branches', [AdminBranchController::class, 'index'])->middleware('can:viewAny,'.Branch::class);
        Route::post('branches', [AdminBranchController::class, 'store'])->middleware('can:create,'.Branch::class);
        Route::get('branches/{branch}', [AdminBranchController::class, 'show'])->middleware('can:view,branch');
        Route::patch('branches/{branch}', [AdminBranchController::class, 'update'])->middleware('can:update,branch');
        Route::delete('branches/{branch}', [AdminBranchController::class, 'destroy'])->middleware('can:delete,branch');

        Route::get('categories', [AdminCategoryController::class, 'index'])->middleware('can:viewAny,'.Category::class);
        Route::post('categories', [AdminCategoryController::class, 'store'])->middleware('can:create,'.Category::class);
        Route::get('categories/{category}', [AdminCategoryController::class, 'show'])->middleware('can:view,category');
        Route::patch('categories/{category}', [AdminCategoryController::class, 'update'])->middleware('can:update,category');
        Route::delete('categories/{category}', [AdminCategoryController::class, 'destroy'])->middleware('can:delete,category');

        Route::get('delivery-zones', [AdminDeliveryZoneController::class, 'index'])->middleware('permission:delivery-zones.view');
        Route::post('delivery-zones', [AdminDeliveryZoneController::class, 'store'])->middleware('permission:delivery-zones.create');
        Route::get('delivery-zones/{deliveryZone}', [AdminDeliveryZoneController::class, 'show'])->middleware('permission:delivery-zones.view');
        Route::patch('delivery-zones/{deliveryZone}', [AdminDeliveryZoneController::class, 'update'])->middleware('permission:delivery-zones.update');
        Route::delete('delivery-zones/{deliveryZone}', [AdminDeliveryZoneController::class, 'destroy'])->middleware('permission:delivery-zones.delete');

        Route::get('products', [AdminProductController::class, 'index'])->middleware('can:viewAny,'.Product::class);
        Route::post('products', [AdminProductController::class, 'store'])->middleware('can:create,'.Product::class);
        Route::get('products/{product}', [AdminProductController::class, 'show'])->middleware('can:view,product');
        Route::patch('products/{product}', [AdminProductController::class, 'update'])->middleware('can:update,product');
        Route::delete('products/{product}', [AdminProductController::class, 'destroy'])->middleware('can:delete,product');

        Route::get('tags', [AdminTagController::class, 'index'])->middleware('permission:tags.view');
        Route::post('tags', [AdminTagController::class, 'store'])->middleware('permission:tags.create');
        Route::get('tags/{tag}', [AdminTagController::class, 'show'])->middleware('permission:tags.view');
        Route::patch('tags/{tag}', [AdminTagController::class, 'update'])->middleware('permission:tags.update');
        Route::delete('tags/{tag}', [AdminTagController::class, 'destroy'])->middleware('permission:tags.delete');

        Route::post('uploads', [AdminUploadController::class, 'store'])->middleware('permission:uploads.create');

        Route::get('coupons', [AdminCouponController::class, 'index'])->middleware('can:viewAny,'.Coupon::class);
        Route::post('coupons', [AdminCouponController::class, 'store'])->middleware('can:create,'.Coupon::class);
        Route::get('coupons/{coupon}', [AdminCouponController::class, 'show'])->middleware('can:view,coupon');
        Route::patch('coupons/{coupon}', [AdminCouponController::class, 'update'])->middleware('can:update,coupon');
        Route::delete('coupons/{coupon}', [AdminCouponController::class, 'destroy'])->middleware('can:delete,coupon');

        Route::get('gift-cards', [AdminGiftCardController::class, 'index'])->middleware('permission:gift-cards.view');
        Route::post('gift-cards', [AdminGiftCardController::class, 'store'])->middleware('permission:gift-cards.create');
        Route::get('gift-cards/{giftCard}', [AdminGiftCardController::class, 'show'])->middleware('permission:gift-cards.view');
        Route::patch('gift-cards/{giftCard}', [AdminGiftCardController::class, 'update'])->middleware('permission:gift-cards.update');
        Route::delete('gift-cards/{giftCard}', [AdminGiftCardController::class, 'destroy'])->middleware('permission:gift-cards.delete');

        Route::get('orders', [AdminOrderController::class, 'index'])->middleware('permission:orders.view|orders.manage|orders.manage.assigned-branches');
        Route::get('orders/{order}', [AdminOrderController::class, 'show'])->middleware('can:viewAdmin,order');
        Route::patch('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->middleware('can:manage,order');
        Route::patch('orders/{order}/delivery', [AdminOrderController::class, 'assignDelivery'])->middleware('can:manage,order');

        Route::get('reviews', [AdminReviewController::class, 'index'])->middleware('can:viewAny,'.Review::class);
        Route::patch('reviews/{review}', [AdminReviewController::class, 'update'])->middleware('can:update,review');
        Route::delete('reviews/{review}', [AdminReviewController::class, 'destroy'])->middleware('can:delete,review');

        Route::get('audit-logs', [AdminAuditLogController::class, 'index'])->middleware('permission:audit-logs.view');

        Route::get('settings', [AdminSettingsController::class, 'index'])->middleware('permission:settings.view');
        Route::get('settings/schema', [AdminSettingsController::class, 'schema'])->middleware('permission:settings.view');
        Route::get('settings/export', [AdminSettingsController::class, 'export'])->middleware('permission:settings.view');
        Route::post('settings/import', [AdminSettingsController::class, 'import'])->middleware('permission:settings.update');
        Route::get('settings/{group}', [AdminSettingsController::class, 'show'])->middleware('permission:settings.view');
        Route::post('settings/{group}/reset', [AdminSettingsController::class, 'reset'])->middleware('permission:settings.update');
        Route::patch('settings/{group}', [AdminSettingsController::class, 'update'])->middleware('permission:settings.update');

        Route::get('pages', [AdminDynamicPageController::class, 'index'])->middleware('can:viewAny,'.DynamicPage::class);
        Route::post('pages', [AdminDynamicPageController::class, 'store'])->middleware('can:create,'.DynamicPage::class);
        Route::get('pages/{page}', [AdminDynamicPageController::class, 'show'])->middleware('can:view,page');
        Route::patch('pages/{page}', [AdminDynamicPageController::class, 'update'])->middleware('can:update,page');
        Route::delete('pages/{page}', [AdminDynamicPageController::class, 'destroy'])->middleware('can:delete,page');

        Route::get('roles', [AdminRoleController::class, 'index'])->middleware('permission:roles.view');
        Route::post('roles', [AdminRoleController::class, 'store'])->middleware('permission:roles.create');
        Route::patch('roles/{role}', [AdminRoleController::class, 'update'])->middleware('permission:roles.update');
        Route::delete('roles/{role}', [AdminRoleController::class, 'destroy'])->middleware('permission:roles.delete');
    });
