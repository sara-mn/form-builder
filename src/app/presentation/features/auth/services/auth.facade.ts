import { Injectable } from '@angular/core';
import { LoginRequest, User } from '@app/domain';
import { LoginUseCase } from '@application/auth/login.use.case';
import { LogoutUseCase } from '@application/auth/logout.use.case';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(
        private loginUseCase: LoginUseCase,
        private logoutUseCase: LogoutUseCase
    ) {}

    login(data: LoginRequest): Promise<User> {
        return this.loginUseCase.execute(data);
    }

    logout(): Promise<void> {
        return this.logoutUseCase.execute();
    }
}
