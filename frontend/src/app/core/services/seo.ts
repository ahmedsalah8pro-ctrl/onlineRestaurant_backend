import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PublicSettings } from '../models/api.models';
import { RuntimeConfigService } from './runtime-config';
import { ThemeService } from './theme';

export interface SeoPayload {
  title?: string;
  description?: string;
  image?: string | null;
  url?: string;
  type?: 'website' | 'product' | 'article';
  noIndex?: boolean;
  keywords?: string[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>> | null;
  productMeta?: {
    brand?: string;
    availability?: string;
    condition?: string;
    priceAmount?: number | string;
    priceCurrency?: string;
    retailerItemId?: string;
    itemGroupId?: string;
  } | null;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly theme = inject(ThemeService);

  private readonly jsonLdElementId = 'restaurant-demo-jsonld';
  private readonly googleTagSourceId = 'restaurant-demo-google-tag-src';
  private readonly googleTagInitId = 'restaurant-demo-google-tag-init';
  private readonly metaPixelInitId = 'restaurant-demo-meta-pixel-init';
  private readonly metaPixelNoscriptId = 'restaurant-demo-meta-pixel-noscript';
  private settings: PublicSettings | null = null;

  hydrateSettings(settings: PublicSettings | null): void {
    this.settings = settings;
    this.syncMarketingTags();
  }

  applyPage(payload: SeoPayload): void {
    const settings = this.settings;
    const siteName = settings?.general?.site_name || 'Online Restaurant';
    const defaultTitle = this.theme.resolveText(settings?.seo?.default_meta_title) || siteName;
    const defaultDescription =
      this.theme.resolveText(settings?.seo?.default_meta_description) || 'Restaurant ordering platform.';
    const defaultImage = settings?.seo?.default_og_image_path
      ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
      : settings?.branding?.cover_image_path
        ? this.runtime.resolveAsset(settings.branding.cover_image_path)
        : undefined;

    const resolvedTitle = payload.title?.trim() || defaultTitle;
    const resolvedDescription = payload.description?.trim() || defaultDescription;
    const resolvedImage = payload.image || defaultImage || `${this.runtime.frontendBaseUrl}/favicon.ico`;
    const resolvedUrl = payload.url || this.document.location.href;
    const resolvedType = payload.type || 'website';
    const locale = this.theme.locale();

    this.title.setTitle(resolvedTitle);

    this.updateName('description', resolvedDescription);
    this.updateName('robots', payload.noIndex ? 'noindex,nofollow' : (settings?.seo?.robots_indexing_enabled ? 'index,follow,max-image-preview:large' : 'noindex,nofollow'));
    this.updateName('twitter:card', 'summary_large_image');
    this.updateName('twitter:title', resolvedTitle);
    this.updateName('twitter:description', resolvedDescription);
    this.updateName('twitter:image', resolvedImage);
    this.updateName('theme-color', settings?.branding?.brand_palette?.primary || '#B22222');

    if (settings?.seo?.twitter_handle) {
      this.updateName('twitter:site', settings.seo.twitter_handle);
    }

    if (settings?.seo?.google_site_verification) {
      this.updateName('google-site-verification', settings.seo.google_site_verification);
    }

    if (settings?.seo?.bing_site_verification) {
      this.updateName('msvalidate.01', settings.seo.bing_site_verification);
    }

    if (payload.keywords && payload.keywords.length > 0) {
      this.updateName('keywords', payload.keywords.join(', '));
    }

    this.updateProperty('og:type', resolvedType);
    this.updateProperty('og:title', resolvedTitle);
    this.updateProperty('og:description', resolvedDescription);
    this.updateProperty('og:image', resolvedImage);
    this.updateProperty('og:image:secure_url', resolvedImage);
    this.updateProperty('og:url', resolvedUrl);
    this.updateProperty('og:site_name', siteName);
    this.updateProperty('og:locale', locale === 'ar' ? 'ar_AR' : 'en_US');
    this.syncProductMeta(payload.productMeta ?? null);

    this.setCanonicalUrl(resolvedUrl);
    this.setStructuredData(payload.structuredData ?? null);
  }

  private updateName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name='${name}'`);
  }

  private updateProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property='${property}'`);
  }

  private setCanonicalUrl(url: string): void {
    let link = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.href = url;
  }

  private setStructuredData(data: SeoPayload['structuredData']): void {
    const existing = this.document.getElementById(this.jsonLdElementId);

    if (data === null || data === undefined) {
      existing?.remove();
      return;
    }

    const payload = Array.isArray(data) ? data : [data];
    const script = existing ?? this.document.createElement('script');
    script.id = this.jsonLdElementId;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(payload, null, 2);

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }

  private syncProductMeta(meta: SeoPayload['productMeta']): void {
    const properties = [
      'product:brand',
      'product:availability',
      'product:condition',
      'product:price:amount',
      'product:price:currency',
      'product:retailer_item_id',
      'product:item_group_id',
    ];

    if (!meta) {
      properties.forEach((property) => this.meta.removeTag(`property='${property}'`));
      return;
    }

    const mappings: Array<[string, string | number | undefined | null]> = [
      ['product:brand', meta.brand],
      ['product:availability', meta.availability],
      ['product:condition', meta.condition],
      ['product:price:amount', meta.priceAmount],
      ['product:price:currency', meta.priceCurrency],
      ['product:retailer_item_id', meta.retailerItemId],
      ['product:item_group_id', meta.itemGroupId],
    ];

    mappings.forEach(([property, value]) => {
      if (value === undefined || value === null || value === '') {
        this.meta.removeTag(`property='${property}'`);
        return;
      }

      this.updateProperty(property, String(value));
    });
  }

  private syncMarketingTags(): void {
    const googleTagId = this.settings?.seo?.google_tag_id?.trim() || '';
    const metaPixelId = this.settings?.seo?.meta_pixel_id?.trim() || '';

    if (googleTagId !== '') {
      this.upsertExternalScript(
        this.googleTagSourceId,
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`,
      );
      this.upsertInlineScript(
        this.googleTagInitId,
        [
          'window.dataLayer = window.dataLayer || [];',
          'function gtag(){dataLayer.push(arguments);}',
          "gtag('js', new Date());",
          `gtag('config', ${JSON.stringify(googleTagId)});`,
        ].join('\n'),
      );
    } else {
      this.removeElementById(this.googleTagSourceId);
      this.removeElementById(this.googleTagInitId);
    }

    if (metaPixelId !== '') {
      this.upsertInlineScript(
        this.metaPixelInitId,
        [
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?",
          "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;",
          "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;",
          "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}",
          "(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');",
          `fbq('init', ${JSON.stringify(metaPixelId)});`,
          "fbq('track', 'PageView');",
        ].join('\n'),
      );
      this.upsertNoscriptPixel(metaPixelId);
    } else {
      this.removeElementById(this.metaPixelInitId);
      this.removeElementById(this.metaPixelNoscriptId);
    }
  }

  private upsertExternalScript(id: string, src: string): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.async = true;
      this.document.head.appendChild(script);
    }

    script.src = src;
  }

  private upsertInlineScript(id: string, content: string): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      this.document.head.appendChild(script);
    }

    script.textContent = content;
  }

  private upsertNoscriptPixel(pixelId: string): void {
    let wrapper = this.document.getElementById(this.metaPixelNoscriptId) as HTMLElement | null;

    if (!wrapper) {
      wrapper = this.document.createElement('noscript');
      wrapper.id = this.metaPixelNoscriptId;
      this.document.body.appendChild(wrapper);
    }

    wrapper.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1" alt="">`;
  }

  private removeElementById(id: string): void {
    this.document.getElementById(id)?.remove();
  }
}
