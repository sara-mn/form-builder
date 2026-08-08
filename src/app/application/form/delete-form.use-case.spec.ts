import { describe, it, expect } from 'vitest';
import { DeleteFormUseCase } from './delete-form.use-case';
import { createMockFormRepository, createMockSubmissionRepository, createFakeSubmission } from '../test-utils';

describe('DeleteFormUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const submissionRepository = createMockSubmissionRepository();
        const useCase = new DeleteFormUseCase(formRepository, submissionRepository);
        return { useCase, formRepository, submissionRepository };
    }

    it('deletes the form when there are no submissions', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([]);
        formRepository.deleteForm.mockResolvedValue(undefined);

        await useCase.execute('f1');

        expect(submissionRepository.getSubmissionsByFormId).toHaveBeenCalledWith('f1');
        expect(formRepository.deleteForm).toHaveBeenCalledWith('f1');
    });

    it('throws and does not delete when the form is locked', async () => {
        const { useCase, formRepository, submissionRepository } = setup();
        submissionRepository.getSubmissionsByFormId.mockResolvedValue([createFakeSubmission()]);

        await expect(useCase.execute('f1')).rejects.toThrow('Form is locked');
        expect(formRepository.deleteForm).not.toHaveBeenCalled();
    });
});
