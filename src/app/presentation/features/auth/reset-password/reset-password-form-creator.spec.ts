import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ResetPasswordFormCreator } from './reset-password-form-creator';

describe('ResetPasswordFormCreator', () => {
    let formCreator: ResetPasswordFormCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [ResetPasswordFormCreator] });
        formCreator = TestBed.inject(ResetPasswordFormCreator);
    });

    it('creates a form with empty token, newPassword and confirmPassword controls', () => {
        const form = formCreator.createForm();

        expect(form.getRawValue()).toEqual({ token: '', newPassword: '', confirmPassword: '' });
    });

    it('marks the form invalid when required fields are empty', () => {
        const form = formCreator.createForm();

        expect(form.invalid).toBe(true);
    });

    it('marks newPassword invalid when shorter than 6 characters', () => {
        const form = formCreator.createForm();

        form.patchValue({ newPassword: 'ab1' });

        expect(form.get('newPassword')?.hasError('minlength')).toBe(true);
    });

    it('sets a passwordMismatch error at the form level when passwords differ', () => {
        const form = formCreator.createForm();

        form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'Different789!' });

        expect(form.errors).toEqual({ passwordMismatch: true });
    });

    it('clears the passwordMismatch error when passwords match', () => {
        const form = formCreator.createForm();

        form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'New456!' });

        expect(form.errors).toBeNull();
    });

    it('is valid when all fields are correctly filled and passwords match', () => {
        const form = formCreator.createForm();

        form.setValue({ token: 'tok-1', newPassword: 'New456!', confirmPassword: 'New456!' });

        expect(form.valid).toBe(true);
    });
});
