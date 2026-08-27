import { TestBed } from '@angular/core/testing';
import { FormRendererFacade } from './form-renderer.facade';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { SubmitFormUseCase } from '@app/application/form/submit-form.use-case';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormStatusEnum } from '@app/domain';
import { FormSubmissionModel } from '@app/domain';
import { User } from '@app/domain/user/models/user.model';

describe('FormRendererFacade', () => {
    let service: FormRendererFacade;
    let getFormByIdUseCase: { execute: ReturnType<typeof vi.fn> };
    let submitFormUseCase: { execute: ReturnType<typeof vi.fn> };
    let authState: AuthState;

    const mockForm: FormModel = {
        id: 'f1',
        title: 'Survey',
        description: '',
        status: FormStatusEnum.Published,
        ownerId: 'owner1',
        pages: [],
        validators: [],
        createdAt: '',
        updatedAt: ''
    };

    beforeEach(() => {
        getFormByIdUseCase = { execute: vi.fn() };
        submitFormUseCase = { execute: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                { provide: GetFormByIdUseCase, useValue: getFormByIdUseCase },
                { provide: SubmitFormUseCase, useValue: submitFormUseCase }
            ]
        });
        service = TestBed.inject(FormRendererFacade);
        authState = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start with no form loaded and not submitted', () => {
        expect(service.form()).toBeNull();
        expect(service.alreadySubmitted()).toBe(false);
    });

    describe('loadForm', () => {
        it('should populate the form signal on success', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(mockForm);

            await service.loadForm('f1');

            expect(getFormByIdUseCase.execute).toHaveBeenCalledWith('f1');
            expect(service.form()).toEqual(mockForm);
        });
    });

    describe('submitForm', () => {
        it('should throw if no form is loaded', async () => {
            await expect(service.submitForm({})).rejects.toThrow('No form loaded.');
            expect(submitFormUseCase.execute).not.toHaveBeenCalled();
        });

        it('should throw if user is not authenticated', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(mockForm);
            await service.loadForm('f1');

            await expect(service.submitForm({ q1: 'answer' })).rejects.toThrow('User is not authenticated.');
            expect(submitFormUseCase.execute).not.toHaveBeenCalled();
        });

        it('should submit with form id, user id, and answers, and mark alreadySubmitted', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(mockForm);
            await service.loadForm('f1');
            authState.setUser({ id: 'user1' } as User);

            const mockSubmission = { id: 's1' } as FormSubmissionModel;
            submitFormUseCase.execute.mockResolvedValue(mockSubmission);

            const answers = { q1: 'answer' };
            const result = await service.submitForm(answers);

            expect(submitFormUseCase.execute).toHaveBeenCalledWith('f1', 'user1', answers);
            expect(service.alreadySubmitted()).toBe(true);
            expect(result).toEqual(mockSubmission);
        });

        it('should not set alreadySubmitted if the use case rejects', async () => {
            getFormByIdUseCase.execute.mockResolvedValue(mockForm);
            await service.loadForm('f1');
            authState.setUser({ id: 'user1' } as User);
            submitFormUseCase.execute.mockRejectedValue(new Error('server error'));

            await expect(service.submitForm({})).rejects.toThrow('server error');
            expect(service.alreadySubmitted()).toBe(false);
        });
    });
});
