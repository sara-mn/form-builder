import { describe, it, expect } from 'vitest';
import { isFilled } from './shared';

describe('isFilled', () => {
    it('should return false for null, undefined, empty, and whitespace-only strings', () => {
        expect(isFilled(null)).toBe(false);
        expect(isFilled(undefined)).toBe(false);
        expect(isFilled('')).toBe(false);
        expect(isFilled('   ')).toBe(false);
    });

    it('should return true for non-empty strings, 0, false, and empty arrays', () => {
        expect(isFilled('hello')).toBe(true);
        expect(isFilled(0)).toBe(true);
        expect(isFilled(false)).toBe(true);
        expect(isFilled([])).toBe(true);
    });
});
