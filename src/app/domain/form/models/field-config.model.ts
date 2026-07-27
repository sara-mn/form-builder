import { FieldValidatorConfigModel } from './field-validator-config.model';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { UserRoleEnum } from '@domain/user/enums/user-role.enum';

export interface FieldConfigModel {
    name: string;
    label: string;
    type: FieldTypeEnum;
    order: number;
    validators: FieldValidatorConfigModel[];
    options?: string[] | { key: string; value: string }[];
    access?: UserRoleEnum[];
}
