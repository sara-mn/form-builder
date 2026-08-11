import { describe, it, expect } from 'vitest';
import { RefreshTokenUseCase } from './refresh-token.use-case';
import { createMockAuthGateway, createMockStorageGateway, createFakeLoginResponse, createFakeUser } from '../test-utils';

describe('RefreshTokenUseCase', () => {
    function setup() {
        const authGateway = createMockAuthGateway();
        const storageGateway = createMockStorageGateway();
        const useCase = new RefreshTokenUseCase(authGateway, storageGateway);
        return { useCase, authGateway, storageGateway };
    }

    it('stores the new access token and returns the user on success', async () => {
        const { useCase, authGateway, storageGateway } = setup();
        const fakeUser = createFakeUser({ id: 'u1', name: 'Sara' });
        authGateway.refreshToken.mockResolvedValue(createFakeLoginResponse({ accessToken: 'new-token', user: fakeUser }));

        const result = await useCase.execute();

        expect(storageGateway.setItem).toHaveBeenCalledWith('token', 'new-token');
        expect(result).toEqual(fakeUser);
    });

    it('removes the token and returns null when refresh fails', async () => {
        const { useCase, authGateway, storageGateway } = setup();
        authGateway.refreshToken.mockRejectedValue(new Error('Refresh token expired'));

        const result = await useCase.execute();

        expect(storageGateway.removeItem).toHaveBeenCalledWith('token');
        expect(result).toBeNull();
    });
});
