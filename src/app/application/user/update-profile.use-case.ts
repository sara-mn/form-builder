import { AuthGateway } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class UpdateProfileUseCase {
  constructor(private authService: AuthGateway,
              private tokenStorage: StorageGateway) {
  }

  async execute(): Promise<void> {

  }
}
