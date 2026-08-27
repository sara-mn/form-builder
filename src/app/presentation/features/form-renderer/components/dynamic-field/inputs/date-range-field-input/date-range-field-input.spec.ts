import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { DateRangeFieldInput } from './date-range-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('DateRangeFieldInput', () => {
    let fixture: ComponentFixture<DateRangeFieldInput>;
    let component: DateRangeFieldInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'vacationDates',
        label: 'Vacation Dates',
        type: FieldTypeEnum.DateRange,
        order: 0,
        validators: []
    };

    function setup(control: FormControl) {
        TestBed.configureTestingModule({
            imports: [DateRangeFieldInput]
        });
        fixture = TestBed.createComponent(DateRangeFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl(null));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl(null));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Vacation Dates');
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl(null, Validators.required);
            setup(control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl(null, Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl([new Date(), new Date()], Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
