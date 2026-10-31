import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createTestApp, accounts, login } from './helpers.js';

describe('form rules', () => {
    let app;
    let admin;
    let editor;
    let viewer;

    beforeEach(async () => {
        app = createTestApp();
        admin = (await login(app, accounts.admin)).bearer;
        editor = (await login(app, accounts.editor)).bearer;
        viewer = (await login(app, accounts.viewer)).bearer;
    });

    it('hides drafts from users who cannot edit forms', async () => {
        const res = await request(app).get('/forms').set('Authorization', viewer).expect(200);
        assert.ok(res.body.every((form) => form.status === 'published'));
        assert.ok(!res.body.some((form) => form.id === 'form-4'));
    });

    it('shows drafts to users who can edit forms', async () => {
        const res = await request(app).get('/forms').set('Authorization', editor).expect(200);
        assert.ok(res.body.some((form) => form.id === 'form-4'));
    });

    it('rejects structural changes to a locked form', async () => {
        await request(app).patch('/forms/form-1').set('Authorization', admin).send({ title: 'x' }).expect(409);
    });

    it('allows unpublishing a locked form', async () => {
        const res = await request(app)
            .patch('/forms/form-1')
            .set('Authorization', admin)
            .send({ status: 'draft' })
            .expect(200);
        assert.equal(res.body.status, 'draft');
    });

    it('rejects deleting a locked form', async () => {
        await request(app).delete('/forms/form-1').set('Authorization', admin).expect(409);
    });

    it('rejects publishing a form without fields', async () => {
        const created = await request(app)
            .post('/forms')
            .set('Authorization', editor)
            .send({ title: 'Empty', description: '', status: 'draft', ownerId: 'x', pages: [], validators: [] })
            .expect(201);

        const res = await request(app)
            .patch(`/forms/${created.body.id}`)
            .set('Authorization', editor)
            .send({ status: 'published' })
            .expect(422);
        assert.equal(res.body.message, 'Add at least one field before publishing.');
    });

    it('rejects an unknown status', async () => {
        await request(app).patch('/forms/form-4').set('Authorization', editor).send({ status: 'archived' }).expect(400);
    });
});
describe('submission rules', () => {
    let app;
    let editor;
    let viewer;
    let viewerId;

    beforeEach(async () => {
        app = createTestApp();
        editor = (await login(app, accounts.editor)).bearer;
        const viewerSession = await login(app, accounts.viewer);
        viewer = viewerSession.bearer;
        viewerId = viewerSession.userId;
    });

    const answers = { 'form-6-p1-f1': 'italian' };

    it('rejects submissions to a form that is not published', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-4', answers })
            .expect(409);
    });

    it('rejects a second submission by the same user', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers })
            .expect(201);
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers })
            .expect(409);
    });

    it('takes submittedBy from the token, never from the body', async () => {
        const res = await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers, submittedBy: 'someone-else' })
            .expect(201);
        assert.equal(res.body.submittedBy, viewerId);
    });

    it('returns 404 for an unknown form', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'nope', answers })
            .expect(404);
    });

    it('shows a user without SubmissionView only their own submissions', async () => {
        const res = await request(app).get('/submissions').set('Authorization', viewer).expect(200);
        assert.ok(res.body.length >= 1);
        assert.ok(res.body.every((s) => s.submittedBy === viewerId));
    });

    it('shows all submissions to a user with SubmissionView', async () => {
        const res = await request(app).get('/submissions').set('Authorization', editor).expect(200);
        assert.ok(res.body.some((s) => s.submittedBy !== viewerId));
    });
});
describe('submission rules', () => {
    let app;
    let editor;
    let viewer;
    let viewerId;

    beforeEach(async () => {
        app = createTestApp();
        editor = (await login(app, accounts.editor)).bearer;
        const viewerSession = await login(app, accounts.viewer);
        viewer = viewerSession.bearer;
        viewerId = viewerSession.userId;
    });

    const answers = { 'form-6-p1-f1': 'italian' };

    it('rejects submissions to a form that is not published', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-4', answers })
            .expect(409);
    });

    it('rejects a second submission by the same user', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers })
            .expect(201);
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers })
            .expect(409);
    });

    it('takes submittedBy from the token, never from the body', async () => {
        const res = await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'form-6', answers, submittedBy: 'someone-else' })
            .expect(201);
        assert.equal(res.body.submittedBy, viewerId);
    });

    it('returns 404 for an unknown form', async () => {
        await request(app)
            .post('/submissions')
            .set('Authorization', viewer)
            .send({ formId: 'nope', answers })
            .expect(404);
    });

    it('shows a user without SubmissionView only their own submissions', async () => {
        const res = await request(app).get('/submissions').set('Authorization', viewer).expect(200);
        assert.ok(res.body.length >= 1);
        assert.ok(res.body.every((s) => s.submittedBy === viewerId));
    });

    it('shows all submissions to a user with SubmissionView', async () => {
        const res = await request(app).get('/submissions').set('Authorization', editor).expect(200);
        assert.ok(res.body.some((s) => s.submittedBy !== viewerId));
    });
});
