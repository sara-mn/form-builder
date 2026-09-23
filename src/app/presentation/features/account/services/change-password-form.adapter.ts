import { FormAdapter } from '@shared/forms/form.adapter';
import { ChangePasswordRequest } from '@app/domain';
import { ChangePasswordFormModel } from '@features/account/services/change-password-form.model';

export const ChangePasswordFormAdapter: FormAdapter<ChangePasswordFormModel, ChangePasswordRequest> = {
    toDomain(form: ChangePasswordFormModel): ChangePasswordRequest {
        return {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword
        };
    }
};
