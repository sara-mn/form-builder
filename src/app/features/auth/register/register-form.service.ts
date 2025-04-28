import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from '@app/features/auth/models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  constructor(private fb: FormBuilder) {

  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

