import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { DEFAULT_CATALOG_PAYLOADS } from '../../../../shared/demo-payloads';

@Component({
  selector: 'app-catalog-page',
  imports: [SharedUiModule],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);

  protected readonly sections = [
    { key: 'products', label: 'المنتجات' },
    { key: 'categories', label: 'الأقسام' },
    { key: 'tags', label: 'الوسوم' },
    { key: 'branches', label: 'الفروع' },
    { key: 'delivery-zones', label: 'مناطق التوصيل' },
    { key: 'coupons', label: 'الكوبونات' },
    { key: 'gift-cards', label: 'بطاقات الهدايا' },
  ];

  protected readonly activeSection = signal('products');
  protected readonly records = signal<Record<string, Array<Record<string, unknown>>>>({});
  protected readonly dialogVisible = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected readonly payloadText = signal('');

  /** Parsed payload object, kept in sync with payloadText */
  private readonly formPayload = signal<Record<string, unknown>>({});

  protected readonly dialogTitle = computed(() => {
    const label = this.activeLabel();
    return this.editingId() ? `تعديل: ${label}` : `إضافة: ${label}`;
  });

  async ngOnInit(): Promise<void> {
    await this.loadSection(this.activeSection());
  }

  protected async loadSection(section: string): Promise<void> {
    const data = await firstValueFrom(this.adminApi.listResource<Record<string, unknown>>(section));
    this.records.set({
      ...this.records(),
      [section]: data,
    });
    this.activeSection.set(section);
  }

  protected activeLabel(): string {
    return this.sections.find((section) => section.key === this.activeSection())?.label ?? this.activeSection();
  }

  protected openCreate(section: string): void {
    this.activeSection.set(section);
    this.editingId.set(null);
    const defaults = DEFAULT_CATALOG_PAYLOADS[section] ?? {};
    this.formPayload.set(JSON.parse(JSON.stringify(defaults)));
    this.payloadText.set(JSON.stringify(defaults, null, 2));
    this.dialogVisible.set(true);
  }

  protected openEdit(section: string, record: Record<string, unknown>): void {
    this.activeSection.set(section);
    this.editingId.set(Number(record['id']));
    this.formPayload.set(JSON.parse(JSON.stringify(record)));
    this.payloadText.set(JSON.stringify(record, null, 2));
    this.dialogVisible.set(true);
  }

  /** Check if a top-level field exists in the current payload */
  protected hasField(field: string): boolean {
    return field in this.formPayload();
  }

  /** Get top-level field value */
  protected getFieldValue(field: string): unknown {
    return this.formPayload()[field];
  }

  /** Set top-level field value and sync JSON text */
  protected setFieldValue(field: string, value: unknown): void {
    const updated = { ...this.formPayload(), [field]: value };
    this.formPayload.set(updated);
    this.payloadText.set(JSON.stringify(updated, null, 2));
  }

  /** Get nested field value like name.ar */
  protected getNestedValue(field: string, locale: string): unknown {
    const obj = this.formPayload()[field];
    if (obj && typeof obj === 'object') {
      return (obj as Record<string, unknown>)[locale];
    }
    return '';
  }

  /** Set nested field value like name.ar and sync JSON text */
  protected setNestedValue(field: string, locale: string, value: unknown): void {
    const existing = (this.formPayload()[field] ?? {}) as Record<string, unknown>;
    const updated = {
      ...this.formPayload(),
      [field]: { ...existing, [locale]: value },
    };
    this.formPayload.set(updated);
    this.payloadText.set(JSON.stringify(updated, null, 2));
  }

  protected async save(): Promise<void> {
    // Merge JSON textarea (advanced) back with form payload
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(this.payloadText() || '{}') as Record<string, unknown>;
    } catch {
      payload = this.formPayload();
    }

    const section = this.activeSection();
    const editingId = this.editingId();

    if (editingId) {
      await firstValueFrom(this.adminApi.updateResource(section, editingId, payload));
    } else {
      await firstValueFrom(this.adminApi.createResource(section, payload));
    }

    this.dialogVisible.set(false);
    await this.loadSection(section);
  }

  protected async remove(section: string, id: number): Promise<void> {
    await firstValueFrom(this.adminApi.deleteResource(section, id));
    await this.loadSection(section);
  }

  protected recordId(record: Record<string, unknown>): number {
    return Number(record['id']);
  }

  protected displayName(record: Record<string, unknown>): string {
    const translated = record['translations'];
    if (translated && typeof translated === 'object') {
      return this.theme.resolveText(translated as never);
    }

    if (typeof record['name'] === 'string') {
      return String(record['name']);
    }

    const nameObj = record['name'];
    if (nameObj && typeof nameObj === 'object') {
      return this.theme.resolveText(nameObj as never);
    }

    if (typeof record['title'] === 'string') {
      return String(record['title']);
    }

    const titleObj = record['title'];
    if (titleObj && typeof titleObj === 'object') {
      return this.theme.resolveText(titleObj as never);
    }

    return `#${this.recordId(record)}`;
  }

  protected displayMeta(record: Record<string, unknown>): string {
    const parts = [record['slug'], record['code'], record['phone'], record['delivery_fee']]
      .filter((value) => value !== null && value !== undefined && value !== '')
      .map((value) => String(value));

    return parts.join(' • ');
  }
}
