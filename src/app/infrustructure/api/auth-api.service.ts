import {Injectable} from '@angular/core';
import {IAuthApi} from '@app/domain/auth/abstracts/auth-api.abstract';
import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {Observable, tap} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthApiService implements IAuthApi {

  constructor(private http: HttpClient) {
  }

  private authUrl = '/api/auth';

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, payload);
  }

  refreshToken(): Observable<LoginResponse>  {
    return this.http.post<LoginResponse>('/auth/refresh', {});
  }
}
