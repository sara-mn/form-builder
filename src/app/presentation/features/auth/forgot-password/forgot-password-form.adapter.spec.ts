import { describe, it, expect } from 'vitest';
import { ForgotPasswordFormAdapter } from './forgot-password-form.adapter';
import { ForgotPasswordFormModel } from './forgot-password-form.model';

describe('ForgotPasswordFormAdapter', () => {
    it('maps email from the form model to the domain payload', () => {
        const form: ForgotPasswordFormModel = { email: 'user@example.com' };

        const result = ForgotPasswordFormAdapter.toDomain(form);

        expect(result).toEqual({ email: 'user@example.com' });
    });
});
