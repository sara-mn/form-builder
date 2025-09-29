import { AuthService } from '@domain/auth/abstracts/auth-service.abstract';
import { AuthApiService } from '@app/infrustructure/api/auth-api.service';
import { UserService } from '@domain/user/abstracts/user-service.abstract';
import { UserApiService } from '@app/infrustructure/api/user-api.service';
import { TokenStorageService } from '@app/infrustructure/storage/token-storage.service';
import { StorageService } from '@domain/storage-service.abstract';

export const infrastructureProviders = [
  { provide: AuthService, useClass: AuthApiService },
  { provide: UserService, useClass: UserApiService },
  { provide: StorageService, useClass: TokenStorageService }
];
