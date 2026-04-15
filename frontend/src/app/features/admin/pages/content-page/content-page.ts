import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
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
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);

  protected readonly pages = signal<Array<Record<string, unknown>>>([]);
  protected readonly reviews = signal<Array<Record<string, unknown>>>([]);
  protected readonly pageDialogVisible = signal(false);
  protected readonly pagePayloadText = signal(JSON.stringify(DEFAULT_CATALOG_PAYLOADS['pages'], null, 2));
  protected readonly editingPageId = signal<number | null>(null);

  /** Parsed form payload for the page editor */
  private readonly pageFormPayload = signal<Record<string, unknown>>(
    JSON.parse(JSON.stringify(DEFAULT_CATALOG_PAYLOADS['pages'])),
  );

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
    const payload = record ?? DEFAULT_CATALOG_PAYLOADS['pages'];
    this.pageFormPayload.set(JSON.parse(JSON.stringify(payload)));
    this.pagePayloadText.set(JSON.stringify(payload, null, 2));
    this.pageDialogVisible.set(true);
  }

  /** Get top-level page field value */
  protected getPageField(field: string): unknown {
    return this.pageFormPayload()[field];
  }

  /** Set top-level page field value */
  protected setPageField(field: string, value: unknown): void {
    const updated = { ...this.pageFormPayload(), [field]: value };
    this.pageFormPayload.set(updated);
    this.pagePayloadText.set(JSON.stringify(updated, null, 2));
  }

  /** Get nested page field like title.ar */
  protected getPageNested(field: string, locale: string): unknown {
    const obj = this.pageFormPayload()[field];
    if (obj && typeof obj === 'object') {
      return (obj as Record<string, unknown>)[locale];
    }
    return '';
  }

  /** Set nested page field */
  protected setPageNested(field: string, locale: string, value: unknown): void {
    const existing = (this.pageFormPayload()[field] ?? {}) as Record<string, unknown>;
    const updated = {
      ...this.pageFormPayload(),
      [field]: { ...existing, [locale]: value },
    };
    this.pageFormPayload.set(updated);
    this.pagePayloadText.set(JSON.stringify(updated, null, 2));
  }

  /** Resolve translated text using theme service */
  protected resolveText(value: unknown): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return this.theme.resolveText(value as never) || '';
    }
    return String(value);
  }

  /** Star rating helpers */
  protected starsArray(rating: unknown): number[] {
    const n = Math.round(Number(rating) || 0);
    return Array(Math.min(Math.max(n, 0), 5)).fill(0);
  }

  protected emptyStarsArray(rating: unknown): number[] {
    const n = Math.round(Number(rating) || 0);
    return Array(Math.max(5 - n, 0)).fill(0);
  }

  protected async savePage(): Promise<void> {
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(this.pagePayloadText() || '{}') as Record<string, unknown>;
    } catch {
      payload = this.pageFormPayload();
    }

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
