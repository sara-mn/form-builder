import { Injectable } from '@angular/core';
import { UserRepository } from '@domain/user/abstracts/user.repository.abstract';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '@app/domain/user/models/user-profile.model';
import { User } from '@app/domain/user/models/user.model';
import { environment } from '@env/environment';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserApiAdapter implements UserRepository {
    private usersUrl = `${environment.apiUrl}/users`;

    constructor(private httpClient: HttpClient) {}

    getProfile(): Promise<UserProfile> {
        // No real auth wired up yet — mock "current user" is always id 1.
        const $res: Observable<UserProfile> = this.httpClient.get<User>(`${this.usersUrl}/1`).pipe(map((user) => user.profile));
        return lastValueFrom($res);
    }
}
