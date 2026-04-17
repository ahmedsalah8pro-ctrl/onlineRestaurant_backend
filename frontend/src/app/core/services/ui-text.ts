import { Injectable, inject } from '@angular/core';
import { NotificationItem, WalletTransaction } from '../models/api.models';
import { ThemeService } from './theme';

type Locale = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class UiTextService {
  private readonly theme = inject(ThemeService);

  /** Expose locale as a signal so templates can subscribe for reactivity */
  readonly currentLocale = this.theme.locale;

  private readonly dictionary: Record<string, Record<Locale, string>> = {
    'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
    'currency.symbol': { ar: 'ج.م', en: 'EGP' },
    'nav.home': { ar: 'الرئيسية', en: 'Home' },
    'nav.menu': { ar: 'المنيو', en: 'Menu' },
    'nav.orders': { ar: 'الطلبات', en: 'Orders' },
    'nav.wallet': { ar: 'المحفظة', en: 'Wallet' },
    'nav.account': { ar: 'الحساب', en: 'Account' },
    'nav.login': { ar: 'تسجيل الدخول', en: 'Login' },
    'nav.logout': { ar: 'تسجيل الخروج', en: 'Logout' },
    'nav.cart': { ar: 'السلة', en: 'Cart' },
    'nav.admin': { ar: 'لوحة التحكم', en: 'Admin' },
    'nav.pages': { ar: 'الصفحات', en: 'Pages' },
    'nav.storefront': { ar: 'واجهة المتجر', en: 'Storefront' },
    'public.taglineFallback': { ar: 'طلبات مطاعم عربية جاهزة للويب والموبايل.', en: 'Restaurant ordering for web and mobile clients.' },
    'public.footerAbout': { ar: 'منصة طلبات قابلة لإعادة التخصيص لكل علامة تجارية مع دعم كامل للعربية والإنجليزية.', en: 'A white-label ordering platform with full Arabic and English support.' },
    'public.terms': { ar: 'الشروط والأحكام', en: 'Terms of Service' },
    'public.contactUs': { ar: 'اتصل بنا', en: 'Contact Us' },
    'public.allRights': { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' },
    'public.brandControl': { ar: 'تحكم العلامة التجارية', en: 'Brand Control' },
    'public.optional': { ar: 'اختياري', en: 'Optional' },
    'home.heroEyebrow': { ar: 'مطعم عربي احترافي أونلاين', en: 'Professional Arabic Restaurant Platform' },
    'home.primaryAction': { ar: 'تصفح المنيو', en: 'Browse Menu' },
    'home.secondaryAction': { ar: 'لوحة الإدارة', en: 'Admin Panel' },
    'home.capability.branches': { ar: 'فروع متعددة ومناطق توصيل منفصلة', en: 'Multi-branch menus and delivery zones' },
    'home.capability.variants': { ar: 'أحجام وإضافات وتسعير مرن', en: 'Variant pricing and add-on groups' },
    'home.capability.checkout': { ar: 'محفظة وكوبونات وكروت هدايا وشراء آمن', en: 'Wallet, coupons, gift cards, and secure checkout' },
    'home.capability.branding': { ar: 'تحكم كامل في الهوية البصرية من لوحة الإدارة', en: 'White-label branding from the admin panel' },
    'home.metrics.branches': { ar: 'الفروع', en: 'Branches' },
    'home.metrics.categories': { ar: 'الأقسام', en: 'Categories' },
    'home.metrics.bestSellers': { ar: 'الأكثر طلبًا', en: 'Most Ordered' },
    'home.metrics.reviews': { ar: 'التقييمات', en: 'Reviews' },
    'home.bestSellers': { ar: 'الأكثر طلبًا', en: 'Most Ordered' },
    'home.bestSellersTitle': { ar: 'ترشيحات يحبها العملاء', en: 'Customer Favorite Picks' },
    'home.fullMenu': { ar: 'عرض المنيو بالكامل', en: 'View Full Menu' },
    'home.branches': { ar: 'الفروع', en: 'Branches' },
    'home.branchActive': { ar: 'مفعل', en: 'Active' },
    'home.branchDisabled': { ar: 'غير مفعل', en: 'Disabled' },
    'menu.eyebrow': { ar: 'تصفح الأصناف', en: 'Browse Menu' },
    'menu.title': { ar: 'المنيو', en: 'Menu' },
    'menu.copy': { ar: 'ابحث وفلتر ورتب المنتجات حسب الفرع أو القسم أو السعر أو الأعلى تقييمًا.', en: 'Search, filter, and sort products by branch, category, price, or rating.' },
    'menu.chooseBranch': { ar: 'اختر الفرع أولاً', en: 'Choose Branch First' },
    'menu.chooseBranchCopy': { ar: 'اختر الفرع الذي تريد الطلب منه لعرض الأصناف المتاحة له فقط.', en: 'Select a branch first to load the available products.' },
    'menu.fastAdd': { ar: 'إضافة سريعة', en: 'Quick Add' },
    'menu.fullDetails': { ar: 'تفاصيل المنتج', en: 'Full Details' },
    'menu.userAccess': { ar: 'إدارة الوصول', en: 'User Access' },
    'menu.roles': { ar: 'الأدوار', en: 'Roles' },
    'menu.permissions': { ar: 'الصلاحيات', en: 'Permissions' },
    'menu.previewTitle': { ar: 'معاينة المنتج', en: 'Product Preview' },
    'menu.search': { ar: 'ابحث عن منتج أو صنف', en: 'Search products' },
    'menu.branch': { ar: 'الفرع', en: 'Branch' },
    'menu.category': { ar: 'القسم', en: 'Category' },
    'menu.sort': { ar: 'الترتيب', en: 'Sort' },
    'menu.apply': { ar: 'تطبيق', en: 'Apply' },
    'menu.total': { ar: 'إجمالي النتائج', en: 'Total Results' },
    'menu.page': { ar: 'الصفحة', en: 'Page' },
    'menu.prev': { ar: 'السابق', en: 'Previous' },
    'menu.next': { ar: 'التالي', en: 'Next' },
    'menu.details': { ar: 'تفاصيل المنتج', en: 'Product Details' },
    'menu.mostOrdered': { ar: 'الأكثر طلبًا', en: 'Most Ordered' },
    'menu.noDescription': { ar: 'وصف المنتج سيظهر هنا بعد استكمال بياناته من لوحة الإدارة.', en: 'Product description will appear here once configured.' },
    'share.title': { ar: 'مشاركة الرابط', en: 'Share Link' },
    'share.subtitle': { ar: 'انسخ الرابط أو أرسله عبر تطبيقات التواصل والحملات التسويقية.', en: 'Copy the link or send it through social and campaign channels.' },
    'share.link': { ar: 'رابط المشاركة', en: 'Share URL' },
    'share.copy': { ar: 'نسخ', en: 'Copy' },
    'share.whatsapp': { ar: 'واتساب', en: 'WhatsApp' },
    'share.facebook': { ar: 'فيسبوك', en: 'Facebook' },
    'share.telegram': { ar: 'تيليجرام', en: 'Telegram' },
    'share.x': { ar: 'إكس', en: 'X' },
    'share.system': { ar: 'مشاركة الجهاز', en: 'System Share' },
    'share.copied': { ar: 'تم نسخ الرابط بنجاح.', en: 'Share link copied successfully.' },
    'share.menu': { ar: 'مشاركة المنيو', en: 'Share Menu' },
    'share.product': { ar: 'مشاركة المنتج', en: 'Share Product' },
    'share.page': { ar: 'مشاركة الصفحة', en: 'Share Page' },
    'share.store': { ar: 'مشاركة المتجر', en: 'Share Store' },
    'auth.eyebrow': { ar: 'الوصول للحساب', en: 'Access' },
    'auth.title': { ar: 'تسجيل الدخول أو إنشاء حساب', en: 'Login or Register' },
    'auth.copy': { ar: 'استخدم نفس حسابك للوصول إلى الطلبات والمحفظة والمتابعة من أي جهاز.', en: 'Use the same account to access orders, wallet, and tracking from any device.' },
    'auth.login': { ar: 'دخول', en: 'Login' },
    'auth.register': { ar: 'إنشاء حساب', en: 'Register' },
    'auth.emailOrUsername': { ar: 'البريد أو اسم المستخدم', en: 'Email or Username' },
    'auth.password': { ar: 'كلمة المرور', en: 'Password' },
    'auth.confirmPassword': { ar: 'تأكيد كلمة المرور', en: 'Confirm Password' },
    'auth.demoAccounts': { ar: 'حسابات تجريبية', en: 'Demo Accounts' },
    'auth.use': { ar: 'استخدام', en: 'Use' },
    'auth.createAccount': { ar: 'إنشاء الحساب', en: 'Create Account' },
    'checkout.eyebrow': { ar: 'إتمام الطلب', en: 'Checkout' },
    'checkout.title': { ar: 'مراجعة الفرع والعنوان والدفع', en: 'Validate Branch, Address, and Payment' },
    'checkout.deliveryZone': { ar: 'منطقة التوصيل', en: 'Delivery Zone' },
    'checkout.address': { ar: 'العنوان', en: 'Address' },
    'checkout.notes': { ar: 'ملاحظات الطلب', en: 'Order notes' },
    'checkout.coupon': { ar: 'كوبون الخصم', en: 'Coupon code' },
    'checkout.preview': { ar: 'معاينة', en: 'Preview' },
    'checkout.placeOrder': { ar: 'تأكيد الطلب', en: 'Place Order' },
    'checkout.payment.cash': { ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },
    'checkout.payment.wallet': { ar: 'المحفظة', en: 'Wallet' },
    'checkout.payment.hybrid': { ar: 'المحفظة + عند الاستلام', en: 'Wallet + COD' },
    'checkout.quickAddress': { ar: 'إضافة عنوان سريع', en: 'Quick Address' },
    'checkout.addNewAddress': { ar: 'إضافة عنوان جديد', en: 'Add New Address' },
    'checkout.recipient': { ar: 'اسم المستلم', en: 'Recipient name' },
    'checkout.altPhone': { ar: 'رقم احتياطي', en: 'Alternative Phone' },
    'checkout.city': { ar: 'المدينة', en: 'City' },
    'checkout.area': { ar: 'المنطقة', en: 'Area' },
    'checkout.street': { ar: 'العنوان التفصيلي', en: 'Detailed Address' },
    'checkout.streetHint': { ar: 'مثال: ٤٥ شارع مبارك، مدينة مبارك، أسيوط، مصر', en: 'e.g. 45 Mubarak St, Mubarak City, Assiut, Egypt' },
    'checkout.building': { ar: 'المبنى (اختياري)', en: 'Building (Optional)' },
    'checkout.saveAddress': { ar: 'حفظ العنوان', en: 'Save Address' },
    'checkout.subtotal': { ar: 'إجمالي السلة', en: 'Cart subtotal' },
    'checkout.walletBalance': { ar: 'رصيد المحفظة', en: 'Wallet balance' },
    'checkout.deliveryFee': { ar: 'رسوم التوصيل', en: 'Delivery fee' },
    'checkout.paymentMethod': { ar: 'طريقة الدفع', en: 'Payment Method' },
    'checkout.discount': { ar: 'الخصم', en: 'Discount' },
    'checkout.feedbackReady': { ar: 'راجع البيانات ثم أكّد الطلب.', en: 'Review your details, then place the order.' },
    'checkout.feedbackSuccess': { ar: 'تم إنشاء الطلب بنجاح.', en: 'The order was created successfully.' },
    'checkout.feedbackError': { ar: 'تعذر إكمال الطلب حالياً.', en: 'Unable to complete the order right now.' },
    'checkout.walletNumberHint': { ar: 'المبلغ المراد دفعه من المحفظة', en: 'Wallet amount to use' },
    'checkout.phoneHint': { ar: 'اكتب رقم الهاتف بصيغة صحيحة مثل 01000000000', en: 'Enter a valid phone number, e.g. 01000000000' },
    'checkout.altPhoneHint': { ar: 'رقم هاتف احتياطي', en: 'Alternative phone number' },
    'checkout.noZones': { ar: 'لا توجد مناطق توصيل لهذا الفرع.', en: 'No delivery zones available for this branch.' },
    'checkout.guestInfo': { ar: 'أنت تطلب كضيف. سيُطلب منك تسجيل الدخول أو إنشاء حساب عند إتمام الطلب.', en: 'You are ordering as a guest. You will be asked to login or register upon completion.' },
    'product.eyebrow': { ar: 'تفاصيل المنتج', en: 'Product Details' },
    'product.copy': { ar: 'تفاصيل كاملة تشمل الوسائط والأحجام والإضافات المتاحة حسب إعدادات الإدارة.', en: 'Full details including media, sizes, and add-ons configured by the admin panel.' },
    'product.sizes': { ar: 'الأحجام', en: 'Sizes' },
    'product.quantity': { ar: 'الكمية', en: 'Quantity' },
    'product.addToCart': { ar: 'إضافة إلى السلة', en: 'Add To Cart' },
    'product.clearSingle': { ar: 'بدون اختيار', en: 'No Selection' },
    'product.reviews': { ar: 'التقييمات', en: 'Reviews' },
    'product.reviewTitle': { ar: 'آراء العملاء بعد الشراء', en: 'Verified Purchase Feedback' },
    'product.rating': { ar: 'التقييم', en: 'Rating' },
    'product.writeReview': { ar: 'اكتب تقييمك', en: 'Write a review' },
    'product.anonymous': { ar: 'مجهول', en: 'Anonymous' },
    'product.submitReview': { ar: 'إرسال التقييم', en: 'Submit Review' },
    'product.customer': { ar: 'عميل', en: 'Customer' },
    'product.noComment': { ar: 'لا يوجد تعليق.', en: 'No comment provided.' },
    'product.suggestions': { ar: 'قد يعجبك أيضاً', en: 'You may also like' },
    'product.suggestionsSubtitle': { ar: 'ترشيحات مبنية على تفضيلاتك وما يشتريه الآخرون بشجرة ذكاء اصطناعي.', en: 'AI-driven recommendations based on your preferences and what others are buying.' },
    'product.aiBadge': { ar: 'ترشيح ذكي', en: 'AI Pick' },
    'product.stars': { ar: 'نجوم', en: 'stars' },
    'product.reviews_count': { ar: 'تقييمات', en: 'reviews' },
    'product.purchases_count': { ar: 'مرة شراء', en: 'purchases' },
    'product.loadMore': { ar: 'تحميل المزيد', en: 'Load More' },
    'product.noReviews': { ar: 'لا توجد تقييمات بعد.', en: 'No reviews yet.' },
    'wallet.eyebrow': { ar: 'المحفظة', en: 'Wallet' },
    'wallet.copy': { ar: 'اشحن الرصيد عبر بطاقات الهدايا وتابع كل الحركات المالية المرتبطة بطلباتك.', en: 'Redeem gift cards and track every wallet transaction.' },
    'wallet.code': { ar: 'كود بطاقة الهدية', en: 'Gift card code' },
    'wallet.redeem': { ar: 'استرداد', en: 'Redeem' },
    'wallet.transactions': { ar: 'الحركات', en: 'Transactions' },
    'wallet.confirmTitle': { ar: 'تأكيد استرداد البطاقة', en: 'Confirm Gift Card Redemption' },
    'wallet.confirmMessage': { ar: 'هل تريد استخدام هذا الكود الآن وإضافة رصيده إلى المحفظة؟', en: 'Do you want to redeem this code now and add its value to your wallet?' },
    'wallet.redeemSuccess': { ar: 'تم استرداد البطاقة بنجاح.', en: 'Gift card redeemed successfully.' },
    'wallet.redeemFailed': { ar: 'تعذر استرداد البطاقة.', en: 'Gift card redemption failed.' },
    'wallet.deposit': { ar: 'إيداع', en: 'Deposit' },
    'wallet.depositTitle': { ar: 'إيداع رصيد', en: 'Add Balance' },
    'wallet.depositCopy': { ar: 'اختر طريقة الدفع والمبلغ المراد إضافته لمحفظتك.', en: 'Choose your payment method and the amount to add to your wallet.' },
    'wallet.depositComingSoon': { ar: 'بوابة الدفع قيد التطوير', en: 'Payment gateway coming soon' },
    'wallet.depositComingSoonDetail': { ar: 'نحن نعمل على دمج بوابة الدفع بشكل آمن. سيتوفر هذا قريباً.', en: 'We are integrating a secure payment gateway. This feature will be available soon.' },
    'wallet.giftcard': { ar: 'بطاقة ؇دية', en: 'Gift Card' },
    'wallet.giftcardTitle': { ar: 'استرداد بطاقة هدية', en: 'Redeem Gift Card' },
    'wallet.giftcardCopy': { ar: 'أدخل كود بطاقة الهدية لإضافة رصيدها إلى محفظتك فوراً.', en: 'Enter the gift card code to add its value to your wallet instantly.' },
    'account.profile': { ar: 'الملف الشخصي', en: 'Profile' },
    'account.privacy': { ar: 'الخصوصية', en: 'Privacy' },
    'account.addresses': { ar: 'العناوين', en: 'Addresses' },
    'account.addAddress': { ar: 'إضافة عنوان', en: 'Add Address' },
    'account.editAddress': { ar: 'تعديل العنوان', en: 'Edit Address' },
    'account.addressSaved': { ar: 'تم حفظ العنوان.', en: 'Address saved successfully.' },
    'account.notifications': { ar: 'الإشعارات', en: 'Notifications' },
    'account.inbox': { ar: 'صندوق الإشعارات', en: 'Inbox' },
    'account.readAll': { ar: 'قراءة الكل', en: 'Read All' },
    'account.orders': { ar: 'الطلبات', en: 'Orders' },
    'account.spent': { ar: 'إجمالي الإنفاق', en: 'Total Spending' },
    'account.monthlyRank': { ar: 'الترتيب الشهري', en: 'Monthly Rank' },
    'account.yearlyRank': { ar: 'الترتيب السنوي', en: 'Yearly Rank' },
    'account.members': { ar: 'إدارة الأعضاء', en: 'Members Management' },
    'account.name': { ar: 'الاسم', en: 'Name' },
    'account.username': { ar: 'اسم المستخدم', en: 'Username' },
    'account.email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'account.phone': { ar: 'رقم الهاتف الأساسي', en: 'Primary phone' },
    'account.password': { ar: 'كلمة المرور', en: 'Password' },
    'account.balance': { ar: 'الرصيد', en: 'Balance' },
    'account.saveProfile': { ar: 'حفظ الملف الشخصي', en: 'Save Profile' },
    'account.savePrivacy': { ar: 'حفظ الخصوصية', en: 'Save Privacy' },
    'account.publicProfile': { ar: 'إظهار الملف الشخصي للعامة', en: 'Public profile' },
    'account.showOrders': { ar: 'إظهار عدد الطلبات', en: 'Show orders' },
    'account.showSpent': { ar: 'إظهار إجمالي الإنفاق', en: 'Show spending' },
    'account.showMonthlyRank': { ar: 'إظهار الترتيب الشهري', en: 'Show monthly rank' },
    'account.showYearlyRank': { ar: 'إظهار الترتيب السنوي', en: 'Show yearly rank' },
    'account.showFavorites': { ar: 'إظهار المنتجات المفضلة', en: 'Show favorite products' },
    'account.setDefault': { ar: 'تعيين افتراضي', en: 'Set Default' },
    'account.delete': { ar: 'حذف', en: 'Delete' },
    'account.deleteAddressTitle': { ar: 'حذف العنوان', en: 'Delete Address' },
    'account.deleteAddressMessage': { ar: 'هل تريد حذف هذا العنوان من حسابك؟', en: 'Do you want to delete this address from your account?' },
    'account.profileSaved': { ar: 'تم حفظ بيانات الملف الشخصي.', en: 'Profile updated successfully.' },
    'account.privacySaved': { ar: 'تم حفظ إعدادات الخصوصية.', en: 'Privacy settings updated successfully.' },
    'account.addressDeleted': { ar: 'تم حذف العنوان.', en: 'Address deleted successfully.' },
    'account.notificationsRead': { ar: 'تم تعليم الإشعارات كمقروءة.', en: 'Notifications marked as read.' },
    'cart.eyebrow': { ar: 'السلة', en: 'Cart' },
    'cart.title': { ar: 'سلة الطلب الحالية', en: 'Current Basket' },
    'cart.empty': { ar: 'السلة فارغة الآن. ابدأ من المنيو.', en: 'Your cart is empty. Start from the menu.' },
    'cart.clear': { ar: 'تفريغ السلة', en: 'Clear Cart' },
    'cart.summary': { ar: 'ملخص الطلب', en: 'Order Summary' },
    'cart.checkout': { ar: 'الانتقال إلى الدفع', en: 'Proceed To Checkout' },
    'cart.edit': { ar: 'تعديل', en: 'Edit' },
    'cart.remove': { ar: 'حذف', en: 'Remove' },
    'cart.couponPreview': { ar: 'فحص الكوبون', en: 'Preview Coupon' },
    'cart.quantity': { ar: 'الكمية', en: 'Quantity' },
    'cart.config': { ar: 'الإعدادات المختارة', en: 'Selected Configuration' },
    'cart.itemEditor': { ar: 'تحرير عنصر السلة', en: 'Edit Cart Item' },
    'cart.defaultSize': { ar: 'الحجم الافتراضي', en: 'Default Size' },
    'cart.saved': { ar: 'تم تحديث العنصر داخل السلة.', en: 'Cart item updated successfully.' },
    'cart.cleared': { ar: 'تم تفريغ السلة.', en: 'Cart cleared successfully.' },
    'cart.removed': { ar: 'تم حذف العنصر من السلة.', en: 'Cart item removed successfully.' },
    'admin.title': { ar: 'مركز التحكم', en: 'Control Center' },
    'admin.subtitle': { ar: 'إدارة تشغيل العلامة التجارية والطلبات والمحتوى من واجهة واحدة.', en: 'Manage operations, branding, and content from one place.' },
    'admin.section.dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
    'admin.section.orders': { ar: 'الطلبات', en: 'Orders' },
    'admin.section.catalog': { ar: 'المنتجات والمنيو', en: 'Catalog' },
    'admin.section.customers': { ar: 'العملاء والصلاحيات', en: 'Customers & Access' },
    'admin.section.branding': { ar: 'الهوية والثيم', en: 'Branding & Theme' },
    'admin.section.content': { ar: 'المحتوى والمراجعات', en: 'Content & Reviews' },
    'admin.section.media': { ar: 'الوسائط والتكاملات', en: 'Media & Integrations' },
    'admin.section.logs': { ar: 'سجل العمليات', en: 'Audit Logs' },
    'admin.menu': { ar: 'القائمة', en: 'Menu' },
    'admin.logout': { ar: 'تسجيل الخروج', en: 'Logout' },
    'admin.metrics.orders': { ar: 'الطلبات', en: 'Orders' },
    'admin.metrics.products': { ar: 'المنتجات', en: 'Products' },
    'admin.metrics.branches': { ar: 'الفروع', en: 'Branches' },
    'admin.metrics.roles': { ar: 'الأدوار', en: 'Roles' },
    'admin.metrics.revenue': { ar: 'الإيراد الإجمالي', en: 'Revenue' },
    'admin.metrics.pending': { ar: 'تحت المراجعة', en: 'Pending' },
    'admin.chart.orderStatus': { ar: 'حالات الطلبات', en: 'Order Status' },
    'admin.dashboard.recentFocus': { ar: 'أولويات الإدارة', en: 'Operational Focus' },
    'admin.dashboard.focusA': { ar: 'متابعة الطلبات الحرجة وحالات التأخير.', en: 'Track delayed and critical orders.' },
    'admin.dashboard.focusB': { ar: 'مراقبة الأصناف الأعلى طلبًا والأقل توافرًا.', en: 'Monitor best sellers and low-availability products.' },
    'admin.dashboard.focusC': { ar: 'تعديل الهوية البصرية والخطوط لكل مطعم على حدة.', en: 'Adjust branding and typography per restaurant.' },
    'admin.dashboard.focusD': { ar: 'إدارة الصلاحيات والصفحات والمحتوى من لوحة واحدة.', en: 'Manage permissions, pages, and content centrally.' },
    'admin.settings.title': { ar: 'إعدادات العلامة التجارية والتحكم', en: 'Brand & Control Settings' },
    'admin.settings.general': { ar: 'عام', en: 'General' },
    'admin.settings.branding': { ar: 'الهوية', en: 'Branding' },
    'admin.settings.typography': { ar: 'الخطوط', en: 'Typography' },
    'admin.settings.localization': { ar: 'اللغات', en: 'Localization' },
    'admin.settings.commerce': { ar: 'التشغيل والبيع', en: 'Commerce' },
    'admin.settings.notifications': { ar: 'الإشعارات', en: 'Notifications' },
    'admin.settings.uploads': { ar: 'الرفع والوسائط', en: 'Uploads' },
    'admin.settings.advanced': { ar: 'متقدم', en: 'Advanced' },
    'admin.settings.save': { ar: 'حفظ التغييرات', en: 'Save Changes' },
    'admin.settings.reset': { ar: 'استعادة الافتراضي', en: 'Reset Defaults' },
    'admin.settings.export': { ar: 'تصدير الحزمة', en: 'Export Pack' },
    'admin.settings.import': { ar: 'استيراد الحزمة', en: 'Import Pack' },
    'admin.settings.logo': { ar: 'الشعار الرئيسي', en: 'Primary Logo' },
    'admin.settings.squareLogo': { ar: 'الشعار المربع', en: 'Square Logo' },
    'admin.settings.favicon': { ar: 'الأيقونة المصغرة', en: 'Favicon' },
    'admin.settings.tagline': { ar: 'الوصف المختصر', en: 'Tagline' },
    'admin.settings.primaryColor': { ar: 'اللون الرئيسي', en: 'Primary Color' },
    'admin.settings.secondaryColor': { ar: 'اللون الثانوي', en: 'Secondary Color' },
    'admin.settings.accentColor': { ar: 'لون الإبراز', en: 'Accent Color' },
    'admin.settings.surfaceColor': { ar: 'لون الخلفيات', en: 'Surface Color' },
    'admin.settings.fontLibrary': { ar: 'مكتبة الخطوط', en: 'Font Library' },
    'admin.settings.fontFamily': { ar: 'اسم الخط', en: 'Font Family' },
    'admin.settings.fontUsage': { ar: 'نوع الاستخدام', en: 'Usage Type' },
    'admin.settings.fontScope': { ar: 'نطاق الاستخدام', en: 'Scope' },
    'admin.settings.fontPath': { ar: 'مسار الملف', en: 'File Path' },
    'admin.settings.uploadFont': { ar: 'رفع خط جديد', en: 'Upload New Font' },
    'admin.settings.uploadAsset': { ar: 'رفع ملف', en: 'Upload Asset' },
    'admin.settings.publicArBody': { ar: 'خط المحتوى العربي للموقع', en: 'Public Arabic Body Font' },
    'admin.settings.publicEnBody': { ar: 'خط المحتوى الإنجليزي للموقع', en: 'Public English Body Font' },
    'admin.settings.publicArHeading': { ar: 'خط العناوين العربية للموقع', en: 'Public Arabic Heading Font' },
    'admin.settings.publicEnHeading': { ar: 'خط العناوين الإنجليزية للموقع', en: 'Public English Heading Font' },
    'admin.settings.adminArBody': { ar: 'خط محتوى لوحة الإدارة بالعربية', en: 'Admin Arabic Body Font' },
    'admin.settings.adminEnBody': { ar: 'خط محتوى لوحة الإدارة بالإنجليزية', en: 'Admin English Body Font' },
    'admin.settings.adminArHeading': { ar: 'خط عناوين الإدارة بالعربية', en: 'Admin Arabic Heading Font' },
    'admin.settings.adminEnHeading': { ar: 'خط عناوين الإدارة بالإنجليزية', en: 'Admin English Heading Font' },
    'admin.settings.siteName': { ar: 'اسم الموقع', en: 'Site Name' },
    'admin.settings.supportPhone': { ar: 'هاتف الدعم', en: 'Support Phone' },
    'admin.settings.supportEmail': { ar: 'بريد الدعم', en: 'Support Email' },
    'admin.settings.defaultLocale': { ar: 'اللغة الافتراضية', en: 'Default Locale' },
    'admin.settings.currencyCode': { ar: 'كود العملة', en: 'Currency Code' },
    'admin.settings.currencySymbol': { ar: 'رمز العملة', en: 'Currency Symbol' },
    'admin.settings.gracePeriod': { ar: 'مهلة تعديل الطلب بالدقائق', en: 'Order Grace Period' },
    'admin.settings.publicBaseUrl': { ar: 'رابط الـ CDN العام', en: 'Public CDN URL' },
    'admin.settings.saved': { ar: 'تم حفظ الإعدادات بنجاح.', en: 'Settings saved successfully.' },
    'admin.settings.resetDone': { ar: 'تمت استعادة القيم الافتراضية.', en: 'Defaults restored successfully.' },
    'admin.catalog.products': { ar: 'المنتجات', en: 'Products' },
    'admin.catalog.categories': { ar: 'الأقسام', en: 'Categories' },
    'admin.catalog.tags': { ar: 'الوسوم', en: 'Tags' },
    'admin.catalog.addons': { ar: 'مجموعات الإضافات', en: 'Addon Groups' },
    'admin.catalog.branches': { ar: 'الفروع', en: 'Branches' },
    'admin.catalog.delivery': { ar: 'مناطق التوصيل', en: 'Delivery Zones' },
    'admin.catalog.coupons': { ar: 'الكوبونات', en: 'Coupons' },
    'admin.catalog.giftcards': { ar: 'بطاقات الهدايا', en: 'Gift Cards' },
    'admin.catalog.availableInAllBranches': { ar: 'متاح في جميع الفروع', en: 'Available in all branches' },
    'admin.catalog.selectBranches': { ar: 'اختر الفروع', en: 'Select Branches' },
    'admin.catalog.arName': { ar: 'الاسم بالعربي', en: 'Name (Arabic)' },
    'admin.catalog.enName': { ar: 'الاسم بالإنجليزي', en: 'Name (English)' },
    'admin.catalog.code': { ar: 'الكود / المعرف', en: 'Code / Identifier' },
    'admin.catalog.slug': { ar: 'المعرف الرقمي (Slug)', en: 'Slug / URL Link' },
    'admin.catalog.hint.price': { ar: 'السعر الأساسي في حال عدم اختيار حجم محدد.', en: 'The base price if no size is chosen.' },
    'admin.catalog.hint.allBranches': { ar: 'تفعيل هذا الخيار سيجعل المنتج متاحاً في كافة فروع المطعم.', en: 'Enable to show this product across all restaurant locations.' },
    'admin.catalog.hint.selectBranches': { ar: 'اختر الفروع التي يتوفر بها هذا المنتج بالتحديد.', en: 'Select specific branches where this item is available.' },
    'admin.catalog.hint.catTags': { ar: 'تساعد هذه التصنيفات والوسوم العملاء على الوصول لمنتجك بسهولة.', en: 'Categories and tags help customers find your product easily.' },
    'admin.catalog.category': { ar: 'القسم', en: 'Category' },
    'admin.catalog.tag': { ar: 'الوسم', en: 'Tag' },
    'admin.catalog.price_override': { ar: 'تعديل السعر حسب الحجم', en: 'Price override per size' },
    'admin.back': { ar: 'رجوع', en: 'Back' },
    'admin.catalog.title': { ar: 'إدارة المنيو والمنتجات', en: 'Catalog Management' },
    'admin.catalog.create': { ar: 'إنشاء جديد', en: 'Create New' },
    'admin.catalog.edit': { ar: 'تعديل', en: 'Edit' },
    'admin.catalog.delete': { ar: 'حذف', en: 'Delete' },
    'admin.catalog.name': { ar: 'الاسم', en: 'Name' },
    'admin.catalog.details': { ar: 'التفاصيل', en: 'Details' },
    'admin.catalog.status': { ar: 'الحالة', en: 'Status' },
    'admin.catalog.actions': { ar: 'إجراءات', en: 'Actions' },
    'admin.catalog.filter': { ar: 'فلترة', en: 'Filter' },
    'admin.catalog.sort': { ar: 'ترتيب', en: 'Sort' },
    'admin.catalog.search': { ar: 'بحث...', en: 'Search...' },
    'admin.catalog.active': { ar: 'مفعل', en: 'Active' },
    'admin.catalog.inactive': { ar: 'غير مفعل', en: 'Inactive' },
    'admin.catalog.cancel': { ar: 'إلغاء', en: 'Cancel' },
    'admin.catalog.arTitle': { ar: 'العنوان (عربي)', en: 'Title (Arabic)' },
    'admin.catalog.enTitle': { ar: 'العنوان (إنجليزي)', en: 'Title (English)' },
    'admin.catalog.arDescription': { ar: 'الوصف (عربي)', en: 'Description (Arabic)' },
    'admin.catalog.enDescription': { ar: 'الوصف (إنجليزي)', en: 'Description (English)' },
    'admin.catalog.price': { ar: 'السعر', en: 'Price' },
    'admin.catalog.image': { ar: 'الصورة', en: 'Image' },
    'admin.catalog.phone': { ar: 'الهاتف', en: 'Phone' },
    'admin.catalog.email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'admin.catalog.address': { ar: 'العنوان', en: 'Address' },
    'admin.catalog.advanced': { ar: 'تحرير متقدم', en: 'Advanced Editor' },
    'admin.collapseMenu': { ar: 'طي القائمة', en: 'Collapse' },
    'orders.title': { ar: 'تتبع الطلبات', en: 'Customer Tracking' },
    'orders.noOrders': { ar: 'لا توجد طلبات سابقة.', en: 'No previous orders found.' },
    'orders.details': { ar: 'التفاصيل', en: 'Details' },
    'orders.items': { ar: 'المنتجات', en: 'Items' },
    'orders.tracking': { ar: 'التتبع', en: 'Tracking' },
    'orders.branchContact': { ar: 'تواصل مع الفرع', en: 'Branch Contact' },
    'orders.callBranch': { ar: 'اتصل بالفرع', en: 'Call Branch' },
    'orders.selfService': { ar: 'ملاحظات للطلب (تعديل)', en: 'Order Notes (Self Service)' },
    'orders.changeNote': { ar: 'هل تريد تغيير شيء؟', en: 'Need to change something?' },
    'orders.saveNotes': { ar: 'حفظ الملاحظة', en: 'Save Notes' },
    'orders.cancelOrder': { ar: 'إلغاء الطلب', en: 'Cancel Order' },
    'orders.back': { ar: 'رجوع', en: 'Back' },
    'orders.statusUpdated': { ar: 'تم تحديث الحالة.', en: 'Status updated.' },
    'admin.access.roles': { ar: 'الأدوار والصلاحيات', en: 'Roles & Permissions' },
    'admin.access.members': { ar: 'إدارة الأعضاء', en: 'Member Management' },
    'admin.access.permissions': { ar: 'الصلاحيات', en: 'Permissions' },
    'admin.access.save': { ar: 'حفظ الدور', en: 'Save Role' },
    'admin.access.addMember': { ar: 'إضافة عضو', en: 'Add Member' },
    'admin.access.editMember': { ar: 'تعديل العضو', en: 'Edit Member' },
    'admin.access.name': { ar: 'الاسم', en: 'Name' },
    'admin.access.email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'admin.access.role': { ar: 'الدور', en: 'Role' },
    'admin.access.status': { ar: 'الحالة', en: 'Status' },
    'admin.access.createRole': { ar: 'إنشاء دور جديد', en: 'Create Role' },
    'admin.access.roleName': { ar: 'اسم الدور', en: 'Role Name' },
    
    // Permissions Metadata
    'perm.audit-logs.view': { ar: 'سجل العمليات', en: 'Audit Logs' },
    'perm.audit-logs.view.desc': { ar: 'يسمح للمسؤول برؤية سجل كافة العمليات التي تمت في النظام.', en: 'Allows viewing all system activity and changes.' },
    'perm.branches.view': { ar: 'عرض الفروع', en: 'View Branches' },
    'perm.branches.view.desc': { ar: 'يسمح بمشاهدة قائمة فروع المطعم.', en: 'Allows viewing the list of restaurant branches.' },
    'perm.branches.manage': { ar: 'إدارة الفروع', en: 'Manage Branches' },
    'perm.branches.manage.desc': { ar: 'يسمح بإنشاء وفروع وتعديل وحذف الفروع.', en: 'Allows full control over creating and editing branches.' },
    'perm.products.view': { ar: 'عرض المنتجات', en: 'View Products' },
    'perm.products.view.desc': { ar: 'يسمح بمشاهدة قائمة المنتجات.', en: 'Allows viewing the list of products.' },
    'perm.products.manage': { ar: 'إدارة المنتجات', en: 'Manage Products' },
    'perm.products.manage.desc': { ar: 'يسمح بإضافة وتعديل وحذف المنتجات في المنيو.', en: 'Allows full control over catalog products.' },
    'perm.orders.view': { ar: 'عرض الطلبات', en: 'View Orders' },
    'perm.orders.view.desc': { ar: 'يسمح بمشاهدة طلبات العملاء.', en: 'Allows viewing customer orders' },
    'perm.orders.manage': { ar: 'إدارة الطلبات', en: 'Manage Orders' },
    'perm.orders.manage.desc': { ar: 'يسمح بتغيير حالة الطلب وتعيين المندوبين.', en: 'Allows updating order status and assignments.' },
    'perm.roles.manage': { ar: 'إدارة الصلاحيات', en: 'Manage Roles' },
    'perm.roles.manage.desc': { ar: 'يسمح بإنشاء وتعديل الأدوار وصلاحيات الأعضاء.', en: 'Allows managing user roles and system permissions.' },
    'perm.settings.manage': { ar: 'إدارة الإعدادات', en: 'Manage Settings' },
    'perm.settings.manage.desc': { ar: 'يسمح بتعديل إعدادات النظام والهوية.', en: 'Allows updating system settings and branding.' },
    'perm.users.manage': { ar: 'إدارة المستخدمين', en: 'Manage Users' },
    'perm.users.manage.desc': { ar: 'يسمح بإضافة وتعديل وحذف أعضاء النظام.', en: 'Allows full control over user accounts.' },

    'admin.orders.title': { ar: 'إدارة الطلبات', en: 'Order Management' },
    'admin.orders.manage': { ar: 'إدارة', en: 'Manage' },
    'admin.orders.status': { ar: 'الحالة', en: 'Status' },
    'admin.orders.notes': { ar: 'ملاحظات الحالة', en: 'Status Notes' },
    'admin.orders.updateStatus': { ar: 'تحديث الحالة', en: 'Update Status' },
    'admin.orders.delivery': { ar: 'بيانات المندوب', en: 'Delivery Assignment' },
    'admin.orders.driverName': { ar: 'اسم المندوب', en: 'Driver Name' },
    'admin.orders.driverPhone': { ar: 'هاتف المندوب', en: 'Driver Phone' },
    'admin.orders.assign': { ar: 'حفظ بيانات التوصيل', en: 'Assign Delivery' },
    'admin.orders.time': { ar: 'الوقت', en: 'Time' },
    'admin.orders.total': { ar: 'الإجمالي', en: 'Total' },
    'admin.orders.driverSelect': { ar: 'اختر من المندوبين (اختياري)', en: 'Select Driver (Optional)' },
    'admin.orders.summary': { ar: 'ملخص الطلب', en: 'Order Summary' },
    'admin.orders.id': { ar: 'رقم الطلب', en: 'Order ID' },
    'admin.orders.items': { ar: 'العناصر', en: 'Items' },
    'admin.orders.price': { ar: 'السعر', en: 'Price' },
    'admin.orders.branch': { ar: 'الفرع', en: 'Branch' },
    'admin.orders.zone': { ar: 'المنطقة', en: 'Zone' },
    'admin.orders.notesLabel': { ar: 'الملاحظات', en: 'Notes' },
    'admin.dashboard.noOrders': { ar: '🧾 لا توجد طلبات حتى الآن', en: '🧾 No orders found yet.' },
    'admin.content.pages': { ar: 'الصفحات الديناميكية', en: 'Dynamic Pages' },
    'admin.content.reviews': { ar: 'مراجعة التقييمات', en: 'Review Moderation' },
    'admin.integrations.media': { ar: 'الرفع والـ CDN', en: 'Uploads & CDN' },
    'admin.integrations.logs': { ar: 'سجل العمليات', en: 'Audit Logs' },
    'admin.settings.social': { ar: 'التكامل الاجتماعي', en: 'Social Integration' },
    'admin.settings.security': { ar: 'الحماية والكابتشا', en: 'Security & Captcha' },
    'admin.settings.googleEnabled': { ar: 'تفعيل جوجل', en: 'Enable Google' },
    'admin.settings.discordEnabled': { ar: 'تفعيل ديسكورد', en: 'Enable Discord' },
    'admin.settings.facebookEnabled': { ar: 'تفعيل فيسبوك', en: 'Enable Facebook' },
    'admin.settings.captchaLogin': { ar: 'كابتشا عند الدخول', en: 'Captcha at Login' },
    'admin.settings.captchaRegister': { ar: 'كابتشا عند التسجيل', en: 'Captcha at Register' },
    'admin.settings.captchaType': { ar: 'نوع الكابتشا', en: 'Captcha Type' },
    'auth.welcomeTitle': { ar: 'مرحباً بعودتك!', en: 'Welcome back!' },
    'auth.welcomeSubtitle': { ar: 'برجاء إدخال بياناتك للمتابعة.', en: 'Please enter your details to continue.' },
    'auth.regTitle': { ar: 'عضو جديد', en: 'New Member' },
    'auth.regHeading': { ar: 'انضم إلى نادينا الحصري', en: 'Join Our Exclusive Club' },
    'auth.regSubtitle': { ar: 'املأ المعلومات أدناه لإنشاء حسابك.', en: 'Fill in the information below to create your account.' },
    'auth.identityPlaceholder': { ar: 'أدخل اسم المستخدم أو البريد', en: 'Enter username or email' },
    'auth.passwordPlaceholder': { ar: 'أدخل كلمة المرور', en: 'Enter password' },
    'auth.noAccount': { ar: 'ليس لديك حساب؟', en: "Don't have an account?" },
    'auth.createOne': { ar: 'أنشئ حساباً', en: 'Create one' },
    'auth.haveAccount': { ar: 'لديك حساب بالفعل؟', en: 'Already have an account?' },
    'auth.signInInstead': { ar: 'سجل دخولك بدلاً من ذلك', en: 'Sign in instead' },
    'auth.quickAccess': { ar: 'وصول سريع', en: 'Quick Access' },
    'validation.required': { ar: 'هذا الحقل مطلوب.', en: 'This field is required.' },
    'validation.email': { ar: 'صيغة البريد الإلكتروني غير صحيحة.', en: 'Invalid email format.' },
    'validation.minlength': { ar: 'لابد أن يكون طول النص :min على الأقل.', en: 'Minimum length is :min characters.' },
    'validation.pattern': { ar: 'الصيغة المدخلة غير صحيحة.', en: 'Invalid format.' },
    'validation.mismatch': { ar: 'كلمتا المرور غير متطابقتين.', en: 'Passwords do not match.' },
    'validation.unique': { ar: 'هذه القيمة مستخدمة بالفعل.', en: 'This value is already taken.' },
    'public.footerSocial': { ar: 'تواصل معنا', en: 'Follow Us' },
  };

  t(key: string): string {
    const locale = this.theme.locale();
    return this.dictionary[key]?.[locale] ?? this.dictionary[key]?.ar ?? key;
  }

  locale(): Locale {
    return this.theme.locale();
  }

  orderStatus(status: string): string {
    const map: Record<string, { ar: string; en: string }> = {
      created: { ar: 'تم الإنشاء', en: 'Created' },
      pending: { ar: 'قيد المراجعة', en: 'Pending' },
      confirmed: { ar: 'تم التأكيد', en: 'Confirmed' },
      preparing: { ar: 'جارٍ التحضير', en: 'Preparing' },
      out_for_delivery: { ar: 'مع المندوب', en: 'Out for Delivery' },
      delivered: { ar: 'تم التسليم', en: 'Delivered' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
      refunded: { ar: 'مسترجع', en: 'Refunded' },
    };

    return map[status]?.[this.locale()] ?? status;
  }

  sortLabel(value: string): string {
    const labels: Record<string, Record<Locale, string>> = {
      default: { ar: 'افتراضي', en: 'Default' },
      price_asc: { ar: 'السعر: الأقل أولًا', en: 'Price: Low to High' },
      price_desc: { ar: 'السعر: الأعلى أولًا', en: 'Price: High to Low' },
      rating_desc: { ar: 'الأعلى تقييمًا', en: 'Highest Rated' },
      best_seller: { ar: 'الأكثر طلبًا', en: 'Most Ordered' },
    };

    return labels[value]?.[this.locale()] ?? value;
  }

  transactionType(type: string): string {
    const map: Record<string, { ar: string; en: string }> = {
      credit: { ar: 'إضافة رصيد', en: 'Credit' },
      debit: { ar: 'خصم رصيد', en: 'Debit' },
      redeem: { ar: 'استرداد بطاقة', en: 'Gift Redemption' },
      gift_card_redeem: { ar: 'استرداد بطاقة هدية', en: 'Gift Card Redemption' },
      refund: { ar: 'استرجاع طلب', en: 'Refund' },
      purchase: { ar: 'دفع طلب', en: 'Purchase' },
      order_payment: { ar: 'دفع طلب', en: 'Order Payment' },
      referral_bonus: { ar: 'مكافأة دعوة', en: 'Referral Bonus' },
    };

    return map[type]?.[this.locale()] ?? type;
  }

  notificationTitle(notification: NotificationItem): string {
    const data = notification.data ?? {};

    if (typeof data['title'] === 'string' && data['title'].trim() !== '') {
      return String(data['title']);
    }

    return this.t('account.notifications');
  }

  notificationMessage(notification: NotificationItem): string {
    const data = notification.data ?? {};

    if (typeof data['message'] === 'string' && data['message'].trim() !== '') {
      return String(data['message']);
    }

    if (typeof data['event'] === 'string') {
      return this.orderStatus(String(data['context'] && typeof data['context'] === 'object' ? (data['context'] as Record<string, unknown>)['status'] ?? '' : ''));
    }

    return notification.type;
  }

  notificationSeverity(notification: NotificationItem): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const event = String(notification.data?.['event'] ?? '');

    if (event.includes('cancel') || event.includes('refund')) {
      return 'warn';
    }

    if (event.includes('delivered') || event.includes('confirmed')) {
      return 'success';
    }

    return 'info';
  }

  addressSummary(city: string, area: string, street: string): string {
    return this.locale() === 'ar' ? `${city} • ${area} • ${street}` : `${street} • ${area} • ${city}`;
  }

  fontTypeLabel(type: string): string {
    const map: Record<string, { ar: string; en: string }> = {
      ar: { ar: 'عربي', en: 'Arabic' },
      en: { ar: 'إنجليزي', en: 'English' },
      both: { ar: 'عربي + إنجليزي', en: 'Arabic + English' },
    };

    return map[type]?.[this.locale()] ?? type;
  }

  fontScopeLabel(scope: string): string {
    const map: Record<string, { ar: string; en: string }> = {
      public: { ar: 'المتجر', en: 'Storefront' },
      admin: { ar: 'لوحة الإدارة', en: 'Admin Panel' },
      shared: { ar: 'مشترك', en: 'Shared' },
    };

    return map[scope]?.[this.locale()] ?? scope;
  }

  transactionNote(transaction: WalletTransaction): string {
    return transaction.notes || this.transactionType(transaction.type);
  }

  timeAgo(date: string | Date): string {
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - time) / 1000);
    const locale = this.locale();

    if (diff < 60) return locale === 'ar' ? 'الآن' : 'just now';
    if (diff < 3600) {
        const m = Math.floor(diff / 60);
        return locale === 'ar' ? `منذ ${m} دقيقة` : `${m}m ago`;
    }
    if (diff < 86400) {
        const h = Math.floor(diff / 3600);
        return locale === 'ar' ? `منذ ${h} ساعة` : `${h}h ago`;
    }
    const d = Math.floor(diff / 86400);
    return locale === 'ar' ? `منذ ${d} يوم` : `${d}d ago`;
  }
}
