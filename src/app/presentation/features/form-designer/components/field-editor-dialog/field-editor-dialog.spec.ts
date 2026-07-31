import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEditorDialog } from './field-editor-dialog';

describe('FieldEditorDialog', () => {
    let component: FieldEditorDialog;
    let fixture: ComponentFixture<FieldEditorDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FieldEditorDialog]
        }).compileComponents();

        fixture = TestBed.createComponent(FieldEditorDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
