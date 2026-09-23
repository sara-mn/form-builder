import { describe, it, expect } from 'vitest';
import { ChangePasswordUseCase } from './change-password.use-case';
import { createMockUserRepository } from '../test-utils';
import { ChangePasswordRequest } from '@app/domain';

describe('ChangePasswordUseCase', () => {
    function setup() {
        const userRepository = createMockUserRepository();
        const useCase = new ChangePasswordUseCase(userRepository);
        return { useCase, userRepository };
    }

    const payload: ChangePasswordRequest = {
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass456!'
    };

    it('calls userRepository.changePassword with the exact payload provided', async () => {
        const { useCase, userRepository } = setup();
        userRepository.changePassword.mockResolvedValue(undefined);

        await useCase.execute(payload);

        expect(userRepository.changePassword).toHaveBeenCalledTimes(1);
        expect(userRepository.changePassword).toHaveBeenCalledWith(payload);
    });

    it('resolves with no value on success', async () => {
        const { useCase, userRepository } = setup();
        userRepository.changePassword.mockResolvedValue(undefined);

        await expect(useCase.execute(payload)).resolves.toBeUndefined();
    });

    it('propagates the rejection when userRepository.changePassword fails', async () => {
        const { useCase, userRepository } = setup();
        userRepository.changePassword.mockRejectedValue(new Error('Current password is incorrect'));

        await expect(useCase.execute(payload)).rejects.toThrow('Current password is incorrect');
    });
});
