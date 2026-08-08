import { describe, it, expect } from 'vitest';
import { runFieldValidator } from './field-validator-runner';
import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';
import { FieldValidatorConfigModel } from '../models/field-validator-config.model';

function buildConfig(overrides: Partial<FieldValidatorConfigModel>): FieldValidatorConfigModel {
    return {
        id: 'test-id',
        type: FieldValidatorTypeEnum.Required,
        message: 'error',
        ...overrides
    };
}

describe('runFieldValidator', () => {
    it('dispatches Required to checkRequired', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.Required });
        expect(runFieldValidator(config, '')).toBe(false);
        expect(runFieldValidator(config, 'value')).toBe(true);
    });

    it('dispatches MinLength to checkMinLength with configValue', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.MinLength, value: 5 });
        expect(runFieldValidator(config, 'abc')).toBe(false);
        expect(runFieldValidator(config, 'abcdef')).toBe(true);
    });

    it('dispatches MaxLength to checkMaxLength with configValue', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.MaxLength, value: 3 });
        expect(runFieldValidator(config, 'abcdef')).toBe(false);
        expect(runFieldValidator(config, 'ab')).toBe(true);
    });

    it('dispatches Pattern to checkPattern with configValue', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.Pattern, value: '^[0-9]+$' });
        expect(runFieldValidator(config, 'abc')).toBe(false);
        expect(runFieldValidator(config, '123')).toBe(true);
    });

    it('dispatches MinValue to checkMinValue with configValue', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.MinValue, value: 10 });
        expect(runFieldValidator(config, 5)).toBe(false);
        expect(runFieldValidator(config, 15)).toBe(true);
    });

    it('dispatches MaxValue to checkMaxValue with configValue', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.MaxValue, value: 10 });
        expect(runFieldValidator(config, 15)).toBe(false);
        expect(runFieldValidator(config, 5)).toBe(true);
    });

    it('dispatches Email to checkEmail', () => {
        const config = buildConfig({ type: FieldValidatorTypeEnum.Email });
        expect(runFieldValidator(config, 'not-an-email')).toBe(false);
        expect(runFieldValidator(config, 'user@example.com')).toBe(true);
    });
});
