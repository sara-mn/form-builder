import { FormStatusEnum } from '../enums/form-status.enum';
import { FormPageModel } from './form-page.model';
import { CrossFieldValidatorConfigModel } from './cross-field-validator-config.model';
import { Guid } from '@app/domain';

export interface FormModel {
    id: Guid;
    title: string;
    description: string;
    status: FormStatusEnum;
    ownerId: Guid;
    pages: FormPageModel[];
    validators: CrossFieldValidatorConfigModel[];
    createdAt: string;
    updatedAt: string;
    clonedFromId?: Guid;
}
