import { UserRepository, RegisterRequest } from '@app/domain';

export class RegisterUseCase {
  constructor(private userService: UserRepository) {
  }

  async execute(data: RegisterRequest): Promise<boolean> {
    return this.userService.register(data);
  }
}
