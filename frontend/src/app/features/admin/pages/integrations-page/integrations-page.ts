import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UploadResult } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-integrations-page',
  imports: [SharedUiModule],
  templateUrl: './integrations-page.html',
  styleUrl: './integrations-page.scss',
})
export class IntegrationsPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly uploadResult = signal<UploadResult | null>(null);
  protected readonly auditLogs = signal<Array<Record<string, unknown>>>([]);
  protected readonly directory = signal('branding');

  async ngOnInit(): Promise<void> {
    this.auditLogs.set(await firstValueFrom(this.adminApi.listResource<Record<string, unknown>>('audit-logs')));
  }

  protected async upload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      return;
    }

    this.uploadResult.set(await firstValueFrom(this.adminApi.upload(file, this.directory())));
  }
}
