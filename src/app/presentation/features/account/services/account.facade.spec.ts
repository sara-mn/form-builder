import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccountFacade } from './account.facade';
import { GetProfileUseCase } from '@application/user/get-profile.use-case';
import { UpdateProfileUseCase } from '@application/user/update-profile.use-case';
import { ChangePasswordUseCase } from '@application/user/change-password.use-case';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { createFakeUser } from '@app/application/test-utils/fixtures';
import { UpdateProfileRequest, ChangePasswordRequest } from '@app/domain';

describe('AccountFacade', () => {
    let facade: AccountFacade;
    let getProfileUseCase: { execute: ReturnType<typeof vi.fn> };
    let updateProfileUseCase: { execute: ReturnType<typeof vi.fn> };
    let changePasswordUseCase: { execute: ReturnType<typeof vi.fn> };
    let authState: AuthState;

    beforeEach(() => {
        getProfileUseCase = { execute: vi.fn() };
        updateProfileUseCase = { execute: vi.fn() };
        changePasswordUseCase = { execute: vi.fn() };

        TestBed.configureTestingModule({
            providers: [AccountFacade, AuthState, { provide: GetProfileUseCase, useValue: getProfileUseCase }, { provide: UpdateProfileUseCase, useValue: updateProfileUseCase }, { provide: ChangePasswordUseCase, useValue: changePasswordUseCase }]
        });

        facade = TestBed.inject(AccountFacade);
        authState = TestBed.inject(AuthState);
    });

    it('getProfile delegates to GetProfileUseCase and returns the user', async () => {
        const user = createFakeUser();
        getProfileUseCase.execute.mockResolvedValue(user);

        const result = await facade.getProfile();

        expect(getProfileUseCase.execute).toHaveBeenCalledTimes(1);
        expect(result).toEqual(user);
    });

    it('updateProfile delegates to UpdateProfileUseCase with the payload', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };
        const updatedUser = createFakeUser({ name: 'New Name' });
        updateProfileUseCase.execute.mockResolvedValue(updatedUser);

        await facade.updateProfile(payload);

        expect(updateProfileUseCase.execute).toHaveBeenCalledWith(payload);
    });

    it('updateProfile syncs AuthState with the updated user on success', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };
        const updatedUser = createFakeUser({ name: 'New Name' });
        updateProfileUseCase.execute.mockResolvedValue(updatedUser);

        await facade.updateProfile(payload);

        expect(authState.currentUser()).toEqual(updatedUser);
    });

    it('updateProfile returns the updated user', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };
        const updatedUser = createFakeUser({ name: 'New Name' });
        updateProfileUseCase.execute.mockResolvedValue(updatedUser);

        const result = await facade.updateProfile(payload);

        expect(result).toEqual(updatedUser);
    });

    it('does not touch AuthState when updateProfile fails', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };
        updateProfileUseCase.execute.mockRejectedValue(new Error('Update failed'));

        await expect(facade.updateProfile(payload)).rejects.toThrow('Update failed');
        expect(authState.currentUser()).toBeNull();
    });

    it('changePassword delegates to ChangePasswordUseCase with the payload', async () => {
        const payload: ChangePasswordRequest = { currentPassword: 'Old123!', newPassword: 'New456!' };
        changePasswordUseCase.execute.mockResolvedValue(undefined);

        await facade.changePassword(payload);

        expect(changePasswordUseCase.execute).toHaveBeenCalledWith(payload);
    });
});
