import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFieldInput } from './date-time-field-input';

describe('DateTimeFieldInput', () => {
    let component: DateTimeFieldInput;
    let fixture: ComponentFixture<DateTimeFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateTimeFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(DateTimeFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
