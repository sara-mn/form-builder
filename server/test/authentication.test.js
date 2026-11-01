import { describe, it, beforeEach } from 'node:test';
import request from 'supertest';
import { createTestApp } from './helpers.js';

const protectedRoutes = [
    ['get', '/forms'],
    ['get', '/forms/form-1'],
    ['post', '/forms'],
    ['patch', '/forms/form-1'],
    ['delete', '/forms/form-1'],
    ['get', '/submissions'],
    ['post', '/submissions']
];

describe('authentication', () => {
    let app;

    beforeEach(() => {
        app = createTestApp();
    });

    for (const [method, path] of protectedRoutes) {
        it(`rejects ${method.toUpperCase()} ${path} without a token`, async () => {
            await request(app)[method](path).expect(401);
        });
    }

    it('rejects a token that is not a valid JWT', async () => {
        await request(app).get('/forms').set('Authorization', 'Bearer not-a-token').expect(401);
    });
});
