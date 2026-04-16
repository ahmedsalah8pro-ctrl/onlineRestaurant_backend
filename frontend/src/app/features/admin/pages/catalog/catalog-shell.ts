import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-catalog-shell',
  standalone: true,
  imports: [SharedUiModule, RouterOutlet],
  template: `
    <div class="catalog-page-container">
      <main class="catalog-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .catalog-page-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      min-height: calc(100vh - 120px);
      width: 100%;
    }
    
    .catalog-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 100%;
    }
  `]
})
export class CatalogShell {}
