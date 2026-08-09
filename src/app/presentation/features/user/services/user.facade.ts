import { Injectable } from '@angular/core';
import { RegisterUseCase } from '@app/application/auth/register.use-case';
import { RegisterRequest } from '@app/domain';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    constructor(private registerUseCase: RegisterUseCase) {}

    register(data: RegisterRequest): Promise<boolean> {
        return this.registerUseCase.execute(data);
    }
}
