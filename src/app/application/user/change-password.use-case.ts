import { ChangePasswordRequest, UserRepository } from '@app/domain';

export class ChangePasswordUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payload: ChangePasswordRequest): Promise<void> {
        return this.userRepository.changePassword(payload);
    }
}
