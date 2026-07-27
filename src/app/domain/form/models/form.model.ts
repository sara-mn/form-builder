import { FormStatusEnum } from '../enums/form-status.enum';
import { FormPageModel } from './form-page.model';

export interface FormModel {
    id: string;
    title: string;
    description: string;
    status: FormStatusEnum;
    ownerId: string;
    pages: FormPageModel[];
    createdAt: string;
    updatedAt: string;
}
