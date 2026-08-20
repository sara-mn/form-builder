import { Service, inject } from '@angular/core';
import { LoginRequest, RegisterRequest, User } from '@app/domain';
import { StorageGateway } from '@app/domain/storage.gateway.abstract';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { LoginUseCase } from '@application/auth/login.use-case';
import { LogoutUseCase } from '@application/auth/logout.use-case';
import { RefreshTokenUseCase } from '@app/application/auth/refresh-token.use-case';
import { RegisterUseCase } from '@application/auth/register.use-case';

@Service()
export class AuthFacade {
    private loginUseCase = inject(LoginUseCase);
    private logoutUseCase = inject(LogoutUseCase);
    private refreshTokenUseCase = inject(RefreshTokenUseCase);
    private registerUseCase = inject(RegisterUseCase);
    private authState = inject(AuthState);
    private tokenStorage = inject(StorageGateway);

    login(data: LoginRequest): Promise<User> {
        return this.loginUseCase.execute(data).then((user) => {
            this.authState.setUser(user);
            return user;
        });
    }

    register(data: RegisterRequest): Promise<void> {
        return this.registerUseCase.execute(data);
    }

    async restoreSession(): Promise<void> {
        const user = await this.refreshTokenUseCase.execute();
        if (user) {
            this.authState.setUser(user);
        }
        this.authState.setSessionRestored(true);
    }

    logout(): Promise<void> {
        return this.logoutUseCase.execute().then(() => {
            this.authState.clearUser();
        });
    }

    getAccessToken(): string | null {
        return this.tokenStorage.getItem('token');
    }

    async refreshAccessToken(): Promise<string | null> {
        const user = await this.refreshTokenUseCase.execute();
        if (!user) {
            this.authState.clearUser();
            return null;
        }
        this.authState.setUser(user);
        return this.tokenStorage.getItem('token');
    }
}
