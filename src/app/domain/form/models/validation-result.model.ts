import { Guid } from '@app/domain/shared/types/guid.type';

export interface FieldValidationError {
    fieldId: Guid;
    validatorType: string;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: FieldValidationError[];
}
