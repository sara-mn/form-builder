import { Guid } from '@app/domain';
import { FormModel } from '@app/domain/form/models/form.model';

export abstract class FormRepository {
    abstract getFormById(formId: Guid): Promise<FormModel>;
    abstract getAllForms(): Promise<FormModel[]>;
    abstract createForm(form: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<FormModel>;
    abstract updateForm(formId: Guid, form: Partial<FormModel>): Promise<FormModel>;
    abstract deleteForm(formId: Guid): Promise<void>;
}
