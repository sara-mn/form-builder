import { UserProfile } from '@app/domain/user/models/user-profile.model';

export abstract class UserRepository {
    abstract getProfile(): Promise<UserProfile>;
}
