import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain/form/models/field-config.model';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-textarea-field-input',
    imports: [ReactiveFormsModule, KeyValuePipe, TextareaModule],
    templateUrl: './textarea-field-input.html',
    styleUrl: './textarea-field-input.scss'
})
export class TextareaFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
}
