import { UserProfile, UserRepository } from '@app/domain';

export class GetProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<UserProfile> {
        return this.userRepository.getProfile();
    }
}
