import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';

export abstract class IAuthApi {
  abstract login(payload: LoginRequest): Observable<LoginResponse>;
  abstract refreshToken(): Observable<LoginResponse>;
}
