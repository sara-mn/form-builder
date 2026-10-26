import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createTestApp, accounts, login } from './helpers.js';

describe('API contract used by the client', () => {
    let app;
    let auth;
    let userId;

    // قبل از هر test: app تازه، پس testها روی هم اثر نمی‌ذارن
    beforeEach(async () => {
        app = createTestApp();
        const loginRes = await login(app, accounts.admin);
        auth = loginRes.bearer;
        userId = loginRes.userId;
    });

    it('lists forms', async () => {
        const res = await request(app).get('/forms').set('Authorization', auth).expect(200);

        assert.ok(Array.isArray(res.body));
        assert.ok(res.body.some((form) => form.id === 'form-1'));
    });

    it('GET /forms/form-1', async () => {
        const res = await request(app).get('/forms/form-1').set('Authorization', auth).expect(200);

        assert.equal(res.body.title, 'Job Application Form');
    });

    it('GET /forms/does-not-exist', async () => {
        await request(app).get('/forms/does-not-exist').set('Authorization', auth).expect(404);
    });

    it('GET /users', async () => {
        await request(app).get('/users').set('Authorization', auth).expect(404);
    });

    it('GET /db', async () => {
        await request(app).get('/db').set('Authorization', auth).expect(404);
    });

    it('POST /forms', async () => {
        const form = {
            ownerId: userId,
            description: '',
            title: 'form-test',
            status: 'draft',
            pages: [],
            validators: []
        };

        const res = await request(app).post('/forms').send(form).set('Authorization', auth).expect(201);

        assert.equal(res.body.title, 'form-test');
        assert.ok(res.body.id);
    });

    it('PATCH /forms/form-4', async () => {
        const res = await request(app)
            .patch('/forms/form-4')
            .send({ title: 'form-title-changed' })
            .set('Authorization', auth)
            .expect(200);

        assert.equal(res.body.title, 'form-title-changed');
        assert.ok(Array.isArray(res.body.pages));
        assert.ok(res.body.pages.some((page) => page.id === 'form-4-page-1'));
    });

    it('GET /submissions?formId=...&submittedBy=...', async () => {
        const res = await request(app)
            .get('/submissions')
            .query({ formId: 'form-2', submittedBy: userId })
            .set('Authorization', auth)
            .expect(200);

        assert.ok(Array.isArray(res.body));
        assert.equal(res.body.length, 1);
        assert.ok(res.body.every((sub) => sub.submittedBy === userId && sub.formId === 'form-2'));
    });
});
