import { ValidationConfigModel } from '@domain/form/models/validation-config.model';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { UserRoleEnum } from '@app/domain';

export type FieldType =
  | FieldTypeEnum.Text
  | FieldTypeEnum.Number
  | FieldTypeEnum.Select
  | FieldTypeEnum.Textarea
  | FieldTypeEnum.Radio
  | FieldTypeEnum.Checkbox
  | FieldTypeEnum.Date
  | FieldTypeEnum.DateRange
  | FieldTypeEnum.Html;

export interface FieldConfigModel {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[] | { key: string; value: string }[];
  validations?: ValidationConfigModel[];
  access?: UserRoleEnum[];
  // order?: number;
  // description?: string;
}

