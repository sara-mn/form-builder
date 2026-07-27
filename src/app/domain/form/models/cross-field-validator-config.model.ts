import { Guid } from '@app/domain';
import { CrossFieldValidatorTypeEnum } from '../enums/cross-field-validator-type.enum';

export interface CrossFieldValidatorConfigModel {
    id: Guid;
    type: CrossFieldValidatorTypeEnum;
    message: string;
    targetFieldName: string; // فیلدی که rule روش اعمال می‌شه
    dependsOnFieldName: string; // فیلد مرجع مقایسه
}
