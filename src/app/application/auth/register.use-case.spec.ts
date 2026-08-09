import { describe, it, expect } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { createMockUserRepository, createFakeRegisterRequest } from '../test-utils';

describe('RegisterUseCase', () => {
    it('delegates registration to the user repository and returns the result', async () => {
        const userRepository = createMockUserRepository();
        const useCase = new RegisterUseCase(userRepository);
        const registerData = createFakeRegisterRequest();
        userRepository.register.mockResolvedValue(true);

        const result = await useCase.execute(registerData);

        expect(userRepository.register).toHaveBeenCalledWith(registerData);
        expect(result).toBe(true);
    });

    it('returns false when registration fails', async () => {
        const userRepository = createMockUserRepository();
        const useCase = new RegisterUseCase(userRepository);
        const registerData = createFakeRegisterRequest({ email: 'taken@example.com' });
        userRepository.register.mockResolvedValue(false);

        const result = await useCase.execute(registerData);

        expect(result).toBe(false);
    });
});
