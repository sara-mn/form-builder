import { describe, it, expect } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { createFakeRegisterRequest, createMockAuthGateway } from '../test-utils';

describe('RegisterUseCase', () => {
    it('delegates registration to the auth gateway', async () => {
        const authGateway = createMockAuthGateway();
        const useCase = new RegisterUseCase(authGateway);
        const registerData = createFakeRegisterRequest();
        authGateway.register.mockResolvedValue(undefined);

        await useCase.execute(registerData);

        expect(authGateway.register).toHaveBeenCalledWith(registerData);
    });

    it('propagates the error when the auth gateway rejects (e.g. duplicate email)', async () => {
        const authGateway = createMockAuthGateway();
        const useCase = new RegisterUseCase(authGateway);
        const registerData = createFakeRegisterRequest({ email: 'taken@example.com' });
        authGateway.register.mockRejectedValue(new Error('Email already exists'));

        await expect(useCase.execute(registerData)).rejects.toThrow('Email already exists');
    });
});
