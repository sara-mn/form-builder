import { Service, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { ResetPasswordFormModel } from '@features/auth/reset-password/reset-password-form.model';

@Service()
export class ResetPasswordFormCreator {
    private formBuilder = inject(FormBuilder);

    private passwordsMatchValidator: ValidatorFn = (form) => {
        const newPassword = form.get('newPassword')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return newPassword === confirmPassword ? null : { passwordMismatch: true };
    };

    createForm(): FormGroup<FormControls<ResetPasswordFormModel>> {
        return this.formBuilder.nonNullable.group(
            {
                token: ['', [Validators.required]],
                newPassword: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            },
            { validators: this.passwordsMatchValidator }
        );
    }
}
