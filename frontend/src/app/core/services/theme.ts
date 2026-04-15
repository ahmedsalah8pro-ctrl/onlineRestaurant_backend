import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { PublicSettings, TranslatedText } from '../models/api.models';
import { RuntimeConfigService } from './runtime-config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly localeKey = 'restaurant-demo.locale';

  readonly locale = signal<'ar' | 'en'>(this.readLocale());

  setLocale(locale: 'ar' | 'en'): void {
    this.locale.set(locale);
    localStorage.setItem(this.localeKey, locale);
    this.applyLanguageAttributes();
  }

  resolveText(value?: TranslatedText | string | null): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return value[this.locale()] ?? value.ar ?? value.en ?? '';
  }

  applyPublicSettings(settings: PublicSettings | null): void {
    if (!settings) {
      return;
    }

    const palette = settings.branding?.brand_palette ?? {};
    const tokens = settings.theme?.theme_json?.tokens ?? {};
    const root = this.document.documentElement;

    this.setCssVariable(root, '--brand-primary', palette.primary ?? tokens['primary'] ?? '#B22222');
    this.setCssVariable(root, '--brand-secondary', palette.secondary ?? tokens['secondary'] ?? '#111827');
    this.setCssVariable(root, '--brand-accent', palette.accent ?? '#F59E0B');
    this.setCssVariable(root, '--brand-surface', palette.surface ?? tokens['surface'] ?? '#FFF7ED');
    this.setCssVariable(root, '--brand-radius', tokens['radius'] ?? '16px');

    const defaultLocale = (settings.localization?.default_locale as 'ar' | 'en' | undefined) ?? this.locale();
    this.setLocale(defaultLocale);

    const title = this.resolveText(settings.seo?.default_meta_title) || settings.general?.site_name || 'Restaurant Demo';
    this.document.title = title;

    const favicon = settings.branding?.favicon_path
      ? this.runtime.resolveAsset(settings.branding.favicon_path)
      : undefined;

    if (favicon) {
      let link = this.document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

      if (!link) {
        link = this.document.createElement('link');
        link.rel = 'icon';
        this.document.head.appendChild(link);
      }

      link.href = favicon;
    }

    this.applyLanguageAttributes();
  }

  private applyLanguageAttributes(): void {
    const locale = this.locale();
    this.document.documentElement.lang = locale;
    this.document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    this.document.body.setAttribute('data-locale', locale);
  }

  private setCssVariable(target: HTMLElement, variable: string, value: string): void {
    target.style.setProperty(variable, value);
  }

  private readLocale(): 'ar' | 'en' {
    const stored = localStorage.getItem(this.localeKey);
    return stored === 'en' ? 'en' : 'ar';
  }
}
