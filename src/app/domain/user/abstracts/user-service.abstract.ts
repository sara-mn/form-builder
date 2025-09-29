import { RegisterRequest } from '@app/domain/user/models/register-request.model';
import { UserProfile } from '@app/domain/user/models/user-profile.model';

export abstract class UserService {
  abstract register(data: RegisterRequest): Promise<boolean>;

  abstract getProfile(): Promise<UserProfile>;
}
