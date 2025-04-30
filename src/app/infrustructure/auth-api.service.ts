import { Injectable } from '@angular/core';
import {AuthApi} from '@app/domain/auth/services/auth-api.abstract';
import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi{

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', payload);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
