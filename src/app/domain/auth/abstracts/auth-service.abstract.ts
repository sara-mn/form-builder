import {LoginRequest} from '@app/domain/auth/models/login-request.model';
import {LoginResponse} from '@app/domain/auth/models/login-response.model';

export abstract class AuthService {
  abstract login(payload: LoginRequest): Promise<LoginResponse>;
  abstract refreshToken(): Promise<LoginResponse>;
  abstract logout(): void;
}
