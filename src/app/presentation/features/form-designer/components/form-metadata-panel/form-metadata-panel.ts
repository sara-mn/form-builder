import { Component, input, output } from '@angular/core';

export interface MetadataChange {
    title: string;
    description: string;
}

@Component({
    selector: 'app-form-metadata-panel',
    imports: [],
    templateUrl: './form-metadata-panel.html',
    styleUrl: './form-metadata-panel.scss'
})
export class FormMetadataPanel {
    metaDataChanged = output<{ title: string; description: string }>();

    onSubmit(event: any) {
        this.metaDataChanged.emit({ title: event.title, description: event.description });
    }
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
