import { describe, it, expect } from 'vitest';
import { PublishFormUseCase } from './publish-form.use-case';
import { createMockFormRepository, createFakeForm, createFakePage, createFakeField } from '../test-utils';
import { FormStatusEnum } from '@app/domain';

describe('PublishFormUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const useCase = new PublishFormUseCase(formRepository);
        return { useCase, formRepository };
    }

    it('publishes a form that has at least one field', async () => {
        const { useCase, formRepository } = setup();
        formRepository.getFormById.mockResolvedValue(
            createFakeForm({ id: 'f1', pages: [createFakePage({ fields: [createFakeField()] })] })
        );
        const published = createFakeForm({ id: 'f1', status: FormStatusEnum.Published });
        formRepository.updateForm.mockResolvedValue(published);

        const result = await useCase.execute('f1');

        expect(formRepository.updateForm).toHaveBeenCalledWith('f1', { status: FormStatusEnum.Published });
        expect(result).toBe(published);
    });

    it('throws and does not persist when the form has no fields', async () => {
        const { useCase, formRepository } = setup();
        formRepository.getFormById.mockResolvedValue(createFakeForm({ id: 'f1', pages: [] }));

        await expect(useCase.execute('f1')).rejects.toThrow('Add at least one field before publishing.');
        expect(formRepository.updateForm).not.toHaveBeenCalled();
    });
});
