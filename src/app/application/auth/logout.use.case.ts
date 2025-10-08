import { AuthService } from '@app/domain';
import { StorageService } from '@domain/storage-service.abstract';

export class LogoutUseCase {
  constructor(private authService: AuthService,
              private tokenStorage: StorageService) {
  }

  async execute(): Promise<void> {
    this.authService.logout();
    this.tokenStorage.clear();
  }
}
