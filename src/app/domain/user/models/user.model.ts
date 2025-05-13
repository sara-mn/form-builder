import {UserRoleEnum} from '@domain/user/enums/user-role.enum';
import {UserProfile} from '@app/domain/user/models/user-profile.model';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRoleEnum[];
  profile: UserProfile;
}
