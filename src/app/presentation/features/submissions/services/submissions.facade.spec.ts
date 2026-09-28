import { TestBed } from '@angular/core/testing';
import { SubmissionsFacade } from './submissions.facade';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { GetSubmissionsByFormIdUseCase } from '@app/application/form/get-submissions-by-form-id.use-case';
import { FormModel, FormStatusEnum, FieldTypeEnum } from '@app/domain';
import { createFakeSubmission } from '@app/application/test-utils';

describe('SubmissionsFacade', () => {
    let facade: SubmissionsFacade;
    let getFormByIdUseCase: { execute: ReturnType<typeof vi.fn> };
    let getSubmissionsByFormIdUseCase: { execute: ReturnType<typeof vi.fn> };

    const fakeForm: FormModel = {
        id: 'form-1',
        title: 'Job Application',
        description: '',
        status: FormStatusEnum.Published,
        ownerId: 'user-1',
        pages: [
            {
                id: 'page-1',
                title: 'Personal Info',
                order: 0,
                fields: [{ id: 'field-1', name: 'fullName', label: 'Full Name', type: FieldTypeEnum.Text, order: 0, validators: [] }],
                validators: []
            },
            {
                id: 'page-2',
                title: 'Details',
                order: 1,
                fields: [{ id: 'field-2', name: 'email', label: 'Email Address', type: FieldTypeEnum.Email, order: 0, validators: [] }],
                validators: []
            }
        ],
        validators: [],
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    };

    beforeEach(() => {
        getFormByIdUseCase = { execute: vi.fn().mockResolvedValue(fakeForm) };
        getSubmissionsByFormIdUseCase = { execute: vi.fn().mockResolvedValue([createFakeSubmission({ formId: 'form-1' })]) };

        TestBed.configureTestingModule({
            providers: [SubmissionsFacade, { provide: GetFormByIdUseCase, useValue: getFormByIdUseCase }, { provide: GetSubmissionsByFormIdUseCase, useValue: getSubmissionsByFormIdUseCase }]
        });

        facade = TestBed.inject(SubmissionsFacade);
    });

    it('should create', () => {
        expect(facade).toBeTruthy();
    });

    it('should return an empty fieldLookup before a form is loaded', () => {
        expect(facade.fieldLookup()).toEqual([]);
    });

    it('should load the form and its submissions in parallel', async () => {
        await facade.load('form-1');

        expect(getFormByIdUseCase.execute).toHaveBeenCalledWith('form-1');
        expect(getSubmissionsByFormIdUseCase.execute).toHaveBeenCalledWith('form-1');
        expect(facade.form()).toEqual(fakeForm);
        expect(facade.submissions().length).toBe(1);
    });

    it('should flatten every page field into fieldLookup after loading', async () => {
        await facade.load('form-1');

        expect(facade.fieldLookup()).toEqual([
            { id: 'field-1', label: 'Full Name' },
            { id: 'field-2', label: 'Email Address' }
        ]);
    });
});
