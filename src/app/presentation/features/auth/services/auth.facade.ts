import { Injectable } from '@angular/core';
import { RefreshTokenUseCase } from '@app/application/auth/refresh-token.use.case';
import { LoginRequest, User } from '@app/domain';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { LoginUseCase } from '@application/auth/login.use.case';
import { LogoutUseCase } from '@application/auth/logout.use.case';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(
        private loginUseCase: LoginUseCase,
        private logoutUseCase: LogoutUseCase,
        private refreshTokenUseCase: RefreshTokenUseCase,
        private authState: AuthState
    ) {}

    login(data: LoginRequest): Promise<User> {
        return this.loginUseCase.execute(data).then((user) => {
            this.authState.setUser(user);
            return user;
        });
    }

    async restoreSession(): Promise<void> {
        const user = await this.refreshTokenUseCase.execute();
        if (user) {
            this.authState.setUser(user);
        }
    }

    logout(): Promise<void> {
        return this.logoutUseCase.execute().then(() => {
            this.authState.clearUser();
        });
    }
}
