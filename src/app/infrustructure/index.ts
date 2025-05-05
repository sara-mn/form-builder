import {IAuthApi} from '@domain/auth/abstracts/auth-api.abstract';
import {AuthApiService} from '@app/infrustructure/api/auth-api.service';
import {UserApi} from '@domain/user/abstracts/user-api.abstract';
import {UserApiService} from '@app/infrustructure/api/user-api.service';
import {StorageService} from '@app/infrustructure/storage/storage.service';
import {IStorage} from '@domain/storage.abstract';

export const Providers = [
  { provide: IAuthApi, useClass: AuthApiService },
  { provide: UserApi, useClass: UserApiService },
  { provide: IStorage, useClass: StorageService },
]
