import { copyFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import request from 'supertest';
import createApp from '../app.js';

export function createTestApp() {
    const seedPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'db.json');
    const dbPath = join(mkdtempSync(join(tmpdir(), 'form-builder-test-')), 'db.json');
    copyFileSync(seedPath, dbPath);
    return createApp({ dbPath });
}

export const accounts = {
    admin: { username: 'admin@example.com', password: 'admin123' },
    editor: { username: 'editor@example.com', password: 'editor123' },
    viewer: { username: 'user@example.com', password: 'user123' }
};

export async function login(app, account) {
    const res = await request(app).post('/api/auth/login').send(account).expect(200);
    return { bearer: `Bearer ${res.body.accessToken}`, userId: res.body.user.id };
}
