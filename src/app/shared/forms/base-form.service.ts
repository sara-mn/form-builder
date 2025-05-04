import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import {FormControls, FormControlValues} from '@shared/forms/form.type';

@Injectable()
export abstract class BaseFormService<T> {
  protected constructor(protected fb: FormBuilder) {}

  abstract createForm(): FormGroup<FormControls<T>>;

  getRawValue(form: FormGroup<FormControls<T>>): T {
    return form.getRawValue() as T;
  }

  patch(form: FormGroup<FormControls<T>>, value: Partial<FormControlValues<T>>) {
    form.patchValue(value);
  }

  reset(form: FormGroup<FormControls<T>>, value?: Partial<FormControlValues<T>>) {
    form.reset(value);
  }
}
