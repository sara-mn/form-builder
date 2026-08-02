import { Guid } from '@app/domain';
import { CrossFieldValidatorTypeEnum } from '../enums/cross-field-validator-type.enum';

export interface CrossFieldValidatorConfigModel {
    id: Guid;
    type: CrossFieldValidatorTypeEnum;
    message: string;
    targetFieldId: Guid; // فیلدی که rule روش اعمال می‌شه
    dependsOnFieldId: Guid; // فیلد مرجع مقایسه
}
