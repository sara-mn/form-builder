import { LoginUseCase } from '@application/auth/login.use.case';
import { AuthGateway, UserRepository, FormRepository, SubmissionRepository } from '@app/domain';
import { StorageGateway } from '@domain/storage.gateway.abstract';
import { LogoutUseCase } from '@application/auth/logout.use.case';
import { UpdateProfileUseCase } from '@app/application/auth/update-profile.use.case';
import { ResetPasswordUseCase } from '@app/application/auth/reset-password.use.case';
import { ResetPasswordConfirmUseCase } from '@app/application/auth/reset-password-confirm.use.case';
import { RefreshTokenUseCase } from '@application/auth/refresh-token.use.case';
import { ChangePasswordUseCase } from '@app/application/auth/change-password.use.case';
import { RegisterUseCase as UserRegisterUseCase } from '@application/user/register.use.case';

import { GetAllFormsUseCase } from '@application/form/get-all-forms.use.case';
import { GetFormByIdUseCase } from '@application/form/get-form-by-id.use.case';
import { CreateFormUseCase } from '@application/form/create-form.use.case';
import { UpdateFormUseCase } from '@application/form/update-form.use.case';
import { DeleteFormUseCase } from '@application/form/delete-form.use.case';
import { CloneFormUseCase } from '@application/form/clone-form.use.case';
import { SubmitFormUseCase } from '@application/form/submit-form.use.case';
import { FormValidationService } from '@domain/form/validation/form-validation.service';
import { GetSubmissionUseCase } from './form/get-submission.use.case';
import { GetFormsWithSubmissionCountsUseCase } from './form/get-forms-with-submission-counts.use.case';

export const applicationProviders = [
    {
        provide: LoginUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new LoginUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: LogoutUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new LogoutUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: UpdateProfileUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new UpdateProfileUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: ResetPasswordUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new ResetPasswordUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: ResetPasswordConfirmUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new ResetPasswordConfirmUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: RefreshTokenUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new RefreshTokenUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: ChangePasswordUseCase,
        useFactory: (auth: AuthGateway, ts: StorageGateway) => new ChangePasswordUseCase(auth, ts),
        deps: [AuthGateway, StorageGateway]
    },
    {
        provide: UserRegisterUseCase,
        useFactory: (userService: UserRepository) => new UserRegisterUseCase(userService),
        deps: [UserRepository]
    },
    {
        provide: GetAllFormsUseCase,
        useFactory: (formRepo: FormRepository) => new GetAllFormsUseCase(formRepo),
        deps: [FormRepository]
    },
    {
        provide: GetFormByIdUseCase,
        useFactory: (formRepo: FormRepository) => new GetFormByIdUseCase(formRepo),
        deps: [FormRepository]
    },
    {
        provide: CreateFormUseCase,
        useFactory: (formRepo: FormRepository) => new CreateFormUseCase(formRepo),
        deps: [FormRepository]
    },
    {
        provide: UpdateFormUseCase,
        useFactory: (formRepo: FormRepository, subRepo: SubmissionRepository) => new UpdateFormUseCase(formRepo, subRepo),
        deps: [FormRepository, SubmissionRepository]
    },
    {
        provide: DeleteFormUseCase,
        useFactory: (formRepo: FormRepository) => new DeleteFormUseCase(formRepo),
        deps: [FormRepository]
    },
    {
        provide: CloneFormUseCase,
        useFactory: (formRepo: FormRepository) => new CloneFormUseCase(formRepo),
        deps: [FormRepository]
    },
    {
        provide: SubmitFormUseCase,
        useFactory: (subRepo: SubmissionRepository, formRepo: FormRepository, validationService: FormValidationService) => new SubmitFormUseCase(subRepo, formRepo, validationService),
        deps: [SubmissionRepository, FormRepository, FormValidationService]
    },
    {
        provide: GetSubmissionUseCase,
        useFactory: (subRepo: SubmissionRepository) => new GetSubmissionUseCase(subRepo),
        deps: [SubmissionRepository]
    },
    {
        provide: GetFormsWithSubmissionCountsUseCase,
        useFactory: (formRepo: FormRepository, subRepo: SubmissionRepository) => new GetFormsWithSubmissionCountsUseCase(formRepo, subRepo),
        deps: [FormRepository, SubmissionRepository]
    },
    FormValidationService
];
