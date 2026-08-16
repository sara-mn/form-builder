import { Component, input } from '@angular/core';
import { FieldConfigModel, FieldTypeEnum } from '@app/domain';
import { SimpleInputType, SimpleTextInput } from './inputs/simple-text-input/simple-text-input';
import { RangeFieldInput } from './inputs/range-field-input/range-field-input';
import { ColorFieldInput } from './inputs/color-field-input/color-field-input';
import { DateRangeFieldInput } from './inputs/date-range-field-input/date-range-field-input';
import { DateTimeFieldInput } from './inputs/date-time-field-input/date-time-field-input';
import { CheckboxFieldInput } from './inputs/checkbox-field-input/checkbox-field-input';
import { RadioFieldInput } from './inputs/radio-field-input/radio-field-input';
import { SelectFieldInput } from './inputs/select-field-input/select-field-input';
import { TextareaFieldInput } from './inputs/textarea-field-input/textarea-field-input';
import { FormControl } from '@angular/forms';
const SIMPLE_TYPE_MAP: Partial<Record<FieldTypeEnum, SimpleInputType>> = {
    [FieldTypeEnum.Text]: 'text',
    [FieldTypeEnum.Password]: 'password',
    [FieldTypeEnum.Email]: 'email',
    [FieldTypeEnum.Number]: 'number',
    [FieldTypeEnum.Tel]: 'tel',
    [FieldTypeEnum.Url]: 'url'
};
const DATE_TIME_TYPES = new Set<FieldTypeEnum>([FieldTypeEnum.Date, FieldTypeEnum.Time, FieldTypeEnum.DateTime]);

@Component({
    selector: 'app-dynamic-field',
    imports: [SimpleTextInput, TextareaFieldInput, SelectFieldInput, RadioFieldInput, CheckboxFieldInput, DateTimeFieldInput, DateRangeFieldInput, ColorFieldInput, RangeFieldInput],
    templateUrl: './dynamic-field.html'
})
export class DynamicField {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();

    readonly FieldTypeEnum = FieldTypeEnum;

    get simpleInputType(): SimpleInputType | null {
        return SIMPLE_TYPE_MAP[this.field().type] ?? null;
    }

    get isDateTimeType(): boolean {
        return DATE_TIME_TYPES.has(this.field().type);
    }
}
