import { describe, it, expect } from 'vitest';
import { SubmitFormUseCase } from './submit-form.use-case';
import { createMockFormRepository, createMockSubmissionRepository, createFakeForm, createFakePage, createFakeField, createFakeFieldValidator, createFakeSubmission } from '../test-utils';
import { FormValidationService } from '@app/domain';
import { FieldValidatorTypeEnum } from '@app/domain';

describe('SubmitFormUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const submissionRepository = createMockSubmissionRepository();
        const formValidationService = new FormValidationService(); // واقعی، نه mock
        const useCase = new SubmitFormUseCase(submissionRepository, formRepository, formValidationService);
        return { useCase, formRepository, submissionRepository };
    }

    it('throws when the user has already submitted this form', async () => {
        const { useCase, submissionRepository } = setup();
        submissionRepository.getSubmission.mockResolvedValue(createFakeSubmission());

        await expect(useCase.execute('f1', 'user-1', {})).rejects.toThrow('You have already submitted this form.');
    });

    it('throws with validation errors when answers are invalid', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmission.mockResolvedValue(null);

        const requiredField = createFakeField({
            name: 'email',
            validators: [createFakeFieldValidator({ type: FieldValidatorTypeEnum.Required, message: 'Email is required' })]
        });
        const form = createFakeForm({ pages: [createFakePage({ fields: [requiredField] })] });
        formRepository.getFormById.mockResolvedValue(form);

        await expect(useCase.execute('f1', 'user-1', { email: '' })).rejects.toThrow('Email is required');
        expect(submissionRepository.createSubmission).not.toHaveBeenCalled();
    });

    it('creates the submission when answers pass validation', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmission.mockResolvedValue(null);

        const requiredField = createFakeField({
            name: 'email',
            validators: [createFakeFieldValidator({ type: FieldValidatorTypeEnum.Required, message: 'Email is required' })]
        });
        const form = createFakeForm({ pages: [createFakePage({ fields: [requiredField] })] });
        formRepository.getFormById.mockResolvedValue(form);
        submissionRepository.createSubmission.mockResolvedValue(createFakeSubmission({ id: 's1' }));

        const result = await useCase.execute('f1', 'user-1', { email: 'test@example.com' });

        expect(submissionRepository.createSubmission).toHaveBeenCalledWith({
            formId: 'f1',
            submittedBy: 'user-1',
            answers: { email: 'test@example.com' }
        });
        expect(result.id).toBe('s1');
    });
});
