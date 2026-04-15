import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Address, NotificationItem, UserProfile } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-account-page',
  imports: [SharedUiModule],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage implements OnInit {
  protected readonly publicApi = inject(PublicApiService);
  protected readonly runtime = inject(RuntimeConfigService);

  protected readonly profile = signal<UserProfile | null>(null);
  protected readonly addresses = signal<Address[]>([]);
  protected readonly notifications = signal<NotificationItem[]>([]);
  protected readonly loading = signal(false);

  protected profileDraft = {
    name: '',
    username: '',
    email: '',
    primary_phone: '',
    bio: '',
    is_public_profile: true,
    show_total_orders: true,
    show_total_spent: true,
    show_monthly_rank: true,
    show_yearly_rank: true,
    show_favorite_products: true,
  };

  async ngOnInit(): Promise<void> {
    await this.loadPage();
  }

  protected async loadPage(): Promise<void> {
    const [profile, addresses, notifications] = await Promise.all([
      firstValueFrom(this.publicApi.getProfile()),
      firstValueFrom(this.publicApi.getAddresses()),
      firstValueFrom(this.publicApi.getNotifications()),
    ]);

    this.profile.set(profile);
    this.addresses.set(addresses);
    this.notifications.set(notifications.items);
    this.profileDraft = {
      ...this.profileDraft,
      name: profile.user.name,
      username: profile.user.username,
      email: profile.user.email ?? '',
      primary_phone: profile.user.primary_phone,
      is_public_profile: profile.user.profile?.is_public_profile ?? true,
    };
  }

  protected async saveProfile(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.updateProfile(this.profileDraft));
      await this.loadPage();
    } finally {
      this.loading.set(false);
    }
  }

  protected async savePrivacy(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.updatePrivacy(this.profileDraft));
      await this.loadPage();
    } finally {
      this.loading.set(false);
    }
  }

  protected async setDefaultAddress(addressId: number): Promise<void> {
    await firstValueFrom(this.publicApi.setDefaultAddress(addressId));
    this.addresses.set(await firstValueFrom(this.publicApi.getAddresses()));
  }

  protected async deleteAddress(addressId: number): Promise<void> {
    await firstValueFrom(this.publicApi.deleteAddress(addressId));
    this.addresses.set(await firstValueFrom(this.publicApi.getAddresses()));
  }

  protected async markAllRead(): Promise<void> {
    await firstValueFrom(this.publicApi.markAllNotificationsRead());
    this.notifications.set([]);
  }
}
