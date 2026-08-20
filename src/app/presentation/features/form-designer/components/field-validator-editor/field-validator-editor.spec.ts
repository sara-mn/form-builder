import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldValidatorEditor } from './field-validator-editor';

describe('FieldValidatorEditor', () => {
    let component: FieldValidatorEditor;
    let fixture: ComponentFixture<FieldValidatorEditor>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FieldValidatorEditor]
        }).compileComponents();

        fixture = TestBed.createComponent(FieldValidatorEditor);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
