import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldInput } from './select-field-input';

describe('SelectFieldInput', () => {
    let component: SelectFieldInput;
    let fixture: ComponentFixture<SelectFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
