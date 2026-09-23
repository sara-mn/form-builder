import { Service, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { ForgotPasswordFormModel } from './forgot-password-form.model';

@Service()
export class ForgotPasswordFormCreator {
    private formBuilder = inject(FormBuilder);

    createForm(): FormGroup<FormControls<ForgotPasswordFormModel>> {
        return this.formBuilder.nonNullable.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
}
