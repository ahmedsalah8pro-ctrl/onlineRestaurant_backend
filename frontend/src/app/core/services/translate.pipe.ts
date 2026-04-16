import { Pipe, PipeTransform, inject } from '@angular/core';
import { UiTextService } from './ui-text';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Necessary because it depends on the global locale signal which changes outside the pipe inputs
})
export class TranslatePipe implements PipeTransform {
  private readonly ui = inject(UiTextService);

  transform(key: string): string {
    return this.ui.t(key);
  }
}
