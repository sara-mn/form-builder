import { FormStatusEnum } from '../enums/form-status.enum';
import { FormPageModel } from './form-page.model';
import { CrossFieldValidatorConfigModel } from './cross-field-validator-config.model';

export interface FormModel {
    id: string;
    title: string;
    description: string;
    status: FormStatusEnum;
    ownerId: string;
    pages: FormPageModel[];
    validators: CrossFieldValidatorConfigModel[];
    createdAt: string;
    updatedAt: string;
}
