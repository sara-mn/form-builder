import { describe, it, expect } from 'vitest';
import { ResetPasswordFormAdapter } from './reset-password-form.adapter';
import { ResetPasswordFormModel } from './reset-password-form.model';

describe('ResetPasswordFormAdapter', () => {
    it('maps token and newPassword to the domain payload, dropping confirmPassword', () => {
        const form: ResetPasswordFormModel = {
            token: 'tok-1',
            newPassword: 'New456!',
            confirmPassword: 'New456!'
        };

        const result = ResetPasswordFormAdapter.toDomain(form);

        expect(result).toEqual({ token: 'tok-1', newPassword: 'New456!' });
    });
});
