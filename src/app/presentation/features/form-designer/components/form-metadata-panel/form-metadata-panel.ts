import { Component, input, output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

export interface MetadataChange {
    title: string;
    description: string;
}

@Component({
    selector: 'app-form-metadata-panel',
    imports: [InputTextModule],
    templateUrl: './form-metadata-panel.html'
})
export class FormMetadataPanel {
    title = input.required<string>();
    description = input.required<string>();
    disabled = input<boolean>(false);

    metadataChanged = output<MetadataChange>();

    onTitleChange(newTitle: string): void {
        this.metadataChanged.emit({ title: newTitle, description: this.description() });
    }

    onDescriptionChange(newDescription: string): void {
        this.metadataChanged.emit({ title: this.title(), description: newDescription });
    }
}
