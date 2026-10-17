import { describe, it, expect } from 'vitest';
import { canViewForm } from './form-visibility';
import { FormStatusEnum, UserPermissionEnum } from '@app/domain';

describe('canViewForm', () => {
    const viewerPermissions = [UserPermissionEnum.FormView, UserPermissionEnum.SubmissionCreate];
    const editorPermissions = [...viewerPermissions, UserPermissionEnum.FormEdit];

    it('should show a published form to a user without FormEdit', () => {
        expect(canViewForm({ status: FormStatusEnum.Published }, viewerPermissions)).toBe(true);
    });

    it('should hide a draft from a user without FormEdit', () => {
        expect(canViewForm({ status: FormStatusEnum.Draft }, viewerPermissions)).toBe(false);
    });

    it('should show a draft to a user with FormEdit', () => {
        expect(canViewForm({ status: FormStatusEnum.Draft }, editorPermissions)).toBe(true);
    });

    it('should hide a draft from a user with no permissions', () => {
        expect(canViewForm({ status: FormStatusEnum.Draft }, [])).toBe(false);
    });
});
