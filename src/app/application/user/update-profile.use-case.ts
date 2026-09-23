import { UpdateProfileRequest, User, UserRepository } from '@app/domain';

export class UpdateProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payload: UpdateProfileRequest): Promise<User> {
        return this.userRepository.updateProfile(payload);
    }
}
