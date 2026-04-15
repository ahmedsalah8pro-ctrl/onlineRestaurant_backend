import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RuntimeConfigService } from './runtime-config';

interface AuthenticatedUser {
  id: number;
  name: string;
  username: string;
  email?: string | null;
  primary_phone: string;
  is_active: boolean;
  roles?: string[];
  profile?: {
    avatar_path?: string | null;
    is_public_profile?: boolean;
  };
}

interface AuthEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly tokenKey = 'restaurant-demo.access-token';

  readonly token = signal<string | null>(this.readToken());
  readonly user = signal<AuthenticatedUser | null>(null);
  readonly bootstrapped = signal(false);
  readonly isAuthenticated = computed(() => !!this.token());
  readonly roleNames = computed(() => this.user()?.roles ?? []);
  readonly isAdmin = computed(() => (this.user()?.roles?.length ?? 0) > 0);

  async bootstrap(): Promise<void> {
    if (!this.token()) {
      this.bootstrapped.set(true);
      return;
    }

    try {
      const response = await firstValueFrom(
        this.http.get<AuthEnvelope<AuthenticatedUser>>(`${this.runtime.apiBaseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${this.token()}`,
          },
        }),
      );

      this.user.set(response.data);
    } catch {
      this.clearSession();
    } finally {
      this.bootstrapped.set(true);
    }
  }

  async login(emailOrUsername: string, password: string, deviceName = 'angular-web'): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthEnvelope<{ user: AuthenticatedUser; token: string }>>(
        `${this.runtime.apiBaseUrl}/auth/login`,
        {
          email_or_username: emailOrUsername,
          password,
          device_name: deviceName,
        },
      ),
    );

    this.establishSession(response.data.user, response.data.token);
  }

  async register(payload: {
    name: string;
    username: string;
    email?: string | null;
    primary_phone: string;
    password: string;
    password_confirmation: string;
    device_name?: string;
  }): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthEnvelope<{ user: AuthenticatedUser; token: string }>>(
        `${this.runtime.apiBaseUrl}/auth/register`,
        payload,
      ),
    );

    this.establishSession(response.data.user, response.data.token);
  }

  async logout(): Promise<void> {
    if (this.token()) {
      try {
        await firstValueFrom(
          this.http.post<AuthEnvelope<null>>(
            `${this.runtime.apiBaseUrl}/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${this.token()}`,
              },
            },
          ),
        );
      } catch {
        // Ignore remote logout failures and clear local session anyway.
      }
    }

    this.clearSession();
  }

  clearSession(): void {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem(this.tokenKey);
  }

  private establishSession(user: AuthenticatedUser, token: string): void {
    this.user.set(user);
    this.token.set(token);
    localStorage.setItem(this.tokenKey, token);
  }

  private readToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
