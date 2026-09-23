import { User, UserRepository } from '@app/domain';

export class GetProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User> {
        return this.userRepository.getProfile();
    }
}
