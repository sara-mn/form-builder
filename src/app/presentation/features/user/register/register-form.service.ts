import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFormService} from '@shared/forms/base-form.service';
import {FormControls} from '@shared/forms/form.type';
import {RegisterFormModel} from '@features/user/register/register-form.model';

@Injectable()
export class RegisterFormService extends BaseFormService<RegisterFormModel> {
  private fb: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder)
    this.fb = formBuilder
  }

  createForm(): FormGroup<FormControls<RegisterFormModel>> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: [''],
      lastName: ['']
    }, {validator: this.passwordsMatchValidator});
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }
}

