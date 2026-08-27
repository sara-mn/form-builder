import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { SimpleTextInput } from './simple-text-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('SimpleTextInput', () => {
    let fixture: ComponentFixture<SimpleTextInput>;
    let component: SimpleTextInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'fullName',
        label: 'Full Name',
        type: FieldTypeEnum.Text,
        order: 0,
        validators: []
    };

    function setup(control: FormControl, inputType: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' = 'text') {
        TestBed.configureTestingModule({
            imports: [SimpleTextInput]
        });
        fixture = TestBed.createComponent(SimpleTextInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.componentRef.setInput('inputType', inputType);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl(''));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl(''));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Full Name');
    });

    it('should bind the input id to field name', () => {
        setup(new FormControl(''));
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.id).toBe('fullName');
    });

    it('should apply the given inputType to the input element', () => {
        setup(new FormControl(''), 'email');
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.type).toBe('email');
    });

    it('should reflect the control value in the input', () => {
        setup(new FormControl('John Doe'));
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('input');
        expect(inputEl.value).toBe('John Doe');
    });

    it('should update the control value when the user types', () => {
        const control = new FormControl('');
        setup(control);
        const inputEl = fixture.nativeElement.querySelector('input');
        inputEl.value = 'Jane Doe';
        inputEl.dispatchEvent(new Event('input'));
        expect(control.value).toBe('Jane Doe');
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl('', Validators.required);
            setup(control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl('', Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl('John', Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
