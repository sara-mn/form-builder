import { CrossFieldValidatorTypeEnum } from '../enums/cross-field-validator-type.enum';
import { checkRequiredIfFilled, checkDateAfter, checkDateBefore } from './cross-field-validators';

const crossFieldValidatorRunners: Record<CrossFieldValidatorTypeEnum, (targetValue: unknown, dependsOnValue: unknown) => boolean> = {
    [CrossFieldValidatorTypeEnum.RequiredIfFilled]: checkRequiredIfFilled,
    [CrossFieldValidatorTypeEnum.DateAfter]: checkDateAfter,
    [CrossFieldValidatorTypeEnum.DateBefore]: checkDateBefore
};

export function runCrossFieldValidator(type: CrossFieldValidatorTypeEnum, targetValue: unknown, dependsOnValue: unknown): boolean {
    return crossFieldValidatorRunners[type](targetValue, dependsOnValue);
}
