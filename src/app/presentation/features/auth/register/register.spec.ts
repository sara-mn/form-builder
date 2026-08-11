import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { Register } from './register';
import { AuthFacade } from '@features/auth/services/auth.facade';

describe('Register', () => {
    let component: Register;
    let fixture: ComponentFixture<Register>;
    let authFacade: Pick<AuthFacade, 'register'>;
    let router: Router;

    const validValue = {
        email: 'newuser@example.com',
        mobile: '09120000000',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        firstName: '',
        lastName: ''
    };

    beforeEach(async () => {
        authFacade = { register: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [Register],
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(Register);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should build a form with all RegisterFormModel controls', () => {
        for (const key of ['email', 'mobile', 'password', 'confirmPassword', 'firstName', 'lastName']) {
            expect(component.form.contains(key)).toBe(true);
        }
    });

    it('should disable the submit button while the form is invalid', () => {
        const button = fixture.debugElement.query(By.css('[data-testid="register-submit-button"]')).nativeElement as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('should flag a form-level passwordMismatch error when passwords differ', () => {
        component.form.setValue({ ...validValue, confirmPassword: 'Different123!' });
        fixture.detectChanges();

        expect(component.form.errors?.['passwordMismatch']).toBe(true);
        expect(component.form.valid).toBe(false);
    });

    it('should clear the passwordMismatch error once passwords match', () => {
        component.form.setValue({ ...validValue, confirmPassword: 'Different123!' });
        component.form.setValue(validValue);
        fixture.detectChanges();

        expect(component.form.errors).toBeNull();
    });

    it('should display the password mismatch message once confirmPassword is touched', () => {
        component.form.setValue({ ...validValue, confirmPassword: 'Different123!' });
        component.form.controls.confirmPassword.markAsTouched();
        fixture.detectChanges();

        const error = fixture.debugElement.query(By.css('[data-testid="register-password-mismatch-error"]'));
        expect(error).toBeTruthy();
    });

    it('should enable the submit button once all fields are valid', () => {
        component.form.setValue(validValue);
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('[data-testid="register-submit-button"]')).nativeElement as HTMLButtonElement;
        expect(button.disabled).toBe(false);
    });

    it('should map form fields to a RegisterRequest and call AuthFacade.register on submit', () => {
        (authFacade.register as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.form.setValue(validValue);
        fixture.detectChanges();

        component.onSubmit();

        expect(authFacade.register).toHaveBeenCalledWith({
            email: validValue.email,
            mobile: validValue.mobile,
            password: validValue.password,
            confirmPassword: validValue.confirmPassword,
            firstName: '',
            lastName: ''
        });
    });

    it('should not call AuthFacade.register when the form is invalid', () => {
        component.onSubmit();
        expect(authFacade.register).not.toHaveBeenCalled();
    });

    it('should navigate to "/login" after a successful registration', async () => {
        (authFacade.register as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
        component.form.setValue(validValue);

        component.onSubmit();
        await Promise.resolve();
        await Promise.resolve();

        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should require a minimum password length of 6', () => {
        component.form.setValue({ ...validValue, password: '123', confirmPassword: '123' });
        fixture.detectChanges();

        expect(component.form.controls.password.hasError('minlength')).toBe(true);
    });
});
