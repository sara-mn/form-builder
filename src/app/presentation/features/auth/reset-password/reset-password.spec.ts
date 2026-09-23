import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResetPassword } from './reset-password';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ResetPasswordFormCreator } from './reset-password-form-creator';

describe('ResetPassword', () => {
    let component: ResetPassword;
    let fixture: ComponentFixture<ResetPassword>;
    let authFacade: Pick<AuthFacade, 'confirmPasswordReset'>;
    let router: Router;

    function configureWithToken(token: string | null) {
        authFacade = { confirmPasswordReset: vi.fn() };

        TestBed.configureTestingModule({
            imports: [ResetPassword],
            providers: [
                ResetPasswordFormCreator,
                provideRouter([{ path: 'login', children: [] }]),
                { provide: AuthFacade, useValue: authFacade },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { queryParamMap: convertToParamMap(token ? { token } : {}) } }
                }
            ]
        });

        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(ResetPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', () => {
        configureWithToken('tok-1');
        expect(component).toBeTruthy();
    });

    it('shows the invalid-link message when no token is present in the query params', () => {
        configureWithToken(null);

        const form = fixture.nativeElement.querySelector('[data-testid="reset-password-form"]');
        const heading = fixture.nativeElement.querySelector('h1');

        expect(form).toBeNull();
        expect(heading.textContent).toContain('Invalid link');
    });

    it('renders the reset form and patches the token when present in the query params', () => {
        configureWithToken('tok-abc-123');

        const form = fixture.nativeElement.querySelector('[data-testid="reset-password-form"]');

        expect(form).toBeTruthy();
        expect(component.form.getRawValue().token).toBe('tok-abc-123');
    });

    it('does not call authFacade.confirmPasswordReset when the form is invalid', () => {
        configureWithToken('tok-1');
        component.form.patchValue({ newPassword: '', confirmPassword: '' });

        component.onSubmit();

        expect(authFacade.confirmPasswordReset).not.toHaveBeenCalled();
    });

    it('calls authFacade.confirmPasswordReset with the adapted payload on valid submit', async () => {
        configureWithToken('tok-1');
        (authFacade.confirmPasswordReset as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'New456!' });

        component.onSubmit();
        await fixture.whenStable();

        expect(authFacade.confirmPasswordReset).toHaveBeenCalledWith({ token: 'tok-1', newPassword: 'New456!' });
    });

    it('navigates to /login after a successful reset', async () => {
        configureWithToken('tok-1');
        (authFacade.confirmPasswordReset as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        const navigateSpy = vi.spyOn(router, 'navigate');
        component.form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'New456!' });

        component.onSubmit();
        await fixture.whenStable();

        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

    it('does not call authFacade.confirmPasswordReset when passwords do not match', () => {
        configureWithToken('tok-1');
        component.form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'Different789!' });

        component.onSubmit();

        expect(authFacade.confirmPasswordReset).not.toHaveBeenCalled();
    });
});
