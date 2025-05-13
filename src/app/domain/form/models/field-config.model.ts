import { ValidatorConfigModel } from '@domain/form/models/validator-config.model';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

export type FieldType =
  | FieldTypeEnum.Text
  | FieldTypeEnum.Number
  | FieldTypeEnum.Select;

// | FieldTypeEnum.Textarea'
// | FieldTypeEnum.Radio'
// | FieldTypeEnum.Checkbox'
// | FieldTypeEnum.Date'
// | FieldTypeEnum.DateRange'
// | FieldTypeEnum.Html';

export interface FieldConfigModel {
  name: string;                  // نام فیلد در دیتا
  label: string;                 // عنوان نمایشی
  type: FieldType;               // نوع فیلد
  required?: boolean;            // اجباری یا نه
  options?: string[] | { key: string; value: string }[];          // برای select, radio
  validators?: ValidatorConfigModel[]; // اعتبارسنجی
  // access?: AccessConfigModel;         // سطح دسترسی
  // order?: number;                // ترتیب نمایش
  // description?: string;
}
