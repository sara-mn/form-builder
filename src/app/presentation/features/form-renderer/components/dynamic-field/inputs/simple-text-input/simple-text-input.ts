import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { InputTextModule } from 'primeng/inputtext';
export type SimpleInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'color' | 'range';

@Component({
    selector: 'app-simple-text-input',
    imports: [ReactiveFormsModule, KeyValuePipe, InputTextModule],
    templateUrl: './simple-text-input.html',
    styleUrl: './simple-text-input.scss'
})
export class SimpleTextInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();
    inputType = input.required<SimpleInputType>();
}
