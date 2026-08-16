import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { infrastructureProviders } from '@app/infrastructure';
import { applicationProviders } from '@app/application';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthFacade } from './presentation/features/auth/services/auth.facade';
import { authInterceptor } from './presentation/core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(() => {
            const authFacade = inject(AuthFacade);
            return authFacade.restoreSession();
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.app-dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities'
                    }
                }
            },
            ripple: true
        }),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        ...infrastructureProviders,
        ...applicationProviders
    ]
};
