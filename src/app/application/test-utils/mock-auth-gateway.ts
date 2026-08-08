import { vi, type Mocked } from 'vitest';
import { AuthGateway } from '@app/domain';

export function createMockAuthGateway(): Mocked<AuthGateway> {
    return {
        login: vi.fn(),
        refreshToken: vi.fn(),
        logout: vi.fn()
    };
}
