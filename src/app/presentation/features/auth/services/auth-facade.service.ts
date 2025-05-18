import {Injectable} from '@angular/core';
import {LoginRequest} from '@app/domain';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {AuthUseCase} from '@application/auth.use.case';
import {TokenUseCase} from '@application/token.use.case';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private accessToken$ = new BehaviorSubject<string | null>(null);

  constructor(private authUseCase: AuthUseCase,
              private tokenUseCase: TokenUseCase) {
  }

  isAuthenticated$: Observable<boolean> = this.accessToken$.pipe(map(token => !!token));

  initFromStorage() {
    const token = this.tokenUseCase.getAccessToken();
    this.accessToken$.next(token);
  }

  login(data: LoginRequest): Observable<void> {
    return this.authUseCase.login(data).pipe(
      tap(res => {
        this.setAccessToken(res.accessToken);
      }),
      map(() => void 0)
    );
  }

  refreshToken(): Observable<void> {
    return this.authUseCase.refreshToken().pipe(
      tap(res => {
        this.setAccessToken(res.accessToken);
      }),
      map(() => void 0)
    );
  }

  logout() {
    this.clearAccessToken();
  }

  getAccessToken(){
    return this.tokenUseCase.getAccessToken();
  }

  private setAccessToken(token: string) {
    this.tokenUseCase.setAccessToken(token);
    this.accessToken$.next(token);
  }

  private clearAccessToken() {
    this.tokenUseCase.clearAccessToken();
    this.accessToken$.next(null);
  }
}
