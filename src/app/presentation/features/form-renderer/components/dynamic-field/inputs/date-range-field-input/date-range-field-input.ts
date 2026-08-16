import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-date-range-field-input',
    imports: [ReactiveFormsModule, DatePickerModule, KeyValuePipe],
    templateUrl: './date-range-field-input.html'
})
export class DateRangeFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
