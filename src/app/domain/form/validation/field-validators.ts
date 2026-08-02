export function checkRequired(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
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
