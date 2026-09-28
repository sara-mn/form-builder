import { computed, inject, Service, Signal, signal } from '@angular/core';
import { GetFormByIdUseCase } from '@app/application/form/get-form-by-id.use-case';
import { GetSubmissionsByFormIdUseCase } from '@app/application/form/get-submissions-by-form-id.use-case';
import { FormModel } from '@app/domain';
import { FormSubmissionModel } from '@app/domain/form/models/form-submission.model';
import { Guid } from '@app/domain/shared/types/guid.type';

interface FieldLookupEntry {
    id: Guid;
    label: string;
}

@Service()
export class SubmissionsFacade {
    private getFormByIdUseCase = inject(GetFormByIdUseCase);
    private getSubmissionsByFormIdUseCase = inject(GetSubmissionsByFormIdUseCase);

    private readonly _form = signal<FormModel | null>(null);
    private readonly _submissions = signal<FormSubmissionModel[]>([]);

    readonly form: Signal<FormModel | null> = this._form.asReadonly();
    readonly submissions: Signal<FormSubmissionModel[]> = this._submissions.asReadonly();

    readonly fieldLookup: Signal<FieldLookupEntry[]> = computed(() => {
        const form = this._form();
        if (!form) return [];
        return form.pages.flatMap((page) => page.fields.map((f) => ({ id: f.id, label: f.label })));
    });

    async load(formId: Guid): Promise<void> {
        const [form, submissions] = await Promise.all([this.getFormByIdUseCase.execute(formId), this.getSubmissionsByFormIdUseCase.execute(formId)]);
        this._form.set(form);
        this._submissions.set(submissions);
    }
}
