import { Injectable } from '@angular/core';
import { AuthGateway } from '@domain/auth/abstracts/auth.gateway.abstract';
import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { User } from '@app/domain/user/models/user.model';
import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, map } from 'rxjs';

interface AuthServerResponse {
    accessToken: string;
    user: User;
}

@Injectable()
export class AuthApiAdapter implements AuthGateway {
    private authUrl = environment.apiUrl + '/api/auth';

    constructor(private httpClient: HttpClient) {}

    login(payload: LoginRequest): Promise<LoginResponse> {
        const body = {
            username: payload.username,
            password: payload.password
        };
        const $res: Observable<LoginResponse> = this.httpClient.post<AuthServerResponse>(`${this.authUrl}/login`, body, { withCredentials: true }).pipe(map((res) => this.toLoginResponse(res)));
        return lastValueFrom($res);
    }

    refreshToken(): Promise<LoginResponse> {
        const $res: Observable<LoginResponse> = this.httpClient.post<{ accessToken: string }>(`${this.authUrl}/refresh`, {}, { withCredentials: true }).pipe(map((res) => this.toRefreshedResponse(res.accessToken)));
        return lastValueFrom($res);
    }

    logout(): Promise<void> {
        const $res: Observable<void> = this.httpClient.post<void>(`${this.authUrl}/logout`, {}, { withCredentials: true });
        return lastValueFrom($res);
    }

    private toLoginResponse(res: AuthServerResponse): LoginResponse {
        const expiresIn = this.getExpiresInFromToken(res.accessToken);
        return {
            accessToken: res.accessToken,
            expiresIn,
            user: res.user
        };
    }

    private toRefreshedResponse(accessToken: string): LoginResponse {
        const payload = this.decodeToken(accessToken);
        return {
            accessToken,
            expiresIn: this.getExpiresInFromToken(accessToken),
            user: {
                id: payload.sub,
                email: payload.email,
                roles: payload.roles
            } as User
        };
    }

    private getExpiresInFromToken(token: string): number {
        try {
            const payload = this.decodeToken(token);
            const nowInSeconds = Math.floor(Date.now() / 1000);
            return payload.exp ? payload.exp - nowInSeconds : 3600;
        } catch {
            return 3600;
        }
    }

    private decodeToken(token: string): any {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
