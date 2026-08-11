import { describe, it, expect } from 'vitest';
import { GetSubmissionUseCase } from './get-submission.use-case';
import { createMockSubmissionRepository, createFakeSubmission } from '../test-utils';

describe('GetSubmissionUseCase', () => {
    it('returns the submission when it exists', async () => {
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new GetSubmissionUseCase(submissionRepository);
        const fakeSubmission = createFakeSubmission();
        submissionRepository.getSubmission.mockResolvedValue(fakeSubmission);

        const result = await useCase.execute('f1', 'user-1');

        expect(submissionRepository.getSubmission).toHaveBeenCalledWith('f1', 'user-1');
        expect(result).toEqual(fakeSubmission);
    });

    it('returns null when no submission exists', async () => {
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new GetSubmissionUseCase(submissionRepository);
        submissionRepository.getSubmission.mockResolvedValue(null);

        const result = await useCase.execute('f1', 'user-1');

        expect(result).toBeNull();
    });
});
