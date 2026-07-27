import { FormModel } from '@app/domain/form/models/form.model';

export abstract class FormRepository {
    abstract getFormById(formId: string): Promise<FormModel>;
}
