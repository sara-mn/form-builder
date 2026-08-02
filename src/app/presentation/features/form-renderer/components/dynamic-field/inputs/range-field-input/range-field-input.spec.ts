import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFieldInput } from './range-field-input';

describe('RangeFieldInput', () => {
    let component: RangeFieldInput;
    let fixture: ComponentFixture<RangeFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RangeFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(RangeFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
