export function checkRequiredIfFilled(targetValue: unknown, dependsOnValue: unknown): boolean {
    const dependsOnIsFilled = dependsOnValue !== null && dependsOnValue !== undefined && dependsOnValue !== '';
    if (!dependsOnIsFilled) return true; // If the reference field is empty, this rule will not apply at all
    return targetValue !== null && targetValue !== undefined && targetValue !== '';
}

export function checkDateAfter(targetValue: unknown, dependsOnValue: unknown): boolean {
    if (typeof targetValue !== 'string' || typeof dependsOnValue !== 'string') return true;
    const target = new Date(targetValue);
    const dependsOn = new Date(dependsOnValue);
    if (isNaN(target.getTime()) || isNaN(dependsOn.getTime())) return true;
    return target.getTime() > dependsOn.getTime();
}

export function checkDateBefore(targetValue: unknown, dependsOnValue: unknown): boolean {
    if (typeof targetValue !== 'string' || typeof dependsOnValue !== 'string') return true;
    const target = new Date(targetValue);
    const dependsOn = new Date(dependsOnValue);
    if (isNaN(target.getTime()) || isNaN(dependsOn.getTime())) return true;
    return target.getTime() < dependsOn.getTime();
}
