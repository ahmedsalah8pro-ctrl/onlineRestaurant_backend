import { Component, OnInit, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Wallet, WalletTransaction } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-wallet-page',
  imports: [SharedUiModule],
  templateUrl: './wallet-page.html',
  styleUrl: './wallet-page.scss',
})
export class WalletPage implements OnInit {
  protected readonly publicApi = inject(PublicApiService);
  protected readonly storefront = inject(StorefrontService);
  protected readonly ui = inject(UiTextService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly wallet = signal<Wallet | null>(null);
  protected readonly transactions = signal<WalletTransaction[]>([]);
  protected readonly redeemCode = signal('GIFT100');
  protected readonly loading = signal(false);

  async ngOnInit(): Promise<void> {
    await this.loadWallet();
  }

  protected async loadWallet(): Promise<void> {
    const [wallet, transactions] = await Promise.all([
      firstValueFrom(this.publicApi.getWallet()),
      firstValueFrom(this.publicApi.getWalletTransactions()),
    ]);

    this.wallet.set(wallet);
    this.transactions.set(transactions.items);
  }

  protected confirmRedeem(): void {
    this.confirmation.confirm({
      header: this.ui.t('wallet.confirmTitle'),
      message: this.ui.t('wallet.confirmMessage'),
      acceptLabel: this.ui.t('wallet.redeem'),
      rejectLabel: this.ui.t('account.delete'),
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => void this.redeem(),
    });
  }

  protected async redeem(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.redeemGiftCard(this.redeemCode()));
      await this.loadWallet();
      this.message.add({
        severity: 'success',
        summary: this.ui.t('wallet.eyebrow'),
        detail: this.ui.t('wallet.redeemSuccess'),
      });
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.ui.t('wallet.eyebrow'),
        detail: this.ui.t('wallet.redeemFailed'),
      });
    } finally {
      this.loading.set(false);
    }
  }
}
