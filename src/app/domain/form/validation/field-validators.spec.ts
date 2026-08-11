import { describe, it, expect } from 'vitest';
import { checkRequired, checkMinLength, checkMaxLength, checkPattern, checkMinValue, checkMaxValue, checkEmail, isValidRegexPattern, isValidNumericString } from './field-validators';

describe('checkRequired', () => {
    it('should return false for null', () => {
        expect(checkRequired(null)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(checkRequired(undefined)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(checkRequired('')).toBe(false);
    });

    it('should return false for whitespace-only string', () => {
        expect(checkRequired('   ')).toBe(false);
    });

    it('should return true for a non-empty string', () => {
        expect(checkRequired('hello')).toBe(true);
    });

    it('should return true for the number 0', () => {
        expect(checkRequired(0)).toBe(true);
    });

    it('should return true for boolean false', () => {
        expect(checkRequired(false)).toBe(true);
    });

    it('should return true for an empty array', () => {
        expect(checkRequired([])).toBe(true);
    });
});

describe('checkMinLength', () => {
    it('should return false when string is shorter than min', () => {
        expect(checkMinLength('ab', 3)).toBe(false);
    });

    it('should return true when string length equals min (boundary)', () => {
        expect(checkMinLength('abc', 3)).toBe(true);
    });

    it('should return true when string is longer than min', () => {
        expect(checkMinLength('abcdef', 3)).toBe(true);
    });

    it('should return true when value is not a string (not applicable)', () => {
        expect(checkMinLength(123, 3)).toBe(true);
        expect(checkMinLength(null, 3)).toBe(true);
        expect(checkMinLength(undefined, 3)).toBe(true);
    });

    it('should return true for empty string when min is 0', () => {
        expect(checkMinLength('', 0)).toBe(true);
    });
});

describe('checkMaxLength', () => {
    it('should return true when string is shorter than max', () => {
        expect(checkMaxLength('ab', 5)).toBe(true);
    });

    it('should return true when string length equals max (boundary)', () => {
        expect(checkMaxLength('abcde', 5)).toBe(true);
    });

    it('should return false when string is longer than max', () => {
        expect(checkMaxLength('abcdef', 5)).toBe(false);
    });

    it('should return true when value is not a string (not applicable)', () => {
        expect(checkMaxLength(123, 5)).toBe(true);
        expect(checkMaxLength(null, 5)).toBe(true);
    });
});

describe('checkPattern', () => {
    it('should return true when string matches the pattern', () => {
        expect(checkPattern('abc123', '^[a-z0-9]+$')).toBe(true);
    });

    it('should return false when string does not match the pattern', () => {
        expect(checkPattern('ABC123', '^[a-z0-9]+$')).toBe(false);
    });

    it('should return true when value is not a string (not applicable)', () => {
        expect(checkPattern(123, '^[a-z]+$')).toBe(true);
    });

    it('should throw when pattern is invalid regex (invariant violation)', () => {
        // این رفتار عمدیه: caller مسئول تضمین معتبر بودن pattern قبل از فراخوانی است.
        // اعتبارسنجی خود pattern با isValidRegexPattern در نقطه‌ی ورود داده (presentation) انجام می‌شود.
        expect(() => checkPattern('test', '[')).toThrow();
    });
});

describe('checkMinValue', () => {
    it('should return false when number is less than min', () => {
        expect(checkMinValue(5, 10)).toBe(false);
    });

    it('should return true when number equals min (boundary)', () => {
        expect(checkMinValue(10, 10)).toBe(true);
    });

    it('should return true when number is greater than min', () => {
        expect(checkMinValue(15, 10)).toBe(true);
    });

    it('should return true when value is not a number (not applicable)', () => {
        expect(checkMinValue('10', 10)).toBe(true);
        expect(checkMinValue(null, 10)).toBe(true);
    });
});

describe('checkMaxValue', () => {
    it('should return true when number is less than max', () => {
        expect(checkMaxValue(5, 10)).toBe(true);
    });

    it('should return true when number equals max (boundary)', () => {
        expect(checkMaxValue(10, 10)).toBe(true);
    });

    it('should return false when number is greater than max', () => {
        expect(checkMaxValue(15, 10)).toBe(false);
    });

    it('should return true when value is not a number (not applicable)', () => {
        expect(checkMaxValue('15', 10)).toBe(true);
        expect(checkMaxValue(null, 10)).toBe(true);
    });
});

describe('checkEmail', () => {
    it('should return true for a valid email', () => {
        expect(checkEmail('user@example.com')).toBe(true);
    });

    it('should return false for a string without @', () => {
        expect(checkEmail('userexample.com')).toBe(false);
    });

    it('should return false for a string without domain', () => {
        expect(checkEmail('user@')).toBe(false);
    });

    it('should return false for a string with spaces', () => {
        expect(checkEmail('user @example.com')).toBe(false);
    });

    it('should return true when value is not a string (not applicable)', () => {
        expect(checkEmail(123)).toBe(true);
    });
});

describe('isValidRegexPattern', () => {
    it('should return true for a valid regex string', () => {
        expect(isValidRegexPattern('^[a-z]+$')).toBe(true);
    });

    it('should return false for an invalid regex string', () => {
        expect(isValidRegexPattern('[')).toBe(false);
    });

    it('should return true for an empty string (technically a valid regex)', () => {
        // یه edge case غیر intuitive: new RegExp('') در جاوااسکریپت معتبر است
        expect(isValidRegexPattern('')).toBe(true);
    });

    describe('isValidNumericString', () => {
        it('should return true for a valid integer string', () => {
            expect(isValidNumericString('42')).toBe(true);
        });

        it('should return true for a numeric value (not string)', () => {
            expect(isValidNumericString(42)).toBe(true);
        });

        it('should return true for a valid decimal string', () => {
            expect(isValidNumericString('3.14')).toBe(true);
        });

        it('should return true for a negative number string', () => {
            expect(isValidNumericString('-5')).toBe(true);
        });

        it('should return false for a non-numeric string', () => {
            expect(isValidNumericString('abc')).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(isValidNumericString('')).toBe(false);
        });

        it('should return false for whitespace-only string', () => {
            expect(isValidNumericString('   ')).toBe(false);
        });

        it('should return false for a mixed alphanumeric string', () => {
            expect(isValidNumericString('12abc')).toBe(false);
        });

        it('should return true for numeric string with leading/trailing whitespace', () => {
            // این رفتار Number() هست: خودش trim می‌کنه؛ صراحتاً مستندش می‌کنیم
            expect(isValidNumericString('  42  ')).toBe(true);
        });
    });
});
