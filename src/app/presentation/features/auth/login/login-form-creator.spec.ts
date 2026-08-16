import { TestBed } from '@angular/core/testing';
import { LoginFormCreator } from './login-form-creator';

describe('LoginFormCreator', () => {
    let creator: LoginFormCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        creator = TestBed.inject(LoginFormCreator);
    });

    it('should be created', () => {
        expect(creator).toBeTruthy();
    });

    it('should build a form with email and password controls', () => {
        const form = creator.createForm();

        expect(form.contains('email')).toBe(true);
        expect(form.contains('password')).toBe(true);
    });

    it('should default both controls to non-nullable empty strings', () => {
        const form = creator.createForm();

        expect(form.controls.email.value).toBe('');
        expect(form.controls.password.value).toBe('');
    });

    it('should mark the form invalid when email and password are empty', () => {
        const form = creator.createForm();

        expect(form.valid).toBe(false);
        expect(form.controls.email.hasError('required')).toBe(true);
        expect(form.controls.password.hasError('required')).toBe(true);
    });

    it('should flag an invalid email format', () => {
        const form = creator.createForm();

        form.controls.email.setValue('not-an-email');

        expect(form.controls.email.hasError('email')).toBe(true);
    });

    it('should be valid once email and password are filled correctly', () => {
        const form = creator.createForm();

        form.controls.email.setValue('user@example.com');
        form.controls.password.setValue('secret123');

        expect(form.valid).toBe(true);
    });

    it('should return a new FormGroup instance on every call', () => {
        const formA = creator.createForm();
        const formB = creator.createForm();

        expect(formA).not.toBe(formB);
    });
});
