import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ShareLinkResult } from '../../../core/models/api.models';
import { SocialShareService, ShareRequestPayload } from '../../../core/services/social-share';
import { UiTextService } from '../../../core/services/ui-text';

@Component({
  selector: 'app-share-actions',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PopoverModule, ProgressSpinnerModule],
  template: `
    <button
      pButton
      type="button"
      [icon]="icon()"
      [label]="buttonLabel()"
      [severity]="severity()"
      [text]="textMode()"
      [rounded]="rounded()"
      [outlined]="outlined()"
      [class]="buttonClass()"
      (click)="toggle(popover, $event)"
    ></button>

    <p-popover #popover [dismissable]="true" appendTo="body" styleClass="share-popover">
      <div class="share-sheet">
        <div class="share-sheet__head">
          <strong>{{ ui.t('share.title') }}</strong>
          <small>{{ ui.t('share.subtitle') }}</small>
        </div>

        @if (loading()) {
          <div class="share-sheet__loading">
            <p-progressspinner strokeWidth="4" styleClass="w-3rem h-3rem"></p-progressspinner>
          </div>
        } @else if (link(); as currentLink) {
          <label class="share-sheet__field">
            <span>{{ ui.t('share.link') }}</span>
            <input pInputText [value]="currentLink.share_url" readonly />
          </label>

          <div class="share-sheet__grid">
            <button pButton type="button" icon="pi pi-copy" [label]="ui.t('share.copy')" (click)="copy(currentLink)"></button>
            <button pButton type="button" icon="pi pi-whatsapp" [label]="ui.t('share.whatsapp')" severity="secondary" (click)="open('whatsapp', currentLink)"></button>
            <button pButton type="button" icon="pi pi-facebook" [label]="ui.t('share.facebook')" severity="secondary" (click)="open('facebook', currentLink)"></button>
            <button pButton type="button" icon="pi pi-send" [label]="ui.t('share.telegram')" severity="secondary" (click)="open('telegram', currentLink)"></button>
            <button pButton type="button" icon="pi pi-hashtag" [label]="ui.t('share.x')" severity="secondary" (click)="open('x', currentLink)"></button>
            <button pButton type="button" icon="pi pi-share-alt" [label]="ui.t('share.system')" severity="contrast" (click)="nativeShare(currentLink)"></button>
          </div>
        }
      </div>
    </p-popover>
  `,
  styles: [`
    .share-sheet {
      min-width: min(92vw, 360px);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .share-sheet__head {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .share-sheet__head strong {
      font-size: 1rem;
      color: #f8fafc;
    }
    .share-sheet__head small,
    .share-sheet__field span {
      color: #94a3b8;
    }
    .share-sheet__field {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .share-sheet__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem;
    }
    .share-sheet__loading {
      min-height: 140px;
      display: grid;
      place-items: center;
    }
    :host ::ng-deep .share-popover .p-popover-content {
      background: rgba(15, 23, 42, 0.98);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 20px;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.38);
      color: #e2e8f0;
    }
    :host ::ng-deep .share-popover input {
      width: 100%;
    }
    @media (max-width: 640px) {
      .share-sheet__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class ShareActionsComponent {
  protected readonly ui = inject(UiTextService);
  private readonly share = inject(SocialShareService);

  readonly request = input.required<ShareRequestPayload>();
  readonly buttonLabel = input<string>('');
  readonly buttonClass = input<string>('');
  readonly icon = input<string>('pi pi-share-alt');
  readonly severity = input<'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | null | undefined>(undefined);
  readonly textMode = input<boolean>(false);
  readonly rounded = input<boolean>(false);
  readonly outlined = input<boolean>(false);

  protected readonly loading = signal(false);
  protected readonly link = signal<ShareLinkResult | null>(null);
  protected readonly shareSupported = computed(() => 'share' in navigator);

  protected async toggle(popover: { show: (event: Event) => void; toggle: (event: Event) => void }, event: Event): Promise<void> {
    event.stopPropagation();

    if (this.link() === null && !this.loading()) {
      this.loading.set(true);

      try {
        this.link.set(await this.share.createShareLink(this.request()));
      } finally {
        this.loading.set(false);
      }
    }

    popover.toggle(event);
  }

  protected async copy(link: ShareLinkResult): Promise<void> {
    await this.share.copy(link.share_url);
  }

  protected open(channel: 'whatsapp' | 'facebook' | 'x' | 'telegram', link: ShareLinkResult): void {
    this.share.openChannel(channel, link);
  }

  protected async nativeShare(link: ShareLinkResult): Promise<void> {
    const shared = await this.share.nativeShare(link).catch(() => false);

    if (!shared) {
      await this.share.copy(link.share_url);
    }
  }
}
