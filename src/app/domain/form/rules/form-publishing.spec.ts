import { describe, it, expect } from 'vitest';
import { FormPageModel } from '../models/form-page.model';
import { FieldConfigModel } from '../models/field-config.model';
import { getPublishError, isOpenForSubmissions } from './form-publishing';
import { FormStatusEnum } from '../enums/form-status.enum';

describe('getPublishError', () => {
    const page = (fieldCount: number): FormPageModel => ({
        id: `page-${fieldCount}`,
        title: 'Page',
        order: 0,
        validators: [],
        fields: Array.from({ length: fieldCount }, (_, i) => ({ id: `field-${i}` }) as FieldConfigModel)
    });

    it('should reject a form without pages', () => {
        expect(getPublishError({ pages: [] })).toBe('Add at least one field before publishing.');
    });

    it('should reject a form whose pages have no fields', () => {
        expect(getPublishError({ pages: [page(0), page(0)] })).toBe('Add at least one field before publishing.');
    });

    it('should accept a form with a field on any page', () => {
        expect(getPublishError({ pages: [page(0), page(1)] })).toBeNull();
    });
});
describe('isOpenForSubmissions', () => {
    it('should accept submissions for a published form', () => {
        expect(isOpenForSubmissions({ status: FormStatusEnum.Published })).toBe(true);
    });

    it('should reject submissions for a draft', () => {
        expect(isOpenForSubmissions({ status: FormStatusEnum.Draft })).toBe(false);
    });
});
