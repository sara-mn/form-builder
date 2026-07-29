import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';
import { FieldValidatorConfigModel } from '../models/field-validator-config.model';
import { checkRequired, checkMinLength, checkMaxLength, checkPattern, checkMinValue, checkMaxValue, checkEmail } from './field-validators';

const fieldValidatorRunners: Record<FieldValidatorTypeEnum, (value: unknown, configValue?: string | number) => boolean> = {
    [FieldValidatorTypeEnum.Required]: (value) => checkRequired(value),
    [FieldValidatorTypeEnum.MinLength]: (value, configValue) => checkMinLength(value, configValue as number),
    [FieldValidatorTypeEnum.MaxLength]: (value, configValue) => checkMaxLength(value, configValue as number),
    [FieldValidatorTypeEnum.Pattern]: (value, configValue) => checkPattern(value, configValue as string),
    [FieldValidatorTypeEnum.MinValue]: (value, configValue) => checkMinValue(value, configValue as number),
    [FieldValidatorTypeEnum.MaxValue]: (value, configValue) => checkMaxValue(value, configValue as number),
    [FieldValidatorTypeEnum.Email]: (value) => checkEmail(value)
};

export function runFieldValidator(config: FieldValidatorConfigModel, value: unknown): boolean {
    return fieldValidatorRunners[config.type](value, config.value);
}
