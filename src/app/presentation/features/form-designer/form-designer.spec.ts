import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesigner } from './form-designer';

describe('FormDesigner', () => {
    let component: FormDesigner;
    let fixture: ComponentFixture<FormDesigner>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormDesigner]
        }).compileComponents();

        fixture = TestBed.createComponent(FormDesigner);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
