import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DynamicPage } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-page-detail-page',
  imports: [SharedUiModule],
  templateUrl: './page-detail-page.html',
  styleUrl: './page-detail-page.scss',
})
export class PageDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly publicApi = inject(PublicApiService);

  protected readonly page = signal<DynamicPage | null>(null);

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'terms-of-service';
    this.page.set(await firstValueFrom(this.publicApi.getDynamicPage(slug)));
  }
}
