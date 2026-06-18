import { Injectable } from '@angular/core';
import { UserService } from '@domain/user/abstracts/user-service.abstract';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '@app/domain/user/models/register-request.model';
import { lastValueFrom, Observable } from 'rxjs';
import { UserProfile } from '@app/domain/user/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements UserService {

  constructor(private httpClient: HttpClient) {
  }

  register(payload: RegisterRequest): Promise<boolean> {
    const $res: Observable<boolean> = this.httpClient.post<boolean>('/api/register', payload);
    return lastValueFrom($res);
  };

  getProfile(): Promise<UserProfile> {
    const $res: Observable<UserProfile> = this.httpClient.get<UserProfile>('/api/user');
    return lastValueFrom($res);
  };
}
