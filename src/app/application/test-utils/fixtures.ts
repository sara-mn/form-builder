import {
    FormModel,
    FormSubmissionModel,
    FormStatusEnum,
    FormPageModel,
    FieldConfigModel,
    FieldTypeEnum,
    FieldValidatorConfigModel,
    FieldValidatorTypeEnum,
    CrossFieldValidatorConfigModel,
    CrossFieldValidatorTypeEnum,
    ValidationResult,
    FieldValidationError
} from '@app/domain';
import { User, LoginResponse, RegisterRequest, UserProfile, UserRoleEnum } from '@app/domain';

export function createFakeForm(overrides: Partial<FormModel> = {}): FormModel {
    return {
        id: 'f1',
        title: 'Test Form',
        description: '',
        status: FormStatusEnum.Draft,
        ownerId: 'owner-1',
        pages: [],
        validators: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides
    };
}

export function createFakeSubmission(overrides: Partial<FormSubmissionModel> = {}): FormSubmissionModel {
    return {
        id: 's1',
        formId: 'f1',
        submittedBy: 'user-1',
        answers: {},
        submittedAt: new Date().toISOString(),
        ...overrides
    };
}

export function createFakeField(overrides: Partial<FieldConfigModel> = {}): FieldConfigModel {
    return {
        id: 'field-1',
        name: 'field',
        label: 'Field',
        type: FieldTypeEnum.Text,
        order: 0,
        validators: [],
        ...overrides
    };
}

export function createFakePage(overrides: Partial<FormPageModel> = {}): FormPageModel {
    return {
        id: 'page-1',
        title: 'Page 1',
        order: 0,
        fields: [],
        validators: [],
        ...overrides
    };
}

export function createFakeFieldValidator(overrides: Partial<FieldValidatorConfigModel> = {}): FieldValidatorConfigModel {
    return {
        id: 'validator-1',
        type: FieldValidatorTypeEnum.Required,
        message: 'This field is required',
        ...overrides
    };
}

export function createFakeCrossFieldValidator(overrides: Partial<CrossFieldValidatorConfigModel> = {}): CrossFieldValidatorConfigModel {
    return {
        id: 'cross-validator-1',
        type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
        message: 'Cross-field validation failed',
        targetFieldId: 'field-1',
        dependsOnFieldId: 'field-2',
        ...overrides
    };
}

export function createFakeValidationError(overrides: Partial<FieldValidationError> = {}): FieldValidationError {
    return {
        fieldId: 'field-1',
        validatorType: 'required',
        message: 'This field is required',
        ...overrides
    };
}

export function createFakeValidationResult(overrides: Partial<ValidationResult> = {}): ValidationResult {
    return {
        isValid: true,
        errors: [],
        ...overrides
    };
}

export function createFakeUserProfile(overrides: Partial<UserProfile> = {}): UserProfile {
    return {
        avatarUrl: '',
        bio: '',
        ...overrides
    };
}

export function createFakeUser(overrides: Partial<User> = {}): User {
    return {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        roles: [UserRoleEnum.Viewer],
        profile: createFakeUserProfile(),
        ...overrides
    };
}

export function createFakeLoginResponse(overrides: Partial<LoginResponse> = {}): LoginResponse {
    return {
        accessToken: 'fake-access-token',
        expiresIn: 3600,
        user: createFakeUser(),
        ...overrides
    };
}

export function createFakeRegisterRequest(overrides: Partial<RegisterRequest> = {}): RegisterRequest {
    return {
        email: 'newuser@example.com',
        mobile: '09120000000',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        ...overrides
    };
}
