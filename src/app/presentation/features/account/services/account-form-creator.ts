import { Service, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { UpdateProfileFormModel } from '@features/account/services/account-profile-form.model';
import { ChangePasswordFormModel } from '@features/account/services/change-password-form.model';

@Service()
export class AccountFormCreator {
    private formBuilder = inject(FormBuilder);

    private passwordsMatchValidator: ValidatorFn = (form) => {
        const newPassword = form.get('newPassword')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return newPassword === confirmPassword ? null : { passwordMismatch: true };
    };

    createProfileForm(): FormGroup<FormControls<UpdateProfileFormModel>> {
        return this.formBuilder.nonNullable.group({
            name: ['', [Validators.required]],
            mobile: ['', [Validators.required]]
        });
    }

    createChangePasswordForm(): FormGroup<FormControls<ChangePasswordFormModel>> {
        return this.formBuilder.nonNullable.group(
            {
                currentPassword: ['', [Validators.required]],
                newPassword: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            },
            { validators: this.passwordsMatchValidator }
        );
    }
}
