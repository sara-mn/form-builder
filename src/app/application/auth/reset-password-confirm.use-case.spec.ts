import { describe, it, expect } from 'vitest';
import { ResetPasswordConfirmUseCase } from './reset-password-confirm.use-case';
import { createMockAuthGateway } from '../test-utils';
import { ConfirmPasswordResetPayload } from '@app/domain';

describe('ResetPasswordConfirmUseCase', () => {
    function setup() {
        const authGateway = createMockAuthGateway();
        const useCase = new ResetPasswordConfirmUseCase(authGateway);
        return { useCase, authGateway };
    }

    const payload: ConfirmPasswordResetPayload = {
        token: 'reset-token-abc123',
        newPassword: 'BrandNewPass789!'
    };

    it('calls authGateway.confirmPasswordReset with the exact payload provided', async () => {
        const { useCase, authGateway } = setup();
        authGateway.confirmPasswordReset.mockResolvedValue(undefined);

        await useCase.execute(payload);

        expect(authGateway.confirmPasswordReset).toHaveBeenCalledTimes(1);
        expect(authGateway.confirmPasswordReset).toHaveBeenCalledWith(payload);
    });

    it('resolves with no value on success', async () => {
        const { useCase, authGateway } = setup();
        authGateway.confirmPasswordReset.mockResolvedValue(undefined);

        await expect(useCase.execute(payload)).resolves.toBeUndefined();
    });

    it('propagates the rejection when authGateway.confirmPasswordReset fails', async () => {
        const { useCase, authGateway } = setup();
        authGateway.confirmPasswordReset.mockRejectedValue(new Error('Reset token is invalid or expired'));

        await expect(useCase.execute(payload)).rejects.toThrow('Reset token is invalid or expired');
    });
});
