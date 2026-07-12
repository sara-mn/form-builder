import { AuthGateway } from '@domain/auth/abstracts/auth.gateway.abstract';
import { AuthApiAdapter } from '@app/infrastructure/api/auth-api.adapter';
import { UserRepository } from '@domain/user/abstracts/user.repository.abstract';
import { UserApiAdapter } from '@app/infrastructure/api/user-api.adapter';
import { TokenStorageService } from '@app/infrastructure/storage/token-storage.service';
import { StorageGateway } from '@domain/storage.gateway.abstract';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';
import { FormApiAdapter } from '@app/infrastructure/api/form-api.adapter';

export const infrastructureProviders = [
  { provide: AuthGateway, useClass: AuthApiAdapter },
  { provide: UserRepository, useClass: UserApiAdapter },
  { provide: StorageGateway, useClass: TokenStorageService },
  { provide: FormRepository, useClass: FormApiAdapter }
];
