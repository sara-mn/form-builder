import {UserApi} from '@domain/user/abstracts/user-api.abstract';
import {RegisterRequest} from '@app/domain';
import {map, Observable} from 'rxjs';

export class RegisterUseCase {
  constructor(private userApi: UserApi) {
  }

  register(data: RegisterRequest): Observable<boolean> {
    return this.userApi.register(data).pipe(
      map(() => {return true}))
  }
}
