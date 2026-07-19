import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { Router } from '@angular/router';

const SKIP_AUTH_HEADER_FOR = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authFacade = inject(AuthFacade),
        router = inject(Router),
        errorHandler = inject(ErrorHandlerService),
        isAuthEndpoint = SKIP_AUTH_HEADER_FOR.some((url) => req.url.includes(url)),
        accessToken = authFacade.getAccessToken();

    const authReq = !isAuthEndpoint && accessToken ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }) : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status !== 401 || isAuthEndpoint) {
                return throwError(() => error);
            }

            return from(authFacade.refreshAccessToken()).pipe(
                switchMap((newToken) => {
                    if (!newToken) {
                        return from(authFacade.logout()).pipe(
                            switchMap(() => {
                                router.navigate(['/login']).then();
                                return throwError(() => error);
                            })
                        );
                    }
                    const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                    return next(retryReq);
                })
            );
        })
    );
};
