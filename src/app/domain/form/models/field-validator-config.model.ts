import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';

export interface FieldValidatorConfigModel {
    id: string;
    type: FieldValidatorTypeEnum;
    message: string;
    value?: string | number;
}
