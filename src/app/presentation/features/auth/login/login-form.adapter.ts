import {FormAdapter} from '@shared/forms/form.adapter';
import {LoginRequest} from '@domain/auth/models/login-request.model';
import {LoginFormModel} from '@features/auth/login/login-form.model';

export const LoginFormAdapter: FormAdapter<LoginFormModel, LoginRequest> = {
  toDomain(form: LoginFormModel): LoginRequest {
    return {
      username: form.email,
      password: form.password
    }
  }
}
