import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-auth-page',
  imports: [SharedUiModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  protected readonly auth = inject(AuthService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly mode = signal<'login' | 'register'>('login');
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly loginModel = {
    email_or_username: 'customer@example.com',
    password: 'Password1!',
  };
  protected readonly registerModel = {
    name: 'New Customer',
    username: 'newcustomer',
    email: 'newcustomer@example.com',
    primary_phone: '01012345678',
    password: 'Password1!',
    password_confirmation: 'Password1!',
  };

  protected async submitLogin(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      await this.auth.login(this.loginModel.email_or_username, this.loginModel.password);
      await this.navigateAfterSuccess();
    } catch (error) {
      this.error.set(this.extractError(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async submitRegister(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      await this.auth.register(this.registerModel);
      await this.navigateAfterSuccess();
    } catch (error) {
      this.error.set(this.extractError(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected useDemoAccount(identity: string, password: string): void {
    this.mode.set('login');
    this.loginModel.email_or_username = identity;
    this.loginModel.password = password;
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
    const payload = error as { error?: { message?: string } };
    return payload?.error?.message ?? 'Authentication failed.';
  }
}
