import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccountFormCreator } from './account-form-creator';

describe('AccountFormCreator', () => {
    let formCreator: AccountFormCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [AccountFormCreator] });
        formCreator = TestBed.inject(AccountFormCreator);
    });

    describe('createProfileForm', () => {
        it('creates a form with empty name and mobile controls', () => {
            const form = formCreator.createProfileForm();

            expect(form.getRawValue()).toEqual({ name: '', mobile: '' });
        });

        it('marks the form invalid when name is empty', () => {
            const form = formCreator.createProfileForm();

            expect(form.invalid).toBe(true);
        });

        it('marks the form valid when both name and mobile are filled', () => {
            const form = formCreator.createProfileForm();

            form.setValue({ name: 'Sara Mn', mobile: '09121234567' });

            expect(form.valid).toBe(true);
        });
    });

    describe('createChangePasswordForm', () => {
        it('creates a form with empty password controls', () => {
            const form = formCreator.createChangePasswordForm();

            expect(form.getRawValue()).toEqual({ currentPassword: '', newPassword: '', confirmPassword: '' });
        });

        it('marks the form invalid when required fields are empty', () => {
            const form = formCreator.createChangePasswordForm();

            expect(form.invalid).toBe(true);
        });

        it('marks newPassword invalid when shorter than 6 characters', () => {
            const form = formCreator.createChangePasswordForm();

            form.patchValue({ newPassword: 'ab1' });

            expect(form.get('newPassword')?.hasError('minlength')).toBe(true);
        });

        it('sets a passwordMismatch error at the form level when passwords differ', () => {
            const form = formCreator.createChangePasswordForm();

            form.setValue({ currentPassword: 'Old123!', newPassword: 'New456!', confirmPassword: 'Different789!' });

            expect(form.errors).toEqual({ passwordMismatch: true });
        });

        it('clears the passwordMismatch error when passwords match', () => {
            const form = formCreator.createChangePasswordForm();

            form.setValue({ currentPassword: 'Old123!', newPassword: 'New456!', confirmPassword: 'New456!' });

            expect(form.errors).toBeNull();
        });

        it('is valid when all fields are correctly filled and passwords match', () => {
            const form = formCreator.createChangePasswordForm();

            form.setValue({ currentPassword: 'Old123!', newPassword: 'New456!', confirmPassword: 'New456!' });

            expect(form.valid).toBe(true);
        });
    });
});
