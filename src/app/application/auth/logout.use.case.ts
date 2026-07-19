import { AuthGateway } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class LogoutUseCase {
    constructor(
        private authService: AuthGateway,
        private tokenStorage: StorageGateway
    ) {}

    async execute(): Promise<void> {
        await this.authService.logout();
        this.tokenStorage.clear();
    }
}
