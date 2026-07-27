import { Injectable } from '@angular/core';
import { FormModel } from '@app/domain';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';

@Injectable({
    providedIn: 'root'
})
export class FormDesignerFacade {
    constructor(private formService: FormRepository) {}

    getFormById(formId: string): Promise<FormModel> {
        return this.formService.getFormById(formId);
    }
}
