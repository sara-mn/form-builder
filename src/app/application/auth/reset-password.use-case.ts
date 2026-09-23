import { RequestPasswordResetPayload, AuthGateway } from '@app/domain';

export class ResetPasswordUseCase {
    constructor(private authService: AuthGateway) {}

    async execute(payload: RequestPasswordResetPayload): Promise<void> {
        return this.authService.requestPasswordReset(payload);
    }
}
