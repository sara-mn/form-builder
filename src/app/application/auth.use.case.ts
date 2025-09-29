import {IAuthApi} from '@domain/auth/abstracts/auth-api.abstract';
import {LoginRequest} from '@domain/auth/models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '@app/domain';
// import { Injectable } from '@angular/core';

// @Injectable()
export class AuthUseCase {

  constructor(private authApi: IAuthApi) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.authApi.login(payload);
  }

  refreshToken(): Observable<LoginResponse> {
    return this.authApi.refreshToken();
  }
}
