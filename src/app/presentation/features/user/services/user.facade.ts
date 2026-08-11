import { Injectable } from '@angular/core';
import { RegisterUseCase } from '@app/application/auth/register.use-case';
import { RegisterRequest } from '@app/domain';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    constructor(private registerUseCase: RegisterUseCase) {}
    // user.facade.ts
    register(data: RegisterRequest): Promise<void> {
        return this.registerUseCase.execute(data);
    }
}
