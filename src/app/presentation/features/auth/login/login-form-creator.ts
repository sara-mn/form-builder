import { inject, Service } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { LoginFormModel } from '@features/auth/login/login-form.model';

@Service()
export class LoginFormCreator {
    private formBuilder = inject(FormBuilder);

    createForm(): FormGroup<FormControls<LoginFormModel>> {
        return this.formBuilder.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }
}
