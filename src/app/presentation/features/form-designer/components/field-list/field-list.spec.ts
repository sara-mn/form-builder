import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldList } from './field-list';

describe('FieldList', () => {
    let component: FieldList;
    let fixture: ComponentFixture<FieldList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FieldList]
        }).compileComponents();

        fixture = TestBed.createComponent(FieldList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
