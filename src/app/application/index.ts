import { LoginUseCase } from '@application/auth/login.use.case';
import { AuthService, UserService } from '@app/domain';
import { StorageService } from '@domain/storage-service.abstract';
import { LogoutUseCase } from '@application/auth/logout.use.case';
import { UpdateProfileUseCase } from '@app/application/auth/update-profile.use.case';
import { ResetPasswordUseCase } from '@app/application/auth/reset-password.use.case';
import { ResetPasswordConfirmUseCase } from '@app/application/auth/reset-password-confirm.use.case';
import { RefreshTokenUseCase } from '@application/auth/refresh-token.use.case';
import { ChangePasswordUseCase } from '@app/application/auth/change-password.use.case';
import { RegisterUseCase as UserRegisterUseCase } from '@application/user/register.use.case';

export const applicationProviders = [
  {
    provide: LoginUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new LoginUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: LogoutUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new LogoutUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: UpdateProfileUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new UpdateProfileUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: ResetPasswordUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new ResetPasswordUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: ResetPasswordConfirmUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new ResetPasswordConfirmUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new RefreshTokenUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: ChangePasswordUseCase,
    useFactory: (auth: AuthService, ts: StorageService) =>
      new ChangePasswordUseCase(auth, ts),
    deps: [AuthService, StorageService],
  },
  {
    provide: UserRegisterUseCase,
    useFactory: (userService: UserService) =>
      new UserRegisterUseCase(userService),
    deps: [UserService],
  }
];
