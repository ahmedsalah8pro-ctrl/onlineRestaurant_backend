import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visual-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visual-rating" [class.small]="size === 'sm'" [class.large]="size === 'lg'">
      @for (star of stars(); track $index) {
        <div class="star-wrapper">
          <i class="pi pi-star-fill empty"></i>
          <div class="fill-clip" [style.width.%]="star * 100">
             <i class="pi pi-star-fill filled"></i>
          </div>
        </div>
      }
      @if (showValue) {
        <span class="rating-value">{{ value.toFixed(1) }}</span>
      }
    </div>
  `,
  styles: [`
    .visual-rating {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      
      &.small { gap: 2px; .star-wrapper { width: 14px; height: 14px; i { font-size: 13px; } } .filled { width: 14px; } .rating-value { font-size: 11px; } }
      &.large { gap: 6px; .star-wrapper { width: 24px; height: 24px; i { font-size: 22px; } } .filled { width: 24px; } .rating-value { font-size: 16px; } }
    }

    .star-wrapper {
      position: relative;
      width: 18px;
      height: 18px;
      overflow: visible;
    }

    .empty, .filled {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;
      margin: 0;
    }

    .empty {
      color: #e2e8f0;
    }

    .fill-clip {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      pointer-events: none;
    }

    .filled {
      color: #f59e0b; /* Amber 500 */
      width: 18px; /* Must match star-wrapper width to keep centered icon in place */
    }

    .rating-value {
      margin-inline-start: 4px;
      font-weight: 700;
      color: #64748b;
      font-size: 13px;
    }

    :host-context(.rtl) {
      .fill-clip {
        left: auto;
        right: 0;
        
        .filled {
           left: auto;
           right: 0;
        }
      }
    }
  `]
})
export class VisualRatingComponent {
  @Input() value: number = 0;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showValue: boolean = false;

  readonly stars = computed(() => {
    const val = this.value;
    return Array.from({ length: 5 }, (_, i) => {
      const diff = val - i;
      if (diff >= 1) return 1;
      if (diff <= 0) return 0;
      return diff;
    });
  });
}
