import { KeyValuePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldConfigModel } from '@app/domain';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-select-field-input',
    imports: [ReactiveFormsModule, SelectModule, KeyValuePipe],
    templateUrl: './select-field-input.html'
})
export class SelectFieldInput {
    field = input.required<FieldConfigModel>();
    control = input.required<FormControl>();

    options = computed(() => {
        const raw = this.field().options ?? [];
        return raw.map((opt) => (typeof opt === 'string' ? { key: opt, value: opt } : opt));
    });
}
