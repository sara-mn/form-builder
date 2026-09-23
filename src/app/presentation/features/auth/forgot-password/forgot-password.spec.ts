import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ForgotPassword } from './forgot-password';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ForgotPasswordFormCreator } from './forgot-password-form-creator';

describe('ForgotPassword', () => {
    let component: ForgotPassword;
    let fixture: ComponentFixture<ForgotPassword>;
    let authFacade: Pick<AuthFacade, 'requestPasswordReset'>;

    beforeEach(() => {
        authFacade = { requestPasswordReset: vi.fn() };

        TestBed.configureTestingModule({
            imports: [ForgotPassword],
            providers: [ForgotPasswordFormCreator, provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        });

        fixture = TestBed.createComponent(ForgotPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('does not call authFacade.requestPasswordReset when the form is invalid', () => {
        component.form.setValue({ email: '' });

        component.onSubmit();

        expect(authFacade.requestPasswordReset).not.toHaveBeenCalled();
    });

    it('calls authFacade.requestPasswordReset with the adapted payload on valid submit', async () => {
        (authFacade.requestPasswordReset as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.form.setValue({ email: 'user@example.com' });

        component.onSubmit();
        await fixture.whenStable();

        expect(authFacade.requestPasswordReset).toHaveBeenCalledWith({ email: 'user@example.com' });
    });

    it('shows the confirmation message after a successful submit', async () => {
        (authFacade.requestPasswordReset as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        component.form.setValue({ email: 'user@example.com' });

        component.onSubmit();
        await fixture.whenStable();
        fixture.detectChanges();

        const heading = fixture.nativeElement.querySelector('h1');
        expect(heading.textContent).toContain('Check your email');
    });
});
