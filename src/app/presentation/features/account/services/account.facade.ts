import { Service, inject } from '@angular/core';
import { ChangePasswordRequest, UpdateProfileRequest, UserProfile } from '@app/domain';
import { GetProfileUseCase } from '@application/user/get-profile.use-case';
import { UpdateProfileUseCase } from '@application/user/update-profile.use-case';
import { ChangePasswordUseCase } from '@application/user/change-password.use-case';

@Service()
export class AccountFacade {
    private getProfileUseCase = inject(GetProfileUseCase);
    private updateProfileUseCase = inject(UpdateProfileUseCase);
    private changePasswordUseCase = inject(ChangePasswordUseCase);

    getProfile(): Promise<UserProfile> {
        return this.getProfileUseCase.execute();
    }

    updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
        return this.updateProfileUseCase.execute(payload);
    }

    changePassword(payload: ChangePasswordRequest): Promise<void> {
        return this.changePasswordUseCase.execute(payload);
    }
}
