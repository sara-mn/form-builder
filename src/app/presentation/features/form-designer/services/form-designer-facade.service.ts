import { Injectable } from '@angular/core';
import { FormSchemaModel } from '@app/domain';
import { FormService } from '@domain/form/abstracts/form-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerFacadeService {

  constructor(private formService: FormService) {
  }

  getFormById(formId: string): Promise<FormSchemaModel> {
    return this.formService.getFormById(formId);
  }

}
