import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { Popover, PopoverModule } from 'primeng/popover';
import { InputColorModule } from 'primeng/inputcolor';

@Component({
    selector: 'app-color-field-input',
    imports: [ReactiveFormsModule, InputColorModule, KeyValuePipe, PopoverModule],
    templateUrl: './color-field-input.html'
})
export class ColorFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
