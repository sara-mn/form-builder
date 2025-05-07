import {FormAdapter} from '@shared/forms/form.adapter';
import {RegisterRequest} from '@app/domain';
import {RegisterFormModel} from '@features/user/register/register-form.model';

export const RegisterFormAdapter: FormAdapter<RegisterFormModel, RegisterRequest> = {
  toDomain(form: RegisterFormModel): RegisterRequest {
    return {
      email: form.email,
      mobile: form.mobile,
      password: form.password,
      confirmPassword: form.confirmPassword,
      firstName: form?.firstName,
      lastName: form?.lastName
    }
  }
}
