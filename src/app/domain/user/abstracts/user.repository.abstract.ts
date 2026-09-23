import { User } from '@app/domain';
import { ChangePasswordRequest } from '@app/domain/user/models/change-password-request.model';
import { UpdateProfileRequest } from '@app/domain/user/models/update-profile-request.model';

export abstract class UserRepository {
    abstract getProfile(): Promise<User>;
    abstract updateProfile(payload: UpdateProfileRequest): Promise<User>;
    abstract changePassword(payload: ChangePasswordRequest): Promise<void>;
}
