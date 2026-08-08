import { AuthGateway } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';

export class ResetPasswordUseCase {
  constructor(private authService: AuthGateway,
              private tokenStorage: StorageGateway) {
  }

  async execute(): Promise<void> {

  }
}
