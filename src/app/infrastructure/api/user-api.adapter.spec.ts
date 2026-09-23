import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { UserApiAdapter } from './user-api.adapter';
import { environment } from '@env/environment';
import { createFakeUser } from '@app/application/test-utils/fixtures';
import { ChangePasswordRequest, UpdateProfileRequest } from '@app/domain';

describe('UserApiAdapter', () => {
    let adapter: UserApiAdapter;
    let httpMock: HttpTestingController;
    const authUrl = `${environment.apiUrl}/api/auth`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserApiAdapter, provideHttpClient(), provideHttpClientTesting()]
        });
        adapter = TestBed.inject(UserApiAdapter);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should GET /api/auth/profile and return the full user', async () => {
        const fakeUser = createFakeUser();

        const resultPromise = adapter.getProfile();

        const req = httpMock.expectOne(`${authUrl}/profile`);
        expect(req.request.method).toBe('GET');

        req.flush(fakeUser);

        const result = await resultPromise;

        expect(result).toEqual(fakeUser);
    });

    it('should reject when getProfile fails (401 — no valid session)', async () => {
        const resultPromise = adapter.getProfile();

        const req = httpMock.expectOne(`${authUrl}/profile`);
        expect(req.request.method).toBe('GET');

        req.flush(null, { status: 401, statusText: 'Unauthorized' });

        await expect(resultPromise).rejects.toMatchObject({ status: 401 });
    });

    it('should PATCH /api/auth/profile with the payload and return the updated user', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };
        const updatedUser = createFakeUser({ name: 'New Name' });

        const resultPromise = adapter.updateProfile(payload);

        const req = httpMock.expectOne(`${authUrl}/profile`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(payload);

        req.flush(updatedUser);

        const result = await resultPromise;

        expect(result).toEqual(updatedUser);
    });

    it('should reject when updateProfile fails', async () => {
        const payload: UpdateProfileRequest = { name: 'New Name', mobile: '09121234567' };

        const resultPromise = adapter.updateProfile(payload);

        const req = httpMock.expectOne(`${authUrl}/profile`);
        req.flush({ message: 'Invalid mobile format' }, { status: 400, statusText: 'Bad Request' });

        await expect(resultPromise).rejects.toMatchObject({ status: 400 });
    });

    it('should POST /api/auth/change-password with the payload and return void', async () => {
        const payload: ChangePasswordRequest = { currentPassword: 'OldPass123!', newPassword: 'NewPass456!' };

        const resultPromise = adapter.changePassword(payload);

        const req = httpMock.expectOne(`${authUrl}/change-password`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payload);

        req.flush({ message: 'Password changed successfully' });

        const result = await resultPromise;

        expect(result).toBeUndefined();
    });

    it('should reject when the current password is incorrect', async () => {
        const payload: ChangePasswordRequest = { currentPassword: 'WrongPass!', newPassword: 'NewPass456!' };

        const resultPromise = adapter.changePassword(payload);

        const req = httpMock.expectOne(`${authUrl}/change-password`);

        req.flush({ message: 'Current password is incorrect' }, { status: 400, statusText: 'Bad Request' });

        await expect(resultPromise).rejects.toMatchObject({ status: 400 });
    });
});
