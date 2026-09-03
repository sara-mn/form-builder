import { ConfirmPasswordResetPayload, AuthGateway } from '@app/domain';

export class ResetPasswordConfirmUseCase {
    constructor(private authService: AuthGateway) {}

    async execute(payload: ConfirmPasswordResetPayload): Promise<void> {
        return this.authService.confirmPasswordReset(payload);
    }
}
