import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';

export abstract class AuthApi {
  abstract login(payload: LoginRequest): Observable<LoginResponse>;
  abstract logout(): void;
  abstract token: string | null;
  abstract isAuthenticated(): boolean;
  abstract refreshToken(): void;
}
