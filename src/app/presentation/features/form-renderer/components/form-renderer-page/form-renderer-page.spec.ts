import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendererPage } from './form-renderer-page';

describe('FormRendererPage', () => {
    let component: FormRendererPage;
    let fixture: ComponentFixture<FormRendererPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormRendererPage]
        }).compileComponents();

        fixture = TestBed.createComponent(FormRendererPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
