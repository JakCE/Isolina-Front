import { TuiRootModule, tuiNotificationOptionsProvider } from "@taiga-ui/core";
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './services/tokenInterceptor/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideAnimations(),
    JwtHelperService,
    importProvidersFrom(TuiRootModule),
    tuiNotificationOptionsProvider({
      icon: 'tuiIconHelpCircle',
      status: 'warning',
    }),
  ]
};
