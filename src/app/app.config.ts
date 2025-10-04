import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { refreshInterceptor } from './core/interceptors/refresh.interceptor';
import { provideRouterSpinner } from './core/loading/provide-router-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor,refreshInterceptor])),
    provideRouterSpinner()
    // provideAnimations(), // ¡Asegúrate de que esto esté presente!
  ],
};
