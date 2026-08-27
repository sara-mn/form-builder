import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { DateTimeFieldInput } from './date-time-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('DateTimeFieldInput', () => {
    let fixture: ComponentFixture<DateTimeFieldInput>;
    let component: DateTimeFieldInput;

    function setup(field: FieldConfigModel, control: FormControl) {
        TestBed.configureTestingModule({
            imports: [DateTimeFieldInput]
        });
        fixture = TestBed.createComponent(DateTimeFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', field);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    const dateField: FieldConfigModel = {
        id: 'f1',
        name: 'eventDate',
        label: 'Event Date',
        type: FieldTypeEnum.Date,
        order: 0,
        validators: []
    };

    const timeField: FieldConfigModel = {
        id: 'f2',
        name: 'eventTime',
        label: 'Event Time',
        type: FieldTypeEnum.Time,
        order: 0,
        validators: []
    };

    const dateTimeField: FieldConfigModel = {
        id: 'f3',
        name: 'eventDateTime',
        label: 'Event Date & Time',
        type: FieldTypeEnum.DateTime,
        order: 0,
        validators: []
    };

    it('should create', () => {
        setup(dateField, new FormControl(null));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(dateField, new FormControl(null));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Event Date');
    });

    describe('timeOnly', () => {
        it('should be true when field type is Time', () => {
            setup(timeField, new FormControl(null));
            expect(component.timeOnly()).toBe(true);
        });

        it('should be false when field type is Date', () => {
            setup(dateField, new FormControl(null));
            expect(component.timeOnly()).toBe(false);
        });

        it('should be false when field type is DateTime', () => {
            setup(dateTimeField, new FormControl(null));
            expect(component.timeOnly()).toBe(false);
        });
    });

    describe('showTime', () => {
        it('should be true when field type is DateTime', () => {
            setup(dateTimeField, new FormControl(null));
            expect(component.showTime()).toBe(true);
        });

        it('should be false when field type is Date', () => {
            setup(dateField, new FormControl(null));
            expect(component.showTime()).toBe(false);
        });

        it('should be false when field type is Time', () => {
            setup(timeField, new FormControl(null));
            expect(component.showTime()).toBe(false);
        });
    });

    describe('validation errors', () => {
        it('should not show error message when control is untouched and invalid', () => {
            const control = new FormControl(null, Validators.required);
            setup(dateField, control);
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });

        it('should show error message when control is invalid and touched', () => {
            const control = new FormControl(null, Validators.required);
            setup(dateField, control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeTruthy();
        });

        it('should not show error message when control is valid and touched', () => {
            const control = new FormControl(new Date(), Validators.required);
            setup(dateField, control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
