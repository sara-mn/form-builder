import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SubmissionApiAdapter } from './submission-api.adapter';
import { environment } from '@env/environment';
import { createFakeSubmission } from '@app/application/test-utils';

describe('SubmissionApiAdapter', () => {
    let adapter: SubmissionApiAdapter;
    let httpMock: HttpTestingController;
    const submissionsUrl = `${environment.apiUrl}/submissions`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SubmissionApiAdapter, provideHttpClient(), provideHttpClientTesting()]
        });
        adapter = TestBed.inject(SubmissionApiAdapter);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should GET a submission filtered by formId and submittedBy, returning the first match', async () => {
        const fakeSubmission = createFakeSubmission({ formId: 'f1', submittedBy: 'user-1' });

        const resultPromise = adapter.getSubmission('f1', 'user-1');

        const req = httpMock.expectOne((request) => request.url === submissionsUrl && request.params.get('formId') === 'f1' && request.params.get('submittedBy') === 'user-1');
        expect(req.request.method).toBe('GET');

        req.flush([fakeSubmission]);

        const result = await resultPromise;
        expect(result).toEqual(fakeSubmission);
    });

    it('should return null when no submission matches formId and submittedBy', async () => {
        const resultPromise = adapter.getSubmission('f1', 'user-1');

        const req = httpMock.expectOne((request) => request.url === submissionsUrl && request.params.get('formId') === 'f1' && request.params.get('submittedBy') === 'user-1');

        req.flush([]);

        const result = await resultPromise;
        expect(result).toBeNull();
    });

    it('should GET all submissions', async () => {
        const fakeSubmissions = [createFakeSubmission({ id: 's1' }), createFakeSubmission({ id: 's2' })];

        const resultPromise = adapter.getAllSubmissions();

        const req = httpMock.expectOne(submissionsUrl);
        expect(req.request.method).toBe('GET');

        req.flush(fakeSubmissions);

        const result = await resultPromise;
        expect(result).toEqual(fakeSubmissions);
    });

    it('should GET submissions filtered by formId', async () => {
        const fakeSubmissions = [createFakeSubmission({ formId: 'f1' })];

        const resultPromise = adapter.getSubmissionsByFormId('f1');

        const req = httpMock.expectOne((request) => request.url === submissionsUrl && request.params.get('formId') === 'f1');
        expect(req.request.method).toBe('GET');

        req.flush(fakeSubmissions);

        const result = await resultPromise;
        expect(result).toEqual(fakeSubmissions);
    });

    it('should POST a new submission with a client-generated submittedAt', async () => {
        const { id, submittedAt, ...newSubmissionPayload } = createFakeSubmission();
        const createdSubmission = createFakeSubmission({ id: 'new-id' });

        const resultPromise = adapter.createSubmission(newSubmissionPayload);

        const req = httpMock.expectOne(submissionsUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body.formId).toBe(newSubmissionPayload.formId);
        expect(req.request.body.submittedBy).toBe(newSubmissionPayload.submittedBy);
        expect(req.request.body.submittedAt).toEqual(expect.any(String));
        expect(new Date(req.request.body.submittedAt).getTime()).not.toBeNaN();

        req.flush(createdSubmission);

        const result = await resultPromise;
        expect(result).toEqual(createdSubmission);
    });
});
