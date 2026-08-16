import { TestBed } from '@angular/core/testing';
import { RegisterFormCreator } from './register-form-creator';

describe('RegisterFormCreator', () => {
    let creator: RegisterFormCreator;

    const validValue = {
        email: 'newuser@example.com',
        mobile: '09120000000',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        firstName: '',
        lastName: ''
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        creator = TestBed.inject(RegisterFormCreator);
    });

    it('should be created', () => {
        expect(creator).toBeTruthy();
    });

    it('should build a form with all RegisterFormModel controls', () => {
        const form = creator.createForm();

        for (const key of ['email', 'mobile', 'password', 'confirmPassword', 'firstName', 'lastName']) {
            expect(form.contains(key)).toBe(true);
        }
    });

    it('should default every control to a non-nullable empty string', () => {
        const form = creator.createForm();

        expect(form.controls.email.value).toBe('');
        expect(form.controls.mobile.value).toBe('');
        expect(form.controls.password.value).toBe('');
        expect(form.controls.confirmPassword.value).toBe('');
        expect(form.controls.firstName.value).toBe('');
        expect(form.controls.lastName.value).toBe('');
    });

    it('should require email, mobile, password and confirmPassword', () => {
        const form = creator.createForm();

        expect(form.controls.email.hasError('required')).toBe(true);
        expect(form.controls.mobile.hasError('required')).toBe(true);
        expect(form.controls.password.hasError('required')).toBe(true);
        expect(form.controls.confirmPassword.hasError('required')).toBe(true);
    });

    it('should leave firstName and lastName optional', () => {
        const form = creator.createForm();
        form.patchValue({ ...validValue, firstName: undefined, lastName: undefined });

        expect(form.controls.firstName.hasError('required')).toBe(false);
        expect(form.controls.lastName.hasError('required')).toBe(false);
    });

    it('should flag an invalid email format', () => {
        const form = creator.createForm();

        form.controls.email.setValue('not-an-email');

        expect(form.controls.email.hasError('email')).toBe(true);
    });

    it('should enforce a minimum password length of 6', () => {
        const form = creator.createForm();

        form.controls.password.setValue('123');

        expect(form.controls.password.hasError('minlength')).toBe(true);
    });

    it('should set a form-level passwordMismatch error when passwords differ', () => {
        const form = creator.createForm();

        form.setValue({ ...validValue, confirmPassword: 'Different123!' });

        expect(form.errors?.['passwordMismatch']).toBe(true);
        expect(form.valid).toBe(false);
    });

    it('should clear the passwordMismatch error once passwords match', () => {
        const form = creator.createForm();

        form.setValue({ ...validValue, confirmPassword: 'Different123!' });
        form.setValue(validValue);

        expect(form.errors).toBeNull();
    });

    it('should be valid once all required fields are correctly filled', () => {
        const form = creator.createForm();

        form.setValue(validValue);

        expect(form.valid).toBe(true);
    });

    it('should return a new FormGroup instance on every call', () => {
        const formA = creator.createForm();
        const formB = creator.createForm();

        expect(formA).not.toBe(formB);
    });
});
