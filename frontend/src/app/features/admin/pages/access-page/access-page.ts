import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminRoleIndex } from '../../../../core/models/api.models';
import { AdminApiService } from '../../../../core/services/admin-api';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-access-page',
  imports: [SharedUiModule],
  templateUrl: './access-page.html',
  styleUrl: './access-page.scss',
})
export class AccessPage implements OnInit {
  protected readonly adminApi = inject(AdminApiService);
  protected readonly index = signal<AdminRoleIndex | null>(null);
  protected readonly form = {
    id: null as number | null,
    name: '',
    permissionsText: '',
  };

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  protected async reload(): Promise<void> {
    this.index.set(await firstValueFrom(this.adminApi.getRolesIndex()));
  }

  protected editRole(role: { id: number; name: string; permissions: Array<{ name: string }> }): void {
    this.form.id = role.id;
    this.form.name = role.name;
    this.form.permissionsText = role.permissions.map((permission) => permission.name).join('\n');
  }

  protected async saveRole(): Promise<void> {
    const permissions = this.form.permissionsText
      .split(/\r?\n|,/)
      .map((value) => value.trim())
      .filter(Boolean);

    if (this.form.id) {
      await firstValueFrom(this.adminApi.updateRole(this.form.id, { name: this.form.name, permissions }));
    } else {
      await firstValueFrom(this.adminApi.createRole({ name: this.form.name, permissions }));
    }

    this.form.id = null;
    this.form.name = '';
    this.form.permissionsText = '';
    await this.reload();
  }

  protected async removeRole(roleId: number): Promise<void> {
    await firstValueFrom(this.adminApi.deleteRole(roleId));
    await this.reload();
  }
}
