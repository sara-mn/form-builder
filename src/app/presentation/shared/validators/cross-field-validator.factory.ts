import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CrossFieldValidatorConfigModel, CrossFieldValidatorTypeEnum, Guid } from '@app/domain';
import { checkRequiredIfFilled, checkDateAfter, checkDateBefore } from '@domain/form/validation/cross-field-validators';

const checkers: Record<CrossFieldValidatorTypeEnum, (targetValue: unknown, dependsOnValue: unknown) => boolean> = {
    [CrossFieldValidatorTypeEnum.RequiredIfFilled]: checkRequiredIfFilled,
    [CrossFieldValidatorTypeEnum.DateAfter]: checkDateAfter,
    [CrossFieldValidatorTypeEnum.DateBefore]: checkDateBefore
};

export function toCrossFieldValidatorFn(config: CrossFieldValidatorConfigModel, getFieldValue: (fieldId: Guid) => unknown): ValidatorFn {
    return (_group: AbstractControl): ValidationErrors | null => {
        const targetValue = getFieldValue(config.targetFieldId);
        const dependsOnValue = getFieldValue(config.dependsOnFieldId);
        const passed = checkers[config.type](targetValue, dependsOnValue);
        return passed ? null : { [config.type]: config.message };
    };
}
