import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Wallet, WalletTransaction } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
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

  protected async redeem(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.redeemGiftCard(this.redeemCode()));
      await this.loadWallet();
    } finally {
      this.loading.set(false);
    }
  }
}
