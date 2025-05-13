import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfigModel, ValidatorConfigModel } from '@app/domain';

@Injectable()
export class FormCreatorService {
  // private fb: FormBuilder;

  constructor(private formBuilder: FormBuilder) {
    // super(formBuilder)
    // this.fb = formBuilder
  }

  createForm(fields: FieldConfigModel[]): FormGroup {
    const controls: { [key: string]: FormControl } = {};

    fields.forEach((field: FieldConfigModel) => {
      controls[field.name] = new FormControl<any>(null , this.getValidators(field.validators))
    });

    return this.formBuilder.group({ ...controls });
  }

  getValidators(validatorList?: ValidatorConfigModel[]):  ValidatorFn[] {
    return [];
  }
}
