import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { Router, RouterLink } from '@angular/router';
import { LoginFormModel } from '@features/auth/login/login-form.model';
import { LoginFormCreator } from '@features/auth/login/login-form-creator';
import { LoginFormAdapter } from '@features/auth/login/login-form-model.adapter';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, InputPasswordModule, FieldsetModule, InputIconModule, IconFieldModule, Eye, EyeSlash],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login implements OnInit {
    private loginFormCreator = inject(LoginFormCreator);
    private authFacade = inject(AuthFacade);
    private router = inject(Router);

    form!: FormGroup<FormControls<LoginFormModel>>;
    protected mask: boolean = true;

    ngOnInit(): void {
        this.form = this.loginFormCreator.createForm();
    }

    onSubmit() {
        if (this.form.invalid) return;

        const raw = this.form.getRawValue();
        const data = LoginFormAdapter.toDomain(raw);

        this.authFacade.login(data).then(() => {
            this.router.navigate(['/']).then();
        });
    }
}
