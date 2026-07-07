import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FieldConfigModel } from '@app/domain';

@Component({
    selector: 'app-field-list',
    templateUrl: './field-list.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './field-list.component.scss'
})
export class FieldListComponent {
    fields = input<FieldConfigModel[]>();
    list = computed(() => this.fields() ?? []);
    update = output<{ index: number; field: FieldConfigModel }>();
    delete = output<number>();
    preview = output<FieldConfigModel>();

    updateField(index: number, field: FieldConfigModel) {
        this.update.emit({ index, field });
    }

    deleteField(index: number) {
        this.delete.emit(index);
    }

    previewField(field: FieldConfigModel) {
        this.preview.emit(field);
    }
}
