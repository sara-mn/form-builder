import { LoginUseCase } from '@application/auth/login.use.case';
import { AuthGateway, UserRepository } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';
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
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new LoginUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: LogoutUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new LogoutUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: UpdateProfileUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new UpdateProfileUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: ResetPasswordUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new ResetPasswordUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: ResetPasswordConfirmUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new ResetPasswordConfirmUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new RefreshTokenUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: ChangePasswordUseCase,
    useFactory: (auth: AuthGateway, ts: StorageGateway) =>
      new ChangePasswordUseCase(auth, ts),
    deps: [AuthGateway, StorageGateway],
  },
  {
    provide: UserRegisterUseCase,
    useFactory: (userService: UserRepository) =>
      new UserRegisterUseCase(userService),
    deps: [UserRepository],
  }
];
