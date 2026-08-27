import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { RadioFieldInput } from './radio-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('RadioFieldInput', () => {
    let fixture: ComponentFixture<RadioFieldInput>;
    let component: RadioFieldInput;

    function setup(field: FieldConfigModel, control: FormControl) {
        TestBed.configureTestingModule({
            imports: [RadioFieldInput]
        });
        fixture = TestBed.createComponent(RadioFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', field);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    const stringOptionsField: FieldConfigModel = {
        id: 'f1',
        name: 'color',
        label: 'Favorite Color',
        type: FieldTypeEnum.Radio,
        order: 0,
        validators: [],
        options: ['Red', 'Blue']
    };

    const objectOptionsField: FieldConfigModel = {
        id: 'f2',
        name: 'plan',
        label: 'Plan',
        type: FieldTypeEnum.Radio,
        order: 0,
        validators: [],
        options: [
            { key: 'basic', value: 'Basic Plan' },
            { key: 'pro', value: 'Pro Plan' }
        ]
    };

    it('should create', () => {
        setup(stringOptionsField, new FormControl(''));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(stringOptionsField, new FormControl(''));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Favorite Color');
    });

    describe('options', () => {
        it('should normalize string options into { key, value } pairs', () => {
            setup(stringOptionsField, new FormControl(''));
            expect(component.options()).toEqual([
                { key: 'Red', value: 'Red' },
                { key: 'Blue', value: 'Blue' }
            ]);
        });

        it('should pass through object options unchanged', () => {
            setup(objectOptionsField, new FormControl(''));
            expect(component.options()).toEqual([
                { key: 'basic', value: 'Basic Plan' },
                { key: 'pro', value: 'Pro Plan' }
            ]);
        });

        it('should default to an empty array when field has no options', () => {
            const noOptionsField = { ...stringOptionsField, options: undefined };
            setup(noOptionsField, new FormControl(''));
            expect(component.options()).toEqual([]);
        });
    });

    it('should render one radio button per option', () => {
        setup(stringOptionsField, new FormControl(''));
        const radios = fixture.nativeElement.querySelectorAll('input[type="radio"]');
        expect(radios.length).toBe(2);
    });

    it('should update the control value when a radio option is selected', () => {
        const control = new FormControl('');
        setup(stringOptionsField, control);
        const radios = fixture.nativeElement.querySelectorAll('input[type="radio"]');
        radios[1].click();
        fixture.detectChanges();
        expect(control.value).toBe('Blue');
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl('', Validators.required);
            setup(stringOptionsField, control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl('', Validators.required);
            setup(stringOptionsField, control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl('Red', Validators.required);
            setup(stringOptionsField, control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
