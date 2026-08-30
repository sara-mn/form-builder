import { TestBed } from '@angular/core/testing';
import { FormDesignerFacade } from './form-designer.facade';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { UpdateFormUseCase } from '@app/application/form/update-form.use-case';
import { DeleteFormUseCase } from '@app/application/form/delete-form.use-case';
import { CloneFormUseCase } from '@app/application/form/clone-form.use-case';
import { GetSubmissionsByFormIdUseCase } from '@app/application/form/get-submissions-by-form-id.use-case';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormPageModel } from '@app/domain/form/models/form-page.model';
import { FieldConfigModel, FormStatusEnum } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { FieldValidatorTypeEnum, CrossFieldValidatorTypeEnum } from '@app/domain';
import { User } from '@app/domain/user/models/user.model';

describe('FormDesignerFacade', () => {
    let service: FormDesignerFacade;
    let getFormByIdUseCase: { execute: ReturnType<typeof vi.fn> };
    let updateFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let deleteFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let cloneFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let getSubmissionsByFormId: { execute: ReturnType<typeof vi.fn> };
    let authState: AuthState;

    function makeField(overrides: Partial<FieldConfigModel> = {}): FieldConfigModel {
        return {
            id: 'field1',
            name: 'fieldName',
            label: 'Field Label',
            type: FieldTypeEnum.Text,
            order: 0,
            validators: [],
            ...overrides
        };
    }

    function makePage(overrides: Partial<FormPageModel> = {}): FormPageModel {
        return {
            id: 'page1',
            title: 'Page 1',
            order: 0,
            fields: [],
            validators: [],
            ...overrides
        };
    }

    function makeForm(pages: FormPageModel[] = [], validators: FormModel['validators'] = []): FormModel {
        return {
            id: 'f1',
            title: 'Form',
            description: '',
            status: FormStatusEnum.Draft,
            ownerId: 'owner1',
            pages,
            validators,
            createdAt: '',
            updatedAt: ''
        };
    }

    beforeEach(() => {
        getFormByIdUseCase = { execute: vi.fn() };
        updateFormUseCase = { execute: vi.fn() };
        deleteFormUseCase = { execute: vi.fn() };
        cloneFormUseCase = { execute: vi.fn() };
        getSubmissionsByFormId = { execute: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                { provide: GetFormByIdUseCase, useValue: getFormByIdUseCase },
                { provide: UpdateFormUseCase, useValue: updateFormUseCase },
                { provide: DeleteFormUseCase, useValue: deleteFormUseCase },
                { provide: CloneFormUseCase, useValue: cloneFormUseCase },
                { provide: GetSubmissionsByFormIdUseCase, useValue: getSubmissionsByFormId }
            ]
        });
        service = TestBed.inject(FormDesignerFacade);
        authState = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('loadForm', () => {
        it('should populate the form signal', async () => {
            const form = makeForm();
            getFormByIdUseCase.execute.mockResolvedValue(form);
            getSubmissionsByFormId.execute.mockResolvedValue([]);

            await service.loadForm('f1');

            expect(getFormByIdUseCase.execute).toHaveBeenCalledWith('f1');
            expect(service.form()).toEqual(form);
        });

        it('should set isLocked to true when submissions exist', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(makeForm());
            getSubmissionsByFormId.execute.mockResolvedValue([{ id: 's1' }]);

            await service.loadForm('f1');

            expect(service.isLocked()).toBe(true);
        });

        it('should set isLocked to false when no submissions exist', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(makeForm());
            getSubmissionsByFormId.execute.mockResolvedValue([]);

            await service.loadForm('f1');

            expect(service.isLocked()).toBe(false);
        });
    });

    describe('saveForm', () => {
        it('should do nothing if no form is loaded', async () => {
            await service.saveForm();
            expect(updateFormUseCase.execute).not.toHaveBeenCalled();
        });

        it('should call updateFormUseCase with the current form and update the signal', async () => {
            const form = makeForm();
            getFormByIdUseCase.execute.mockResolvedValue(form);
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            const updated = { ...form, title: 'Updated' };
            updateFormUseCase.execute.mockResolvedValue(updated);

            await service.saveForm();

            expect(updateFormUseCase.execute).toHaveBeenCalledWith('f1', form);
            expect(service.form()).toEqual(updated);
        });
    });

    describe('deleteForm', () => {
        it('should call deleteFormUseCase with the given id', async () => {
            deleteFormUseCase.execute.mockResolvedValue(undefined);
            await service.deleteForm('f1');
            expect(deleteFormUseCase.execute).toHaveBeenCalledWith('f1');
        });
    });

    describe('cloneForm', () => {
        it('should throw if no form is loaded', async () => {
            await expect(service.cloneForm()).rejects.toThrow('No form loaded to clone.');
        });

        it('should throw if user is not authenticated', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(makeForm());
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            await expect(service.cloneForm()).rejects.toThrow('User must be authenticated to clone a form.');
        });

        it('should call cloneFormUseCase with form id and owner id', async () => {
            const form = makeForm();
            getFormByIdUseCase.execute.mockResolvedValue(form);
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');
            authState.setUser({ id: 'user1' } as User);

            const cloned = { ...form, id: 'f2' };
            cloneFormUseCase.execute.mockResolvedValue(cloned);

            const result = await service.cloneForm();

            expect(cloneFormUseCase.execute).toHaveBeenCalledWith('f1', 'user1');
            expect(result).toEqual(cloned);
        });
    });

    describe('updateMetadata', () => {
        it('should do nothing if no form is loaded', () => {
            service.updateMetadata('New Title', 'New Desc');
            expect(service.form()).toBeNull();
        });

        it('should update title and description on the loaded form', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(makeForm());
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.updateMetadata('New Title', 'New Desc');

            expect(service.form()?.title).toBe('New Title');
            expect(service.form()?.description).toBe('New Desc');
        });
    });

    describe('addPage', () => {
        it('should do nothing if no form is loaded', () => {
            service.addPage();
            expect(service.form()).toBeNull();
        });

        it('should append a new page with an incremented default title and order', async () => {
            const existingPage = makePage({ id: 'p1', title: 'Page 1', order: 0 });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([existingPage]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.addPage();

            const pages = service.form()!.pages;
            expect(pages.length).toBe(2);
            expect(pages[1].title).toBe('Page 2');
            expect(pages[1].order).toBe(1);
            expect(pages[1].fields).toEqual([]);
            expect(pages[1].validators).toEqual([]);
        });
    });

    describe('deletePage', () => {
        it('should remove the page with the given id', async () => {
            const page1 = makePage({ id: 'p1' });
            const page2 = makePage({ id: 'p2' });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1, page2]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.deletePage('p1');

            expect(service.form()!.pages.map((p) => p.id)).toEqual(['p2']);
        });
    });

    describe('addField', () => {
        it('should append the field to the correct page only', async () => {
            const page1 = makePage({ id: 'p1', fields: [] });
            const page2 = makePage({ id: 'p2', fields: [] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1, page2]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            const field = makeField({ id: 'field1' });
            service.addField('p1', field);

            const form = service.form()!;
            expect(form.pages.find((p) => p.id === 'p1')!.fields).toEqual([field]);
            expect(form.pages.find((p) => p.id === 'p2')!.fields).toEqual([]);
        });
    });

    describe('updateField', () => {
        it('should replace the field with matching id on the correct page', async () => {
            const field = makeField({ id: 'field1', label: 'Old Label' });
            const page1 = makePage({ id: 'p1', fields: [field] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            const updatedField = { ...field, label: 'New Label' };
            service.updateField('p1', updatedField);

            expect(service.form()!.pages[0].fields[0].label).toBe('New Label');
        });
    });

    describe('deleteField', () => {
        it('should remove the field from the correct page', async () => {
            const field = makeField({ id: 'field1' });
            const page1 = makePage({ id: 'p1', fields: [field] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.deleteField('p1', 'field1');

            expect(service.form()!.pages[0].fields).toEqual([]);
        });

        it('should remove orphaned cross-field validators at the form level that reference the deleted field', async () => {
            const targetField = makeField({ id: 'target' });
            const otherField = makeField({ id: 'other', name: 'other' });
            const page1 = makePage({ id: 'p1', fields: [targetField, otherField] });
            const formValidators = [
                {
                    id: 'v1',
                    type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
                    message: 'msg',
                    targetFieldId: 'target',
                    dependsOnFieldId: 'other'
                }
            ];
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1], formValidators));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.deleteField('p1', 'target');

            expect(service.form()!.validators).toEqual([]);
        });

        it('should remove orphaned cross-field validators at the page level that depend on the deleted field', async () => {
            const targetField = makeField({ id: 'target' });
            const otherField = makeField({ id: 'other', name: 'other' });
            const pageValidators = [
                {
                    id: 'v1',
                    type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
                    message: 'msg',
                    targetFieldId: 'other',
                    dependsOnFieldId: 'target'
                }
            ];
            const page1 = makePage({ id: 'p1', fields: [targetField, otherField], validators: pageValidators });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.deleteField('p1', 'target');

            expect(service.form()!.pages[0].validators).toEqual([]);
        });

        it('should not remove cross-field validators that do not reference the deleted field', async () => {
            const targetField = makeField({ id: 'target' });
            const unrelatedField = makeField({ id: 'unrelated', name: 'unrelated' });
            const otherField = makeField({ id: 'other', name: 'other' });
            const unrelatedValidator = {
                id: 'v1',
                type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
                message: 'msg',
                targetFieldId: 'unrelated',
                dependsOnFieldId: 'other'
            };
            const page1 = makePage({ id: 'p1', fields: [targetField, unrelatedField, otherField], validators: [unrelatedValidator] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.deleteField('p1', 'target');

            expect(service.form()!.pages[0].validators).toEqual([unrelatedValidator]);
        });
    });

    describe('addFieldValidator', () => {
        it('should append the validator to the correct field', async () => {
            const field = makeField({ id: 'field1' });
            const page1 = makePage({ id: 'p1', fields: [field] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            const validator = { id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' };
            service.addFieldValidator('p1', 'field1', validator);

            expect(service.form()!.pages[0].fields[0].validators).toEqual([validator]);
        });
    });

    describe('removeFieldValidator', () => {
        it('should remove the validator with the given id from the field', async () => {
            const validator = { id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' };
            const field = makeField({ id: 'field1', validators: [validator] });
            const page1 = makePage({ id: 'p1', fields: [field] });
            getFormByIdUseCase.execute.mockResolvedValue(makeForm([page1]));
            getSubmissionsByFormId.execute.mockResolvedValue([]);
            await service.loadForm('f1');

            service.removeFieldValidator('p1', 'field1', 'v1');

            expect(service.form()!.pages[0].fields[0].validators).toEqual([]);
        });
    });
});
