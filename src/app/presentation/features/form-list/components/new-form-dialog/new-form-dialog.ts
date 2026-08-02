import { Component, input, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

export interface NewFormData {
    title: string;
    description: string;
}
@Component({
    selector: 'app-new-form-dialog',
    imports: [DialogModule],
    templateUrl: './new-form-dialog.html',
    styleUrl: './new-form-dialog.scss'
})
export class NewFormDialog {
    isOpen = input<boolean>(false);
    closed = output<void>();
    saved = output<NewFormData>();

    title = model<string>('');
    description = model<string>('');

    onSave(): void {
        if (!this.title().trim()) return;
        this.saved.emit({ title: this.title(), description: this.description() });
        this.resetForm();
    }

    onDialogHide(): void {
        this.resetForm();
        this.closed.emit();
    }

    private resetForm(): void {
        this.title.set('');
        this.description.set('');
    }
}
