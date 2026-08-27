import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { RangeFieldInput } from './range-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('RangeFieldInput', () => {
    let fixture: ComponentFixture<RangeFieldInput>;
    let component: RangeFieldInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'volume',
        label: 'Volume',
        type: FieldTypeEnum.Range,
        order: 0,
        validators: []
    };

    function setup(control: FormControl) {
        TestBed.configureTestingModule({
            imports: [RangeFieldInput]
        });
        fixture = TestBed.createComponent(RangeFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl(50));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl(50));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Volume');
    });

    it('should display the current control value', () => {
        setup(new FormControl(75));
        expect(fixture.nativeElement.textContent).toContain('75');
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl(0, Validators.min(1));
            setup(control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl(0, Validators.min(1));
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl(50, Validators.min(1));
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
