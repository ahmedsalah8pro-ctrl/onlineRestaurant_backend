import { Injectable, inject } from '@angular/core';
import { NotificationItem, WalletTransaction } from '../models/api.models';
import { ThemeService } from './theme';

type Locale = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class UiTextService {
  private readonly theme = inject(ThemeService);

  private readonly dictionary: Record<string, Record<Locale, string>> = {
    'nav.home': { ar: 'الرئيسية', en: 'Home' },
    'nav.menu': { ar: 'المنيو', en: 'Menu' },
    'nav.orders': { ar: 'الطلبات', en: 'Orders' },
    'nav.wallet': { ar: 'المحفظة', en: 'Wallet' },
    'nav.account': { ar: 'الحساب', en: 'Account' },
    'nav.login': { ar: 'تسجيل الدخول', en: 'Login' },
    'nav.logout': { ar: 'تسجيل الخروج', en: 'Logout' },
    'nav.admin': { ar: 'لوحة التحكم', en: 'Admin' },
    'nav.storefront': { ar: 'واجهة المتجر', en: 'Storefront' },
    'public.taglineFallback': { ar: 'طلبات مطاعم عربية جاهزة للويب والموبايل.', en: 'Restaurant ordering for web and mobile clients.' },
    'public.footerAbout': { ar: 'منصة طلبات قابلة لإعادة التخصيص لكل علامة تجارية مع دعم كامل للعربية والإنجليزية.', en: 'A white-label ordering platform with full Arabic and English support.' },
    'public.terms': { ar: 'الشروط والأحكام', en: 'Terms of Service' },
    'public.brandControl': { ar: 'تحكم العلامة التجارية', en: 'Brand Control' },
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
    'home.branches': { ar: 'الفروع والتوصيل', en: 'Branches & Delivery' },
    'home.branchActive': { ar: 'مفعل', en: 'Active' },
    'home.branchDisabled': { ar: 'غير مفعل', en: 'Disabled' },
    'menu.eyebrow': { ar: 'تصفح الأصناف', en: 'Browse Menu' },
    'menu.title': { ar: 'المنيو', en: 'Menu' },
    'menu.copy': { ar: 'ابحث وفلتر ورتب المنتجات حسب الفرع أو القسم أو السعر أو الأعلى تقييمًا.', en: 'Search, filter, and sort products by branch, category, price, or rating.' },
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
    'checkout.quickAddress': { ar: 'إضافة عنوان سريع', en: 'Quick Address' },
    'checkout.recipient': { ar: 'اسم المستلم', en: 'Recipient name' },
    'checkout.city': { ar: 'المدينة', en: 'City' },
    'checkout.area': { ar: 'المنطقة', en: 'Area' },
    'checkout.street': { ar: 'الشارع', en: 'Street' },
    'checkout.saveAddress': { ar: 'حفظ العنوان', en: 'Save Address' },
    'checkout.subtotal': { ar: 'إجمالي السلة', en: 'Cart subtotal' },
    'checkout.walletBalance': { ar: 'رصيد المحفظة', en: 'Wallet balance' },
    'checkout.deliveryFee': { ar: 'رسوم التوصيل', en: 'Delivery fee' },
    'product.eyebrow': { ar: 'تفاصيل المنتج', en: 'Product Details' },
    'product.copy': { ar: 'تفاصيل كاملة تشمل الوسائط والأحجام والإضافات المتاحة حسب إعدادات الإدارة.', en: 'Full details including media, sizes, and add-ons configured by the admin panel.' },
    'product.sizes': { ar: 'الأحجام', en: 'Sizes' },
    'product.branch': { ar: 'الفرع', en: 'Branch' },
    'product.addToCart': { ar: 'إضافة إلى السلة', en: 'Add To Cart' },
    'product.reviews': { ar: 'التقييمات', en: 'Reviews' },
    'product.reviewTitle': { ar: 'آراء العملاء بعد الشراء', en: 'Verified Purchase Feedback' },
    'product.rating': { ar: 'التقييم', en: 'Rating' },
    'product.writeReview': { ar: 'اكتب تقييمك', en: 'Write a review' },
    'product.anonymous': { ar: 'إخفاء الاسم', en: 'Anonymous' },
    'product.submitReview': { ar: 'إرسال التقييم', en: 'Submit Review' },
    'product.customer': { ar: 'عميل', en: 'Customer' },
    'product.noComment': { ar: 'لا يوجد تعليق.', en: 'No comment provided.' },
    'wallet.eyebrow': { ar: 'المحفظة', en: 'Wallet' },
    'wallet.copy': { ar: 'اشحن الرصيد عبر بطاقات الهدايا وتابع كل الحركات المالية المرتبطة بطلباتك.', en: 'Redeem gift cards and track every wallet transaction.' },
    'wallet.code': { ar: 'كود بطاقة الهدية', en: 'Gift card code' },
    'wallet.redeem': { ar: 'استرداد', en: 'Redeem' },
    'wallet.transactions': { ar: 'الحركات', en: 'Transactions' },
    'wallet.confirmTitle': { ar: 'تأكيد استرداد البطاقة', en: 'Confirm Gift Card Redemption' },
    'wallet.confirmMessage': { ar: 'هل تريد استخدام هذا الكود الآن وإضافة رصيده إلى المحفظة؟', en: 'Do you want to redeem this code now and add its value to your wallet?' },
    'wallet.redeemSuccess': { ar: 'تم استرداد البطاقة بنجاح.', en: 'Gift card redeemed successfully.' },
    'wallet.redeemFailed': { ar: 'تعذر استرداد البطاقة.', en: 'Gift card redemption failed.' },
    'account.profile': { ar: 'الملف الشخصي', en: 'Profile' },
    'account.privacy': { ar: 'الخصوصية', en: 'Privacy' },
    'account.addresses': { ar: 'العناوين', en: 'Addresses' },
    'account.notifications': { ar: 'الإشعارات', en: 'Notifications' },
    'account.inbox': { ar: 'صندوق الإشعارات', en: 'Inbox' },
    'account.readAll': { ar: 'قراءة الكل', en: 'Read All' },
    'account.orders': { ar: 'الطلبات', en: 'Orders' },
    'account.spent': { ar: 'إجمالي الإنفاق', en: 'Total Spending' },
    'account.monthlyRank': { ar: 'الترتيب الشهري', en: 'Monthly Rank' },
    'account.yearlyRank': { ar: 'الترتيب السنوي', en: 'Yearly Rank' },
    'account.name': { ar: 'الاسم', en: 'Name' },
    'account.username': { ar: 'اسم المستخدم', en: 'Username' },
    'account.email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'account.phone': { ar: 'رقم الهاتف الأساسي', en: 'Primary phone' },
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
    'admin.title': { ar: 'مركز التحكم', en: 'Control Center' },
    'admin.subtitle': { ar: 'إدارة تشغيل العلامة التجارية والطلبات والمحتوى من واجهة واحدة.', en: 'Manage operations, branding, and content from one place.' },
    'admin.section.dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
    'admin.section.orders': { ar: 'الطلبات', en: 'Orders' },
    'admin.section.catalog': { ar: 'المنتجات والمنيو', en: 'Catalog' },
    'admin.section.customers': { ar: 'العملاء والصلاحيات', en: 'Customers & Access' },
    'admin.section.branding': { ar: 'الهوية والثيم', en: 'Branding & Theme' },
    'admin.section.content': { ar: 'المحتوى والمراجعات', en: 'Content & Reviews' },
    'admin.section.media': { ar: 'الوسائط والتكاملات', en: 'Media & Integrations' },
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
    'admin.catalog.title': { ar: 'إدارة المنيو والمنتجات', en: 'Catalog Management' },
    'admin.catalog.create': { ar: 'إضافة عنصر', en: 'Create Item' },
    'admin.catalog.edit': { ar: 'تعديل', en: 'Edit' },
    'admin.catalog.delete': { ar: 'حذف', en: 'Delete' },
    'admin.catalog.advanced': { ar: 'تحرير متقدم', en: 'Advanced Editor' },
    'admin.access.roles': { ar: 'الأدوار', en: 'Roles' },
    'admin.access.permissions': { ar: 'الصلاحيات', en: 'Permissions' },
    'admin.access.save': { ar: 'حفظ الدور', en: 'Save Role' },
    'admin.orders.title': { ar: 'إدارة الطلبات', en: 'Order Management' },
    'admin.orders.manage': { ar: 'إدارة', en: 'Manage' },
    'admin.orders.status': { ar: 'الحالة', en: 'Status' },
    'admin.orders.notes': { ar: 'ملاحظات الحالة', en: 'Status Notes' },
    'admin.orders.updateStatus': { ar: 'تحديث الحالة', en: 'Update Status' },
    'admin.orders.delivery': { ar: 'بيانات المندوب', en: 'Delivery Assignment' },
    'admin.orders.driverName': { ar: 'اسم المندوب', en: 'Driver Name' },
    'admin.orders.driverPhone': { ar: 'هاتف المندوب', en: 'Driver Phone' },
    'admin.orders.assign': { ar: 'حفظ بيانات التوصيل', en: 'Assign Delivery' },
    'admin.content.pages': { ar: 'الصفحات الديناميكية', en: 'Dynamic Pages' },
    'admin.content.reviews': { ar: 'مراجعة التقييمات', en: 'Review Moderation' },
    'admin.integrations.media': { ar: 'الرفع والـ CDN', en: 'Uploads & CDN' },
    'admin.integrations.logs': { ar: 'سجل العمليات', en: 'Audit Logs' },
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
      refund: { ar: 'استرجاع طلب', en: 'Refund' },
      purchase: { ar: 'دفع طلب', en: 'Purchase' },
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
}
