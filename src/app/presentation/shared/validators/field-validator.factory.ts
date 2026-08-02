import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { FieldValidatorConfigModel } from '@app/domain';
import { checkRequired, checkMinLength, checkMaxLength, checkPattern, checkMinValue, checkMaxValue, checkEmail } from '@domain/form/validation/field-validators';
import { FieldValidatorTypeEnum } from '@app/domain';

const checkers: Record<FieldValidatorTypeEnum, (value: unknown, configValue?: string | number) => boolean> = {
    [FieldValidatorTypeEnum.Required]: (value) => checkRequired(value),
    [FieldValidatorTypeEnum.MinLength]: (value, configValue) => checkMinLength(value, configValue as number),
    [FieldValidatorTypeEnum.MaxLength]: (value, configValue) => checkMaxLength(value, configValue as number),
    [FieldValidatorTypeEnum.Pattern]: (value, configValue) => checkPattern(value, configValue as string),
    [FieldValidatorTypeEnum.MinValue]: (value, configValue) => checkMinValue(value, configValue as number),
    [FieldValidatorTypeEnum.MaxValue]: (value, configValue) => checkMaxValue(value, configValue as number),
    [FieldValidatorTypeEnum.Email]: (value) => checkEmail(value)
};

export function toFieldValidatorFn(config: FieldValidatorConfigModel): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passed = checkers[config.type](control.value, config.value);
        return passed ? null : { [config.type]: config.message };
    };
}
