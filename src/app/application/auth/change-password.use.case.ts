import { AuthGateway } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class ChangePasswordUseCase {
  constructor(private authService: AuthGateway,
              private tokenStorage: StorageGateway) {
  }

  async execute(): Promise<void> {

  }
}
