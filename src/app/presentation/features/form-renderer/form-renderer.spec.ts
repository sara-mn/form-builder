import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRenderer } from './form-renderer';

describe('FormRenderer', () => {
    let component: FormRenderer;
    let fixture: ComponentFixture<FormRenderer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormRenderer]
        }).compileComponents();

        fixture = TestBed.createComponent(FormRenderer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
