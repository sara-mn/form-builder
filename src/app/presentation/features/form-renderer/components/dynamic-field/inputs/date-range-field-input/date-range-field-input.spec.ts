import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeFieldInput } from './date-range-field-input';

describe('DateRangeFieldInput', () => {
    let component: DateRangeFieldInput;
    let fixture: ComponentFixture<DateRangeFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateRangeFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(DateRangeFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
