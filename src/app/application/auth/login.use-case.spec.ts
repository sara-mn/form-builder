import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from './login.use-case';
import { createMockAuthGateway, createMockStorageGateway, createFakeUser, createFakeLoginResponse } from '../test-utils';
import { LoginRequest, UserRoleEnum } from '@app/domain';

describe('LoginUseCase', () => {
    function setup() {
        const authGateway = createMockAuthGateway();
        const storageGateway = createMockStorageGateway();
        const useCase = new LoginUseCase(authGateway, storageGateway);
        return { useCase, authGateway, storageGateway };
    }

    const mockUser = createFakeUser({
        id: 'user-guid-1',
        email: 'admin@example.com',
        name: 'Admin User',
        roles: [UserRoleEnum.Admin]
    });
    const mockLoginResponse = createFakeLoginResponse({
        accessToken: 'mock-access-token',
        user: mockUser
    });

    it('logs in successfully and returns the user', async () => {
        const { useCase, authGateway } = setup();
        authGateway.login.mockResolvedValue(mockLoginResponse);
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        const result = await useCase.execute(payload);

        expect(result).toEqual(mockUser);
    });

    it('calls authGateway.login with the exact payload provided', async () => {
        const { useCase, authGateway } = setup();
        authGateway.login.mockResolvedValue(mockLoginResponse);
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        await useCase.execute(payload);

        expect(authGateway.login).toHaveBeenCalledTimes(1);
        expect(authGateway.login).toHaveBeenCalledWith(payload);
    });

    it('stores the access token via storageGateway.setItem after a successful login', async () => {
        const { useCase, authGateway, storageGateway } = setup();
        authGateway.login.mockResolvedValue(mockLoginResponse);
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        await useCase.execute(payload);

        expect(storageGateway.setItem).toHaveBeenCalledWith('token', mockLoginResponse.accessToken);
    });

    it('throws and does not call authGateway.login when username is missing', async () => {
        const { useCase, authGateway } = setup();
        const payload: LoginRequest = { username: '', password: 'admin123' };

        await expect(useCase.execute(payload)).rejects.toThrow('Username and password must be provided');
        expect(authGateway.login).not.toHaveBeenCalled();
    });

    it('throws and does not call authGateway.login when password is missing', async () => {
        const { useCase, authGateway } = setup();
        const payload: LoginRequest = { username: 'admin@example.com', password: '' };

        await expect(useCase.execute(payload)).rejects.toThrow('Username and password must be provided');
        expect(authGateway.login).not.toHaveBeenCalled();
    });

    it('does not call storageGateway.setItem when validation fails', async () => {
        const { useCase, storageGateway } = setup();
        const payload: LoginRequest = { username: '', password: '' };

        await expect(useCase.execute(payload)).rejects.toThrow();
        expect(storageGateway.setItem).not.toHaveBeenCalled();
    });
});
