import { FormSchemaModel } from '@domain/form/models/form-schema.model';

export abstract class FormRepository {
  abstract getFormById(formId: string): Promise<FormSchemaModel>;
}
