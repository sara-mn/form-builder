import { isFilled } from './shared';

export function checkRequired(value: unknown): boolean {
    return isFilled(value);
}

export function checkMinLength(value: unknown, min: number): boolean {
    if (typeof value !== 'string') return true; // Not related to this type of value, don't fail
    return value.length >= min;
}

export function checkMaxLength(value: unknown, max: number): boolean {
    if (typeof value !== 'string') return true;
    return value.length <= max;
}

export function checkPattern(value: unknown, pattern: string): boolean {
    if (typeof value !== 'string') return true;
    return new RegExp(pattern).test(value);
}

export function checkMinValue(value: unknown, min: number): boolean {
    if (typeof value !== 'number') return true;
    return value >= min;
}

export function checkMaxValue(value: unknown, max: number): boolean {
    if (typeof value !== 'number') return true;
    return value <= max;
}

export function checkEmail(value: unknown): boolean {
    if (typeof value !== 'string') return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidRegexPattern(pattern: string): boolean {
    try {
        new RegExp(pattern);
        return true;
    } catch {
        return false;
    }
}

export function isValidNumericString(value: string | number): boolean {
    const strValue = String(value).trim();
    if (strValue === '') return false;
    return !Number.isNaN(Number(strValue));
}
