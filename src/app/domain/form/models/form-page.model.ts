import { FieldConfigModel } from './field-config.model';

export interface FormPageModel {
    id: string;
    title: string;
    order: number;
    fields: FieldConfigModel[];
}
