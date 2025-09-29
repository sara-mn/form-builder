import { Injectable } from '@angular/core';
import { AuthService } from '@domain/auth/abstracts/auth-service.abstract';
import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { lastValueFrom, Observable } from 'rxjs';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthApiService implements AuthService {

  constructor(private http: HttpClient) {
  }

  private authUrl = '/api/auth';

  login(payload: LoginRequest): Promise<LoginResponse> {
    const $res: Observable<LoginResponse> = this.http.post<LoginResponse>(`${this.authUrl}/login`, payload);
    return lastValueFrom($res);
  }

  refreshToken(): Promise<LoginResponse> {
    const $res: Observable<LoginResponse> = this.http.post<LoginResponse>('/auth/refresh', {});
    return lastValueFrom($res);
  }
}
