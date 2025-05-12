import { AuthUseCase } from '@application/auth.use.case';
import { TokenUseCase } from '@application/token.use.case';
import { UserUseCase } from '@application/user.use.case';

export const applicationProviders = [
  AuthUseCase,
  TokenUseCase,
  UserUseCase
];
