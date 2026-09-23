import { inject, Service } from '@angular/core';
import { UserRepository } from '@domain/user/abstracts/user.repository.abstract';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/domain/user/models/user.model';
import { environment } from '@env/environment';
import { lastValueFrom, map, Observable } from 'rxjs';
import { UpdateProfileRequest, ChangePasswordRequest } from '@app/domain';

@Service()
export class UserApiAdapter implements UserRepository {
    private httpClient = inject(HttpClient);
    private authUrl = `${environment.apiUrl}/api/auth`;

    getProfile(): Promise<User> {
        const $res: Observable<User> = this.httpClient.get<User>(`${this.authUrl}/profile`);
        return lastValueFrom($res);
    }

    updateProfile(payload: UpdateProfileRequest): Promise<User> {
        const $res: Observable<User> = this.httpClient.patch<User>(`${this.authUrl}/profile`, payload);
        return lastValueFrom($res);
    }

    changePassword(payload: ChangePasswordRequest): Promise<void> {
        const $res: Observable<void> = this.httpClient.post<{ message: string }>(`${this.authUrl}/change-password`, payload).pipe(map(() => undefined));
        return lastValueFrom($res);
    }
}
