import { Service, Signal, signal } from '@angular/core';
import { FormModel } from '@app/domain';

@Service()
export class FormDesignerFacade {
    private readonly _form = signal<FormModel | null>(null);
    private readonly _hasSubmission = signal<boolean>(false);

    private form: Signal<FormModel | null> = this._form.asReadonly();

    loadForm() {}
}
