import { describe, it, expect } from 'vitest';
import { GetSubmissionsByFormIdUseCase } from './get-submissions-by-form-id.use-case';
import { createMockSubmissionRepository, createFakeSubmission } from '../test-utils';

describe('GetSubmissionsByFormIdUseCase', () => {
    it('returns all submissions for a form', async () => {
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new GetSubmissionsByFormIdUseCase(submissionRepository);
        const fakeSubmissions = [createFakeSubmission({ id: 's1' }), createFakeSubmission({ id: 's2' })];
        submissionRepository.getSubmissionsByFormId.mockResolvedValue(fakeSubmissions);

        const result = await useCase.execute('f1');

        expect(submissionRepository.getSubmissionsByFormId).toHaveBeenCalledWith('f1');
        expect(result).toEqual(fakeSubmissions);
    });
});
