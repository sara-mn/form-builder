import { ValidationConfigModel } from '@domain/form/models/validation-config.model';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { UserRoleEnum } from '@domain/user/enums/user-role.enum';

// export type FieldType =
//   | FieldTypeEnum.Text
//   | FieldTypeEnum.Number
//   | FieldTypeEnum.Select
//   | FieldTypeEnum.Textarea
//   | FieldTypeEnum.Radio
//   | FieldTypeEnum.Checkbox
//   | FieldTypeEnum.Date
//   | FieldTypeEnum.DateRange
//   | FieldTypeEnum.Html;

export interface FieldConfigModel {
  name: string;
  label: string;
  type: FieldTypeEnum;
  required?: boolean;
  options?: string[] | { key: string; value: string }[];
  validation?: ValidationConfigModel;
  access?: UserRoleEnum[];
  // order?: number;
  // description?: string;
}

