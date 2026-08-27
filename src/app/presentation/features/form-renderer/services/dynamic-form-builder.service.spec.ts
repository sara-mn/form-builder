import { TestBed } from '@angular/core/testing';
import { DynamicFormBuilderService } from './dynamic-form-builder.service';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormPageModel } from '@app/domain/form/models/form-page.model';
import { FieldConfigModel, FormStatusEnum } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { FieldValidatorTypeEnum } from '@app/domain';
import { CrossFieldValidatorTypeEnum } from '@app/domain';

describe('DynamicFormBuilderService', () => {
    let service: DynamicFormBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DynamicFormBuilderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

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

    function makeForm(pages: FormPageModel[]): FormModel {
        return {
            id: 'f1',
            title: 'Form',
            description: '',
            status: FormStatusEnum.Published,
            ownerId: 'o1',
            pages,
            validators: [],
            createdAt: '',
            updatedAt: ''
        };
    }

    describe('buildPageGroups', () => {
        it('should return one FormGroup per page', () => {
            const form = makeForm([makePage({ id: 'p1' }), makePage({ id: 'p2' })]);

            const groups = service.buildPageGroups(form);

            expect(groups.length).toBe(2);
        });

        it('should create one FormControl per field, keyed by field name', () => {
            const field = makeField({ name: 'email' });
            const page = makePage({ fields: [field] });
            const form = makeForm([page]);

            const [group] = service.buildPageGroups(form);

            expect(group.contains('email')).toBe(true);
        });

        it('should initialize controls with a null value', () => {
            const field = makeField({ name: 'email' });
            const page = makePage({ fields: [field] });
            const form = makeForm([page]);

            const [group] = service.buildPageGroups(form);

            expect(group.get('email')?.value).toBeNull();
        });

        it('should apply field validators to the control', () => {
            const field = makeField({
                name: 'email',
                validators: [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' }]
            });
            const page = makePage({ fields: [field] });
            const form = makeForm([page]);

            const [group] = service.buildPageGroups(form);
            const control = group.get('email')!;

            expect(control.invalid).toBe(true);
            expect(control.errors?.[FieldValidatorTypeEnum.Required]).toBe('Required');

            control.setValue('test@example.com');
            expect(control.valid).toBe(true);
        });

        it('should apply cross-field validators at the group level', () => {
            const targetField = makeField({ id: 'target', name: 'confirmEmail' });
            const dependsOnField = makeField({ id: 'source', name: 'email' });
            const page = makePage({
                fields: [dependsOnField, targetField],
                validators: [
                    {
                        id: 'cf1',
                        type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
                        message: 'Confirm email is required',
                        targetFieldId: 'target',
                        dependsOnFieldId: 'source'
                    }
                ]
            });
            const form = makeForm([page]);

            const [group] = service.buildPageGroups(form);

            group.get('email')?.setValue('test@example.com');
            group.updateValueAndValidity();

            expect(group.errors?.[CrossFieldValidatorTypeEnum.RequiredIfFilled]).toBe('Confirm email is required');

            group.get('confirmEmail')?.setValue('test@example.com');
            group.updateValueAndValidity();

            expect(group.errors).toBeNull();
        });

        it('should resolve field values across different pages for cross-field validators', () => {
            const fieldOnPage1 = makeField({ id: 'source', name: 'startDate' });
            const fieldOnPage2 = makeField({ id: 'target', name: 'endDate' });

            const page1 = makePage({ id: 'p1', fields: [fieldOnPage1] });
            const page2 = makePage({
                id: 'p2',
                fields: [fieldOnPage2],
                validators: [
                    {
                        id: 'cf1',
                        type: CrossFieldValidatorTypeEnum.DateAfter,
                        message: 'End date must be after start date',
                        targetFieldId: 'target',
                        dependsOnFieldId: 'source'
                    }
                ]
            });
            const form = makeForm([page1, page2]);

            const [group1, group2] = service.buildPageGroups(form);

            group1.get('startDate')?.setValue('2026-01-01');
            group2.get('endDate')?.setValue('2025-01-01'); // before start date -> should fail
            group2.updateValueAndValidity();

            expect(group2.errors?.[CrossFieldValidatorTypeEnum.DateAfter]).toBe('End date must be after start date');

            group2.get('endDate')?.setValue('2027-01-01'); // after start date -> should pass
            group2.updateValueAndValidity();

            expect(group2.errors).toBeNull();
        });
    });
});
