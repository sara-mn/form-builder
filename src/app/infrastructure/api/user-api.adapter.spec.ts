import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserApiAdapter } from './user-api.adapter';
import { environment } from '@env/environment';
import { provideHttpClient } from '@angular/common/http';
import { createFakeUser } from '@app/application/test-utils';

describe('UserApiAdapter', () => {
    let adapter: UserApiAdapter;
    let httpMock: HttpTestingController;
    const usersUrl = `${environment.apiUrl}/users`;

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

    it('should GET the hardcoded current user (id: 1) and return only the profile', async () => {
        const fakeUser = createFakeUser({ id: '1' });

        const resultPromise = adapter.getProfile();

        const req = httpMock.expectOne(`${usersUrl}/1`);
        expect(req.request.method).toBe('GET');

        req.flush(fakeUser);

        const result = await resultPromise;

        expect(result).toEqual(fakeUser.profile);
    });

    it('should reject when the user is not found', async () => {
        const resultPromise = adapter.getProfile();

        const req = httpMock.expectOne(`${usersUrl}/1`);
        expect(req.request.method).toBe('GET');

        req.flush(null, { status: 404, statusText: 'Not Found' });

        await expect(resultPromise).rejects.toMatchObject({ status: 404 });
    });
});
