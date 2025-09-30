import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { AuthFacadeService } from '@features/auth/services/auth-facade.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authFacade = inject(AuthFacadeService),
  //   errorHandler = inject(ErrorHandlerService),
    // accessToken = authFacade.getAccessToken();

  // if (accessToken) {
  //   req = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  //   });
  // }


  // return next(req).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if (error.status === 401) {
  //       authFacade.refreshToken().pipe(
  //         switchMap(() => {
  //           const newToken = authFacade.getAccessToken();
  //           const cloned = req.clone({
  //             setHeaders: { Authorization: `Bearer ${newToken}` }
  //           });
  //           return next(cloned);
  //         }),
  //         catchError(() => {
  //           authFacade.logout();
  //           return throwError(() => error);
  //         })
  //       );
  //     }
  //     errorHandler.handleError(req.url, error);
  //     return throwError(() => error);
  //   }),
  //   finalize(() => {
  //   })
  // );
    return next(req)
};
