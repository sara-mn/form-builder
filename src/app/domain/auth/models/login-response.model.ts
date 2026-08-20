import { User } from '@app/domain';

export interface LoginResponse {
    accessToken: string;
    expiresIn: number;
    user: User;
}
