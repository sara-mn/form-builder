import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormApiAdapter } from './form-api.adapter';
import { environment } from '@env/environment';
import { createFakeForm } from '@app/application/test-utils';

describe('FormApiAdapter', () => {
    let adapter: FormApiAdapter;
    let httpMock: HttpTestingController;
    const formsUrl = `${environment.apiUrl}/forms`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormApiAdapter, provideHttpClient(), provideHttpClientTesting()]
        });
        adapter = TestBed.inject(FormApiAdapter);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should GET all forms', async () => {
        const fakeForms = [createFakeForm({ id: 'f1' }), createFakeForm({ id: 'f2' })];

        const resultPromise = adapter.getAllForms();

        const req = httpMock.expectOne(formsUrl);
        expect(req.request.method).toBe('GET');

        req.flush(fakeForms);

        const result = await resultPromise;
        expect(result).toEqual(fakeForms);
    });

    it('should GET a form by id', async () => {
        const fakeForm = createFakeForm({ id: 'f1' });

        const resultPromise = adapter.getFormById('f1');

        const req = httpMock.expectOne(`${formsUrl}/f1`);
        expect(req.request.method).toBe('GET');

        req.flush(fakeForm);

        const result = await resultPromise;
        expect(result).toEqual(fakeForm);
    });

    it('should reject when the form is not found', async () => {
        const resultPromise = adapter.getFormById('missing-id');

        const req = httpMock.expectOne(`${formsUrl}/missing-id`);
        req.flush(null, { status: 404, statusText: 'Not Found' });

        await expect(resultPromise).rejects.toMatchObject({ status: 404 });
    });

    it('should POST a new form and return the created form', async () => {
        const { id, createdAt, updatedAt, ...newFormPayload } = createFakeForm();
        const createdForm = createFakeForm({ id: 'new-id' });

        const resultPromise = adapter.createForm(newFormPayload);

        const req = httpMock.expectOne(formsUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newFormPayload);

        req.flush(createdForm);

        const result = await resultPromise;
        expect(result).toEqual(createdForm);
    });

    it('should PUT a partial update and return the updated form', async () => {
        const partialUpdate = { title: 'Updated Title' };
        const updatedForm = createFakeForm({ id: 'f1', title: 'Updated Title' });

        const resultPromise = adapter.updateForm('f1', partialUpdate);

        const req = httpMock.expectOne(`${formsUrl}/f1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(partialUpdate);

        req.flush(updatedForm);

        const result = await resultPromise;
        expect(result).toEqual(updatedForm);
    });

    it('should DELETE a form by id', async () => {
        const resultPromise = adapter.deleteForm('f1');

        const req = httpMock.expectOne(`${formsUrl}/f1`);
        expect(req.request.method).toBe('DELETE');

        req.flush(null);

        const result = await resultPromise;
        expect(result).toBeNull();
    });
});
