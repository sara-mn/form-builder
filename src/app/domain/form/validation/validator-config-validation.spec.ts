import { describe, it, expect } from 'vitest';
import { getValidatorConfigError, numericValidatorTypes } from './validator-config-validation';
import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';

describe('getValidatorConfigError', () => {
    describe('Pattern', () => {
        it('should return null for a valid regex pattern', () => {
            expect(getValidatorConfigError(FieldValidatorTypeEnum.Pattern, '^[a-z]+$')).toBeNull();
        });

        it('should return an error message for an invalid regex pattern', () => {
            expect(getValidatorConfigError(FieldValidatorTypeEnum.Pattern, '[')).toBe('Invalid regular expression');
        });
    });

    describe('numeric types (MinLength, MaxLength, MinValue, MaxValue)', () => {
        numericValidatorTypes.forEach((type) => {
            it(`should return null for a valid numeric string (${type})`, () => {
                expect(getValidatorConfigError(type, '10')).toBeNull();
            });

            it(`should return an error for a non-numeric string (${type})`, () => {
                expect(getValidatorConfigError(type, 'abc')).toBe('Must be a valid number');
            });

            it(`should return null when value is empty (not this function's concern) (${type})`, () => {
                expect(getValidatorConfigError(type, '')).toBeNull();
                expect(getValidatorConfigError(type, undefined)).toBeNull();
            });

            it(`should return null when value is already a number (${type})`, () => {
                expect(getValidatorConfigError(type, 10)).toBeNull();
            });
        });
    });

    describe('types with no config-level validation (Required, Email)', () => {
        it('should return null for Required regardless of value', () => {
            expect(getValidatorConfigError(FieldValidatorTypeEnum.Required, undefined)).toBeNull();
        });

        it('should return null for Email regardless of value', () => {
            expect(getValidatorConfigError(FieldValidatorTypeEnum.Email, undefined)).toBeNull();
        });
    });
});
