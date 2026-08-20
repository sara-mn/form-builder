import { vi, type Mocked } from 'vitest';
import { FormRepository } from '@app/domain';

export function createMockFormRepository(): Mocked<FormRepository> {
    return {
        getFormById: vi.fn(),
        getAllForms: vi.fn(),
        createForm: vi.fn(),
        updateForm: vi.fn(),
        deleteForm: vi.fn()
    };
}
