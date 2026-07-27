import { Guid } from '@app/domain';
import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';

export interface FieldValidatorConfigModel {
    id: Guid;
    type: FieldValidatorTypeEnum;
    message: string;
    value?: string | number;
}
