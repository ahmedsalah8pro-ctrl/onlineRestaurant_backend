import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UiTextService } from '../../../../core/services/ui-text';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-access-shell',
  standalone: true,
  imports: [SharedUiModule, RouterOutlet],
  template: `
    <div class="access-container animate-fade-in pt-4">
      <div class="access-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .access-container { padding-bottom: 5rem; }
    
    .panel-glass-header {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 1.5rem 2.5rem 0;
    }
    
    .header-content { display: flex; justify-content: space-between; align-items: center; }
    
    .eyebrow-premium {
      display: block;
      color: var(--primary-color);
      font-size: 0.65rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      margin-bottom: 0.25rem;
    }
    
    .page-title-access { margin: 0; font-size: 1.4rem; font-weight: 800; color: #f1f5f9; }

    .header-tabs {
      display: flex;
      gap: 2rem;
    }

    .tab-link {
      display: flex;
      align-items: center;
      padding: 1rem 0.5rem;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      
      &:hover { color: #f1f5f9; }
      
      &.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }
    }

    .access-content {
      margin-top: 2rem;
    }
  `]
})
export class AccessShell {
  protected readonly ui = inject(UiTextService);
}
