import { describe, it, expect } from 'vitest';
import { GetProfileUseCase } from './get-profile.use-case';
import { createMockUserRepository, createFakeUser } from '../test-utils';

describe('GetProfileUseCase', () => {
    function setup() {
        const userRepository = createMockUserRepository();
        const useCase = new GetProfileUseCase(userRepository);
        return { useCase, userRepository };
    }

    it('calls userRepository.getProfile with no arguments', async () => {
        const { useCase, userRepository } = setup();
        userRepository.getProfile.mockResolvedValue(createFakeUser());

        await useCase.execute();

        expect(userRepository.getProfile).toHaveBeenCalledTimes(1);
        expect(userRepository.getProfile).toHaveBeenCalledWith();
    });

    it('returns the user from userRepository.getProfile', async () => {
        const { useCase, userRepository } = setup();
        const user = createFakeUser({ name: 'Sara Mn' });
        userRepository.getProfile.mockResolvedValue(user);

        const result = await useCase.execute();

        expect(result).toEqual(user);
    });

    it('propagates the rejection when userRepository.getProfile fails', async () => {
        const { useCase, userRepository } = setup();
        userRepository.getProfile.mockRejectedValue(new Error('Session expired'));

        await expect(useCase.execute()).rejects.toThrow('Session expired');
    });
});
