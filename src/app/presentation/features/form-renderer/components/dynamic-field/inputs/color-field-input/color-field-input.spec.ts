import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFieldInput } from './color-field-input';

describe('ColorFieldInput', () => {
    let component: ColorFieldInput;
    let fixture: ComponentFixture<ColorFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ColorFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(ColorFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
