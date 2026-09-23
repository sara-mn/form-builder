import { describe, it, expect } from 'vitest';
import { ResetPasswordUseCase } from './reset-password.use-case';
import { createMockAuthGateway } from '../test-utils';
import { RequestPasswordResetPayload } from '@app/domain';

describe('ResetPasswordUseCase', () => {
    function setup() {
        const authGateway = createMockAuthGateway();
        const useCase = new ResetPasswordUseCase(authGateway);
        return { useCase, authGateway };
    }

    const payload: RequestPasswordResetPayload = { email: 'user@example.com' };

    it('calls authGateway.requestPasswordReset with the exact payload provided', async () => {
        const { useCase, authGateway } = setup();
        authGateway.requestPasswordReset.mockResolvedValue(undefined);

        await useCase.execute(payload);

        expect(authGateway.requestPasswordReset).toHaveBeenCalledTimes(1);
        expect(authGateway.requestPasswordReset).toHaveBeenCalledWith(payload);
    });

    it('resolves with no value on success', async () => {
        const { useCase, authGateway } = setup();
        authGateway.requestPasswordReset.mockResolvedValue(undefined);

        await expect(useCase.execute(payload)).resolves.toBeUndefined();
    });

    it('propagates the rejection when authGateway.requestPasswordReset fails', async () => {
        const { useCase, authGateway } = setup();
        authGateway.requestPasswordReset.mockRejectedValue(new Error('No account found for this email'));

        await expect(useCase.execute(payload)).rejects.toThrow('No account found for this email');
    });
});
