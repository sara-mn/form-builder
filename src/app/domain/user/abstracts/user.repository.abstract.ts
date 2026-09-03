import { ChangePasswordRequest } from '@app/domain/user/models/change-password-request.model';
import { UpdateProfileRequest } from '@app/domain/user/models/update-profile-request.model';
import { UserProfile } from '@app/domain/user/models/user-profile.model';

export abstract class UserRepository {
    abstract getProfile(): Promise<UserProfile>;
    abstract updateProfile(payload: UpdateProfileRequest): Promise<UserProfile>;
    abstract changePassword(payload: ChangePasswordRequest): Promise<void>;
}
