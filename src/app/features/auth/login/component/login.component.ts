import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoginFormService} from '@features/auth/login/login-form.service';
import {LoginFormModel} from '@features/auth/login/login-form.model';
import {FormControls} from '@shared/forms/form.type';
import {LoginFormAdapter} from '@features/auth/login/login-form.adapter';
import {LoginUseCase} from '@application/login.use.case';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormControl, ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup<FormControls<LoginFormModel>>
  constructor(private loginFormService: LoginFormService,
              private loginUseCase: LoginUseCase,
              private router:Router) {
  }

  ngOnInit(): void {
    this.form = this.loginFormService.createForm();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.loginFormService.getRawValue(this.form);
    const data = LoginFormAdapter.toDomain(raw);

    this.loginUseCase.login(data).subscribe({
      next:() => {
        this.router.navigate(['/dashboard']).then();
      }
    });
  }


}
