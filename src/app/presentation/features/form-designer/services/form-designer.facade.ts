import { computed, inject, Service, Signal, signal } from '@angular/core';
import { CloneFormUseCase } from '@app/application/form/clone-form.use-case';
import { DeleteFormUseCase } from '@app/application/form/delete-form.use-case';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { GetSubmissionsByFormIdUseCase } from '@app/application/form/get-submissions-by-form-id.use-case';
import { SubmitFormUseCase } from '@app/application/form/submit-form.use-case';
import { UpdateFormUseCase } from '@app/application/form/update-form.use-case';
import { FieldConfigModel, FieldValidatorConfigModel, FormModel, Guid } from '@app/domain';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Service()
export class FormDesignerFacade {
    private readonly _form = signal<FormModel | null>(null);
    private readonly _hasSubmissions = signal<boolean>(false);

    readonly form: Signal<FormModel | null> = this._form.asReadonly();
    readonly isLocked: Signal<boolean> = computed(() => this._hasSubmissions());

    private getFormByIdUseCase = inject(GetFormByIdUseCase);
    private updateFormUseCase = inject(UpdateFormUseCase);
    private deleteFormUseCase = inject(DeleteFormUseCase);
    private authState = inject(AuthState);
    private cloneFormUseCase = inject(CloneFormUseCase);
    private getSubmissionsByFormId = inject(GetSubmissionsByFormIdUseCase);

    async loadForm(formId: Guid): Promise<void> {
        const form = await this.getFormByIdUseCase.execute(formId);
        this._form.set(form);

        const submissions = await this.getSubmissionsByFormId.execute(formId);
        this._hasSubmissions.set(submissions.length > 0);
    }

    async saveForm(): Promise<void> {
        const currentForm = this._form();
        if (!currentForm) return;
        const updated = await this.updateFormUseCase.execute(currentForm.id, currentForm);
        this._form.set(updated);
    }

    async deleteForm(id: Guid): Promise<void> {
        await this.deleteFormUseCase.execute(id);
    }

    async cloneForm(): Promise<FormModel> {
        const currentForm = this._form();
        if (!currentForm) throw new Error('No form loaded to clone.');
        const ownerId = this.authState.currentUser()?.id;
        if (!ownerId) throw new Error('User must be authenticated to clone a form.');
        return this.cloneFormUseCase.execute(currentForm.id, ownerId);
    }

    updateMetadata(title: string, description: string): void {
        this._form.update((form) => (form ? { ...form, title, description } : form));
    }

    addPage(): void {
        this._form.update((form) => {
            if (!form) return form;
            const newPage = {
                id: crypto.randomUUID(),
                title: `Page ${form.pages.length + 1}`,
                order: form.pages.length,
                fields: [],
                validators: []
            };
            return { ...form, pages: [...form.pages, newPage] };
        });
    }

    deletePage(pageId: Guid): void {
        this._form.update((form) => {
            if (!form) return form;
            return { ...form, pages: form.pages.filter((p) => p.id !== pageId) };
        });
    }

    addField(pageId: Guid, field: FieldConfigModel): void {
        this._form.update((form) => this.mutatePageFields(form, pageId, (fields) => [...fields, field]));
    }

    updateField(pageId: Guid, field: FieldConfigModel): void {
        this._form.update((form) => this.mutatePageFields(form, pageId, (fields) => fields.map((f) => (f.id === field.id ? field : f))));
    }

    deleteField(pageId: Guid, fieldId: Guid): void {
        this._form.update((form) => {
            if (!form) return form;
            const withoutField = this.mutatePageFields(form, pageId, (fields) => fields.filter((f) => f.id !== fieldId));
            return withoutField ? this.removeOrphanedCrossFieldValidators(withoutField, fieldId) : withoutField;
        });
    }

    private removeOrphanedCrossFieldValidators(form: FormModel, fieldId: Guid): FormModel {
        const referencesField = (v: { targetFieldId: Guid; dependsOnFieldId: Guid }) => v.targetFieldId === fieldId || v.dependsOnFieldId === fieldId;

        return {
            ...form,
            validators: form.validators.filter((v) => !referencesField(v)),
            pages: form.pages.map((page) => ({
                ...page,
                validators: page.validators.filter((v) => !referencesField(v))
            }))
        };
    }

    addFieldValidator(pageId: Guid, fieldId: Guid, validator: FieldValidatorConfigModel): void {
        this._form.update((form) =>
            this.mutateField(form, pageId, fieldId, (field) => ({
                ...field,
                validators: [...field.validators, validator]
            }))
        );
    }

    removeFieldValidator(pageId: Guid, fieldId: Guid, validatorId: Guid): void {
        this._form.update((form) =>
            this.mutateField(form, pageId, fieldId, (field) => ({
                ...field,
                validators: field.validators.filter((v) => v.id !== validatorId)
            }))
        );
    }

    private mutatePageFields(form: FormModel | null, pageId: Guid, mutate: (fields: FieldConfigModel[]) => FieldConfigModel[]): FormModel | null {
        if (!form) return form;
        return {
            ...form,
            pages: form.pages.map((page) => (page.id === pageId ? { ...page, fields: mutate(page.fields) } : page))
        };
    }

    private mutateField(form: FormModel | null, pageId: Guid, fieldId: Guid, mutate: (field: FieldConfigModel) => FieldConfigModel): FormModel | null {
        return this.mutatePageFields(form, pageId, (fields) => fields.map((f) => (f.id === fieldId ? mutate(f) : f)));
    }
}
