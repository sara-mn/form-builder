import { Component, effect, input, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FieldValidatorEditor } from '../field-validator-editor/field-validator-editor';
import { FieldConfigModel, FieldTypeEnum, FieldValidatorConfigModel } from '@app/domain';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-field-editor-dialog',
    imports: [DialogModule, FieldValidatorEditor, FormsModule, SelectModule, InputTextModule, TextareaModule, ButtonModule],
    templateUrl: './field-editor-dialog.html'
})
export class FieldEditorDialog {
    isOpen = input.required<boolean>();
    editingField = input<FieldConfigModel | null>(null);
    nextOrder = input<number>(0);

    closed = output<void>();
    saved = output<FieldConfigModel>();

    readonly fieldTypes = Object.values(FieldTypeEnum);

    name = signal<string>('');
    label = signal<string>('');
    type = signal<FieldTypeEnum>(FieldTypeEnum.Text);
    optionsText = signal<string>('');
    validators = signal<FieldValidatorConfigModel[]>([]);

    constructor() {
        effect(() => {
            const field = this.editingField();
            if (field) {
                this.name.set(field.name);
                this.label.set(field.label);
                this.type.set(field.type);
                this.optionsText.set(this.stringifyOptions(field.options));
                this.validators.set(field.validators);
            } else {
                this.resetForm();
            }
        });
    }

    get showOptions(): boolean {
        return this.type() === FieldTypeEnum.Select || this.type() === FieldTypeEnum.Radio;
    }

    onNameChange(value: string): void {
        this.name.set(value);
    }

    onLabelChange(value: string): void {
        this.label.set(value);
    }

    onTypeChange(value: string): void {
        this.type.set(value as FieldTypeEnum);
    }

    onOptionsTextChange(value: string): void {
        this.optionsText.set(value);
    }

    onValidatorAdded(validator: FieldValidatorConfigModel): void {
        this.validators.update((v) => [...v, validator]);
    }

    onValidatorRemoved(validatorId: string): void {
        this.validators.update((v) => v.filter((val) => val.id !== validatorId));
    }

    onSave(): void {
        if (!this.name().trim() || !this.label().trim()) return;

        const field: FieldConfigModel = {
            id: this.editingField()?.id ?? crypto.randomUUID(),
            name: this.name(),
            label: this.label(),
            type: this.type(),
            order: this.editingField()?.order ?? this.nextOrder(),
            validators: this.validators(),
            ...(this.showOptions ? { options: this.parseOptions(this.optionsText()) } : {})
        };

        this.saved.emit(field);
        this.resetForm();
    }

    onDialogHide(): void {
        this.resetForm();
        this.closed.emit();
    }

    private resetForm(): void {
        this.name.set('');
        this.label.set('');
        this.type.set(FieldTypeEnum.Text);
        this.optionsText.set('');
        this.validators.set([]);
    }

    private stringifyOptions(options: FieldConfigModel['options']): string {
        if (!options) return '';
        return options.map((opt) => (typeof opt === 'string' ? opt : `${opt.key}:${opt.value}`)).join('\n');
    }

    private parseOptions(text: string): { key: string; value: string }[] {
        return text
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => {
                const [key, value] = line.split(':').map((s) => s.trim());
                return { key: key ?? line, value: value ?? line };
            });
    }
}
