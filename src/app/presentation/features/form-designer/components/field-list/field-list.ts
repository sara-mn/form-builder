import { Component, inject, input, output } from '@angular/core';
import { FieldConfigModel } from '@app/domain';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-field-list',
    imports: [ButtonModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    templateUrl: './field-list.html'
})
export class FieldList {
    private confirmationService = inject(ConfirmationService);

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
        this.confirmationService.confirm({
            message: `Delete field "${field.label}"?`,
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.fieldDeleteRequested.emit(field);
            }
        });
    }
}
