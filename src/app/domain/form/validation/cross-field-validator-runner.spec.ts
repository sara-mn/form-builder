import { describe, it, expect } from 'vitest';
import { runCrossFieldValidator } from './cross-field-validator-runner';
import { CrossFieldValidatorTypeEnum } from '../enums/cross-field-validator-type.enum';

describe('runCrossFieldValidator', () => {
    it('dispatches RequiredIfFilled to checkRequiredIfFilled', () => {
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.RequiredIfFilled, '', 'status')).toBe(false);
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.RequiredIfFilled, '', '')).toBe(true);
    });

    it('dispatches DateAfter to checkDateAfter', () => {
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.DateAfter, '2026-04-01', '2026-05-01')).toBe(false);
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.DateAfter, '2026-06-01', '2026-05-01')).toBe(true);
    });

    it('dispatches DateBefore to checkDateBefore', () => {
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.DateBefore, '2026-06-01', '2026-05-01')).toBe(false);
        expect(runCrossFieldValidator(CrossFieldValidatorTypeEnum.DateBefore, '2026-04-01', '2026-05-01')).toBe(true);
    });
});
