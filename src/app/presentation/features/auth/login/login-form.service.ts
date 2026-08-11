import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormService } from '@shared/forms/base-form.service';
import { FormControls } from '@shared/forms/form.type';
import { LoginFormModel } from '@features/auth/login/login-form.model';

@Injectable({
    providedIn: 'root'
})
export class LoginFormService extends BaseFormService<LoginFormModel> {
    protected constructor(protected override formBuilder: FormBuilder) {
        super(formBuilder);
    }

    createForm(): FormGroup<FormControls<LoginFormModel>> {
        return this.formBuilder.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }
}
