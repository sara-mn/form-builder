import { ApplicationConfig, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
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
        provideZonelessChangeDetection(),
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- PrimeNG's Dialog/ConfirmDialog/Tooltip still depend on @angular/animations; blocked on PrimeNG's own migration (see primefaces/primeng#18863)
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
            ripple: true,
            license:
                'eyJpZCI6ImZlM2VmNWYxLTVlMzctNDNlNS05MmU5LTRmMTg4YjY1OTg3OSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTA1MDg4MTMsImV4cCI6MTgyMjA0NDgxM30.d4mT1LLGlt8aws-jGNErV47-ZeO2eBjhmIkvrWJ9FmlSl1qDdeu-tABWmmJAZ2xaCsyAl96QfLFtx2jDS7boBw'
        }),
        provideHttpClient(withInterceptors([authInterceptor])),
        ...infrastructureProviders,
        ...applicationProviders
    ]
};
