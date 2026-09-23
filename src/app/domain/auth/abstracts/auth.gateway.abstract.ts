import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { RegisterRequest } from '@app/domain/auth/models/register-request.model';
import { ConfirmPasswordResetPayload, RequestPasswordResetPayload } from '@app/domain/auth/models/reset-password-request.model';

export abstract class AuthGateway {
    abstract login(payload: LoginRequest): Promise<LoginResponse>;
    abstract refreshToken(): Promise<LoginResponse>;
    abstract logout(): Promise<void>;
    abstract register(payload: RegisterRequest): Promise<void>;
    abstract requestPasswordReset(payload: RequestPasswordResetPayload): Promise<void>;
    abstract confirmPasswordReset(payload: ConfirmPasswordResetPayload): Promise<void>;
}
