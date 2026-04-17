import { Component, ElementRef, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime, firstValueFrom, takeUntil } from 'rxjs';
import { ProductDetail, ProductListItem } from '../../../../core/models/api.models';
import { PublicApiService } from '../../../../core/services/public-api';
import { RuntimeConfigService } from '../../../../core/services/runtime-config';
import { SeoService } from '../../../../core/services/seo';
import { StorefrontService } from '../../../../core/services/storefront';
import { ThemeService } from '../../../../core/services/theme';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

type PreviewGalleryItem = {
  id: string;
  source: string;
  thumb: string;
  media_type: 'image' | 'video' | 'external_video';
  isYouTube: boolean;
};

@Component({
  selector: 'app-menu-page',
  imports: [SharedUiModule, RouterLink],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage implements OnInit, OnDestroy {
  protected readonly storefront = inject(StorefrontService);
  protected readonly publicApi = inject(PublicApiService);
  protected readonly runtime = inject(RuntimeConfigService);
  protected readonly ui = inject(UiTextService);
  protected readonly theme = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly message = inject(MessageService);
  private readonly filtersChanged$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly products = signal<ProductListItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly total = signal(0);
  protected readonly page = signal(1);
  protected readonly lastPage = signal(1);
  protected readonly previewVisible = signal(false);
  protected readonly previewLoading = signal(false);
  protected readonly previewProduct = signal<ProductDetail | null>(null);
  protected readonly previewMediaIndex = signal(0);
  protected readonly previewViewerVisible = signal(false);
  protected readonly previewZoomLevel = signal(1);
  protected readonly previewPanX = signal(0);
  protected readonly previewPanY = signal(0);
  protected readonly stagePreviewVideoPlaying = signal(false);
  protected readonly quickAddLoadingId = signal<number | null>(null);
  protected readonly addedSuccessfully = signal<number | null>(null);

  protected readonly selectedSizeId = signal<number | null>(null);
  protected readonly selectedAddonMap = signal<Record<number, number[]>>({});
  protected readonly quantity = signal(1);

  protected readonly totalPrice = computed(() => {
    const current = this.previewProduct();
    if (!current) return 0;
    const sizePrice = (current.sizes || []).find(s => s.id === this.selectedSizeId())?.price ?? current.base_price ?? 0;
    const addons = Object.values(this.selectedAddonMap())
      .flat()
      .map(id => (current.addon_groups || []).flatMap(g => g.options).find(o => o.id === id))
      .filter((o): o is any => !!o)
      .reduce((sum, o) => sum + (o?.base_price ?? 0), 0);
    return (sizePrice + addons) * this.quantity();
  });

  protected readonly previewGalleryItems = computed<PreviewGalleryItem[]>(() => {
    const current = this.previewProduct();
    if (!current) {
      return [];
    }

    const items: PreviewGalleryItem[] = [];
    const seen = new Set<string>();
    const fallback = 'https://placehold.co/640x520/111827/ffffff?text=Preview';

    const pushItem = (rawSource?: string | null, mediaType: 'image' | 'video' | 'external_video' = 'image') => {
      const source = (rawSource || '').trim();
      if (!source) {
        return;
      }

      const key = `${mediaType}:${source}`;
      if (seen.has(key)) {
        return;
      }

      const isYouTube = this.isYouTube(source);
      const resolved = mediaType === 'external_video' || isYouTube
        ? source
        : this.runtime.resolveAsset(source, fallback);
      const thumb = isYouTube ? this.resolveYouTubeThumbnail(source) || fallback : resolved;

      items.push({
        id: key,
        source: resolved,
        thumb,
        media_type: isYouTube ? 'external_video' : mediaType,
        isYouTube,
      });
      seen.add(key);
    };

    pushItem(current.main_image_path, this.isYouTube(current.main_image_path) ? 'external_video' : 'image');
    for (const media of current.media || []) {
      pushItem(media.url || media.external_url || media.path, media.media_type || 'image');
    }

    return items;
  });

  protected readonly activePreviewMedia = computed<PreviewGalleryItem | null>(() => {
    const items = this.previewGalleryItems();
    if (!items.length) {
      return null;
    }

    const index = Math.min(this.previewMediaIndex(), items.length - 1);
    return items[index] ?? null;
  });

  protected readonly previewImageTransform = computed(() => {
    return `translate(${this.previewPanX()}px, ${this.previewPanY()}px) scale(${this.previewZoomLevel()})`;
  });

  private previewDragging = false;
  private previewDragStartX = 0;
  private previewDragStartY = 0;
  private previewDragOriginX = 0;
  private previewDragOriginY = 0;

  protected filters = {
    search: '',
    branch_id: null as number | null,
    category_id: null as number | null,
    sort: 'default',
  };

  protected readonly sortOptions = computed(() => [
    { label: this.ui.sortLabel('default'), value: 'default' },
    { label: this.ui.sortLabel('price_asc'), value: 'price_asc' },
    { label: this.ui.sortLabel('price_desc'), value: 'price_desc' },
    { label: this.ui.sortLabel('rating_desc'), value: 'rating_desc' },
    { label: this.ui.sortLabel('best_seller'), value: 'best_seller' },
  ]);

  protected readonly menuShareRequest = computed(() => ({
    type: 'menu' as const,
    query: {
      branch_id: this.filters.branch_id,
      category_id: this.filters.category_id,
      search: this.filters.search,
      sort: this.filters.sort === 'default' ? null : this.filters.sort,
    },
  }));

  constructor() {
    effect(() => {
      this.theme.locale();
      this.products();
      this.total();
      this.storefront.settings();
      this.applySeo();
    });

    effect(() => {
      const items = this.previewGalleryItems();
      const index = this.previewMediaIndex();

      if (!items.length) {
        this.previewMediaIndex.set(0);
        return;
      }

      if (index >= items.length) {
        this.previewMediaIndex.set(0);
      }
    });

    effect((onCleanup) => {
      const open = this.previewVisible();
      const viewerOpen = this.previewViewerVisible();
      const items = this.previewGalleryItems();
      const active = this.activePreviewMedia();
      const isVideoActive = !!active && active.media_type !== 'image';
      const shouldPauseAutoSwitch = isVideoActive && (active?.isYouTube || this.stagePreviewVideoPlaying());

      if (!open || viewerOpen || items.length <= 1 || shouldPauseAutoSwitch) {
        return;
      }

      const timer = window.setInterval(() => this.nextPreviewMedia(false), 5000);
      onCleanup(() => window.clearInterval(timer));
    });
  }

  async ngOnInit(): Promise<void> {
    if (!this.storefront.settings()) {
      await this.storefront.bootstrap();
    }

    this.filtersChanged$
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe(() => void this.loadProducts(1));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected setBranch(branchId: number): void {
    if (this.filters.branch_id === branchId) {
      return;
    }

    this.filters.branch_id = branchId;
    this.filters.category_id = null;
    this.page.set(1);
    void this.loadProducts(1);
  }

  protected onFiltersChanged(): void {
    if (!this.filters.branch_id) {
      return;
    }

    this.filtersChanged$.next();
  }

  protected async loadProducts(page = this.page()): Promise<void> {
    if (!this.filters.branch_id) {
      this.products.set([]);
      this.total.set(0);
      this.lastPage.set(1);
      return;
    }

    this.loading.set(true);
    this.page.set(page);

    try {
      const response = await firstValueFrom(
        this.publicApi.getProducts({
          page,
          search: this.filters.search,
          search_alt: this.smartAlternateSearch(this.filters.search),
          branch_id: this.filters.branch_id,
          category_id: this.filters.category_id,
          sort: this.filters.sort === 'default' ? null : this.filters.sort,
        }),
      );

      this.products.set(response?.items ?? []);
      this.total.set(Number(response?.meta?.total ?? 0));
      this.lastPage.set(Number(response?.meta?.last_page ?? 1));
    } finally {
      this.loading.set(false);
    }
  }

  protected async openPreview(productId: number): Promise<void> {
    this.previewVisible.set(true);
    this.previewLoading.set(true);
    this.previewMediaIndex.set(0);
    this.resetPreviewZoom();
    this.previewViewerVisible.set(false);

    try {
      const product = await firstValueFrom(this.publicApi.getProduct(productId));
      this.previewProduct.set(product);
      this.selectedSizeId.set(product.sizes.find(s => s.is_default)?.id ?? product.sizes[0]?.id ?? null);
      this.selectedAddonMap.set({});
      this.quantity.set(1);
    } finally {
      this.previewLoading.set(false);
    }
  }

  protected selectSize(sizeId: number): void {
    this.selectedSizeId.set(sizeId);
  }

  protected toggleOption(group: import('../../../../core/models/api.models').AddonGroup, optionId: number | string): void {
    const current = { ...this.selectedAddonMap() };
    const selected = current[group.id] ?? [];
    const targetId = Number(optionId);

    if (group.selection_type === 'single') {
      if (selected.some(id => id == targetId)) {
        if (!group.is_required) {
          current[group.id] = [];
          this.selectedAddonMap.set(current);
        }
        return;
      }

      current[group.id] = [targetId];
      this.selectedAddonMap.set(current);
      return;
    }

    if (selected.some(id => id == targetId)) {
      current[group.id] = selected.filter((value) => value != targetId);
    } else {
      current[group.id] = [...selected, targetId];
    }
    this.selectedAddonMap.set(current);
  }

  protected isSelected(groupId: number, optionId: number | string): boolean {
    return (this.selectedAddonMap()[groupId] ?? []).some(id => id == optionId);
  }

  protected closePreview(): void {
    this.previewVisible.set(false);
    this.previewProduct.set(null);
    this.previewViewerVisible.set(false);
    this.resetPreviewZoom();
    this.stagePreviewVideoPlaying.set(false);
  }

  protected async quickAdd(product: ProductListItem, event?: Event): Promise<void> {
    if (event) {
      event.stopPropagation();
    }

    if (!this.filters.branch_id) {
      return;
    }

    if ((product.addon_groups_count ?? 0) > 0) {
      await this.openPreview(product.id);
      return;
    }

    if (event) {
      this.storefront.triggerFlight(event);
    }

    this.quickAddLoadingId.set(product.id);

    try {
      const isConfigured = !!this.previewProduct() && this.previewProduct()?.id === product.id;
      
      await firstValueFrom(
        this.publicApi.addCartItem({
          product_id: product.id,
          branch_id: this.filters.branch_id,
          product_size_id: isConfigured ? this.selectedSizeId() : null,
          addon_option_ids: isConfigured ? Object.values(this.selectedAddonMap()).flat() : [],
          quantity: isConfigured ? this.quantity() : 1,
        }),
      );

      if (isConfigured) {
        this.addedSuccessfully.set(product.id);
        await new Promise(r => setTimeout(r, 800));
        this.closePreview();
        this.addedSuccessfully.set(null);
      }

      await this.storefront.refreshCart();
      this.message.add({
        severity: 'success',
        summary: this.ui.t('cart.title'),
        detail: `${this.theme.resolveText(product.translations || product.name)} - ${this.ui.t('product.addToCart')}`,
      });
    } finally {
      this.quickAddLoadingId.set(null);
    }
  }



  private smartAlternateSearch(value: string): string | null {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const arToEn: Record<string, string> = {
      ض: 'q', ص: 'w', ث: 'e', ق: 'r', ف: 't', غ: 'y', ع: 'u', ه: 'i', خ: 'o', ح: 'p',
      ج: '[', د: ']', ش: 'a', س: 's', ي: 'd', ب: 'f', ل: 'g', ا: 'h', ت: 'j', ن: 'k',
      م: 'l', ك: ';', ط: '\'', ئ: 'z', ء: 'x', ؤ: 'c', ر: 'v', لا: 'b', ى: 'n', ة: 'm',
      و: ',', ز: '.', ظ: '/', ' ': ' ',
    };
    const enToAr: Record<string, string> = Object.fromEntries(Object.entries(arToEn).map(([ar, en]) => [en, ar]));

    const convert = (map: Record<string, string>) => [...trimmed].map((char) => map[char] ?? char).join('');
    const convertedArabic = convert(arToEn);
    const convertedEnglish = convert(enToAr);

    if (convertedArabic !== trimmed) {
      return convertedArabic;
    }

    if (convertedEnglish !== trimmed) {
      return convertedEnglish;
    }

    return null;
  }

  protected productLink(product: ProductListItem): string[] {
    return ['/products', String(product.id), product.slug];
  }

  protected isYouTube(url?: string | null): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  protected getYouTubeEmbedUrl(url?: string | null): any {
    if (!url) return this.theme.sanitize('');
    let id = '';
    if (url.includes('v=')) id = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('embed/')) id = url.split('embed/')[1].split('?')[0];

    return this.theme.safeUrl(`https://www.youtube.com/embed/${id}`);
  }

  protected selectPreviewMedia(index: number): void {
    this.pausePreviewStageVideo();
    this.previewMediaIndex.set(index);
    this.resetPreviewZoom();
  }

  protected nextPreviewMedia(resetZoom = true): void {
    const items = this.previewGalleryItems();
    if (!items.length) {
      return;
    }

    this.pausePreviewStageVideo();
    this.previewMediaIndex.set((this.previewMediaIndex() + 1) % items.length);
    if (resetZoom) {
      this.resetPreviewZoom();
    }
  }

  protected prevPreviewMedia(resetZoom = true): void {
    const items = this.previewGalleryItems();
    if (!items.length) {
      return;
    }

    this.pausePreviewStageVideo();
    this.previewMediaIndex.set((this.previewMediaIndex() - 1 + items.length) % items.length);
    if (resetZoom) {
      this.resetPreviewZoom();
    }
  }

  protected openPreviewViewer(): void {
    if (!this.activePreviewMedia()) {
      return;
    }

    this.previewViewerVisible.set(true);
    this.resetPreviewZoom();
  }

  protected closePreviewViewer(): void {
    this.previewViewerVisible.set(false);
    this.resetPreviewZoom();
  }

  protected zoomPreviewIn(): void {
    if (this.activePreviewMedia()?.media_type !== 'image') {
      return;
    }

    this.previewZoomLevel.set(Math.min(this.previewZoomLevel() + 0.25, 3));
  }

  protected zoomPreviewOut(): void {
    if (this.activePreviewMedia()?.media_type !== 'image') {
      return;
    }

    const next = Math.max(this.previewZoomLevel() - 0.25, 1);
    this.previewZoomLevel.set(next);
    if (next === 1) {
      this.previewPanX.set(0);
      this.previewPanY.set(0);
    }
  }

  protected resetPreviewZoom(): void {
    this.previewZoomLevel.set(1);
    this.previewPanX.set(0);
    this.previewPanY.set(0);
    this.previewDragging = false;
  }

  protected isPreviewZoomable(): boolean {
    return this.activePreviewMedia()?.media_type === 'image';
  }

  protected startPreviewPan(event: MouseEvent): void {
    if (!this.isPreviewZoomable() || this.previewZoomLevel() <= 1) {
      return;
    }

    this.previewDragging = true;
    this.previewDragStartX = event.clientX;
    this.previewDragStartY = event.clientY;
    this.previewDragOriginX = this.previewPanX();
    this.previewDragOriginY = this.previewPanY();
  }

  protected movePreviewPan(event: MouseEvent): void {
    if (!this.previewDragging || this.previewZoomLevel() <= 1) {
      return;
    }

    this.previewPanX.set(this.previewDragOriginX + (event.clientX - this.previewDragStartX));
    this.previewPanY.set(this.previewDragOriginY + (event.clientY - this.previewDragStartY));
  }

  protected stopPreviewPan(): void {
    this.previewDragging = false;
  }

  protected onPreviewStageVideoPlayState(isPlaying: boolean): void {
    this.stagePreviewVideoPlaying.set(isPlaying);
  }

  private pausePreviewStageVideo(): void {
    this.stagePreviewVideoPlaying.set(false);
    const video = this.host.nativeElement.querySelector('.preview-gallery__stage video.preview-gallery__asset--video') as HTMLVideoElement | null;
    if (video && !video.paused) {
      video.pause();
    }
  }

  private resolveYouTubeThumbnail(url?: string | null): string | null {
    if (!url) {
      return null;
    }

    let id = '';
    if (url.includes('v=')) id = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('embed/')) id = url.split('embed/')[1].split('?')[0];

    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  private applySeo(): void {
    const settings = this.storefront.settings();

    if (!settings) {
      return;
    }

    const branch = this.storefront.branches().find((item) => item.id === this.filters.branch_id);
    const category = this.storefront.categories().find((item) => item.id === this.filters.category_id);
    const branchName = branch ? this.theme.resolveText(branch.translations || branch.name) : '';
    const categoryName = category ? this.theme.resolveText(category.translations || category.name) : '';

    const titleParts = [this.ui.t('menu.title')];
    if (branchName) titleParts.push(branchName);
    if (categoryName) titleParts.push(categoryName);
    titleParts.push(settings.general?.site_name || 'Online Restaurant');

    const descriptionParts = [
      this.filters.search ? `${this.ui.t('menu.search')}: ${this.filters.search}` : null,
      branchName || null,
      categoryName || null,
      this.ui.t('menu.copy'),
    ].filter(Boolean);

    const canonicalUrl = new URL(`${this.runtime.frontendBaseUrl}/menu`);
    if (this.filters.branch_id) canonicalUrl.searchParams.set('branch_id', String(this.filters.branch_id));
    if (this.filters.category_id) canonicalUrl.searchParams.set('category_id', String(this.filters.category_id));
    if (this.filters.search.trim()) canonicalUrl.searchParams.set('search', this.filters.search.trim());
    if (this.filters.sort !== 'default') canonicalUrl.searchParams.set('sort', this.filters.sort);

    const itemList = this.products().slice(0, 12).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: this.theme.resolveText(product.translations || product.name),
      url: `${this.runtime.frontendBaseUrl}/products/${product.id}/${product.slug}`,
    }));

    this.seo.applyPage({
      title: titleParts.filter(Boolean).join(' | '),
      description: descriptionParts.join(' • '),
      image: settings.seo?.default_og_image_path
        ? this.runtime.resolveAsset(settings.seo.default_og_image_path)
        : settings.branding?.cover_image_path
          ? this.runtime.resolveAsset(settings.branding.cover_image_path)
          : this.products()[0]?.main_image_path
            ? this.runtime.resolveAsset(this.products()[0].main_image_path)
            : undefined,
      url: canonicalUrl.toString(),
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: titleParts.filter(Boolean).join(' | '),
        url: canonicalUrl.toString(),
        description: descriptionParts.join(' • '),
        isPartOf: {
          '@type': 'WebSite',
          name: settings.general?.site_name || 'Online Restaurant',
          url: this.runtime.frontendBaseUrl,
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: this.total(),
          itemListElement: itemList,
        },
      },
    });
  }
}
