import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { UiTextService } from '../../../../core/services/ui-text';

@Component({
  selector: 'app-status-page',
  standalone: true,
  imports: [SharedUiModule, RouterLink],
  templateUrl: './status-page.html',
  styleUrl: './status-page.scss',
})
export class StatusPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly ui = inject(UiTextService);

  protected readonly code = signal(404);
  protected readonly title = signal('');
  protected readonly copy = signal('');
  protected readonly actionLabel = signal('');
  protected readonly actionLink = signal('/');
  protected readonly actionQueryParams = signal<Record<string, string> | null>(null);
  protected readonly secondaryLabel = signal('');
  protected readonly secondaryLink = signal('/menu');

  ngOnInit(): void {
    const routeCode = Number(this.route.snapshot.data['statusCode'] ?? 404);
    const next = this.route.snapshot.queryParamMap.get('next') ?? '/auth/login';
    this.code.set(routeCode);

    if (routeCode === 401) {
      this.title.set(this.ui.locale() === 'ar' ? 'يلزم تسجيل الدخول' : 'Login Required');
      this.copy.set(
        this.ui.locale() === 'ar'
          ? 'هذه الصفحة تحتاج إلى جلسة مستخدم صالحة. سجّل الدخول ثم تابع إلى طلباتك أو صفحة الدفع.'
          : 'This page requires a valid customer session. Sign in, then continue to your orders or checkout.'
      );
      this.actionLabel.set(this.ui.locale() === 'ar' ? 'الانتقال لتسجيل الدخول' : 'Go to Login');
      this.actionLink.set('/auth/login');
      this.actionQueryParams.set({ next });
      this.secondaryLabel.set(this.ui.locale() === 'ar' ? 'العودة للرئيسية' : 'Back Home');
      this.secondaryLink.set('/');
      return;
    }

    if (routeCode === 403) {
      this.title.set(this.ui.locale() === 'ar' ? 'غير مصرح لك بهذا الطلب' : 'Access Denied');
      this.copy.set(
        this.ui.locale() === 'ar'
          ? 'لا يمكنك عرض هذا الطلب أو التفاعل معه لأن الحساب الحالي لا يملك الصلاحية اللازمة.'
          : 'You cannot view or interact with this order using the current account.'
      );
      this.actionLabel.set(this.ui.locale() === 'ar' ? 'العودة إلى الطلبات' : 'Back to Orders');
      this.actionLink.set('/orders');
      this.actionQueryParams.set(null);
      this.secondaryLabel.set(this.ui.locale() === 'ar' ? 'الذهاب إلى القائمة' : 'Browse Menu');
      this.secondaryLink.set('/menu');
      return;
    }

    this.title.set(this.ui.locale() === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found');
    this.copy.set(
      this.ui.locale() === 'ar'
        ? 'المسار المطلوب غير موجود أو ربما تم حذف المورد الذي تبحث عنه.'
        : 'The requested route does not exist, or the resource you were looking for is no longer available.'
    );
    this.actionLabel.set(this.ui.locale() === 'ar' ? 'العودة للرئيسية' : 'Back Home');
    this.actionLink.set('/');
    this.actionQueryParams.set(null);
    this.secondaryLabel.set(this.ui.locale() === 'ar' ? 'تصفّح المنيو' : 'Browse Menu');
    this.secondaryLink.set('/menu');
  }
}
