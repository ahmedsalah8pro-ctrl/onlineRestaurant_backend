import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ShareLinkResult } from '../../../core/models/api.models';
import { SocialShareService, ShareRequestPayload } from '../../../core/services/social-share';
import { RuntimeConfigService } from '../../../core/services/runtime-config';
import { UiTextService } from '../../../core/services/ui-text';

@Component({
  selector: 'app-share-actions',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PopoverModule, ProgressSpinnerModule],
  template: `
    <button
      type="button"
      class="share-trigger"
      [class.share-trigger--compact]="compact()"
      [class.share-trigger--ghost]="textMode()"
      [class]="buttonClass()"
      (click)="toggle(popover, $event)"
    >
      <span class="share-trigger__icon">
        <i [class]="icon()"></i>
      </span>

      <span class="share-trigger__copy" *ngIf="!compact()">
        <strong>{{ resolvedLabel() }}</strong>
        <small>{{ ui.t('share.campaign') }}</small>
      </span>

      <span class="share-trigger__copy share-trigger__copy--compact" *ngIf="compact()">
        {{ resolvedCompactLabel() }}
      </span>
    </button>

    <p-popover #popover [dismissable]="true" appendTo="body" styleClass="share-popover">
      <div class="share-sheet">
        <div class="share-sheet__hero">
          <div class="share-sheet__hero-copy">
            <span class="share-sheet__badge">{{ resolvedLabel() }}</span>
            <strong>{{ ui.t('share.preview') }}</strong>
            <small>{{ ui.t('share.ready') }}</small>
          </div>
          <div class="share-sheet__hero-icon">
            <i class="pi pi-megaphone"></i>
          </div>
        </div>

        @if (loading()) {
          <div class="share-sheet__loading">
            <p-progressspinner strokeWidth="4" styleClass="w-3rem h-3rem"></p-progressspinner>
          </div>
        } @else if (errorMessage(); as error) {
          <div class="share-sheet__error">
            <i class="pi pi-exclamation-triangle"></i>
            <div>
              <strong>{{ ui.t('share.error') }}</strong>
              <p>{{ error }}</p>
            </div>
            <button pButton type="button" [label]="ui.t('share.tryAgain')" icon="pi pi-refresh" (click)="retry($event)"></button>
          </div>
        } @else if (link(); as currentLink) {
          <div class="share-sheet__preview-card">
            <img
              class="share-sheet__preview-image"
              [src]="currentLink.image_url || fallbackPreviewImage()"
              [alt]="currentLink.title"
            />
            <div class="share-sheet__preview-body">
              <strong>{{ currentLink.title }}</strong>
              <p>{{ currentLink.description || ui.t('share.subtitle') }}</p>
              <a class="share-sheet__preview-link" [href]="currentLink.destination_url" target="_blank" rel="noopener noreferrer">
                <i class="pi pi-external-link"></i>
                <span>{{ ui.t('share.direct') }}</span>
              </a>
            </div>
          </div>

          <label class="share-sheet__field">
            <span>{{ ui.t('share.link') }}</span>
            <div class="share-sheet__copy-row">
              <input pInputText [value]="currentLink.share_url" readonly />
              <button pButton type="button" icon="pi pi-copy" [label]="ui.t('share.copy')" (click)="copy(currentLink)"></button>
            </div>
          </label>

          <div class="share-sheet__section-label">{{ ui.t('share.channels') }}</div>

          <div class="share-sheet__grid">
            <button type="button" class="share-channel share-channel--whatsapp" (click)="open('whatsapp', currentLink)">
              <span class="share-channel__glyph">W</span>
              <span>{{ ui.t('share.whatsapp') }}</span>
            </button>
            <button type="button" class="share-channel share-channel--facebook" (click)="open('facebook', currentLink)">
              <span class="share-channel__glyph">f</span>
              <span>{{ ui.t('share.facebook') }}</span>
            </button>
            <button type="button" class="share-channel share-channel--telegram" (click)="open('telegram', currentLink)">
              <span class="share-channel__glyph"><i class="pi pi-send"></i></span>
              <span>{{ ui.t('share.telegram') }}</span>
            </button>
            <button type="button" class="share-channel share-channel--x" (click)="open('x', currentLink)">
              <span class="share-channel__glyph">X</span>
              <span>{{ ui.t('share.x') }}</span>
            </button>
          </div>

          <button
            *ngIf="shareSupported()"
            pButton
            type="button"
            [label]="ui.t('share.system')"
            icon="pi pi-mobile"
            styleClass="share-sheet__native"
            (click)="nativeShare(currentLink)"
          ></button>
        } @else {
          <div class="share-sheet__loading">
            <p-progressspinner strokeWidth="4" styleClass="w-3rem h-3rem"></p-progressspinner>
          </div>
        }
      </div>
    </p-popover>
  `,
  styles: [`
    .share-trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
      min-height: 3.4rem;
      border: 0;
      border-radius: 1.4rem;
      padding: 0.85rem 1rem;
      cursor: pointer;
      color: #f8fafc;
      background:
        radial-gradient(circle at top right, rgba(34, 197, 94, 0.22), transparent 42%),
        linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.92));
      box-shadow:
        0 18px 38px rgba(15, 23, 42, 0.28),
        inset 0 1px 0 rgba(255,255,255,0.08);
      border: 1px solid rgba(148, 163, 184, 0.18);
      overflow: hidden;
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
    }
    .share-trigger:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.35);
      box-shadow:
        0 20px 46px rgba(15, 23, 42, 0.34),
        0 0 0 1px rgba(59,130,246,0.14),
        inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .share-trigger::after {
      content: '';
      position: absolute;
      inset: auto -35% -80% auto;
      width: 10rem;
      height: 10rem;
      background: radial-gradient(circle, rgba(59,130,246,.24), transparent 62%);
      pointer-events: none;
      animation: shareGlow 4.2s linear infinite;
    }
    .share-trigger--compact {
      min-height: 2.7rem;
      padding: 0.6rem 0.8rem;
      gap: 0.55rem;
      border-radius: 999px;
    }
    .share-trigger--ghost {
      background: rgba(15, 23, 42, 0.7);
      box-shadow: none;
    }
    .share-trigger__icon {
      position: relative;
      z-index: 1;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 999px;
      display: inline-grid;
      place-items: center;
      background: linear-gradient(135deg, #22c55e, #3b82f6);
      color: #04120a;
      box-shadow: 0 10px 24px rgba(34,197,94,.28);
      flex-shrink: 0;
    }
    .share-trigger--compact .share-trigger__icon {
      width: 1.9rem;
      height: 1.9rem;
      font-size: 0.85rem;
    }
    .share-trigger__copy {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: start;
      gap: 0.15rem;
    }
    .share-trigger__copy strong {
      font-size: 0.96rem;
      font-weight: 800;
      line-height: 1.1;
    }
    .share-trigger__copy small {
      font-size: 0.72rem;
      color: rgba(226, 232, 240, 0.72);
      line-height: 1.2;
    }
    .share-trigger__copy--compact {
      font-size: 0.82rem;
      font-weight: 700;
      color: #e2e8f0;
    }
    .share-sheet {
      min-width: min(92vw, 420px);
      display: flex;
      flex-direction: column;
      gap: 1.15rem;
    }
    .share-sheet__hero {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      border-radius: 1.3rem;
      background:
        radial-gradient(circle at top left, rgba(59,130,246,.22), transparent 42%),
        linear-gradient(135deg, rgba(15,23,42,.92), rgba(30,41,59,.88));
      border: 1px solid rgba(148, 163, 184, 0.16);
    }
    .share-sheet__hero-copy {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .share-sheet__badge {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      padding: 0.28rem 0.7rem;
      border-radius: 999px;
      background: rgba(34, 197, 94, 0.14);
      color: #86efac;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .share-sheet__hero-copy strong {
      font-size: 1.05rem;
      color: #f8fafc;
    }
    .share-sheet__hero-copy small,
    .share-sheet__field span {
      color: #94a3b8;
    }
    .share-sheet__hero-icon {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 1rem;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, rgba(34,197,94,.22), rgba(59,130,246,.22));
      color: #f8fafc;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    .share-sheet__preview-card {
      display: grid;
      grid-template-columns: 118px minmax(0, 1fr);
      gap: 0.95rem;
      padding: 0.75rem;
      border-radius: 1.2rem;
      background: rgba(15, 23, 42, 0.58);
      border: 1px solid rgba(148, 163, 184, 0.14);
    }
    .share-sheet__preview-image {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 1rem;
      background: rgba(2, 6, 23, 0.9);
    }
    .share-sheet__preview-body {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      min-width: 0;
    }
    .share-sheet__preview-body strong {
      color: #f8fafc;
      font-size: 0.96rem;
      line-height: 1.4;
    }
    .share-sheet__preview-body p {
      margin: 0;
      color: #cbd5e1;
      font-size: 0.83rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .share-sheet__preview-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      width: fit-content;
      color: #93c5fd;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .share-sheet__field {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .share-sheet__copy-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.55rem;
      align-items: center;
    }
    .share-sheet__copy-row :is(input, button) {
      min-height: 2.9rem;
    }
    .share-sheet__section-label {
      color: #e2e8f0;
      font-size: 0.84rem;
      font-weight: 700;
    }
    .share-sheet__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem;
    }
    .share-channel {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 3rem;
      border-radius: 1rem;
      border: 1px solid rgba(148, 163, 184, 0.14);
      background: rgba(15, 23, 42, 0.62);
      color: #f8fafc;
      padding: 0.72rem 0.85rem;
      cursor: pointer;
      transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
    }
    .share-channel:hover {
      transform: translateY(-1px);
      border-color: rgba(148, 163, 184, 0.28);
    }
    .share-channel__glyph {
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      font-weight: 800;
      color: #fff;
    }
    .share-channel--whatsapp .share-channel__glyph { background: linear-gradient(135deg, #25d366, #16a34a); }
    .share-channel--facebook .share-channel__glyph { background: linear-gradient(135deg, #1877f2, #1d4ed8); }
    .share-channel--telegram .share-channel__glyph { background: linear-gradient(135deg, #38bdf8, #0ea5e9); }
    .share-channel--x .share-channel__glyph { background: linear-gradient(135deg, #111827, #334155); }
    .share-sheet__loading {
      min-height: 140px;
      display: grid;
      place-items: center;
    }
    .share-sheet__error {
      display: grid;
      gap: 0.85rem;
      padding: 1rem;
      border-radius: 1rem;
      background: rgba(127, 29, 29, 0.18);
      border: 1px solid rgba(248, 113, 113, 0.24);
      color: #fecaca;
    }
    .share-sheet__error p {
      margin: 0.3rem 0 0;
      color: #fecaca;
      line-height: 1.6;
    }
    .share-sheet__native {
      width: 100%;
      min-height: 3rem;
      background: linear-gradient(135deg, #22c55e, #3b82f6);
      border: 0;
      color: #04120a;
      font-weight: 800;
      box-shadow: 0 18px 34px rgba(34, 197, 94, 0.2);
    }
    :host ::ng-deep .share-popover .p-popover-content {
      background:
        radial-gradient(circle at top right, rgba(34,197,94,.08), transparent 30%),
        linear-gradient(180deg, rgba(15, 23, 42, 0.99), rgba(15, 23, 42, 0.98));
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 24px;
      box-shadow: 0 28px 60px rgba(15, 23, 42, 0.45);
      color: #e2e8f0;
    }
    :host ::ng-deep .share-popover input {
      width: 100%;
    }
    @media (max-width: 640px) {
      .share-trigger {
        width: 100%;
        justify-content: center;
      }
      .share-sheet__preview-card {
        grid-template-columns: 1fr;
      }
      .share-sheet__copy-row {
        grid-template-columns: 1fr;
      }
      .share-sheet__grid {
        grid-template-columns: 1fr;
      }
    }
    @keyframes shareGlow {
      0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.4; }
      50% { transform: translate3d(-10%, -8%, 0) scale(1.08); opacity: 0.65; }
      100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.4; }
    }
  `],
})
export class ShareActionsComponent {
  protected readonly ui = inject(UiTextService);
  private readonly share = inject(SocialShareService);
  private readonly messages = inject(MessageService);
  private readonly runtime = inject(RuntimeConfigService);

  readonly request = input.required<ShareRequestPayload>();
  readonly buttonLabel = input<string>('');
  readonly buttonClass = input<string>('');
  readonly icon = input<string>('pi pi-share-alt');
  readonly severity = input<'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | null | undefined>(undefined);
  readonly textMode = input<boolean>(false);
  readonly rounded = input<boolean>(false);
  readonly outlined = input<boolean>(false);
  readonly compact = input<boolean>(false);

  protected readonly loading = signal(false);
  protected readonly link = signal<ShareLinkResult | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly shareSupported = computed(() => 'share' in navigator);
  protected readonly resolvedLabel = computed(() => this.buttonLabel() || this.defaultLabel());
  protected readonly resolvedCompactLabel = computed(() => this.compact() ? this.ui.t('share.short') : this.resolvedLabel());

  protected async toggle(popover: { show: (event: Event) => void; toggle: (event: Event) => void }, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ensureLink();

    popover.toggle(event);
  }

  protected async retry(event: Event): Promise<void> {
    event.stopPropagation();
    await this.ensureLink(true);
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

  protected fallbackPreviewImage(): string {
    return `${this.runtime.frontendBaseUrl}/favicon.ico`;
  }

  private async ensureLink(force = false): Promise<void> {
    if ((this.link() !== null && !force) || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      this.link.set(await this.share.createShareLink(this.request()));
    } catch (error: any) {
      const message = error?.error?.message || this.ui.t('share.error');
      this.errorMessage.set(message);
      this.messages.add({
        severity: 'error',
        summary: this.ui.t('share.title'),
        detail: message,
      });
    } finally {
      this.loading.set(false);
    }
  }

  private defaultLabel(): string {
    const type = this.request().type;

    if (type === 'product') {
      return this.ui.t('share.product');
    }

    if (type === 'menu') {
      return this.ui.t('share.menu');
    }

    if (type === 'page') {
      return this.ui.t('share.page');
    }

    return this.ui.t('share.store');
  }
}
