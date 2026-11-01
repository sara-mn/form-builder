import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jsonServer from 'json-server';
import createAuthRouter from './routes/auth.js';
import createFormsRouter from './routes/forms.js';
import createSubmissionsRouter from './routes/submissions.js';
import authenticate from './middleware/authenticate.js';

export default function createApp({ dbPath, isProduction }) {
    const app = express();

    const allowedOrigins = ['http://localhost:4200', 'https://sara-mn.github.io'];

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
        })
    );

    app.use(cookieParser());

    const jsonServerRouter = jsonServer.router(dbPath);

    const db = jsonServerRouter.db;
    app.use('/api/auth', express.json(), createAuthRouter(db, isProduction));
    app.use('/forms', authenticate, createFormsRouter(db));
    app.use('/submissions', authenticate, createSubmissionsRouter(db));

    // Public: used by the CI smoke test and by hosting health checks, no data exposed.
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok' });
    });

    app.use((_req, res) => {
        res.status(404).json({ message: 'Not found' });
    });

    return app;
}
