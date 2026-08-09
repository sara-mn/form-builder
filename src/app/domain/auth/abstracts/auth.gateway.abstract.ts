import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { RegisterRequest } from '@app/domain/user/models/register-request.model';

export abstract class AuthGateway {
    abstract login(payload: LoginRequest): Promise<LoginResponse>;
    abstract refreshToken(): Promise<LoginResponse>;
    abstract logout(): Promise<void>;
    abstract register(payload: RegisterRequest): Promise<void>;
}
