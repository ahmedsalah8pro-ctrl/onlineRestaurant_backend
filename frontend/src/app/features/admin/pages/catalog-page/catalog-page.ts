import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminApiService } from '../../../../core/services/admin-api';
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

  protected readonly sections = ['products', 'categories', 'tags', 'branches', 'delivery-zones', 'coupons', 'gift-cards'];
  protected readonly activeSection = signal('products');
  protected readonly records = signal<Record<string, Array<Record<string, unknown>>>>({});
  protected readonly dialogVisible = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected readonly payloadText = signal('');

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

  protected openCreate(section: string): void {
    this.activeSection.set(section);
    this.editingId.set(null);
    this.payloadText.set(JSON.stringify(DEFAULT_CATALOG_PAYLOADS[section] ?? {}, null, 2));
    this.dialogVisible.set(true);
  }

  protected openEdit(section: string, record: Record<string, unknown>): void {
    this.activeSection.set(section);
    this.editingId.set(Number(record['id']));
    this.payloadText.set(JSON.stringify(record, null, 2));
    this.dialogVisible.set(true);
  }

  protected async save(): Promise<void> {
    const payload = JSON.parse(this.payloadText() || '{}') as Record<string, unknown>;
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

  protected pretty(record: Record<string, unknown>): string {
    return JSON.stringify(record, null, 2);
  }

  protected recordId(record: Record<string, unknown>): number {
    return Number(record['id']);
  }
}
