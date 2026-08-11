import { describe, it, expect } from 'vitest';
import { GetFormByIdUseCase } from './get-form-by-id.use-case';
import { createMockFormRepository, createFakeForm } from '../test-utils';

describe('GetFormByIdUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const useCase = new GetFormByIdUseCase(formRepository);
        return { useCase, formRepository };
    }

    it('returns the form from the repository', async () => {
        const { useCase, formRepository } = setup();
        const fakeForm = createFakeForm({ id: 'f1', title: 'My Form' });
        formRepository.getFormById.mockResolvedValue(fakeForm);

        const result = await useCase.execute('f1');

        expect(formRepository.getFormById).toHaveBeenCalledWith('f1');
        expect(result).toEqual(fakeForm);
    });

    it('propagates the error when the repository rejects (e.g. form not found)', async () => {
        const { useCase, formRepository } = setup();
        formRepository.getFormById.mockRejectedValue(new Error('Form not found'));

        await expect(useCase.execute('missing-id')).rejects.toThrow('Form not found');
    });
});
