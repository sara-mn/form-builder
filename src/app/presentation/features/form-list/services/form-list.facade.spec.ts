import { TestBed } from '@angular/core/testing';
import { FormListFacade } from './form-list.facade';
import { GetFormsWithSubmissionCountsUseCase, FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { CreateFormUseCase } from '@app/application/form/create-form.use-case';
import { DeleteFormUseCase } from '@app/application/form/delete-form.use-case';
import { CloneFormUseCase } from '@app/application/form/clone-form.use-case';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormStatusEnum } from '@app/domain';
import { User } from '@app/domain/user/models/user.model';

describe('FormListFacade', () => {
    let service: FormListFacade;
    let getFormsWithSubmissionCountsUseCase: { execute: ReturnType<typeof vi.fn> };
    let createFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let deleteFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let cloneFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let authState: AuthState;

    const mockForm: FormModel = {
        id: 'f1',
        title: 'Test Form',
        description: '',
        status: FormStatusEnum.Draft,
        ownerId: 'user1',
        pages: [],
        validators: [],
        createdAt: '',
        updatedAt: ''
    };

    const mockListItem: FormListItem = { form: mockForm, submissionCount: 0 };

    beforeEach(() => {
        getFormsWithSubmissionCountsUseCase = { execute: vi.fn() };
        createFormUseCase = { execute: vi.fn() };
        deleteFormUseCase = { execute: vi.fn() };
        cloneFormUseCase = { execute: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                { provide: GetFormsWithSubmissionCountsUseCase, useValue: getFormsWithSubmissionCountsUseCase },
                { provide: CreateFormUseCase, useValue: createFormUseCase },
                { provide: DeleteFormUseCase, useValue: deleteFormUseCase },
                { provide: CloneFormUseCase, useValue: cloneFormUseCase }
            ]
        });
        service = TestBed.inject(FormListFacade);
        authState = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('loadForms', () => {
        it('should populate formListItems on success', async () => {
            getFormsWithSubmissionCountsUseCase.execute.mockResolvedValue([mockListItem]);

            await service.loadForms();

            expect(service.formListItems()).toEqual([mockListItem]);
        });

        it('should start with an empty list before loading', () => {
            expect(service.formListItems()).toEqual([]);
        });
    });

    describe('createForm', () => {
        it('should throw if user is not authenticated', async () => {
            await expect(service.createForm('New Form', 'desc')).rejects.toThrow('User must be authenticated.');
            expect(createFormUseCase.execute).not.toHaveBeenCalled();
        });

        it('should create the form with the current owner id and reload the list', async () => {
            authState.setUser({ id: 'user1' } as User);
            createFormUseCase.execute.mockResolvedValue(mockForm);
            getFormsWithSubmissionCountsUseCase.execute.mockResolvedValue([mockListItem]);

            const result = await service.createForm('Test Form', 'A description');

            expect(createFormUseCase.execute).toHaveBeenCalledWith('user1', 'Test Form', 'A description');
            expect(getFormsWithSubmissionCountsUseCase.execute).toHaveBeenCalledTimes(1);
            expect(service.formListItems()).toEqual([mockListItem]);
            expect(result).toEqual(mockForm);
        });
    });

    describe('deleteForm', () => {
        it('should call deleteFormUseCase with the given id and reload the list', async () => {
            deleteFormUseCase.execute.mockResolvedValue(undefined);
            getFormsWithSubmissionCountsUseCase.execute.mockResolvedValue([]);

            await service.deleteForm('f1');

            expect(deleteFormUseCase.execute).toHaveBeenCalledWith('f1');
            expect(getFormsWithSubmissionCountsUseCase.execute).toHaveBeenCalledTimes(1);
            expect(service.formListItems()).toEqual([]);
        });
    });

    describe('cloneForm', () => {
        it('should throw if user is not authenticated', async () => {
            await expect(service.cloneForm('f1')).rejects.toThrow('User must be authenticated.');
            expect(cloneFormUseCase.execute).not.toHaveBeenCalled();
        });

        it('should clone the form with current owner id and reload the list', async () => {
            authState.setUser({ id: 'user1' } as User);
            const clonedForm = { ...mockForm, id: 'f2' };
            cloneFormUseCase.execute.mockResolvedValue(clonedForm);
            getFormsWithSubmissionCountsUseCase.execute.mockResolvedValue([mockListItem, { form: clonedForm, submissionCount: 0 }]);

            const result = await service.cloneForm('f1');

            expect(cloneFormUseCase.execute).toHaveBeenCalledWith('f1', 'user1');
            expect(getFormsWithSubmissionCountsUseCase.execute).toHaveBeenCalledTimes(1);
            expect(result).toEqual(clonedForm);
        });
    });
});
