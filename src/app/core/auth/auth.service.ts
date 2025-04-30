import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials);
  }

  // register(): Observable<any> {
  //   return this.http.post<any>(`${this.API_URL}/register`, data);
  // }

  logout(): void {
    // Token aus localStorage entfernen
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
