import {AuthApi} from '@domain/auth/abstracts/auth-api.abstract';
import {LoginRequest} from '@domain/auth/models/login-request.model';
import {Observable, tap} from 'rxjs';
import {LoginResponse} from '@app/domain';

export class LoginUseCase {
  constructor(private authApi: AuthApi) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    // میشه اینجا کارهای دیگه مثل ذخیره‌ی توکن هم انجام داد
    return this.authApi.login(data).pipe(
      tap(res => localStorage.setItem('token', res.accessToken))
    );
  }
}
