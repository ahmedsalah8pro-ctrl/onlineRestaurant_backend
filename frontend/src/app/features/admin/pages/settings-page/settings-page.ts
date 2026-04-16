import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { FontLibraryItem, PublicSettings, SettingsSchema } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

type SettingsTab = 'general' | 'branding' | 'typography' | 'localization' | 'commerce' | 'notifications' | 'uploads' | 'social' | 'security' | 'advanced';

@Component({
  selector: 'app-settings-page',
  imports: [SharedUiModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = inject(UiTextService);
  private readonly message = inject(MessageService);

  protected readonly schema = signal<SettingsSchema | null>(null);
  protected readonly groupValues = signal<Record<string, Record<string, unknown>>>({});
  protected readonly exportText = signal('');
  protected readonly importText = signal('');
  protected readonly activeTab = signal<SettingsTab>('general');

  protected readonly tabs = computed(() => [
    { key: 'general' as const, label: this.ui.t('admin.settings.general') },
    { key: 'branding' as const, label: this.ui.t('admin.settings.branding') },
    { key: 'typography' as const, label: this.ui.t('admin.settings.typography') },
    { key: 'localization' as const, label: this.ui.t('admin.settings.localization') },
    { key: 'social' as const, label: 'Social Login' },
    { key: 'security' as const, label: 'Security & Captcha' },
    { key: 'commerce' as const, label: this.ui.t('admin.settings.commerce') },
    { key: 'notifications' as const, label: this.ui.t('admin.settings.notifications') },
    { key: 'uploads' as const, label: this.ui.t('admin.settings.uploads') },
    { key: 'advanced' as const, label: this.ui.t('admin.settings.advanced') },
  ]);

  protected readonly fontDraft = signal<FontLibraryItem>({
    name: '',
    font_family: '',
    file_path: '',
    font_type: 'both',
    scope: 'shared',
    font_weight: '400',
    font_style: 'normal',
  });

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  protected async reload(): Promise<void> {
    const schema = await firstValueFrom(this.adminApi.getSettingsSchema());
    this.schema.set(schema);
    this.groupValues.set(
      Object.fromEntries(Object.entries(schema.groups).map(([group, details]) => [group, structuredClone(details.values)])),
    );
  }

  protected values(group: string): Record<string, unknown> {
    return this.groupValues()[group] ?? {};
  }

  protected updateValue(group: string, key: string, value: unknown): void {
    this.groupValues.set({
      ...this.groupValues(),
      [group]: {
        ...this.values(group),
        [key]: value,
      },
    });
  }

  protected paletteValue(key: string): string {
    const palette = (this.values('branding')['brand_palette'] as Record<string, string> | undefined) ?? {};
    return palette[key] ?? '#000000';
  }

  protected updatePalette(key: string, value: string): void {
    const current = (this.values('branding')['brand_palette'] as Record<string, string> | undefined) ?? {};
    this.updateValue('branding', 'brand_palette', { ...current, [key]: value });
  }

  protected taglineValue(locale: 'ar' | 'en'): string {
    const current = (this.values('branding')['brand_tagline'] as Record<string, string> | undefined) ?? {};
    return current[locale] ?? '';
  }

  protected updateTagline(locale: 'ar' | 'en', value: string): void {
    const current = (this.values('branding')['brand_tagline'] as Record<string, string> | undefined) ?? {};
    this.updateValue('branding', 'brand_tagline', { ...current, [locale]: value });
  }

  protected fontLibrary(): FontLibraryItem[] {
    return ((this.values('typography')['font_library'] as FontLibraryItem[] | undefined) ?? []).map((font) => ({
      font_type: 'both',
      scope: 'shared',
      font_weight: '400',
      font_style: 'normal',
      ...font,
    }));
  }

  protected async saveGroup(group: string): Promise<void> {
    await firstValueFrom(this.adminApi.updateSettingsGroup(group, this.values(group)));
    this.message.add({ severity: 'success', summary: this.ui.t('admin.settings.title'), detail: this.ui.t('admin.settings.saved') });
    await this.reload();
    this.theme.applyPublicSettings({
      ...Object.fromEntries(Object.entries(this.groupValues()).map(([key, value]) => [key, value])),
      schema_version: this.schema()?.version ?? 1,
    } as PublicSettings);
  }

  protected async resetGroup(group: string): Promise<void> {
    await firstValueFrom(this.adminApi.resetSettingsGroup(group));
    this.message.add({ severity: 'info', summary: this.ui.t('admin.settings.title'), detail: this.ui.t('admin.settings.resetDone') });
    await this.reload();
  }

  protected async exportAll(): Promise<void> {
    const payload = await firstValueFrom(this.adminApi.exportSettings());
    this.exportText.set(JSON.stringify(payload, null, 2));
  }

  protected async importAll(): Promise<void> {
    const payload = JSON.parse(this.importText() || '{}') as Record<string, unknown>;
    await firstValueFrom(this.adminApi.importSettings(payload));
    await this.reload();
  }

  protected async uploadAsset(event: Event, group: string, key: string, directory = 'branding'): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      return;
    }

    const result = await firstValueFrom(this.adminApi.upload(file, directory));
    this.updateValue(group, key, result.path);
  }

  protected async uploadFontFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      return;
    }

    const result = await firstValueFrom(this.adminApi.upload(file, 'fonts'));
    this.fontDraft.set({ ...this.fontDraft(), file_path: result.path, name: this.fontDraft().name || file.name });
  }

  protected addFont(): void {
    const draft = this.fontDraft();

    if (!draft.font_family || !draft.file_path) {
      return;
    }

    this.updateValue('typography', 'font_library', [...this.fontLibrary(), draft]);
    this.fontDraft.set({
      name: '',
      font_family: '',
      file_path: '',
      font_type: 'both',
      scope: 'shared',
      font_weight: '400',
      font_style: 'normal',
    });
  }

  protected removeFont(index: number): void {
    this.updateValue(
      'typography',
      'font_library',
      this.fontLibrary().filter((_, currentIndex) => currentIndex !== index),
    );
  }
}
