import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SeoService } from '../../../../core/services/seo';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-home-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly storefront = inject(StorefrontService);
  protected readonly theme = inject(ThemeService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  protected readonly auth = inject(AuthService);
  private readonly seo = inject(SeoService);

  protected readonly capabilityCards = computed(() => [
    this.ui.t('home.capability.branches'),
    this.ui.t('home.capability.variants'),
    this.ui.t('home.capability.checkout'),
    this.ui.t('home.capability.branding'),
  ]);

  constructor() {
    effect(() => {
      const settings = this.storefront.settings();
      this.theme.locale();

      if (!settings) {
        return;
      }

      const siteName = settings.general?.site_name || 'Online Restaurant';
      const description =
        this.theme.resolveText(settings.seo?.default_meta_description) || this.ui.t('public.footerAbout');
      const image = settings.seo?.default_og_image_path
        ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
        : settings.branding?.cover_image_path
          ? this.runtime.resolveAsset(settings.branding.cover_image_path)
          : settings.branding?.logo_path
            ? this.runtime.resolveAsset(settings.branding.logo_path)
            : undefined;
      const socialLinks = Object.values(settings.branding?.social_links || {}).filter(
        (link): link is string => typeof link === 'string' && link.trim() !== '',
      );

      this.seo.applyPage({
        title: this.theme.resolveText(settings.seo?.default_meta_title) || siteName,
        description,
        image,
        url: this.runtime.frontendBaseUrl,
        type: 'website',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': ['Restaurant', 'Organization'],
          name: siteName,
          url: this.runtime.frontendBaseUrl,
          image,
          logo: settings.branding?.logo_path ? this.runtime.resolveAsset(settings.branding.logo_path) : image,
          description,
          telephone: settings.general?.support_phone || undefined,
          email: settings.general?.support_email || undefined,
          sameAs: socialLinks,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${this.runtime.frontendBaseUrl}/menu?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      });
    });
  }
}
