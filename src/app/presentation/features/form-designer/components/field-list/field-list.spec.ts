import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { FieldList } from './field-list';
import { FieldConfigModel } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('FieldList', () => {
    let fixture: ComponentFixture<FieldList>;
    let component: FieldList;

    const field1: FieldConfigModel = {
        id: 'f1',
        name: 'name',
        label: 'Full Name',
        type: FieldTypeEnum.Text,
        order: 0,
        validators: []
    };

    const field2: FieldConfigModel = {
        id: 'f2',
        name: 'email',
        label: 'Email',
        type: FieldTypeEnum.Email,
        order: 1,
        validators: []
    };

    function setup(fields: FieldConfigModel[] = [field1, field2], disabled = false) {
        TestBed.configureTestingModule({
            imports: [FieldList]
        });
        fixture = TestBed.createComponent(FieldList);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('fields', fields);
        fixture.componentRef.setInput('disabled', disabled);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render one row per field with label and type', () => {
        setup();
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('Full Name');
        expect(text).toContain('Email');
    });

    it('should show the empty message when there are no fields', () => {
        setup([]);
        expect(fixture.nativeElement.textContent).toContain('No fields in this page yet.');
    });

    it('should emit fieldAddRequested when Add Field is clicked', () => {
        setup();
        const emitSpy = vi.fn();
        component.fieldAddRequested.subscribe(emitSpy);

        const addButton = fixture.nativeElement.querySelector('button');
        addButton.click();

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should disable the Add Field button when disabled is true', () => {
        setup([field1], true);
        const addButton = fixture.nativeElement.querySelector('button');
        expect(addButton.disabled).toBe(true);
    });

    it('should emit fieldEditRequested with the field when Edit is clicked', () => {
        setup();
        const emitSpy = vi.fn();
        component.fieldEditRequested.subscribe(emitSpy);

        const editButtons = fixture.nativeElement.querySelectorAll('button');
        // buttons order: [Add Field, Edit(field1), Delete(field1), Edit(field2), Delete(field2)]
        editButtons[1].click();

        expect(emitSpy).toHaveBeenCalledWith(field1);
    });

    describe('onDelete', () => {
        it('should open a confirmation dialog without emitting fieldDeleteRequested immediately', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');
            const emitSpy = vi.fn();
            component.fieldDeleteRequested.subscribe(emitSpy);

            component.onDelete(field1);

            expect(confirmSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Delete field "Full Name"?'
                })
            );
            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should emit fieldDeleteRequested only after the user accepts the confirmation', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');
            const emitSpy = vi.fn();
            component.fieldDeleteRequested.subscribe(emitSpy);

            component.onDelete(field1);

            const acceptCallback = confirmSpy.mock.calls[0][0].accept;
            acceptCallback?.();

            expect(emitSpy).toHaveBeenCalledWith(field1);
        });
    });
});
