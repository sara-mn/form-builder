import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControls} from '@shared/forms/form.type';
import {RegisterFormService} from '@features/auth/register/register-form.service';
import {RegisterFormModel} from '@features/auth/register/register-form.model';
import {RegisterFormAdapter} from '@features/auth/register/register-form.adapter';
import {RegisterUseCase} from '@application/register.use.case';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<FormControls<RegisterFormModel>>
  constructor(private registerFormService: RegisterFormService,
              private registerUseCase: RegisterUseCase) {
  }

  ngOnInit(): void {
    this.form = this.registerFormService.createForm();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.registerFormService.getRawValue(this.form);
    const data = RegisterFormAdapter.toDomain(raw);

    this.registerUseCase.register(data).subscribe();
  }


}
