import { UpdateProfileRequest, UserProfile, UserRepository } from '@app/domain';

export class UpdateProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payload: UpdateProfileRequest): Promise<UserProfile> {
        return this.userRepository.updateProfile(payload);
    }
}
