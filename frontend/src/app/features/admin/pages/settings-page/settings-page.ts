import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SettingsSchema } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { ThemeService } from '../../../../core/services/theme';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-settings-page',
  imports: [SharedUiModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly theme = inject(ThemeService);

  protected readonly schema = signal<SettingsSchema | null>(null);
  protected readonly editors = signal<Record<string, string>>({});
  protected readonly exportText = signal('');
  protected readonly importText = signal('');

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  protected async reload(): Promise<void> {
    const schema = await firstValueFrom(this.adminApi.getSettingsSchema());
    this.schema.set(schema);
    this.editors.set(
      Object.fromEntries(
        Object.entries(schema.groups).map(([group, details]) => [group, JSON.stringify(details.values, null, 2)]),
      ),
    );
  }

  protected async saveGroup(group: string): Promise<void> {
    const payload = JSON.parse(this.editors()[group] ?? '{}') as Record<string, unknown>;
    const updated = await firstValueFrom(this.adminApi.updateSettingsGroup(group, payload));
    this.editors.set({
      ...this.editors(),
      [group]: JSON.stringify(updated, null, 2),
    });
  }

  protected async resetGroup(group: string): Promise<void> {
    const reset = await firstValueFrom(this.adminApi.resetSettingsGroup(group));
    this.editors.set({
      ...this.editors(),
      [group]: JSON.stringify(reset, null, 2),
    });
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

  protected updateEditor(group: string, value: string): void {
    this.editors.set({
      ...this.editors(),
      [group]: value,
    });
  }
}
