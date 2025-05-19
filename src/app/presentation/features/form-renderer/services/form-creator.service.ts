import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfigModel, ValidationConfigModel } from '@app/domain';

@Injectable()
export class FormCreatorService {

  constructor(private formBuilder: FormBuilder) {
  }

  createForm(fields: FieldConfigModel[]): FormGroup {
    const controls: { [key: string]: FormControl } = {};

    fields.forEach((field: FieldConfigModel) => {
      controls[field.name] = new FormControl<any>(null, this.getValidators(field.validation));
    });

    return this.formBuilder.group({ ...controls });
  }

  getValidators(validation?: ValidationConfigModel): ValidatorFn[] {
    const validatorFns: ValidatorFn[] = [];

    if (validation?.required) {
      validatorFns.push(Validators.required);
    }
    if (validation?.minLength !== undefined) {
      validatorFns.push(Validators.minLength(validation.minLength));
    }
    if (validation?.maxLength !== undefined) {
      validatorFns.push(Validators.maxLength(validation.maxLength));
    }
    if (validation?.min !== undefined) {
      validatorFns.push(Validators.min(validation.min));
    }
    if (validation?.max !== undefined) {
      validatorFns.push(Validators.max(validation.max));
    }
    if (validation?.email) {
      validatorFns.push(Validators.email);
    }
    if (validation?.pattern) {
      validatorFns.push(Validators.pattern(validation.pattern));
    }

    return validatorFns;
  }
}
