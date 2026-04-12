<?php

namespace Database\Seeders;

use App\Enums\CouponAppliesTo;
use App\Enums\CouponType;
use App\Enums\OrderStatus;
use App\Models\AddonGroup;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\DeliveryZone;
use App\Models\DynamicPage;
use App\Models\GiftCard;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Review;
use App\Models\Setting;
use App\Models\Tag;
use App\Models\User;
use App\Models\UserAddress;
use App\Services\Wallet\WalletService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function __construct(protected WalletService $walletService)
    {
    }

    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'branches.view',
            'branches.create',
            'branches.update',
            'branches.delete',
            'categories.view',
            'categories.create',
            'categories.update',
            'categories.delete',
            'delivery-zones.view',
            'delivery-zones.create',
            'delivery-zones.update',
            'delivery-zones.delete',
            'products.view',
            'products.create',
            'products.update',
            'products.delete',
            'tags.view',
            'tags.create',
            'tags.update',
            'tags.delete',
            'coupons.view',
            'coupons.create',
            'coupons.update',
            'coupons.delete',
            'orders.view',
            'orders.manage',
            'orders.manage.assigned-branches',
            'reviews.view',
            'reviews.update',
            'reviews.delete',
            'audit-logs.view',
            'settings.view',
            'settings.update',
            'dynamic-pages.view',
            'dynamic-pages.create',
            'dynamic-pages.update',
            'dynamic-pages.delete',
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'gift-cards.view',
            'gift-cards.create',
            'gift-cards.update',
            'gift-cards.delete',
            'uploads.create',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'sanctum');
        }

        $superAdminRole = Role::findOrCreate('super-admin', 'sanctum');
        $superAdminRole->syncPermissions(Permission::all());

        $branchManagerRole = Role::findOrCreate('branch-manager', 'sanctum');
        $branchManagerRole->syncPermissions([
            'orders.manage.assigned-branches',
            'reviews.view',
        ]);

        $supportRole = Role::findOrCreate('support', 'sanctum');
        $supportRole->syncPermissions([
            'orders.view',
            'reviews.view',
        ]);

        $admin = User::query()->create([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'email' => 'admin@example.com',
            'primary_phone' => '01000000001',
            'password' => Hash::make('Password1!'),
            'is_active' => true,
        ]);
        $admin->assignRole($superAdminRole);

        $branchManager = User::factory()->create([
            'name' => 'Branch Manager',
            'username' => 'branchmanager',
            'email' => 'branch.manager@example.com',
            'primary_phone' => '01000000002',
            'password' => Hash::make('Password1!'),
        ]);
        $branchManager->assignRole($branchManagerRole);

        $customer = User::factory()->create([
            'name' => 'Demo Customer',
            'username' => 'democustomer',
            'email' => 'customer@example.com',
            'primary_phone' => '01000000003',
            'password' => Hash::make('Password1!'),
        ]);

        $branch = Branch::factory()->create([
            'name' => ['ar' => 'فرع القاهرة', 'en' => 'Cairo Branch'],
            'slug' => 'cairo-branch',
            'phone' => '0223456789',
            'address' => 'Nasr City, Cairo, Egypt',
        ]);
        $branch->managers()->sync([$branchManager->id]);

        $secondaryBranch = Branch::factory()->create([
            'name' => ['ar' => 'فرع الجيزة', 'en' => 'Giza Branch'],
            'slug' => 'giza-branch',
            'phone' => '0234567890',
            'address' => 'Dokki, Giza, Egypt',
        ]);

        $cairoZone = DeliveryZone::factory()->create([
            'branch_id' => $branch->id,
            'name' => ['ar' => 'مدينة نصر', 'en' => 'Nasr City'],
            'code' => 'NASR-CITY',
            'delivery_fee' => 25,
            'min_delivery_time_minutes' => 35,
            'max_delivery_time_minutes' => 55,
        ]);

        DeliveryZone::factory()->create([
            'branch_id' => $secondaryBranch->id,
            'name' => ['ar' => 'الدقي', 'en' => 'Dokki'],
            'code' => 'DOKKI',
            'delivery_fee' => 30,
            'min_delivery_time_minutes' => 30,
            'max_delivery_time_minutes' => 50,
        ]);

        $offersCategory = Category::factory()->create([
            'name' => ['ar' => 'العروض', 'en' => 'Offers'],
            'slug' => 'offers',
        ]);
        $pizzaCategory = Category::factory()->create([
            'name' => ['ar' => 'البيتزا', 'en' => 'Pizza'],
            'slug' => 'pizza',
        ]);

        $tag = Tag::create([
            'name' => ['ar' => 'الأكثر طلبًا', 'en' => 'Best Seller'],
            'slug' => 'best-seller',
            'is_active' => true,
        ]);

        $product = Product::factory()->create([
            'name' => ['ar' => 'بيتزا حكايه', 'en' => 'Hekaya Pizza'],
            'slug' => 'hekaya-pizza',
            'base_price' => 120,
            'is_available_in_all_branches' => false,
            'is_best_seller_pinned' => true,
            'best_seller_rank' => 1,
        ]);
        $product->categories()->sync([$offersCategory->id, $pizzaCategory->id]);
        $product->tags()->sync([$tag->id]);
        $product->branches()->sync([
            $branch->id => ['is_active' => true, 'custom_stock_quantity' => 20],
            $secondaryBranch->id => ['is_active' => true, 'custom_stock_quantity' => 10],
        ]);

        $smallSize = ProductSize::create([
            'product_id' => $product->id,
            'code' => 'small',
            'name' => ['ar' => 'صغير', 'en' => 'Small'],
            'price' => 120,
            'is_default' => false,
            'sort_order' => 1,
            'is_active' => true,
        ]);
        $mediumSize = ProductSize::create([
            'product_id' => $product->id,
            'code' => 'medium',
            'name' => ['ar' => 'وسط', 'en' => 'Medium'],
            'price' => 170,
            'is_default' => true,
            'sort_order' => 2,
            'is_active' => true,
        ]);
        $largeSize = ProductSize::create([
            'product_id' => $product->id,
            'code' => 'large',
            'name' => ['ar' => 'كبير', 'en' => 'Large'],
            'price' => 220,
            'is_default' => false,
            'sort_order' => 3,
            'is_active' => true,
        ]);

        $stuffedCrust = AddonGroup::create([
            'product_id' => $product->id,
            'name' => ['ar' => 'حشو الأطراف', 'en' => 'Stuffed Crust'],
            'selection_type' => 'single',
            'min_select' => 0,
            'max_select' => 1,
            'is_required' => false,
            'sort_order' => 1,
            'is_active' => true,
        ]);
        $stuffedCrust->options()->createMany([
            [
                'name' => ['ar' => 'جبنة', 'en' => 'Cheese'],
                'base_price' => 25,
                'size_price_overrides' => [
                    (string) $smallSize->id => 20,
                    (string) $mediumSize->id => 25,
                    (string) $largeSize->id => 30,
                ],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'سوسيس', 'en' => 'Sausage'],
                'base_price' => 30,
                'size_price_overrides' => [
                    (string) $smallSize->id => 25,
                    (string) $mediumSize->id => 30,
                    (string) $largeSize->id => 35,
                ],
                'sort_order' => 2,
                'is_active' => true,
            ],
        ]);

        $extras = AddonGroup::create([
            'product_id' => $product->id,
            'name' => ['ar' => 'إضافات', 'en' => 'Extras'],
            'selection_type' => 'multiple',
            'min_select' => 0,
            'max_select' => 3,
            'is_required' => false,
            'sort_order' => 2,
            'is_active' => true,
        ]);
        $extras->options()->createMany([
            [
                'name' => ['ar' => 'جبنة موتزاريلا', 'en' => 'Mozzarella'],
                'base_price' => 15,
                'size_price_overrides' => [],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'جبنة رومي', 'en' => 'Roumy Cheese'],
                'base_price' => 18,
                'size_price_overrides' => [],
                'sort_order' => 2,
                'is_active' => true,
            ],
        ]);

        Coupon::factory()->create([
            'code' => 'SAVE10',
            'type' => CouponType::Percentage->value,
            'value' => 10,
            'max_discount_amount' => 60,
            'min_cart_value' => 100,
            'applies_to' => CouponAppliesTo::Products->value,
            'conditions' => [
                'allowed_category_ids' => [$pizzaCategory->id],
            ],
        ]);

        Coupon::factory()->create([
            'code' => 'FREEDEL',
            'type' => CouponType::Fixed->value,
            'value' => 100,
            'max_discount_amount' => null,
            'min_cart_value' => null,
            'applies_to' => CouponAppliesTo::Delivery->value,
            'usage_limit_total' => null,
            'usage_limit_per_user' => null,
            'conditions' => [],
        ]);

        GiftCard::create([
            'code' => 'GIFT100',
            'amount' => 100,
            'currency_code' => 'EGP',
            'is_active' => true,
            'expires_at' => now()->addMonths(2),
        ]);

        DynamicPage::create([
            'slug' => 'terms-of-service',
            'title' => ['ar' => 'الشروط والأحكام', 'en' => 'Terms of Service'],
            'content' => [
                'ar' => 'هذه صفحة تجريبية للشروط والأحكام.',
                'en' => 'This is a demo Terms of Service page.',
            ],
            'is_active' => true,
        ]);

        $settings = [
            'general' => [
                'site_name' => 'مطعم أونلاين',
                'support_phone' => '+20-100-000-0000',
                'logo_path' => 'branding/logo.png',
            ],
            'currency' => [
                'code' => 'EGP',
                'symbol' => 'ج.م',
            ],
            'features' => [
                'gift_cards_enabled' => true,
                'social_login_enabled' => false,
                'email_notifications_enabled' => false,
                'broadcast_notifications_enabled' => false,
            ],
            'theme' => [
                'theme_json' => [
                    'version' => 1,
                    'tokens' => [
                        'primary' => '#B22222',
                        'secondary' => '#111827',
                    ],
                ],
            ],
        ];

        foreach ($settings as $group => $pairs) {
            foreach ($pairs as $key => $value) {
                Setting::updateOrCreate(
                    ['group' => $group, 'key' => $key],
                    ['value' => $value, 'value_type' => get_debug_type($value)]
                );
            }
        }

        $address = UserAddress::factory()->create([
            'user_id' => $customer->id,
            'recipient_name' => 'Demo Customer',
            'phone' => $customer->primary_phone,
            'city' => 'Cairo',
            'area' => 'Nasr City',
            'street' => 'Makram Ebeid',
            'is_default' => true,
        ]);

        $this->walletService->credit($customer, 250, notes: 'Seeder initial wallet balance.');

        $order = Order::create([
            'user_id' => $customer->id,
            'branch_id' => $branch->id,
            'delivery_zone_id' => $cairoZone->id,
            'address_id' => $address->id,
            'status' => OrderStatus::Delivered->value,
            'currency_code' => 'EGP',
            'subtotal' => 170,
            'addons_total' => 0,
            'delivery_fee' => 25,
            'discount_total' => 0,
            'wallet_amount' => 0,
            'total' => 195,
            'coupon_code' => null,
            'coupon_snapshot' => null,
            'notes' => 'Seeded delivered order.',
            'grace_period_ends_at' => now()->subHour(),
            'placed_at' => now()->subDays(2),
            'delivery_person_name' => 'Ahmed Driver',
            'delivery_person_phone' => '01000000099',
        ]);

        $orderItem = $order->items()->create([
            'product_id' => $product->id,
            'product_size_id' => $mediumSize->id,
            'product_snapshot' => [
                'name' => $product->name,
                'slug' => $product->slug,
                'size' => $mediumSize->name,
            ],
            'selected_addons' => [],
            'unit_price' => 170,
            'quantity' => 1,
            'line_subtotal' => 170,
        ]);

        $order->statusLogs()->createMany([
            [
                'from_status' => null,
                'to_status' => OrderStatus::Pending->value,
                'actor_id' => $customer->id,
                'notes' => 'Order created.',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'from_status' => OrderStatus::Pending->value,
                'to_status' => OrderStatus::Preparing->value,
                'actor_id' => $branchManager->id,
                'notes' => 'Kitchen started preparing the order.',
                'created_at' => now()->subDays(2)->addMinutes(12),
                'updated_at' => now()->subDays(2)->addMinutes(12),
            ],
            [
                'from_status' => OrderStatus::Preparing->value,
                'to_status' => OrderStatus::Delivered->value,
                'actor_id' => $branchManager->id,
                'notes' => 'Order delivered successfully.',
                'created_at' => now()->subDays(2)->addHour(),
                'updated_at' => now()->subDays(2)->addHour(),
            ],
        ]);

        Review::create([
            'user_id' => $customer->id,
            'product_id' => $product->id,
            'order_item_id' => $orderItem->id,
            'rating' => 5,
            'comment' => 'Excellent seeded review.',
            'is_anonymous' => false,
            'is_visible' => true,
            'is_admin_generated' => false,
        ]);
    }
}
