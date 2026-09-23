import { describe, it, expect } from 'vitest';
import { UpdateProfileFormAdapter } from './account-profile-form.adapter';
import { UpdateProfileFormModel } from './account-profile-form.model';

describe('UpdateProfileFormAdapter', () => {
    it('maps name and mobile from the form model to the domain request', () => {
        const form: UpdateProfileFormModel = { name: 'Sara Mn', mobile: '09121234567' };

        const result = UpdateProfileFormAdapter.toDomain(form);

        expect(result).toEqual({ name: 'Sara Mn', mobile: '09121234567' });
    });
});
