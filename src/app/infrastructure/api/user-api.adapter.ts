import { Injectable } from '@angular/core';
import { UserService } from '@domain/user/abstracts/user-service.abstract';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '@app/domain/user/models/register-request.model';
import { lastValueFrom, map, Observable } from 'rxjs';
import { UserProfile } from '@app/domain/user/models/user-profile.model';
import { User } from '@app/domain/user/models/user.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiAdapter implements UserService {

  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {
  }

  register(payload: RegisterRequest): Promise<boolean> {
    const $res: Observable<boolean> = this.httpClient.post<User>(this.usersUrl, payload)
      .pipe(map(() => true));
    return lastValueFrom($res);
  };

  getProfile(): Promise<UserProfile> {
    // No real auth wired up yet — mock "current user" is always id 1.
    const $res: Observable<UserProfile> = this.httpClient.get<User>(`${this.usersUrl}/1`)
      .pipe(map(user => user.profile));
    return lastValueFrom($res);
  };
}
