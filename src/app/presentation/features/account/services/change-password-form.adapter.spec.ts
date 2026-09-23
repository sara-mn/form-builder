import { describe, it, expect } from 'vitest';
import { ChangePasswordFormAdapter } from './change-password-form.adapter';
import { ChangePasswordFormModel } from './change-password-form.model';

describe('ChangePasswordFormAdapter', () => {
    it('maps currentPassword and newPassword to the domain request, dropping confirmPassword', () => {
        const form: ChangePasswordFormModel = {
            currentPassword: 'Old123!',
            newPassword: 'New456!',
            confirmPassword: 'New456!'
        };

        const result = ChangePasswordFormAdapter.toDomain(form);

        expect(result).toEqual({ currentPassword: 'Old123!', newPassword: 'New456!' });
    });
});
