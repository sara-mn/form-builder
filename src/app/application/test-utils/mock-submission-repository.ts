import { vi, type Mocked } from 'vitest';
import { SubmissionRepository } from '@app/domain';

export function createMockSubmissionRepository(): Mocked<SubmissionRepository> {
    return {
        getSubmission: vi.fn(),
        getAllSubmissions: vi.fn(),
        getSubmissionsByFormId: vi.fn(),
        createSubmission: vi.fn()
    };
}
