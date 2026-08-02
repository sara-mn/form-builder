import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerPage } from './form-designer-page';

describe('FormDesignerPage', () => {
    let component: FormDesignerPage;
    let fixture: ComponentFixture<FormDesignerPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormDesignerPage]
        }).compileComponents();

        fixture = TestBed.createComponent(FormDesignerPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
