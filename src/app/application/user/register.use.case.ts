import { UserService, RegisterRequest } from '@app/domain';

export class RegisterUseCase {
  constructor(private userService: UserService) {
  }

  async execute(data: RegisterRequest): Promise<boolean> {
    return this.userService.register(data);
  }
}
