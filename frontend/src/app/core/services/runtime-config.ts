import { Injectable } from '@angular/core';

export interface ResolvedRuntimeConfig {
  frontendBaseUrl: string;
  apiBaseUrl: string;
  cdnBaseUrl: string;
  environment: 'local' | 'production';
}

@Injectable({
  providedIn: 'root',
})
export class RuntimeConfigService {
  private readonly config: ResolvedRuntimeConfig = this.resolveConfig();

  get frontendBaseUrl(): string {
    return this.config.frontendBaseUrl;
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  get cdnBaseUrl(): string {
    return this.config.cdnBaseUrl;
  }

  get environment(): ResolvedRuntimeConfig['environment'] {
    return this.config.environment;
  }

  get demoAccounts(): Array<{ label: string; identity: string; password: string }> {
    return [
      { label: 'Admin Demo', identity: 'admin@example.com', password: 'Password1!' },
      { label: 'Customer Demo', identity: 'customer@example.com', password: 'Password1!' },
      { label: 'Branch Manager Demo', identity: 'branch.manager@example.com', password: 'Password1!' },
    ];
  }

  resolveAsset(path?: string | null, fallback = ''): string {
    if (!path || path === 'null' || path === '') {
      return fallback;
    }

    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    // Normalize: strip leading slash and redundant /storage prefix if present
    const cleanPath = path.replace(/^\//, '').replace(/^storage\//i, '');

    return `${this.cdnBaseUrl.replace(/\/$/, '')}/${cleanPath}`;
  }

  private resolveConfig(): ResolvedRuntimeConfig {
    const hostname = globalThis.location?.hostname ?? 'localhost';
    const protocol = globalThis.location?.protocol ?? 'http:';
    const origin = globalThis.location?.origin ?? 'http://localhost:4200';
    const isProduction =
      hostname.includes('restaurant-demo.ahmedsalah.dev') ||
      hostname.includes('api-restaurant-demo.ahmedsalah.dev') ||
      hostname.includes('restaurant-demo-api.ahmedsalah.dev') ||
      hostname.includes('cdn-restaurant-demo.ahmedsalah.dev');

    if (isProduction) {
      return {
        frontendBaseUrl: 'https://restaurant-demo.ahmedsalah.dev',
        apiBaseUrl: 'https://api-restaurant-demo.ahmedsalah.dev/v1',
        cdnBaseUrl: 'https://cdn-restaurant-demo.ahmedsalah.dev',
        environment: 'production',
      };
    }

    const baseOrigin = hostname === 'localhost' || hostname === '127.0.0.1' ? origin : `${protocol}//${hostname}`;

    return {
      frontendBaseUrl: baseOrigin,
      apiBaseUrl: 'http://127.0.0.1:8000/api/v1',
      cdnBaseUrl: 'http://127.0.0.1:8000/storage',
      environment: 'local',
    };
  }
}
