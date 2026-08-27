import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { ColorFieldInput } from './color-field-input';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('ColorFieldInput', () => {
    let fixture: ComponentFixture<ColorFieldInput>;
    let component: ColorFieldInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'brandColor',
        label: 'Brand Color',
        type: FieldTypeEnum.Color,
        order: 0,
        validators: []
    };

    function setup(control: FormControl) {
        TestBed.configureTestingModule({
            imports: [ColorFieldInput]
        });
        fixture = TestBed.createComponent(ColorFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl('#000000'));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl('#000000'));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Brand Color');
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
            const control = new FormControl('#ff0000', Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
