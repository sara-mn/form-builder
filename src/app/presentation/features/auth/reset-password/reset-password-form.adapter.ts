import { FormAdapter } from '@shared/forms/form.adapter';
import { ConfirmPasswordResetPayload } from '@app/domain';
import { ResetPasswordFormModel } from '@features/auth/reset-password/reset-password-form.model';

export const ResetPasswordFormAdapter: FormAdapter<ResetPasswordFormModel, ConfirmPasswordResetPayload> = {
    toDomain(form: ResetPasswordFormModel): ConfirmPasswordResetPayload {
        return {
            token: form.token,
            newPassword: form.newPassword
        };
    }
};
