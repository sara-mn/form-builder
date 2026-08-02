import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetadataPanel } from './form-metadata-panel';

describe('FormMetadataPanel', () => {
    let component: FormMetadataPanel;
    let fixture: ComponentFixture<FormMetadataPanel>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormMetadataPanel]
        }).compileComponents();

        fixture = TestBed.createComponent(FormMetadataPanel);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
