import { inject, Service, Signal, signal } from '@angular/core';
import { CloneFormUseCase } from '@app/application/form/clone-form.use.case';
import { CreateFormUseCase } from '@app/application/form/create-form.use.case';
import { DeleteFormUseCase } from '@app/application/form/delete-form.use.case';
import { FormListItem, GetFormsWithSubmissionCountsUseCase } from '@app/application/form/get-forms-with-submission-counts.use.case';
import { FormModel } from '@app/domain/form/models/form.model';
import { Guid } from '@app/domain/shared/types/guid.type';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Service()
export class FormListFacade {
    private getFormsWithSubmissionCountsUseCase = inject(GetFormsWithSubmissionCountsUseCase);
    private createFormUseCase = inject(CreateFormUseCase);
    private deleteFormUseCase = inject(DeleteFormUseCase);
    private cloneFormUseCase = inject(CloneFormUseCase);
    private authState = inject(AuthState);

    private readonly _formListItems = signal<FormListItem[]>([]);
    readonly formListItems: Signal<FormListItem[]> = this._formListItems.asReadonly();

    async loadForms(): Promise<void> {
        const items = await this.getFormsWithSubmissionCountsUseCase.execute();
        this._formListItems.set(items);
    }

    async createForm(title: string, description: string): Promise<FormModel> {
        const ownerId = this.getCurrentOwnerId();
        const newForm = await this.createFormUseCase.execute(ownerId, title, description);
        await this.loadForms();
        return newForm;
    }

    async deleteForm(id: Guid): Promise<void> {
        await this.deleteFormUseCase.execute(id);
        await this.loadForms();
    }

    async cloneForm(id: Guid): Promise<FormModel> {
        const ownerId = this.getCurrentOwnerId();
        const cloned = await this.cloneFormUseCase.execute(id, ownerId);
        await this.loadForms();
        return cloned;
    }

    private getCurrentOwnerId(): Guid {
        const ownerId = this.authState.currentUser()?.id;
        if (!ownerId) throw new Error('User must be authenticated.');
        return ownerId;
    }
}
