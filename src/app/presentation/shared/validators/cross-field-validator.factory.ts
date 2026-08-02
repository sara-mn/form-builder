import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CrossFieldValidatorConfigModel, FieldConfigModel, CrossFieldValidatorTypeEnum } from '@app/domain';
import { checkRequiredIfFilled, checkDateAfter, checkDateBefore } from '@domain/form/validation/cross-field-validators';

const checkers: Record<CrossFieldValidatorTypeEnum, (targetValue: unknown, dependsOnValue: unknown) => boolean> = {
    [CrossFieldValidatorTypeEnum.RequiredIfFilled]: checkRequiredIfFilled,
    [CrossFieldValidatorTypeEnum.DateAfter]: checkDateAfter,
    [CrossFieldValidatorTypeEnum.DateBefore]: checkDateBefore
};

export function toCrossFieldValidatorFn(config: CrossFieldValidatorConfigModel, allFields: FieldConfigModel[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const targetField = allFields.find((f) => f.id === config.targetFieldId);
        const dependsOnField = allFields.find((f) => f.id === config.dependsOnFieldId);
        if (!targetField || !dependsOnField) return null;

        const targetValue = group.get(targetField.name)?.value;
        const dependsOnValue = group.get(dependsOnField.name)?.value;

        const passed = checkers[config.type](targetValue, dependsOnValue);
        return passed ? null : { [config.type]: config.message };
    };
}
