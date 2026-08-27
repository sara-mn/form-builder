import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { SelectFieldInput } from './select-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('SelectFieldInput', () => {
    let fixture: ComponentFixture<SelectFieldInput>;
    let component: SelectFieldInput;

    const stringOptionsField: FieldConfigModel = {
        id: 'f1',
        name: 'country',
        label: 'Country',
        type: FieldTypeEnum.Select,
        order: 0,
        validators: [],
        options: ['Germany', 'Iran']
    };

    const objectOptionsField: FieldConfigModel = {
        id: 'f2',
        name: 'plan',
        label: 'Plan',
        type: FieldTypeEnum.Select,
        order: 0,
        validators: [],
        options: [
            { key: 'basic', value: 'Basic Plan' },
            { key: 'pro', value: 'Pro Plan' }
        ]
    };

    function setup(field: FieldConfigModel, control: FormControl) {
        TestBed.configureTestingModule({
            imports: [SelectFieldInput]
        });
        fixture = TestBed.createComponent(SelectFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', field);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(stringOptionsField, new FormControl(''));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(stringOptionsField, new FormControl(''));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Country');
    });

    describe('options', () => {
        it('should normalize string options into { key, value } pairs', () => {
            setup(stringOptionsField, new FormControl(''));
            expect(component.options()).toEqual([
                { key: 'Germany', value: 'Germany' },
                { key: 'Iran', value: 'Iran' }
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
            const control = new FormControl('Germany', Validators.required);
            setup(stringOptionsField, control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
