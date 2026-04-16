import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [SharedUiModule, ReactiveFormsModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
  animations: [
    trigger('formState', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('shake', [
      transition('* => error', [
        animate('100ms', style({ transform: 'translateX(-5px)' })),
        animate('100ms', style({ transform: 'translateX(5px)' })),
        animate('100ms', style({ transform: 'translateX(-5px)' })),
        animate('100ms', style({ transform: 'translateX(5px)' })),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class AuthPage implements OnInit {
  protected readonly auth = inject(AuthService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  protected readonly mode = signal<'login' | 'register'>('login');
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  
  protected loginForm!: FormGroup;
  protected registerForm!: FormGroup;

  constructor() {
    this.initForms();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const m = params.get('mode');
      this.mode.set(m === 'register' ? 'register' : 'login');
      this.error.set('');
    });
  }

  private initForms(): void {
    this.loginForm = this.fb.group({
      identity: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)], [this.checkAvailabilityValidator('username')]],
      email: ['', [Validators.email], [this.checkAvailabilityValidator('email')]],
      primary_phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)], [this.checkAvailabilityValidator('primary_phone')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  private checkAvailabilityValidator(field: 'username' | 'email' | 'primary_phone') {
    return async (control: import('@angular/forms').AbstractControl) => {
      if (!control.value) return null;
      // Skip async check if sync validators are already failing (e.g. invalid format)
      if (control.errors && !control.errors['unique']) {
          return null;
      }
      
      const available = await this.auth.checkAvailability(field, control.value);
      return available ? null : { unique: true };
    };
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('password_confirmation')?.value ? null : { mismatch: true };
  }

  protected switchMode(mode: 'login' | 'register'): void {
    this.router.navigate(['/auth', mode], { queryParamsHandling: 'merge' });
  }

  protected async submitLogin(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { identity, password } = this.loginForm.value;

    try {
      await this.auth.login(identity, password);
      await this.navigateAfterSuccess();
    } catch (error) {
      this.error.set(this.extractError(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async submitRegister(): Promise<void> {
    if (this.registerForm.invalid) return;

    this.loading.set(true);
    this.error.set('');

    try {
      const payload = { ...this.registerForm.value };
      if (!payload.email) delete payload.email;
      
      await this.auth.register(payload);
      await this.navigateAfterSuccess();
    } catch (error) {
      this.error.set(this.extractError(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async useDemoAccount(identity: string, password: string, op?: any): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    
    try {
      await this.auth.login(identity, password);
      if (op) op.hide();
      await this.navigateAfterSuccess();
    } catch (error) {
      this.mode.set('login');
      this.error.set(this.extractError(error));
      this.loginForm.patchValue({ identity, password });
      if (op) op.hide();
    } finally {
      this.loading.set(false);
    }
  }

  private async navigateAfterSuccess(): Promise<void> {
    const next = this.route.snapshot.queryParamMap.get('next');
    if (next) {
      await this.router.navigateByUrl(next);
      return;
    }
    await this.router.navigateByUrl(this.auth.isAdmin() ? '/admin' : '/account');
  }

  private extractError(error: unknown): string {
    const payload = error as any;
    const errors = payload?.error?.errors;
    
    if (errors && typeof errors === 'object') {
        const firstField = Object.values(errors)[0] as string[];
        if (Array.isArray(firstField) && firstField.length > 0) {
            return firstField[0];
        }
    }

    return payload?.error?.message ?? 'Authentication failed.';
  }

  protected isInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  protected isValid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  protected getFieldError(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (!control || !control.errors || !(control.dirty || control.touched)) return '';

    if (control.errors['required']) return this.ui.t('validation.required');
    if (control.errors['minlength']) return this.ui.t('validation.minlength').replace(':min', control.errors['minlength'].requiredLength);
    if (control.errors['email']) return this.ui.t('validation.email');
    if (control.errors['pattern']) return this.ui.t('validation.pattern');
    if (control.errors['mismatch']) return this.ui.t('validation.mismatch');
    if (control.errors['unique']) return this.ui.t('validation.unique');

    return 'Invalid field';
  }
}
