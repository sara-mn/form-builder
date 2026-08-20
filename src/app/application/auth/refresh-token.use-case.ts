import { AuthGateway, LoginRequest, LoginResponse, User } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class RefreshTokenUseCase {
    constructor(
        private authService: AuthGateway,
        private tokenStorage: StorageGateway
    ) {}

    async execute(): Promise<User | null> {
        try {
            const res: LoginResponse = await this.authService.refreshToken();
            this.tokenStorage.setItem('token', res.accessToken);
            return res.user;
        } catch {
            this.tokenStorage.removeItem('token');
            return null;
        }
    }
}
