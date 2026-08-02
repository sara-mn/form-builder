import { Component, input, output, signal } from '@angular/core';
import { FieldValidatorConfigModel, FieldValidatorTypeEnum, Guid } from '@app/domain';

@Component({
    selector: 'app-field-validator-editor',
    imports: [],
    templateUrl: './field-validator-editor.html',
    styleUrl: './field-validator-editor.scss'
})
export class FieldValidatorEditor {
    validators = input.required<FieldValidatorConfigModel[]>();

    validatorAdded = output<FieldValidatorConfigModel>();
    validatorRemoved = output<Guid>();

    readonly validatorTypes = Object.values(FieldValidatorTypeEnum);
    private readonly numericTypes = new Set<FieldValidatorTypeEnum>([FieldValidatorTypeEnum.MinLength, FieldValidatorTypeEnum.MaxLength, FieldValidatorTypeEnum.MinValue, FieldValidatorTypeEnum.MaxValue]);
    private readonly defaultMessageBuilders: Record<FieldValidatorTypeEnum, (value: string) => string> = {
        [FieldValidatorTypeEnum.Required]: () => 'This field is required',
        [FieldValidatorTypeEnum.MinLength]: (value) => `Minimum length is ${value}`,
        [FieldValidatorTypeEnum.MaxLength]: (value) => `Maximum length is ${value}`,
        [FieldValidatorTypeEnum.Pattern]: () => 'Invalid format',
        [FieldValidatorTypeEnum.MinValue]: (value) => `Minimum value is ${value || '?'}`,
        [FieldValidatorTypeEnum.MaxValue]: (value) => `Maximum value is ${value || '?'}`,
        [FieldValidatorTypeEnum.Email]: () => 'Must be a valid email address'
    };
    newType = signal<FieldValidatorTypeEnum>(FieldValidatorTypeEnum.Required);
    newValue = signal<string>('');
    newMessage = signal<string>(this.buildDefaultMessage(FieldValidatorTypeEnum.Required, ''));

    get requiresValue(): boolean {
        return this.newType() !== FieldValidatorTypeEnum.Required && this.newType() !== FieldValidatorTypeEnum.Email;
    }

    onTypeChange(type: string): void {
        const newType = type as FieldValidatorTypeEnum;
        this.newType.set(newType);
        this.newMessage.set(this.buildDefaultMessage(newType, this.newValue()));
    }

    onValueChange(value: string): void {
        this.newValue.set(value);
        this.newMessage.set(this.buildDefaultMessage(this.newType(), value));
    }

    onMessageChange(message: string): void {
        this.newMessage.set(message);
    }

    onAdd(): void {
        if (!this.newMessage().trim()) return;

        const validator: FieldValidatorConfigModel = {
            id: crypto.randomUUID(),
            type: this.newType(),
            message: this.newMessage(),
            ...(this.requiresValue ? { value: this.numericTypes.has(this.newType()) ? Number(this.newValue()) : this.newValue() } : {})
        };

        this.validatorAdded.emit(validator);
        this.newType.set(FieldValidatorTypeEnum.Required);
        this.newValue.set('');
        this.newMessage.set(this.buildDefaultMessage(FieldValidatorTypeEnum.Required, ''));
    }

    onRemove(validatorId: Guid): void {
        this.validatorRemoved.emit(validatorId);
    }

    private buildDefaultMessage(type: FieldValidatorTypeEnum, value: string): string {
        return this.defaultMessageBuilders[type](value);
    }
}
