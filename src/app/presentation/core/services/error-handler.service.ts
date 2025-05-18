import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthFacadeService } from '@features/auth/services/auth-facade.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private authFacade: AuthFacadeService) {
  }

  handleError(reqUrl: string, error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 400) {
      errorMessage = 'error';
    } else if (error.status === 403) {
      errorMessage = 'error';
    } else {
      errorMessage = 'error';
    }

    alert(errorMessage);

  }
}
