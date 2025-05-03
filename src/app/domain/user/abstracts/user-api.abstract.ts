import {RegisterRequest} from '@app/domain/user/models/register-request.model';
import {Observable} from 'rxjs';
import {UserProfile} from '@app/domain/user/models/user-profile.model';

export abstract class UserApi {
  abstract register(data: RegisterRequest): Observable<boolean>;
  abstract getProfile(): Observable<UserProfile>;
}
