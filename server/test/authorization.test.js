import { describe, it } from 'node:test';
import request from 'supertest';
import { createTestApp, accounts, login } from './helpers.js';

const newForm = { title: 'T', description: '', status: 'draft', ownerId: 'x', pages: [], validators: [] };
const newSubmission = { formId: 'form-6', answers: { 'form-6-p1-f1': 'italian' } };

// [role, method, path, body, expected status]
const cases = [
    ['viewer', 'get', '/forms', undefined, 200],
    ['viewer', 'post', '/forms', newForm, 403],
    ['editor', 'post', '/forms', newForm, 201],
    ['viewer', 'patch', '/forms/form-4', { title: 'x' }, 403],
    ['editor', 'patch', '/forms/form-4', { title: 'x' }, 200],
    ['viewer', 'patch', '/forms/form-4', { status: 'published' }, 403],
    ['editor', 'patch', '/forms/form-4', { status: 'published' }, 200],
    ['editor', 'delete', '/forms/form-4', undefined, 403],
    ['admin', 'delete', '/forms/form-4', undefined, 200],
    ['viewer', 'post', '/submissions', newSubmission, 201]
];

describe('authorization by role', () => {
    for (const [role, method, path, body, expected] of cases) {
        it(`${role}: ${method.toUpperCase()} ${path} ${body ? JSON.stringify(body) : ''} → ${expected}`, async () => {
            const app = createTestApp();
            const { bearer } = await login(app, accounts[role]);

            const req = request(app)[method](path).set('Authorization', bearer);
            await (body ? req.send(body) : req).expect(expected);
        });
    }
});
