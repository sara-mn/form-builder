import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';
import { isValidRegexPattern } from './field-validators';
import { isValidNumericString } from './field-validators';

export const numericValidatorTypes: Set<FieldValidatorTypeEnum> = new Set<FieldValidatorTypeEnum>([FieldValidatorTypeEnum.MinLength, FieldValidatorTypeEnum.MaxLength, FieldValidatorTypeEnum.MinValue, FieldValidatorTypeEnum.MaxValue]);

export function getValidatorConfigError(type: FieldValidatorTypeEnum, value: string | number | undefined): string | null {
    if (type === FieldValidatorTypeEnum.Pattern) {
        return isValidRegexPattern(value as string) ? null : 'Invalid regular expression';
    }
    if (numericValidatorTypes.has(type)) {
        if (value === undefined || value === '') return null;
        return isValidNumericString(value) ? null : 'Must be a valid number';
    }
    return null;
}
