import { Injectable } from '@angular/core';
import { AuthGateway } from '@domain/auth/abstracts/auth.gateway.abstract';
import { LoginRequest } from '@app/domain/auth/models/login-request.model';
import { LoginResponse } from '@app/domain/auth/models/login-response.model';
import { User } from '@app/domain/user/models/user.model';
import { UserRoleEnum } from '@domain/user/enums/user-role.enum';

const MOCK_CREDENTIALS: Record<string, { password: string; user: User }> = {
  admin: {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      roles: [UserRoleEnum.Admin],
      profile: { avatarUrl: '', bio: 'System administrator', phone: '' }
    }
  },
  user: {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      roles: [UserRoleEnum.User],
      profile: { avatarUrl: '', bio: 'Standard user account', phone: '' }
    }
  }
};

// Angular-side mock — no backend involved yet. json-server has no real auth story,
// so login/logout/refresh are simulated entirely in the client for now.
@Injectable()
export class AuthApiAdapter implements AuthGateway {

  private currentUser: User | null = null;

  login(payload: LoginRequest): Promise<LoginResponse> {
    const match = MOCK_CREDENTIALS[payload.username];
    if (!match || match.password !== payload.password) {
      return Promise.reject(new Error('Invalid credentials'));
    }
    this.currentUser = match.user;
    return Promise.resolve(this.buildResponse(match.user));
  }

  refreshToken(): Promise<LoginResponse> {
    if (!this.currentUser) {
      return Promise.reject(new Error('Not authenticated'));
    }
    return Promise.resolve(this.buildResponse(this.currentUser));
  }

  logout(): void {
    this.currentUser = null;
  }

  private buildResponse(user: User): LoginResponse {
    return {
      accessToken: `mock-access-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      expiresIn: 3600,
      user
    };
  }
}
