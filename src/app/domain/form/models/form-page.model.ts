import { FieldConfigModel } from './field-config.model';
import { CrossFieldValidatorConfigModel } from './cross-field-validator-config.model';

export interface FormPageModel {
    id: string;
    title: string;
    order: number;
    fields: FieldConfigModel[];
    validators: CrossFieldValidatorConfigModel[];
}
