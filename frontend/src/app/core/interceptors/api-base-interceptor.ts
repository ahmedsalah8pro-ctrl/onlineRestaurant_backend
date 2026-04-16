import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RuntimeConfigService } from '../services/runtime-config';
import { ThemeService } from '../services/theme';
import { SessionIdService } from '../services/session-id';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const runtime = inject(RuntimeConfigService);
  const theme = inject(ThemeService);
  const sessionId = inject(SessionIdService);
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const url = isAbsolute
    ? req.url
    : `${runtime.apiBaseUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;

  return next(
    req.clone({
      url,
      setHeaders: {
        'Accept-Language': theme.locale(),
        'X-Requested-With': 'XMLHttpRequest',
        'X-Session-Id': sessionId.sessionId,
      },
      withCredentials: true,
    }),
  );
};
