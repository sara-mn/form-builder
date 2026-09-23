import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ForgotPasswordFormCreator } from './forgot-password-form-creator';

describe('ForgotPasswordFormCreator', () => {
    let formCreator: ForgotPasswordFormCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [ForgotPasswordFormCreator] });
        formCreator = TestBed.inject(ForgotPasswordFormCreator);
    });

    it('creates a form with an empty email control', () => {
        const form = formCreator.createForm();

        expect(form.getRawValue()).toEqual({ email: '' });
    });

    it('marks the form invalid when email is empty', () => {
        const form = formCreator.createForm();

        expect(form.invalid).toBe(true);
    });

    it('marks the form invalid when email is not a valid email address', () => {
        const form = formCreator.createForm();

        form.setValue({ email: 'not-an-email' });

        expect(form.get('email')?.hasError('email')).toBe(true);
    });

    it('marks the form valid with a properly formatted email', () => {
        const form = formCreator.createForm();

        form.setValue({ email: 'user@example.com' });

        expect(form.valid).toBe(true);
    });
});
