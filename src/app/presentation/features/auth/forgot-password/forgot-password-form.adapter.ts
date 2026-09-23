import { FormAdapter } from '@shared/forms/form.adapter';
import { RequestPasswordResetPayload } from '@app/domain';
import { ForgotPasswordFormModel } from './forgot-password-form.model';

export const ForgotPasswordFormAdapter: FormAdapter<ForgotPasswordFormModel, RequestPasswordResetPayload> = {
    toDomain(form: ForgotPasswordFormModel): RequestPasswordResetPayload {
        return {
            email: form.email
        };
    }
};
