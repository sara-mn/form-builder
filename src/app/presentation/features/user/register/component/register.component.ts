import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { Router } from '@angular/router';
import { RegisterFormModel } from '@features/user/register/register-form.model';
import { RegisterFormService } from '@features/user/register/register-form.service';
import { RegisterFormAdapter } from '@features/user/register/register-form.adapter';
import { UserFacadeService } from '@features/user/services/user-facade.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<FormControls<RegisterFormModel>>;

  constructor(private registerFormService: RegisterFormService,
              private userFacadeService: UserFacadeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.registerFormService.createForm();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.registerFormService.getRawValue(this.form);
    const data = RegisterFormAdapter.toDomain(raw);

    this.userFacadeService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/login']).then();
      }
    });
  }
}
