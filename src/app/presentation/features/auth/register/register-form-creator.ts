import { Service, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { RegisterFormModel } from '@features/auth/register/register-form.model';

@Service()
export class RegisterFormCreator {
    private formBuilder = inject(FormBuilder);

    private passwordsMatchValidator: ValidatorFn = (form) => {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    };

    createForm(): FormGroup<FormControls<Required<RegisterFormModel>>> {
        return this.formBuilder.nonNullable.group(
            {
                email: ['', [Validators.required, Validators.email]],
                mobile: ['', [Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                firstName: [''],
                lastName: ['']
            },
            { validators: this.passwordsMatchValidator }
        );
    }
}
