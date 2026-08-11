import { RegisterRequest, AuthGateway } from '@app/domain';

export class RegisterUseCase {
    constructor(private authService: AuthGateway) {}

    async execute(data: RegisterRequest): Promise<void> {
        return this.authService.register(data);
    }
}
