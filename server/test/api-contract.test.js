import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createTestApp, accounts, bearer } from './helpers.js';

describe('API contract used by the client', () => {
    let app;
    let auth;

    // قبل از هر test: app تازه، پس testها روی هم اثر نمی‌ذارن
    beforeEach(async () => {
        app = createTestApp();
        auth = await bearer(app, accounts.admin);
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
});

// describe('POST /register', () => {
//     it('create a user when payload is valid', async () => {
//     });

//     it('create a user when user with this email not exist', async () => {});

//     it('error 409 when user with this email not exist', async () => {});

//     it('error 400 when email not reliable', async () => {});

//     it('error 400 when password not reliable', async () => {});

//     it('error 400  when email in payload not exist', async () => {});

//     it('error 400 when password in payload not exist', async () => {});

//     it('create a user when payload is valid', async () => {});
// });
