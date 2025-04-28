import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '@app/features/auth/models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor(private fb:FormBuilder) {

  }

  createLoginForm() : FormGroup{
    return this.fb.group<FormGroup>({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
