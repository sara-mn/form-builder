import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormDialog } from './new-form-dialog';

describe('NewFormDialog', () => {
    let component: NewFormDialog;
    let fixture: ComponentFixture<NewFormDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewFormDialog]
        }).compileComponents();

        fixture = TestBed.createComponent(NewFormDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
