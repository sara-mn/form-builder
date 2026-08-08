import { describe, it, expect } from 'vitest';
import { GetAllFormsUseCase } from './get-all-forms.use-case';
import { createMockFormRepository, createFakeForm } from '../test-utils';

describe('GetAllFormsUseCase', () => {
    it('returns all forms from the repository', async () => {
        const formRepository = createMockFormRepository();
        const useCase = new GetAllFormsUseCase(formRepository);
        const fakeForms = [createFakeForm({ id: 'f1' }), createFakeForm({ id: 'f2' })];
        formRepository.getAllForms.mockResolvedValue(fakeForms);

        const result = await useCase.execute();

        expect(formRepository.getAllForms).toHaveBeenCalled();
        expect(result).toEqual(fakeForms);
    });
});
