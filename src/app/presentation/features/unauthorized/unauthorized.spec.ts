import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Unauthorized } from './unauthorized';

describe('Unauthorized', () => {
    let component: Unauthorized;
    let fixture: ComponentFixture<Unauthorized>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Unauthorized],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(Unauthorized);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the 403 code and access-denied message', () => {
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('403');
        expect(text).toContain('Access Denied');
        expect(text).toContain("You don't have permission to access this page.");
    });

    it('should link back to the dashboard', () => {
        const link = fixture.debugElement.query(By.css('[routerLink="/"]'));
        expect(link).toBeTruthy();
    });
});
