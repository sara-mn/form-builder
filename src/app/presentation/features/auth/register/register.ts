import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormControls } from '@shared/forms/form.type';
import { RegisterFormModel } from '@features/auth/register/register-form.model';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';
import { RegisterFormCreator } from './register-form-creator';
import { RegisterFormAdapter } from './register-form-model.adapter';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, InputPasswordModule, FieldsetModule, InputIconModule, IconFieldModule, Eye, EyeSlash],
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class Register implements OnInit {
    private registerFormCreator = inject(RegisterFormCreator);
    private authFacade = inject(AuthFacade);
    private router = inject(Router);

    form!: FormGroup<FormControls<Required<RegisterFormModel>>>;
    protected mask: boolean = true;

    ngOnInit(): void {
        this.form = this.registerFormCreator.createForm();
    }

    onSubmit() {
        if (this.form.invalid) return;

        const raw = this.form.getRawValue();
        const data = RegisterFormAdapter.toDomain(raw);

        this.authFacade.register(data).then(() => {
            this.router.navigate(['/login']).then();
        });
    }
}
