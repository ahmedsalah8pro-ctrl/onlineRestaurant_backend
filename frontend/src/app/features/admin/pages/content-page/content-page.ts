import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { DEFAULT_CATALOG_PAYLOADS } from '../../../../shared/demo-payloads';

@Component({
  selector: 'app-content-page',
  imports: [SharedUiModule],
  templateUrl: './content-page.html',
  styleUrl: './content-page.scss',
})
export class ContentPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly pages = signal<Array<Record<string, unknown>>>([]);
  protected readonly reviews = signal<Array<Record<string, unknown>>>([]);
  protected readonly pageDialogVisible = signal(false);
  protected readonly pagePayloadText = signal(JSON.stringify(DEFAULT_CATALOG_PAYLOADS['pages'], null, 2));
  protected readonly editingPageId = signal<number | null>(null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  protected async reload(): Promise<void> {
    const [pages, reviews] = await Promise.all([
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('pages')),
      firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('reviews')),
    ]);

    this.pages.set(pages);
    this.reviews.set(reviews);
  }

  protected editPage(record?: Record<string, unknown>): void {
    this.editingPageId.set(record ? Number(record['id']) : null);
    this.pagePayloadText.set(JSON.stringify(record ?? DEFAULT_CATALOG_PAYLOADS['pages'], null, 2));
    this.pageDialogVisible.set(true);
  }

  protected async savePage(): Promise<void> {
    const payload = JSON.parse(this.pagePayloadText() || '{}') as Record<string, unknown>;

    if (this.editingPageId()) {
      await firstValueFrom(this.adminApi.updateResource('pages', this.editingPageId()!, payload));
    } else {
      await firstValueFrom(this.adminApi.createResource('pages', payload));
    }

    this.pageDialogVisible.set(false);
    await this.reload();
  }

  protected async toggleReview(review: Record<string, unknown>, visible: boolean): Promise<void> {
    await firstValueFrom(this.adminApi.updateResource('reviews', Number(review['id']), { is_visible: visible }));
    await this.reload();
  }
}
