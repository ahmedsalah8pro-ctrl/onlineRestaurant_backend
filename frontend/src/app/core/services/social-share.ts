import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ShareLinkCreatePayload, ShareLinkResult } from '../models/api.models';
import { PublicApiService } from './public-api';
import { UiTextService } from './ui-text';

export type ShareRequestPayload = ShareLinkCreatePayload;

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  private readonly api = inject(PublicApiService);
  private readonly messages = inject(MessageService);
  private readonly ui = inject(UiTextService);

  async createShareLink(payload: ShareRequestPayload): Promise<ShareLinkResult> {
    return firstValueFrom(this.api.createShareLink(payload));
  }

  async copy(url: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    this.messages.add({
      severity: 'success',
      summary: this.ui.t('share.title'),
      detail: this.ui.t('share.copied'),
    });
  }

  async nativeShare(link: ShareLinkResult): Promise<boolean> {
    if (!('share' in navigator)) {
      return false;
    }

    await navigator.share({
      title: link.title,
      text: link.description || link.title,
      url: link.share_url,
    });

    return true;
  }

  openChannel(channel: 'whatsapp' | 'facebook' | 'x' | 'telegram', link: ShareLinkResult): void {
    const encodedUrl = encodeURIComponent(link.share_url);
    const encodedText = encodeURIComponent(link.title);

    const targetUrl = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    }[channel];

    window.open(targetUrl, '_blank', 'noopener,noreferrer,width=720,height=720');
  }
}
