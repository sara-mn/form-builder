import { describe, it, expect } from 'vitest';
import { GetFormsWithSubmissionCountsUseCase } from './get-forms-with-submission-counts.use-case';
import {
    createMockFormRepository,
    createMockSubmissionRepository,
    createFakeForm,
    createFakeSubmission
} from '../test-utils';
import { FormStatusEnum, UserPermissionEnum } from '@app/domain';

const canEdit = [UserPermissionEnum.FormEdit];
const cannotEdit = [UserPermissionEnum.FormView];

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

        submissionRepository.getAllSubmissions.mockResolvedValue([
            createFakeSubmission({ id: 's1', formId: 'form-a' }),
            createFakeSubmission({ id: 's2', formId: 'form-a' }),
            createFakeSubmission({ id: 's3', formId: 'form-b' })
        ]);

        const result = await useCase.execute(canEdit);

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

        const result = await useCase.execute(canEdit);

        expect(result).toEqual([{ form, submissionCount: 0 }]);
    });

    it('makes exactly one call to each repository (avoids N+1)', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        formRepository.getAllForms.mockResolvedValue([]);
        submissionRepository.getAllSubmissions.mockResolvedValue([]);

        await useCase.execute(canEdit);

        expect(formRepository.getAllForms).toHaveBeenCalledTimes(1);
        expect(submissionRepository.getAllSubmissions).toHaveBeenCalledTimes(1);
    });

    it('hides draft forms from a user who cannot edit forms', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        const draft = createFakeForm({ id: 'draft', status: FormStatusEnum.Draft });
        const published = createFakeForm({ id: 'published', status: FormStatusEnum.Published });
        formRepository.getAllForms.mockResolvedValue([draft, published]);
        submissionRepository.getAllSubmissions.mockResolvedValue([]);

        const result = await useCase.execute(cannotEdit);

        expect(result).toEqual([{ form: published, submissionCount: 0 }]);
    });

    it('shows draft forms to a user who can edit forms', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        const draft = createFakeForm({ id: 'draft', status: FormStatusEnum.Draft });
        formRepository.getAllForms.mockResolvedValue([draft]);
        submissionRepository.getAllSubmissions.mockResolvedValue([]);

        const result = await useCase.execute(canEdit);

        expect(result).toEqual([{ form: draft, submissionCount: 0 }]);
    });
});
