import { AuthService } from '@app/domain';
import { StorageService } from '@domain/storage-service.abstract';

export class UpdateProfileUseCase {
  constructor(private authService: AuthService,
              private tokenStorage: StorageService) {
  }

  async execute(): Promise<void> {

  }
}
