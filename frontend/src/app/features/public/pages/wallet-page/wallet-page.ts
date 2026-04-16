import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Wallet, WalletTransaction } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { StorefrontService } from '../../../../core/services/storefront';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

type WalletSection = 'home' | 'transactions' | 'transaction-detail' | 'giftcard' | 'deposit';

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
  protected readonly router = inject(Router);
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);
  private readonly route = inject(ActivatedRoute);

  protected readonly wallet = signal<Wallet | null>(null);
  protected readonly transactions = signal<WalletTransaction[]>([]);
  protected readonly selectedTransaction = signal<WalletTransaction | null>(null);
  protected readonly redeemCode = signal('');
  protected readonly loading = signal(false);
  protected readonly page = signal(1);
  protected readonly total = signal(0);
  protected readonly rows = signal(10);

  // Deposit form state
  protected readonly depositAmount = signal<number | null>(null);
  protected readonly depositMethod = signal<string>('card');
  protected readonly depositStep = signal<1 | 2 | 3>(1);
  protected readonly depositMethods = computed(() => [
    { value: 'card', label: this.ui.locale() === 'ar' ? 'بطاقة بنكية' : 'Bank Card', icon: 'pi pi-credit-card' },
    { value: 'vodafone', label: this.ui.locale() === 'ar' ? 'فودافون كاش' : 'Vodafone Cash', icon: 'pi pi-mobile' },
    { value: 'instapay', label: 'InstaPay', icon: 'pi pi-send' },
  ]);

  // Current section derived from route
  protected readonly section = signal<WalletSection>('home');
  protected readonly selectedTransactionId = signal<number | null>(null);

  async ngOnInit(): Promise<void> {
    // Determine section from URL
    const url = this.router.url;
    if (url.includes('/wallet/deposit')) {
      this.section.set('deposit');
    } else if (url.includes('/wallet/giftcard') || url.includes('/wallet/redeem')) {
      this.section.set('giftcard');
    } else if (url.match(/\/wallet\/Transactions\/\d+/)) {
      const match = url.match(/\/wallet\/Transactions\/(\d+)/);
      if (match) this.selectedTransactionId.set(Number(match[1]));
      this.section.set('transaction-detail');
    } else if (url.includes('/wallet/Transactions')) {
      this.section.set('transactions');
    } else {
      this.section.set('home');
    }

    await this.loadWallet();

    // If we need to load a specific transaction
    if (this.section() === 'transaction-detail') {
      const tid = this.selectedTransactionId();
      if (tid) {
        const found = this.transactions().find(t => t.id === tid);
        if (found) this.selectedTransaction.set(found);
      }
    }
  }

  protected navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  protected goHome(): void {
    this.section.set('home');
    void this.router.navigateByUrl('/wallet');
  }

  protected async loadWallet(): Promise<void> {
    const wallet = await firstValueFrom(this.publicApi.getWallet());
    this.wallet.set(wallet);
    this.storefront.walletBalance.set(Number(wallet.balance ?? 0));
    await this.loadTransactions(1);
  }

  protected async loadTransactions(page: number): Promise<void> {
    this.loading.set(true);
    try {
      const res = await firstValueFrom(this.publicApi.getWalletTransactions({ page, limit: this.rows() }));
      this.transactions.set(res.items);
      this.total.set(res.meta.total ?? 0);
      this.page.set(page);

      // Preselect transaction by id if we're on detail view
      const tid = this.selectedTransactionId();
      if (tid) {
        const found = res.items.find((t: WalletTransaction) => t.id === tid);
        if (found) this.selectedTransaction.set(found);
      }
    } finally {
      this.loading.set(false);
    }
  }

  protected onPageChange(event: any): void {
    void this.loadTransactions(event.page + 1);
  }

  protected openTransaction(t: WalletTransaction): void {
    this.selectedTransaction.set(t);
    this.section.set('transaction-detail');
    void this.router.navigateByUrl(`/wallet/Transactions/${t.id}`);
  }

  protected confirmRedeem(): void {
    this.confirmation.confirm({
      header: this.ui.t('wallet.confirmTitle'),
      message: this.ui.t('wallet.confirmMessage'),
      acceptLabel: this.ui.t('wallet.redeem'),
      rejectLabel: this.ui.locale() === 'ar' ? 'إلغاء' : 'Cancel',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => void this.redeem(),
    });
  }

  protected async redeem(): Promise<void> {
    this.loading.set(true);

    try {
      await firstValueFrom(this.publicApi.redeemGiftCard(this.redeemCode()));
      this.redeemCode.set('');
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

  protected nextDepositStep(): void {
    if (this.depositStep() < 3) {
      this.depositStep.set((this.depositStep() + 1) as 1 | 2 | 3);
    }
  }

  protected prevDepositStep(): void {
    if (this.depositStep() > 1) {
      this.depositStep.set((this.depositStep() - 1) as 1 | 2 | 3);
    }
  }

  protected resetDeposit(): void {
    this.depositStep.set(1);
    this.depositAmount.set(null);
    this.depositMethod.set('card');
  }

  protected transactionIcon(t: WalletTransaction): string {
    if (t.type === 'gift_card_redeem' || t.type === 'redeem') return 'pi pi-gift';
    if (t.type === 'refund') return 'pi pi-refresh';
    if (t.amount > 0) return 'pi pi-plus-circle';
    return 'pi pi-minus-circle';
  }
}
