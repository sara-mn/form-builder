import { Injectable } from '@angular/core';
import { AuthGateway } from '@domain/auth/abstracts/auth.gateway.abstract';
import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { User } from '@app/domain/user/models/user.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, map } from 'rxjs';
import { RegisterRequest } from '@app/domain';
import { base64UrlToBase64 } from '../utils/base64-url.util';

interface AuthServerResponse {
    accessToken: string;
    user: User;
}

interface RegisterServerResponse {
    message: string;
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
        const $res: Observable<LoginResponse> = this.httpClient.post<AuthServerResponse>(`${this.authUrl}/refresh`, {}, { withCredentials: true }).pipe(map((res) => this.toLoginResponse(res)));
        return lastValueFrom($res);
    }

    register(payload: RegisterRequest): Promise<void> {
        const name = [payload.firstName, payload.lastName].filter(Boolean).join(' ') || payload.email;
        const body = {
            email: payload.email,
            password: payload.password,
            mobile: payload.mobile,
            name
        };
        const $res: Observable<void> = this.httpClient.post<RegisterServerResponse>(`${this.authUrl}/register`, body).pipe(map(() => undefined));
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
        return JSON.parse(atob(base64UrlToBase64(token.split('.')[1])));
    }
}
