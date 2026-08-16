import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'app-color-field-input',
    imports: [ReactiveFormsModule, ColorPickerModule, KeyValuePipe],
    templateUrl: './color-field-input.html'
})
export class ColorFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
