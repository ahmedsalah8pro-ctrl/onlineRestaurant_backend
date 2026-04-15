import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-admin-login-page',
  imports: [SharedUiModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.scss',
})
export class AdminLoginPage {
  protected readonly auth = inject(AuthService);
  protected readonly runtime = inject(RuntimeConfigService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly model = {
    email_or_username: 'admin@example.com',
    password: 'Password1!',
  };

  protected async submit(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      await this.auth.login(this.model.email_or_username, this.model.password, 'angular-admin');

      if (!this.auth.isAdmin()) {
        this.error.set('This account does not have admin permissions.');
        return;
      }

      await this.router.navigateByUrl('/admin');
    } catch (error) {
      const payload = error as { error?: { message?: string } };
      this.error.set(payload?.error?.message ?? 'Admin login failed.');
    } finally {
      this.loading.set(false);
    }
  }
}
