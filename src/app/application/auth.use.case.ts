import {IAuthApi} from '@domain/auth/abstracts/auth-api.abstract';
import {LoginRequest} from '@domain/auth/models/login-request.model';
import {map, Observable, tap} from 'rxjs';
import {LoginResponse} from '@app/domain';
import {TokenUseCase} from '@application/token.use.case';

export class AuthUseCase {

  constructor(private authApi: IAuthApi,
              private tokenUseCase:TokenUseCase) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.authApi.login(data).pipe(
      tap(res => {
        this.tokenUseCase.setAccessToken(res.accessToken);
      })
    );
  }

  logout(): void {
    this.tokenUseCase.clearAccessToken();
  }

  isAuthenticated(): boolean {
    return !!this.tokenUseCase.getAccessToken();
  }

  refreshToken(): Observable<void> {
    return this.authApi.refreshToken().pipe(
      tap(res => {
        this.tokenUseCase.setAccessToken(res.accessToken);
      }),
      map(() => void 0)
    );
  }
}
