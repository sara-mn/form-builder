import { FormControl } from '@angular/forms';
import { toFieldValidatorFn } from './field-validator.factory';
import { FieldValidatorConfigModel, FieldValidatorTypeEnum } from '@app/domain';

describe('toFieldValidatorFn', () => {
    function makeConfig(overrides: Partial<FieldValidatorConfigModel> = {}): FieldValidatorConfigModel {
        return {
            id: 'v1',
            type: FieldValidatorTypeEnum.Required,
            message: 'Default message',
            ...overrides
        };
    }

    it('should return null when the check passes', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.Required }));
        const result = validatorFn(new FormControl('some value'));
        expect(result).toBeNull();
    });

    it('should return an error object keyed by the validator type when the check fails', () => {
        const config = makeConfig({ type: FieldValidatorTypeEnum.Required, message: 'Required!' });
        const validatorFn = toFieldValidatorFn(config);
        const result = validatorFn(new FormControl(''));
        expect(result).toEqual({ [FieldValidatorTypeEnum.Required]: 'Required!' });
    });

    it('should dispatch to the correct checker for MinLength and pass the config value', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.MinLength, value: 5, message: 'Too short' }));
        expect(validatorFn(new FormControl('abc'))).toEqual({ [FieldValidatorTypeEnum.MinLength]: 'Too short' });
        expect(validatorFn(new FormControl('abcde'))).toBeNull();
    });

    it('should dispatch to the correct checker for MaxLength and pass the config value', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.MaxLength, value: 3, message: 'Too long' }));
        expect(validatorFn(new FormControl('abcd'))).toEqual({ [FieldValidatorTypeEnum.MaxLength]: 'Too long' });
        expect(validatorFn(new FormControl('ab'))).toBeNull();
    });

    it('should dispatch to the correct checker for Pattern and pass the config value', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.Pattern, value: '^[0-9]+$', message: 'Digits only' }));
        expect(validatorFn(new FormControl('abc'))).toEqual({ [FieldValidatorTypeEnum.Pattern]: 'Digits only' });
        expect(validatorFn(new FormControl('123'))).toBeNull();
    });

    it('should dispatch to the correct checker for MinValue and pass the config value', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.MinValue, value: 10, message: 'Too low' }));
        expect(validatorFn(new FormControl(5))).toEqual({ [FieldValidatorTypeEnum.MinValue]: 'Too low' });
        expect(validatorFn(new FormControl(15))).toBeNull();
    });

    it('should dispatch to the correct checker for MaxValue and pass the config value', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.MaxValue, value: 100, message: 'Too high' }));
        expect(validatorFn(new FormControl(150))).toEqual({ [FieldValidatorTypeEnum.MaxValue]: 'Too high' });
        expect(validatorFn(new FormControl(50))).toBeNull();
    });

    it('should dispatch to the Email checker', () => {
        const validatorFn = toFieldValidatorFn(makeConfig({ type: FieldValidatorTypeEnum.Email, message: 'Invalid email' }));
        expect(validatorFn(new FormControl('not-an-email'))).toEqual({ [FieldValidatorTypeEnum.Email]: 'Invalid email' });
        expect(validatorFn(new FormControl('user@example.com'))).toBeNull();
    });
});
