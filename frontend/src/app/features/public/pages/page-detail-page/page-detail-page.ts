import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DynamicPage } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SeoService } from '../../../../core/services/seo';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-page-detail-page',
  imports: [SharedUiModule],
  templateUrl: './page-detail-page.html',
  styleUrl: './page-detail-page.scss',
})
export class PageDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly publicApi = inject(PublicApiService);
  private readonly runtime = inject(RuntimeConfigService);
  private readonly seo = inject(SeoService);
  private readonly storefront = inject(StorefrontService);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = inject(UiTextService);

  protected readonly page = signal<DynamicPage | null>(null);

  constructor() {
    effect(() => {
      const current = this.page();
      const settings = this.storefront.settings();
      this.theme.locale();

      if (!current || !settings) {
        return;
      }

      const title = `${current.title} | ${settings.general?.site_name || 'Online Restaurant'}`;
      const description = (current.content || '').slice(0, 260) || current.title;
      const image = settings.seo?.default_og_image_path
        ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
        : settings.branding?.cover_image_path
          ? this.runtime.resolveAsset(settings.branding.cover_image_path)
          : undefined;
      const pageUrl = `${this.runtime.frontendBaseUrl}/pages/${current.slug}`;

      this.seo.applyPage({
        title,
        description,
        image,
        url: pageUrl,
        type: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: current.title,
          url: pageUrl,
          description,
        },
      });
    });
  }

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'terms-of-service';
    this.page.set(await firstValueFrom(this.publicApi.getDynamicPage(slug)));
  }
}
