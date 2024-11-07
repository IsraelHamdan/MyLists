import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-qj5svwcz8goxynls.us.auth0.com',
      clientId: '1wAK1fYPekHMLY3pXPM7W3zxGTTewuIC',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideHttpClient(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-button-right',
      preventDuplicates: true,
    }), provideAnimationsAsync(),
  ],
};
