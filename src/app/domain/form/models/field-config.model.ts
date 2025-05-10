import { ValidatorConfigModel } from '@domain/form/models/validator-config.model';
import { AccessConfigModel } from '@domain/form/models/access-config.model';

export type FieldType =
  | 'text'
  | 'number'
  | 'select';

// | 'textarea'
// | 'radio'
// | 'checkbox'
// | 'date'
// | 'date-range'
// | 'html';

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
