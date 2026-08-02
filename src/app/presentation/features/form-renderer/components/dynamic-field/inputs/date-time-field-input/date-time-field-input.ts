import { KeyValuePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel, FieldTypeEnum } from '@app/domain';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-date-time-field-input',
    imports: [ReactiveFormsModule, DatePickerModule, KeyValuePipe],
    templateUrl: './date-time-field-input.html',
    styleUrl: './date-time-field-input.scss'
})
export class DateTimeFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();

    timeOnly = computed(() => this.field().type === FieldTypeEnum.Time);
    showTime = computed(() => this.field().type === FieldTypeEnum.DateTime);
}
