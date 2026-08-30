import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldValidatorEditor } from './field-validator-editor';
import { FieldValidatorConfigModel, FieldValidatorTypeEnum } from '@app/domain';

describe('FieldValidatorEditor', () => {
    let fixture: ComponentFixture<FieldValidatorEditor>;
    let component: FieldValidatorEditor;

    function setup(validators: FieldValidatorConfigModel[] = []) {
        TestBed.configureTestingModule({
            imports: [FieldValidatorEditor]
        });
        fixture = TestBed.createComponent(FieldValidatorEditor);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('validators', validators);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should default the new validator type to Required', () => {
        setup();
        expect(component.newType()).toBe(FieldValidatorTypeEnum.Required);
    });

    it('should show no validator list when there are none', () => {
        setup([]);
        expect(fixture.nativeElement.querySelector('ul')).toBeFalsy();
    });

    it('should render one row per existing validator', () => {
        const validators: FieldValidatorConfigModel[] = [
            { id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' },
            { id: 'v2', type: FieldValidatorTypeEnum.MinLength, message: 'Too short', value: 5 }
        ];
        setup(validators);
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items.length).toBe(2);
        expect(items[1].textContent).toContain('5');
    });

    describe('requiresValue', () => {
        it('should be false for Required', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.Required);
            expect(component.requiresValue).toBe(false);
        });

        it('should be false for Email', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.Email);
            expect(component.requiresValue).toBe(false);
        });

        it('should be true for MinLength', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinLength);
            expect(component.requiresValue).toBe(true);
        });

        it('should be true for Pattern', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.Pattern);
            expect(component.requiresValue).toBe(true);
        });
    });

    describe('onTypeChange', () => {
        it('should update the default message for the new type', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.Email);
            expect(component.newMessage()).toBe('Must be a valid email address');
        });

        it('should build the MinLength default message using the current value', () => {
            setup();
            component.onValueChange('5');
            component.onTypeChange(FieldValidatorTypeEnum.MinLength);
            expect(component.newMessage()).toBe('Minimum length is 5');
        });

        it('should recompute valueError for the new type', () => {
            setup();
            component.onValueChange('not-a-number');
            component.onTypeChange(FieldValidatorTypeEnum.MinValue);
            expect(component.valueError()).toBeTruthy();
        });
    });

    describe('onValueChange', () => {
        it('should update the default message with the new value', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MaxLength);
            component.onValueChange('10');
            expect(component.newMessage()).toBe('Maximum length is 10');
        });

        it('should set valueError for an invalid numeric value on a numeric validator type', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinValue);
            component.onValueChange('abc');
            expect(component.valueError()).toBeTruthy();
        });

        it('should clear valueError for a valid numeric value', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinValue);
            component.onValueChange('abc');
            component.onValueChange('42');
            expect(component.valueError()).toBeNull();
        });
    });

    describe('onMessageChange', () => {
        it('should update newMessage directly', () => {
            setup();
            component.onMessageChange('Custom message');
            expect(component.newMessage()).toBe('Custom message');
        });
    });

    describe('onAdd', () => {
        it('should not emit if the message is blank', () => {
            setup();
            component.onMessageChange('   ');
            const emitSpy = vi.fn();
            component.validatorAdded.subscribe(emitSpy);

            component.onAdd();

            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should not emit if there is a valueError', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinValue);
            component.onValueChange('not-a-number');
            const emitSpy = vi.fn();
            component.validatorAdded.subscribe(emitSpy);

            component.onAdd();

            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should emit a Required validator without a value', () => {
            setup();
            const emitSpy = vi.fn();
            component.validatorAdded.subscribe(emitSpy);

            component.onAdd();

            expect(emitSpy).toHaveBeenCalledTimes(1);
            const validator: FieldValidatorConfigModel = emitSpy.mock.calls[0][0];
            expect(validator.type).toBe(FieldValidatorTypeEnum.Required);
            expect(validator.value).toBeUndefined();
            expect(validator.id).toBeTruthy();
        });

        it('should emit a numeric value as a number for numeric validator types', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinLength);
            component.onValueChange('5');

            const emitSpy = vi.fn();
            component.validatorAdded.subscribe(emitSpy);
            component.onAdd();

            const validator: FieldValidatorConfigModel = emitSpy.mock.calls[0][0];
            expect(validator.value).toBe(5);
            expect(typeof validator.value).toBe('number');
        });

        it('should emit a string value as-is for non-numeric validator types requiring a value', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.Pattern);
            component.onValueChange('^[a-z]+$');

            const emitSpy = vi.fn();
            component.validatorAdded.subscribe(emitSpy);
            component.onAdd();

            const validator: FieldValidatorConfigModel = emitSpy.mock.calls[0][0];
            expect(validator.value).toBe('^[a-z]+$');
        });

        it('should reset the form to defaults after adding', () => {
            setup();
            component.onTypeChange(FieldValidatorTypeEnum.MinLength);
            component.onValueChange('5');
            component.onMessageChange('Custom');

            component.onAdd();

            expect(component.newType()).toBe(FieldValidatorTypeEnum.Required);
            expect(component.newValue()).toBe('');
            expect(component.valueError()).toBeNull();
        });
    });

    describe('onRemove', () => {
        it('should emit validatorRemoved with the given id', () => {
            setup();
            const emitSpy = vi.fn();
            component.validatorRemoved.subscribe(emitSpy);

            component.onRemove('v1');

            expect(emitSpy).toHaveBeenCalledWith('v1');
        });

        it('should emit validatorRemoved when the remove button is clicked', () => {
            const validators: FieldValidatorConfigModel[] = [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' }];
            setup(validators);
            const emitSpy = vi.fn();
            component.validatorRemoved.subscribe(emitSpy);

            const removeButton = fixture.nativeElement.querySelector('li button');
            removeButton.click();

            expect(emitSpy).toHaveBeenCalledWith('v1');
        });
    });
});
