import { LoginUseCase } from '@application/login.use.case';
import { AuthService } from '@app/domain';
import { StorageService } from '@domain/storage-service.abstract';

export const applicationProviders = [
  {
    provide: LoginUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new LoginUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },

];
