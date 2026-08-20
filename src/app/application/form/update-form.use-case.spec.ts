import { describe, it, expect } from 'vitest';
import { UpdateFormUseCase } from './update-form.use-case';
import { createMockFormRepository, createMockSubmissionRepository, createFakeForm, createFakeSubmission, createFakeField, createFakePage, createFakeFieldValidator } from '../test-utils';
import { FieldValidatorTypeEnum, FieldTypeEnum } from '@app/domain';

describe('UpdateFormUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new UpdateFormUseCase(formRepository, submissionRepository);
        return { useCase, formRepository, submissionRepository };
    }

    it('updates the form when there are no submissions', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([]);
        formRepository.updateForm.mockResolvedValue(createFakeForm({ id: 'f1' }));

        const result = await useCase.execute('f1', { title: 'New title' });

        expect(submissionRepository.getSubmissionsByFormId).toHaveBeenCalledWith('f1');
        expect(formRepository.updateForm).toHaveBeenCalledWith('f1', { title: 'New title' });
        expect(result.id).toBe('f1');
    });

    it('throws and does not persist when the form is locked', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([createFakeSubmission()]);

        await expect(useCase.execute('f1', {})).rejects.toThrow('Form is locked');
        expect(formRepository.updateForm).not.toHaveBeenCalled();
    });

    it('does not throw and treats fields as empty when changes.pages is undefined', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([]);
        formRepository.updateForm.mockResolvedValue(createFakeForm({ id: 'f1' }));

        await useCase.execute('f1', { title: 'Only metadata changed' });

        expect(formRepository.updateForm).toHaveBeenCalledWith('f1', { title: 'Only metadata changed' });
    });

    it('throws when a changed field has an invalid validator config, and does not persist', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([]);

        const page = createFakePage({
            fields: [
                createFakeField({
                    validators: [createFakeFieldValidator({ type: FieldValidatorTypeEnum.Pattern, value: '(unclosed[' })]
                })
            ]
        });

        await expect(useCase.execute('f1', { pages: [page] })).rejects.toThrow('Invalid regular expression');
        expect(formRepository.updateForm).not.toHaveBeenCalled();
    });

    it('updates the form when validators across multiple pages and fields are all valid', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([]);
        formRepository.updateForm.mockResolvedValue(createFakeForm({ id: 'f1' }));

        const page1 = createFakePage({
            id: 'page-1',
            fields: [
                createFakeField({
                    id: 'field-1',
                    name: 'username',
                    validators: [createFakeFieldValidator({ type: FieldValidatorTypeEnum.Pattern, value: '^[a-z]+$' })]
                })
            ]
        });

        const page2 = createFakePage({
            id: 'page-2',
            order: 1,
            fields: [
                createFakeField({
                    id: 'field-2',
                    name: 'age',
                    type: FieldTypeEnum.Number,
                    validators: [createFakeFieldValidator({ type: FieldValidatorTypeEnum.MaxValue, value: 100 })]
                })
            ]
        });

        const changes = { pages: [page1, page2] };
        const result = await useCase.execute('f1', changes);

        expect(formRepository.updateForm).toHaveBeenCalledWith('f1', changes);
        expect(result.id).toBe('f1');
    });
});
