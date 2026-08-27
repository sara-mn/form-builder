import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { TextareaFieldInput } from './textarea-field-input';
import { FieldConfigModel } from '@app/domain/form/models/field-config.model';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('TextareaFieldInput', () => {
    let fixture: ComponentFixture<TextareaFieldInput>;
    let component: TextareaFieldInput;

    const mockField: FieldConfigModel = {
        id: 'f1',
        name: 'bio',
        label: 'Bio',
        type: FieldTypeEnum.Textarea,
        order: 0,
        validators: []
    };

    function setup(control: FormControl) {
        TestBed.configureTestingModule({
            imports: [TextareaFieldInput]
        });
        fixture = TestBed.createComponent(TextareaFieldInput);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('field', mockField);
        fixture.componentRef.setInput('control', control);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(new FormControl(''));
        expect(component).toBeTruthy();
    });

    it('should render the field label', () => {
        setup(new FormControl(''));
        const labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl.textContent.trim()).toBe('Bio');
    });

    it('should bind the textarea id to field name', () => {
        setup(new FormControl(''));
        const textareaEl = fixture.nativeElement.querySelector('textarea');
        expect(textareaEl.id).toBe('bio');
    });

    it('should reflect the control value in the textarea', () => {
        setup(new FormControl('Some bio text'));
        fixture.detectChanges();
        const textareaEl = fixture.nativeElement.querySelector('textarea');
        expect(textareaEl.value).toBe('Some bio text');
    });

    it('should update the control value when the user types', () => {
        const control = new FormControl('');
        setup(control);
        const textareaEl = fixture.nativeElement.querySelector('textarea');
        textareaEl.value = 'New bio';
        textareaEl.dispatchEvent(new Event('input'));
        expect(control.value).toBe('New bio');
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
            const control = new FormControl('valid text', Validators.required);
            setup(control);
            control.markAsTouched();
            fixture.detectChanges();
            const errorEl = fixture.nativeElement.querySelector('span.text-red-600');
            expect(errorEl).toBeFalsy();
        });
    });
});
