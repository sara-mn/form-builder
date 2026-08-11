import { describe, it, expect, beforeEach } from 'vitest';
import { FormValidationService } from './form-validation.service';
import { FormModel } from '../models/form.model';
import { FieldValidatorTypeEnum } from '../enums/field-validator-type.enum';
import { CrossFieldValidatorTypeEnum } from '../enums/cross-field-validator-type.enum';
import { FormStatusEnum } from '../enums/form-status.enum';
import { FieldTypeEnum } from '../enums/field-type.enum';

function buildForm(overrides: Partial<FormModel> = {}): FormModel {
    return {
        id: 'form-1',
        title: 'Test Form',
        description: '',
        status: FormStatusEnum.Published,
        ownerId: 'owner-1',
        pages: [],
        validators: [],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01',
        ...overrides
    };
}

describe('FormValidationService', () => {
    let service: FormValidationService;

    beforeEach(() => {
        service = new FormValidationService();
    });

    describe('field-level validation', () => {
        it('should return isValid true when all field validators pass', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [],
                        fields: [
                            {
                                id: 'field-1',
                                label: 'Email',
                                name: 'email',
                                type: FieldTypeEnum.Email,
                                order: 0,
                                validators: [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Required' }]
                            }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { email: 'user@example.com' });

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should collect an error when a field validator fails', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [],
                        fields: [
                            {
                                id: 'field-1',
                                label: 'Email',
                                name: 'email',
                                type: FieldTypeEnum.Email,
                                order: 0,
                                validators: [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Email is required' }]
                            }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { email: '' });

            expect(result.isValid).toBe(false);
            expect(result.errors).toEqual([{ fieldId: 'field-1', validatorType: FieldValidatorTypeEnum.Required, message: 'Email is required' }]);
        });

        it('should collect multiple errors across multiple fields and pages', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [],
                        fields: [
                            {
                                id: 'field-1',
                                label: 'Name',
                                name: 'name',
                                type: FieldTypeEnum.Text,
                                order: 0,
                                validators: [{ id: 'v1', type: FieldValidatorTypeEnum.Required, message: 'Name required' }]
                            }
                        ]
                    },
                    {
                        id: 'page-2',
                        title: 'Page 2',
                        order: 1,
                        validators: [],
                        fields: [
                            {
                                id: 'field-2',
                                label: 'Age',
                                name: 'age',
                                type: FieldTypeEnum.Number,
                                order: 0,
                                validators: [{ id: 'v2', type: FieldValidatorTypeEnum.MinValue, message: 'Too young', value: 18 }]
                            }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { name: '', age: 15 });

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
        });

        it('should collect multiple errors for a single field with multiple failing validators', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [],
                        fields: [
                            {
                                id: 'field-1',
                                label: 'Code',
                                name: 'code',
                                type: FieldTypeEnum.Text,
                                order: 0,
                                validators: [
                                    { id: 'v1', type: FieldValidatorTypeEnum.MinLength, message: 'Too short', value: 5 },
                                    { id: 'v2', type: FieldValidatorTypeEnum.Pattern, message: 'Invalid format', value: '^[0-9]+$' }
                                ]
                            }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { code: 'ab' });

            expect(result.errors).toHaveLength(2);
        });
    });

    describe('cross-field validation', () => {
        it('should pass when a page-level cross-field rule is satisfied', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [
                            {
                                id: 'cv1',
                                type: CrossFieldValidatorTypeEnum.DateAfter,
                                message: 'End must be after start',
                                targetFieldId: 'field-end',
                                dependsOnFieldId: 'field-start'
                            }
                        ],
                        fields: [
                            { id: 'field-start', label: 'Start Date', name: 'startDate', type: FieldTypeEnum.Date, order: 0, validators: [] },
                            { id: 'field-end', label: 'End Date', name: 'endDate', type: FieldTypeEnum.Date, order: 1, validators: [] }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { startDate: '2026-05-01', endDate: '2026-06-01' });

            expect(result.isValid).toBe(true);
        });

        it('should fail and report the targetField when a cross-field rule is violated', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [
                            {
                                id: 'cv1',
                                type: CrossFieldValidatorTypeEnum.DateAfter,
                                message: 'End must be after start',
                                targetFieldId: 'field-end',
                                dependsOnFieldId: 'field-start'
                            }
                        ],
                        fields: [
                            { id: 'field-start', label: 'Start Date', name: 'startDate', type: FieldTypeEnum.Date, order: 0, validators: [] },
                            { id: 'field-end', label: 'End Date', name: 'endDate', type: FieldTypeEnum.Date, order: 1, validators: [] }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { startDate: '2026-06-01', endDate: '2026-05-01' });

            expect(result.isValid).toBe(false);
            expect(result.errors[0].fieldId).toBe('field-end');
        });

        it('should check form-level cross-field validators in addition to page-level ones', () => {
            const form = buildForm({
                validators: [
                    {
                        id: 'cv-form',
                        type: CrossFieldValidatorTypeEnum.RequiredIfFilled,
                        message: 'Reason required',
                        targetFieldId: 'field-reason',
                        dependsOnFieldId: 'field-status'
                    }
                ],
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [],
                        fields: [
                            { id: 'field-status', label: 'Status', name: 'status', type: FieldTypeEnum.Text, order: 0, validators: [] },
                            { id: 'field-reason', label: 'Reason', name: 'reason', type: FieldTypeEnum.Text, order: 1, validators: [] }
                        ]
                    }
                ]
            });

            const result = service.validateForm(form, { status: 'rejected', reason: '' });

            expect(result.isValid).toBe(false);
        });

        it('should report a configuration error when a cross-field validator has an orphaned field reference', () => {
            const form = buildForm({
                pages: [
                    {
                        id: 'page-1',
                        title: 'Page 1',
                        order: 0,
                        validators: [
                            {
                                id: 'cv1',
                                type: CrossFieldValidatorTypeEnum.DateAfter,
                                message: 'Broken rule',
                                targetFieldId: 'non-existent-field',
                                dependsOnFieldId: 'field-start'
                            }
                        ],
                        fields: [{ id: 'field-start', label: 'Start Date', name: 'startDate', type: FieldTypeEnum.Date, order: 0, validators: [] }]
                    }
                ]
            });

            const result = service.validateForm(form, { startDate: '2026-05-01' });

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].fieldId).toBe('non-existent-field');
            expect(result.errors[0].message).toContain('no longer exists');
        });
    });

    describe('empty form', () => {
        it('should return isValid true for a form with no pages', () => {
            const form = buildForm({ pages: [] });
            const result = service.validateForm(form, {});
            expect(result.isValid).toBe(true);
        });
    });
});
