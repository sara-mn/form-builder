import { Injectable } from '@angular/core';
import { BaseFormService } from '@shared/forms/base-form.service';
import { FieldConfigModel } from '@app/domain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';

@Injectable({
  providedIn: 'root'
})
export class FieldConfigFormService extends BaseFormService<FieldConfigModel> {
  private fb: FormBuilder | any;

  protected constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
    this.fb = formBuilder;
  }

  createForm(): FormGroup<FormControls<FieldConfigModel>> {
    return this.fb.group({
      name: this.fb.control('', { validators: [Validators.required] }),
      label: this.fb.control('', { validators: [Validators.required] }),
      type: this.fb.control('', { validators: [Validators.required] }),
      required: this.fb.control(false),
      options: this.fb.control(null),
      validation: this.fb.group({
        required: this.fb.control(null),
        minLength: this.fb.control(null),
        maxLength: this.fb.control(null),
        min: this.fb.control(null),
        max: this.fb.control(null),
        email: this.fb.control(null),
        pattern: this.fb.control(null)
      })
    });
  }
}
