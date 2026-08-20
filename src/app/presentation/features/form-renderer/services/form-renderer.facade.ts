import { inject, Service, Signal, signal } from '@angular/core';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { SubmitFormUseCase } from '@app/application/form/submit-form.use-case';
import { FormSubmissionModel } from '@app/domain';
import { FormModel } from '@app/domain/form/models/form.model';
import { Guid } from '@app/domain/shared/types/guid.type';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Service()
export class FormRendererFacade {
    private getFormByIdUseCase = inject(GetFormByIdUseCase);
    private submitFormUseCase = inject(SubmitFormUseCase);
    private authState = inject(AuthState);

    private readonly _form = signal<FormModel | null>(null);
    private readonly _alreadySubmitted = signal<boolean>(false);

    readonly form: Signal<FormModel | null> = this._form.asReadonly();
    readonly alreadySubmitted: Signal<boolean> = this._alreadySubmitted.asReadonly();

    async loadForm(formId: Guid): Promise<void> {
        const form = await this.getFormByIdUseCase.execute(formId);
        this._form.set(form);
    }

    async submitForm(answers: Record<string, unknown>): Promise<FormSubmissionModel> {
        const form = this._form();
        if (!form) throw new Error('No form loaded.');

        const submission = await this.submitFormUseCase.execute(form.id, this.getCurrentUserId(), answers);
        this._alreadySubmitted.set(true);
        return submission;
    }

    private getCurrentUserId(): string {
        const userId = this.authState.currentUser()?.id;
        if (!userId) throw new Error('User is not authenticated.');
        return userId;
    }
}
