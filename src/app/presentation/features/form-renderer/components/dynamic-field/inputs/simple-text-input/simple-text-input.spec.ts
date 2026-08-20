import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextInput } from './simple-text-input';

describe('SimpleTextInput', () => {
    let component: SimpleTextInput;
    let fixture: ComponentFixture<SimpleTextInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SimpleTextInput]
        }).compileComponents();

        fixture = TestBed.createComponent(SimpleTextInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
