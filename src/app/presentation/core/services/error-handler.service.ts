import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError( reqUrl: string, error: HttpErrorResponse ) {
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
