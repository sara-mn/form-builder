import { FormAdapter } from '@shared/forms/form.adapter';
import { UpdateProfileRequest } from '@app/domain';
import { UpdateProfileFormModel } from '@features/account/services/account-profile-form.model';

export const UpdateProfileFormAdapter: FormAdapter<UpdateProfileFormModel, UpdateProfileRequest> = {
    toDomain(form: UpdateProfileFormModel): UpdateProfileRequest {
        return {
            name: form.name,
            mobile: form.mobile
        };
    }
};
