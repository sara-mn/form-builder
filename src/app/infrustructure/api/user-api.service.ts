import {Injectable} from '@angular/core';
import {UserApi} from '@app/domain/user/abstracts/user-api.abstract';
import {HttpClient} from '@angular/common/http';
import {RegisterRequest} from '@app/domain/user/models/register-request.model';
import {Observable} from 'rxjs';
import {UserProfile} from '@app/domain/user/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements UserApi {

  constructor(private httpClient: HttpClient) {
  }

  register(payload: RegisterRequest): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/register', payload)
  };

  getProfile(): Observable<UserProfile>{
    return this.httpClient.get<UserProfile>('/api/user');
  };
}
