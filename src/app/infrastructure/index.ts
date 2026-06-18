import { AuthService } from '@domain/auth/abstracts/auth-service.abstract';
import { AuthApiService } from '@app/infrastructure/api/auth-api.service';
import { UserService } from '@domain/user/abstracts/user-service.abstract';
import { UserApiService } from '@app/infrastructure/api/user-api.service';
import { TokenStorageService } from '@app/infrastructure/storage/token-storage.service';
import { StorageService } from '@domain/storage-service.abstract';

export const infrastructureProviders = [
  { provide: AuthService, useClass: AuthApiService },
  { provide: UserService, useClass: UserApiService },
  { provide: StorageService, useClass: TokenStorageService }
];
