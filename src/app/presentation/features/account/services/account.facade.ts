import { Service, inject } from '@angular/core';
import { ChangePasswordRequest, UpdateProfileRequest, User } from '@app/domain';
import { GetProfileUseCase } from '@application/user/get-profile.use-case';
import { UpdateProfileUseCase } from '@application/user/update-profile.use-case';
import { ChangePasswordUseCase } from '@application/user/change-password.use-case';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Service()
export class AccountFacade {
    private getProfileUseCase = inject(GetProfileUseCase);
    private updateProfileUseCase = inject(UpdateProfileUseCase);
    private changePasswordUseCase = inject(ChangePasswordUseCase);
    private authState = inject(AuthState);

    getProfile(): Promise<User> {
        return this.getProfileUseCase.execute();
    }

    updateProfile(payload: UpdateProfileRequest): Promise<User> {
        return this.updateProfileUseCase.execute(payload).then((user) => {
            this.authState.setUser(user);
            return user;
        });
    }
    changePassword(payload: ChangePasswordRequest): Promise<void> {
        return this.changePasswordUseCase.execute(payload);
    }
}
