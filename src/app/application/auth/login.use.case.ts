import { AuthGateway, LoginRequest, LoginResponse, User } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class LoginUseCase {
  constructor(private authService: AuthGateway,
              private tokenStorage: StorageGateway) {
  }
  async execute(loginPayload: LoginRequest): Promise<User> {

    if (!loginPayload.username || !loginPayload.password) {
      throw new Error('Username and password must be provided');
    }

    const res: LoginResponse = await this.authService.login(loginPayload);

    this.tokenStorage.setItem('token', res.accessToken);

    return res.user;
  }
}
