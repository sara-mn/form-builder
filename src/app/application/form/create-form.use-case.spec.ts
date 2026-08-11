import { describe, it, expect } from 'vitest';
import { CreateFormUseCase } from './create-form.use-case';
import { createMockFormRepository, createFakeForm } from '../test-utils';
import { FormStatusEnum } from '@app/domain';

describe('CreateFormUseCase', () => {
    it('creates a draft form with empty pages and validators', async () => {
        const formRepository = createMockFormRepository();
        const useCase = new CreateFormUseCase(formRepository);
        formRepository.createForm.mockResolvedValue(createFakeForm({ id: 'f1' }));

        await useCase.execute('owner-1', 'My New Form', 'A description');

        expect(formRepository.createForm).toHaveBeenCalledWith({
            ownerId: 'owner-1',
            description: 'A description',
            title: 'My New Form',
            status: FormStatusEnum.Draft,
            pages: [],
            validators: []
        });
    });

    it('returns the form created by the repository', async () => {
        const formRepository = createMockFormRepository();
        const useCase = new CreateFormUseCase(formRepository);
        const created = createFakeForm({ id: 'f1', title: 'My New Form' });
        formRepository.createForm.mockResolvedValue(created);

        const result = await useCase.execute('owner-1', 'My New Form', 'desc');

        expect(result).toEqual(created);
    });
});
