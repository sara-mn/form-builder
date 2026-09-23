import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResetPasswordFormModel } from '@features/auth/reset-password/reset-password-form.model';
import { ResetPasswordFormCreator } from '@features/auth/reset-password/reset-password-form-creator';
import { ResetPasswordFormAdapter } from '@app/presentation/features/auth/reset-password/reset-password-form.adapter';
import { ButtonModule } from 'primeng/button';
import { InputPasswordModule } from 'primeng/inputpassword';

@Component({
    selector: 'app-reset-password',
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputPasswordModule],
    templateUrl: './reset-password.html'
})
export class ResetPassword implements OnInit {
    private formCreator = inject(ResetPasswordFormCreator);
    private authFacade = inject(AuthFacade);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    form!: FormGroup<FormControls<ResetPasswordFormModel>>;
    protected mask = signal(true);
    protected tokenMissing = signal(false);

    ngOnInit(): void {
        this.form = this.formCreator.createForm();

        const token = this.route.snapshot.queryParamMap.get('token');
        if (!token) {
            this.tokenMissing.set(true);
            return;
        }
        this.form.patchValue({ token });
    }

    onSubmit() {
        if (this.form.invalid) return;

        const raw = this.form.getRawValue();
        const payload = ResetPasswordFormAdapter.toDomain(raw);

        this.authFacade.confirmPasswordReset(payload).then(() => {
            this.router.navigate(['/login']).then();
        });
    }
}
