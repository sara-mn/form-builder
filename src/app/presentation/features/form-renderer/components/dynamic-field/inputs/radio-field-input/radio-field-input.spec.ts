import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFieldInput } from './radio-field-input';

describe('RadioFieldInput', () => {
    let component: RadioFieldInput;
    let fixture: ComponentFixture<RadioFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
