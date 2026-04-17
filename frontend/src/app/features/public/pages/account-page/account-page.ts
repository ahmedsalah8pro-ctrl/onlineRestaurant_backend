import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Address, Branch, DeliveryZone, NotificationItem, UserProfile } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
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
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly profile = signal<UserProfile | null>(null);
  protected readonly addresses = signal<Address[]>([]);
  protected readonly notifications = signal<NotificationItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly addressDialogVisible = signal(false);
  protected readonly editingAddressId = signal<number | null>(null);
  protected readonly selectedBranchId = signal<number | null>(null);
  protected readonly alternativePhoneModels = signal<string[]>([]);

  protected addressDraft = this.createEmptyAddress();

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
      this.message.add({ severity: 'success', summary: this.ui.t('account.profile'), detail: this.ui.t('account.profileSaved') });
    } finally {
      this.loading.set(false);
    }
  }

  protected async savePrivacy(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.updatePrivacy(this.profileDraft));
      await this.loadPage();
      this.message.add({ severity: 'success', summary: this.ui.t('account.privacy'), detail: this.ui.t('account.privacySaved') });
    } finally {
      this.loading.set(false);
    }
  }

  protected async setDefaultAddress(addressId: number): Promise<void> {
    await firstValueFrom(this.publicApi.setDefaultAddress(addressId));
    this.addresses.set(await firstValueFrom(this.publicApi.getAddresses()));
  }

  protected openCreateAddress(): void {
    const empty = this.createEmptyAddress();
    this.addressDraft = { ...empty } as any;
    this.alternativePhoneModels.set([]);
    this.editingAddressId.set(null);
    this.selectedBranchId.set(this.storefront.branches()[0]?.id ?? null);
    this.addressDialogVisible.set(true);
  }

  protected openEditAddress(address: Address): void {
    const pModels = [...(address.alternative_phones ?? [])];
    this.alternativePhoneModels.set(pModels);

    this.addressDraft = {
      ...this.createEmptyAddress(),
      label: address.label ?? '',
      recipient_name: address.recipient_name,
      phone: address.phone,
      alternative_phones: pModels,
      country: address.country ?? '',
      delivery_zone_id: address.delivery_zone_id,
      street: address.street ?? '',
      building: address.building ?? '',
      is_default: address.is_default,
    } as any;
    
    // Find branch of the zone
    const branch = this.storefront.branches().find((b: Branch) => b.delivery_zones?.some((z: DeliveryZone) => z.id === address.delivery_zone_id));
    if (branch) this.selectedBranchId.set(branch.id);
    
    this.editingAddressId.set(address.id);
    this.addressDialogVisible.set(true);
  }

  protected updateAltPhone(idx: number, val: string) {
    const cur = [...this.alternativePhoneModels()];
    cur[idx] = val;
    this.alternativePhoneModels.set(cur);
  }

  protected addAltPhone(): void {
    if (this.alternativePhoneModels().length < 3) {
      this.alternativePhoneModels.set([...this.alternativePhoneModels(), '']);
    }
  }

  protected removeAltPhone(index: number): void {
    const cur = [...this.alternativePhoneModels()];
    cur.splice(index, 1);
    this.alternativePhoneModels.set(cur);
  }

  protected onBranchChange(branchId: number): void {
    this.selectedBranchId.set(branchId);
    // Auto-select first delivery zone when branch changes
    const firstZone = this.storefront.branches().find((b: Branch) => b.id === branchId)?.delivery_zones?.[0];
    if (firstZone) this.addressDraft.delivery_zone_id = firstZone.id;
  }

  protected readonly zones = computed(() => {
    return this.storefront.branches().find((b: Branch) => b.id === this.selectedBranchId())?.delivery_zones ?? [];
  });

  protected async saveAddress(): Promise<void> {
    const addressId = this.editingAddressId();
    const payload = {
      ...this.addressDraft,
      alternative_phones: this.alternativePhoneModels().filter(p => !!p)
    };
    
    const response = addressId
      ? await firstValueFrom(this.publicApi.updateAddress(addressId, payload))
      : await firstValueFrom(this.publicApi.createAddress(payload));

    const next = [...this.addresses()];
    const index = next.findIndex((entry) => entry.id === response.id);

    if (index >= 0) {
      next[index] = response;
    } else {
      next.unshift(response);
    }

    this.addresses.set(next);
    this.addressDialogVisible.set(false);
    this.message.add({ severity: 'success', summary: this.ui.t('account.addresses'), detail: this.ui.t('account.addressSaved') });
  }

  protected confirmDeleteAddress(addressId: number): void {
    this.confirmation.confirm({
      header: this.ui.t('account.deleteAddressTitle'),
      message: this.ui.t('account.deleteAddressMessage'),
      acceptLabel: this.ui.t('account.delete'),
      rejectLabel: this.ui.t('account.setDefault'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => void this.deleteAddress(addressId),
    });
  }

  protected async deleteAddress(addressId: number): Promise<void> {
    await firstValueFrom(this.publicApi.deleteAddress(addressId));
    this.addresses.set(await firstValueFrom(this.publicApi.getAddresses()));
    this.message.add({ severity: 'success', summary: this.ui.t('account.addresses'), detail: this.ui.t('account.addressDeleted') });
  }

  protected async markAllRead(): Promise<void> {
    await firstValueFrom(this.publicApi.markAllNotificationsRead());
    this.notifications.set([]);
    this.message.add({ severity: 'success', summary: this.ui.t('account.notifications'), detail: this.ui.t('account.notificationsRead') });
  }

  private createEmptyAddress() {
    return {
      label: '',
      recipient_name: '',
      phone: '',
      alternative_phones: ['', '', ''],
      country: '',
      delivery_zone_id: null as number | null,
      street: '',
      is_default: false,
    };
  }
}
