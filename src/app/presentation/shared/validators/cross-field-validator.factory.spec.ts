import { AbstractControl } from '@angular/forms';
import { toCrossFieldValidatorFn } from './cross-field-validator.factory';
import { CrossFieldValidatorConfigModel, CrossFieldValidatorTypeEnum } from '@app/domain';

describe('toCrossFieldValidatorFn', () => {
    function makeConfig(overrides: Partial<CrossFieldValidatorConfigModel> = {}): CrossFieldValidatorConfigModel {
        return {
            id: 'v1',
            type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
            message: 'Default message',
            targetFieldId: 'target',
            dependsOnFieldId: 'source',
            ...overrides
        };
    }

    it('should resolve target and dependsOn values via the provided getFieldValue resolver', () => {
        const getFieldValue = vi.fn().mockImplementation((fieldId: string) => (fieldId === 'target' ? 'filled' : 'also filled'));
        const validatorFn = toCrossFieldValidatorFn(makeConfig(), getFieldValue);

        validatorFn({} as AbstractControl);

        expect(getFieldValue).toHaveBeenCalledWith('target');
        expect(getFieldValue).toHaveBeenCalledWith('source');
    });

    it('should return null when the check passes', () => {
        const getFieldValue = vi.fn().mockReturnValue('some value');
        const validatorFn = toCrossFieldValidatorFn(makeConfig({ type: CrossFieldValidatorTypeEnum.RequiredIfFilled }), getFieldValue);

        expect(validatorFn({} as AbstractControl)).toBeNull();
    });

    it('should return an error object keyed by the validator type when the check fails', () => {
        const getFieldValue = vi.fn().mockImplementation((fieldId: string) => (fieldId === 'target' ? '' : 'filled'));
        const config = makeConfig({ type: CrossFieldValidatorTypeEnum.RequiredIfFilled, message: 'Target required' });
        const validatorFn = toCrossFieldValidatorFn(config, getFieldValue);

        expect(validatorFn({} as AbstractControl)).toEqual({ [CrossFieldValidatorTypeEnum.RequiredIfFilled]: 'Target required' });
    });

    it('should dispatch to the DateAfter checker', () => {
        const getFieldValue = vi.fn().mockImplementation((fieldId: string) => (fieldId === 'target' ? '2026-01-01' : '2027-01-01'));
        const config = makeConfig({ type: CrossFieldValidatorTypeEnum.DateAfter, message: 'Must be after' });
        const validatorFn = toCrossFieldValidatorFn(config, getFieldValue);

        expect(validatorFn({} as AbstractControl)).toEqual({ [CrossFieldValidatorTypeEnum.DateAfter]: 'Must be after' });
    });

    it('should dispatch to the DateBefore checker', () => {
        const getFieldValue = vi.fn().mockImplementation((fieldId: string) => (fieldId === 'target' ? '2028-01-01' : '2027-01-01'));
        const config = makeConfig({ type: CrossFieldValidatorTypeEnum.DateBefore, message: 'Must be before' });
        const validatorFn = toCrossFieldValidatorFn(config, getFieldValue);

        expect(validatorFn({} as AbstractControl)).toEqual({ [CrossFieldValidatorTypeEnum.DateBefore]: 'Must be before' });
    });

    it('should pass when target and dependsOn field values are resolved to undefined (e.g. unknown field ids)', () => {
        const getFieldValue = vi.fn().mockReturnValue(undefined);
        const validatorFn = toCrossFieldValidatorFn(makeConfig({ type: CrossFieldValidatorTypeEnum.DateAfter }), getFieldValue);

        expect(validatorFn({} as AbstractControl)).toBeNull();
    });
});
