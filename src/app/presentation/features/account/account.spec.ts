import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Account } from './account';
import { AccountFacade } from './services/account.facade';
import { AccountFormCreator } from './services/account-form-creator';
import { createFakeUser } from '@app/application/test-utils/fixtures';

describe('Account', () => {
    let component: Account;
    let fixture: ComponentFixture<Account>;
    let accountFacade: Pick<AccountFacade, 'getProfile' | 'updateProfile' | 'changePassword'>;

    beforeEach(() => {
        accountFacade = {
            getProfile: vi.fn(),
            updateProfile: vi.fn(),
            changePassword: vi.fn()
        };

        TestBed.configureTestingModule({
            imports: [Account],
            providers: [AccountFormCreator, { provide: AccountFacade, useValue: accountFacade }]
        });
    });

    async function createComponent(profile = createFakeUser()) {
        (accountFacade.getProfile as ReturnType<typeof vi.fn>).mockResolvedValue(profile);
        fixture = TestBed.createComponent(Account);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    }

    it('should create', async () => {
        await createComponent();
        expect(component).toBeTruthy();
    });

    it('patches the profile form with the loaded user on init', async () => {
        const user = createFakeUser({ name: 'Sara Mn', profile: { avatarUrl: '', bio: '', mobile: '09121234567' } });
        await createComponent(user);

        expect(component.profileForm.getRawValue()).toEqual({ name: 'Sara Mn', mobile: '09121234567' });
    });

    it('calls accountFacade.updateProfile with the adapted payload on valid submit', async () => {
        await createComponent();
        (accountFacade.updateProfile as ReturnType<typeof vi.fn>).mockResolvedValue(createFakeUser());
        component.profileForm.setValue({ name: 'New Name', mobile: '09129999999' });

        component.onSubmitProfile();
        await fixture.whenStable();

        expect(accountFacade.updateProfile).toHaveBeenCalledWith({ name: 'New Name', mobile: '09129999999' });
    });

    it('shows the saved message after a successful profile update', async () => {
        await createComponent();
        (accountFacade.updateProfile as ReturnType<typeof vi.fn>).mockResolvedValue(createFakeUser());
        component.profileForm.setValue({ name: 'New Name', mobile: '09129999999' });

        component.onSubmitProfile();
        await fixture.whenStable();
        fixture.detectChanges();

        const message = fixture.nativeElement.querySelector('[data-testid="profile-saved-message"]');
        expect(message).toBeTruthy();
    });

    it('does not call accountFacade.updateProfile when the profile form is invalid', async () => {
        await createComponent();
        component.profileForm.setValue({ name: '', mobile: '' });

        component.onSubmitProfile();

        expect(accountFacade.updateProfile).not.toHaveBeenCalled();
    });

    it('calls accountFacade.changePassword with the adapted payload on valid submit', async () => {
        await createComponent();
        (accountFacade.changePassword as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.changePasswordForm.setValue({
            currentPassword: 'OldPass123!',
            newPassword: 'NewPass456!',
            confirmPassword: 'NewPass456!'
        });

        component.onSubmitChangePassword();
        await fixture.whenStable();

        expect(accountFacade.changePassword).toHaveBeenCalledWith({
            currentPassword: 'OldPass123!',
            newPassword: 'NewPass456!'
        });
    });

    it('shows the changed message and resets the form after a successful password change', async () => {
        await createComponent();
        (accountFacade.changePassword as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.changePasswordForm.setValue({
            currentPassword: 'OldPass123!',
            newPassword: 'NewPass456!',
            confirmPassword: 'NewPass456!'
        });

        component.onSubmitChangePassword();
        await fixture.whenStable();
        fixture.detectChanges();

        const message = fixture.nativeElement.querySelector('[data-testid="password-changed-message"]');
        expect(message).toBeTruthy();
        expect(component.changePasswordForm.getRawValue()).toEqual({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    });

    it('does not call accountFacade.changePassword when passwords do not match', async () => {
        await createComponent();
        component.changePasswordForm.setValue({
            currentPassword: 'OldPass123!',
            newPassword: 'NewPass456!',
            confirmPassword: 'Different789!'
        });

        component.onSubmitChangePassword();

        expect(accountFacade.changePassword).not.toHaveBeenCalled();
    });
});
