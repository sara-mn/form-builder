import { describe, it, expect } from 'vitest';
import { checkRequiredIfFilled, checkDateAfter, checkDateBefore } from './cross-field-validators';

describe('checkRequiredIfFilled', () => {
    it('should return true when dependsOn field is empty (rule not applicable)', () => {
        expect(checkRequiredIfFilled('', '')).toBe(true);
        expect(checkRequiredIfFilled(null, null)).toBe(true);
    });

    it('should return false when dependsOn is filled but target is empty', () => {
        expect(checkRequiredIfFilled('', 'some-status')).toBe(false);
    });

    it('should return false when dependsOn is filled but target is null', () => {
        expect(checkRequiredIfFilled(null, 'some-status')).toBe(false);
    });

    it('should return true when both dependsOn and target are filled', () => {
        expect(checkRequiredIfFilled('some-reason', 'some-status')).toBe(true);
    });

    it('should return true when dependsOn is 0 (filled, not empty)', () => {
        expect(checkRequiredIfFilled('reason', 0)).toBe(true);
    });

    it('should treat a whitespace-only dependsOn value as "empty" (shares isFilled with checkRequired)', () => {
        expect(checkRequiredIfFilled('', '   ')).toBe(true);
    });

    it('should treat a whitespace-only target value as "empty"', () => {
        expect(checkRequiredIfFilled('   ', 'some-status')).toBe(false);
    });
});

describe('checkDateAfter', () => {
    it('should return true when target is after dependsOn', () => {
        expect(checkDateAfter('2026-06-01', '2026-05-01')).toBe(true);
    });

    it('should return false when target equals dependsOn (business rule: min 1-day gap required)', () => {
        expect(checkDateAfter('2026-05-01', '2026-05-01')).toBe(false);
    });

    it('should return false when target is before dependsOn', () => {
        expect(checkDateAfter('2026-04-01', '2026-05-01')).toBe(false);
    });

    it('should return true when either value is not a string (not applicable)', () => {
        expect(checkDateAfter(123, '2026-05-01')).toBe(true);
        expect(checkDateAfter('2026-05-01', null)).toBe(true);
    });

    it('should return true when either value is an unparseable date string (not applicable)', () => {
        expect(checkDateAfter('not-a-date', '2026-05-01')).toBe(true);
        expect(checkDateAfter('2026-05-01', 'not-a-date')).toBe(true);
    });
});

describe('checkDateBefore', () => {
    it('should return true when target is before dependsOn', () => {
        expect(checkDateBefore('2026-04-01', '2026-05-01')).toBe(true);
    });

    it('should return false when target equals dependsOn (business rule: min 1-day gap required)', () => {
        expect(checkDateBefore('2026-05-01', '2026-05-01')).toBe(false);
    });

    it('should return false when target is after dependsOn', () => {
        expect(checkDateBefore('2026-06-01', '2026-05-01')).toBe(false);
    });

    it('should return true when either value is not a string (not applicable)', () => {
        expect(checkDateBefore(123, '2026-05-01')).toBe(true);
        expect(checkDateBefore('2026-05-01', undefined)).toBe(true);
    });

    it('should return true when either value is an unparseable date string (not applicable)', () => {
        expect(checkDateBefore('not-a-date', '2026-05-01')).toBe(true);
    });
});
