import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormList } from './form-list';

describe('FormList', () => {
    let component: FormList;
    let fixture: ComponentFixture<FormList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormList]
        }).compileComponents();

        fixture = TestBed.createComponent(FormList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
