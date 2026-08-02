import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFieldInput } from './checkbox-field-input';

describe('CheckboxFieldInput', () => {
    let component: CheckboxFieldInput;
    let fixture: ComponentFixture<CheckboxFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CheckboxFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(CheckboxFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
