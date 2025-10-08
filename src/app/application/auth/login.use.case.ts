import { AuthService, LoginRequest, LoginResponse, User } from '@app/domain';
import { StorageService } from '@domain/storage-service.abstract';

export class LoginUseCase {
  constructor(private authService: AuthService,
              private tokenStorage: StorageService) {
  }
  // isAuthenticated$: Observable<boolean> = this.accessToken$.pipe(map(token => !!token));

  // initFromStorage() {
  //   const token = this.tokenUseCase.getAccessToken();
  //   this.accessToken$.next(token);
  // }

  // getAccessToken(){
  //   return this.tokenUseCase.getAccessToken();
  // }

  async execute(loginPayload: LoginRequest): Promise<User> {

    if (!loginPayload.username || !loginPayload.password) {
      throw new Error('Username and password must be provided');
    }

    const res: LoginResponse = await this.authService.login(loginPayload);

    this.tokenStorage.setItem('token', res.accessToken);

    return res.user;
  }
}
