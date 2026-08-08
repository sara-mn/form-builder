import { describe, it, expect } from 'vitest';
import { GetFormsWithSubmissionCountsUseCase } from './get-forms-with-submission-counts.use-case';
import { createMockFormRepository, createMockSubmissionRepository, createFakeForm, createFakeSubmission } from '../test-utils';

describe('GetFormsWithSubmissionCountsUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new GetFormsWithSubmissionCountsUseCase(formRepository, submissionRepository);
        return { useCase, formRepository, submissionRepository };
    }

    it('pairs each form with its correct submission count', async () => {
        const { useCase, formRepository, submissionRepository } = setup();

        const formA = createFakeForm({ id: 'form-a' });
        const formB = createFakeForm({ id: 'form-b' });
        formRepository.getAllForms.mockResolvedValue([formA, formB]);

        submissionRepository.getAllSubmissions.mockResolvedValue([createFakeSubmission({ id: 's1', formId: 'form-a' }), createFakeSubmission({ id: 's2', formId: 'form-a' }), createFakeSubmission({ id: 's3', formId: 'form-b' })]);

        const result = await useCase.execute();

        expect(result).toEqual([
            { form: formA, submissionCount: 2 },
            { form: formB, submissionCount: 1 }
        ]);
    });

    it('returns a zero count for a form with no submissions', async () => {
        const { useCase, formRepository, submissionRepository } = setup();

        const form = createFakeForm({ id: 'form-a' });
        formRepository.getAllForms.mockResolvedValue([form]);
        submissionRepository.getAllSubmissions.mockResolvedValue([]);

        const result = await useCase.execute();

        expect(result).toEqual([{ form, submissionCount: 0 }]);
    });

    it('makes exactly one call to each repository (avoids N+1)', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        formRepository.getAllForms.mockResolvedValue([]);
        submissionRepository.getAllSubmissions.mockResolvedValue([]);

        await useCase.execute();

        expect(formRepository.getAllForms).toHaveBeenCalledTimes(1);
        expect(submissionRepository.getAllSubmissions).toHaveBeenCalledTimes(1);
    });
});
