import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DynamicField } from './dynamic-field';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('DynamicField', () => {
    let fixture: ComponentFixture<DynamicField>;
    let component: DynamicField;

    function setup(type: FieldTypeEnum) {
        const field: FieldConfigModel = {
            id: 'f1',
            name: 'testField',
            label: 'Test Field',
            type,
            order: 0,
            validators: []
        };

        TestBed.configureTestingModule({
            imports: [DynamicField]
        });
        fixture = TestBed.createComponent(DynamicField);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', field);
        fixture.componentRef.setInput('control', new FormControl(null));
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(FieldTypeEnum.Text);
        expect(component).toBeTruthy();
    });

    it('should render app-simple-text-input for Text type', () => {
        setup(FieldTypeEnum.Text);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-simple-text-input for Password type', () => {
        setup(FieldTypeEnum.Password);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-simple-text-input for Email type', () => {
        setup(FieldTypeEnum.Email);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-simple-text-input for Number type', () => {
        setup(FieldTypeEnum.Number);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-simple-text-input for Tel type', () => {
        setup(FieldTypeEnum.Tel);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-simple-text-input for Url type', () => {
        setup(FieldTypeEnum.Url);
        expect(fixture.nativeElement.querySelector('app-simple-text-input')).toBeTruthy();
    });

    it('should render app-textarea-field-input for Textarea type', () => {
        setup(FieldTypeEnum.Textarea);
        expect(fixture.nativeElement.querySelector('app-textarea-field-input')).toBeTruthy();
    });

    it('should render app-select-field-input for Select type', () => {
        setup(FieldTypeEnum.Select);
        expect(fixture.nativeElement.querySelector('app-select-field-input')).toBeTruthy();
    });

    it('should render app-radio-field-input for Radio type', () => {
        setup(FieldTypeEnum.Radio);
        expect(fixture.nativeElement.querySelector('app-radio-field-input')).toBeTruthy();
    });

    it('should render app-checkbox-field-input for Checkbox type', () => {
        setup(FieldTypeEnum.Checkbox);
        expect(fixture.nativeElement.querySelector('app-checkbox-field-input')).toBeTruthy();
    });

    it('should render app-date-time-field-input for Date type', () => {
        setup(FieldTypeEnum.Date);
        expect(fixture.nativeElement.querySelector('app-date-time-field-input')).toBeTruthy();
    });

    it('should render app-date-time-field-input for Time type', () => {
        setup(FieldTypeEnum.Time);
        expect(fixture.nativeElement.querySelector('app-date-time-field-input')).toBeTruthy();
    });

    it('should render app-date-time-field-input for DateTime type', () => {
        setup(FieldTypeEnum.DateTime);
        expect(fixture.nativeElement.querySelector('app-date-time-field-input')).toBeTruthy();
    });

    it('should render app-date-range-field-input for DateRange type', () => {
        setup(FieldTypeEnum.DateRange);
        expect(fixture.nativeElement.querySelector('app-date-range-field-input')).toBeTruthy();
    });

    it('should render app-color-field-input for Color type', () => {
        setup(FieldTypeEnum.Color);
        expect(fixture.nativeElement.querySelector('app-color-field-input')).toBeTruthy();
    });

    it('should render app-range-field-input for Range type', () => {
        setup(FieldTypeEnum.Range);
        expect(fixture.nativeElement.querySelector('app-range-field-input')).toBeTruthy();
    });

    describe('simpleInputType getter', () => {
        it('should return the mapped SimpleInputType for a simple field type', () => {
            setup(FieldTypeEnum.Email);
            expect(component.simpleInputType).toBe('email');
        });

        it('should return null for a non-simple field type', () => {
            setup(FieldTypeEnum.Select);
            expect(component.simpleInputType).toBeNull();
        });
    });

    describe('isDateTimeType getter', () => {
        it('should be true for Date, Time, and DateTime types', () => {
            setup(FieldTypeEnum.Date);
            expect(component.isDateTimeType).toBe(true);
        });

        it('should be false for a non-date field type', () => {
            setup(FieldTypeEnum.Text);
            expect(component.isDateTimeType).toBe(false);
        });
    });
});
