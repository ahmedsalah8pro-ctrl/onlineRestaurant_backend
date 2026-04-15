import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { FontLibraryItem, PublicSettings, TranslatedText } from '../models/api.models';
import { RuntimeConfigService } from './runtime-config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly localeKey = 'restaurant-demo.locale';
  private readonly fontStyleElementId = 'restaurant-demo-font-library';

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
    this.applyTypography(settings.typography?.font_library ?? [], settings.typography ?? {});

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

  private applyTypography(fontLibrary: FontLibraryItem[], typography: Record<string, unknown>): void {
    const root = this.document.documentElement;
    const isArabic = this.locale() === 'ar';

    const publicBody = isArabic
      ? String(typography['public_ar_body_font'] ?? 'Cairo')
      : String(typography['public_en_body_font'] ?? 'Inter');
    const publicHeading = isArabic
      ? String(typography['public_ar_heading_font'] ?? publicBody)
      : String(typography['public_en_heading_font'] ?? publicBody);
    const adminBody = isArabic
      ? String(typography['admin_ar_body_font'] ?? publicBody)
      : String(typography['admin_en_body_font'] ?? publicBody);
    const adminHeading = isArabic
      ? String(typography['admin_ar_heading_font'] ?? adminBody)
      : String(typography['admin_en_heading_font'] ?? adminBody);

    this.setCssVariable(root, '--public-body-font', `'${publicBody}', sans-serif`);
    this.setCssVariable(root, '--public-heading-font', `'${publicHeading}', sans-serif`);
    this.setCssVariable(root, '--admin-body-font', `'${adminBody}', sans-serif`);
    this.setCssVariable(root, '--admin-heading-font', `'${adminHeading}', sans-serif`);

    const rules = fontLibrary
      .filter((font) => font.file_path && font.font_family)
      .map((font) => {
        const url = this.runtime.resolveAsset(font.file_path ?? '');
        const weight = font.font_weight || '400';
        const style = font.font_style || 'normal';

        return `@font-face{font-family:'${font.font_family}';src:url('${url}') format('woff2');font-display:swap;font-style:${style};font-weight:${weight};}`;
      })
      .join('');

    let styleNode = this.document.getElementById(this.fontStyleElementId) as HTMLStyleElement | null;

    if (!styleNode) {
      styleNode = this.document.createElement('style');
      styleNode.id = this.fontStyleElementId;
      this.document.head.appendChild(styleNode);
    }

    styleNode.textContent = rules;
  }

  private setCssVariable(target: HTMLElement, variable: string, value: string): void {
    target.style.setProperty(variable, value);
  }

  private readLocale(): 'ar' | 'en' {
    const stored = localStorage.getItem(this.localeKey);
    return stored === 'en' ? 'en' : 'ar';
  }
}
