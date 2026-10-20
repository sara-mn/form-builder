import { describe, it, expect } from 'vitest';
import { UnpublishFormUseCase } from './unpublish-form.use-case';
import { createMockFormRepository, createFakeForm } from '../test-utils';
import { FormStatusEnum } from '@app/domain';

describe('UnpublishFormUseCase', () => {
    it('sets the form back to draft', async () => {
        const formRepository = createMockFormRepository();
        const draft = createFakeForm({ id: 'f1', status: FormStatusEnum.Draft });
        formRepository.updateForm.mockResolvedValue(draft);

        const result = await new UnpublishFormUseCase(formRepository).execute('f1');

        expect(formRepository.updateForm).toHaveBeenCalledWith('f1', { status: FormStatusEnum.Draft });
        expect(result).toBe(draft);
    });
});
