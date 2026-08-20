import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicField } from './dynamic-field';

describe('DynamicField', () => {
    let component: DynamicField;
    let fixture: ComponentFixture<DynamicField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicField]
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicField);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
