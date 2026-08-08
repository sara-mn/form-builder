import { describe, it, expect } from 'vitest';
import { LogoutUseCase } from './logout.use-case';
import { createMockAuthGateway, createMockStorageGateway } from '../test-utils';

describe('LogoutUseCase', () => {
    it('logs out via the auth gateway and clears storage', async () => {
        const authGateway = createMockAuthGateway();
        const storageGateway = createMockStorageGateway();
        const useCase = new LogoutUseCase(authGateway, storageGateway);
        authGateway.logout.mockResolvedValue(undefined);

        await useCase.execute();

        expect(authGateway.logout).toHaveBeenCalled();
        expect(storageGateway.clear).toHaveBeenCalled();
    });

    it('propagates the error when the auth gateway logout call fails', async () => {
        const authGateway = createMockAuthGateway();
        const storageGateway = createMockStorageGateway();
        const useCase = new LogoutUseCase(authGateway, storageGateway);
        authGateway.logout.mockRejectedValue(new Error('Network error'));

        await expect(useCase.execute()).rejects.toThrow('Network error');
        expect(storageGateway.clear).not.toHaveBeenCalled();
    });
});
