import { UserRoleEnum } from '@domain/user/enums/user-role.enum';
import { UserProfile } from '@app/domain/user/models/user-profile.model';
import { Guid } from '@app/domain';

export interface User {
    id: Guid;
    email: string;
    name: string;
    roles: UserRoleEnum[];
    profile: UserProfile;
}
