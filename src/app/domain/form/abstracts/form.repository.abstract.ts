import { FormModel } from '@app/domain/form/models/form.model';

export abstract class FormRepository {
    abstract getFormById(formId: string): Promise<FormModel>;
    abstract getAllForms(): Promise<FormModel[]>;
    abstract createForm(form: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<FormModel>;
    abstract updateForm(formId: string, form: Partial<FormModel>): Promise<FormModel>;
    abstract deleteForm(formId: string): Promise<void>;
}
