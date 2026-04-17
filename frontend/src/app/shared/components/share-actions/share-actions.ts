import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ShareLinkResult } from '../../../core/models/api.models';
import { SocialShareService, ShareRequestPayload } from '../../../core/services/social-share';
import { RuntimeConfigService } from '../../../core/services/runtime-config';
import { UiTextService } from '../../../core/services/ui-text';


@Component({
  selector: 'app-share-actions',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PopoverModule, ProgressSpinnerModule, TooltipModule],
  template: `
    <button
      type="button"
      class="share-trigger"
      [class.share-trigger--compact]="compact()"
      [class.share-trigger--only-icon]="onlyIcon()"
      [class.share-trigger--ghost]="textMode()"
      [class]="buttonClass()"
      (click)="toggle(popover, $event)"
      [pTooltip]="onlyIcon() ? resolvedLabel() : ''"
      tooltipPosition="top"
    >
      <span class="share-trigger__icon">
        <i [class]="icon()"></i>
      </span>

      <span class="share-trigger__copy" *ngIf="!compact() && !onlyIcon()">
        <strong>{{ resolvedLabel() }}</strong>
        <small>{{ ui.t('share.campaign') }}</small>
      </span>

      <span class="share-trigger__copy share-trigger__copy--compact" *ngIf="compact() && !onlyIcon()">
        {{ resolvedCompactLabel() }}
      </span>
    </button>

    <p-popover
      #popover
      [dismissable]="true"
      appendTo="body"
      styleClass="share-popover"
      [autoZIndex]="true"
      [baseZIndex]="5200"
    >
      <div class="share-sheet">
        <div class="share-sheet__top-bar">
            <button pButton icon="pi pi-times" class="p-button-text p-button-secondary p-button-sm close-x-btn" (click)="popover.hide()"></button>
        </div>

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

          <div class="share-sheet__section-label flex-center">{{ ui.t('share.channels') }}</div>

          <div class="share-sheet__grid centered-grid">
            <button type="button" class="share-channel share-channel--whatsapp" (click)="open('whatsapp', currentLink)" pTooltip="WhatsApp">
              <span class="share-channel__glyph">W</span>
              <span class="share-channel__body">
                <strong>{{ ui.t('share.whatsapp') }}</strong>
                <small>WhatsApp</small>
              </span>
            </button>
            <button type="button" class="share-channel share-channel--facebook" (click)="open('facebook', currentLink)" pTooltip="Facebook">
              <span class="share-channel__glyph">f</span>
              <span class="share-channel__body">
                <strong>{{ ui.t('share.facebook') }}</strong>
                <small>Facebook</small>
              </span>
            </button>
            <button type="button" class="share-channel share-channel--telegram" (click)="open('telegram', currentLink)" pTooltip="Telegram">
              <span class="share-channel__glyph"><i class="pi pi-send"></i></span>
              <span class="share-channel__body">
                <strong>{{ ui.t('share.telegram') }}</strong>
                <small>Telegram</small>
              </span>
            </button>
            <button type="button" class="share-channel share-channel--x" (click)="open('x', currentLink)" pTooltip="X (Twitter)">
              <span class="share-channel__glyph">X</span>
              <span class="share-channel__body">
                <strong>{{ ui.t('share.x') }}</strong>
                <small>X</small>
              </span>
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

          <div class="share-sheet__footer mt-4 flex-center">
              <button pButton [label]="ui.t('nav.cancel')" severity="secondary" class="p-button-text w-full cancel-btn" (click)="popover.hide()"></button>
          </div>
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
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 42%),
        linear-gradient(135deg, #1e293b, #0f172a);
      box-shadow:
        0 18px 38px rgba(15, 23, 42, 0.28),
        inset 0 1px 0 rgba(255,255,255,0.08);
      border: 1px solid rgba(148, 163, 184, 0.18);
      overflow: hidden;
      transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .share-trigger:hover {
      transform: translateY(-2px) scale(1.02);
      border-color: rgba(var(--brand-primary-rgb), 0.4);
      box-shadow:
        0 22px 48px rgba(15, 23, 42, 0.35),
        0 0 0 4px rgba(var(--brand-primary-rgb), 0.1);
    }
    .share-trigger::after {
      content: '';
      position: absolute;
      inset: -50%;
      background: radial-gradient(circle, rgba(255,255,255, 0.1), transparent 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 300ms ease;
    }
    .share-trigger:hover::after {
      opacity: 1;
    }
    .share-trigger--compact {
      min-height: 2.7rem;
      padding: 0.6rem 0.8rem;
      gap: 0.55rem;
      border-radius: 999px;
    }
    .share-trigger--only-icon {
      width: 3.4rem;
      height: 3.4rem;
      padding: 0;
      justify-content: center;
      border-radius: 999px;
    }
    .share-trigger--only-icon.share-trigger--compact {
      width: 2.7rem;
      height: 2.7rem;
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
      background: linear-gradient(135deg, var(--brand-primary), #8b1a1a);
      color: white;
      box-shadow: 0 10px 24px rgba(var(--brand-primary-rgb),.28);
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
      gap: 1.25rem;
      padding: 1rem;
    }
    .share-sheet__top-bar {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0;
    }
    .close-x-btn {
        width: 2.5rem !important;
        height: 2.5rem !important;
        border-radius: 50% !important;
        background: rgba(255,255,255,0.05) !important;
        color: #94a3b8 !important;
        &:hover { background: rgba(255,255,255,0.1) !important; color: white !important; }
    }
    .centered-grid {
        justify-content: stretch;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 0.9rem !important;
    }
    .share-sheet__hero {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.25rem;
      border-radius: 1.5rem;
      background: linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.15), rgba(15, 23, 42, 0.4));
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(8px);
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
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      background: rgba(var(--brand-primary-rgb), 0.2);
      color: white;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .share-sheet__hero-copy strong {
      font-size: 1.15rem;
      color: #f8fafc;
      font-weight: 800;
    }
    .share-sheet__hero-copy small,
    .share-sheet__field span {
      color: #94a3b8;
      font-weight: 500;
    }
    .share-sheet__hero-icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1.2rem;
      display: grid;
      place-items: center;
      background: var(--brand-primary);
      color: white;
      font-size: 1.5rem;
      flex-shrink: 0;
      box-shadow: 0 10px 20px rgba(var(--brand-primary-rgb), 0.3);
    }
    .share-sheet__preview-card {
      display: grid;
      grid-template-columns: 118px minmax(0, 1fr);
      gap: 1.25rem;
      padding: 1rem;
      border-radius: 1.4rem;
      background: rgba(15, 23, 42, 0.58);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .share-sheet__preview-image {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 1.2rem;
      background: rgba(2, 6, 23, 0.9);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    .share-sheet__preview-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 0;
    }
    .share-sheet__preview-body strong {
      color: #f8fafc;
      font-size: 1rem;
      line-height: 1.4;
      font-weight: 700;
    }
    .share-sheet__preview-body p {
      margin: 0;
      color: #94a3b8;
      font-size: 0.85rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .share-sheet__preview-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      width: fit-content;
      color: var(--brand-primary);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 800;
      &:hover { text-decoration: underline; }
    }
    .share-sheet__field {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .share-sheet__copy-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.75rem;
      align-items: center;
    }
    .share-sheet__copy-row :is(input, button) {
      min-height: 3.2rem;
      border-radius: 14px;
    }
    .share-sheet__copy-row input {
      background: rgba(15, 23, 42, 0.8) !important;
      border-color: rgba(255,255,255,0.08) !important;
      color: white !important;
      font-weight: 600;
    }
    .share-sheet__section-label {
      color: #94a3b8;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .share-sheet__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .share-channel {
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
      min-height: 4.5rem;
      border-radius: 1.2rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.03);
      color: #f8fafc;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: all 200ms ease;
    }
    .share-channel:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }
    .share-channel__glyph {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 12px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      font-weight: 900;
      color: #fff;
      font-size: 1.2rem;
    }
    .share-channel__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.15rem;
      text-align: start;
    }
    .share-channel__body strong {
      font-size: 0.95rem;
      line-height: 1.1;
      font-weight: 800;
    }
    .share-channel__body small {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
    }
    .share-channel--whatsapp .share-channel__glyph { background: linear-gradient(135deg, #25d366, #16a34a); box-shadow: 0 6px 15px rgba(37, 211, 102, 0.3); }
    .share-channel--facebook .share-channel__glyph { background: linear-gradient(135deg, #1877f2, #1d4ed8); box-shadow: 0 6px 15px rgba(24, 119, 242, 0.3); }
    .share-channel--telegram .share-channel__glyph { background: linear-gradient(135deg, #38bdf8, #0ea5e9); box-shadow: 0 6px 15px rgba(14, 165, 233, 0.3); }
    .share-channel--x .share-channel__glyph { background: linear-gradient(135deg, #000000, #1e293b); box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); }
    
    .cancel-btn {
        margin-top: 1rem;
        min-height: 3.5rem !important;
        border-radius: 18px !important;
        font-weight: 800 !important;
        background: rgba(255,255,255,0.05) !important;
        color: #94a3b8 !important;
        &:hover { background: rgba(255,255,255,0.1) !important; color: white !important; }
    }

    .share-sheet__native {
      width: 100%;
      min-height: 3.5rem;
      border-radius: 18px !important;
      background: linear-gradient(135deg, var(--brand-primary), #8b1a1a) !important;
      border: 0 !important;
      color: white !important;
      font-weight: 800 !important;
      box-shadow: 0 12px 24px rgba(var(--brand-primary-rgb), 0.3) !important;
    }
    :host ::ng-deep .p-popover.share-popover,
    :host ::ng-deep .p-popover.share-popover .p-popover-content,
    :host ::ng-deep .share-popover.p-popover,
    :host ::ng-deep .share-popover.p-popover .p-popover-content {
      background: #0f172a !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 32px !important;
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6) !important;
      padding: 0 !important;
      overflow: hidden;
      color: #f8fafc !important;
    }

    /* Ensure the popover is above dialogs/lightboxes (product preview uses p-dialog). */
    :host ::ng-deep .share-popover,
    :host ::ng-deep .share-popover.p-popover,
    :host ::ng-deep .share-popover.p-popover-overlay {
      z-index: 5200 !important;
    }

    /* PrimeNG sets overlay z-index inline; force it above dialogs. */
    :host ::ng-deep .p-popover.share-popover {
      z-index: 5200 !important;
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
  readonly onlyIcon = input<boolean>(false);

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
    return this.runtime.resolveAsset('branding/logo-square.png', `${this.runtime.frontendBaseUrl}/favicon.ico`);
  }

  private async ensureLink(force = false): Promise<void> {
    if ((this.link() !== null && !force) || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      this.link.set(await this.share.createShareLink({
        ...this.request(),
        locale: this.ui.currentLocale()
      }));
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
