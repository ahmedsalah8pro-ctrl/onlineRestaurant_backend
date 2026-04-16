import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { DEFAULT_CATALOG_PAYLOADS } from '../../../../shared/demo-payloads';

interface BranchOption { id: number; label: string; }

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
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

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

  // Delivery zone branch filter
  protected readonly branchOptions = signal<BranchOption[]>([]);
  protected readonly selectedFilterBranchId = signal<number | null>(null);

  /** Parsed payload object, kept in sync with payloadText */
  private readonly formPayload = signal<Record<string, unknown>>({});

  protected readonly isDeliveryZones = computed(() => this.activeSection() === 'delivery-zones');

  protected readonly filteredRecords = computed(() => {
    const all = this.records()[this.activeSection()] ?? [];
    if (!this.isDeliveryZones()) return all;
    const branchId = this.selectedFilterBranchId();
    if (branchId === null) return all;
    return all.filter(r => Number(r['branch_id']) === branchId);
  });

  protected readonly dialogTitle = computed(() => {
    const label = this.activeLabel();
    return this.editingId() ? `تعديل: ${label}` : `إضافة: ${label}`;
  });

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadSection(this.activeSection()), this.loadBranches()]);
  }

  private async loadBranches(): Promise<void> {
    try {
      const branches = await firstValueFrom(
        this.adminApi.listResource<Record<string, unknown>>('branches'),
      );
      this.branchOptions.set(
        branches.map(b => ({
          id: Number(b['id']),
          label: this.theme.resolveText((b['name'] as never) ?? b['slug'] ?? `Branch ${b['id']}`),
        })),
      );
    } catch {
      // ignore
    }
  }

  protected async loadSection(section: string): Promise<void> {
    const data = await firstValueFrom(this.adminApi.listResource<Record<string, unknown>>(section));
    this.records.set({
      ...this.records(),
      [section]: data,
    });
    this.activeSection.set(section);
    if (section === 'delivery-zones') {
      this.selectedFilterBranchId.set(null);
    }
  }

  protected activeLabel(): string {
    return this.sections.find((section) => section.key === this.activeSection())?.label ?? this.activeSection();
  }

  protected openCreate(section: string): void {
    this.activeSection.set(section);
    this.editingId.set(null);
    const defaults: Record<string, unknown> = { ...(DEFAULT_CATALOG_PAYLOADS[section] ?? {}) };
    // Pre-fill branch_id from filter if on delivery zones
    if (section === 'delivery-zones' && this.selectedFilterBranchId() !== null) {
      defaults['branch_id'] = this.selectedFilterBranchId();
    } else if (section === 'delivery-zones' && this.branchOptions().length > 0) {
      defaults['branch_id'] = this.branchOptions()[0].id;
    }
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

  protected readonly mediaTypes = [
    { label: 'صورة مجزأة / Image', value: 'image' },
    { label: 'فيديو / Video', value: 'video' },
    { label: 'يوتيوب / YouTube', value: 'external_video' }
  ];

  protected mediaList(): Array<{ url: string; media_type: string }> {
    const list = this.formPayload()['media'] as Array<{ url: string; media_type: string }>;
    return Array.isArray(list) ? list : [];
  }

  protected updateMediaList(): void {
    this.setFieldValue('media', [...this.mediaList()]);
  }

  protected addMediaItem(): void {
    const current = this.mediaList();
    current.push({ url: '', media_type: 'image' });
    this.setFieldValue('media', current);
  }

  protected removeMedia(index: number): void {
    const current = this.mediaList();
    current.splice(index, 1);
    this.setFieldValue('media', current);
  }

  protected async uploadMainImage(event: any): Promise<void> {
    const file = event.files[0];
    if (!file) return;
    try {
      const result = await firstValueFrom(this.adminApi.upload(file, 'catalog'));
      this.setFieldValue('main_image_path', result.url || result.path);
    } catch {
      // Ignore err
    }
    event.options.clear();
  }

  protected async uploadSubMedia(event: any): Promise<void> {
    const file = event.files[0];
    if (!file) return;
    try {
      const result = await firstValueFrom(this.adminApi.upload(file, 'catalog-media'));
      const current = this.mediaList();
      current.push({ url: result.url || result.path, media_type: file.type.startsWith('video') ? 'video' : 'image' });
      this.setFieldValue('media', current);
    } catch {
      // Ignore err
    }
    event.options.clear();
  }

  protected async save(): Promise<void> {
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

  protected confirmRemove(section: string, id: number): void {
    const title = this.ui.t('admin.catalog.delete');
    const msg =
      this.ui.t('admin.catalog.deleteConfirm') !== 'admin.catalog.deleteConfirm'
        ? this.ui.t('admin.catalog.deleteConfirm')
        : 'هل أنت متأكد أنك تريد حذف هذا العنصر؟';

    this.confirm.confirm({
      header: title,
      message: msg,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.ui.t('admin.catalog.delete'),
      rejectLabel:
        this.ui.t('admin.catalog.cancel') !== 'admin.catalog.cancel' ? this.ui.t('admin.catalog.cancel') : 'إلغاء',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: async () => {
        try {
          await firstValueFrom(this.adminApi.deleteResource(section, id));
          await this.loadSection(section);
          this.message.add({
            severity: 'success',
            summary: title,
            detail:
              this.ui.t('admin.catalog.deleted') !== 'admin.catalog.deleted'
                ? this.ui.t('admin.catalog.deleted')
                : 'تم الحذف بنجاح.',
          });
        } catch {
          this.message.add({
            severity: 'error',
            summary: title,
            detail: 'تعذر الحذف الآن.',
          });
        }
      },
    });
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

  /** Get branch label for a delivery zone record */
  protected branchLabel(record: Record<string, unknown>): string {
    const branchId = Number(record['branch_id']);
    const branch = record['branch'] as Record<string, unknown> | undefined;
    if (branch) {
      const nameObj = branch['name'];
      if (nameObj && typeof nameObj === 'object') return this.theme.resolveText(nameObj as never);
      if (typeof nameObj === 'string') return nameObj;
    }
    const opt = this.branchOptions().find(b => b.id === branchId);
    return opt?.label ?? `فرع ${branchId}`;
  }
}
