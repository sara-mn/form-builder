import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFieldInput } from './textarea-field-input';

describe('TextareaFieldInput', () => {
    let component: TextareaFieldInput;
    let fixture: ComponentFixture<TextareaFieldInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextareaFieldInput]
        }).compileComponents();

        fixture = TestBed.createComponent(TextareaFieldInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
