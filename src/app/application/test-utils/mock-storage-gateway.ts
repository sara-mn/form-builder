import { vi, type Mocked } from 'vitest';
import { StorageGateway } from '@app/domain';

export function createMockStorageGateway(): Mocked<StorageGateway> {
    return {
        setItem: vi.fn(),
        getItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
    };
}
