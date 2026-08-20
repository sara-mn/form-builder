import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-checkbox-field-input',
    imports: [ReactiveFormsModule, CheckboxModule, KeyValuePipe],
    templateUrl: './checkbox-field-input.html'
})
export class CheckboxFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
