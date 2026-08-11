import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { Router } from '@angular/router';
import { LoginFormModel } from '@features/auth/login/login-form.model';
import { LoginFormService } from '@features/auth/login/login-form.service';
import { LoginFormAdapter } from '@features/auth/login/login-form.adapter';
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
    imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputPasswordModule, FieldsetModule, InputIconModule, IconFieldModule, Eye, EyeSlash],
    templateUrl: './login.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    form!: FormGroup<FormControls<LoginFormModel>>;
    mask: boolean = true;

    constructor(
        private loginFormService: LoginFormService,
        private authFacade: AuthFacade,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.form = this.loginFormService.createForm();
    }

    onSubmit() {
        if (this.form.invalid) return;

        const raw = this.loginFormService.getRawValue(this.form);
        const data = LoginFormAdapter.toDomain(raw);

        this.authFacade.login(data).then(() => {
            this.router.navigate(['/']).then();
        });
    }
}
