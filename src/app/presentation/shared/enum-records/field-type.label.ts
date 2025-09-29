import { FieldTypeEnum } from '@app/domain';

export interface FieldTypeLabelEntry {
  en: string;
  fa: string;
}

export const FieldTypeLabel: Record<FieldTypeEnum, FieldTypeLabelEntry> = {
  [FieldTypeEnum.Text]: { en: 'Text', fa: 'متن' },
  [FieldTypeEnum.Password]: { en: 'Password', fa: 'پسورد' },
  [FieldTypeEnum.Number]: { en: 'Number', fa: 'عدد' },
  [FieldTypeEnum.Select]: { en: 'Select', fa: 'انتخاب' },
  [FieldTypeEnum.Textarea]: { en: 'Textarea', fa: '' },
  [FieldTypeEnum.Radio]: { en: 'Radio', fa: '' },
  [FieldTypeEnum.Checkbox]: { en: 'Checkbox', fa: '' },
  [FieldTypeEnum.Date]: { en: 'Date', fa: '' },
  [FieldTypeEnum.DateRange]: { en: 'DateRange', fa: '' },
  [FieldTypeEnum.Html]: { en: 'Html', fa: '' }
};

// export const FieldTypeLabel = new Map([
//   [FieldTypeEnum.Text, "Text"],
//   [FieldTypeEnum.Number, "Number"],
//   [FieldTypeEnum.Select, "Select"],
// ]);
