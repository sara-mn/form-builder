import { AuthService } from '@domain/auth/abstracts/auth-service.abstract';
import { AuthApiAdapter } from '@app/infrastructure/api/auth-api.adapter';
import { UserService } from '@domain/user/abstracts/user-service.abstract';
import { UserApiAdapter } from '@app/infrastructure/api/user-api.adapter';
import { TokenStorageService } from '@app/infrastructure/storage/token-storage.service';
import { StorageService } from '@domain/storage-service.abstract';
import { FormService } from '@domain/form/abstracts/form-service.abstract';
import { FormApiAdapter } from '@app/infrastructure/api/form-api.adapter';

export const infrastructureProviders = [
  { provide: AuthService, useClass: AuthApiAdapter },
  { provide: UserService, useClass: UserApiAdapter },
  { provide: StorageService, useClass: TokenStorageService },
  { provide: FormService, useClass: FormApiAdapter }
];
