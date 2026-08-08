import { AuthGateway, LoginRequest, LoginResponse, StorageGateway, User, UserRoleEnum } from '@app/domain';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
    let useCase: LoginUseCase;
    let authGatewayMock: AuthGateway;
    let storageGatewayMock: StorageGateway;

    const mockUser: User = {
        id: 'user-guid-1',
        email: 'admin@example.com',
        name: 'Admin User',
        roles: [UserRoleEnum.Admin],
        profile: {
            avatarUrl: 'https://example.com/avatar.png',
            bio: 'Test bio'
        }
    };

    const mockLoginResponse: LoginResponse = {
        accessToken: 'mock-access-token',
        expiresIn: 3600,
        user: mockUser
    };

    beforeEach(() => {
        authGatewayMock = {
            login: vi.fn().mockResolvedValue(mockLoginResponse),
            refreshToken: vi.fn(),
            logout: vi.fn()
        };

        storageGatewayMock = {
            setItem: vi.fn(),
            getItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        };

        useCase = new LoginUseCase(authGatewayMock, storageGatewayMock);
    });

    it('should log in successfully and return the user', async () => {
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        const result = await useCase.execute(payload);

        expect(result).toEqual(mockUser);
    });

    it('should call authGateway.login with the exact payload provided', async () => {
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        await useCase.execute(payload);

        expect(authGatewayMock.login).toHaveBeenCalledTimes(1);
        expect(authGatewayMock.login).toHaveBeenCalledWith(payload);
    });

    it('should store the access token via storageGateway.setItem after a successful login', async () => {
        const payload: LoginRequest = { username: 'admin@example.com', password: 'admin123' };

        await useCase.execute(payload);

        expect(storageGatewayMock.setItem).toHaveBeenCalledWith('token', mockLoginResponse.accessToken);
    });

    it('should throw and not call authGateway.login when username is missing', async () => {
        const payload: LoginRequest = { username: '', password: 'admin123' };

        await expect(useCase.execute(payload)).rejects.toThrow('Username and password must be provided');
        expect(authGatewayMock.login).not.toHaveBeenCalled();
    });

    it('should throw and not call authGateway.login when password is missing', async () => {
        const payload: LoginRequest = { username: 'admin@example.com', password: '' };

        await expect(useCase.execute(payload)).rejects.toThrow('Username and password must be provided');
        expect(authGatewayMock.login).not.toHaveBeenCalled();
    });

    it('should not call storageGateway.setItem when validation fails', async () => {
        const payload: LoginRequest = { username: '', password: '' };

        await expect(useCase.execute(payload)).rejects.toThrow();
        expect(storageGatewayMock.setItem).not.toHaveBeenCalled();
    });
});
