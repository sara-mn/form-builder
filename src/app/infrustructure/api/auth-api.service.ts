import {Injectable} from '@angular/core';
import {IAuthApi} from '@app/domain/auth/abstracts/auth-api.abstract';
import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '@app/infrustructure/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApi {

  constructor(private http: HttpClient,
              private storageService: StorageService) {
  }

  private authUrl = '/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, payload).pipe(
      tap((res: LoginResponse) => {
        this.setAccessToken(res.accessToken);
        // Optional: refreshToken can be set in cookie
      })
    );
  }

  logout() {
    this.clearAccessToken();
    // Optional: Call logout endpoint to invalidate refresh token
  }

  private setAccessToken(token: string) {
    this.tokenSubject.next(token);
    localStorage.setItem('accessToken', token); // or memory only
  }

  private clearAccessToken() {
    this.tokenSubject.next(null);
    localStorage.removeItem('accessToken');
  }

  get token(): string | null {
    return this.tokenSubject.value || localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  refreshToken(): Observable<LoginResponse>  {
    return this.http.post('/auth/refresh', {}).pipe(
      tap((res: any) => {
        this.setAccessToken(res.accessToken);
      })
    );
  }
}
