import { Injectable } from '@angular/core';
import { FormSchemaModel } from '@app/domain';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerFacade {

  constructor(private formService: FormRepository) {
  }

  getFormById(formId: string): Promise<FormSchemaModel> {
    return this.formService.getFormById(formId);
  }

}
