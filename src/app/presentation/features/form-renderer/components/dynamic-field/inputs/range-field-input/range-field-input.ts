import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'app-range-field-input',
    imports: [ReactiveFormsModule, SliderModule, KeyValuePipe],
    templateUrl: './range-field-input.html',
    styleUrl: './range-field-input.scss'
})
export class RangeFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
