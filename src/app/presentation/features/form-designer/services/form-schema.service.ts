import { Injectable } from '@angular/core';
import { FieldConfigModel, FormSchemaModel } from '@app/domain';

@Injectable({
  providedIn: 'root'
})
export class FormSchemaService {
  private formSchema: FormSchemaModel = { title: 'New Form', fields: [] };

  constructor() {
  }

  getForm() {
    return this.formSchema;
  }

  addField(field: FieldConfigModel) {
    this.formSchema.fields.push(field);
  }

  updateField(index: number, field: FieldConfigModel) {
    this.formSchema.fields[index] = field;
  }

  deleteField(index: number) {
    this.formSchema.fields.splice(index, 1);
  }
}
