import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  
  // Skip loading for specific requests if needed
  if (req.headers.has('X-Skip-Loading')) {
    return next(req.clone({ headers: req.headers.delete('X-Skip-Loading') }));
  }

  // Use a 500ms debounce to avoid showing the spinner for fast requests
  // This helps keep the UI fluid and avoids flickering/blurring on add-to-cart
  const timer = setTimeout(() => loading.show(), 500);

  return next(req).pipe(
    finalize(() => {
      clearTimeout(timer);
      loading.hide();
    })
  );
};
