import { FieldConfigModel } from '@domain/form/models/field-config.model';

export interface FormSchemaModel {
  id?: string;
  title: string;
  fields: FieldConfigModel[];
}
