import { Component, input, output } from '@angular/core';
import { FieldConfigModel } from '@app/domain';

@Component({
    selector: 'app-field-list',
    imports: [],
    templateUrl: './field-list.html',
    styleUrl: './field-list.scss'
})
export class FieldList {
    fields = input.required<FieldConfigModel[]>();
    disabled = input<boolean>(false);

    fieldAddRequested = output<void>();
    fieldEditRequested = output<FieldConfigModel>();
    fieldDeleteRequested = output<FieldConfigModel>();

    onAdd(): void {
        this.fieldAddRequested.emit();
    }

    onEdit(field: FieldConfigModel): void {
        this.fieldEditRequested.emit(field);
    }

    onDelete(field: FieldConfigModel): void {
        if (confirm(`Delete field "${field.label}"?`)) {
            this.fieldDeleteRequested.emit(field);
        }
    }
}
