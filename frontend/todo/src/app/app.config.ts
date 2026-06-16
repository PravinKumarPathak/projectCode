import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpIntercepterBasicAuth } from './service/http/http-intercepter-basic-auth';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuth, multi: true},

    provideHttpClient(withInterceptorsFromDi())
  ]
};
