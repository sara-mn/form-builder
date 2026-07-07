import { FormSchemaModel } from '@domain/form/models/form-schema.model';

export abstract class FormService {
  abstract getFormById(formId: string): Promise<FormSchemaModel>;
}
