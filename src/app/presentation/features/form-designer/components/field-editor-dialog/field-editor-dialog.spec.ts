import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldEditorDialog } from './field-editor-dialog';
import { FieldConfigModel, FieldTypeEnum, FieldValidatorConfigModel, FieldValidatorTypeEnum } from '@app/domain';

describe('FieldEditorDialog', () => {
    let fixture: ComponentFixture<FieldEditorDialog>;
    let component: FieldEditorDialog;

    const existingField: FieldConfigModel = {
        id: 'f1',
        name: 'email',
        label: 'Email',
        type: FieldTypeEnum.Email,
        order: 2,
        validators: [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' }]
    };

    function setup(isOpen = true, editingField: FieldConfigModel | null = null, nextOrder = 0) {
        TestBed.configureTestingModule({
            imports: [FieldEditorDialog]
        });
        fixture = TestBed.createComponent(FieldEditorDialog);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('isOpen', isOpen);
        fixture.componentRef.setInput('editingField', editingField);
        fixture.componentRef.setInput('nextOrder', nextOrder);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    describe('form initialization from editingField', () => {
        it('should reset the form to defaults when editingField is null', () => {
            setup(true, null);
            expect(component.name()).toBe('');
            expect(component.label()).toBe('');
            expect(component.type()).toBe(FieldTypeEnum.Text);
            expect(component.optionsText()).toBe('');
            expect(component.validators()).toEqual([]);
        });

        it('should populate the form from the editingField', () => {
            setup(true, existingField);
            expect(component.name()).toBe('email');
            expect(component.label()).toBe('Email');
            expect(component.type()).toBe(FieldTypeEnum.Email);
            expect(component.validators()).toEqual(existingField.validators);
        });

        it('should stringify string options with newlines', () => {
            const fieldWithOptions: FieldConfigModel = {
                ...existingField,
                type: FieldTypeEnum.Select,
                options: ['Red', 'Blue']
            };
            setup(true, fieldWithOptions);
            expect(component.optionsText()).toBe('Red\nBlue');
        });

        it('should stringify object options as key:value pairs', () => {
            const fieldWithOptions: FieldConfigModel = {
                ...existingField,
                type: FieldTypeEnum.Select,
                options: [{ key: 'a', value: 'Option A' }]
            };
            setup(true, fieldWithOptions);
            expect(component.optionsText()).toBe('a:Option A');
        });
    });

    describe('showOptions', () => {
        it('should be true for Select type', () => {
            setup();
            component.onTypeChange(FieldTypeEnum.Select);
            expect(component.showOptions).toBe(true);
        });

        it('should be true for Radio type', () => {
            setup();
            component.onTypeChange(FieldTypeEnum.Radio);
            expect(component.showOptions).toBe(true);
        });

        it('should be false for Text type', () => {
            setup();
            component.onTypeChange(FieldTypeEnum.Text);
            expect(component.showOptions).toBe(false);
        });
    });

    describe('onSave', () => {
        it('should not emit saved if name is blank', () => {
            setup();
            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onLabelChange('Some Label');

            component.onSave();

            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should not emit saved if label is blank', () => {
            setup();
            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onNameChange('someName');

            component.onSave();

            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should emit a new field with a generated id and nextOrder when adding', () => {
            setup(true, null, 3);
            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);

            component.onNameChange('newField');
            component.onLabelChange('New Field');
            component.onSave();

            expect(emitSpy).toHaveBeenCalledTimes(1);
            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.name).toBe('newField');
            expect(savedField.label).toBe('New Field');
            expect(savedField.order).toBe(3);
            expect(savedField.id).toBeTruthy();
        });

        it('should preserve the id and order when editing an existing field', () => {
            setup(true, existingField);
            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);

            component.onLabelChange('Updated Email');
            component.onSave();

            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.id).toBe('f1');
            expect(savedField.order).toBe(2);
            expect(savedField.label).toBe('Updated Email');
        });

        it('should include parsed options only when showOptions is true', () => {
            setup(true, null);
            component.onNameChange('color');
            component.onLabelChange('Color');
            component.onTypeChange(FieldTypeEnum.Select);
            component.onOptionsTextChange('Red\nBlue');

            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onSave();

            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.options).toEqual([
                { key: 'Red', value: 'Red' },
                { key: 'Blue', value: 'Blue' }
            ]);
        });

        it('should parse "key:value" lines into distinct key and value', () => {
            setup(true, null);
            component.onNameChange('plan');
            component.onLabelChange('Plan');
            component.onTypeChange(FieldTypeEnum.Select);
            component.onOptionsTextChange('basic:Basic Plan\npro:Pro Plan');

            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onSave();

            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.options).toEqual([
                { key: 'basic', value: 'Basic Plan' },
                { key: 'pro', value: 'Pro Plan' }
            ]);
        });

        it('should skip blank lines when parsing options', () => {
            setup(true, null);
            component.onNameChange('color');
            component.onLabelChange('Color');
            component.onTypeChange(FieldTypeEnum.Select);
            component.onOptionsTextChange('Red\n\nBlue\n   \n');

            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onSave();

            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.options).toEqual([
                { key: 'Red', value: 'Red' },
                { key: 'Blue', value: 'Blue' }
            ]);
        });

        it('should not include options for non-select/radio types', () => {
            setup(true, null);
            component.onNameChange('name');
            component.onLabelChange('Name');
            component.onSave();

            const emitSpy = vi.fn();
            component.saved.subscribe(emitSpy);
            component.onNameChange('name2');
            component.onLabelChange('Name 2');
            component.onSave();

            const savedField: FieldConfigModel = emitSpy.mock.calls[0][0];
            expect(savedField.options).toBeUndefined();
        });

        it('should reset the form after a successful save', () => {
            setup(true, null);
            component.onNameChange('field1');
            component.onLabelChange('Field 1');

            component.onSave();

            expect(component.name()).toBe('');
            expect(component.label()).toBe('');
        });
    });

    describe('onDialogHide', () => {
        it('should emit closed', () => {
            setup();
            const emitSpy = vi.fn();
            component.closed.subscribe(emitSpy);

            component.onDialogHide();

            expect(emitSpy).toHaveBeenCalled();
        });

        it('should reset the form', () => {
            setup();
            component.onNameChange('someName');
            component.onLabelChange('Some Label');

            component.onDialogHide();

            expect(component.name()).toBe('');
            expect(component.label()).toBe('');
        });
    });

    describe('validator management', () => {
        it('should add a validator via onValidatorAdded', () => {
            setup();
            const validator: FieldValidatorConfigModel = { id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' };
            component.onValidatorAdded(validator);
            expect(component.validators()).toEqual([validator]);
        });

        it('should remove a validator by id via onValidatorRemoved', () => {
            setup(true, existingField);
            expect(component.validators().length).toBe(1);

            component.onValidatorRemoved('v1');

            expect(component.validators()).toEqual([]);
        });
    });
});
