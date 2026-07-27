import { FormStatusEnum } from '../enums/form-status.enum';
import { FieldConfigModel } from './field-config.model';

export interface FormModel {
    id: string;
    title: string;
    description: string;
    status: FormStatusEnum;
    ownerId: string;
    fields: FieldConfigModel[];
    createdAt: string;
    updatedAt: string;
}
