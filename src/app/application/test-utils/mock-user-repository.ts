import { vi, type Mocked } from 'vitest';
import { UserRepository } from '@app/domain';

export function createMockUserRepository(): Mocked<UserRepository> {
    return {
        getProfile: vi.fn(),
        updateProfile: vi.fn(),
        changePassword: vi.fn()
    };
}
