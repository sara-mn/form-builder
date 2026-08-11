import { describe, it, expect } from 'vitest';
import { CloneFormUseCase } from './clone-form.use-case';
import { createMockFormRepository, createFakeForm, createFakePage, createFakeField, createFakeFieldValidator, createFakeCrossFieldValidator } from '../test-utils';
import { FormStatusEnum, FieldValidatorTypeEnum, CrossFieldValidatorTypeEnum } from '@app/domain';

describe('CloneFormUseCase', () => {
    function setup() {
        const formRepository = createMockFormRepository();
        const useCase = new CloneFormUseCase(formRepository);
        return { useCase, formRepository };
    }

    it('creates a new Draft form referencing the original via clonedFromId', async () => {
        const { useCase, formRepository } = setup();
        const original = createFakeForm({ id: 'original-id', title: 'My Form', status: FormStatusEnum.Published });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('original-id', 'owner-2');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        expect(createdArg.status).toBe(FormStatusEnum.Draft);
        expect(createdArg.clonedFromId).toBe('original-id');
        expect(createdArg.title).toBe('My Form (Copy)');
        expect(createdArg.ownerId).toBe('owner-2');
    });

    it('regenerates page and field ids, but keeps field name unchanged', async () => {
        const { useCase, formRepository } = setup();

        const field = createFakeField({ id: 'field-old', name: 'email' });
        const page = createFakePage({ id: 'page-old', fields: [field] });
        const original = createFakeForm({ id: 'f1', pages: [page] });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('f1', 'owner-1');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        const clonedPage = createdArg.pages[0];
        const clonedField = clonedPage.fields[0];

        expect(clonedPage.id).not.toBe('page-old');
        expect(clonedField.id).not.toBe('field-old');
        expect(clonedField.name).toBe('email');
    });

    it('regenerates field-validator ids without affecting field-level validator logic', async () => {
        const { useCase, formRepository } = setup();

        const field = createFakeField({
            validators: [createFakeFieldValidator({ id: 'validator-old', type: FieldValidatorTypeEnum.Required })]
        });
        const page = createFakePage({ fields: [field] });
        const original = createFakeForm({ pages: [page] });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('f1', 'owner-1');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        const clonedValidator = createdArg.pages[0].fields[0].validators[0];

        expect(clonedValidator.id).not.toBe('validator-old');
        expect(clonedValidator.type).toBe(FieldValidatorTypeEnum.Required);
    });

    it('remaps page-level cross-field validator targetFieldId/dependsOnFieldId to the new field ids', async () => {
        const { useCase, formRepository } = setup();

        const fieldA = createFakeField({ id: 'field-a-old', name: 'startDate' });
        const fieldB = createFakeField({ id: 'field-b-old', name: 'endDate' });
        const pageValidator = createFakeCrossFieldValidator({
            type: CrossFieldValidatorTypeEnum.DateAfter,
            targetFieldId: 'field-b-old',
            dependsOnFieldId: 'field-a-old'
        });
        const page = createFakePage({ fields: [fieldA, fieldB], validators: [pageValidator] });
        const original = createFakeForm({ pages: [page] });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('f1', 'owner-1');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        const clonedPage = createdArg.pages[0];
        const [clonedFieldA, clonedFieldB] = clonedPage.fields;
        const [clonedValidator] = clonedPage.validators;

        // the remapped ids must point to the NEW field ids, not the old ones
        expect(clonedValidator.targetFieldId).toBe(clonedFieldB.id);
        expect(clonedValidator.dependsOnFieldId).toBe(clonedFieldA.id);
        // and those new ids must genuinely differ from the originals
        expect(clonedValidator.targetFieldId).not.toBe('field-b-old');
        expect(clonedValidator.dependsOnFieldId).not.toBe('field-a-old');
    });

    it('remaps form-level cross-field validators referencing fields across different pages', async () => {
        const { useCase, formRepository } = setup();

        const fieldOnPage1 = createFakeField({ id: 'field-1-old', name: 'country' });
        const fieldOnPage2 = createFakeField({ id: 'field-2-old', name: 'city' });
        const page1 = createFakePage({ id: 'page-1', fields: [fieldOnPage1] });
        const page2 = createFakePage({ id: 'page-2', order: 1, fields: [fieldOnPage2] });

        const formLevelValidator = createFakeCrossFieldValidator({
            targetFieldId: 'field-2-old',
            dependsOnFieldId: 'field-1-old'
        });

        const original = createFakeForm({ pages: [page1, page2], validators: [formLevelValidator] });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('f1', 'owner-1');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        const newFieldOnPage1 = createdArg.pages[0].fields[0];
        const newFieldOnPage2 = createdArg.pages[1].fields[0];
        const [clonedFormValidator] = createdArg.validators;

        expect(clonedFormValidator.targetFieldId).toBe(newFieldOnPage2.id);
        expect(clonedFormValidator.dependsOnFieldId).toBe(newFieldOnPage1.id);
    });

    it('generates unique ids across all cloned pages and fields (no collisions)', async () => {
        const { useCase, formRepository } = setup();

        const page1 = createFakePage({ id: 'p1', fields: [createFakeField({ id: 'f1' }), createFakeField({ id: 'f2' })] });
        const page2 = createFakePage({ id: 'p2', order: 1, fields: [createFakeField({ id: 'f3' })] });
        const original = createFakeForm({ pages: [page1, page2] });
        formRepository.getFormById.mockResolvedValue(original);
        formRepository.createForm.mockImplementation(async (form) => ({ ...form, id: 'new-id', createdAt: '', updatedAt: '' }) as any);

        await useCase.execute('f1', 'owner-1');

        const createdArg = formRepository.createForm.mock.calls[0][0];
        const allIds = [...createdArg.pages.map((p: any) => p.id), ...createdArg.pages.flatMap((p: any) => p.fields.map((f: any) => f.id))];

        expect(new Set(allIds).size).toBe(allIds.length);
    });
});
