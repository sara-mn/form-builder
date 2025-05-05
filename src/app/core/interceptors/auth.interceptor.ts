import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenUseCase} from '@application/token.use.case';
import {catchError, finalize, throwError} from 'rxjs';
import {ErrorHandlerService} from '@core/services/error-handler.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenUseCase = inject(TokenUseCase),
    errorHandler = inject(ErrorHandlerService),
    accessToken = tokenUseCase.getAccessToken();

  if (!accessToken) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandler.handleError(authReq.url, error);
      return throwError(error);
    }),
    finalize(() => {
    })
  );

};
