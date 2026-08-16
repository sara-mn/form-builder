import { TestBed } from '@angular/core/testing';
import { AuthFacade } from './auth.facade';
import { LoginUseCase } from '@application/auth/login.use-case';
import { LogoutUseCase } from '@application/auth/logout.use-case';
import { RefreshTokenUseCase } from '@application/auth/refresh-token.use-case';
import { RegisterUseCase } from '@application/auth/register.use-case';
import { StorageGateway } from '@app/domain/storage.gateway.abstract';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { createFakeUser, createFakeRegisterRequest } from '@app/application/test-utils';

describe('AuthFacade', () => {
    let service: AuthFacade;
    let authState: AuthState;
    let loginUseCase: Pick<LoginUseCase, 'execute'>;
    let logoutUseCase: Pick<LogoutUseCase, 'execute'>;
    let refreshTokenUseCase: Pick<RefreshTokenUseCase, 'execute'>;
    let registerUseCase: Pick<RegisterUseCase, 'execute'>;
    let storageGateway: Pick<StorageGateway, 'getItem' | 'setItem' | 'removeItem'>;

    beforeEach(() => {
        loginUseCase = { execute: vi.fn() };
        logoutUseCase = { execute: vi.fn() };
        refreshTokenUseCase = { execute: vi.fn() };
        registerUseCase = { execute: vi.fn() };
        storageGateway = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                AuthState,
                { provide: LoginUseCase, useValue: loginUseCase },
                { provide: LogoutUseCase, useValue: logoutUseCase },
                { provide: RefreshTokenUseCase, useValue: refreshTokenUseCase },
                { provide: RegisterUseCase, useValue: registerUseCase },
                { provide: StorageGateway, useValue: storageGateway }
            ]
        });

        service = TestBed.inject(AuthFacade);
        authState = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('login', () => {
        it('delegates to LoginUseCase and sets the authenticated user', async () => {
            const user = createFakeUser();
            (loginUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(user);

            const result = await service.login({ username: 'user@example.com', password: 'secret' });

            expect(loginUseCase.execute).toHaveBeenCalledWith({ username: 'user@example.com', password: 'secret' });
            expect(result).toEqual(user);
            expect(authState.currentUser()).toEqual(user);
        });
    });

    describe('register', () => {
        it('delegates registration to RegisterUseCase without touching AuthState', async () => {
            (registerUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
            const data = createFakeRegisterRequest();

            await service.register(data);

            expect(registerUseCase.execute).toHaveBeenCalledWith(data);
            expect(authState.currentUser()).toBeNull();
        });

        it('propagates errors from RegisterUseCase (e.g. duplicate email)', async () => {
            (registerUseCase.execute as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Email already exists'));

            await expect(service.register(createFakeRegisterRequest())).rejects.toThrow('Email already exists');
        });
    });

    describe('restoreSession', () => {
        it('sets the user and marks the session restored when a valid session exists', async () => {
            const user = createFakeUser();
            (refreshTokenUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(user);

            await service.restoreSession();

            expect(authState.currentUser()).toEqual(user);
            expect(authState.sessionRestored()).toBe(true);
        });

        it('marks the session restored without setting a user when no session exists', async () => {
            (refreshTokenUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(null);

            await service.restoreSession();

            expect(authState.currentUser()).toBeNull();
            expect(authState.sessionRestored()).toBe(true);
        });
    });

    describe('logout', () => {
        it('delegates to LogoutUseCase and clears the current user', async () => {
            authState.setUser(createFakeUser());
            (logoutUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

            await service.logout();

            expect(logoutUseCase.execute).toHaveBeenCalled();
            expect(authState.currentUser()).toBeNull();
        });
    });

    describe('getAccessToken', () => {
        it('reads the token from StorageGateway', () => {
            (storageGateway.getItem as ReturnType<typeof vi.fn>).mockReturnValue('stored-token');

            expect(service.getAccessToken()).toBe('stored-token');
            expect(storageGateway.getItem).toHaveBeenCalledWith('token');
        });
    });

    describe('refreshAccessToken', () => {
        it('sets the user and returns the token when refresh succeeds', async () => {
            const user = createFakeUser();
            (refreshTokenUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(user);
            (storageGateway.getItem as ReturnType<typeof vi.fn>).mockReturnValue('new-token');

            const token = await service.refreshAccessToken();

            expect(authState.currentUser()).toEqual(user);
            expect(token).toBe('new-token');
        });

        it('clears the user and returns null when refresh fails', async () => {
            authState.setUser(createFakeUser());
            (refreshTokenUseCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(null);

            const token = await service.refreshAccessToken();

            expect(authState.currentUser()).toBeNull();
            expect(token).toBeNull();
        });
    });
});
