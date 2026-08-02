import { FormModel } from '../models/form.model';
import { FieldConfigModel } from '../models/field-config.model';
import { CrossFieldValidatorConfigModel } from '../models/cross-field-validator-config.model';
import { runFieldValidator } from './field-validator-runner';
import { runCrossFieldValidator } from './cross-field-validator-runner';
import { FieldValidationError, ValidationResult } from '../models/validation-result.model';

export class FormValidationService {
    validateForm(form: FormModel, answers: Record<string, unknown>): ValidationResult {
        const errors: FieldValidationError[] = [];
        const allFields = form.pages.flatMap((page) => page.fields);

        // field-level validators
        for (const field of allFields) {
            const value = answers[field.name];
            for (const validator of field.validators) {
                const passed = runFieldValidator(validator, value);
                if (!passed) {
                    errors.push({
                        fieldId: field.id,
                        validatorType: validator.type,
                        message: validator.message
                    });
                }
            }
        }

        // cross-field validators
        const allCrossValidators = [...form.pages.flatMap((page) => page.validators), ...form.validators];
        this.runCrossValidators(allCrossValidators, allFields, answers, errors);

        return { isValid: errors.length === 0, errors };
    }

    private runCrossValidators(validators: CrossFieldValidatorConfigModel[], allFields: FieldConfigModel[], answers: Record<string, unknown>, errors: FieldValidationError[]): void {
        for (const validator of validators) {
            const targetField = allFields.find((f) => f.id === validator.targetFieldId);
            const dependsOnField = allFields.find((f) => f.id === validator.dependsOnFieldId);
            if (!targetField || !dependsOnField) continue;

            const targetValue = answers[targetField.name];
            const dependsOnValue = answers[dependsOnField.name];
            const passed = runCrossFieldValidator(validator.type, targetValue, dependsOnValue);
            if (!passed) {
                errors.push({
                    fieldId: validator.targetFieldId,
                    validatorType: validator.type,
                    message: validator.message
                });
            }
        }
    }
}
