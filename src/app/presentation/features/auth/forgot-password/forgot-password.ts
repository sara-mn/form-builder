import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ForgotPasswordFormCreator } from './forgot-password-form-creator';
import { ForgotPasswordFormModel } from './forgot-password-form.model';
import { ForgotPasswordFormAdapter } from './forgot-password-form.adapter';

@Component({
    selector: 'app-forgot-password',
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule],
    templateUrl: './forgot-password.html'
})
export class ForgotPassword implements OnInit {
    private formCreator = inject(ForgotPasswordFormCreator);
    private authFacade = inject(AuthFacade);

    form!: FormGroup<FormControls<ForgotPasswordFormModel>>;
    protected submitted = signal(false);

    ngOnInit(): void {
        this.form = this.formCreator.createForm();
    }

    onSubmit() {
        if (this.form.invalid) return;

        const raw = this.form.getRawValue();
        const payload = ForgotPasswordFormAdapter.toDomain(raw);

        this.authFacade.requestPasswordReset(payload).then(() => {
            this.submitted.set(true);
        });
    }
}
