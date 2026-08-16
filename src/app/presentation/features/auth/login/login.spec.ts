import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { Login } from './login';
import { AuthFacade } from '@features/auth/services/auth.facade';

describe('Login', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;
    let authFacade: Pick<AuthFacade, 'login'>;
    let router: Router;

    beforeEach(async () => {
        authFacade = { login: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [Login],
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should build a form with email and password controls', () => {
        expect(component.form.contains('email')).toBe(true);
        expect(component.form.contains('password')).toBe(true);
    });

    it('should disable the submit button while the form is invalid', () => {
        const button = fixture.debugElement.query(By.css('[data-testid="login-submit-button"]')).nativeElement as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('should enable the submit button once email and password are valid', () => {
        component.form.setValue({ email: 'user@example.com', password: 'secret123' });
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('[data-testid="login-submit-button"]')).nativeElement as HTMLButtonElement;
        expect(button.disabled).toBe(false);
    });

    it('should map form fields to a LoginRequest and call AuthFacade.login on submit', () => {
        (authFacade.login as ReturnType<typeof vi.fn>).mockResolvedValue({ id: 'u1' });
        component.form.setValue({ email: 'user@example.com', password: 'secret123' });
        fixture.detectChanges();

        component.onSubmit();

        expect(authFacade.login).toHaveBeenCalledWith({ username: 'user@example.com', password: 'secret123' });
    });

    it('should not call AuthFacade.login when the form is invalid', () => {
        component.onSubmit();
        expect(authFacade.login).not.toHaveBeenCalled();
    });

    it('should navigate to "/" after a successful login', async () => {
        (authFacade.login as ReturnType<typeof vi.fn>).mockResolvedValue({ id: 'u1' });
        const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
        component.form.setValue({ email: 'user@example.com', password: 'secret123' });

        component.onSubmit();
        await Promise.resolve();
        await Promise.resolve();

        expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('should default the password field to masked (aria-label reflects hidden state)', () => {
        const toggle = fixture.debugElement.query(By.css('[data-testid="login-password-toggle"]')).nativeElement as HTMLElement;
        expect(toggle.getAttribute('aria-label')).toBe('Show password');
    });

    it('should toggle the aria-label when the password visibility icon is clicked', () => {
        const toggle = fixture.debugElement.query(By.css('[data-testid="login-password-toggle"]')).nativeElement as HTMLElement;

        toggle.click();
        fixture.detectChanges();

        expect(toggle.getAttribute('aria-label')).toBe('Hide password');
    });

    it('should toggle back to masked on a second click', () => {
        const toggle = fixture.debugElement.query(By.css('[data-testid="login-password-toggle"]')).nativeElement as HTMLElement;

        toggle.click();
        fixture.detectChanges();
        toggle.click();
        fixture.detectChanges();

        expect(toggle.getAttribute('aria-label')).toBe('Show password');
    });

    it('should link to the register page', () => {
        const link = fixture.debugElement.query(By.css('a[routerLink="/register"]'));
        expect(link).toBeTruthy();
    });
});
