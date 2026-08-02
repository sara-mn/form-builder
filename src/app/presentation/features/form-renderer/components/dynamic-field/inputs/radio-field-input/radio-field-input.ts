import { KeyValuePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-radio-field-input',
    imports: [ReactiveFormsModule, RadioButtonModule, KeyValuePipe],
    templateUrl: './radio-field-input.html',
    styleUrl: './radio-field-input.scss'
})
export class RadioFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();

    options = computed(() => {
        const raw = this.field().options ?? [];
        return raw.map((opt) => (typeof opt === 'string' ? { key: opt, value: opt } : opt));
    });
}
