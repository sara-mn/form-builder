import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { CheckboxFieldInput } from './checkbox-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('CheckboxFieldInput', () => {
    let fixture: ComponentFixture<CheckboxFieldInput>;
    let component: CheckboxFieldInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'agreeToTerms',
        label: 'I agree to the terms',
        type: FieldTypeEnum.Checkbox,
        order: 0,
        validators: []
    };

    function setup(control: FormControl) {
        TestBed.configureTestingModule({
            imports: [CheckboxFieldInput]
        });
        fixture = TestBed.createComponent(CheckboxFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl(false));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl(false));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('I agree to the terms');
    });

    it('should reflect the control initial value', () => {
        setup(new FormControl(true));
        const checkboxInput = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkboxInput?.checked).toBe(true);
    });

    it('should update the control value when the checkbox is clicked', () => {
        const control = new FormControl(false);
        setup(control);
        const checkboxInput = fixture.nativeElement.querySelector('input[type="checkbox"]');
        checkboxInput.click();
        fixture.detectChanges();
        expect(control.value).toBe(true);
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl(false, Validators.requiredTrue);
            setup(control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl(false, Validators.requiredTrue);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl(true, Validators.requiredTrue);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
