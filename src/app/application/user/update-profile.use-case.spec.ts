import { describe, it, expect } from 'vitest';
import { UpdateProfileUseCase } from './update-profile.use-case';
import { createMockUserRepository, createFakeUser } from '../test-utils';
import { UpdateProfileRequest } from '@app/domain';

describe('UpdateProfileUseCase', () => {
    function setup() {
        const userRepository = createMockUserRepository();
        const useCase = new UpdateProfileUseCase(userRepository);
        return { useCase, userRepository };
    }

    const payload: UpdateProfileRequest = {
        name: 'Updated Name',
        mobile: '09121234567'
    };

    it('calls userRepository.updateProfile with the exact payload provided', async () => {
        const { useCase, userRepository } = setup();
        userRepository.updateProfile.mockResolvedValue(createFakeUser());

        await useCase.execute(payload);

        expect(userRepository.updateProfile).toHaveBeenCalledTimes(1);
        expect(userRepository.updateProfile).toHaveBeenCalledWith(payload);
    });

    it('returns the updated user from userRepository.updateProfile', async () => {
        const { useCase, userRepository } = setup();
        const updatedUser = createFakeUser({ name: 'Updated Name' });
        userRepository.updateProfile.mockResolvedValue(updatedUser);

        const result = await useCase.execute(payload);

        expect(result).toEqual(updatedUser);
    });

    it('supports a partial payload (only mobile)', async () => {
        const { useCase, userRepository } = setup();
        const partialPayload: UpdateProfileRequest = { mobile: '09129999999' };
        userRepository.updateProfile.mockResolvedValue(createFakeUser());

        await useCase.execute(partialPayload);

        expect(userRepository.updateProfile).toHaveBeenCalledWith(partialPayload);
    });

    it('propagates the rejection when userRepository.updateProfile fails', async () => {
        const { useCase, userRepository } = setup();
        userRepository.updateProfile.mockRejectedValue(new Error('Update failed'));

        await expect(useCase.execute(payload)).rejects.toThrow('Update failed');
    });
});
