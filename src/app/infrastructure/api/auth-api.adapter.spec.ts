import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthApiAdapter } from './auth-api.adapter';
import { environment } from '@env/environment';
import { createFakeRegisterRequest, createFakeUser } from '@app/application/test-utils/fixtures';

function createFakeToken(payload: Record<string, unknown>): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    return `${header}.${body}.fake-signature`; //JWT: header.payload.signature
}

describe('AuthApiAdapter', () => {
    let adapter: AuthApiAdapter;
    let httpMock: HttpTestingController;
    const authUrl = `${environment.apiUrl}/api/auth`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthApiAdapter, provideHttpClient(), provideHttpClientTesting()]
        });
        adapter = TestBed.inject(AuthApiAdapter);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should POST credentials to /login and map the response', async () => {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const fakeToken = createFakeToken({ sub: 'user-1', exp: nowInSeconds + 3600 });

        const resultPromise = adapter.login({ username: 'admin@example.com', password: 'admin123' });

        const req = httpMock.expectOne(`${authUrl}/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBe(true);
        expect(req.request.body).toEqual({ username: 'admin@example.com', password: 'admin123' });

        req.flush({
            accessToken: fakeToken,
            user: { id: 'user-1', email: 'admin@example.com', roles: ['Admin'] }
        });

        const result = await resultPromise;

        expect(result.accessToken).toBe(fakeToken);
        expect(result.user.email).toBe('admin@example.com');
        expect(result.expiresIn).toBeGreaterThan(3500);
        expect(result.expiresIn).toBeLessThanOrEqual(3600);
    });

    it('should POST credentials to /register and map the response', async () => {
        let fakeRegisterRequest = createFakeRegisterRequest({ firstName: 'Sara', lastName: 'Mn', email: 'admin@example.com' });
        let payload = {
            email: fakeRegisterRequest.email,
            password: fakeRegisterRequest.password,
            mobile: fakeRegisterRequest.mobile,
            name: 'Sara Mn'
        };

        let resultPromise = adapter.register(fakeRegisterRequest);

        const req = httpMock.expectOne(`${authUrl}/register`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBeFalsy();
        expect(req.request.body).toEqual(payload);

        req.flush({ message: 'User registered successfully', user: createFakeUser({ id: '1', email: 'admin@example.com' }) });

        const result = await resultPromise;

        expect(result).toBeUndefined();
    });

    it('should fall back to email as name when firstName/lastName are empty', async () => {
        const fakeRegisterRequest = createFakeRegisterRequest({
            firstName: undefined,
            lastName: undefined,
            email: 'noname@example.com'
        });
        const payload = {
            email: fakeRegisterRequest.email,
            password: fakeRegisterRequest.password,
            mobile: fakeRegisterRequest.mobile,
            name: 'noname@example.com'
        };

        const resultPromise = adapter.register(fakeRegisterRequest);

        const req = httpMock.expectOne(`${authUrl}/register`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBeFalsy();
        expect(req.request.body).toEqual(payload);

        req.flush({
            message: 'User registered successfully',
            user: createFakeUser({ email: 'noname@example.com' })
        });

        const result = await resultPromise;
        expect(result).toBeUndefined();
    });

    it('should reject when the server returns 409 for a duplicate email', async () => {
        const fakeRegisterRequest = createFakeRegisterRequest({ email: 'taken@example.com' });

        const resultPromise = adapter.register(fakeRegisterRequest);

        const req = httpMock.expectOne(`${authUrl}/register`);
        expect(req.request.method).toBe('POST');

        req.flush({ message: 'A user with this email already exists' }, { status: 409, statusText: 'Conflict' });

        await expect(resultPromise).rejects.toMatchObject({ status: 409 });
    });

    it('should POST credentials to /login and handle error response', async () => {
        const resultPromise = adapter.login({ username: 'admin@example.com', password: 'wrongpassword' });

        const req = httpMock.expectOne(`${authUrl}/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBe(true);
        expect(req.request.body).toEqual({ username: 'admin@example.com', password: 'wrongpassword' });

        req.flush({ error: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

        await expect(resultPromise).rejects.toMatchObject({ status: 401 });
    });

    it('should POST to /refresh and map the response', async () => {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const fakeToken = createFakeToken({ sub: 'user-1', exp: nowInSeconds + 3600 });

        const resultPromise = adapter.refreshToken();

        const req = httpMock.expectOne(`${authUrl}/refresh`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBe(true);
        expect(req.request.body).toEqual({});

        req.flush({
            accessToken: fakeToken,
            user: { id: 'user-1', email: 'admin@example.com', roles: ['Admin'] }
        });

        const result = await resultPromise;

        expect(result.accessToken).toBe(fakeToken);
        expect(result.user.email).toBe('admin@example.com');
        expect(result.expiresIn).toBeGreaterThan(3500);
        expect(result.expiresIn).toBeLessThanOrEqual(3600);
    });

    it('should POST to /logout and return void', async () => {
        const resultPromise = adapter.logout();

        const req = httpMock.expectOne(`${authUrl}/logout`);
        expect(req.request.method).toBe('POST');
        expect(req.request.withCredentials).toBe(true);
        expect(req.request.body).toEqual({});

        req.flush(null);

        const result = await resultPromise;
        expect(result).toBeNull();
    });
});
