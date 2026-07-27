import { FieldConfigModel } from './field-config.model';
import { CrossFieldValidatorConfigModel } from './cross-field-validator-config.model';
import { Guid } from '@app/domain';

export interface FormPageModel {
    id: Guid;
    title: string;
    order: number;
    fields: FieldConfigModel[];
    validators: CrossFieldValidatorConfigModel[];
}
